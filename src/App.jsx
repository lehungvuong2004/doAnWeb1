import { Routes, Route } from "react-router-dom";
import LoginForm from "./componemt/login/LoginForm.jsx";
import { Forget } from "./componemt/quenmatkhau/Forget.jsx";
import Register from "./componemt/dangky/Register.jsx";
import MainLayout from "./mainlayout/MainLayOut.jsx";
function App() {
  return (
    <>
      <Routes>
        {/* Trang layout chính */}
        {/* Layout chính */}
        <Route path="/" element={<MainLayout />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<Forget />} />
      </Routes>
      {/* <MainLayout/> */}
    </>
  );
}

export default App;
