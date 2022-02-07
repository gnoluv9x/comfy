import { Route, Routes, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Header from "./components/Header/Header";
import Path from "./components/Path/Path";
import Features from "./features";
import Cart from "./features/Cart/Cart";
toast.configure();

function App() {
    const location = useLocation();
    console.log(location);

    return (
        <div className="App">
            <Header />
            <Path pathName={location.pathname} />

            <Routes>
                <Route path="/cart" element={<Cart />} />
                <Route path="/products" element={<Features />} />
            </Routes>
        </div>
    );
}

export default App;
