import React from "react";


class Minefield extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			started: false,
			kMine: 9,
			kFlag: 10,
			kQuestion: 11
		};
	}
	render() {
		const final = this.buildUI();
		return final;
	}
	// Set method to build UI
	buildUI = () => {
		const gridLen = this.props.size[0] * this.props.size[1];
		var mineButtons = [];
		for(var i = 0; i < gridLen; i++) {
			const clickArg = i;
			mineButtons.push(
				<div key={i}>
					<button
						className="mineButton"
						id={"btn" + i}
						onClick={() => this.processClick(clickArg)}
					/>
				</div>
			);
		}
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
		return final;
	};
	processClick = (idx) => {
		if(!this.state.started) {
			this.setState({started: true});
			this.getHiddenGrid(idx);
		}
		const btnFocus = document.getElementById("btn" + idx);
		const revealedVal = this.state.hiddenArray[idx]; // This is causing trouble because we're setting this.state.hiddenArray in this.getHiddenGrid. //TEMP
		btnFocus.disabled = true;
		btnFocus.innerText = revealedVal;
		btnFocus.innerText = "x";
	};
	// Set method to build grid
	getHiddenGrid = (idxFirstClicked) => {
		// Get grid array length
		const gridLen = this.props.size[0] * this.props.size[1];
		// Get options for mine placement
		var minePlacementOpts = Array.from(Array(gridLen).keys()).filter((x) => {return x !== idxFirstClicked;});
		// Sample placement options
		var placements = [];
		for(var i = 0; i < this.props.nMines; i++) {
			const nextMine = minePlacementOpts[
				Math.floor(Math.random() * minePlacementOpts.length)
			];
			minePlacementOpts = minePlacementOpts.filter((x) => {return x !== nextMine;});
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
				const ctMines = this.getAdjSquares(i).filter((x) => {return x === this.kMine;}).length;
				arrHidden[i] = ctMines;
			}
		}
		// Frame hidden array
		this.setState({hiddenArray: arrHidden});
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
			final.push(idx - this.props.size[0] - 1);
		}
		// Get upper
		if(!isUpper) {
			final.push(idx - this.props.size[0]);
		}
		// Get upper right
		if(!isUpper && !isRight) {
			final.push(idx - this.props.size[0] + 1);
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
			final.push(idx + this.props.size[0] - 1);
		}
		// Get lower
		if(!isLower) {
			final.push(idx + this.props.size[0]);
		}
		// Get lower right
		if(!isLower && !isRight) {
			final.push(idx + this.props.size[0] + 1);
		}
		// Convert back to 0 basis
		final = final.map((x) => {return x - 1;});
		// Return
		return final;
	};
}

export default Minefield;
