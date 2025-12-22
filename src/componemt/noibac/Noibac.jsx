import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NoiBac() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost/DOANWEB/laptrinhweb/api/phobien.php")
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.log("Error:", err));
    }, []);
    return (
        <>
            <div className="p-80">
                <div className="container">
                    <h2 className="heading__primary">Danh Sách Mới</h2>
                    <p className="d-flex justify-content-end">
                        <Link
                            to="/food"
                            className="text-decoration fs-14 text-black-50"
                        >
                            Xem Tất Cả
                        </Link>
                    </p>
                    <div className="row mt-4">
                        {data.slice(0, 4).map((item) => (
                            <div className="col-md-3" key={item.maMonAn}>
                                <div className="card">
                                    <div className="">
                                        <div className="img" height="500px">
                                            <img
                                                src={
                                                    item.anhMonAn
                                                        ? `http://localhost/DOANWEB/laptrinhweb/src/img/${item.anhMonAn}`
                                                        : null
                                                }
                                                className="card-img-top card-img"
                                                alt={item.tenMonAn}
                                            />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {item.tenMonAn}
                                            </h5>
                                            <div className="intro-wrapper">
                                                <p
                                                    className="list-item-intro"
                                                    data-full={item.gioithieu}
                                                >
                                                    {item.gioithieu}
                                                </p>
                                            </div>
                                            <div className="price__sale d-flex align-content-center justify-content-between fs-14 text-dark">
                                                <span>
                                                    {item.giaMonAn}
                                                    <span>đ</span>
                                                </span>
                                                <span className="text-decoration-line-through">
                                                    {" "}
                                                    {item.giaGiam}
                                                    <span>đ</span>
                                                </span>
                                            </div>
                                            <Link
                                                to="/food"
                                                className="btn btn-outline-primary mt-3 famous"
                                            >
                                                Đặt Ngay
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
export default NoiBac;
