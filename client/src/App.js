import "./css/App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import Register from "./pages/Register.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import ResetPassword from "./pages/ResetPassword.js";

function App() {

  return (
    <div className="App">
      <Router>
        <Link id="title" to="/">Cre8Share</Link>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgotpassword" element={<ForgotPassword/>} />
          <Route path="/resetpassword" element={<ResetPassword/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;