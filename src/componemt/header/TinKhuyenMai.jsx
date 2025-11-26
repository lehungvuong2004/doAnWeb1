import { Link } from "react-router-dom"
import Header from "./Header"
import Footer from "../footer/Footer"
import "../../App.css"
import monan from "./img_new/6monan.jpg"
import banhmi from "./img_new/banhmi.jpg"
import chaolong from "./img_new/chaolong.jpg"
import charam from "./img_new/charam.jpg"
import nguoiuc from "./img_new/nguoiuc.jpg"
import topthegioi from "./img_new/topthegioi.jpg"
import khachtay from "./img_new/khachtay.jpg"
import dotron from "./img_new/dotron.jpg"

const blogNew = [
  {
    id: 0,
    img: charam,
    title: "Những món ăn vào top chiên ngon nhất châu á",
    gioithieu:
      "Nem rán, quẩy nóng, bánh tôm, bông bí, cá tai tượng chiên và đùi gà bó xôi lọt vào top 100 món chiên giòn ngon nhất châu Á của Taste Atlas.",
    path: "https://vnexpress.net/nhung-mon-viet-vao-top-chien-gion-ngon-nhat-chau-a-4963383.html",
  },
  {
    id: 1,
    img: nguoiuc,
    title: "Hành trình khám phá ổ bánh mì của đầu bếp Australia gốc Việt",
    gioithieu:
      "Từ ổ bánh mì gắn với ký ức tuổi thơ ở Sydney, đầu bếp Luke Nguyen trở lại Việt Nam, rong ruổi ba miền để thu thập những câu chuyện về bánh mì.",
    path: "https://vnexpress.net/hanh-trinh-kham-pha-o-banh-mi-cua-dau-bep-australia-goc-viet-4953640.html",
  },
  {
    id: 2,
    img: banhmi,
    title: "Bánh mì Việt Nam không nằm trong top 50 loại ngon nhất thế giới",
    gioithieu:
      "Danh sách 50 loại bánh mì ngon nhất thế giới của CNN không có đại diện từ Việt Nam, do khác tiêu chí lựa chọn.",
    path: "#",
  },
  {
    id: 3,
    img: topthegioi,
    title: "Ẩm thực Việt hấp dẫn top đầu thế giới",
    gioithieu: "Việt Nam xếp thứ 4 trong danh sách những quốc gia có nền ẩm thực hấp dẫn nhất thế giới năm 2025.",
    path: "https://vnexpress.net/banh-mi-viet-nam-khong-nam-trong-top-50-loai-ngon-nhat-the-gioi-4953879.html",
  },
  {
    id: 4,
    img: khachtay,
    title: "Khách Australia ăn uống 'hết công suất' trong 48 giờ ở Việt Nam",
    gioithieu: "Du khách Australia Ben Groundwater đặt mục tiêu 'ăn càng nhiều càng tốt' tại TP HCM.",
    path: "https://vnexpress.net/khach-australia-an-uong-het-cong-suat-trong-48-gio-o-viet-nam-4936782.html",
  },
  {
    id: 5,
    img: monan,
    title: "6 món có nước phải thử ở miền Tây",
    gioithieu: "Bún cá Kiên Giang, hủ tiếu Mỹ Tho được 'Bản đồ ẩm thực' TasteAtlas gợi ý.",
    path: "https://vnexpress.net/6-mon-co-nuoc-phai-thu-o-mien-tay-4923031.html",
  },
  {
    id: 6,
    img: chaolong,
    title: "Cháo lòng vào top món cháo ngon nhất châu Á",
    gioithieu: "Cháo lòng xếp thứ 6 trong những món cháo ngon nhất châu Á do Taste Atlas bình chọn.",
    path: "https://vnexpress.net/chao-long-vao-top-mon-chao-ngon-nhat-chau-a-4885911.html",
  },
  {
    id: 7,
    img: dotron,
    title: "Ba đồ ăn Việt trong top món trộn ngon nhất thế giới",
    gioithieu: "Phở trộn, nộm và bò tái chanh góp mặt trong danh sách 100 món trộn có rau củ ngon nhất thế giới.",
    path: "https://vnexpress.net/ba-do-an-viet-trong-top-mon-tron-ngon-nhat-the-gioi-4905963.html",
  },
]

const trendingNews = [
  {
    id: 0,
    name: "Hệ thống phòng lũ của Đăk Lăk mong manh thế nào",
    path: "https://vnexpress.net/he-thong-phong-lu-cua-dak-lak-mong-manh-the-nao-4985259.html",
  },
  {
    id: 1,
    name: "Hà Nội dự kiến hỗ trợ tối đa 5 triệu đồng mỗi người để đổi xe máy điện",
    path: "https://vnexpress.net/ha-noi-du-kien-ho-tro-toi-da-5-trieu-dong-moi-nguoi-de-doi-xe-may-dien-4985241.html",
  },
  {
    id: 2,
    name: "Ôtô chở hơn 20 người cháy trên cao tốc TP HCM - Trung Lương",
    path: "https://vnexpress.net/oto-cho-hon-20-nguoi-chay-tren-cao-toc-tp-hcm-trung-luong-4985307.html",
  },
  {
    id: 3,
    name: "Người dân Hòa Thịnh thất thần giữa ngôi nhà đổ nát",
    path: "https://vnexpress.net/nguoi-dan-hoa-thinh-that-than-giua-ngoi-nha-do-nat-4983235.html",
  },
]

export default function TinKhuyenMai() {
  return (
    <>
      <Header />
      <main className="news-section">
        <div className="container py-5">
          <div className="row mb-5">
            <div className="col-lg-8">
              <div className="section-header mb-4">
                <span className="category-badge">Ẩm Thực Vùng Quê</span>
                <h1 className="section-title">Theo Dòng Sự Kiện</h1>
              </div>

              <div className="news-grid">
                {blogNew.map((news) => (
                  <Link to={news.path} className="news-card" target="_blank" rel="noopener noreferrer" key={news.id}>
                    <div className="news-card-image">
                      <img src={news.img || "/placeholder.svg"} alt={news.title} />
                      <div className="news-card-overlay">
                        <span className="read-more">Đọc tiếp →</span>
                      </div>
                    </div>
                    <div className="news-card-content">
                      <h3 className="news-card-title">{news.title}</h3>
                      <p className="news-card-intro">{news.gioithieu}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <aside className="col-lg-4">
              <div className="trending-section">
                <h2 className="trending-title">
                  <i className="fa-solid fa-fire"></i> Xu Hướng
                </h2>
                <div className="trending-list">
                  {trendingNews.map((item, index) => (
                    <Link
                      to={item.path}
                      className="trending-item"
                      target="_blank"
                      rel="noopener noreferrer"
                      key={item.id}
                    >
                      <span className="trending-number">{index + 1}</span>
                      <span className="trending-text">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
