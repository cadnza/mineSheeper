import React from "react";

class GridSquare extends React.Component {
	render() {
		const final = <div>
			<button
				className="mineButton"
				id={"btn" + this.props.idx}
				onClick={() => this.processClick(this.props.idx)}
			/>
		</div>;
		return final;
	}
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
}

export default GridSquare;
