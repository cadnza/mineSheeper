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
		// Frame hidden array
		this.setState({hiddenArray: arrHidden});
	};
	// Set method to count adjacent mines based on array
	ctAdjMines = (idx,arr) => {
	};
}

export default Minefield;
