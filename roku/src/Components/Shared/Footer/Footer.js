import React from "react";
import {Separator} from "@fluentui/react";

class Footer extends React.Component{
    render(){
        return<div className={"footer"}>
            <Separator className={"divider"} />
            <span style={{"fontSize": "15px"}}>
                Footer
            </span>
        </div>
    }
}
export default Footer