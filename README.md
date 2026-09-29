# E-commerce App

A shop demo with a Spring Boot API and a React/TypeScript app. The backend has accounts, products, carts, and catalog data in MySQL.

## Code

- `backend-springboot/` has the API, database models, login rules, and business code.
- `frontend-reactjs/` has the pages and API calls.

## Run locally

You need Java 17, MySQL 8, and Node.js. Set your database and Spring profile. Set `JWT_SECRET` and `DEMO_USER_PASSWORD`. Image upload needs your own Cloudinary settings, including `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET`.

```bash
cd backend-springboot
./mvnw spring-boot:run
```

In another terminal:

```bash
cd frontend-reactjs
npm install
npm run dev
```

This is a portfolio demo. It has a Spring startup test, but no full set of tests for the shop flows. Replace old credentials from Git history if they were used on real accounts.
