import "./FaceRecognition.css";

const FaceRecognition = ({imageUrl}) =>{

    return(
        <div>
            <img src={imageUrl} width='500px' height='auto'/>
        </div>
    );
}

export default FaceRecognition;