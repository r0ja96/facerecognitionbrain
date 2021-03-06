import React, {Component} from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from "./components/SignIn/SignIn";
import Register from './components/Register/Register';
import './App.css';


const initialState = {
  input:'',
  imageUrl:'',
  box:{},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email:'',
    password: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component{
  
  constructor(){
    super();
    this.state = initialState
  }
  
  loadUser = (data) =>{
    this.setState({user:{
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
    } 
    });
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

   onSubmit = (event)=>{
    
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

    fetch('http://localhost:3000/imageurl',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
          input: this.state.input
        })
        }).then(response => response.json())
    .then((response) => {
      if(response) {
        fetch('http://localhost:3000/image',{
        method: 'put',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
          id: this.state.user.id
        })
        }).then( response => response.json())
        .then(count =>{
          console.log(count.entries);
         this.setState(Object.assign(this.state.user,{entries: count.entries}));
        }).catch(console.log);
      }
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch((err) => {
     console.log(err);
    });
    
  }

  onRouteChange = (route)=>{
    if (route === 'signout') {
      this.setState(initialState);
    }else if(route === 'home'){
      this.setState({isSignedIn: true});
    }
      this.setState({route:route});
  }

  render(){
    const {isSignedIn, imageUrl, route, box} = this.state;
  return (
    <div className="App">
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route === 'home'?
      <div>
      <Logo />
      <Rank name={this.state.user.name} entries={this.state.user.entries}/>
      <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
      <FaceRecognition imageUrl={imageUrl} box={box}/>
      </div>:(
        route === 'signin'?<SignIn onRouteChange={this.onRouteChange} loadUser ={this.loadUser}/>:
        <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
      )
      }
      </div>
  );
    }
}

export default App;
