import { Route, Routes } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import Home from "./Home"
import RewardPage from "./RewardPage"

const App = () => {
  return (
    <div className="app">
      {/* Header stays constant */}
      <Header />

      {/* Page content changes */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rewards" element={<RewardPage />} />
        </Routes>
      </main>

      {/* Footer stays constant */}
      <Footer />
    </div>
  )
}

export default App
