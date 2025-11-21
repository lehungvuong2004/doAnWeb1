import imglogin from "../../img/imglogin.jpg";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import App from "../../App";
import Createdom from "../js/js.jsx";
import { Forget } from "../quenmatkhau/Forget.jsx";
import "../../App.css";
function Register() {
  // State để lưu input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  // toogle password
let x = true;
function togglePassword() {
  const input = document.getElementById("passwd");
  if (x) {
    input.type = "text";
  } else {
    input.type = "password";
  }
  x = !x;
}
  // kiểm tra tài
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // kiểm tra tài mật khẩu
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !passwd) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    } else if (!emailRegex.test(email)) {
      alert("Email không hợp lệ!");
      return;
    } else if (!passRegex.test(passwd)) {
      alert("Mật khẩu phải có chữ hoa, chữ thường, số và ít nhất 8 ký tự!");
      return;
    }
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("passwd", passwd);
    try {
      const res = await fetch(
        "http://localhost/DOANWEB/laptrinhweb/api/register.php",
        {
          method: "POST",
          body: formData,
        }
      );
      const text = (await res.text()).trim();
      if (text === "success") {
        alert("Đăng ký thành công!");
        window.location.href = "/login";
      } else if (text === "exist") {
        alert("Tên tài khoản đã tồn tại!");
      } else if (text === "empty") {
        alert("Thiếu dữ liệu gửi lên server!");
      } else {
        alert("Lỗi khác từ server: " + text);
      }
    } catch (err) {
      alert("Không kết nối được server PHP");
      console.error(err);
    }
  };
  return (
    <>
      <Createdom />
      <div className="background__form-register" id="background__winter">
        <div className="container d-flex align-items-center justify-content-center vh-100">
          <div className="row w-100" style={{ height: "500px" }}>
            {/* Ảnh bên trái */}
            <div className="col-md-6 h-100 d-none d-md-flex align-items-center justify-content-center p-0">
              <img
                src={imglogin}
                alt="Ảnh Thức Ăn"
                className="rounded-2 w-100 img__register"
              />
            </div>
            {/* Form bên phải */}
            <div className="col-md-6 h-100 d-flex flex-column justify-content-center px-4 background__register-right">
              <div className="form-register">
                <h3 className="text-uppercase fs-3 text-center">Đăng Ký</h3>
                <p className="text-center my-3 fs-6 sub-title">
                  hoặc đăng ký bằng email và mật khẩu của bạn
                </p>

                {/* ✅ Bắt đầu form */}
                <form onSubmit={handleRegister} className="form ms-5">
                  <label htmlFor="username" className="fs-14 w-400">Tài Khoản</label>
                  <input
                    type="text"
                    className="form-control my-2 w-75 ms-3"
                    id="username"
                    name="username"
                    placeholder="Tài Khoản"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label htmlFor="email" className="fs-14 w-400">Email</label>
                  <input
                    type="email"
                    className="form-control my-2 w-75 ms-3"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="passwd" className="fs-14 w-400">Mật khẩu</label>
                 <div className="d-flex position-relative align-items-center">
                   <input
                    type="password"
className="form-control my-2 pe-5 w-75 ms-3"
                    id="passwd"
                    name="passwd"
                    placeholder="Mật khẩu"
                    value={passwd}
                    onChange={(e) => setPasswd(e.target.value)}
                  />
                       <i className="fa-solid fa-eye position-absolute eye-icon" onClick={togglePassword}></i>      
                 </div>

                  <div className="d-flex my-3 justify-content-center gap-3">
                    <button type="submit" className="btn btn-primary px-5">
                      Đăng Ký
                    </button>
                  </div>
                </form>
                <p className="text-center fs-14 ">
                  Bạn đã có tài khoản?
                  <Link
                    to="/login"
                    className="text-danger ms-1 text-decoration-underline"
                  >
                    Đăng Nhập
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
