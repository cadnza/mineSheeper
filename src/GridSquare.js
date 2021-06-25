import React from "react";
import memoize from "memoize-one";

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
				style={{color: "red"}} //TEMP
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
	parseSquareValue = memoize(
		(x) => {
			var final;
			switch(x) {
				case this.props.kMine:
					final = "💥";
					break;
				case this.props.kFlag:
					final = this.sampleFromArray(["🌱","🪴","🌲","🎄","🌳","🌵","🌿","☘️","🍀"]);
					break;
				case this.props.kQuestion:
					final = "🐶";
					break;
				case 0:
					final = this.sampleFromArray(
						[
							Array(3).fill("🐑"),
							"🐏"
						].flat()
					);
					break;
				default:
					final = x;
					break;
			}
			return final;
		}
	);
	sampleFromArray = (arr) => {
		const final = arr[Math.floor(Math.random() * arr.length)];
		return final;
	};
}

export default GridSquare;
