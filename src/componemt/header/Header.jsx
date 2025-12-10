"use client";

import { useState, useEffect } from "react";
import logo from "./img_new/logo.jpg";
import "../../App.css";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
    { title: "Trang Chủ", path: "/", scroll: true },
    {
        title: "Menu",
        subMenu: [{ title: "Đồ Ăn", path: "/food" }],
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

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(null);

    // ⭐ Thêm xử lý user
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const toggleSubMenu = (index) => {
        setOpenSubMenu(openSubMenu === index ? null : index);
    };

    return (
        <header className="header">
            <div className="container flex__container">
                {/* logo */}
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" className="logo__img" />
                    </Link>
                </div>

                <button
                    className={`navbar-toggler ${isOpen ? "active" : ""}`}
                    type="button"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                </button>

                <nav className={`menu ${isOpen ? "menu--open" : ""}`}>
                    <ul className="menu__list list-unstyled">
                        {NAV_ITEMS.map((item, index) => (
                            <li
                                key={index}
                                className={
                                    openSubMenu === index ? "submenu-open" : ""
                                }
                            >
                                {item.subMenu ? (
                                    <>
                                        <Link
                                            to="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleSubMenu(index);
                                            }}
                                        >
                                            {item.title}
                                            <span className="arrow-down d-lg-none"></span>
                                        </Link>

                                        <ul
                                            className={`sub-menu ${
                                                openSubMenu === index
                                                    ? "sub-menu--open"
                                                    : ""
                                            }`}
                                        >
                                            {item.subMenu.map(
                                                (sub, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Link to={sub.path}>
                                                            {sub.title}
                                                        </Link>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </>
                                ) : (
                                    <Link to={item.path || "#"}>
                                        {item.title}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* ⭐ GIỎ HÀNG & NGƯỜI DÙNG */}
                <div className="user">
                    <ul className="list-unstyled flex__container gap-4 user-list">
                        {/* Giỏ hàng */}
                        <li>
                            <Link to="/cart">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="cart-icon"
                                >
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                            </Link>
                        </li>

                        {/* ICON USER */}
                        <li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="user-icon"
                            >
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>

                            <ul className="sub-menu icon-login">
                                {/* ⭐ KIỂM TRA LOGIN */}
                                {!user ? (
                                    <>
                                        <li>
                                            <Link to="/login">Đăng Nhập</Link>
                                        </li>
                                        <li>
                                            <Link to="/register">Đăng Ký</Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="px-3">
                                            Xin chào, <b>{user.username}</b>
                                        </li>
                                        <li>
                                            <Link to="/history">
                                                Lịch Sử Đặt Bàn
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/logout">Đăng Xuất</Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
