import { TaskConstants } from "../constants";

const updateNameAction = model => ({
  type: TaskConstants.UPDATE_NAME,
  model: model
});

const UPLOADIMAGEANNOTAIONAction = model => ({
  type: TaskConstants.UPLOAD_IMAGE_ANITAION,
  model: model
});

const UPLOADIMAGEFILEAction = model => (
  {
  type: TaskConstants.UPLOAD_IMAGE_FILE_SUCESS,
  model: model
});

const SAVE_SELECTED_IMG_ID_Action = model => (
  {
  type: TaskConstants.SAVE_SELECTED_IMG_ID,
  model: model
});



export { updateNameAction, UPLOADIMAGEANNOTAIONAction, UPLOADIMAGEFILEAction, SAVE_SELECTED_IMG_ID_Action };
