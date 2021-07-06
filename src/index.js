import React from "react";
import ReactDOM from "react-dom";

import Controller from "./Controller.js";

document.getElementById("music").muted = false;
//document.getElementById("sound").muted = false; //TEMP

ReactDOM.render(<Controller />,document.getElementById("game"));
