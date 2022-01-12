import React from 'react'

class NamshiInterviewApplication extends React.Component {
    state = {
        board: Array(4).fill("").map(row => new Array(4).fill("")),
        selectedBox:[]
    }
    selectedBox = async (boxRowIndex, boxColoumnIndex, event) => {
        let selectionValue = this.state.board;
        if(selectionValue[boxRowIndex][boxColoumnIndex] == ""){
            let selectedBoxCount = await this.calculateCount();
            selectionValue[boxRowIndex][boxColoumnIndex] = "Box " + selectedBoxCount;
            await this.setSelecteBox("Box " + selectedBoxCount)
            this.setState({ board: selectionValue })
        }
    }
    async calculateCount() {
        let count = 1;
        this.state.board.map(items => {
            items.map(subItems => {
                if (subItems != "")
                    count++;
            })
        })
        return count;
    }
    async setSelecteBox(BoxValue){
        let boxArray = this.state.selectedBox;
        if(boxArray.length == 2){
            boxArray.shift();
        }
        boxArray.push(BoxValue)
        this.setState({selectedBox:boxArray})
    }
    render() {
        return (
            <div>
                {this.state.board.map((items, index) => {
                    return (
                        <div className="Row" key={index}>
                            {items.map((subItem, subIndex) => {
                                return (
                                    <div className={this.state.selectedBox.includes(subItem)?'Column Red':'Column'} onClick={this.selectedBox.bind(this, index, subIndex)} key={subIndex}>
                                        {subItem} 
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default NamshiInterviewApplication;
