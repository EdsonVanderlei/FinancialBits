import { Transaction } from '../../../entities/transaction/transaction';
import { KnexRespository } from '../knex.repository';
import { UUID } from './../../../data-objects/uuid/uuid';

export class TransactionKnexRespository extends KnexRespository<Transaction> {
	protected databaseToEntity(transaction: any) {
		return Transaction.load({
			id: new UUID(transaction.id),
			date: transaction.date,
			value: transaction.value,
			description: transaction.description,
			userId: new UUID(transaction.user_id),
			createdAt: transaction.created_at,
			updatedAt: transaction.updated_at,
		});
	}

	protected entityToDatabase(transaction: Transaction) {
		return {
			id: transaction.id.value,
			date: transaction.date,
			value: transaction.value,
			description: transaction.description,
			user_id: transaction.userId.value,
		};
	}
}
