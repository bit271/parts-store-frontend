import React from "react"
import AddCarForm from "./components/AddCarForm"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/cars" element={<AddCarForm />} />
        {/* другие маршруты */}
      </Routes>
    </Router>
  )
}

export default App
