import { Transaction } from '../../../entities/transaction/transaction';
import { LoadTransactionProps } from '../../../types/transaction/load-transaction-props';
import { InMemoryRepository } from '../in-memory.repository';

export class TransactionInMemoryRepository extends InMemoryRepository<Transaction> {
	protected _filterWhere = (where: Partial<LoadTransactionProps>) => (Transaction: Transaction) => {
		return Object.entries(where).every(entry => {
			const TransactionProp = Transaction[entry[0] as keyof Transaction];
			if (typeof TransactionProp === 'object') {
				return TransactionProp.value === (entry[1] as any).value;
			}
			return TransactionProp === entry[1];
		});
	};
}
