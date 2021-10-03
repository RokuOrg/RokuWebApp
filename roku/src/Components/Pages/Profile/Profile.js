import {PrimaryButton} from "@fluentui/react";



function Profile(props){
    const RemoveToken = () =>{
        localStorage.removeItem("token")
    }

    return<div>
        <PrimaryButton onClick={RemoveToken}> Token </PrimaryButton>
    </div>
}
export default Profile