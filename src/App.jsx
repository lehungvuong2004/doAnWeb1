import { Routes, Route } from "react-router-dom";
import LoginForm from "./componemt/login/LoginForm.jsx";
import { Forget } from "./componemt/quenmatkhau/Forget.jsx";
import Register from "./componemt/dangky/Register.jsx";
import Footer from "./componemt/footer/Footer.jsx";
import Header from "./componemt/header/Header.jsx";
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/forget" element={<Forget />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            {/* <Footer/> */}
          
        </>
    );
}

export default App;
