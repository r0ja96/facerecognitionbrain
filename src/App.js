import React, {Component} from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from "./components/SignIn/SignIn";
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
      imageUrl:'',
      box:{},
      route: 'signin'
    }
  }
  
  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

   onSubmit = async (event)=>{
    
   this.setState({imageUrl:this.state.input});

    /*try{
      
    const res = await app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
    this.state.input
    );

    this.displayFaceBox(this.calculateFaceLocation(res));

    }catch(err){
      console.log(err);
    }*/

    app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
    this.state.input
    )
    .then((response) => {
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch((err) => {
     console.log(err);
    });
    
  }

  onRouteChange = (route)=>{
    this.setState({route:route});
  }

  render(){
  return (
    <div className="App">
      <Navigation onRouteChange={this.onRouteChange}/>
      {this.state.route === 'signin'? <SignIn onRouteChange={this.onRouteChange}/>:
      <div>
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
      <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
      </div>
      }
      </div>
  );
    }
}

export default App;
