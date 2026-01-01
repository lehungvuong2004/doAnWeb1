import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import { useState } from "react";

function LienHeChiDuong() {
    const [formData, setFormData] = useState({
        hoTen: "",
        email: "",
        phone: "",
        mess: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (
            !formData.hoTen ||
            !formData.email ||
            !formData.phone ||
            !formData.mess
        ) {
            setMessage({
                type: "danger",
                text: "❌ Vui lòng điền đầy đủ thông tin",
            });
            setLoading(false);
            return;
        }
        // Simulated API call - thay bằng API thực tế của bạn
        setTimeout(() => {
            setMessage({
                type: "success",
                text: "✅ Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm",
            });
            setFormData({ hoTen: "", email: "", phone: "", mess: "" });
            setLoading(false);
        }, 1500);
    };
    return (
        <>
            <section className="py-5 ">
                <div className="container">
                    <p className="d-flex align-content-center">
                        <Link to="/" className="fs-14 text-dark">
                            <i
                                className="fa-solid fa-arrow-left-long"
                                style={{ marginLeft: 5 }}
                            ></i>{" "}
                            Quay Lại Trang Chủ
                        </Link>
                    </p>
                    {/* Header */}
                    <div className="text-center mb-5">
                        <h1 className="display-4 fw-bold text-dark mb-3">
                            Liên Hệ & Chỉ Đường
                        </h1>
                        <p className="lead text-muted">
                            Ghé thăm chúng tôi hoặc liên hệ để đặt bàn
                        </p>
                    </div>

                    <div className="row g-4" style={{ height: "700px" }}>
                        {/* Contact Info */}
                        <div className="col-lg-6">
                            <div className="card h-100 border-0 shadow-sm ">
                                <div className="card-body px-4 py-1">
                                    <h3 className="card-title mb-4 fw-bold">
                                        {" "}
                                        Thông Tin Liên Hệ
                                    </h3>

                                    <div className="mb-4">
                                        <h6 className="fw-bold  mb-2">
                                            <i className="fa-solid fa-phone"></i>{" "}
                                            Điện Thoại
                                        </h6>
                                        <a
                                            href="tel:0123456789"
                                            className="text-decoration-none text-dark hover-link fs-6"
                                        >
                                            <p className="mb-0">0123 456 789</p>
                                        </a>
                                    </div>

                                    <div className="mb-4">
                                        <h6 className="fw-bold  mb-2 ">
                                            <i className="fa-solid fa-envelope"></i>{" "}
                                            Email
                                        </h6>
                                        <a
                                            href="mailto:info@nha-hang.com"
                                            className="text-decoration-none text-dark hover-link fs-6"
                                        >
                                            <p className="mb-0">
                                                info@nha-hang.com
                                            </p>
                                        </a>
                                    </div>

                                    <div className="mb-4">
                                        <h6 className="fw-bold  mb-2">
                                            <i className="fa-solid fa-location-arrow"></i>{" "}
                                            Địa Chỉ
                                        </h6>
                                        <p className="mb-0 fs-6">
                                            Đường cao lỗ, phường 4, quận 8, HCM
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        <h6 className="fw-bold  mb-2">
                                            <i className="fa-solid fa-clock"></i>{" "}
                                            Giờ Mở Cửa
                                        </h6>
                                        <p className="mb-1 fs-6">
                                            Thứ Hai - Chủ Nhật: 10:00 - 17:00
                                        </p>
                                        <p className="mb-0 text-muted small fs-6">
                                            Đóng cửa: Thứ Bảy Chủ (Ngoại trừ Lễ)
                                        </p>
                                    </div>

                                    <div className="d-grid gap-2 pt-3">
                                        <a
                                            href="tel:0123456789"
                                            className="btn btn-warning btn-lg fw-bold"
                                        >
                                            Gọi Ngay
                                        </a>
                                        <a
                                            href="mailto:info@nha-hang.com"
                                            className="btn btn-outline-warning btn-lg fw-bold"
                                        >
                                            ✉️ Gửi Email
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}

                        <div className="col-lg-6 d-none d-lg-block">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body px-4 py-1">
                                    <h3 className="card-title mb-4 fw-bold">
                                        📝 Gửi Tin Nhắn
                                    </h3>
                                    {message && (
                                        <div
                                            className={`alert alert-${message.type} alert-dismissible fade show`}
                                            role="alert"
                                        >
                                            {message.text}
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={() => setMessage(null)}
                                            ></button>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="hoTen"
                                                className="form-label fw-bold fs-6"
                                            >
                                                Họ & Tên
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="hoTen"
                                                placeholder="Nhập họ và tên của bạn"
                                                value={formData.hoTen}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label
                                                htmlFor="email"
                                                className="form-label fw-bold  fs-6"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control form-control-lg"
                                                id="email"
                                                placeholder="your@email.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label
                                                htmlFor="phone"
                                                className="form-label fw-bold  fs-6"
                                            >
                                                Số Điện Thoại
                                            </label>
                                            <input
                                                type="tel"
                                                className="form-control form-control-lg"
                                                id="phone"
                                                placeholder="0123 456 789"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label
                                                htmlFor="mess"
                                                className="form-label fw-bold  fs-6"
                                            >
                                                Nội Dung
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="mess"
                                                rows="5"
                                                placeholder="Hãy viết tin nhắn của bạn..."
                                                value={formData.mess}
                                                onChange={handleChange}
                                                required
                                                style={{
                                                    height: "110px",
                                                    resize: "none",
                                                }}
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-warning btn-lg w-100 fw-bold"
                                            disabled={loading}
                                        >
                                            {loading
                                                ? "⏳ Đang gửi..."
                                                : "📤 Gửi Tin Nhắn"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body p-0">
                                    <h3 className="card-title p-4 mb-0 fw-bold">
                                        🗺️ Bản Đồ Chỉ Đường
                                    </h3>
                                    <iframe
                                        width="100%"
                                        height="400"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.472369576271!2d106.67147632346914!3d10.772661989341846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3d0e3d3d3d%3A0x3d3d3d3d3d3d3d3d!2zMTIzIELGsOOngSBOZ3V54bq_biBI4bqvZSwgUXXhuq1uIDEsIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1234567890"
                                        allowFullScreen=""
                                        aria-hidden="false"
                                        tabIndex="0"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="text-center">
                                <h4 className="fw-bold mb-4">
                                    Theo Dõi Chúng Tôi
                                </h4>
                                <div className="d-flex justify-content-center gap-3">
                                    <a
                                        href="https://facebook.com"
                                        className="btn btn-primary btn-lg"
                                        title="Facebook"
                                    >
                                        <i className="fa-brands fa-facebook"></i>
                                    </a>
                                    <a
                                        href="https://instagram.com"
                                        className="btn btn-danger btn-lg"
                                        title="Instagram"
                                    >
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                    <a
                                        href="https://tiktok.com"
                                        className="btn btn-dark btn-lg"
                                        title="TikTok"
                                    >
                                        <i className="fa-brands fa-tiktok"></i>
                                    </a>
                                    <a
                                        href="https://youtube.com"
                                        className="btn btn-danger btn-lg"
                                        title="YouTube"
                                    >
                                        <i className="fa-brands fa-youtube"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default LienHeChiDuong;
