import React from "react";

class GridSquare extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: false,
			text: this.props.unclickedText
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
				{this.state.text}
			</button>
		</div>;
		return final;
	}
	setInnerText = (x) => {
		this.setState({text: x});
	};
	reveal = (text) => {
		this.setInnerText(text);
		this.setState({clicked: true});
	};
	cover = () => {
		this.setOriginalText();
		this.setState({clicked: false});
	};
	flag = () => {
		this.setInnerText(this.props.kFlag);
	};
	question = () => {
		this.setInnerText(this.props.kQuestion);
	};
	setOriginalText = () => {
		this.setInnerText(this.props.unclickedText);
	};
}

export default GridSquare;
