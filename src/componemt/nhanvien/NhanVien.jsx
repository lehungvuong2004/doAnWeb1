import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import img0 from "../../img/truongbep.jpg";
import img1 from "../../img/quanlibep.jpg";
import img2 from "../../img/phubep.jpg";
import img3 from "../../img/vuabanhmi.jpg";
import img4 from "../../img/phobep.jpg";

const staff = [
    { id: 0, img: img0, name: "Nguyễn Thành Trung", chucvu: "Trưởng Bếp" },
    { id: 1, img: img1, name: "Alain Ducasse", chucvu: "Bưng Ly" },
    { id: 2, img: img2, name: "Quang Vinh", chucvu: "Rửa Bếp" },
    { id: 3, img: img3, name: "Kao Siêu Lực", chucvu: "Chuyên Gia Bánh Mì" },
    {
        id: 4,
        img: img4,
        name: "Nguyễn Thành Trung",
        chucvu: "Cố Vấn Ẩm Thực Cấp Cao",
    },
];

function NhanVien() {
    return (
        <div className="chef" id="chef">
            <div className="container">
                <h6 className="heading__primary mb-4 text-center">
                    Danh Sách Nhân Viên
                </h6>

                <Swiper
                    modules={[Navigation, Pagination]}
                    slidesPerView={3}
                    spaceBetween={20}
                    navigation
                    pagination={{ clickable: true }}
                    className="staff-swiper"
                >
                    {staff.map((nv) => (
                        <SwiperSlide key={nv.id}>
                            <div className="staff-card">
                                <img
                                    src={nv.img}
                                    alt="Nhân viên"
                                    className="staff-img"
                                />

                                <div className="staff-info">
                                    <h5 className="staff-name">{nv.name}</h5>
                                    <h6 className="staff-role">{nv.chucvu}</h6>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default NhanVien;
