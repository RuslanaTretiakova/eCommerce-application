# 🛒 eCommerce Application

## 📄 About this repository

This repository is a **personal copy (fork)** of the **team project** developed during the **final task of the Rolling Scopes School JS/FE Course EN 2024Q4 by our **Reactive team**.

The **original project repository**, which was created and maintained collaboratively by all team members, is available here:  
👉 [Original Team Repository - DzmitryAliakseyeu/online-store](https://github.com/DzmitryAliakseyeu/online-store)

This personal repository serves as part of my **portfolio**, where I highlight my **individual contribution** and **learning progress**.

My forked repository:  
👉 [My Repository - RuslanaTretiakova/eCommerce-application](https://github.com/RuslanaTretiakova/eCommerce-application)

---

## 💡 Project Overview

This project is an **e-commerce web application**, designed to provide users with a smooth shopping experience.  
Key features include:

- Product browsing
- Search and filtering
- Detailed product views
- Shopping cart functionality
- Checkout process

The project simulates a **real-world team development environment**, where each team member was responsible for specific tasks.

---

## 💼 My Personal Contribution

✅ **User Registration Flow:**

- Full implementation of user registration
- Form validation
- Authentication integration
- Automatic login
- Address selection

✅ **User Profile Page:**

- Editable user information
- Email and password management
- Address management

✅ **Shopping Cart Functionality:**

- Add/remove item logic
- Integration with the backend API for cart management


## 💻 Technology Stack

- **Frontend:** HTML, CSS, TypeScript
- **Framework:** React
- **Build Tool:** Vite
- **Linting & Style Guide:** ESLint with Airbnb Style Guide
- **Formatter:** Prettier
- **Testing:** Vitest
- **Git Hooks:** Husky

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

---

### Installation

1. Clone the repository:

```bash
git clone https://github.com/RuslanaTretiakova/eCommerce-application.git
```

2. Navigate to the project directory:

```bash
cd eCommerce-application
```

3. Install dependencies:

```bash
npm install
```

If you encounter dependency errors:

```bash
npm install --legacy-peer-deps
```

---

### Available Scripts

- `npm run dev` – Runs the app in development mode.
- `npm run build` – Builds the app for production.
- `npm run preview` – Serves the production build locally.
- `npm run lint` – Runs ESLint for code checks.
- `npm run lint:fix` – Automatically fixes lint errors.
- `npm run format` – Formats code with Prettier.
- `npm run prepare` – Sets up Husky Git hooks.
- `npm run test` – Runs unit tests with Vitest.
- `npm run test:coverage` – Runs tests with code coverage.
- `npm run test:ui` – Opens the Vitest UI for interactive test debugging.

---

## 🛠️ ESLint Configuration Tips

To enable type-aware lint rules for production apps, update ESLint config:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also add React-specific rules:

```js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
