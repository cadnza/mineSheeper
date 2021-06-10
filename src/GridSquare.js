import React from "react";

class GridSquare extends React.Component {
	render() {
		const final = <div>
			<button
				className="mineButton"
				id={this.props.btnId}
				onClick={() => {
					this.props.clickHandler();
				}}
			>
				{this.props.unclickedText}
			</button>
		</div>;
		return final;
	}
	reset() {
		const btnRef = document.getElementById(this.props.btnId);
		btnRef.innerText = this.props.unclickedText;
		btnRef.disabled = false;
	}
}

export default GridSquare;
