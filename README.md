## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Generating migrations

Before generating any migrations, make sure your database has all previous
pending migrations applied. To do so, run the following command:
```bash
npm run typeorm migration:run -- -d src/utils/db-config.ts
```

Afterwards, you can generate a new migration for the changes you have made to
the entities. Run the following command to generate a migration:
```bash
npm run typeorm migration:generate -- -p -d src/utils/db-config.ts src/migrations/Init
```
In the above commands, the following options are used:
- `-p` - indicates that the generated SQL will be pretty-printed in the migration file
- `-d` - points to the datasource file, which is used to connect to the database
- `src/migrations/MyNewMigration` - the path to the migration file to be generated