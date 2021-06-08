import React from "react";
import ReactDOM from "react-dom";

class Board extends React.Component {
	constructor() {
		super();
		this.state = {
			size: [10,10],
			options: {
				Easy: [10,10],
				Medium: [16,16],
				Hard: [24,30]
			}
		};
	}
	render() {
		oranges = {hello};
		this.buildNewGameRow();
		return <div>Oranges</div>;
	}
	buildNewGameRow = () => {
		var labels = this.state.options;
		console.log(labels); //TEMP
		console.log(2); //TEMP
		for(var l; l < labels.length; l++) {
			console.log(l);
		}
	};
}

ReactDOM.render(<Board />,document.getElementById("board"));
