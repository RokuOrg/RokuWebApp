import {Draggable} from "react-beautiful-dnd";
import React from "react";
import {getGlobalDarkmode} from "../../../Redux/Global/global.selectors";
import {connect} from "react-redux";

export function DragItem(props) {

    let getItemStyle = (isDragging, draggableStyle, darkmode) => (
        darkmode ?{
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        minHeight: "50px",
        margin: "auto",
        marginBottom: "2px",
        width: "99%",
        borderRadius: "5px",
        overflowWrap: "break-word",
        // change background colour if dragging
        background: isDragging ? '#585858' : "#373737",

        // styles we need to apply on draggables
        ...draggableStyle
    } : {userSelect: "none",
            minHeight: "50px",
            margin: "auto",
            marginBottom: "2px",
            width: "99%",
            borderRadius: "5px",
            overflowWrap: "break-word",
            // change background colour if dragging
            background: isDragging ? '#585858' : "#828282",

            // styles we need to apply on draggables
            ...draggableStyle});

    return <div>
        <Draggable key={props.item.id} draggableId={props.item.id} index={props.index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        props.darkmode
                    )}
                >
                    <div style={{marginLeft: "10px"}}>{props.item.content}</div>

                </div>
            )}
        </Draggable>
    </div>
}
export default DragItem
