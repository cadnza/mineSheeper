import React from "react";

class GridSquare extends React.Component {
	render() {
		const final = <div>
			<button
				className="mineButton"
				id={this.props.btnId}
				disabled={this.checkWhetherToDisable()}
				onClick={this.props.clickHandler}
				onContextMenu={
					(event) => {
						event.preventDefault();
						this.props.rightClickHandler();
						return false;
					}
				}
			>
				{this.parseSquareValue(this.props.textData)}
			</button>
		</div>;
		return final;
	}
	checkWhetherToDisable = () => {
		const txt = this.props.textData;
		const isFlagged = txt === this.props.kFlag;
		const isQuestioned = txt === this.props.kQuestion;
		const isUntouched = typeof txt === "undefined";
		const shouldDisable = !isFlagged && !isQuestioned && !isUntouched;
		return shouldDisable;
	};
	parseSquareValue(x) {
		var final;
		switch(x) {
			case this.props.kMine:
				final = "💥"; //TEMP
				break;
			case this.props.kFlag:
				final = "🌵"; //TEMP
				break;
			case this.props.kQuestion:
				final = "🐶"; //TEMP
				break;
			default:
				final = x; //TEMP
				break;
		}
		return final;
	}
}

export default GridSquare;
