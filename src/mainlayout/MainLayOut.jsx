import Header from "../componemt/header/Header.jsx";
import TinKhuyenMai from "../componemt/header/TinKhuyenMai.jsx";
import BiQuyetNauAn from "../componemt/header/BiQuyetNauAn.jsx";
import LienHeChiDuong from "../componemt/header/LienHeChiDuong.jsx";
import Banner from "../componemt/banner/Banner.jsx";
import FoodItem from "../componemt/FoodItem/FoodItem.jsx";
import DatBan from "../componemt/datban/DatBan.jsx";
import NoiBac from "../componemt/noibac/Noibac.jsx";
import DauBepHeader from "../componemt/header/DauBepHeader.jsx";
import ThuongHieu from "../componemt/thuonghieu/ThuongHieu.jsx";
import NhanVien from "../componemt/nhanvien/NhanVien.jsx";
import Footer from "../componemt/footer/Footer.jsx";

import "../App.css";
function MainLayOut() {
  return (
    <>
      <Header/>
      <Banner/>
      <FoodItem/>
      <DatBan/>
      <NoiBac/>
      <ThuongHieu />
      <NhanVien/>
       <Footer/>
    </>
  );
}

export default MainLayOut;
