import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import th1 from "../../img/thuonghieu1.png";
import th2 from "../../img/thuonghieu2.png";
import th3 from "../../img/thuonghieu3.png";
import th4 from "../../img/thuonghieu4.png";

function ThuongHieu() {

  const swiperConfig = {
    slidesPerView: 5,
    spaceBetween: 20,
    autoplay: {
      delay: 1,              
      disableOnInteraction: false,
    },
    speed: 5000,              
    loop: true,
    loopAdditionalSlides: 10, 
    allowTouchMove: false,     
    modules: [Autoplay],
    breakpoints: {
      320: { slidesPerView: 2 },
      576: { slidesPerView: 3 },
      768: { slidesPerView: 4 },
      992: { slidesPerView: 5 },
    },
  };
  const brands = [
    { id: "a1", img: th1 },
    { id: "a2", img: th2 },
    { id: "a3", img: th3 },
    { id: "a4", img: th4 },
    { id: "b1", img: th1 },
    { id: "b2", img: th2 },
    { id: "b3", img: th3 },
    { id: "b4", img: th4 },
  ];

 return (
        <div className="brand py-4">
            <div className="container">

                <Swiper {...swiperConfig}>
                    {brands.map((item) => (
                        <SwiperSlide key={item.id}>
                            <img
                                src={item.img}
                                alt="brand"
                                className="img-fluid d-block mx-auto"
                                style={{ height: 60, objectFit: "contain" }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>
    );
}

export default ThuongHieu;
