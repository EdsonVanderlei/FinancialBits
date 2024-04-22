export interface UseCase {
	exec(request: unknown): unknown | Promise<unknown>;
}
