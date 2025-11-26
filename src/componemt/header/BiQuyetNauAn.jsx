
import Header from "./Header";
export default function BiQuyetNauAn() {
    
  const tips = [
    {
      icon: "🔥",
      title: "Lửa là chìa khóa",
      description:
        "Kiểm soát nhiệt độ chính xác để khoá dinh dưỡng và tạo hương vị đặc biệt. Lửa vừa giúp tạo màu vàng hoàn hảo, lửa mạnh tạo vỏ giòn.",
    },
    {
      icon: "⏱️",
      title: "Thời gian hoàn hảo",
      description:
        "Từng giây đều quan trọng. Một chút quá lâu có thể hủy hoại cả món ăn. Học cách tính toán chính xác để đạt kết quả tuyệt vời.",
    },
    {
      icon: "👨‍🍳",
      title: "Kỹ thuật cơ bản",
      description:
        "Nắm vững các kỹ thuật cơ bản như xếp chồng, kéo, đảo sẽ giúp bạn tự tin xử lý bất kỳ công thức nào.",
    },
    {
      icon: "👥",
      title: "Cân bằng hương vị",
      description:
        "Hương vị phải cân bằng giữa chua, mặn, ngọt, cay. Đây là bí quyết của những đầu bếp hàng đầu thế giới.",
    },
  ];

  const recipes = [
    {
      title: "Phở Bò Truyền Thống",
      secret:
        "Nấu nước dùng trong 12-24 giờ trên lửa nhỏ để lấy toàn bộ hương vị từ xương, hành gừng. Bí quyết nằm ở sự kiên nhẫn và gia vị nhuyễn chuối.",
      time: "24h",
    },
    {
      title: "Cơm Chiên Tỏi",
      secret:
        "Tỏi phải được chiên với dầu nóng cho đến khi vàng nâu, tỏi mẫn chín hòa quyện với dầu để tạo hương thơm đặc biệt.",
      time: "15p",
    },
    {
      title: "Gà Hấp Gừng",
      secret:
        "Dùng gà tươi sống, hấp với lửa vừa trong 35-40 phút kế cùng nước dùng gừng tươi để giữ thịt mềm, ngọt tự nhiên.",
      time: "40p",
    },
    {
      title: "Bánh Mì Nóng",
      secret:
        "Lò nướng phải đủ nóng (200°C) khi cho bánh vào. Nướng cho đến khi vỏ giòn rụm, bên trong mềm và thơm nức mũi.",
      time: "25p",
    },
  ];

  // 👉 Thay thế 10 lời khuyên thành mảng
  const chefTips = [
    "Luôn chuẩn bị nguyên liệu trước khi bắt đầu nấu (mise en place) - điều này tiết kiệm thời gian và giảm căng thẳng",
    "Sử dụng nguyên liệu tươi sống chất lượng cao là nền tảng của mọi món ăn ngon",
    "Sắp xếp dụng cụ nấu ở vị trí dễ tiếp cận để công việc trôi chảy mượt mà",
    "Thử nếm liên tục và điều chỉnh gia vị để hoàn thiện hương vị từng bước",
    "Sử dụng nhiệt độ chính xác - đầu tư vào nhiệt kế là cần thiết cho những món khó",
    "Để thức ăn 'nghỉ' sau khi nấu xong, không cắt ngay để nước trong được giữ lại",
    "Giữ bếp sạch sẽ giúp công việc hiệu quả hơn và an toàn hơn cho sức khỏe",
    "Học từ những lỗi sai - đó là cách tốt nhất để cải thiện kỹ năng nấu ăn",
    "Sử dụng dụng cụ chất lượng cao giúp việc nấu dễ dàng hơn và kết quả tốt hơn",
    "Nấu ăn với tình yêu - tâm ý và đam mê của bạn sẽ truyền vào từng thức ăn",
  ];
 
  return (
   
    <div className="container-fuild bg-light">
    <Header/> 
      <section
        className="py-5 text-center bg-gradient"
        style={{ background: "linear-gradient(to bottom, #fff5f0, #fff)" }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold mb-3 text-dark">Bí Quyết Nấu Ăn</h1>
          <p className="lead text-muted">
            Khám phá những bí quyết được truyền dạy từ các đầu bếp chuyên nghiệp hàng đầu để nâng cao kỹ năng nấu ăn của bạn
          </p>
        </div>
      </section>
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center display-5 fw-bold mb-5 text-dark">Bốn Nguyên Tắc Vàng</h2>
          <div className="row g-4">
            {tips.map((tip, index) => (
              <div key={index} className="col-md-6">
                <div className="card h-100 border-light shadow-sm hover-shadow" style={{ transition: "all 0.3s" }}>
                  <div className="card-body">
                    <div className="fs-1 mb-3">{tip.icon}</div>
                    <h5 className="card-title fw-bold text-dark">{tip.title}</h5>
                    <p className="card-text text-muted fs-14">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secret Recipes Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center display-5 fw-bold mb-5 text-dark">Bí Quyết Các Món Ăn Đặc Biệt</h2>
          <div className="row g-4">
            {recipes.map((recipe, index) => (
              <div key={index} className="col-md-6">
                <div
                  className="card border-light shadow-sm"
                  style={{
                    background: "linear-gradient(135deg, #fff8f3 0%, #fffaf5 100%)",
                    transition: "all 0.3s",
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title fw-bold text-dark mb-0">{recipe.title}</h5>
                      <span className="badge bg-warning text-dark">{recipe.time}</span>
                    </div>
                    <p className="card-text text-muted border-start ps-3 border-warning fs-14">
                      <em>"{recipe.secret}"</em>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-5 bg-white">
        <div className="container" style={{ maxWidth: "700px" }}>
          <h2 className="display-5 fw-bold mb-4 text-dark">10 Lời Khuyên Vàng Từ Đầu Bếp</h2>

          <ol className="list-group list-group-flush">
            {chefTips.map((tip, index) => (
              <li key={index} className="list-group-item border-0 ps-0 mb-3 fs-14">
                <strong className="text-warning">{index + 1}.</strong> {tip}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 text-center" style={{ background: "linear-gradient(135deg, #ffeae1 0%, #fff8f3 100%)" }}>
        <div className="container" style={{ maxWidth: "600px" }}>
          <h2 className="display-5 fw-bold mb-3 text-dark">Sẵn Sàng Trở Thành Đầu Bếp Chuyên Nghiệp?</h2>
          <p className="lead text-muted mb-4">
            Áp dụng những bí quyết này vào bếp nhà bạn và tạo ra những bữa ăn tuyệt vời cho gia đình và bạn bè!
          </p>
          <a href="/menu" className="btn btn-warning btn-lg fw-bold">
            Khám Phá Menu Của Chúng Tôi →
          </a>
        </div>
      </section>
    </div>
  );
}
