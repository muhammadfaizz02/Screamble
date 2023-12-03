import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './component/Navbar';
import NewProductPage from './pages/NewProduct';
import ProductDetails from './pages/ProductDetail';
import EditProductPage from './pages/EditProduct';
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Homepage />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/products/new"} element={<NewProductPage />} />
          <Route path={"/products/:id"} element={<ProductDetails />} />
          <Route path={"/editproduct/:id"} element={<EditProductPage />} />
        </Routes>
      </Router >
    </>
  )
}

export default App;
