
# Basic User Registration and Login System using Next.js, TypeScript, and Prisma

This is a basic user registration and login system. The frontend was built with Next.js, and a backend using Prisma as the ORM for
interacting with the database. The system allows for user registration and
login.


#### Please note that the database used for this project is MongoDB with Prisma as the ORM.



## Run Locally

Clone the project

```bash
  git clone git@github.com:CodeLawd/casava-test.git
```

Go to the project directory

```bash
  cd casava-test
```

Install dependencies

```bash
  yarn install
```

Migrate your database

```bash
  yarn prisma generate
```

Start the server

```bash
  yarn dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

#### Note: Please for the database uri, kindly make use of MongoDB Atlas as the project requires MongoDB server to be run as a replica set.

`DATABASE_URL` - This is the database url. Kindly add yours db uri. 

`SECRET_KEY` - This is the key used for jwt. Use any string.


## Live URL

[Live Preview](https://casava-test.vercel.app)


## Features

- Create an account using your email, username and password
- Login using your credentials
- You can't access dashboard unless you are authenicated


## Tech Stack

**Client:** Next.js, TypeScript and Material UI (MUI)

**Server:** Prisma, TypeScript and MongoDB


## Author

- [Joshua Alexander (@codelawd)](https://www.github.com/codelawd)

