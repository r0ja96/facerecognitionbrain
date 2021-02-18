import React, {Component} from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'fcce34cb34e142319debfd1a1b241231'
});

class App extends Component{
  
  constructor(){
    super();
    this.state = {
      input:'',
      imageUrl:''
    }
  }
  

  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

   onSubmit = async (event)=>{
    
    this.setState({imageUrl:this.state.input});
    try{
    const res = await app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
    this.state.input
    );
    console.log(res);

    }catch(err){
      console.log(err);
    }

    /*app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
    // THE JPG
    "https://i.insider.com/5d321d4ea209d3146d650b4a?width=1100&format=jpeg&auto=webp"
    )
    .then((response) => {
     console.log(response);
    })
    .catch((err) => {
     console.log(err);
    });*/
    
  }


  render(){
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
      <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
  );
    }
}

export default App;
