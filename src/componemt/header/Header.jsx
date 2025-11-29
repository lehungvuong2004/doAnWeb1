import { Link } from "react-router-dom";
import Logo from "../../img/logo.jpg";
import "../../App.css";

const NAV_ITEMS = [
  { title: "Trang Chủ", path: "/", scroll: true },
  {
    title: "Menu",
    subMenu: [
      { title: "Đồ Ăn", path: "#food", scroll: true },
      { title: "Nước Uống", path: "#drink", scroll: true },
    ],
  },
  {
    title: "Về Chúng Tôi",
    subMenu: [
      { title: "Giới Thiệu Nhà Hàng", path: "/about" },
      { title: "Đầu Bếp", path: "/chef" },
      { title: "Bí Quyết Nấu Ăn", path: "/recipes" },
    ],
  },
  {
    title: "Liên Hệ",
    subMenu: [
      { title: "Đặt Bàn Online", path: "/booking" },
      { title: "Bản Đồ & Chỉ Đường", path: "/map" },
    ],
  },
  {
    title: "Tin Tức",
    subMenu: [{ title: "Tin Khuyến Mãi", path: "/sale/tinkhuyenmai" }],
  },
];

function Header() {
  return (
    <header className="header">
      <div className="container flex__container">
        {/* logo */}
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo" className="logo__img" />
          </Link>
        </div>

        {/* menu */}
        <nav className="menu">
          <ul className="menu__list list-unstyled">
            {NAV_ITEMS.map((item, index) => (
              <li key={index}>
                {item.scroll ? (
                  <a href={item.path}>{item.title}</a>
                ) : (
                  <Link to={item.path || "#"}>{item.title}</Link>
                )}
                {item.subMenu && (
                  <ul className="sub-menu">
                    {item.subMenu.map((sub, subIndex) => (
                      <li key={subIndex}>
                        {sub.scroll ? (
                          <a href={sub.path}>{sub.title}</a>
                        ) : (
                          <Link to={sub.path}>{sub.title}</Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* giỏ hàng & người dùng */}
        <div className="user">
          <ul className="list-unstyled flex__container gap-4 user-list">
            <li>
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
            </li>
            <li>
              <i className="fa-solid fa-users"></i>
              <ul className="sub-menu icon-login">
                <li>
                  <Link to="/login">Đăng Nhập</Link>
                </li>
                <li>
                  <Link to="/register">Đăng Ký</Link>
                </li>
                <li>
                  <Link to="/history">Lịch Sử Đặt Bàn</Link>
                </li>
                <li>
                  <Link to="/logout">Đăng Xuất</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
export default Header;
