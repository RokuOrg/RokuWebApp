import React from "react";
import {Link} from "react-router-dom";

class Logo extends React.Component{

    render() {
        return <div className={"Logo center"}>
            <Link to={"/"} >
                <img src={"RokuLogo.png"} className={"center"}style={{height: "30px"}} alt={"logo"} />
            </Link>
        </div>;
    }
}
export default Logo;