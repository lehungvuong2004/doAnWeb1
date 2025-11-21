const many__people = [
  {
    id: 0,
    people: "Đi 1 người: đặt bàn đơn",
    path: ""
  },
  {
    id: 1,
    people: "Đi 2 người: đặt bàn đôi",
     path: ""
  },
  {
    id: 2,
    people: "Đi nhóm 4-6 người: đặt bàn 6 người",
     path: ""
  },
  {
    id: 3,
    people: "Đi nhóm 6-12 người: đặt bàn dài",
     path: ""
  },
  {
    id: 4,
    people: "Đi nhóm >12 người: gọi trực tiếp Hotline: 0973244354",
     path: ""
  },
];
const generateTimes = () => {
  const times = [];
  let hour = 10; 
  let minute = 0;
  while (hour < 17 || (hour === 17 && minute === 0)) { 
    const h = hour.toString().padStart(2, "0");
    const m = minute.toString().padStart(2, "0");
    times.push(`${h}:${m}`);

    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }

  return times;
};
function DatBan() {
      const times = generateTimes();
  return (
    <>
      <div className="table">
        <div className="container">
          <div className="py-4">
            <div className="row text-light">
              <div className="col-md-5">
                <h2 className="text-uppercase">Set table</h2>
                <p className="sub-title">
                  Quý khách vui lòng đặt bàn trước để có trải nghiệm thưởng thức
                  ẩm thực tốt nhất tại nhà hàng của chúng tôi.
                </p>

                <p>
                  <span className="fs-14">Gợi ý đặt bàn:</span>
                </p>
               <ul className="">
          {many__people.map((item) => (
            <li key={item.id} className="py-1">
                <i class="fa-solid fa-angle-right me-2"></i>
              <span
                href={item.path}
                className="text-decoration-none text-white fs-14 "  >
                {item.people}
              </span>
            </li>
          ))}
        </ul>
              </div>
              <div className="col-md-7">
                <div className="form d-flex flex-column">
                    <input type="text"  placeholder="Tên Của Bạn" />
                    <input type="text"  placeholder="Số Điện Thoại " />
                    <input type="number"  placeholder="Số Lượng người" min= "1"  max="12"/>
                    <input type="date" name="" id="real__time"/>
                </div>
                {/* Thêm phần chọn giờ */}
              <div className="time-grid mt-3">
                {times.map((t, index) => (
                  <label key={index} className="time-item">
                    <input type="checkbox" />
                    <span>{t}</span>
                  </label>
                ))}
              </div>

            <button className="btn__order">Đặt Bàn</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DatBan;
