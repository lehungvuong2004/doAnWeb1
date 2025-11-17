import { useEffect } from "react";
export default function Createdom() {
  useEffect(() => {
    const winter = document.getElementById("background__winter");
    if (!winter) return;
    const borderArray = ["50%", "0%"];
    const blurArray = ["0px", "5px"];
    const colorArray = ["#FF6B6B", "#FFE66D", "#4472CA"];
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    const count = 40;
    for (let i = 0; i < count; i++) {
      const randomLeft = Math.floor(Math.random() * width);
      const randomTop = Math.floor(Math.random() * height);
      const color = Math.floor(Math.random() * 3);
      const border = Math.floor(Math.random() * 2);
      const blur = Math.floor(Math.random() * 2);
      const widthElement = Math.floor(Math.random() * 5) + 5;
      const timeAnimation = Math.floor(Math.random() * 12) + 8;
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.backgroundColor = colorArray[color];
      div.style.width = widthElement + "px";
      div.style.height = widthElement + "px";
      div.style.left = randomLeft + "px";
      div.style.top = randomTop + "px";
      div.style.borderRadius = borderArray[border];
      div.style.filter = `blur(${blurArray[blur]})`;
      div.style.animation = `move ${timeAnimation}s ease-in infinite`;
      winter.appendChild(div);
    }
  }, []);
  return null;
}

