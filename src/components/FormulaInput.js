import React, { Component } from "react";
import "./FormulaInput.css";

export class FormulaInput extends Component {
  render() {
    const { formula } = this.props;
    return <div className="FormulaInput">{formula}</div>;
  }
}

export default FormulaInput;
