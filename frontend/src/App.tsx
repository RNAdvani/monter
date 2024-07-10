import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OtpComponent from "./components/OtpComponent"
import RegisterForm from "./components/RegisterForm"
import Profile from "./components/ProfileSetUp";
import LoginForm from "./components/LoginPage";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";

const App = () => {
  return (

   
        <Router>
            <Routes >
              <Route path="/" element={<Header />} />
              <Route  path="/register" element={<RegisterForm />} />
              <Route  path="/login" element={<LoginForm />} />
              <Route  path="/otp" element={<OtpComponent />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:bookId" element={<SingleBook />} />
            </Routes>
        </Router>
      );
    }
export default App