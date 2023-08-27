import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/userSlice";


function App() {
  const dispatch = useDispatch();
  const {user} = useSelector(state => (state.user));
  console.log(user)
  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
