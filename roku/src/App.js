import './App.css';
import {PrimaryButton} from "@fluentui/react";
import {LightTheme, darkTheme} from "./themes";
import {ThemeProvider} from '@fluentui/react'
import {useEffect} from "react";
import Header from "./Components/Shared/Header/Header";
import {Route} from "react-router";
import {getGlobalDarkmode} from "./Redux/Global/global.selectors";
import {connect} from "react-redux";
import Footer from "./Components/Shared/Footer/Footer";
import Login from "./Components/Pages/Login/Login";
import Register from "./Components/Pages/Register/Register";
import {setApi, setDarkmode} from "./Redux/Global/global.actions";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import {getAuthLoggedIn, getAuthToken} from "./Redux/Authentication/authentication.selectors";
import {setLoggedIn, setToken, setUsername} from "./Redux/Authentication/authentication.actions";
import Profile from "./Components/Pages/Profile/Profile";

const axios = require('axios')
const api = axios.create({
    baseURL: 'http://localhost:7003/',
    timeout: 10000
})



function App(props) {
    useEffect( () =>{
        props.dispatch(setApi(api))
        let Token = localStorage.getItem("token")

        if(Token !== null){
            api.get("api/user/verify",{headers: {"X-JWT-Token": Token}})
                .then(res =>{
                    console.log(res)
                    if(res.data.succes){
                        props.dispatch(setToken(Token))
                        props.dispatch(setUsername(res.data.object.username))
                        props.dispatch(setLoggedIn(true))
                    }
                    localStorage.removeItem("token")

                })
        }

        let Darkmode = localStorage.getItem("dark")

        if(Darkmode !== null){
            props.dispatch(setDarkmode(Darkmode === "1"))
        }
    },[])

  return (
      <ThemeProvider applyTo={"body"} className={"themeprovider"} theme={props.darkmode ? darkTheme : LightTheme}>
          <Header />
              <Route path={"/projects"}>
                  <h1> projects</h1>
              </Route>
              <Route path={"/dashboard"}>
                  <Dashboard />
              </Route>
              <Route path={"/profile"}>
                  <Profile />
              </Route>
              <Route path={"/calendar"}>
                  <h1> calendar</h1>
              </Route>
              <Route path={"/login"}>
                  <Login/>
              </Route>
              <Route path={"/register"}>
                  <Register/>
              </Route>
              <Route path={"/"} exact>
                  <PrimaryButton> gaming</PrimaryButton>
              </Route>
          <Footer/>
      </ThemeProvider>

  );
}

const mapStateToProps = (state) => {
    return {darkmode: getGlobalDarkmode(state), token: getAuthToken(state),loggedIn: getAuthLoggedIn(state) }
}

export default connect(mapStateToProps)

(
    App
)