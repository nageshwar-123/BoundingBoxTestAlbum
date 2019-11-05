import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

 import Dialog from "@material-ui/core/Dialog";
 import DialogActions from "@material-ui/core/DialogActions";
 import DialogContent from "@material-ui/core/DialogContent";
 import DialogTitle from "@material-ui/core/DialogTitle";
import { updateNameAction, UPLOADIMAGEANNOTAIONAction, UPLOADIMAGEFILEAction, SAVE_SELECTED_IMG_ID_Action } from "./actions";
import Button from "@material-ui/core/Button";
import FileDialogue from "./FileDialogue"
import Canvas from './canvas'

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Col,
    Row,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    CardTitle,
    CardText
  } from "reactstrap";
import { width } from "@material-ui/system";

/**
 * Given a DOM element, searches it for <img> tags and checks if all of them
 * have finished loading or not.
 * @param  {Element} parentNode
 * @return {Boolean}
 */
function imagesLoaded(parentNode) {
  debugger;
  const imgElements = [...parentNode.querySelectorAll("img")];
  for (let i = 0; i < imgElements.length; i += 1) {
    const img = imgElements[i];
    if (!img.complete) {
      return false;
    }
  }
  return true;
}



class Gallery extends React.Component {
  constructor(props) {
    super(props);
   //this.handleChange = this.handleChange.bind(this);
    this.state = {
      dialogOpen : false,
      loading: true,
      imageStr:"",
      imgExt:"",
      filename:"",
      file: '',
      imagePreviewUrl: '',
      x1:"",
      y1:"",
      x2 :"",
      y2:""
    };
  }

  handleImageChange = () => {
    debugger;
    this.setState({
      loading: !imagesLoaded(this.galleryElement)
    });
  };

  handleimageUpload= () => {
    debugger;
    /*this.setState({
      loading: !imagesLoaded(this.galleryElement)
    });*/
    alert("handleimageUpload");
  };

