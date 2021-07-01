import React from "react";
import Minefield from "./Minefield";

class Controller extends React.Component {
	constructor() {
		super();
		this.state = {
			size: [10,10],
			nMines: 15,
			options: [
				["🥉",[10,10],15],
				["🥈",[15,15],33],
				["🥇",[20,20],60],
				["🏆",[20,30],90]
			],
			soundOn: true,
			buttonWidth: 0.35,
			buttonUnit: "in",
			wideButtonMultiplier: 1.5
		};
	}
	render() {
		var final = <div
			id="gameContainer"
		>
			<Minefield
				size={this.state.size}
				nMines={this.state.nMines}
				buttonWidth={this.state.buttonWidth}
				buttonWidthUnit={this.state.buttonUnit}
				buttonWidthFull={this.state.buttonWidth + this.state.buttonUnit}
				wideButtonMultiplier={this.state.wideButtonMultiplier}
				uniqueId={Math.random()}
				difficultyDivBuilder={this.buildDifficultyDiv}
				difficultyOptions={this.state.options}
				nDifficultyButtons={this.state.options.length}
				soundOn={this.state.soundOn}
				fToggleSound={this.toggleSound}
			/>
		</div>;
		return final;
	}
	buildDifficultyDiv = (bg,fg) => {
		const stdWidth = this.state.buttonWidth + this.state.buttonUnit;
		const stdWidthAdj = (
			this.state.buttonWidth * this.state.wideButtonMultiplier
		) + this.state.buttonUnit;
		const difficultyButtons = this.state.options.map(
			x => {
				const final = <div key={x[0]} className="dfButton"
				>
					<button
						className="difficultyButton"
						onClick={
							() => {this.changeDifficulty(x);}
						}
						style={{
							backgroundColor: fg,
							borderColor: bg
						}}
					>
						{x[0]}
					</button>
				</div>;
				return final;
			}
		);
		const final = <div
			id="difficulty"
			style={{
				gridTemplateRows: stdWidth,
				gridTemplateColumns: "repeat(" + this.state.options.length + ", " + stdWidthAdj + ")"
			}}
		>
			{difficultyButtons}
		</div>;
		return final;
	};
	changeDifficulty = (targetDifficulty) => {
		this.setState({
			size: targetDifficulty[1],
			nMines: targetDifficulty[2]
		});
	};
	toggleSound = () => {
		this.setState({
			soundOn: !this.state.soundOn
		});
	};
}

export default Controller;
