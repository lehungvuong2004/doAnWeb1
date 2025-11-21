import Header from "../componemt/header/Header.jsx";
import Banner from "../componemt/banner/Banner.jsx";
import FoodItem from "../componemt/FoodItem/FoodItem.jsx";

import DatBan from "../componemt/datban/DatBan.jsx";
import NoiBac from "../componemt/noibac/Noibac.jsx";
import ThuongHieu from "../componemt/thuonghieu/ThuongHieu.jsx";
import Footer from "../componemt/footer/Footer.jsx";
function MainLayOut() {
  return (
    <>
      <Header/>
      <Banner/>
      <FoodItem/>
      <DatBan/>
      <NoiBac/>
      <ThuongHieu />

       <Footer/>
    </>
  );
}

export default MainLayOut;
