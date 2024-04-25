
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"



export default function RegisterForm({toggleForm}){

    const [formData , setFormData] = useState(
        {
            chapterName : "",
            chapterDescription : "",
            email: "",
            password : "",
            username : "",
            role : "regular"
        }
    )

    function formChangeHandler(event){

        setFormData( (prevState) => ({
            ...prevState,
            [event.target.name] : event.target.value
        }))

    }

    async function registerHandler(){
        try{
            // make api call
            console.log("data is : ")
            console.log(formData)

            const res = await axios.post("http://localhost:3000/api/v1/chapter/register", formData )
            console.log(res)
            if(res.status == 200){
                console.log("registration successful")
                toast.success("registration successfull, you can login now")
                toggleForm()

            }
        }catch(error){
            console.log("Registration failed, inside catch block")
            console.log(error)
        }
    }

   
   
    return(

        <div>
            <h2 className=" text-center font-extrabold text-2x ">Register</h2>
            
            <div  className="flex flex-col gap-3" >

                <div>
                    <label htmlFor="chapterName">Name</label>
                    <input type="text" name="chapterName" value={formData.chapterName} onChange={formChangeHandler} />
                </div>
                

                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={formData.username} onChange={formChangeHandler} />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={formChangeHandler} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={formChangeHandler} />
                </div>

                <div>
                    <label htmlFor="chapterDescription" >Chapter Description</label>
                    <input type="text" name="chapterDescription" value={formData.chapterDescription}  onChange={formChangeHandler} />
                </div>

                <div>
                    <button onClick={registerHandler}> Register </button>
                </div>

            </div>

        </div>

    )
}