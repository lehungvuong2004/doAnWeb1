import { Link } from "react-router-dom";
import food from "../header/DoAn";
function Cart({ cart, removeFromCart, updateQuantity }) {
    // Tính tổng tiền
    const total = cart.reduce(
        (sum, item) => sum + Number(item.giasp) * item.quantity,
        0
    );

    return (
        <div className="container mt-4">
            <Link to="/food" className="text-decoration-none fs-5 text-dark ">
                <i class="fa-solid fa-arrow-left me-3"></i> Tiếp Tục Mua Hàng
            </Link>
            <h1 className="text-danger text-center mb-4">Giỏ Hàng Của Bạn</h1>
            {cart.length === 0 ? (
                <h3 className="text-center">Giỏ hàng trống!</h3>
            ) : (
                <table className="table-bordered w-100 text-center">
                    <thead>
                        <tr>
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.masp}>
                                <td>
                                    <img
                                        src={`http://localhost/DOANWEB/laptrinhweb/src/img/${item.anhsp}`}
                                        alt={item.tensp}
                                        width="80"
                                        height="80"
                                        style={{ objectFit: "cover" }}
                                    />
                                </td>

                                <td>{item.tensp}</td>

                                {/* Giá sản phẩm */}
                                <td>{Number(item.giasp).toLocaleString()}đ</td>

                                {/* Số lượng */}
                                <td>
                                    <div className="d-flex align-items-center gap-2 w-50 mx-auto">
                                        <button
                                            className="btn btn-sm btn-secondary"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.masp,
                                                    item.quantity - 1
                                                )
                                            }
                                            disabled={item.quantity === 1}
                                        >
                                            -
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            className="btn btn-sm btn-secondary"
                                            onClick={() =>
                                                updateQuantity(
                                                    item.masp,
                                                    item.quantity + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>

                                {/* Thành tiền */}
                                <td>
                                    {(
                                        Number(item.giasp) * item.quantity
                                    ).toLocaleString()}
                                    đ
                                </td>

                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            removeFromCart(item.masp)
                                        }
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Tổng tiền */}
            <div className="text-end mt-3">
                <h3>
                    Tổng tiền:{" "}
                    <span className="text-success">
                        {total.toLocaleString()}đ
                    </span>
                </h3>
            </div>

            {/* Form gửi sang PHP */}
            <form
                action="http://localhost/DOANWEB/vnpay/thanh_toan.php"
                method="POST"
            >
                <input type="hidden" name="cart" value={JSON.stringify(cart)} />
                <input type="hidden" name="total" value={total} />
                <button className="btn btn-primary mt-3">
                    Thanh Toán Tiền
                </button>
            </form>
        </div>
    );
}

export default Cart;
