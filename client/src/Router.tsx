import { Route, Routes } from "react-router-dom";
import App from "./App";
const Router: React.FC = () => {
  return (
    <Routes >
      <Route path="/" element={<App />} />
    </Routes>
  );
};
export default Router;
