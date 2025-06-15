# My React Material UI App

This project is a React application that utilizes Material UI for building user interfaces. It demonstrates how to set up a React application with TypeScript and integrate Material UI components.

## Project Structure

```
my-react-materialui-app
├── public
│   └── index.html          # Main HTML file for the application
├── src
│   ├── App.tsx            # Main application component with routing
│   ├── index.tsx          # Entry point of the React application
│   ├── components
│   │   ├── ExampleComponent.tsx # Sample UI component using Material UI
│   │   └── TreeTablePage.tsx    # Page with tree and table interaction
│   └── theme
│       └── theme.ts       # Custom Material UI theme
├── package.json            # npm configuration file
├── tsconfig.json           # TypeScript configuration file
└── README.md               # Project documentation
```

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd my-react-materialui-app
   ```

2. **Install dependencies:**
   ```
   pnpm install
   ```

3. **Run the application:**
   ```
   pnpm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Usage

- The main application component is located in `src/App.tsx` and now includes routing with a landing page and a Tree Table page.
- The `ExampleComponent` in `src/components/ExampleComponent.tsx` serves as a sample UI element that demonstrates the use of Material UI components.
- The `TreeTablePage` in `src/components/TreeTablePage.tsx` demonstrates a tree view with a table that updates based on tree selection.
- You can customize the Material UI theme in `src/theme/theme.ts` to fit your design requirements.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.