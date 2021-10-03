import {getGlobalApi, getGlobalDarkmode} from "../../../Redux/Global/global.selectors";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import React, {useState} from "react";
import {CommandBarButton, PrimaryButton, TextField} from "@fluentui/react";
import {setLoggedIn, setToken, setUsername} from "../../../Redux/Authentication/authentication.actions";


function Register(props){


    const history = useHistory()
    const [username, setUsernameState] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')

    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmpasswordError, setConfirmpasswordError] = useState('')

    const Login = () =>{
        history.push("/login")
    }

    const setRegisterError = (error) =>{
        if (error === "email already in use"){
            setEmailError(error)
        }else if (error === "username already in use"){
            setUsernameError(error)
        }
    }

    const register = () =>{
        console.log(username, email,password, confirmpassword)

        if(password !== confirmpassword){
            setConfirmpasswordError("passwords don't match")
            setPasswordError(" ")
            return
        }
        props.api.post("/api/user/register", {
            name:  username,
            email: email,
            password: password
        }).then(res =>{
            if(res.data.succes){
                console.log(res)
                localStorage.setItem("token", res.data.object.token)
                props.dispatch(setLoggedIn(res.data.succes))
                props.dispatch(setToken(res.data.object.token))
                props.dispatch(setUsername(res.data.object.username))

                history.push("/")

                return
            }
            setRegisterError(res.data.object.error)
        })

    }

    const handleUsername= (e, value) =>{
        setUsernameState(value)
        setUsernameError("")
    }

    const handleEmail= (e, value) =>{
        setEmail(value)
        setEmailError("")
    }

    const handlePassword= (e, value) =>{
        setPassword(value)
        setPasswordError("")
        setConfirmpasswordError("")
    }

    const handleConfirmpassword= (e, value) =>{
        setConfirmpassword(value)
        setPasswordError("")
        setConfirmpasswordError("")
    }

    let classname = "textfield-light";
    if(props.darkmode){
        classname = "textfield-dark"
    }
    return<div className={"center-page"}>
        <div className={"center-item"} style={{width: "23%"}}>
            <TextField placeholder="Username" style={{textAlign: "center"}} onChange={handleUsername} errorMessage={usernameError}/><br/>
            <TextField placeholder="Email" style={{textAlign: "center"}} onChange={handleEmail} errorMessage={emailError}/><br/>
            <TextField placeholder="Password" type={"password"} style={{textAlign: "center"}} onChange={handlePassword} errorMessage={passwordError}/><br/>
            <TextField placeholder="Confirm Password" type={"password"} className={classname} style={{textAlign: "center"}} onChange={handleConfirmpassword} errorMessage={confirmpasswordError} />

            <PrimaryButton style={{width: "100%", marginTop: "10px", marginBottom: "5px"}} onClick={() => register()}> Register</PrimaryButton>
            <CommandBarButton text="Already have an account" onClick={ () =>Login()}/>

        </div>
    </div>

}
const mapStateToProps = (state) => {
    return {darkmode: getGlobalDarkmode(state), api: getGlobalApi(state) }
}

export default connect(mapStateToProps)
(
    Register
)