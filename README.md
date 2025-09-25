````markdown
# 🏕️ The Wild Oasis

This is a cabin management web application built as part of the
["Ultimate React Course"](https://www.udemy.com/course/the-ultimate-react-course/)
by Jonas Schmedtmann. It is a comprehensive, real-world project that covers many
advanced React concepts and practices.

## 💻 Developed by

- **Ali Shapoori**

## 📜 Description

The Wild Oasis is an internal application for a small boutique hotel to manage
cabins, bookings, and guests. It provides a dashboard to visualize key metrics
and allows for easy management of the hotel's operations.

## ✨ Features

- **Authentication:** Secure user login and management.
- **Dashboard:** An overview of important statistics like recent bookings,
  sales, and occupancy rates.
- **Bookings Management:** View, create, update, and delete bookings.
- **Cabins Management:** Add, edit, and delete cabins, including images and
  details.
- **Settings:** Update hotel settings like breakfast price, max guests per
  booking, and max booking length.
- **Dark Mode:** A stylish and functional dark mode for the entire application.

## 🚀 Technologies Used

- **[React](https://reactjs.org/)**: A JavaScript library for building user
  interfaces.
- **[Vite](https://vitejs.dev/)**: A fast and modern build tool for web
  development.
- **[Styled Components](https://styled-components.com/)**: A library for styling
  React components with CSS-in-JS.
- **[React Router](https://reactrouter.com/)**: A standard library for routing
  in React.
- **[React Query](https://tanstack.com/query/v4)**: A powerful data-fetching and
  state management library.
- **[React Hook Form](https://react-hook-form.com/)**: A library for building
  performant and flexible forms in React.
- **[Supabase](https://supabase.io/)**: An open-source Firebase alternative for
  the backend, database, and authentication.
- **[Recharts](https://recharts.org/)**: A composable charting library built on
  React components.

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and
[npm](https://www.npmjs.com/) installed on your machine.

### Installation

1.  Clone the repo
    ```sh
    git clone [https://github.com/your-username/the-wild-oasis.git](https://github.com/your-username/the-wild-oasis.git)
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  **Set up Supabase**

    - You will need to create a new project on [Supabase](https://supabase.io/)
      to get your project URL and anon key.
    - Navigate to the `src/services/supabase.js` file (or wherever your Supabase
      client is initialized).
    - Replace the placeholder values with your actual Supabase URL and key.

    ```javascript
    // Example from src/services/supabase.js

    import { createClient } from "@supabase/supabase-js";
    export const supabaseUrl = "YOUR_SUPABASE_URL";
    const supabaseKey = "YOUR_SUPABASE_ANON_KEY";
    const supabase = createClient(supabaseUrl, supabaseKey);

    export default supabase;
    ```

    - In your Supabase project, you'll also need to create the necessary tables
      and relationships as shown in the course.

### Usage

To run the app in development mode, run the following command:

```sh
npm run dev
```
````

Open
[http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)
to view it in the browser.

## 🙏 Acknowledgements

This project was built with the guidance and teachings of **Jonas Schmedtmann**
in his
["Ultimate React Course"](https://www.udemy.com/course/the-ultimate-react-course/).
I highly recommend this course to anyone looking to master React and build
real-world applications.

```

```
