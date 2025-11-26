import { Link } from "react-router-dom";

export default function Footer() {
  const footer_Link = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "About Us",
      path: "/about",
    },
    {
      id: 3,
      name: "Services",
      path: "/services",
    },
    {
      id: 4,
      name: "Our Menu",
      path: "/menu",
    },
    {
      id: 5,
      name: "Gallery",
      path: "/gallery",
    },
  ];
  return (
    <>
      <div className="footer p-60">
        <div className="container">
          <div className="row py-4">
            <div className="col-md-3 col-sm-6 company">
              <div className="logo">
                <img src= {null} alt="" className="logo__footer" />
              </div>
              <h6 className="title_footer">Công ty tinh của VƯƠNG và VINH</h6>
              <p className="sub__title">
                Trụ sở chính: Đường cao lỗ, phường 4, quận 8, HCM
              </p>
            </div>

            <div className="col-md-3 col-sm-6 contact__footer">
              <h6 className="title_footer">Contact Us</h6>
              <p >
                Số Điện Thoại:<a href="tel:0973244354" className="ms-2">+84 973 244 354</a>
              </p>
              <p>
                Gmail:
                <a href="mailto:lehungvuong2004@gmail.com" className="ms-2">
                  lehungvuong2004@gmail.com
                </a>
              </p>
            </div>

            <div className="col-md-3 col-sm-6">
              <h6 className="title_footer">Quick Link</h6>
              <ul className="quick">
                {footer_Link.map((item) => (
                  <li key={item.id} className="py-1">
                    <Link to={item.path || null} className="text-decoration-none">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-3 col-sm-6">
              <h6 className="title_footer">Opening Time</h6>
              <ul className="list__item-rest">
                <li>Monday: 10.00am - 05.00pm</li>
                <li>Tuesday: 10.20am - 05.30pm</li>
                <li>Wednesday: 10.30am - 05.50pm</li>
                <li>Thursday: 11.00am - 07.10pm</li>
                <li>Friday: 11:00am - 6:00pm</li>
                <li>Saturday-Sunday: Closed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
