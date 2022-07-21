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
There is dbo connection string inside prisma.service.ts file, but I had to create .env file inside prisma folder to create datatables from migrations, running "npx prisma migrate dev". Filed .env are in gitignore file, so they have to be manualy created on each computer.

## Prisma

npx prisma migrate dev
This command is used for development environment, deletes existing data and creates tables from schema definition file, also adds sql files with necessary commands inside prisma/migrations folder. It also automatically executes "npm prisma generate" which makes module fields TypeScript fields, that can be immediately accessible from TypeScript files, for example import into services.
npx prisma studio - runs light, web based, DB management studio.

## Update database model

Adding @unique decorator on user.email property, and mapped classes to table names (to be in lowercase). This is done in shema.prisma file.
userId Int
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
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

## Config module

Built in module. Installs: npm i @nestjs/config
It is going to be used to read configuration string from .env file and be accessible through entire application. Config module can be implemented on root module (app.module.ts) or can be placed in dedicated file. Under the hood ConfigModule uses .env library. Config can be used as service, in any method decorated with @Injectable(). We are using it in prisma.service.ts to read db connection string. To make it accessible from every module in app.module.ts needs to be addes property isGlobal: true;

## Authentication

Passport.js is going to be used for authentication. We need to install few packages:
npm i --save @nestjs/passport passport
Also need to install jwt specific modules, using:
npm i --save @nestjs/jwt passport-jwt
Also needs to install types for passport-jwt
npm i --save-dev @types/passport-jwt
Jwt module will be imported inside auth.module.ts without secret, for purposes regarding refresh token, and will be customized inside auth.services.ts. JwtModule will be accessible only from auth.module, but service will bi injected into auth.services.
Method for generating token is going to be created in auth.services. Secret is going to be stored in .env file, because it shouldn be visible on git. signToken returns access_token, and next step should be to verify that passed token is valid.
Strategy is module that checks token validity. We create folder with same name inside auth folder. After creating strategy, it needs to be imported in auth.module as provider. Instead of JWT strategy, Google or Facebook can be used.
Next, creating new route to protect it with strategy. It is going to be created using cli: nest g controller user --no-spec

## Guards

Guards are set by a decorators (@UseGuards()) and prevent accessing route with incorrect credentials. @nestjs/passport has built in AuthGuard, and we specify which guard are going to use: 'jwt'. Jwt.strategy can have guard strategy, that is optional, but in this case, it is going to be 'jwt', although it can be anything. This 'jwt' string is showing that that route is protected by that strategy. Every request to protected url has to have access token in authorization header.
Jwt.strategy has to have validation function in order for this to work. Value that validate function returns, payload in this case, is going to be appended to request, more precisely to user object from request (req.user).
Since we are going to read user directly from database, aside from config, we need to pass prisma to constructor of jwt.strategy, as private property. Reason for not declaring config as private is because it is not used out of constructor (super()).
If validate() function returns null, it is going to throw 401 unauthorized error.
Whenever we put string somewhere, it can create error, so we are going to create guard folder and export files inside auth folder, and import JwtGuard class in user.controller. The same way we can make folder decorator and make decorators that will replace @Req above getMe method, creating custom param decorator in file get-user.decrator.ts. Content of this file is copied from official nestjs documentation, reguarding custom decorators, specificaly to get user object from request. getMe request user is of type User, that is returned from PrismaClient, since User class is defined in prisma schema.
Guards decorators can be defined on method or controller level, in which case it validates calls for all methods in controller.
getMe method can return any property, if decorator set like for email example: getMe(@GetUser() user: User, @GetUser('email') email: string) {. Now, we have access to email property, returned from get-user.decorator.

## Decorators

Post method return 201 status code. HttpDecorator can be used to send status 200 status code with: @HttpCode(HttpStatus.OK) or @HttpCode(200).

## Testing

There are: unit testing, integration testing and end to end testing (e2e). Unit testing simulates function calls. Integration testing can use, for instance, three modules: auth, prisma and configuration. Then it can test only theirs functionalities. Integration testing allows you to define some segments of app and test them together. E2e testing usualy test high level of app usage.For example, user signs in app, requests his profile, changes something etc.
Tests should be conducted over test database. By default nestjs uses supertest package for testing, but in this example, we are going to use pactumjs. Install command: npm i --save-dev pactum.
We are going to delete everything from test/app.e2e-spec.ts file.
Test running script: npm run test:e2e. Testing didn't pass as expected. It is going to be added later.

## User service

nest g service user --no-spec

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
