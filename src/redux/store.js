import { configureStore } from '@reduxjs/toolkit'
import { employeeReducer } from './employee.js'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, REGISTER, PERSIST, PURGE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

/**
 *  The store is saved in storage variable that represent localStorage
 */
const persistConfig = {
    key: 'root',
    storage,
}

/**
 * We make the reducer persistent with the config
 */
const persistedReducer = persistReducer(persistConfig, employeeReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, REGISTER, PERSIST, PURGE],
            },
        }),

})

export const persistor = persistStore(store)