  handleFileSelect = (e) => {
    e.preventDefault();
    this.fileSelector.click();
  }
  OnGalaryImageClick =(item) =>{
    debugger;
    this.props.SAVE_SELECTED_IMG_ID_Action(item.id.toString());
   this.handleOpenDialog();

}
  handleOpenDialog = () => {
    this.setState({
        dialogOpen: true
    });
};

handleCloseDialog = () => {
    this.setState({
        dialogOpen: false
    });
};
  handleChange(e,selectorFiles)
    {
        debugger;
        this.setState({
            imgExt: e.target.files[0]
        })
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])

        reader.onload = () => {
            this.setState({
                imageStr: reader.result
            })
          };
          reader.onerror = function (error) {
            console.log('Error: ', error);
          }
        //console.log(e.target.files[0]);
       // console.log(selectorFiles);
    }


    _handleImageChange(e) {
        e.preventDefault();
    debugger;
        let reader = new FileReader();
        let file = e.target.files[0];
    let filename = e.target.files[0].name;
        reader.onloadend = () => {
          this.setState({
            filename: filename,
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
       // console.log(this.state.file);
       //console.log(this.state.imagePreviewUrl);
      }
      
      _handleSubmit(e) {
          debugger;
        e.preventDefault();
        const{file,filename, imagePreviewUrl,x1,y1,x2,y2 } = this.state;
        const{imageData} = this.props;
        //&& x1 && y1 && x2 && y2
        if(file && imagePreviewUrl)
        {
          let userdata = { fileinfo:{
                id: imageData.length + 1,
                url:imagePreviewUrl,
                name: filename,
                annotation:[{
                  id:0,
                  x1:x1,
                  x2:x2,
                  y1:y1,
                  y2:y2
              }]
              },
              
          }
            debugger;
            this.props.UPLOADIMAGEFILEAction(userdata);
        }
        else
        {
            alert("Error please fill all");
        }        
        // TODO: do something with -> this.state.file
        //console.log('handle uploading-', this.state.file);
      }
      

      handleTag=e=>{
        debugger;
        const {name,value} = e.target;
       this.setState({
           [name]:value
          });
        }

      onHandleChange=e=>{
        debugger;
        const {name,value} = e.target;
       this.setState({
           [name]:value
          });
        }

  renderSpinner() {
    if (!this.state.loading) {
      return null;
    }
    return <span className="spinner" />;
  }

  
  renderImage(item) {
    return (
      <div key={item.id}>
        <img key={item.id}
          src={item.url}
         // onLoad={this.handleImageChange}
          //onError={this.handleImageChange}
          //onClick={this.OnGalaryImageClick(this,item)}
          onClick={()=>this.OnGalaryImageClick(item)}
        />
      </div>
    );
  }

  render() {
    debugger;
    const{imageData} = this.props;
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      } else {
        $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      }
      //debugger;
    return (
      <div
        className="gallery"
        ref={element => {
          this.galleryElement = element;
        }}
      >
        {/*{this.renderSpinner()}*/}
        <div className="images">
          { imageData.map(item => this.renderImage(item))}
        </div>
        {/*<div className="">
            
            <FileDialogue />
    </div>*
            <div>
            <input type="file" onChange={ (e) => this.handleChange(e,e.target.files) } />
    </div>*/}

        <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
          
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
        <div>
        <Card>
            <CardHeader>Add imag with bounding box coordinates Info</CardHeader>
            <CardBody>
              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label for="lx1">X1</Label>
                    <Input
                      type="text"
                      name="x1"
                      placeholder="X1"
                      // value={this.props.empData.firstname}
                      onChange={this.onHandleChange}
                    />
                    </FormGroup>
                    </Col>
                    <Col md={3}>
                  <FormGroup>
                    <Label for="ly1">Y1</Label>
                    <Input
                      type="text"
                      name="y1"
                      placeholder="Y1"
                      // value={this.props.empData.firstname}
                      onChange={this.onHandleChange}
                    />
                    </FormGroup>
                    </Col>
                    <Col md={3}>
                  <FormGroup>
                    <Label for="lx2">X2</Label>
                    <Input
                      type="text"
                      name="x2"
                      placeholder="X2"
                      // value={this.props.empData.firstname}
                      onChange={this.onHandleChange}
                    />
                    </FormGroup>
                    </Col>
                    <Col md={3}>
                  <FormGroup>
                    <Label for="ly2">Y2</Label>
                    <Input
                      type="text"
                      name="y2"
                      placeholder="Y2"
                      // value={this.props.empData.firstname}
                      onChange={this.onHandleChange}
                    />
                  </FormGroup>
                </Col>
                </Row>
                </CardBody>
                </Card>
            
        </div>
        <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
        <div>

        </div>
      </div>
<div>
  {/*ref="canvas"*/}
< Dialog open={this.state.dialogOpen}
                    onClose={this.handleCloseDialog} fullScreen >
                <DialogContent>
                  <div>
                <Canvas   handleTag={this.handleTag}/>
                </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseDialog} color="primary">
                    Close
                    </Button>
                    <Button
                    onClick={() => this.handleTag(this,1)}
                    color="primary"
                    autoFocus
                    >
                    Tag
                    </Button>
                </DialogActions>
            </Dialog>
</div>

      </div>
    );
  }
}
/*Gallery.propTypes = {
    imageData: PropTypes.arrayOf(PropTypes.string).isRequired
};*/

const mapStateToProps = (state,ownProps) => {
  debugger;
const { imageData , TimeStamep } = state;
return {
  imageData,
  TimeStamep
};
};

const mapDispatchtoProps = dispatch =>
  bindActionCreators(
    {
      UPLOADIMAGEANNOTAIONAction : UPLOADIMAGEANNOTAIONAction,
        UPLOADIMAGEFILEAction : UPLOADIMAGEFILEAction,
        SAVE_SELECTED_IMG_ID_Action : SAVE_SELECTED_IMG_ID_Action
      //updateNameAction: updateNameAction
    },
    dispatch
  );



export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Gallery);


//export default Gallery;