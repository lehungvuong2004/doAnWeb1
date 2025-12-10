"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Xoá user
        localStorage.removeItem("user");
        // Chuyển về trang chủ
        navigate("/", { replace: true });
    }, [navigate]);

    return null; // Không cần render gì
}
