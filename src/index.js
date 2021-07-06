import React from "react";
import ReactDOM from "react-dom";

import Controller from "./Controller.js";

document.getElementById("music").muted = false;

ReactDOM.render(<Controller />,document.getElementById("game"));
