export type Transaction = {
    id: string
    userId: string
	date: Date;
	value: number;
	description: string;
    createdAt: Date;
    updatedAt?: Date;
}