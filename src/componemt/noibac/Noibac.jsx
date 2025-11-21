import { useEffect, useState } from "react";

function NoiBac() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/laptrinhweb/api/phobien.php")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log("Error:", err));
  }, []);
  return (
    <>
      <div className="">
        <div className="container">
           <h2 className="heading__primary">Danh Sách Mới</h2>
          <div className="row mt-3">
            {data.map((item) => (
              <div className="col-md-3">
                <div className="card">
                  <div className="" key={item.maMonAn}>
                    <div className="img"  height = "500px">
                      <img
                        src={`http://localhost/DOANWEB/laptrinhweb/src/img/${item.anhMonAn}`}
                        className="card-img-top card-img"
                        alt={item.tenMonAn}
                      />
                    </div>
                    <div className="card-body">
                      <h5 class="card-title">{item.tenMonAn}</h5>

                      <div className="price__sale d-flex align-content-center justify-content-between fs-14 text-dark">
                        <span>
                          {item.giaMonAn} <span>đ</span>
                        </span>
                        <span className="text-decoration-line-through">
                          {" "}
                          {item.giaGiam} <span>đ</span>
                        </span>
                      </div>
                      <button className="btn btn-outline-primary mt-3 famous">
                        Đặt Ngay
                      </button>
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
