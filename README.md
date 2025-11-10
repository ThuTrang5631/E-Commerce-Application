# E-Commerce Application

An E-Commerce application built with React, TypeScript, and Vite, providing basic online shopping features.

## 🚀 How to Run the Project

### System Requirements
- Node.js (version >= 18.x)
- npm or yarn
- Git

### Installation

1. **Clone the repository:**
```bash
git clone <https://github.com/ThuTrang5631/E-Commerce-Application.git>
cd E-Commerce-Application
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Run in development mode:**
```bash
npm run dev
# or
yarn run dev
```

The application will run at `http://localhost:5173`


### Login Credentials

The project uses API from [DummyJSON](https://dummyjson.com), you can use the following test accounts:

- **Username:** oliviaw
- **Password:** oliviawpass

Or any account from: https://dummyjson.com/users

## 📁 Folder Structure

```
E-Commerce-Application/
├── public/                     # Static assets
│   └── vite.svg
├── src/
│   ├── components/             # Reusable components
│   │   ├── CardCheckout/      
│   │   ├── CardItem/     
│   │   ├── CartItem/         
│   │   ├── Footer/             
│   │   ├── Header/           
│   │   ├── Layout/             
│   │   └── ProtectRoute/       
│   │
│   ├── pages/                  # Main application pages
│   │   ├── Cart/               # Shopping cart page
│   │   │   ├── index.tsx       # UI component
│   │   │   └── service.ts      # API services
│   │   ├── Checkout/           # Checkout page
│   │   │   ├── index.tsx
│   │   │   └── service.ts
│   │   ├── Login/              # Login page
│   │   │   ├── index.tsx
│   │   │   ├── service.ts
│   │   │   └── data.t.ts       # Type definitions
│   │   └── ProductList/        # Product listing page
│   │       ├── index.tsx
│   │       ├── service.ts
│   │       └── data.t.ts
│   │
│   ├── store/                  # Zustand state management
│   │   ├── useAuth.ts          # Authentication state
│   │   ├── useCart.ts          # Cart state management
│   │   └── useProducts.ts      # Products state management
│   │
│   ├── styles/                 # SCSS styling files
│   │   ├── _index.scss         # Main styles entry point
│   │   ├── components/         # Component-specific styles
│   │   │   ├── _card-item.scss
│   │   │   ├── _cart-item.scss
│   │   │   └── _header.scss
│   │   └── pages/              # Page-specific styles
│   │       ├── _cart.scss
│   │       ├── _checkout.scss
│   │       ├── _login.scss
│   │       └── _product-list.scss
│   │
│   ├── utils/                  # Utility functions and constants
│   │   ├── constants.ts        # App constants (routes, API URLs)
│   │   ├── handler.ts          # Helper functions
│   │   └── request.ts          # Axios instance and API interceptors
│   │
│   ├── App.tsx                 # Root component with routing
│   ├── main.tsx                # Entry point
│   └── index.css               # Global CSS
│
├── eslint.config.js            # ESLint configuration
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
└── package.json                # Dependencies and scripts

```

## 💡 Challenges and Considerations During Implementation
- It was our first time using the Zustand library, so I had to research and familiarize ourselves with it before implementation, which took additional time.
- DummyJSON provides only basic endpoints, so I customized it with extra logic to handle more realistic cases like adding items to a cart.
- I was confused when calling the API to get a user’s cart, as the response returned array carts, each containing several products. I expected the API to return only one cart with the user’s added products.??
- Since there are no APIs for adding carts or checkout, I only simulated a successful case during implementation. Exception handling for other cases hasn’t been fully implemented yet.
- Separate APIs for listing and searching (getProductsAll vs. search) — required extra logic to ensure consistent results and user experience.