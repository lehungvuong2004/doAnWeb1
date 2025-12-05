import Header from "./Header";
import "../../App.css";
import Footer from "../footer/Footer.jsx";

function GioiThieuNhaHang() {
    return (
        <>
            <Header />

            {/* Phần Background */}
            <div className="moutain">
                <div className="mountain__back text-center">
                    <h1 className="mountain__title">Giới Thiệu</h1>
                    <div className="d-flex align-items-center justify-content-center gap-3">
                        <h6>Trang Chủ</h6>
                        <span>/</span>
                        <h6>Giới Thiệu</h6>
                    </div>
                </div>
            </div>

            {/* Toàn bộ nội dung phía dưới */}
            <div className="container info-container">

                {/* 1. Mục tiêu – Sứ mệnh – Tương lai */}
                <div className="row text-center mt-4">

                    <div className="col-md-4 p-3">
                        <h4 className="info-title">🎯 Mục Tiêu</h4>
                        <p className="info-text">
                            Trở thành nhà hàng được yêu thích nhất nhờ chất lượng món ăn,
                            phong cách phục vụ chuyên nghiệp và không gian ấm áp cho mọi gia đình.
                        </p>
                    </div>

                    <div className="col-md-4 p-3">
                        <h4 className="info-title">💎 Sứ Mệnh</h4>
                        <p className="info-text">
                            Mang đến trải nghiệm ẩm thực xuất sắc, kết hợp giữa nét truyền thống
                            và tinh hoa ẩm thực hiện đại, đảm bảo an toàn và chất lượng trong từng món ăn.
                        </p>
                    </div>

                    <div className="col-md-4 p-3">
                        <h4 className="info-title">🚀 Tương Lai</h4>
                        <p className="info-text">
                            Phát triển hệ thống nhà hàng cao cấp toàn quốc, nâng tầm ẩm thực Việt Nam
                            đến với bạn bè quốc tế.
                        </p>
                    </div>

                </div>

                {/* 2. Giới thiệu chung */}
                <div className="section mt-5">
                    <h3 className="section-title">✨ Giới Thiệu Chung</h3>
                    <p className="section-text">
                        Nhà hàng của chúng tôi được thành lập với mong muốn mang đến một không gian ẩm thực
                        tinh tế, nơi mọi khách hàng có thể tận hưởng những bữa ăn chất lượng cao trong một
                        bầu không khí sang trọng và thoải mái. Chúng tôi luôn đặt chất lượng và trải nghiệm 
                        khách hàng lên hàng đầu.
                    </p>
                </div>

                {/* 3. Giá trị cốt lõi */}
                <div className="section mt-4">
                    <h3 className="section-title">🌟 Giá Trị Cốt Lõi</h3>
                    <ul className="core-values">
                        <li>✔ Chất lượng là ưu tiên số 1</li>
                        <li>✔ Tôn trọng khách hàng</li>
                        <li>✔ Phong cách phục vụ chuyên nghiệp</li>
                        <li>✔ Không ngừng sáng tạo trong ẩm thực</li>
                        <li>✔ Giữ gìn bản sắc Việt Nam</li>
                    </ul>
                </div>

                {/* 4. Đội ngũ đầu bếp */}
                <div className="section mt-4">
                    <h3 className="section-title">👨‍🍳 Đội Ngũ Đầu Bếp</h3>
                    <p className="section-text">
                        Các đầu bếp của chúng tôi đều là những người có kinh nghiệm lâu năm, từng làm việc
                        tại nhiều nhà hàng lớn trong và ngoài nước. Tất cả món ăn đều được chuẩn bị tỉ mỉ
                        từ khâu chọn nguyên liệu đến trình bày.
                    </p>
                </div>

                {/* 5. Lý do nên chọn chúng tôi */}
                <div className="section mt-4 mb-5">
                    <h3 className="section-title">❤️ Vì Sao Bạn Nên Chọn Chúng Tôi?</h3>
                    <ul className="why-us">
                        <li>✨ Nguyên liệu tươi sạch mỗi ngày</li>
                        <li>✨ Không gian sang trọng – phù hợp họp mặt & gia đình</li>
                        <li>✨ Đội ngũ nhân viên thân thiện, chuyên nghiệp</li>
                        <li>✨ Giá cả hợp lý – xứng đáng với chất lượng</li>
                        <li>✨ Dịch vụ đặt bàn nhanh chóng, tiện lợi</li>
                    </ul>
                </div>

            </div>
            <Footer />
        </>
    );
}

export default GioiThieuNhaHang;
