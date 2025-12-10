import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imglogin from "../../img/imglogin.jpg";
import Createdom from "../js/js.jsx";
import "../../App.css";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [passwd, setPasswd] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !passwd) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        const formData = new FormData();
        formData.append("username", username);
        formData.append("passwd", passwd);
        try {
            const res = await fetch(
                "http://localhost/DOANWEB/laptrinhweb/api/login.php",
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await res.json();
            if (data.status === "success") {
                alert("Đăng nhập thành công! Chào " + data.user.username);
                // Lưu user vào localStorage nếu cần
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/"); // chuyển về trang chủ
            } else {
                alert(data.message || "Đăng nhập thất bại");
            }
        } catch (err) {
            alert("Không kết nối được server PHP!");
            console.error(err);
        }
    };

    return (
        <>
            <Createdom />
            <div className="form__background" id="background__winter">
                <div className="container d-flex align-items-center justify-content-center vh-100">
                    <div className="row w-100 h-500">
                        {/* Form bên trái */}
                        <div className="col-md-6 h-100 d-flex flex-column justify-content-center px-4 background__form-left">
                            <div className="form-login">
                                <h3 className="text-uppercase fs-1 text-center">
                                    Sign In
                                </h3>
                                <p className="text-center my-3 fs-5 text-desc">
                                    đăng nhập bằng tài khoản và mật khẩu của bạn
                                </p>

                                <form onSubmit={handleLogin} className="form">
                                    <label
                                        htmlFor="username"
                                        className="fs-14 w-400"
                                    >
                                        Nhập Tài Khoản
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control my-2 w-75 ms-3"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />

                                    <label
                                        htmlFor="passwd"
                                        className="w-400 fs-14"
                                    >
                                        Nhập Mật Khẩu
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control my-2 w-75 ms-3"
                                        id="passwd"
                                        name="passwd"
                                        placeholder="Mật khẩu"
                                        value={passwd}
                                        onChange={(e) =>
                                            setPasswd(e.target.value)
                                        }
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
                                            Quên mật khẩu?
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>

                        {/* Ảnh bên phải */}
                        <div className="col-md-6 h-100 d-flex align-items-center justify-content-center p-0">
                            <img
                                src={imglogin ? imglogin : null}
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
