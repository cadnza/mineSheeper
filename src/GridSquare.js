import React from "react";

class GridSquare extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: false
		};
	}
	render() {
		const final = <div>
			<button
				className="mineButton"
				id={this.props.btnId}
				onClick={() => {
					this.setState({clicked: true});
					this.props.clickHandler();
				}}
			>
				{this.props.unclickedText}
			</button>
		</div>;
		return final;
	}
	mark = (text) => {
		const btnRef = document.getElementById(this.props.btnId);
		btnRef.disabled = true;
		btnRef.innerText = text;
	};
	cover = () => {
		const btnRef = document.getElementById(this.props.btnId);
		btnRef.innerText = this.props.unclickedText;
		btnRef.disabled = false;
		this.setState({clicked: false});
	};
}

export default GridSquare;
