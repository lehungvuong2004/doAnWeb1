import { useState, useEffect } from "react";
import Header from "./Header";
import "./DoAn.css"; // CSS mới

// Custom hook fetch data
function useFetch(url) {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch(console.error);
    }, [url]);
    return data;
}
// Card component
function Card({ item }) {
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    const [nation, setNation] = useState("");

    const url = `http://localhost/DOANWEB/laptrinhweb/api/sanpham.php?price=${price}&type=${type}&nation=${nation}`;

    const data = useFetch(url);

    const [number, setNumber] = useState(0);
    const addNumber = () => {
        setNumber((prev) => prev + 1);
    };
    const subtractNumber = () => setNumber((n) => Math.max(0, n - 1));
    return (
        <div className="col-md-4 col-sm-6 mt-3">
            <div className="card card__food">
                <img
                    className="img_food"
                    alt={item.tensp}
                    src={
                        item.anhsp
                            ? `http://localhost/DOANWEB/laptrinhweb/src/img/${item.anhsp}`
                            : null
                    }
                />
                <div className="card-body">
                    <h5 className="card-title">{item.tensp}</h5>
                    <div className="price">
                        <span className="current-price">{item.giasp}đ</span>
                        <span className="original-price text-decoration-line-through">
                            {item.giakhuyenmai}đ
                        </span>
                    </div>
                    <div className="price_cart">
                        <button className="btn btn-primary">
                            Thêm Vào Giỏ
                        </button>
                        <div className=" d-flex align-items-center gap-2">
                            <button
                                onClick={subtractNumber}
                                className="btn__sum"
                            >
                                -
                            </button>
                            <span>{number}</span>
                            <button onClick={addNumber} className="btn__sum">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
function DoAn() {
    const data = useFetch(
        "http://localhost/DOANWEB/laptrinhweb/api/sanphamall.php"
    );
    const priceFilters = ["100-300k", "300-600k", "600-1200k"];
    const foodTypes = [
        "Đồ Ăn Nhẹ",
        "Nước Uống",
        "Kèm Món",
        "Combo",
        "Trò Chơi",
    ];
    const nations = ["Việt Nam", "Hàn Quốc"];
    return (
        <>
            <Header />
            {/* Hero Section */}
            <div className="food">
                <div className="food__content">
                    <h6>Food App trên Mobile</h6>
                    <p>Khám phá các món ăn ngon và công thức nấu ăn dễ dàng.</p>
                </div>
            </div>
            <div className="container mt-4">
                {/* Popular Dishes Header */}
                <div className="d-flex justify-content-between align-items-center mb-3 food_find">
                    <h2>Popular Dishes</h2>
                    <form className="search-form">
                        <input type="text" placeholder="Tìm Kiếm Món Ăn" />
                        <button type="submit">Tìm Kiếm</button>
                    </form>
                </div>

                <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-3 sidebar">
                        <h3>Lọc Món Ăn</h3>
                        {priceFilters.map((p, i) => (
                            <label key={i}>
                                <input type="checkbox" /> {p}
                            </label>
                        ))}

                        <h3>Chọn sắp xếp</h3>
                        <select className="form-select">
                            <option value="cap">Thấp - cao</option>
                            <option value="thap">Cao - thấp</option>
                            <option value="uuTien">Độ Ưu Tiên</option>
                        </select>

                        <h3>Món Ăn</h3>
                        {foodTypes.map((f, i) => (
                            <label key={i}>
                                <input type="checkbox" /> {f}
                            </label>
                        ))}

                        <h3>Quốc Tịch</h3>
                        {nations.map((n, i) => (
                            <label key={i}>
                                <input type="checkbox" /> {n}
                            </label>
                        ))}
                    </div>

                    {/* Cards */}
                    <div className="col-md-9">
                        <div className="row">
                            {data.map((item) => (
                                <Card key={item.masp} item={item} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className="d-flex justify-content-center mt-4">
                    <ul className="pagination">
                        {["«", 1, 2, 3, "»"].map((p, i) => (
                            <li className="page-item" key={i}>
                                <a className="page-link" href="#">
                                    {p}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default DoAn;
