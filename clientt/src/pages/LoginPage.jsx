import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import bgImg from "../assets/bgimg.jpg.png"
import { useState } from "react"
import { useEffect } from "react"
import {useNavigate} from "react-router-dom"

function LoginPage (){

    const navi = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem('accessToken')
        if(token){
            navi("/post")
        }
    },[])

    const [formType , setFormType] = useState(true)

    function toggleForm(){
        setFormType(!formType)
    }

    return(
        <div className="w-full h-full flex justify-center items-center bg-contain bg-no-repeat " style={{
                backgroundImage: `url(${bgImg})`,
            }}>
            {/* <LoginForm/> */}

            <div>
                {
                    formType ? <LoginForm toggleForm={toggleForm} /> : <RegisterForm toggleForm={toggleForm} />
                }
            </div>
        </div>
    )
}

export default LoginPage