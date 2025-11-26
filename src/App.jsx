import { Routes, Route } from "react-router-dom";
import LoginForm from "./componemt/login/LoginForm.jsx";
import { Forget } from "./componemt/quenmatkhau/Forget.jsx";
import Register from "./componemt/dangky/Register.jsx";
import MainLayout from "./mainlayout/MainLayOut.jsx";
import TinKhuyenMai from "./componemt/header/TinKhuyenMai.jsx";
import LienHeChiDuong from "./componemt/header/LienHeChiDuong.jsx";
import BiQuyetNauAn from "./componemt/header/BiQuyetNauAn.jsx";
function App() {
  return (
  <>
      <Routes>  
        <Route path="/" element={<MainLayout />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sale/tinkhuyenmai" element= {<TinKhuyenMai/>} /> 
        <Route path="/map" element= {<LienHeChiDuong/>} /> 
        <Route path="/recipes" element= {<BiQuyetNauAn/>} /> 
        
        <Route path="/forget" element={<Forget />} />
      </Routes>
      {/* <MainLayout/> */}
    </>
  );
}

export default App;
