import { useState, useEffect } from "react";
import Header from "./Header";
import Card from "./Card";
import "./DoAn.css";
// Hook fetch dữ liệu
function useFetch(url) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch(console.error);
    }, []);

    return data;
}

function DoAn({ addToCart }) {
    const data = useFetch(
        "http://localhost/DOANWEB/laptrinhweb/api/sanphamall.php"
    );

    // ---------------- SEARCH ----------------
    const [searchItem, setSearchItem] = useState("");
    const handleSearchChange = (e) => setSearchItem(e.target.value);

    // ---------------- FILTER PRICE ----------------
    const priceFilters = ["<100k", "100-300k", "300-600k", "600-1200k"];
    const [selectedPrices, setSelectedPrices] = useState([]);

    const togglePrice = (price) => {
        setSelectedPrices((prev) =>
            prev.includes(price)
                ? prev.filter((p) => p !== price)
                : [...prev, price]
        );
    };

    // Lọc theo giá
    const filteredData = data.filter((item) => {
        if (selectedPrices.length === 0) return true;
        const price = Number(item.giasp);

        return selectedPrices.some((range) => {
            if (range === "<100k") return price < 100000;

            const [min, max] = range
                .split("-")
                .map((r) => Number(r.replace("k", "")) * 1000);

            return price >= min && price <= max;
        });
    });

    // ---------------- SEARCH FILTER ----------------
    const searchedData = filteredData.filter((item) =>
        item.tensp.toLowerCase().includes(searchItem.toLowerCase())
    );

    // ---------------- SORT ----------------
    const [sortOrder, setSortOrder] = useState("");

    const arrangePrice = (list) => {
        let sorted = [...list];
        if (sortOrder === "cao") {
            sorted.sort((a, b) => Number(a.giasp) - Number(b.giasp));
        } else if (sortOrder === "thap") {
            sorted.sort((a, b) => Number(b.giasp) - Number(a.giasp));
        } else if (sortOrder === "uuTien") {
            sorted.sort(
                (a, b) => Number(a.giakhuyenmai) - Number(b.giakhuyenmai)
            );
        }
        return sorted;
    };

    const finalData = arrangePrice(searchedData);

    return (
        <>
            <Header />

            {/* Banner */}
            <div className="food">
                <div className="food__content">
                    <h6>Food App trên Mobile</h6>
                    <p>Khám phá các món ăn ngon và công thức nấu ăn dễ dàng.</p>
                </div>
            </div>

            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3 food_find">
                    <h2>Popular Dishes</h2>

                    <form
                        className="search-form"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="text"
                            placeholder="Tìm Kiếm Món Ăn"
                            value={searchItem}
                            onChange={handleSearchChange}
                        />
                        <button type="submit">Tìm Kiếm</button>
                    </form>
                </div>

                <div className="row">
                    {/* SIDEBAR */}
                    <div className="col-md-3 sidebar">
                        <h3>Lọc Món Ăn</h3>

                        {priceFilters.map((p, i) => (
                            <label key={i}>
                                <input
                                    type="checkbox"
                                    checked={selectedPrices.includes(p)}
                                    onChange={() => togglePrice(p)}
                                />{" "}
                                {p}
                            </label>
                        ))}

                        <h3>Chọn sắp xếp</h3>
                        <select
                            className="form-select"
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="">-- Chọn sắp xếp --</option>
                            <option value="cao">Thấp - cao</option>
                            <option value="thap">Cao - thấp</option>
                            <option value="uuTien">Độ Ưu Tiên</option>
                        </select>
                    </div>

                    {/* CARD LIST */}
                    <div className="col-md-9">
                        <div className="row">
                            {finalData.map((item) => (
                                <Card
                                    key={item.masp}
                                    item={item}
                                    addToCart={addToCart}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pagination mẫu */}
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
