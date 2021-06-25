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
				style={{color: this.getTextColor(this.props.textData)}}
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
			if(typeof x === "undefined") {
				return "";
			}
			var final;
			switch(x) {
				case this.props.kMine:
					final = <div>💥</div>;
					break;
				case this.props.kFlag:
					final = <div>{this.sampleFromArray(["🌱","🪴","🌲","🎄","🌳","🌵","🌿","☘️","🍀"])}</div>;
					break;
				case this.props.kQuestion:
					final = <div>🐶</div>;
					break;
				case 0:
					final = <div>{this.getSheep()}</div>;
					break;
				default:
					final = <div>{x}</div>;
					break;
			}
			return final;
		}
	);
	sampleFromArray = (arr) => {
		const final = arr[Math.floor(Math.random() * arr.length)];
		return final;
	};
	getSheep = () => {
		let final = this.sampleFromArray(
			[
				Array(3).fill("🐑"),
				"🐏"
			].flat()
		);
		return final;
	};
	getTextColor = (x) => {
		switch(x) {
			case 1:
				return "blue";
			case 2:
				return "green";
			case 3:
				return "red";
			case 4:
				return "darkblue";
			case 5:
				return "darkred";
			case 6:
				return "darkturquoise";
			case 7:
				return "black";
			case 8:
				return "darkgrey";
			default:
				return "inherit";
		}
	};
}

export default GridSquare;
