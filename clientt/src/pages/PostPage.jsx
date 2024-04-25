import {  useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"


export default function PostPage(){


    const navi = useNavigate()
   

     const [postForm, setPostForm ] = useState(
        {
        
            titleOfEvent : "",
            typeofEvent : "",
            descriptionOfEvent : "",
            dateofEvent : "",
            registrationLink : "",
            
        }

    )

    function formChangeHandler(event){


        setPostForm( (prevState) => ({
            ...prevState,
            [event.target.name] : event.target.value
        }))

    
    }



    async function submitHandler(){
        try{
            const token = localStorage.getItem('accessToken')
            console.log("Data is : ")
            console.log(postForm)
            console.log("Access token is : ")
            console.log(token)
            
            
            const res = await axios.post("http://localhost:3000/api/v1/post/post-event", postForm, {
                headers:{
                    Authorization: `Bearer ${token}` 
                }
            })
            console.log(res)
            if(res.status == 200){
                console.log("Event post successful")
                navi("/")
            }

        }catch(error){
            console.log("")
            console.log(error)
        }
    }




    return(
        <div>            

            <div className="">

                <label htmlFor="titleOfEventevent">Event Name</label>
                <input 
                    type = "text" 
                    name = "titleOfEvent"
                    id   = "titleOfEvent"
                    value = {postForm.titleOfEvent}
                    onChange={formChangeHandler}
                />
                
                <label htmlFor="typeofEvent">Event Type</label>
                <input 
                    type = "text"  
                    name = "typeofEvent"
                    id   = "typeofEvent"
                    value = {postForm.typeOfEvent}
                    onChange = {formChangeHandler}
                />
                
                <label htmlFor="descriptionOfEvent">Event Description</label>
                <textarea 
                    name = "descriptionOfEvent"
                    id   = "descriptionOfEvent" 
                    cols = "30"
                    rows = "3"
                    value = {postForm.descriptionOfEvent}
                    onChange = {formChangeHandler}

                    >
                
                </textarea>


                <input 
                    type="date" 
                    id="dateofEvent" 
                    name="dateofEvent" 
                    value={postForm.dateofEvent}
                    onChange={formChangeHandler}
                    min="2018-01-01" 
                    max="2025-12-31" />

                <label htmlFor="registrationLink">Link of Event</label>
                <input
                    type="text"
                    id="registrationLink"
                    name="registrationLink"
                    value={postForm.registrationLink}
                    onChange={formChangeHandler}
                />


                <button onClick={submitHandler} > POST </button>

            </div>

            

        </div>
    )
}

