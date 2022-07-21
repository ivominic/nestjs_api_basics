# nestjs_api_basics

Testing nestjs functionalities

## Install nestjs and create project

npm install -g @nestjs/cli
nest new project-name

## Post install actions

From src folder delete app.controller.spec.ts, app.controller.ts and app.service.ts.
Delete lines regarding AppController and AppService from app.module.ts.

## Generate module

nest g module module-name
g stands for generate. This command generates module "module-name" and automatically imports it into app.module.ts.

## Controllers and services

Controllers are annotated with @Controller, and services with @Injectable, both from @nestjs/common package. Then, they need to be added in module.ts file, inside @Module decorator.
Inside controller, we pass service as constructor parameter. Inside controller decorator we pass route, that needs to be combined with routes from @Get and @Post decorators over methods inside controller.

## Database

We are going to use Prisma, ORM for Node.js and TypeScript. Installing it with commands:
npm install prisma --save-dev
npm install @prisma/client
Initializing prisma with command:
npx prisma init
This command creates new file ".env", that contains DB connection string, root folder named "prisma" with schema file that will contain database model. Prisma uses first ".env" file that founds, so that file could be moved into prisma folder.
Nullable fields are declared with "?" after type definition. (field String?).

## Prisma

npx prisma migrate dev
This command is used for development environment, deletes existing data and creates tables from schema definition file, also adds sql files with necessary commands inside prisma/migrations folder. It also automatically executes "npm prisma generate" which makes module fields TypeScript fields, that can be immediately accessible from TypeScript files, for example import into services.
npx prisma studio - runs light, web based, DB management studio.

## Connecting code to DB

nest g module prisma
nest g service prisma --no-spec
This creates new module, and service without test specifications, that is going to be used for connecting modules with database.
Prisma service needs to extend PrismaClient and in constructor has to call super() passing parameters for database connection.
Each module that needs access to Prisma, needs to have imports: [PrismaModule] inside @Module decorator, that way gets access to providers inside Prisma module. In PrismaModule, @Module decorator, needs to have exports: [PrismaService] in order to use PrismaService from other modules. This process can be shortened by adding @Global() decorator over PrismaModule. That way, Prisma will bi accessible from all modules, without need to import it in every new module. Exporting PrismaService still needs to be done.
Global module must be imported into app.module, for this to work.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
 npm install
```

## Running the app

```bash
# development
 npm run start

# watch mode
 npm run start:dev

# production mode
 npm run start:prod
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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
