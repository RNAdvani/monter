import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OtpComponent from "./components/OtpComponent"
import RegisterForm from "./components/RegisterForm"
import Profile from "./components/ProfileSetUp";


// import LoginComponent from "./components/LoginComponent";
// import ProfileComponent from "./components/ProfileComponent";

const App = () => {
  return (

   
        <Router>
            <Routes >
              <Route  path="/register" element={<RegisterForm />} />
              <Route  path="/otp" element={<OtpComponent />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/books" element={<h1>Books</h1>} />
            </Routes>
        </Router>
      );
    }
export default App