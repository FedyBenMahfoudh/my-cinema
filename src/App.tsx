import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import { MovieDetailPage } from "./pages/MovieDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
    </Routes>
  );
}

export default App;
