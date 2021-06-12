import React from "react";
import Minefield from "./Minefield";

class Controller extends React.Component {
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
		const difficultyButtons = this.state.options.map(
			x => {
				const final = <div key={x[0]} className="dfButton"
				>
					<button
						onClick={
							() => {this.changeDifficulty(x);}
						}
					>
						{x[0]}
					</button>
				</div>;
				return final;
			}
		);
		const difficultyDiv = <div
			id="difficulty"
			style={{
				gridTemplateRows: stdWidth,
				gridTemplateColumns: "repeat(" + this.state.options.length + ", " + stdWidthAdj + ")"
			}}
		>
			{difficultyButtons}
		</div>;
		const statusDiv = <div id="statusIndicator" />;
		var final = <div id="gameContainer">
			<div id="gameHeader">
				{difficultyDiv}
				{statusDiv}
			</div>
			<Minefield
				size={this.state.size}
				nMines={this.state.nMines}
				buttonWidthFull={this.state.buttonWidth + this.state.buttonUnit}
				uniqueId={Math.random()}
			/>
		</div>;
		return final;
	}
	changeDifficulty = (targetDifficulty) => {
		this.setState({
			size: targetDifficulty[1],
			nMines: targetDifficulty[2]
		});
	};
}

export default Controller;
