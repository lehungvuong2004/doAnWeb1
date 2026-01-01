"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const ChangePassword = () => {
    const navigate = useNavigate();

    // State lưu dữ liệu form
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState({ type: "", content: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userString = localStorage.getItem("user");
        if (!userString) {
            navigate("/login");
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Xử lý Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: "", content: "" });

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({
                type: "error",
                content: "Mật khẩu xác nhận không khớp!",
            });
            return;
        }

        if (formData.newPassword.length < 6) {
            setMessage({
                type: "error",
                content: "Mật khẩu mới phải có ít nhất 6 ký tự!",
            });
            return;
        }

        setLoading(true);

        try {
            const userString = localStorage.getItem("user");
            if (!userString) {
                navigate("/login");
                return;
            }

            const user = JSON.parse(userString);

            const userId = user.maTaiKhoan;

            // console.log("User Data:", user);
            // console.log("ID lấy được:", userId);

            if (!userId) {
                setMessage({
                    type: "error",
                    content:
                        "Lỗi phiên đăng nhập (Thiếu maTaiKhoan). Vui lòng đăng xuất và đăng nhập lại!",
                });
                setLoading(false);
                return;
            }

            const apiUrl =
                "http://localhost/DOANWEB/laptrinhweb/api/change-password.php";

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId, // Gửi maTaiKhoan lên server
                    current_password: formData.currentPassword,
                    new_password: formData.newPassword,
                }),
            });
            const data = await response.json();
            if (data.success) {
                setMessage({
                    type: "success",
                    content:
                        "Đổi mật khẩu thành công! Đang quay về trang chủ...",
                });
                // Reset form
                setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });

                setTimeout(() => {
                    navigate("/");
                }, 1500);
            } else {
                setMessage({
                    type: "error",
                    content: data.message || "Đổi mật khẩu thất bại.",
                });
            }
        } catch (error) {
            console.error("Lỗi:", error);
            setMessage({
                type: "error",
                content: "Không thể kết nối tới Server API!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="container"
            style={{ marginTop: "100px", maxWidth: "500px" }}
        >
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Thay Đổi Mật Khẩu</h4>
                </div>
                <div className="card-body">
                    {/* Hiển thị thông báo */}
                    {message.content && (
                        <div
                            className={`alert ${
                                message.type === "error"
                                    ? "alert-danger"
                                    : "alert-success"
                            }`}
                        >
                            {message.content}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">
                                Mật khẩu hiện tại
                            </label>
                            <input
                                type="password"
                                name="currentPassword"
                                className="form-control"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                required
                                placeholder="Nhập mật khẩu cũ..."
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Mật khẩu mới</label>
                            <input
                                type="password"
                                name="newPassword"
                                className="form-control"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                                placeholder="Nhập mật khẩu mới..."
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Xác nhận mật khẩu mới
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="form-control"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="Nhập lại mật khẩu mới..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? "Đang xử lý..." : "Cập Nhật Mật Khẩu"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
