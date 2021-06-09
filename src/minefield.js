import React from "react";

class Minefield extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			kMine: 9,
			kFlag: 10,
			kQuestion: 11
		};
	}
	render() {
		this.buildGrid();
		return <div>{this.props.size}</div>;
	}
	// Set method to build grid
	buildGrid = () => {
		// Get grid array length
		const gridLen = this.props.size[0] * this.props.size[1];
		// Get options for mine placement
		var minePlacementOpts = Array.from(Array(gridLen).keys());
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
		for(var i = 0; i < placements.length; i++) {
			arrHidden[placements[i]] = this.state.kMine;
		}
	};
	// Set method to count adjacent mines based on array
	ctAdjMines = (idx,arr) => {
	};
}

export default Minefield;
