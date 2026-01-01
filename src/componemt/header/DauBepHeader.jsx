import React from "react";
import Header from "./Header";
import NhanVien from "../nhanvien/NhanVien";
import timhieu from "./img_new/tim-hieu-ve-nghe-dau-bep-1.jpg";
import hocnghe from "./img_new/hoc-nghe-dau-bep.jpg";
import Footer from "../footer/Footer";
import "../../App.css";

function DauBepHeader() {
    return (
        <>
            <Header />
            <NhanVien />

            <div className="container py-5">
                <div className="row" style={{ marginTop: -80 }}>
                    {/* Nội dung chính */}
                    <div className="col-md-8">
                        <h2 className="mb-3 fw-bold text-primary">
                            Tìm hiểu về nghề đầu bếp & Tiêu chuẩn của nghề đầu
                            bếp là gì?
                        </h2>
                        <p className="fs-5">
                            Khi chất lượng cuộc sống tăng cao, nhu cầu thưởng
                            thức các món ăn ngon ngày càng lớn, tạo ra trải
                            nghiệm ẩm thực độc đáo và hấp dẫn.
                        </p>

                        <h4 className="mt-4 fw-semibold">
                            Nghề đầu bếp là gì?
                        </h4>
                        <p>
                            Nghề đầu bếp là nghề chế biến thực phẩm và tạo ra
                            các món ăn phục vụ khách hàng hoặc cộng đồng. Nghề
                            này đòi hỏi kỹ năng nấu ăn, kiến thức về nguyên
                            liệu, gia vị, kỹ thuật chế biến và thẩm mỹ ẩm thực.
                            Đầu bếp chuyên nghiệp không chỉ nấu ngon mà còn phải
                            trình bày món ăn đẹp mắt và sáng tạo.
                        </p>

                        <h5 className="mt-4 fw-semibold">
                            Các công việc chính của nghề đầu bếp:
                        </h5>
                        <ul className="mb-4">
                            <li>
                                <strong>Công tác chuẩn bị:</strong> Kiểm tra
                                nguyên liệu, lập kế hoạch nhập hàng, chuẩn bị
                                dụng cụ và phối hợp với đồng nghiệp.
                            </li>
                            <li>
                                <strong>Chế biến & trình bày:</strong> Thực hiện
                                các kỹ năng nấu nướng, trình bày món ăn hấp dẫn
                                và đúng chuẩn.
                            </li>
                            <li>
                                <strong>
                                    Bảo quản dụng cụ & không gian bếp:
                                </strong>{" "}
                                Giữ bếp sạch, sắp xếp dụng cụ hợp lý, bảo quản
                                thực phẩm đúng cách.
                            </li>
                            <li>
                                <strong>Vệ sinh & an toàn thực phẩm:</strong>{" "}
                                Thực hiện nghiêm ngặt các quy trình vệ sinh và
                                kiểm soát chất lượng nguyên liệu.
                            </li>
                            <li>
                                <strong>Các nhiệm vụ khác:</strong> Tổng hợp đơn
                                hàng, báo cáo sự cố, đóng ca và bàn giao nguyên
                                liệu cho ca sau.
                            </li>
                        </ul>

                        <div className="my-4 text-center">
                            <img
                                src={timhieu}
                                alt="Tìm hiểu nghề đầu bếp"
                                className="img-fluid rounded shadow"
                                style={{ maxWidth: "500px" }}
                            />
                            <p className="mt-2 fst-italic text-secondary">
                                Các công việc đó như lập menu, cân đối giá cả,
                                thực hiện món ăn ngon và đẹp mắt. Đầu bếp cần
                                kiến thức rộng về ẩm thực thế giới và kỹ năng
                                chuyên môn bài bản.
                            </p>
                        </div>

                        <h4 className="fw-semibold">Môi trường làm việc</h4>
                        <p>
                            Môi trường nghề đầu bếp đa dạng: khách sạn, nhà
                            hàng, trường học, doanh nghiệp, bệnh viện… Tại nhà
                            hàng và khách sạn, áp lực cao giúp đầu bếp tích lũy
                            kinh nghiệm và phát triển phản xạ nhanh trong công
                            việc.
                        </p>

                        <section className="chef-salary py-5 bg-light rounded my-4">
                            <div className="container">
                                <h4 className="mb-4 text-success fw-semibold">
                                    Mức lương & Thưởng hấp dẫn
                                </h4>
                                <p>
                                    Nghề đầu bếp mang đến cơ hội sáng tạo, thỏa
                                    mãn đam mê ẩm thực và có mức lương + thưởng
                                    hấp dẫn tại các nhà hàng, khách sạn lớn.
                                </p>
                                <ul>
                                    <li>
                                        <strong>Lương cơ bản:</strong> 7 – 20
                                        triệu VNĐ/tháng tùy kinh nghiệm.
                                    </li>
                                    <li>
                                        <strong>Thưởng hiệu suất:</strong>{" "}
                                        Thưởng doanh thu, cuối năm.
                                    </li>
                                    <li>
                                        <strong>Phụ cấp & ưu đãi:</strong> Ăn
                                        ca, hỗ trợ chỗ ở, khóa đào tạo.
                                    </li>
                                    <li>
                                        <strong>Cơ hội thăng tiến:</strong>{" "}
                                        Trưởng bếp, bếp phó, quản lý bếp.
                                    </li>
                                </ul>
                                <p className="mt-2">
                                    Vừa thỏa đam mê, vừa có thu nhập xứng đáng.
                                </p>
                            </div>
                        </section>

                        <h4 className="mt-4 fw-semibold">
                            Những yêu cầu quan trọng của nghề đầu bếp
                        </h4>
                        <ul>
                            <li>
                                Kỹ năng nấu nướng chuyên nghiệp, am hiểu nhiều
                                kỹ thuật chế biến.
                            </li>
                            <li>
                                Khả năng sáng tạo, tìm kiếm ý tưởng mới cho thực
                                đơn.
                            </li>
                            <li>Kỹ năng quản lý thời gian hiệu quả.</li>
                            <li>Sức chịu đựng tốt và thể lực vững.</li>
                            <li>
                                Tính kỷ luật và cẩn thận trong mọi công việc.
                            </li>
                            <li>
                                Kỹ năng làm việc nhóm trong môi trường bếp
                                chuyên nghiệp.
                            </li>
                        </ul>

                        <h4 className="mt-4 fw-semibold">Cơ hội nghề nghiệp</h4>
                        <p>
                            Đầu bếp có cơ hội thăng tiến lên các vị trí: Trưởng
                            bếp, bếp phó, chuyên gia ẩm thực, quản lý bếp tại
                            nhà hàng, khách sạn, hoặc tự mở quán riêng. Nghề này
                            vừa phát triển kỹ năng, vừa tạo dựng uy tín và thu
                            nhập.
                        </p>
                        <div className="my-4 text-center">
                            <img
                                src={hocnghe}
                                alt="Cơ hội nghề  nghiệp đầu bếp"
                                className="img-fluid rounded shadow"
                                style={{ maxWidth: "500px" }}
                            />
                            <p className="mt-2 fst-italic text-secondary">
                                Cơ hội nghề nghiệp đầu bếp
                            </p>
                        </div>
                    </div>

                    {/* Cột phụ */}
                    <div className="col-md-4">
                        <div className="p-4 mb-4 bg-light rounded shadow-sm border-start border-4 border-primary">
                            <h5 className="fw-bold text-primary mb-3">
                                Lưu ý cho người mới
                            </h5>
                            <ul className="mb-0">
                                <li>
                                    Học hỏi liên tục và thử nghiệm món ăn mới.
                                </li>
                                <li>
                                    Quản lý thời gian và nguyên liệu hiệu quả.
                                </li>
                                <li>
                                    Duy trì vệ sinh bếp và an toàn thực phẩm.
                                </li>
                                <li>Phát triển sáng tạo và thẩm mỹ ẩm thực.</li>
                                <li>
                                    Khả năng làm việc nhóm trong bếp chuyên
                                    nghiệp.
                                </li>
                            </ul>
                        </div>

                        <div className="p-4 mb-4 bg-light rounded shadow-sm border-start border-4 border-success">
                            <h5 className="fw-bold text-success mb-3">
                                Tips & Kinh nghiệm
                            </h5>
                            <ul className="mb-0">
                                <li>Tham gia các khóa đào tạo nâng cao.</li>
                                <li>Thử nghiệm món ăn từ nhiều nền ẩm thực.</li>
                                <li>
                                    Ghi chú và cải tiến công thức thường xuyên.
                                </li>
                                <li>
                                    Luôn duy trì vệ sinh và an toàn thực phẩm.
                                </li>
                            </ul>
                        </div>

                        <div
                            className="p-4 bg-light rounded shadow-sm border-start border-4 border-warning mt-4 position-sticky z-3"
                            style={{ top: "110px" }}
                        >
                            <h5 className="fw-bold text-warning mb-3">
                                Liên hệ tư vấn miễn phí
                            </h5>
                            <ul className="mb-2">
                                <li>
                                    <b>Hotline:</b>{" "}
                                    <a
                                        href="tel:0123456789"
                                        className="text-dark"
                                    >
                                        0123 456 789
                                    </a>
                                </li>
                                <li>
                                    <b>Email:</b>{" "}
                                    <a
                                        href="mailto:chef@support.vn"
                                        className="text-dark"
                                    >
                                        chef@support.vn
                                    </a>
                                </li>
                                <li>
                                    <b>Zalo:</b>{" "}
                                    <a
                                        href="https://zalo.me/0123456789"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-dark"
                                    >
                                        Chat ngay
                                    </a>
                                </li>
                            </ul>
                            <a
                                href="mailto:chef@support.vn"
                                className="btn btn-warning w-100 fw-semibold mt-2"
                            >
                                Nhận tư vấn ngay
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DauBepHeader;
