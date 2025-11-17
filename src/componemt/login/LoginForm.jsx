import { Routes, Route, Link } from "react-router-dom";
import imglogin from "../../img/imglogin.jpg";
import App from "../../App";
import Createdom from "../js/js.jsx";
import { Forget } from "../quenmatkhau/Forget.jsx";
import "../../App.css";

function LoginForm() {
  return (
    <>
     <Createdom />
      <div className="form__background" id="background__winter">
        <div className="container d-flex align-items-center justify-content-center vh-100">
          <div className="row w-100 h-500">
            {/* Form bên trái */}
            <div className="col-md-6 h-100 d-flex flex-column justify-content-center px-4 background__form-left">
              <div className="form-login">
                <h3 className="text-uppercase fs-1 text-center">Sign In</h3>
                <p className="text-center my-3 fs-5 text-desc">
                  hoặc sử dụng email và mật khẩu của bạn
                </p>

                {/* ✅ Form thêm vào đây */}
                {/* /onSubmit={handleSubmit}  */}
                <form className="form" method="post">
                  <label htmlFor="email"  className="fs-14 w-400">Email</label>
                  <input
                    type="email"
                    className="form-control my-2 w-75 ms-3"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                  />

                  <label htmlFor="passwd" className="w-400 fs-14">Mật khẩu</label>
                  <input
                    type="password"
                    className="form-control my-2 w-75 ms-3"
                    id="passwd"
                    name="passwd"
                    placeholder="Mật khẩu"
                    required
                  />

                  <div className="d-flex my-3 justify-content-center gap-3">
                    <button
                      type="submit"
                      className="btn btn-primary px-4 bg-dark"
                    >
                      Đăng Nhập
                    </button>
                    <Link to="/register">
                      <button
                        type="button"
                        className="btn btn-outline-primary px-4 bg-light text-dark"
                      >
                        Đăng Ký
                      </button>
                    </Link>
                  </div>

                  <p className="text-center">
                    <Link
                      to="/forget"
                      className="text-decoration-none text-dark fw-light fs-14 fs-5"
                    >
                      Bạn quên mật khẩu?
                    </Link>
                  </p>
                </form>
              </div>
            </div>
            {/* Ảnh bên phải */}
            <div className="col-md-6 h-100 d-flex align-items-center justify-content-center p-0">
              <img
                src={imglogin}
                alt="Ảnh Thức Ăn"
                className="rounded-2 w-100"
                style={{ height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
