export function Forget() {
  return (
    <>
      <div
        className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light"
      >
        <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
          <h4 className="text-center text-primary mb-3 fw-bold">
            Quên Mật Khẩu
          </h4>
          <p className="text-center text-black-50 fs-6">
            Nhập email của bạn để nhận liên kết đặt lại mật khẩu
          </p>
          <input
            type="email"
            placeholder="Nhập Email Của Bạn"
            className="form-control mb-3 border-0 border-bottom rounded-0"
          />
          <button className="btn btn-dark w-100 rounded-3">
            Gửi
          </button>
        </div>
      </div>
    </>
  );
}
