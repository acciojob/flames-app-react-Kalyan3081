import React, { Component } from "react";
import '../styles/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                first: "",
                second: "",
            },
            result: "",
        };
    }

    calculate_relationship = () => {
        const { first, second } = this.state.name;

        if (!first || !second) {
            this.setState({ result: "Please Enter valid input" });
            return;
        }

        // Function to remove common letters
        const removeCommonLetters = (str1, str2) => {
            let arr1 = str1.split('');
            let arr2 = str2.split('');

            arr1.forEach((char) => {
                const index = arr2.indexOf(char);
                if (index > -1) {
                    arr2.splice(index, 1);
                    arr1.splice(arr1.indexOf(char), 1);
                }
            });

            return arr1.concat(arr2).length;
        };

        const remainingLength = removeCommonLetters(first, second);
        const relationship = remainingLength % 6;

        let relationshipStatus = "";
        if (relationship === 1) {
            relationshipStatus = "Friends";
        } else if (relationship === 2) {
            relationshipStatus = "Love";
        } else if (relationship === 3) {
            relationshipStatus = "Affection";
        } else if (relationship === 4) {
            relationshipStatus = "Marriage";
        } else if (relationship === 5) {
            relationshipStatus = "Enemy";
        } else if (relationship === 0) {
            relationshipStatus = "Siblings";
        }

        this.setState({ result: relationshipStatus });
    };

    ClearAll = () => {
        this.setState({ name: { first: "", second: "" }, result: "" });
    };

    render() {
        return (
            <div id="main">
                <input
                    type="text"
                    id="name1"
                    placeholder="Enter first name"
                    data-testid="input1"
                    name="first"
                    value={this.state.name.first}
                    onChange={(e) => this.setState({ name: { ...this.state.name, first: e.target.value } })}
                />
                <input
                    type="text"
                    id="name2"
                    placeholder="Enter second name"
                    data-testid="input2"
                    name="second"
                    value={this.state.name.second}
                    onChange={(e) => this.setState({ name: { ...this.state.name, second: e.target.value } })}
                />
                <button
                    onClick={this.calculate_relationship}
                    data-testid="calculate_relationship"
                >
                    Calculate Relationship Future
                </button>
                <button data-testid="clear" onClick={this.ClearAll}>
                    Clear
                </button>
                {this.state.result && <h3 data-testid="answer">{this.state.result}</h3>}
            </div>
        );
    }
}

export default App;
