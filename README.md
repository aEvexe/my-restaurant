# 🍽️ MyRestaurant Backend

A robust NestJS + Sequelize backend for managing restaurant operations — including reservations, payments, menus, tables, favorites, notifications, and more.

---

## 📦 Tech Stack

- **Framework**: NestJS (TypeScript)
- **ORM**: Sequelize
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Validation**: class-validator + Swagger decorators
- **API Testing**: Postman
- **Authorization**: Role-based Guards

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/myrestaurant.git
cd myrestaurant
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_DATABASE=myrestaurant
JWT_SECRET=supersecretkey
```

### 4. Run the Application

```bash
npm run start:dev
```

---

## 🧱 Project Structure

```
src/
├── auth/
├── categories/
├── customers/
├── favorites/
├── menu-images/
├── menu-options/
├── menus/
├── notifications/
├── payments/
├── reservations/
├── reviews/
├── roles/
├── tables/
├── users/
└── common/guards/
```

---

## 🔐 Guards

| Guard              | Decorator Example                | Description                     |
|-------------------|----------------------------------|---------------------------------|
| `AdminGuard`       | `@UseGuards(AdminGuard)`         | Only admins allowed             |
| `SelfGuard`        | `@UseGuards(SelfGuard)`          | Only the resource owner allowed |
| `SelfOrAdminGuard` | `@UseGuards(SelfOrAdminGuard)`   | Admins or the resource owner    |

---

## 🧠 Smart Queries

### 1. Top 5 Users with the Highest Payments in a Date Range

**GET**

```
/api/payments/top-range?start=2025-06-01&end=2025-07-01
```

**Returns:**

```json
[
  {
    "userId": 12,
    "totalPaid": "1050000",
    "user": {
      "full_name": "Ali Valiev",
      ...
    }
  },
  ...
]
```

---

### 2. Only Allow Payment by the Reservation Owner

In the `create()` and `update()` methods of `PaymentsService`:

```ts
if (reservation.userId !== dto.userId) {
  throw new ForbiddenException("Reservation doesn't belong to user");
}
```

---

## 📫 API Testing (Postman)

1. Register or log in via `/auth/register` or `/auth/login`
2. Copy the access token
3. Set headers in Postman:

```http
Authorization: Bearer <your_token>
```

---

## 📖 Swagger Documentation

To enable Swagger, add this to `main.ts`:

```ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('MyRestaurant API')
  .setDescription('Restaurant platform backend')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);
```

📍 Visit: `http://localhost:3000/api/docs`

---


## 📝 License

This project is licensed under the MIT License.  
See the [LICENSE](./LICENSE) file for full license information.
