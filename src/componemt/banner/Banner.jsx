import { useEffect, useState } from "react";
import "../../App.css";

function Banner() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost/DOANWEB/laptrinhweb/api/banner.php")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log("Error:", err));
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  return (
    <>
      <div className="slider">
        <div
          className="slides-wrapper"
          style={{
            width: `${data.length * 100}%`,
            transform: `translateX(-${index * (100 / data.length)}%)`,
            display: "flex",
            transition: "0.5s ease",
          }}
        >
          {data.map((item) => (
            <div className="slides" key={item.maBanner}>
              <img
                src={
                  item.anh
                    ? `http://localhost/DOANWEB/laptrinhweb/src/img/${item.anh}`
                    : null
                }
                alt={item.tenBanner}
                className="slide__image"
              />
              <div className="slide__info">
                <h3 className="slider__title">{item.tenBanner}</h3>
                <p className="sub__titlet">{item.gioiThieu}</p>
                <button className="btn__order">Order Now</button>
              </div>
            </div>
          ))}
        </div>

        <button className="prev" onClick={prevSlide}>
          <i className="fa-solid fa-angle-left"></i>
        </button>

        <button className="next" onClick={nextSlide}>
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </>
  );
}

export default Banner;
