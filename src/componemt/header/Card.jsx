import { useState } from "react";
import { Link } from "react-router-dom";

function Card({ item, addToCart }) {
    const [number, setNumber] = useState(1);

    return (
        <div className="col-md-4 col-sm-6 mt-3">
            <div className="card card__food">
                {/* CHỈ BỌC LINK – KHÔNG ĐỔI CSS */}
                <Link to={`/food/${item.masp}`} style={{ height: "50%" }}>
                    <img
                        className="img_food"
                        alt={item.tensp}
                        src={
                            item.anhsp
                                ? `http://localhost/DOANWEB/laptrinhweb/api/uploads/${item.anhsp}`
                                : null
                        }
                    />
                </Link>

                <div className="card-body">
                    {/* CHỈ BỌC LINK – KHÔNG ĐỔI CSS */}
                    <Link to={`/food/${item.masp}`}>
                        <h5 className="card-title">{item.tensp}</h5>
                    </Link>

                    <div className="price">
                        <span className="current-price">{item.giasp}đ</span>
                        <span className="original-price text-decoration-line-through">
                            {item.giakhuyenmai}đ
                        </span>
                    </div>

                    <div className="price_cart">
                        <div className="d-flex align-items-center gap-2">
                            <button
                                onClick={() =>
                                    setNumber(Math.max(1, number - 1))
                                }
                                className="btn__sum"
                            >
                                -
                            </button>

                            <span>{number}</span>

                            <button
                                onClick={() => setNumber(number + 1)}
                                className="btn__sum"
                            >
                                +
                            </button>
                        </div>

                        <button
                            className="btn btn-primary mt-2"
                            onClick={() => addToCart(item, number)}
                        >
                            Thêm Vào Giỏ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
