import Header from "./components/Header.jsx";

const Footer = () => {
  return (
      <footer>
          <p>&copy; 2025 My Single Page</p>
      </footer>
  );
};

const App = () => {
  return (
      <div>
          <Header />
          <Footer />
      </div>
  );
};

export default App;