import React, {useState} from "react";
import {CommandBarButton, Link, PrimaryButton, TextField} from "@fluentui/react";
import {getGlobalDarkmode, getGlobalApi} from "../../../Redux/Global/global.selectors";
import {connect} from "react-redux";
import "./Login.css"
import {useHistory} from "react-router-dom";
import {setLoggedIn, setToken, setUsername} from "../../../Redux/Authentication/authentication.actions";

function Login(props){

    const history = useHistory()
    const [username, setUsernameState] = useState('')
    const [password, setPassword] = useState('')

    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const CreateAccount = () =>{
        history.push("/register")
    }

    const SetLoginError = (error) =>{
        if(error === "incorrect password"){
            setPasswordError(error)
        }
        else if (error === "invalid username or email"){
            setUsernameError(error)
        }
    }

    const Login = () =>{
        props.api.post("/api/user/login",{
            name: username,
            password: password
        }).then(res => {
            if(res.data.succes){
                localStorage.setItem("token", res.data.object.token)
                props.dispatch(setLoggedIn(res.data.succes))
                props.dispatch(setToken(res.data.object.token))
                props.dispatch(setUsername(res.data.object.username))

                history.push("/")

                return
            }
            SetLoginError(res.data.object.error)
            }
        )
    }

    const handleUsername= (e, value) =>{
        setUsernameState(value)
        setUsernameError("")
    }

    const handlePassword= (e, value) =>{
        setPassword(value)
        setPasswordError("")
    }

    let classname = "textfield-light";
    if(props.darkmode){
        classname = "textfield-dark"
    }
    return<div className={"center-page"} >
        <div className={"center-item"} style={{width: "23%"}}>
            <TextField placeholder="Username" style={{textAlign: "center"}} onChange={handleUsername} errorMessage={usernameError}/><br/>
            <TextField placeholder="Password" type={"password"} className={classname} style={{textAlign: "center"}} onChange={handlePassword} errorMessage={passwordError} />

            <div style={{textAlign: "right", fontSize: "10px"}}>
                <Link to={"/"}>i forgor 💀</Link>
            </div>

            <PrimaryButton style={{width: "100%", marginTop: "10px", marginBottom: "5px"}} onClick={() => Login()}> Login</PrimaryButton>
            <CommandBarButton text="Create Account" onClick={ () =>CreateAccount()}/>

        </div>
    </div>

}
const mapStateToProps = (state) => {
    return {darkmode: getGlobalDarkmode(state), api:getGlobalApi(state) }
}

export default connect(mapStateToProps)
(
    Login
)