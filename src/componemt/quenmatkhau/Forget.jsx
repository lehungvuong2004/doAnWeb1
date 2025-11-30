import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function Forget() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("danger");
  const [loading, setLoading] = useState(false);
  const handleSendOtp = async () => {
    if (!email) {
      setMsg("Vui lòng nhập email");
      setMsgType("danger");
      return;
    }
    setMsg("");
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost/DOANWEB/laptrinhweb/api/quenmatkhau.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const text = await res.text();
      const data = JSON.parse(text);
      setMsg(data.message);

      if (data.success) {
        setMsgType("success");
        setStep(2);
      } else {
        setMsgType("danger");
      }
    } catch (err) {
      setMsg("Lỗi kết nối: " + err.message);
      setMsgType("danger");
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword || !confirmPassword) {
      setMsg("Vui lòng điền đầy đủ thông tin");
      setMsgType("danger");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMsg("Mật khẩu không khớp");
      setMsgType("danger");
      return;
    }
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost/DOANWEB/laptrinhweb/api/matkhaumoi.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp, newPassword }),
        }
      );

      const text = await res.text();
      const data = JSON.parse(text);
      setMsg(data.message);

      if (data.success) {
        setMsgType("success");
        // <CHANGE> Chuyển về trang đăng nhập sau 2 giây
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMsgType("danger");
      }
    } catch (err) {
      setMsg("Lỗi kết nối: " + err.message);
      setMsgType("danger");
    }
    setLoading(false);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        {step === 1 && (
          <>
            <h4 className="text-center text-primary mb-3 fw-bold">
              Quên Mật Khẩu
            </h4>
            <input
              type="email"
              placeholder="Nhập Email"
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="btn btn-dark w-100 rounded-3"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? "Đang gửi..." : "Gửi OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h4 className="text-center text-primary mb-3 fw-bold">
              Đặt lại Mật Khẩu
            </h4>
            <input
              type="text"
              placeholder="Nhập mã OTP"
              className="form-control mb-3"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu mới"
              className="form-control mb-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              className="form-control mb-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="btn btn-dark w-100 rounded-3"
              onClick={handleResetPassword}
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
            </button>
            <button
              className="btn btn-link mt-2"
              onClick={() => {
                setStep(1);
                setOtp("");
                setNewPassword("");
                setConfirmPassword("");
                setMsg("");
              }}
            >
              Quay lại
            </button>
          </>
        )}
        {msg && <p className={`mt-3 text-center text-${msgType}`}>{msg}</p>}
      </div>
    </div>
  );
}
