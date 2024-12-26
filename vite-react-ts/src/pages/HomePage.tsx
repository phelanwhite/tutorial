import React from "react";

const HomePage = () => {
  return (
    <div>
      <div className="space-y-2">
        <h3>1. React Tutorial</h3>
        <p>React is a JavaScript library for building user interfaces.</p>
        <p>React is used to build single-page applications.</p>
        <p> React allows us to create reusable UI components.</p>
      </div>
      <div className="space-y-2">
        <h3>2. React Tutorial</h3>
        <h4>2.1 Create React App</h4>
        <code>npx create-react-app my-react-app</code>
        <code>cd my-react-app</code>
        <code>npm start</code>

        <h4>2.2 Create React App With Typescript</h4>
        <code>npx create-react-app my-app --template typescript</code>
        <code>cd my-react-app</code>
        <code>npm start</code>

        <h4>2.2 Create React App With Vite</h4>
        <code>npm create vite@latest</code>
      </div>
    </div>
  );
};

export default HomePage;
