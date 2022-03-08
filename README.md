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
