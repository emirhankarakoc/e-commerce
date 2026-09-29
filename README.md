# E-commerce Application

A full-stack shop prototype with a Spring Boot API and React/TypeScript frontend. The backend models accounts, products, carts, and related catalog data.

## Backend
The `backend-springboot/` module uses Spring Security, Spring Data JPA, and MySQL. Feature packages separate controllers, services, and repositories. Authentication and catalog/cart flows are the main areas to inspect.

## Frontend
`frontend-reactjs/` is a React/TypeScript client for the API.

## Run locally
Install Java 17, MySQL 8, and Node.js. Configure a local database and the active Spring profile. Provide `JWT_SECRET` and `DEMO_USER_PASSWORD` as environment variables. Image upload requires your own Cloudinary configuration and `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET`. Check the profile-specific properties before starting the API.

```bash
cd backend-springboot
./mvnw spring-boot:run
```

In a second terminal:

```bash
cd frontend-reactjs
npm install
npm run dev
```

## Status
This is a portfolio prototype. The repository has a Spring Boot context test, but does not yet provide comprehensive business-flow tests. Credentials previously committed to Git history should be replaced if they were used on active services.
