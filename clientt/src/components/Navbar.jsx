import {useNavigate, Link} from "react-router-dom"

function Navbar (){

    const navi = useNavigate();
    return (

        <div className="flex justify-between py-4 px-4">
            {/* left logo */}
            <div className=" font-bold ">
                Campus Pulse
            </div>

            {/* right section */}
            <div className="flex gap-3">
                <Link to = "/" className= "" >Home</Link>
                <Link to = "/login" className= ""  >Post/Login</Link>
                <Link to = "/" className= "" >AboutUs</Link>
                <Link to = "/" className= "" >Contact</Link>
            </div>

        </div>
    )
}

export default Navbar;