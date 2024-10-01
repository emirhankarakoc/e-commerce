# E-Commerce Application Backend 🚀

## Features

- Easy and understandable project structure
- Easy startup

### Backend

- Spring Boot: A powerful framework for creating production-grade Spring-based applications.
- Spring Security: Provides customizable authentication and access control for your application.
- Spring Data JPA: Simplifies database interactions with a clean, repository-based approach.(Includes crud applications for User entity)
- Cloudinary Static File Serving: Efficiently serves static resources. (please dont use mine)
- Custom API Exceptions: Handle and customize exceptions in a user-friendly way. `throw new BadRequestException("your message")

## Getting Started

## Prerequisites

- Java 11 or higher
- MySQL 8

## Setup

### Clone the repository:

`git clone https://github.com/emirhankarakoc/fullstack-template.git
cd fullstack-template`

### Navigate to the backend directory:

`cd backend`
Build and run the Spring Boot application:
`./mvnw spring-boot:run`

# How to use

- Start the project with mysql config.
- If you started with :8080 port, [click here for swagger](http://localhost:8080/swagger-ui/index.html), if you dont. Click the link and change port.
-
- There is lots of endpoints you will see in 9 controllers.

## Authentication

- Use `POST /accounts/register` for register.
- After register, you need to login for get jwt token from `POST /accounts/login`
- PS: if you want to be an admin, you need to change from database. there is not a endpoint for being an admin.

# important notes

- This is a e-commerce project, so we need to add products and add shipping methods.
- If you want to sell, you need to be admin. I won't tell you anymore, open db and change your role `from ROLE_USER to ROLE_ADMIN`

## Usage guide (for admin)

- There are 2 points you should pay attention, smartphones and shipping methods.

### Smartphones

- Create a product from `POST /smartphones`. Add images, add some informations but there is a important point you need to be in attention. `colornames` field.
- Color names , as you understand its NAME, like blue, yellow or red...
- We need show colors on frontend, so you don't need color's name. You need color's `hex code` like `#FFFFFF`, `#000000` (white and black colors hex codes).
-
- After you have created the products you want to sell, you can see all of them
  from `GET /smartphones`.
- You also can see single product with `GET /smartphones/{smartphoneId}`
- You can update your product from `PUT /smartphones/{smartphoneId}`. (All datas, images, color options , memory options , EVERYTHING will be deleted).

### Shipping Methods

- Create a shipping method from `POST /admins/shipping-methods` with name, description and cost <strong>Don't put $ symbol in cost, frontend adds.</strong><br>
- example json for this api
- `{
  "name": "Express Shipping",
  "description": "Fast delivery within 1-2 business days",
  "cost": 5.99
}`
- You also can see all of shipping methods with `GET /shippingmethods`.
- You also can one of shipping method with `GET /shippingmethods/{id}`.

## Usage guide (for user)

Actually , you don't need backend for user guide but let me explain how works, because its documentation.

### Selecting product and adding to cart

- `GET /smartphones` , choose any product and `GET /smartphone/{id}`
- Now we need to add to cart our product and options from `POST /carts` with this body <br> `{
  "productId": "any product's id",
  "productColor": "#123531",
  "productMemory": "256GB"
}`

- You can list your cart from `GET /carts/myCart`
- You also can remove any item from your cart from `DELETE /carts/{id}`

### Creating an adress for buying

- You need choose address to shipping. You can't buy without address and shipping method and ofc product...
- Create an address from `POST /users/addresses` with your `jwt token`. If you don't use, you will get 401. So you have to log in.

### Creating order
- You must logged in for create an order.
- Cart (Backend pulls your cart from your user id from jwt token.)
- Address Id 
- Shipping Method Id
- Card details (ownerName, expiration,cvv,cardNumber)

### Listing your orders
- `GET /orders/all` gives all your orders. So you need logged in for use this endpoint.
- You also can see single order `GET /orders/{id}`
- You can see order status:  `PREPARING,SENT,FINISHED` 



## Contributing

We welcome contributions to this project! Please fork the repository and submit a pull request with your proposed changes. Ensure to follow the project's coding standards and test your changes before submitting.

## Contact

`emirhankarakoc@yahoo.com`
For any questions or suggestions, feel free to open an issue or contact us directly.

`Happy coding! 😄`
emirhan karakoc, july 2024
