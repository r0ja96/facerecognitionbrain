import './ImageLinkForm';

const ImageLinkForm = ()=>{
    return(
        <div>
            <p>{'This Magic Will detect faces in your pictures. Git it a try'}</p>
            <div>
                <input type ='text'/>
                <button>Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;