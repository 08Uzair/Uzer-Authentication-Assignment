import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./components/Form";
function App() {
  const profile = JSON.parse(localStorage.getItem("profile"));
  console.log(profile);
  let isAuthenticated;
  if (profile === null) {
    isAuthenticated = false;
  } else {
    isAuthenticated = true;
  }
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/home" element={<Home/>}/> */}
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!isAuthenticated ? <Form /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
