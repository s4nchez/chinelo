import React from "react";
import ReactDOM from "react-dom";
import {WorkflowRuns} from "./src/main/js/WorkflowRuns";

const mountNode = document.getElementById("app");

ReactDOM.render(<WorkflowRuns repo="http4k/http4k"/>, mountNode);