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
					const successfulClick = this.props.clickHandler();
					this.setState({clicked: successfulClick});
				}}
				onContextMenu={(event) => {
					event.preventDefault();
					this.props.rightClickHandler();
					return false;
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
		this.setEmpty();
		this.setState({clicked: false});
	};
	flag = () => {
		this.setInnerText(this.props.kFlag);
	};
	question = () => {
		this.setInnerText(this.props.kQuestion);
	};
	setEmpty = () => {
		this.setInnerText(this.props.unclickedText);
	};
}

export default GridSquare;
