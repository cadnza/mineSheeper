import React from "react";
import ReactDOM from "react-dom";

import Controller from "./Controller.js";

document.addEventListener("touchstart",() => true); // To enable active button styling on mobile

ReactDOM.render(<Controller />,document.getElementById("game"));
