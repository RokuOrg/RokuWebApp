import * as React from 'react';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import {Separator} from "@fluentui/react";
import Logo from "./Logo";
import {getGlobalDarkmode} from "../../../Redux/Global/global.selectors";
import {connect} from "react-redux";
import {setDarkmode} from "../../../Redux/Global/global.actions";
import {useHistory} from "react-router-dom";
import {getAuthLoggedIn, getAuthUsername} from "../../../Redux/Authentication/authentication.selectors";

function Header(props){

    const history = useHistory()
    const ChangeDarkmode = () =>{
        props.dispatch(setDarkmode(!props.darkmode))
        localStorage.setItem("dark", (props.darkmode) ? "0" : "1")
}
    const items = [
        {
            key: 'Roku',
            onRender: () => <Logo/>
        },
        {
            key: 'Projects',
            text: 'Projects',
            iconProps: { iconName: 'ProjectCollection' },
            onClick: () => history.push("/projects"),
        },
        {
            key: 'Dashboard',
            text: 'Dashboard',
            iconProps: { iconName: 'BIDashboard' },
            onClick: () => history.push("/dashboard")
        },
        {
            key: 'Calendar',
            text: 'Calendar',
            iconProps: { iconName: 'Calendar' },
            onClick: () => history.push("/calendar"),
        },
    ];

    const overflowItems = [
        { key: 'move', text: 'Move to...', onClick: () => console.log('Move to'), iconProps: { iconName: 'MoveToFolder' } },
        { key: 'copy', text: 'Copy to...', onClick: () => console.log('Copy to'), iconProps: { iconName: 'Copy' } },
        { key: 'rename', text: 'Rename...', onClick: () => console.log('Rename'), iconProps: { iconName: 'Edit' } },
    ]

    let farItems = [
        {
            key: 'tile',
            ariaLabel: 'Grid view',
            iconProps: { iconName: 'Contrast' },
            onClick: () => ChangeDarkmode(),

        },
        {
            key: 'login',
            text: 'Login',
            onClick: () => history.push("/login")
        },
        {
            key: 'Register',
            text: 'Register',
            // This needs an ariaLabel since it's icon-only
            onClick: () => history.push("/register")
        },
    ]
    if(props.loggedIn){
        farItems = [
            {
                key: 'tile',
                ariaLabel: 'Grid view',
                iconProps: { iconName: 'Contrast' },
                onClick: () => ChangeDarkmode(),

            },
            {
                key: 'Profile',
                text: props.username,
                // This needs an ariaLabel since it's icon-only
                iconProps: { iconName: 'Contact' },
                onClick: () => history.push("/profile")
            }
        ]
    }

    initializeIcons()

        return <div>
            <CommandBar
                items={items}
                farItems={farItems}
                overflowItems={overflowItems}
            />
            <Separator  className={"divider"}/>
        </div>

}
const mapStateToProps = (state) => {
    return {darkmode: getGlobalDarkmode(state), loggedIn: getAuthLoggedIn(state), username: getAuthUsername(state) }
}

export default connect(mapStateToProps)

(
    Header
)