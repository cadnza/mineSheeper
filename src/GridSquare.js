import React from "react";

class GridSquare extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: false
		};
	}
	shouldComponentUpdate(prevState) {
		return this.state.clicked;
	}
	render() {
		const final = <div>
			<button
				className="mineButton"
				id={this.props.btnId}
				disabled={this.state.clicked}
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
	setInnerText = (text) => {
		const btnRef = document.getElementById(this.props.btnId);
		btnRef.innerText = text;
	};
	reveal = (text) => {
		this.setInnerText(text);
		this.setState({clicked: true});
	};
	cover = () => {
		this.setInnerText(this.props.unclickedText);
		this.setState({clicked: false});
	};
}

export default GridSquare;
