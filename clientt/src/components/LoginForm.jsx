import { useState } from "react"
import toast from "react-hot-toast"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"

function LoginForm({toggleForm}){

    const [loginValues, setloginValues] = useState(
        {
            username : "",
            password : ""
        }
    )

    function formChangeHandler(event){
        setloginValues( (prevState) => ({
            ...prevState,
            [event.target.name] : event.target.value
        }))
    
    }
    
    const navigate = useNavigate()
    async function handleClick(){
        console.log("inside click handler")
        try{
            if(loginValues.username == ""){
                toast.error("Please fill in the username")
            }


            if( loginValues.password == ""){
                toast.error("Please fill in the password")
            }

            
    
            console.log("password not null")

            const res = await axios.post("http://localhost:3000/api/v1/chapter/login", {
                "username" : loginValues.username,
                "password" : loginValues.password
            })
            
            if(res.status == 200){
                console.log(res)
                toast.success("login successful, redirecting to the post page")
                console.log(res.data.data.accessToken)
                localStorage.setItem("accessToken",res.data.data.accessToken)
                navigate("/post")
            }

            toast.error("usename or password incorrect")
        }catch(error){
            console.log("insider catch block")
            console.log(error)
        }
        
    }

    return(
        <div className=" ">
                    
                <div  className=" flex flex-col bg-pink-200 w-[20vw] gap-4 px-5 py-5"  >

                    <h2 className=" text-center">Login</h2>
                    
                    <label htmlFor="Chaptername">Username</label>
                    <input type="text" id= "Chaptername" placeholder="johndoe" name = "username" onChange={formChangeHandler}  value={loginValues.username}/>
                    {/* to be added ~ name = "username" value = {loginValues.username} onChange={handleChangeUser} */}
                    
                    <label htmlFor="Password">Password</label>
                    <input type="password" id= "Password" placeholder="abcd1234" name = "password" onChange={formChangeHandler} value={loginValues.password} />

                    {/* to be added ~ name = "password" value = {loginValues.password} onChange={handleChangePassword} */}
                    <button onClick={handleClick}>Login</button>


                    <div>
                Don't have an account? <span className="underline text-amber-50 cursor-pointer" onClick={()=> (toggleForm())}>Register Now</span>
            </div>


                </div>

             {/* <Link to = "/Login/Register" >Didn't signup yet ? Register now ! </Link>   */}
        </div>

    )
}
export default LoginForm