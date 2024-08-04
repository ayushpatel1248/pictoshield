import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter ,useParams  } from "react-router-dom";
import Register from "./register/Register";
import Login  from './login/Login';
import ThreeJSComponent from './paralex/ThreeJSComponent';
import ForgotPassword from './forgotPassword/ForgotPassword';
import NewPassword from './newpassword/NewPassword';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<div><ThreeJSComponent /></div>}/>
      <Route path="/register" element={<div> <Register /></div>} />
      <Route path="/login" element={<div> <Login /></div>} />
      <Route path="/forget-password" element={<div> <ForgotPassword /></div>} />
      <Route path="/forget-password/set-new-password" element={ <div> <NewPassword/></div>} />
    </Routes>
  </BrowserRouter>
    
  );
}

export default App;
