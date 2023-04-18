import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from '@redux-saga/core'
import searchReducer from './slices/searchSlice'
import servicesReduser from './slices/servicesSlice'
import saga from './sagas'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: { users: searchReducer, services: servicesReduser },
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(saga)
