import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnimatedImage from "./components/AnimatedImage";
import AboutUs from "./pages/AboutUs";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AnimatedImage />} />
      <Route path="/about-us" element={<AboutUs />} />
    </Routes>
  </Router>
);

export default App;
