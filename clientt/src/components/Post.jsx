function Post(props){
    return(
        <div>

            <div>
                {props.id}
            </div>

            <div>
                {props.chapter}
            </div>

            <div>
                {props.typeOfEvent}
            </div>

        </div>
    )
}

export default Post;