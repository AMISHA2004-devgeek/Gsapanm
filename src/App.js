import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnimatedImage from "./components/AnimatedImage";
import Home from "./pages/Home"; // Adjust this based on your project structure

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AnimatedImage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </Router>
);

export default App;
