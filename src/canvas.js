import React from 'react';
// import Button from "@material-ui/core/Button";
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
            dialogOpen: false,
            filename:"",
            file: '',
            imagePreviewUrl: '',
            x1:"",
            y1:"",
            x2 :"",
            x2:""
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

    /*loadImage = () =>{
      debugger;
        const ctx = this.refs.canvas.getContext('2d');
        var image = new Image();
        image.onload = function () {
            ctx.drawImage(image, 0, 0);
        }
        if(this.props.CurrentSelectedID > -1 && this.props.CurrentSelectedID <= this.props.imageData.length){
          let source = this.props.imageData[this.props.CurrentSelectedID == 0 ?this.props.CurrentSelectedID: this.props.CurrentSelectedID-1];
          image.src = source.url;  //"data:image/jpeg;base64,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";
        }else{
          image.src =""
          console.log("");
        }
        
    }*/
    loadImage = () =>{
      debugger;
        const ctx = this.refs.canvas.getContext('2d');
        var currentItemData = this.props.imageData[this.props.CurrentSelectedID == 0 ?this.props.CurrentSelectedID: this.props.CurrentSelectedID-1];
        var image = new Image();
        image.onload = function () {
            ctx.drawImage(image, 0, 0);
            debugger;
            
            ctx.beginPath();
            ctx.strokeStyle="black";
            var rects =  currentItemData.annotation 
            for(var i=0;i<rects.length;i++) {
                // ctx.rect(rects[i][0], // fill at (x, y) with (width, height)
                //         rects[i][1],
                //         rects[i][2],
                //         rects[i][3]);
                //ctx.strokeRect(rects[i][0],rects[i][1], rects[i][2] - rects[i][0], rects[i][3] - rects[i][1]);
                ctx.strokeRect(rects[i].x1,rects[i].y1, rects[i].x2 - rects[i].x1, rects[i].y2 - rects[i].y1);
            }
            ctx.stroke();
        }
        if(this.props.CurrentSelectedID > -1 && this.props.CurrentSelectedID <= this.props.imageData.length){
          image.src = currentItemData.url;  //"data:image/jpeg;base64,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";
        }else{
          image.src =""
          console.log("");
        }
        
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
    
    render() {
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
  const { imageData, CurrentSelectedID } = state;
  debugger;
  return {
    imageData,
    CurrentSelectedID
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(CanvasComponent);