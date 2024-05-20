import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import InquiryList from "./pages/InquiryList";
import Home from "./pages/Home";
import Header from "./components/Header";
import PrivateProfile from "./components/PrivateProfile.";
import Profile from "./pages/Profile";
import PrivateInquiry from "./components/PrivateInquiry";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateProfile />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateInquiry />}>
          <Route path="/inquiry" element={<InquiryList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
