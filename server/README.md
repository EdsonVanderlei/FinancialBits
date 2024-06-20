# Financial Bits Server

### File Examples

- .env
	```env
	PORT=1234
	ACCESS_TOKEN_SECRET=ABC
	REFRESH_TOKEN_SECRET=DEF
	```

- knexfile.ts
	```typescript
	export const config = {
		development: {
			client: 'sqlite3',
			connection: {
 				filename: './folder/database.sqlite3'
 			},
		},
		development_test: {
			client: 'sqlite3',
			connection: {
 				filename: './folder/database.test.sqlite3'
 			},
		}
	};
	
	module.exports = config;
	```
