//import { put, all, takeLatest } from "redux-saga/effects";
import { call, all, takeLatest, takeEvery, put } from "redux-saga/effects";

import { TaskConstants } from "../constants";

function* updateName(actiion) {
  //
  yield put({ type: TaskConstants.UPDATE_NAME_START, model: actiion.model });
}

function* updateNameWatcher() {
  //
  yield takeLatest(TaskConstants.UPDATE_NAME, updateName);
  //yield takeLatest(TaskConstants.UPDATE_NAME, updateNameWatcher);   
  //yield takeLatest(TaskConstants.UPDATE_NAME_START, updateName);  
}

function* UplodImageAninationWatcher(source) {
  
  yield put({ type: TaskConstants.UPLOAD_IMAGE_ANITAION_SUCESS, payload: source.model });  
}

function* UploadImageFileWatcher(source) {
  //
  yield put({ type: TaskConstants.UPLOAD_IMAGE_FILE_SUCESS, payload: source.model });  
  
}
export default function* rootSaga() {
  yield takeLatest(TaskConstants.UPLOAD_IMAGE_FILE, UploadImageFileWatcher);   
  yield takeLatest(TaskConstants.UPLOAD_IMAGE_ANITAION, UplodImageAninationWatcher);   
  yield takeLatest(TaskConstants.UPDATE_NAME, updateNameWatcher);   
  yield takeLatest(TaskConstants.UPDATE_NAME_START, updateName); 
 // yield all([updateNameWatcher()]);
}
