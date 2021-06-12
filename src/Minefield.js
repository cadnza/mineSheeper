import React from "react";
import GridSquare from "./GridSquare.js";

class Minefield extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			started: false,
			arrayHidden: [],
			arrayVisible: [],
			kMine: 9,
			kFlag: 10,
			kQuestion: 11,
			btnClassIdPrefix: "btn",
			resetIsQueued: false
		};
	}
	getSnapshotBeforeUpdate(prevProps) {
		// Queue game reset if new grid
		if(this.props.uniqueId !== prevProps.uniqueId) {
			this.setState({resetIsQueued: true});
			this.resetGameProperties();
		}
		// Return
		return null;
	}
	shouldComponentUpdate() {
		return true;
	}
	render() {
		const final = this.buildUI();
		return final;
	}
	componentDidUpdate() {
		// Reset game if queued
		if(this.state.resetIsQueued) {
			this.resetGameUi();
			this.setState({resetIsQueued: false});
		}
		// Return
		return null;
	}
	// Set method to build UI
	buildUI = () => {
		// Get grid array length
		const gridLen = this.props.size[0] * this.props.size[1];
		// Open and populate array for mine buttons
		var mineButtons = [];
		for(var i = 0; i < gridLen; i++) {
			const buttonIdx = i;
			const btnId = this.state.btnClassIdPrefix + buttonIdx;
			mineButtons.push(
				<GridSquare
					key={i}
					btnId={btnId}
					kFlag={this.state.kFlag}
					kQuestion={this.state.kQuestion}
					clickHandler={() => this.processSquareClick(buttonIdx)}
					rightClickHandler={() => this.processSquareRightClick(buttonIdx)}
					textData={this.state.arrayVisible[buttonIdx]}
				/>
			);
		}
		// Set mine buttons into div
		var final = <div
			id="mines"
			style={{
				display: "grid",
				gridTemplateRows: "repeat(" + this.props.size[0] + ", " + this.props.buttonWidthFull + ")",
				gridTemplateColumns: "repeat(" + this.props.size[1] + ", " + this.props.buttonWidthFull + ")"
			}}
		>
			{mineButtons}
		</div>;
		// Return
		return final;
	};
	resetGameProperties = () => {
		// Reset game state parameters
		this.setState({
			started: false,
			arrayHidden: [],
			arrayVisible: []
		});
	};
	resetGameUi = () => {
		// Check whether cell reset is necessary
		const gridIsUnclicked = this.state.arrayVisible.length === this.state.arrayVisible.filter(
			x => {return typeof x === 'undefined';}
		).length;
		// Perform cell reset if necessary
		if(!gridIsUnclicked) {
			// Reset individual buttons
			this.setState({arrayVisible: Array(this.props.size[0] * this.props.size[1])});
		}
	};
	processSquareClick = (idx) => {
		// Get method for recursive reveal if revealed value is 0
		const revealRecursive = (idx,arrVisible,arrHidden,exclude = []) => {
			if(arrHidden[idx] === 0) {
				var adjs = this.getAdjSquares(idx);
				exclude.push(idx);
				adjs = adjs.filter(x => {return !exclude.includes(x);});
				adjs.map(x => {return revealRecursive(x,arrVisible,arrHidden,exclude);});
			}
			if(idx < this.props.size[0] * this.props.size[1]) {
				arrVisible[idx] = arrHidden[idx];
			}
			return arrVisible;
		};
		// Do nothing if box is flagged or questioned
		if(
			this.state.arrayVisible[idx] === this.state.kFlag ||
			this.state.arrayVisible[idx] === this.state.kQuestion
		) {
			return;
		}
		// Initialize hidden array and recursively reveal square if game not yet started
		if(!this.state.started) {
			this.setState({started: true});
			const arrHidden = this.getHiddenGrid(idx);
			const arrVisible = revealRecursive(idx,Array(this.props.size[0] * this.props.size[1]),arrHidden);
			this.setState({arrayVisible: arrVisible});
		}
		// Perform normal click otherwise
		else {
			const arrVisible = revealRecursive(idx,this.state.arrayVisible,this.state.arrayHidden);
			this.setState({
				arrayVisible: arrVisible,
			});
		}
		// Return
		return;
	};
	processSquareRightClick = (idx) => {
		// Copy visible array to new array
		var newList = this.state.arrayVisible;
		// Get new value for temporary storage
		var newVal;
		// Flag if empty
		if(typeof this.state.arrayVisible[idx] === "undefined") {
			newVal = this.state.kFlag;
		}
		// Change to questioned if flagged
		else if(this.state.arrayVisible[idx] === this.state.kFlag) {
			newVal = this.state.kQuestion;
		}
		// Empty if questioned
		else if(this.state.arrayVisible[idx] === this.state.kQuestion) {
			newVal = undefined;
		}
		// Update visible array
		newList[idx] = newVal;
		this.setState({arrayVisible: newList});
		// Return
		return;
	};
	// Set method to build grid
	getHiddenGrid = (idxFirstClicked) => {
		// Get grid array length
		const gridLen = this.props.size[0] * this.props.size[1];
		// Get options for mine placement
		var minePlacementOpts = Array.from(Array(gridLen).keys()).filter(x => {return x !== idxFirstClicked;});
		// Sample placement options
		var placements = [];
		for(var i = 0; i < this.props.nMines; i++) {
			const nextMine = minePlacementOpts[
				Math.floor(Math.random() * minePlacementOpts.length)
			];
			minePlacementOpts = minePlacementOpts.filter(x => {return x !== nextMine;});
			placements.push(nextMine);
		}
		placements = placements.sort((a,b) => {return a - b;});
		// Open array representing hidden grid
		var arrHidden = Array(gridLen);
		// Add mines to hidden array
		for(i = 0; i < placements.length; i++) {
			arrHidden[placements[i]] = this.state.kMine;
		}
		// Add counts to non-mine fields in hidden array
		for(i = 0; i < arrHidden.length; i++) {
			if(typeof arrHidden[i] === "undefined") {
				const adjs = this.getAdjSquares(i);
				const adjVals = adjs.map(x => {return arrHidden[x];});
				const ctMines = adjVals.filter(x => {return x === this.state.kMine;}).length;
				arrHidden[i] = ctMines;
			}
		}
		// Frame hidden array
		this.setState({arrayHidden: arrHidden});
		// Return
		return arrHidden;
	};
	// Set method to get adjacent mines from index
	getAdjSquares = (idxRaw) => {
		// Open array for adjacent squares
		var final = [];
		// Convert to a 1 basis for simplicity
		const idx = idxRaw + 1;
		// Check edge orientation
		const isUpper = idx <= this.props.size[1];
		const isRight = idx % this.props.size[1] === 0;
		const isLower = idx > (this.props.size[0] - 1) * this.props.size[1];
		const isLeftt = idx % this.props.size[1] === 1;
		// Get upper left
		if(!isUpper && !isLeftt) {
			final.push(idx - this.props.size[1] - 1);
		}
		// Get upper
		if(!isUpper) {
			final.push(idx - this.props.size[1]);
		}
		// Get upper right
		if(!isUpper && !isRight) {
			final.push(idx - this.props.size[1] + 1);
		}
		// Get left
		if(!isLeftt) {
			final.push(idx - 1);
		}
		// Get right
		if(!isRight) {
			final.push(idx + 1);
		}
		// Get lower left
		if(!isLower && !isLeftt) {
			final.push(idx + this.props.size[1] - 1);
		}
		// Get lower
		if(!isLower) {
			final.push(idx + this.props.size[1]);
		}
		// Get lower right
		if(!isLower && !isRight) {
			final.push(idx + this.props.size[1] + 1);
		}
		// Convert back to 0 basis
		final = final.map(x => {return x - 1;});
		// Return
		return final;
	};
}

export default Minefield;
