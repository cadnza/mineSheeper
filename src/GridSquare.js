import React from "react";

class GridSquare extends React.Component {
	render() {
		const final = <div>
			<button
				className="mineButton"
				id={"btn" + this.props.idx}
				onClick={this.props.clickHandler}
			/>
		</div>;
		return final;
	}
}

export default GridSquare;
