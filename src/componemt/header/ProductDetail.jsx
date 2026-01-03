import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductReviews from "./ProductReviews";

function ProductDetail() {
    const { id } = useParams(); // id này là masp từ URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // LƯU Ý: Bạn phải kiểm tra lại đoạn /DOANWEB/laptrinhweb/ có đúng thư mục không
        fetch(`http://localhost/DOANWEB/laptrinhweb/api/sanpham.php?masp=${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Lỗi:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="container mt-4">Đang tải sản phẩm...</p>;
    if (!product)
        return (
            <p className="container mt-4 text-danger">
                Không tìm thấy sản phẩm (ID: {id})
            </p>
        );

    return (
        <div className="container mt-4">
            {/* ĐÃ SỬA: Dùng product.tensp và product.anhsp */}
            <h3>{product.tensp}</h3>
            <img
                src={`http://localhost/DOANWEB/laptrinhweb/api/uploads/${product.anhsp}`}
                alt={product.tensp}
                style={{ width: "300px", borderRadius: "10px" }}
            />
            <p className="mt-3">
                Giá:{" "}
                <strong>{Number(product.giasp).toLocaleString()} VNĐ</strong>
            </p>

            <hr />
            {/* ⭐ Truyền masp vào component đánh giá */}
            <ProductReviews productId={product.masp} />
        </div>
    );
}

export default ProductDetail;
