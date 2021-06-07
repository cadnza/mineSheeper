import React from 'react';
import ReactDOM from 'react-dom';

class Board extends React.Component {
	constructor() {
		super()
		this.state = {
			size: [10,10],
			options: {
				Easy: [10,10],
				Medium: [16,16],
				Hard: [24,30]
			}
		};
	}	
}