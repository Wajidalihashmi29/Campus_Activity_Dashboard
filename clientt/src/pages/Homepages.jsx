import { useEffect } from "react";
import axios from "axios"
import { useState } from "react";
import Post from "../components/Post"

function Homepage(){

    const [posts, setPosts ] = useState([])

    useEffect(()=>{

        const getPosts = async ()=>{
            
            try{
            const res = await axios.get("http://localhost:3000/api/v1/post/get-all-posts")
            setPosts(res.data.data)

            }catch(error){
                console.log("Unable to get posts")
                console.log(error)
            }

        }


        getPosts();

},[])

    return (
        <div>
            {
                posts.map((post ,index) => (
                    
                    <Post key={index} id={post._id} chapter={post.chapter} typeOfEvent={post.typeOfEvent} titleOfEvent={post.titleOfEvent} descriptionOfEvent={post.descriptionOfEvent} dateOfEvent={post.dateOfEvent} registrationLink={post.registrationLink}/>
                    
                ))
            }
        </div>
    )
}

export default Homepage;