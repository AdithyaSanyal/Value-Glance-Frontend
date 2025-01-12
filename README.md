# Value Glance

Value Glance frontend web application built with React, Axios, and TailwindCSS. It provides features sort and filter various financial data

## Project Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses TailwindCSS for styling.

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (version 14 or higher recommended)
- Yarn package manager (optional but recommended)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload automatically when you make changes to the source files.\
You may also see lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It optimizes the app for best performance by minifying the code and including hashed filenames.\
Your app is ready to be deployed.

### `yarn test`

Launches the test runner in an interactive watch mode.\
This includes tests written using the `@testing-library/react` framework.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you cannot revert!**\
This command exposes the configuration files for React, Webpack, Babel, ESLint, etc. Use it only if you need advanced customization.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Axios**: For making HTTP requests to APIs.
- **TailwindCSS**: A utility-first CSS framework for designing responsive and modern interfaces.
- **React Icons**: For embedding scalable vector icons.
- **React Testing Library**: For writing tests for React components.

## Folder Structure

- **`src/`**: The main source code directory.
  - **`components/`**: Reusable UI components.
  - **`utils/`**: Helper functions and API utilities along with constants.
  - **`App.js`**: Main entry point for the React app.
  - **`index.js`**: Application bootstrap file.

## Styling with TailwindCSS

This project uses TailwindCSS for styling. To customize the styles:
1. Modify the `tailwind.config.js` file.
2. Add or extend classes in your JSX files.

For more information, see the [TailwindCSS documentation](https://tailwindcss.com/docs).

## Axios Integration

The project uses Axios to fetch and manage data from APIs.\
To update or configure API requests:
1. Edit files in the `utils/` directory.
2. Update base URLs or endpoints as necessary.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).\
For TailwindCSS, visit the [TailwindCSS documentation](https://tailwindcss.com/docs).\
For Axios, see the [Axios GitHub page](https://github.com/axios/axios).