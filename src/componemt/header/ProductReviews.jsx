import { useState, useEffect } from "react";

function ProductReviews({ productId }) {
    const [reviews, setReviews] = useState([]);
    const [noiDung, setNoiDung] = useState("");
    const [soSao, setSoSao] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchReviews = () => {
        fetch(
            `http://localhost/DOANWEB/laptrinhweb/api/get_reviews.php?masp=${productId}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setReviews(data);
            })
            .catch((err) => console.error("Lỗi lấy đánh giá:", err));
    };

    useEffect(() => {
        if (productId) fetchReviews();
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!noiDung.trim()) return alert("Vui lòng nhập nội dung!");

        setIsSubmitting(true);
        const reviewData = {
            masp: productId,
            soSao: parseInt(soSao),
            noiDung: noiDung,
            maTaiKhoan: null, 
        };

        try {
            const response = await fetch(
                "http://localhost/DOANWEB/laptrinhweb/api/add_review.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(reviewData),
                }
            );
            const data = await response.json();

            if (data.success) {
                alert("Cảm ơn bạn đã đánh giá!");
                setNoiDung(""); // Reset nội dung
                setSoSao(5); // Reset sao
                fetchReviews(); // Render lại danh sách ngay lập tức
            } else {
                alert("Lỗi: " + data.message);
            }
        } catch (error) {
            console.error("Lỗi gửi bài:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // // 3. Hàm hiển thị sao đẹp mắt
    // const renderStars = (rating) => {
    //     return "⭐".repeat(rating);
    // };

    return (
        <div className="mt-5 p-3 border rounded bg-light">
            <h4 className="mb-4">Khách hàng đánh giá</h4>
            <form
                onSubmit={handleSubmit}
                className="mb-5 shadow-sm p-3 bg-white rounded"
            >
                <label className="form-label fw-bold">Chọn số sao:</label>
                <select
                    className="form-select mb-3"
                    value={soSao}
                    onChange={(e) => setSoSao(e.target.value)}
                >
                    <option value="5">5 Sao ⭐⭐⭐⭐⭐ (Tuyệt vời)</option>
                    <option value="4">4 Sao ⭐⭐⭐⭐ (Tốt)</option>
                    <option value="3">3 Sao ⭐⭐⭐ (Bình thường)</option>
                    <option value="2">2 Sao ⭐⭐ (Kém)</option>
                    <option value="1">1 Sao ⭐ (Rất kém)</option>
                </select>

                <textarea
                    className="form-control mb-3"
                    rows="3"
                    placeholder="Chia sẻ trải nghiệm của bạn về món ăn này..."
                    value={noiDung}
                    onChange={(e) => setNoiDung(e.target.value)}
                />

                <button
                    type="submit"
                    className="btn btn-success w-100 fw-bold"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Đang gửi..." : "GỬI ĐÁNH GIÁ"}
                </button>
            </form>

            {/* Danh sách hiển thị */}
            <div className="review-list">
                {reviews.length > 0 ? (
                    reviews.map((r, index) => (
                        <div
                            key={index}
                            className="card mb-3 border-0 border-bottom"
                        >
                            <div className="card-body ">
                                <div className="avt_user">
                                    <img
                                        src="https://i.pravatar.cc/48"
                                        alt=""
                                        className="rounded-circle"
                                    />
                                </div>
                                {/* Hiển thị số sao */}
                                <div className="text-muted mb-1">
                                    Đánh Gía: {"⭐".repeat(r.soSao)}
                                </div>
                                {/* Hiển thị nội dung - đúng tên cột 'noiDung' trong ảnh phpMyAdmin */}
                                <p className="text-muted mb-2">
                                    Nội Dung: <b>{r.noiDung}</b>
                                </p>
                                {/* Hiển thị ngày - đúng tên cột 'ngayDanhGia' */}
                                <small className="text-secondary">
                                    Thời Gian:
                                    <b>
                                        {" "}
                                        {new Date(r.ngayDanhGia).toLocaleString(
                                            "vi-VN"
                                        )}
                                    </b>
                                </small>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted">
                        Sản phẩm này chưa có đánh giá nào.
                    </p>
                )}
            </div>
        </div>
    );
}

export default ProductReviews;
