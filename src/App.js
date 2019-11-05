import React from 'react';
import './App.css';
import CanvasComponent from './canvas';
import ReactDOM from "react-dom";
import Gallery from "./Gallery";
//import img from ""

let urls = [
  "./react-image-gallery/cat01.jpg",
  "./react-image-gallery/cat02.jpg",
  "./react-image-gallery/cat03.jpg",
  "./react-image-gallery/cat04.jpg",
  "./react-image-gallery/cat05.jpg",
  "./react-image-gallery/cat06.jpg"
];

function App() {
  return (
    <div className="App">
       {/* <CanvasComponent text="test"/>  imageUrls={urls}*/}
        <Gallery />
    </div>
  );
}

export default App;
