import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Inquiry from "./pages/Inquiry";
import Home from "./pages/Home";
import Header from "./components/Header";
import PrivateRoutes from "./components/PrivateRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/inquiry" element={<Inquiry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
