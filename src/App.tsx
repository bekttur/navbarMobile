import { BrowserRouter, Routes, Route } from "react-router-dom"
import HorizontalMenu from "./components/HorizontalMenu/HorizontalMenu"
import Menu from "./components/Menu/Menu"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HorizontalMenu />} /> */}
        <Route path="/" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
