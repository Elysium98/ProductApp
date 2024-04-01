import logo from "./logo.svg";
import "./App.css";
import ProductForm from "./components/Add-product";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductList } from "./components/Product-list";
import ProductDetail from "./components/Product-Details";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList></ProductList>}></Route>
        <Route
          path="/product/:id"
          element={<ProductDetail></ProductDetail>}
        ></Route>
        <Route path="/new" element={<ProductForm></ProductForm>}></Route>
        <Route path="*" element={<div>Not found</div>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
