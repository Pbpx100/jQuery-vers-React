import React from "react"
import { lazy, Suspense } from "react"
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import './index.css'
import CreateEmployeePage from './pages/CreateEmployeesPage'
import Error from './pages/ErrorPage'
import logoHeader from "./assets/Wealth_Health_logo.jpg"
import ListEmployeePage from "./pages/ListEmployeePage"
import { Provider } from "react-redux"
// import { persistor, store } from "./redux/store"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "./redux/store"
import 'regenerator-runtime/runtime';

const Header = lazy(() => import("./components/Header"))

const arrayNav = [
  { linkNav: "/", titleNav: "Create Employee" },
  { linkNav: "/list", titleNav: "View Current Employees" }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>

      <Router>

        <PersistGate persistor={persistor}>
          <Suspense fallback={<p>Loading...</p>}>
            <Header picture={logoHeader} arrayNav={arrayNav} formatting="header" />
          </Suspense>

          <Routes>
            <Route path='/' element={<CreateEmployeePage />} />
            <Route path="/list" element={<ListEmployeePage />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </PersistGate>
      </Router>
    </Provider>
  </React.StrictMode>
)