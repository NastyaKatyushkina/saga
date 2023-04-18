import { put, spawn, debounce, takeLatest, call } from 'redux-saga/effects'
import { changeSearchField, searchResult } from '../slices/searchSlice'
import { fetchAPI } from '../../utils/fetchAPI'
import {
  getServicesFailure,
  getServicesRequest,
  getServicesSuccess,
  getDetailsRequest,
  getDetailsFailure,
  getDetailsSuccess,
} from '../slices/servicesSlice'

// search

function filterChangeSearchAction(action) {
  return action.type === changeSearchField.type && action.payload.trim() !== ''
}

function* handleChangeSearchSaga(action) {
  yield put(searchResult(action.payload.toLowerCase()))
}

function* watchChangeSearchSaga() {
  yield debounce(100, filterChangeSearchAction, handleChangeSearchSaga)
}

// services

function* handleGetServicesSaga() {
  try {
    const data = yield call(fetchAPI)
    yield put(getServicesSuccess(data))
  } catch (error) {
    yield put(getServicesFailure(error))
  }
}

function* watchGetServicesSaga() {
  yield takeLatest(getServicesRequest, handleGetServicesSaga)
}

// details

function* handleGetDetailsSaga(action) {
  try {
    const data = yield call(fetchAPI, action.payload)
    yield put(getDetailsSuccess(data))
  } catch (error) {
    yield put(getDetailsFailure(error))
  }
}

function* watchGetDetailsSaga() {
  yield takeLatest(getDetailsRequest, handleGetDetailsSaga)
}

export default function* saga() {
  yield spawn(watchChangeSearchSaga)
  yield spawn(watchGetServicesSaga)
  yield spawn(watchGetDetailsSaga)
}
