import React from 'react';
import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import TextField from "@material-ui/core/TextField";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateNameAction, UPLOADIMAGEANNOTAIONAction } from "./actions";
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

export class CanvasComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          currentItemData:{},
            dialogOpen: false,
            filename:"",
            file: '',
            imagePreviewUrl: '',
            x1:"",
            y1:"",
            x2 :"",
            y2:""
        };
        
        this.rect = {}
        this.drag = false
    }
    componentDidMount(props) {
        
      const canvasObj = document.querySelector('canvas')
        canvasObj.addEventListener('mousedown', this.HandleDilogMouseDown.bind(this))
        canvasObj.addEventListener('mouseup', this.HandleDilogMouseUp.bind(this))
        canvasObj.addEventListener('mousemove', this.HandleDilogMouseMove.bind(this))
        this.loadImage();
        
    }

    loadImage = () =>{
      const ctx = this.refs.canvas.getContext('2d');
      var currentItemData = this.props.imageData[this.props.CurrentSelectedID == 0 ?this.props.CurrentSelectedID: this.props.CurrentSelectedID-1];
      this.setState({
        currentItemData:currentItemData
       });
      var image = new Image();
      ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
      if(this.props.CurrentSelectedID > -1 && this.props.CurrentSelectedID <= this.props.imageData.length){
        image.src = currentItemData.url; 
        this.refs.canvas.width = image.width;
        this.refs.canvas.height = image.height;
      }else{
        image.src =""
        console.log("");
      }
      
      image.onload = function () {

          ctx.drawImage(image, 0, 0, image.width, image.height); 

          ctx.beginPath();
          ctx.strokeStyle="red";
          var rects =  currentItemData.annotation 
          for(var i=0;i<rects.length;i++) {
              ctx.strokeRect(rects[i].x1,rects[i].y1, rects[i].x2 - rects[i].x1, rects[i].y2 - rects[i].y1);
          }
          ctx.stroke();
      }
      
  }
    
/*
    loadImage = () =>{
      
        const ctx = this.refs.canvas.getContext('2d');
        var currentItemData = this.props.imageData[this.props.CurrentSelectedID == 0 ?this.props.CurrentSelectedID: this.props.CurrentSelectedID-1];
      
        this.setState({
          currentItemData:currentItemData
         });
       
        var image = new Image();
        if(this.props.CurrentSelectedID > -1 && this.props.CurrentSelectedID <= this.props.imageData.length){
          image.src = currentItemData.url; 
        }else{
          image.src =""
          console.log("");
        }
        
        image.onload = function () {
            ctx.drawImage(image, 0, 0, image.width,image.height);
           // 
            
            ctx.beginPath();
            ctx.strokeStyle="black";
            var rects =  currentItemData.annotation 
            for(var i=0;i<rects.length;i++) {

                ctx.strokeRect(rects[i].x1,rects[i].y1, rects[i].x2 - rects[i].x1, rects[i].y2 - rects[i].y1);
            }
            ctx.stroke();
        }

        
      }
*/

    componentWillReceiveProps(props){
      
      this.loadImage();
    }
    HandleDilogMouseDown =(e) =>{
        const canvasObj = document.querySelector('canvas')
        // const rect = canvasObj.getBoundingClientRect()
        //     const x = e.clientX - rect.left
        //     const y = e.clientY - rect.top
        const rectBoundaries = canvasObj.getBoundingClientRect()
        this.rect.startX = e.clientX - rectBoundaries.left
        this.rect.startY = e.clientY - rectBoundaries.top
        this.drag = true;
        console.log("x")
    }
    HandleDilogMouseUp =(e) =>{
        this.drag=false
        const canvasObj = document.querySelector('canvas')
        const ctx = canvasObj.getContext('2d');
        ctx.setLineDash([6]);
        ctx.strokeRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
        console.log("z")
    }
    HandleDilogMouseMove =(e) =>{
        if (this.drag) {
            const canvasObj = document.querySelector('canvas')
            const rectBoundaries = canvasObj.getBoundingClientRect()
            this.rect.w = (e.clientX - rectBoundaries.left) - this.rect.startX;
            this.rect.h = (e.clientY - rectBoundaries.top) - this.rect.startY ;
            
            //const ctx = canvasObj.getContext('2d');
            //ctx.clearRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
            //ctx.setLineDash([6]);
            //ctx.strokeRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);

            //console.log("y")
        }
    }
    handleChange = e => {
        this.setState({
          ...this.state,
          name: e.target.value
        });
      };

      onhandleTag = (e) => {
        
        const{currentItemData, x1,y1,x2,y2} = this.state;
        if(currentItemData)
        {
          let annotation = currentItemData.annotation;
          if(annotation && annotation.length >0)
          {
              annotation.push({
                id:annotation.length + 1,
                x1:x1,
                x2:x2,
                y1:y1,
                y2:y2
            });
              currentItemData.annotation = annotation;
          }
          else
          {
            annotation = [{
                  id:0,
                  x1:x1,
                  x2:x2,
                  y1:y1,
                  y2:y2
              }];
              currentItemData.annotation = annotation;
          }
          let userdata = { fileinfo:currentItemData};
         // 
            this.props.handleTag(userdata);
        }
      }
    
      onHandleChange=e=>{
        //
        const {name,value} = e.target;
       this.setState({
           [name]:value
          });
        }

    render() {
      //
        return (
            <div>
              <div> <canvas ref="canvas" className="canvasimage" /></div>

           <div>
         <Card>
             <CardHeader>Add bounding box coordinates Info</CardHeader>
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
         <div>
         <Button onClick={this.props.handleCloseDialog} color="primary">
                    Close
                    </Button>
                    <Button
                    onClick={() => this.onhandleTag(this)}
                    color="primary"
                    autoFocus
                    >
                    Tag
                    </Button>
         </div>
        </div>
        
        );
    }
}

const mapDispatchtoProps = dispatch =>
  bindActionCreators(
    {
      updateNameAction: updateNameAction,
      UPLOADIMAGEANNOTAIONAction : UPLOADIMAGEANNOTAIONAction
    },
    dispatch
  );

const mapStateToProps = state => {
  const { imageData, CurrentSelectedID, TimeStamep } = state;
  
  return {
    imageData,
    CurrentSelectedID,
    TimeStamep
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(CanvasComponent);