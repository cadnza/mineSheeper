import React from "react";
import ReactDOM from "react-dom";

class Difficulty extends React.Component {
	constructor() {
		super();
		this.state = {
			size: [10,10],
			options: [
				["A",[10,10]],
				["B",[16,16]],
				["C",[24,30]]
			]
		};
	}
	render() {
		return this.buildNewGameRow();
	}
	buildNewGameRow = () => {
		const buttons = this.state.options.map(
			(x) => {
				const final = <div class="dfButton">
					<button
						key={x[0]}
						onClick={() => {this.setState({size: x[1]});}}
					>
						{x[0]}
					</button>
				</div>;
				return final;
			}
		);
		var final = <div id="dfButtonHolder">{buttons}</div>;
		return final;
	};
}

ReactDOM.render(<Difficulty />,document.getElementById("difficulty"));
