import React from "react";
import ReactDOM from "react-dom";

// import "booststrap/dist/css/boostrap.min.css"
// import "shards-ui/dist/css/shards.min.css"

import "./index.css";
import   Chat from './Chat'

const App = () => <Chat />;

ReactDOM.render(<App />, document.getElementById("app"));
