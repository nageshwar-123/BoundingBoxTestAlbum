import { TaskConstants } from "../constants";
const initialState = {
  //index:6,
  CurrentSelectedID:"0",
  TimeStamep: new Date().getTime().toString(),
  imageData: [
    {
      id: 1,
      url:
        "./react-image-gallery/cat01.jpg",
      name: "",
      annotation:[]
    },
    {
      id: 2,
      url:
        "./react-image-gallery/cat02.jpg",
      name: "",
      annotation:[]
    },
    {
      id: 3,
      url:
        "./react-image-gallery/cat03.jpg",
      name: "",
      annotation:[]
    },
    {
      id: 4,
      url:
        "./react-image-gallery/cat04.jpg",
      name: "",
      annotation:[]
    },
    {
      id: 5,
      url:
        "./react-image-gallery/cat05.jpg",
      name: "",
      annotation:[]
    },
    {
      id: 6,
      url:"./react-image-gallery/cat06.jpg",
      name: "",
      annotation:[]
    }
  ]
};

const UPLOAD_IMAGE_FILE_SUCESS = (state, action) => {    
  debugger;
  
  const { model } = action;
   const{imageData}= state;
   imageData.push(model.fileinfo)
  //annotation.push(payload.annotation);
   //index = payload.fileinfo.id;
   debugger;
  return {
    ...state,
    TimeStamep: new Date().getTime().toString(),
  };
 };
 const UPLOAD_IMAGE_ANITAION_SUCESS = (state, action) => {    
  debugger; 
  const { payload } = action;
   const{imageData, index}= state;
   if(imageData && imageData.length > 0 && payload.fileinfo)
   {
    if(imageData != null && imageData.length > 0)
    {
      let idx = 0;
      (imageData).forEach(e => {
        
        if(e.id != null && e.id ==  payload.fileinfo.id)
        {
          imageData[idx] = payload.fileinfo;     
            
          return;
        };
        idx ++;
      });
    }
   }
   debugger;
   return {
       ...state,
       TimeStamep: new Date().getTime().toString(),      
   }
 };

 const SAVE_SELECTED_IMG_ID_Action_SUCESS = (state, action) => {    
  debugger; 
  //const{model} = action;
 // let {CurrentSelectedID } = state;
  //CurrentSelectedID = model;
   return {
       ...state,
       CurrentSelectedID : action.model      
   }
 };

 

 export function TaskReducer(state = initialState, action) {
  switch (action.type) {
    case TaskConstants.UPDATE_NAME_START:
      debugger;
      const imageArray = state.imageData.forEach(o => {
        if (o.id === action.model.id) {
          o.name = action.model.name;
        }
      });
      return {
        ...state,
        loading: true
      };
      case TaskConstants.UPLOAD_IMAGE_FILE_SUCESS:
          debugger;
          return UPLOAD_IMAGE_FILE_SUCESS(state, action);
          case TaskConstants.UPLOAD_IMAGE_ANITAION_SUCESS:
              debugger;
              return  UPLOAD_IMAGE_ANITAION_SUCESS(state, action);
          case TaskConstants.SAVE_SELECTED_IMG_ID :
              return  SAVE_SELECTED_IMG_ID_Action_SUCESS(state, action);
    default:
      return state;
  }
}
 
 /*export default  TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TaskConstants.UPDATE_NAME_START:
      debugger;
      const imageArray = state.imageData.forEach(o => {
        if (o.id === action.model.id) {
          o.name = action.model.name;
        }
      });
      return {
        ...state,
        loading: true
      };
case TaskConstants.UPLOAD_IMAGE_FILE_SUCESS:
    this.UPLOAD_IMAGE_FILE_SUCESS(state, action);
    case TaskConstants.UPLOAD_IMAGE_ANITAION_SUCESS:
    this.UPLOAD_IMAGE_FILE_SUCESS(state, action);
    default:
      return state;
  }
};*/


/*const handlers = {
  [TaskConstants.UPDATE_NAME_START]: TaskReducer,
  //[TaskConstants.U: TaskReducer,
  [TaskConstants.UPLOAD_IMAGE_FILE_SUCESS]: UPLOAD_IMAGE_FILE_SUCESS,
  [TaskConstants.UPLOAD_IMAGE_ANITAION_SUCESS]: UPLOAD_IMAGE_ANITAION_SUCESS
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};*/
