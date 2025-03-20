

# Forever
## Deployment : [https://great-e-commercefront.vercel.app/]

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features
- **User Authentication**: Register, login, and logout with JWT-based authentication.
- **Product Catalog**: Browse products with filtering, sorting, and search functionality.
- **Shopping Cart**: Add, update, and remove items with real-time updates via Redux.
- **Payment Integration**:
  - Secure checkout with **Stripe** for credit/debit card payments.
  - Alternative payment option with **PayPal**.
- **Order Management**: View order history and track order status.
- **Admin Dashboard**: Manage products, categories, and orders (add, edit, delete).
- **Responsive Design**: Mobile-friendly UI built with CSS Tailwind CSS.
- **State Management**: Centralized state handling using Redux for cart, user, and app data.
- **Database**: MongoDB for storing products, users, and orders.
- **cloudinary**▶️ for file storage

## Tech Stack
- **Frontend**: React.js, Redux, HTML5, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Payment Gateways**: Stripe, PayPal SDK
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**:https://great-e-commercefront.vercel.app/

---

## Installation

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)
- Git
- Stripe and PayPal API keys

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/e-commerce-app.git
   cd e-commerce-app
   ```

2. **Install Dependencies**:
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the `backend` folder:
     ```
     NODE_ENV=development
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     STRIPE_SECRET_KEY=your_stripe_secret_key
     PAYPAL_CLIENT_ID=your_paypal_client_id
     ```
   - *(Add any other env vars your app uses.)*

4. **Run the App**:
   - Start the backend:
     ```bash
     cd backend
     npm run dev
     ```
   - Start the frontend:
     ```bash
     cd frontend
     npm start
     ```
   - The app should now be running at:
     - Frontend: `http://localhost:3000`
     - Backend API: `http://localhost:5000`

5. **Seed the Database** (optional):
   - If you have a script to populate products:
     ```bash
     cd backend
     npm run seed
     ```

---

## Usage
1. **Browse Products**: Visit the homepage to see available products.
2. **Add to Cart**: Click "Add to Cart" and manage items in the cart page.
3. **Checkout**: Proceed to checkout, choose Stripe or PayPal, and complete payment.
4. **Admin Access**: Log in with admin credentials to manage the store (e.g., `/admin` route).

*(Add specific instructions or demo credentials if applicable.)*

---

## Project Structure
```
e-commerce-app/
├── backend/              # Server-side code
│   ├── config/           # DB config
│   ├── controllers/      # Route handlers
│   ├── models/           # Mongoose schemas (User, Product, Order)
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth and error handling
│   ├── .env              # Environment variables
│   └── server.js         # Entry point
├── frontend/             # Client-side code
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # React pages (Home, Cart, Checkout)
│   │   ├── redux/        # Redux store, actions, reducers
│   │   ├── App.tsx       # Main app component
│   │   └── index.tsx     # Entry point
│   └── public/           # Static assets
├── README.md
└── package.json
```

---

## API Endpoints
*(Example endpoints—update with your actual routes.)*
- **Users**:
  - `POST /api/users/register` - Register a new user
  - `POST /api/users/login` - Login and get JWT
- **Products**:
  - `GET /api/products` - List all products
  - `GET /api/products/:id` - Get product details
- **Cart**:
  - `POST /api/cart` - Add item to cart (handled via Redux on frontend)
- **Orders**:
  - `POST /api/orders` - Create an order
  - `GET /api/orders/mine` - Get user’s order history
- **Payments**:
  - `POST /api/payments/stripe` - Process Stripe payment
  - `POST /api/payments/paypal` - Process PayPal payment

*(Run `npm run dev` and test with Postman or the frontend.)*

---



## Contact
- **Author**: Mohammed Sobhi
- **Email**: moha.yahoo@gmail.com
- **GitHub**: https://github.com/MohammedSobhi606/great_e-Commerce/
- **Live Demo**: [(https://great-e-commercefront.vercel.app/)](#)

---

### Customization Tips
1. **Screenshot**: Take a screenshot of your app (e.g., with `Windows Key + Shift + S`), save it in `frontend/public/`, and update the image path at the top.
2. **Features**: Add specifics like “Product Reviews” or “Wishlist” if implemented.
3. **Deployment**: If deployed (e.g., Vercel for frontend, Render for backend), include links and instructions.
4. **Dependencies**: Mention specific versions if critical (e.g., `"redux": "^4.2.0"`).

Let me know if you want to tweak any section or add more details (e.g., specific API routes, deployment steps)! What’s your app called? I can personalize the title too.
