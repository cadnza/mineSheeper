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
			buttonWidth: 0.35,
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
		var final = <div
			id="gameContainer"
			style={{
				width: (this.state.size[1] * this.state.buttonWidth) + this.state.buttonUnit
			}}
		>
			<Minefield
				size={this.state.size}
				nMines={this.state.nMines}
				buttonWidth={this.state.buttonWidth}
				buttonWidthUnit={this.state.buttonUnit}
				buttonWidthFull={this.state.buttonWidth + this.state.buttonUnit}
				wideButtonMultiplier={this.state.wideButtonMultiplier}
				uniqueId={Math.random()}
				difficultyDiv={difficultyDiv}
				nDifficultyButtons={this.state.options.length}
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
