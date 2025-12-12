import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// ... (Giữ nguyên các import component của bạn)
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
import Cart from "./componemt/cart/Cart.jsx";

function App() {
    // ------------------ GIỎ HÀNG TỔNG ------------------

    // 👉 SỬA LỖI: Kiểm tra URL ngay khi khởi tạo State
    const [cart, setCart] = useState(() => {
        // 1. Kiểm tra xem có phải vừa thanh toán thành công về không
        const queryParams = new URLSearchParams(window.location.search);
        const status = queryParams.get("status");

        if (status === "success") {
            // Nếu thành công -> Xóa localStorage ngay lập tức
            localStorage.removeItem("cart");
            return []; // Trả về giỏ hàng rỗng
        }

        // 2. Nếu không phải thì lấy từ localStorage bình thường
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    // 👉 Effect 1: Tự động lưu vào localStorage mỗi khi cart thay đổi
    // (Bạn đang thiếu đoạn này trong code cũ nên reload trang bình thường sẽ mất đơn)
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // 👉 Effect 2: Chỉ dùng để thông báo và làm đẹp URL
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const status = queryParams.get("status");

        if (status === "success") {
            alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
            // Xóa query param trên URL để nhìn cho đẹp
            window.history.replaceState(
                {},
                document.title,
                window.location.pathname
            );
        } else if (status === "failed") {
            alert("Thanh toán thất bại hoặc đã bị hủy.");
            // Cũng xóa luôn cho sạch
            window.history.replaceState(
                {},
                document.title,
                window.location.pathname
            );
        }
    }, []);

    // ----------------------------------------------------
    // Các hàm xử lý giỏ hàng giữ nguyên
    const addToCart = (item, quantity) => {
        if (quantity <= 0) return;
        setCart((prev) => {
            const exists = prev.find((p) => p.masp === item.masp);
            if (exists) {
                return prev.map((p) =>
                    p.masp === item.masp
                        ? { ...p, quantity: p.quantity + quantity }
                        : p
                );
            }
            return [...prev, { ...item, quantity }];
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.masp !== id));
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCart((prev) =>
            prev.map((item) =>
                item.masp === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    return (
        <>
            <Routes>
                {/* Giữ nguyên toàn bộ Routes của bạn */}
                <Route path="/" element={<MainLayout />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<Register />} />
                <Route path="/sale/tinkhuyenmai" element={<TinKhuyenMai />} />
                <Route path="/map" element={<LienHeChiDuong />} />
                <Route path="/recipes" element={<BiQuyetNauAn />} />
                <Route path="/chef" element={<DauBepHeader />} />
                <Route path="/about" element={<GioiThieuNhaHang />} />
                <Route path="/forget" element={<Forget />} />
                <Route path="/food" element={<DoAn addToCart={addToCart} />} />
                <Route
                    path="/cart"
                    element={
                        <Cart
                            cart={cart}
                            removeFromCart={removeFromCart}
                            updateQuantity={updateQuantity}
                        />
                    }
                />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </>
    );
}

export default App;
