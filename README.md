# E-commerce App

A shop demo with a Spring Boot API and a React/TypeScript app. The backend has accounts, products, carts, orders, and shipping methods in MySQL. The React app has product, cart, checkout, and order pages.

## Code

- `backend-springboot/` has the API, database models, login rules, and business code.
- `frontend-reactjs/` has the pages and API calls.

## Run locally

You need Java 17, MySQL 8, and Node.js. The default Spring profile is `dev`. Set its MySQL URL, user, and `DB_PASSWORD` in `backend-springboot/src/main/resources/application-dev.properties`. Set `JWT_SECRET` and `DEMO_USER_PASSWORD` in your environment.

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

