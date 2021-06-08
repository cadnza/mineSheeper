import React from "react";

class Minefield extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			size: props.size
		};
	}
}

export default Minefield;
