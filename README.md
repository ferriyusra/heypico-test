### Result

We Give the prompt like in the picture and the response given the format name,location,link and iframe if found.

![image](https://github.com/user-attachments/assets/5624eaaf-0f37-43b9-84fa-01ea0748d8c5)

![image](https://github.com/user-attachments/assets/1b799cc0-dc38-43c3-b8cd-b18c6e6b36fe)



### API Docs

- API Docs : TODO

### Branch Rule

- feature/{}
- fixing/{}
- hot-fix/{}

ex:

- feature/login
- fixing/login
- hot-fix/typo-in-login

### ExpressJS With Typescript and Simple Repository Pattern

#### Tech Stack

- Express
- Prisma ORM
- Mysql

#### Express Configuration

- Environment variable
- Validation Yup
- API Docs (Swagger)
- Logger

### Command

#### NPM

1. Install packages
   `npm install`
2. Run llm
   `npm run dev`

#### Prisma Command

1. Migrate
   `npx prisma migrate dev --name init`
2. Migrate in Prod
   `npx prisma migrate deploy`
3. Generate prisma client
   `npx prisma generate`

### Refrerence

- https://www.npmjs.com/package/yup
- https://www.prisma.io/docs/orm/overview/introduction

# Deploy Dockerfile

- using node alpine as build
- using multi stage step to resize image container
- docker build -t service-be .
- docker run -p 8080:8080 service-be

docker run -p 9852:9852 service-be
