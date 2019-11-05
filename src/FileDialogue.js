
import React from "react";
function buildFileSelector(){
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    return fileSelector;
  }
  
  export default class FileDialogue extends React.Component {
    componentDidMount(){
      this.fileSelector = buildFileSelector();
    }
    
    handleFileSelect = (e) => {
      e.preventDefault();
      this.fileSelector.click();
    }
    
    render(){
      return <a style={{
        "background-color": "#4CAF50",
        border: "none",
        "border-radius": "6px",
        color: "white",
        padding: "15px 32px",
        "text-align": "center",
        "text-decoration": "none",
    }} href="" onClick={this.handleFileSelect}>Select files</a>
    }
  }
