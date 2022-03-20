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
g stands for generate. This command generates module "module-name" and automaticaly imports it into app.module.ts.

## Controllers and services

Controllers are annotated with @Controller, and services with @Injectable, both from @nestjs/common package. Then, they need to be added in module.ts file, inside @Module decorator.
Inside controller, we pass service as constructor parameter. Inside controller decorator we pass route, that needs to be combined with routes from @Post decorators over methods inside controller.

## Database

We are going to use Prisma, ORM for Node.js and TypeScript. Installing it with commands:
npm install prisma --save-dev
npm install @prisma/client
Initialising prisma with command:
npx prisma init
This command creates new file ".env", that contains DB connection string, root folder named "prisma" with schema file that will contain database model. Prisma uses first ".env" file that founds, so that file could be moved into prisma folder.
Nullable fields are declared with "?" after type definition. (field String?).
There is dbo connection string inside prisma.service.ts file, but I had to create .env file inside prisma folder to create datatables from migrations, running "npx prisma migrate dev". Filed .env are in gitignore file, so they have to be manualy created on each computer.

## Prisma

npx prisma migrate dev
This command is used for development environmetn, deletes existing data and creates tables from schema definition file, also adds sql files with neccessary commands inside prisma/migrations folder. It also automaticaly executes "npx prisma generate" which makes module fields TypeScript fields, that can be imediately accessible from TypeScript files, for example import into services.
npx prisma studio - runs light, web based, DB management studio.

## Update database model

Adding @unique decorator on user.email property, and mapped classes to table names (to be in lowercase). This is done in shema.prisma file.
userId Int
user User @relation(fields: [userId], references: [id])
This two commands create relation one to many - one user has many bookmarks. Matching record needs to be created in User class. It didn't create automaticaly for me, and I needed to run command "npx prisma format" for that correction.
After completing model changes, need to run command "npx prisma migrate dev".

## Connecting code to DB

nest g module prisma
nest g service prisma --no-spec
This creates new module, and service without test specifications, that is going to be used for connecting modules with database.
Prisma service needs to extend PrismaClient and in constructor has to call super() passing parameters for database connection.
Each module that needs access to Prisma, needs to have imports: [PrismaModule] inside @Module decorator, that way gets access to providers inside Prisma module. In PrismaModule, @Module decorator, needs to have exports: [PrismaService] in order to use PrismaService from other modules. This process can be shortened by adding @Global() decorator over PrismaModule. That way, Prisma will bi accessible from all modules, without need to import it in every new module. Exporting PrismaService still needs to be done.
Global module must be imported into app.module, for this to work.

## DTO

Practice should be to create index.ts file in each dto subfolder. That way importing wil be done from './dto' and there will be no need to import from each separate dto.ts file.

## Pipes and validators

This command install packages needed to transform and validate data. Setting decorators to auth.dto.ts, and needs to add in main.ts statement to use validators globaly app.useGlobalPipes(new ValidationPipe()); If ValidationPipe() has parameter whitelist: true, that means that we will receive only defined parameters (in DTO) and all other, passed from request, will be striped.

## Hashing

npm i argon2
Argon is package used for hashing, in our case, password and refresh token. We import that in auth.service.ts file.

## Insert and return

Inserting is done in signup method of auth.service.ts file. Prisma allows us to return only fields we wish, declaring them in select object, as written in signup method. This is better to do with transformers, for instance: delete user.hash before returning user.

## Try catch

To pass message that unique constraint has been violated, we pass message from catch block of auth.service method.

## Scripts in package.json

Created three scripts for working with docker database, db:dev:rm, db:dev:up and db:dev:restart.
Also, created scripts for applying migrations to database - "prisma:dev:deploy": "prisma migrate deploy". Sleep 1 means to wait 1 second before applying prisma migrations.

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
