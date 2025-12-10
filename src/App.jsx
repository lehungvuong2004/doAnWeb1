import { Routes, Route } from "react-router-dom";
import LoginForm from "./componemt/login/LoginForm.jsx";
import { Forget } from "./componemt/quenmatkhau/Forget.jsx";
import Register from "./componemt/dangky/Register.jsx";
import NhanVien from "./componemt/nhanvien/NhanVien.jsx";
import MainLayout from "./mainlayout/MainLayOut.jsx";
import TinKhuyenMai from "./componemt/header/TinKhuyenMai.jsx";
import DauBepHeader from "./componemt/header/DauBepHeader.jsx";
import LienHeChiDuong from "./componemt/header/LienHeChiDuong.jsx";
import BiQuyetNauAn from "./componemt/header/BiQuyetNauAn.jsx";
import GioiThieuNhaHang from "./componemt/header/GioiThieuNhaHang.jsx";
import DoAn from "./componemt/header/DoAn.jsx";
import Logout from "./componemt/login/Logout.jsx";
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<Register />} />
                <Route path="/sale/tinkhuyenmai" element={<TinKhuyenMai />} />
                <Route path="/map" element={<LienHeChiDuong />} />
                <Route path="/recipes" element={<BiQuyetNauAn />} />
                <Route path="/chef" element={<DauBepHeader />} />
                <Route path="/about" element={<GioiThieuNhaHang />} />
                <Route path="/forget" element={<Forget />} />
                <Route path="/food" element={<DoAn />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
            {/* <MainLayout/> */}
        </>
    );
}

export default App;
