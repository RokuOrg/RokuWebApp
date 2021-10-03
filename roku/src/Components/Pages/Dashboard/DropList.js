import {Droppable} from "react-beautiful-dnd";
import React from "react";
import {DragItem} from "./DragItem";
import {CommandBarButton} from "@fluentui/react";


function DropList(props){

    const grid = 8;

    const getListStyle = isDraggingOver => (props.darkmode ?{
        background: isDraggingOver ? "#696969" : "#151515",
        padding: "5px",
        width: "100%",
        alignContent: "center",
        alignItems: "center",
        borderRadius: "5px"
    }: {background: isDraggingOver ? "#696969" : "#afadad",
        padding: "5px",
        width: "100%",
        alignContent: "center",
        alignItems: "center",
        borderRadius: "5px"});

    return<div>
        <Droppable droppableId={props.id}>
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                >
                    {props.list.map((item, index) => (
                        <DragItem item={item} index={index} grid={grid} darkmode={props.darkmode}/>
                    ))}
                    {provided.placeholder}
                    <CommandBarButton style={{background: "transparent", border: "1px solid grey", borderRadius: "3px", minHeight: "30px", minWidth: "80px"}}>+</CommandBarButton>
                </div>
            )}
        </Droppable>
    </div>

}
export default DropList