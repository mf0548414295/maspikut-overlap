import { Route, Routes } from "react-router-dom";
import App from "./App";
import ProductOrderSummary from "./Components/ProductOrderSummary/ProductOrderSummary";
const Router: React.FC = () => {
  return (
    <Routes >
      <Route path="/" element={<App />} />
      <Route path='/productOrderSummary' element={<ProductOrderSummary />} />
    </Routes>
  );
};
export default Router;
