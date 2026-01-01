import { useState, useEffect } from "react";
import Header from "./Header";
import Card from "./Card";
import "./DoAn.css";

/* =======================
   FETCH API
======================= */
function useFetch(url) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setData(data || []))
            .catch((err) => console.error(err));
    }, [url]);

    return data;
}

/* =======================
        MAIN
======================= */
function DoAn({ addToCart, cartCount }) {
    const data = useFetch(
        "http://localhost/DOANWEB/laptrinhweb/api/sanphamall.php"
    );

    /* SEARCH */
    const [searchItem, setSearchItem] = useState("");

    /* FILTER PRICE */
    const priceFilters = ["<100k", "100-300k", "300-600k", "600-1200k"];
    const [selectedPrices, setSelectedPrices] = useState([]);

    const togglePrice = (price) => {
        setSelectedPrices((prev) =>
            prev.includes(price)
                ? prev.filter((p) => p !== price)
                : [...prev, price]
        );
    };

    /* SORT */
    const [sortOrder, setSortOrder] = useState("");

    /* PAGINATION */
    const ITEMS_PER_PAGE = 9;
    const [currentPage, setCurrentPage] = useState(1);

    /* =======================
        FILTER + SEARCH
    ======================= */
    const filteredData = data.filter((item) => {
        // SEARCH
        if (
            searchItem &&
            !item.tensp?.toLowerCase().includes(searchItem.toLowerCase())
        ) {
            return false;
        }

        // PRICE FILTER
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

    /* SORT */
    const sortedData = [...filteredData];
    if (sortOrder === "cao") {
        sortedData.sort((a, b) => Number(a.giasp) - Number(b.giasp));
    } else if (sortOrder === "thap") {
        sortedData.sort((a, b) => Number(b.giasp) - Number(a.giasp));
    } else if (sortOrder === "uuTien") {
        sortedData.sort(
            (a, b) => Number(a.giakhuyenmai || 0) - Number(b.giakhuyenmai || 0)
        );
    }

    /* PAGINATED DATA */
    const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedData = sortedData.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    /* RESET PAGE WHEN FILTER CHANGE */
    useEffect(() => {
        setCurrentPage(1);
    }, [searchItem, selectedPrices, sortOrder]);

    /* =======================
            RENDER
    ======================= */
    return (
        <>
            <Header cartCount={cartCount} />

            <div className="container " style={{ marginTop: "150px" }}>
                {/* SEARCH */}
                <div className="d-flex justify-content-between mb-3 flex-wrap ">
                    <h2>Popular Dishes</h2>
                    <input
                        className="px-4 inline-block w-400px"
                        type="text"
                        placeholder="Tìm kiếm món ăn"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                    />
                </div>

                <div className="row">
                    {/* SIDEBAR */}
                    <div className="col-md-3">
                        <h4>Lọc giá</h4>
                        {priceFilters.map((p, i) => (
                            <label key={i} style={{ display: "block" }}>
                                <input
                                    type="checkbox"
                                    checked={selectedPrices.includes(p)}
                                    onChange={() => togglePrice(p)}
                                />{" "}
                                {p}
                            </label>
                        ))}

                        <h4 className="mt-3">Sắp xếp</h4>
                        <select
                            className="form-select"
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="">-- Chọn --</option>
                            <option value="cao">Thấp → Cao</option>
                            <option value="thap">Cao → Thấp</option>
                            <option value="uuTien">Ưu tiên KM</option>
                        </select>
                    </div>

                    {/* PRODUCTS */}
                    <div className="col-md-9">
                        <div className="row">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item) => (
                                    <Card
                                        key={item.masp}
                                        item={item}
                                        addToCart={addToCart}
                                    />
                                ))
                            ) : (
                                <p>Không có sản phẩm</p>
                            )}
                        </div>

                        {/* PAGINATION */}
                        <div className="d-flex justify-content-center mt-4">
                            <ul className="pagination">
                                <li
                                    className={`page-item ${
                                        currentPage === 1 ? "disabled" : ""
                                    }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            setCurrentPage((p) => p - 1)
                                        }
                                    >
                                        «
                                    </button>
                                </li>

                                {Array.from({ length: totalPages }, (_, i) => (
                                    <li
                                        key={i}
                                        className={`page-item ${
                                            currentPage === i + 1
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                setCurrentPage(i + 1)
                                            }
                                        >
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}

                                <li
                                    className={`page-item ${
                                        currentPage === totalPages
                                            ? "disabled"
                                            : ""
                                    }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            setCurrentPage((p) => p + 1)
                                        }
                                    >
                                        »
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoAn;
