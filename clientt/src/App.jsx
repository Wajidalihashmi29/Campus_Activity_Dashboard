import {Routes, Route} from "react-router-dom"
import './App.css'
import {Toaster} from "react-hot-toast"
import Homepage from "./pages/Homepages"
import Navbar from "./components/Navbar"
import LoginPage from "./pages/LoginPage"
import PostPage from "./pages/PostPage"

function App() {
  

  return (
    <div className="w-screen h-screen">
      <Navbar />


      <Routes>
        <Route path = "/" element={<Homepage />} />
        <Route path = "/login" element={ <LoginPage />} />
        <Route path = "/post" element={<PostPage />} />
      </Routes>

        
      <Toaster/>
    </ div>
  )
}

export default App
