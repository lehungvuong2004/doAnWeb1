import foodlogo from "../../img/foodlogo.jpg";
import bannerfoodItem from "../../img/bannerfoodItem.jpg";
import { useState } from "react";
function FoodItem() {
  const tabs = ["Main Dishes", "Desserts", "Sea Food", "Beverage"];
  const [active, setActive] = useState("Main Dishes");
  const arrayFood = [
    {
      id: 0,
      name: "Chicken Alfredo",
      subname: "Ricotta / goat cheese / beetroot",
      priceFull: "$30",
      priceHalf: "$20",
    },
    {
      id: 1,
      name: "Grilled Beef Burger ",
      subname: "Cheese / pickles / beef / sesame bun",
      priceFull: "$35",
      priceHalf: "$25",
    },
    {
      id: 2,
      name: "BBQ Chicken",
      subname: "Smoked chicken / special sauce",
      priceFull: "$28",
      priceHalf: "$18",
    },
    {
      id: 3,
      name: "Chicken Alfredo",
      subname: "Ricotta / goat cheese / beetroot",
      priceFull: "$15",
      priceHalf: "$10",
    },
  ];
  return (
    <>
      <div className="p-80 food_item">
        <div className="container">
          <h2 className="heading__primary">Mặt Hàng Đồ Ăn</h2>
          <div className="d-flex align-items-md-center my-4">
            <img
              src={foodlogo ? foodlogo : null}
              alt="ảnh logo"
              className="food__logo"
            />
            <div className="w-100 ms-3">
              <h6 className="number"> 500+</h6>
              <p className="menu">Menu Và Món Ăn</p>
            </div>
          </div>

          <div className="food__info">
            <div className="row">
              <div className="col-md-4">
                <img
                  src={bannerfoodItem ? bannerfoodItem : null}
                  alt=""
                  className="banner__food"
                />
              </div>
              <div className="col-md-8">
                <div className="menu-tabs">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      className={`menu-tab ${active === tab ? "active" : ""}`}
                      onClick={() => setActive(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <ul className="meal-type">
                  <li>Full</li>
                  <li>Haft</li>
                </ul>
                <ul className="meal-items">
                  <div className="content">
                    {arrayFood.map((item) => (
                      <li key={item.id} className="meal-row">
                        <div className="top">
                          <h4> {item.name} </h4>
                          <div className="price">
                            <span>{item.priceFull}</span>
                            <span>{item.priceHalf}</span>
                          </div>
                        </div>
                        <div className="bottom">
                          <p>{item.subname}</p>
                        </div>
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default FoodItem;
