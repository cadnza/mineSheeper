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
				style={{
					color: this.getTextColor(this.props.textData),
					backgroundColor: this.props.backgroundColor,
					borderColor: this.props.borderColor
				}}
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
					final = <div>{this.props.fSampleFromArray(["🌱","🌲","🎄","🌳","🌵","🌿","☘️","🍀"])}</div>;
					break;
				case this.props.kQuestion:
					final = <div>🐶</div>;
					break;
				case 0:
					final = <div className={this.randomMirror()}>{this.getSheep()}</div>;
					break;
				default:
					final = <div>
						<div className={"back" + this.randomMirror()}>{this.getSheep()}</div>
						<div className="front">{x}</div>
					</div>;
					break;
			}
			return final;
		}
	);
	getSheep = () => {
		let final = this.props.fSampleFromArray(
			[
				Array(3).fill("🐑"),
				"🐏"
			].flat()
		);
		return final;
	};
	randomMirror = () => {
		let final = this.props.fSampleFromArray([" mirrored",""]);
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
