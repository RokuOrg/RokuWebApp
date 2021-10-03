import React from "react";
import ReactDOM from "react-dom"
import { DragDropContext} from "react-beautiful-dnd";
import DropList from "./DropList";
import {Col, Row} from "react-grid-system";
import {PrimaryButton} from "@fluentui/react";
import {getGlobalDarkmode} from "../../../Redux/Global/global.selectors";
import {getAuthLoggedIn, getAuthUsername} from "../../../Redux/Authentication/authentication.selectors";
import {connect} from "react-redux";


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {

    const sourceClone = Array.from(source.list);
    const destClone = Array.from(destination.list);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[0] = sourceClone;
    result[1] = destClone;

    return result;
};

class Dashboard extends React.Component{
    constructor(props) {
        super(props);

        this.onDragEnd = this.onDragEnd.bind(this)

        this.state= {

        }

        this.dashboard =
            [{list: [
                    {content: "0", id: "0"},
                    {content: "1", id: "1"},
                    {content: "2", id: "2"},
                    {content: "3", id: "3"},
                    {content: "4", id: "4"},
                    {content: "5", id: "5"},
                    {content: "6", id: "6"}],
                name: "items"},
                {list: [
                        {content: "7", id: "7"},
                        {content: "8", id: "8"},
                        {content: "9", id: "9"},
                    ], name: "items1"},
                {list: [
                        {content: "10", id: "10"},
                        {content: "11", id: "11"},
                        {content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", id: "12"},
                    ], name: "items2"}
            ]
    }

    setListFromName(name, items){
        this.dashboard.map(item =>{
            if(item.name === name)
                item.list = items
            return item
        })
    }

    getListFromName(name){
        let test = []
        this.dashboard.map(item =>{
            if(item.name === name)
                test = item.list
                return item.list
        })
        return test;
    }

    onDragEnd(result) {
        const {source , destination} = result;
        if (!result.destination) {
            return;
        }

        if (source.droppableId === destination.droppableId){
            let list = []
            this.dashboard.map(item =>{
                if(item.name === source.droppableId)
                    list = item.list
                return item
            })

            const items = reorder(
                list,
                result.source.index,
                result.destination.index
            );

            this.setListFromName(source.droppableId, items)
        }else{
            let sourceobj = {}
            this.dashboard.map(item =>{
                if(item.name === source.droppableId)
                    return sourceobj = item
                return item
            })

            let destobj = {}
            this.dashboard.map(item =>{
                if(item.name === destination.droppableId)
                    return destobj = item
                return item
            })

            const result = move(
                sourceobj,
                destobj,
                source,
                destination
            );

            this.setListFromName(sourceobj.name, result[0])
            this.setListFromName(destobj.name, result[1])
        }
        this.setState({})
    }

    render() {
        return (<div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Row lg={6}>
                        {this.dashboard.map(item =>{
                            return<Col lg={2}>
                                <DropList list={item.list} id={item.name} darkmode={this.props.darkmode} />
                            </Col>
                        })}
                        {this.dashboard.length < 6 ? <Col lg={2}> <PrimaryButton> +</PrimaryButton> </Col> : ""}
                    </Row>
                </DragDropContext>
        </div>

        );
    }
}
ReactDOM.render(<Dashboard />, document.getElementById("root"));
const mapStateToProps = (state) => {
    return {darkmode: getGlobalDarkmode(state)}
}
export default connect(mapStateToProps)

(
    Dashboard
)