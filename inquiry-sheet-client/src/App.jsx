import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import InquiryList from "./pages/InquiryList";
import Home from "./pages/Home";
import Header from "./components/Header";
import PrivateRoutes from "./components/PrivateRoutes";
import Profile from "./pages/Profile";
import PrivateInquiryList from "./components/PrivateInquiryList";
import Inquiry from "./pages/Inquiry";
import UserCheck from "./components/UserCheck";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<UserCheck />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<PrivateInquiryList />}>
          <Route path="/inquiries" element={<InquiryList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
