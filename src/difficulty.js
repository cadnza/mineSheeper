import React from "react";
import Minefield from "./minefield";

class Difficulty extends React.Component {
	constructor() {
		super();
		this.state = {
			size: [10,10],
			nMines: 15,
			options: [
				["A",[10,10],15],
				["B",[15,15],33],
				["C",[20,20],60],
				["D",[20,30],90]
			],
			buttonWidth: 0.21,
			buttonUnit: "in",
			wideButtonMultiplier: 2
		};
	}
	render() {
		const stdWidth = this.state.buttonWidth + this.state.buttonUnit;
		const stdWidthAdj = (
			this.state.buttonWidth * this.state.wideButtonMultiplier
		) + this.state.buttonUnit;
		var buttons = this.state.options.map(
			x => {
				const final = <div key={x[0]} className="dfButton"
				>
					<button
						onClick={
							() => {this.setState({size: x[1],nMines: x[2]});}
						}
					>
						{x[0]}
					</button>
				</div>;
				return final;
			}
		);
		buttons.push(
			<div key="emoji"><button id="emoji" disabled></button></div>
		);
		var final = <div>
			<div
				id="difficulty"
				style={{
					display: "grid",
					gridTemplateRows: stdWidth,
					gridTemplateColumns: "repeat(4, " + stdWidthAdj + ") " + stdWidth
				}}
			>{buttons}</div>
			<Minefield
				size={this.state.size}
				nMines={this.state.nMines}
				buttonWidthFull={this.state.buttonWidth + this.state.buttonUnit}
			/>
		</div>;
		return final;
	}
}

export default Difficulty;
