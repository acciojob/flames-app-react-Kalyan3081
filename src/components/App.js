import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name1: "",
            name2: "",
            result: "",
        };
    }

    calculateRelationship = () => {
        const { name1, name2 } = this.state;

        if (!name1.trim() || !name2.trim()) {
            this.setState({ result: "Please Enter valid input" });
            return;
        }

        // Function to remove common letters
        const removeCommonLetters = (str1, str2) => {
            let arr1 = str1.split('');
            let arr2 = str2.split('');

            for (let char of arr1) {
                const index = arr2.indexOf(char);
                if (index > -1) {
                    arr2.splice(index, 1);
                    arr1.splice(arr1.indexOf(char), 1);
                }
            }

            return arr1.length + arr2.length;
        };

        const remainingLength = removeCommonLetters(name1, name2);
        const relationship = remainingLength % 6;

        // Determine relationship status
        const relationshipMap = {
            1: "Friends",
            2: "Love",
            3: "Affection",
            4: "Marriage",
            5: "Enemy",
            0: "Siblings",
        };

        this.setState({ result: relationshipMap[relationship] });
    };

    clearAll = () => {
        this.setState({ name1: "", name2: "", result: "" });
    };

    render() {
        return (
            <div id="main">
                <input
                    type="text"
                    placeholder="Enter First Name"
                    data-testid="input1"
                    value={this.state.name1}
                    onChange={(e) => this.setState({ name1: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Enter Second Name"
                    data-testid="input2"
                    value={this.state.name2}
                    onChange={(e) => this.setState({ name2: e.target.value })}
                />
                <button
                    onClick={this.calculateRelationship}
                    data-testid="calculate_relationship"
                >
                    Calculate Relationship Future
                </button>
                <button
                    onClick={this.clearAll}
                    data-testid="clear"
                >
                    Clear
                </button>
                {this.state.result && <h3 data-testid="answer">{this.state.result}</h3>}
            </div>
        );
    }
}

export default App;
