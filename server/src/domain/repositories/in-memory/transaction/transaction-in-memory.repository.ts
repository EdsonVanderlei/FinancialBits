import { Transaction } from '../../../entities/transaction/transaction';
import { CreateTransactionProps } from '../../../types/transaction/create-transaction-props';
import { LoadTransactionProps } from '../../../types/transaction/load-transaction-props';
import { TransactionRepository } from '../../transaction-repository';

export class TransactionInMemoryRepository implements TransactionRepository {
	protected _transactions: Transaction[] = [];

	private filterWhere = (where: Partial<LoadTransactionProps>) => (Transaction: Transaction) => {
		return Object.entries(where).every(entry => {
			const TransactionProp = Transaction[entry[0] as keyof Transaction];
			if (typeof TransactionProp === 'object') {
				return TransactionProp.value === (entry[1] as any).value;
			}
			return TransactionProp === entry[1];
		});
	};

	async exists(where: Partial<LoadTransactionProps>) {
		return !!(await this.findOne(where));
	}

	async findAll(where?: Partial<LoadTransactionProps>) {
		return this._transactions.filter(where ? this.filterWhere(where) : () => true);
	}

	async findOne(where: Partial<LoadTransactionProps>) {
		const result = await this.findAll(where);

		if (!result || result.length < 1) {
			return null;
		}
		return result[0];
	}

	async create(props: CreateTransactionProps) {
		const transaction = Transaction.create(props);
		this._transactions.push(transaction);
		return transaction;
	}

	async update(props: LoadTransactionProps) {
		const transaction = await this.findOne({ id: props.id });
		if (!transaction) return null;

		this._transactions.splice(this._transactions.indexOf(transaction), 1);
		const newTransaction = Transaction.load(props);
		this._transactions.push(newTransaction);

		return newTransaction;
	}

	async delete(where: Partial<LoadTransactionProps>) {
		const transactions = await this.findAll(where);
		let deleteCount = 0;
		transactions.forEach((_, index) => {
			this._transactions.splice(index, 1);
			deleteCount++;
		});
		return { deleteCount };
	}
}
