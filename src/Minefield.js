import React from "react";
import GridSquare from "./GridSquare";

class Minefield extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			started: false,
			victoryStatus: 0, // 0 for undecided, 1 for won, 2 for lost
			arrayHidden: [],
			arrayVisible: [],
			kMine: 9,
			kFlag: 10,
			kQuestion: 11,
			btnClassIdPrefix: "btn",
			resetIsQueued: false,
			gFlag: "🌱",
			gSound: "🔈",
			cBg: "darkgreen",
			cFg: "green",
			cHover: "rgb(41,146,41)",
			colors: {
				0: ["darkgreen","green","rgb(41, 146, 41)"],
				1: ["white","grey","green"], //TEMP
				2: ["brown","red","blue"] //TEMP
			}
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
		//Update colors
		this.setModButtonColor();
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
					kMine={this.state.kMine}
					kFlag={this.state.kFlag}
					kQuestion={this.state.kQuestion}
					clickHandler={() => this.processSquareClick(buttonIdx)}
					rightClickHandler={() => this.processSquareRightClick(buttonIdx)}
					textData={this.state.arrayVisible[buttonIdx]}
					backgroundColor={this.state.cFg}
					borderColor={this.state.cBg}
				/>
			);
		}
		// Set mine buttons into div
		var final = <div
			id="bgForColor"
			style={{
				backgroundColor: this.state.cBg
			}}
		>
			<div id="widthController"
				style={{
					width: (this.props.size[1] * this.props.buttonWidth) + this.props.buttonWidthUnit
				}}
			>
				<div id="displayTitle">Minesheeper</div>
				<div
					id="gameHeader"
					style={{
						gridTemplateColumns: String(
							this.props.nDifficultyButtons * this.props.buttonWidth * this.props.wideButtonMultiplier
						) + this.props.buttonWidthUnit + " 1fr " + this.props.buttonWidthFull,
						width: this.props.buttonWidth * this.props.difficultyOptions[0][1][0] + this.props.buttonWidthUnit
					}}
				>
					{this.props.difficultyDiv}
					<div id="remainingFlags">
						<span id="remainingFlagsSymbol">{this.state.gFlag}</span>
						&nbsp;
						<span id="remainingFlagsCount">{this.countRemainingFlags()}</span>
					</div>
					<div id="victoryStatus">{this.parseVictoryStatus()}</div>
				</div>
				<div
					id="mines"
					style={{
						gridTemplateRows: "repeat(" + this.props.size[0] + ", " + this.props.buttonWidthFull + ")",
						gridTemplateColumns: "repeat(" + this.props.size[1] + ", " + this.props.buttonWidthFull + ")"
					}}
				>
					{mineButtons}
				</div>
				<div
					id="gameFooter"
					style={{
						gridTemplateColumns: "1fr repeat(3, " + this.props.buttonWidth * this.props.wideButtonMultiplier + this.props.buttonWidthUnit + ")",
						width: this.props.buttonWidth * this.props.size[1] + this.props.buttonWidthUnit,
						height: this.props.buttonWidthFull
					}}
				>
					<div></div>
					<div>
						<button
							id="sound"
							onClick={this.props.fToggleSound}
							style={{
								backgroundColor: this.state.cFg,
								borderColor: this.state.cBg
							}}
						>
							<span
								style={{
									opacity: this.props.soundOn ? "100%" : "25%"
								}}
							>
								{this.state.gSound}
							</span>
						</button>
					</div>
					<div>
						<button
							id="help"
							style={{
								backgroundColor: this.state.cFg,
								borderColor: this.state.cBg
							}}
						>
							?
						</button>
					</div>
					<div>
						<a
							href="https://github.com/cadnza/mineSheeper"
							target="_blank"
							rel="noreferrer"
						>
							<button
								style={{
									backgroundColor: this.state.cFg,
									borderColor: this.state.cBg
								}}
							>
								<img id="githubLogo" src="images/GitHub_Logo_White.png" alt="GitHub" />
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>;
		// Return
		return final;
	};
	resetGameProperties = () => {
		// Reset game state parameters
		this.setState({
			started: false,
			victoryStatus: 0,
			cBg: this.state.colors[0][0],
			cFg: this.state.colors[0][1],
			cHover: this.state.colors[0][2],
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
		// Do nothing if game has already been lost or won
		if(this.state.victoryStatus === 1) {
			return;
		}
		if(this.state.victoryStatus === 2) {
			return;
		}
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
		// Reveal all mines and disable further play if revealed is mine
		if(this.state.arrayHidden[idx] === this.state.kMine) {
			var arrVisible = this.state.arrayVisible;
			arrVisible = [...Array(arrVisible.length).keys()].map(i => {
				var final;
				if(this.state.arrayHidden[i] === this.state.kMine) {
					final = this.state.kMine;
				} else {
					final = arrVisible[i];
				}
				return final;
			});
			this.setState({
				victoryStatus: 2,
				cBg: this.state.colors[2][0],
				cFg: this.state.colors[2][1],
				cHover: this.state.colors[2][2],
				arrayVisible: arrVisible
			});
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
			// Get new visible array
			const arrVisible = revealRecursive(idx,this.state.arrayVisible,this.state.arrayHidden);
			// Check for victory
			let isVictory = this.checkForVictory(arrVisible);
			// Update visible array if not yet victory
			if(!isVictory) {
				this.setState({
					arrayVisible: arrVisible,
				});
			}
		}
		// Deselect all text
		this.deselectAll();
		// Return
		return;
	};
	processSquareRightClick = (idx) => {
		// Do nothing if game hasn't started
		if(!this.state.started) {
			return;
		}
		// Do nothing if game has already been lost or won
		if(this.state.victoryStatus === 1) {
			return;
		}
		if(this.state.victoryStatus === 2) {
			return;
		}
		// Copy visible array to new array
		var arrVisible = this.state.arrayVisible;
		// Get new value for temporary storage
		var newVal;
		// Flag if empty
		if(typeof this.state.arrayVisible[idx] === "undefined" && this.countRemainingFlags() > 0) {
			newVal = this.state.kFlag;
		}
		// Change to questioned if flagged
		else if(this.state.arrayVisible[idx] === this.state.kFlag || !this.countRemainingFlags()) {
			newVal = this.state.kQuestion;
		}
		// Empty if questioned
		if(this.state.arrayVisible[idx] === this.state.kQuestion) {
			newVal = undefined;
		}
		// Get new visible array
		arrVisible[idx] = newVal;
		// Check for victory
		let isVictory = this.checkForVictory(arrVisible);
		// Update visible array if not yet victory
		if(!isVictory) {
			this.setState({arrayVisible: arrVisible});
		}
		// Deselect all text
		this.deselectAll();
		// Return
		return;
	};
	// Set method to check for victory
	checkForVictory = (arrVisible) => {
		// Do nothing if game isn't started
		if(!this.state.started) {
			return;
		}
		// Set default victory status to true
		var isVictory = true;
		// Set victory status to false if any mines are unflagged
		for(var i = 0; i < arrVisible.length; i++) {
			if(this.state.arrayHidden[i] === this.state.kMine && arrVisible[i] !== this.state.kFlag) {
				isVictory = false;
				break;
			}
		}
		// Uncover non-mine squares and update victory status if victory
		if(isVictory) {
			const arrVis = Array.from(Array(this.state.arrayHidden.length).keys()).map(
				(i) => {
					if(this.state.arrayHidden[i] !== this.state.kMine) {
						return this.state.arrayHidden[i];
					} else {
						return arrVisible[i];
					}
				}
			);
			this.setState({
				victoryStatus: 1,
				cBg: this.state.colors[1][0],
				cFg: this.state.colors[1][1],
				cHover: this.state.colors[1][2],
				arrayVisible: arrVis
			});
		}
		// Return victory status
		return isVictory;
	};
	// Set method to build grid
	getHiddenGrid = (idxFirstClicked) => {
		// Get grid array length
		const gridLen = this.props.size[0] * this.props.size[1];
		// Get options for mine placement
		var minePlacementOpts = Array.from(Array(gridLen).keys()).filter(x => {return x !== idxFirstClicked;});
		// Shuffle placement options with the Fisher-Yates Algorithm
		for(var i = minePlacementOpts.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * i);
			const temp = minePlacementOpts[i];
			minePlacementOpts[i] = minePlacementOpts[j];
			minePlacementOpts[j] = temp;
		}
		// Take first nMines shuffled placements
		var placements = minePlacementOpts.slice(0,this.props.nMines);
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
	parseVictoryStatus = () => {
		var final;
		switch(this.state.victoryStatus) {
			case 1:
				final = "😀"; //TEMP
				break;
			case 2:
				final = "😕"; //TEMP
				break;
			default:
				final = "🙂"; //TEMP
				break;
		}
		return final;
	};
	deselectAll = () => {
		document.getSelection().removeAllRanges();
	};
	countRemainingFlags = () => {
		let flagsPlaced = this.state.arrayVisible.filter((x) => {return x === this.state.kFlag;}).length;
		let final = this.props.nMines - flagsPlaced;
		return final;
	};
	setModButtonColor = () => {
		let disabled = "button:disabled { background-color: " + this.state.cBg +
			" !important; }";
		let hover = "button:hover { background-color: " + this.state.cHover + " !important}";
		let styleString = [disabled,hover].join(" ");
		document.getElementsByTagName("style")[0].innerText = styleString;
	};
}

export default Minefield;
