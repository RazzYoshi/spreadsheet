import React, { Component } from "react";
import "./Cell.css";

export class Cell extends Component {
  state = { value: 0, formula: "" };

  componentDidMount = () => {
    if (localStorage.getItem(`ssc-value-${this.cellId()}`)) {
      this.setState({
        value: localStorage.getItem(`ssc-value-${this.cellId()}`)
      });
    }
    if (localStorage.getItem(`ssc-formula-${this.cellId()}`)) {
      this.setState({
        formula: localStorage.getItem(`ssc-formula-${this.cellId()}`)
      });
    }
  };

  cellId = () => {
    const { column, row, colHeader = null } = this.props;
    if (!colHeader) return "";
    const columnName = colHeader(row);
    const cellName = columnName + column;
    return cellName;
  };

  onClick = () => {
    const { setFormula } = this.props;
    const { formula } = this.state;
    setFormula(formula);
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ value });
  };

  handleSave = e => {
    const { value: oldValue, formula: oldFormula } = this.state;
    const { value } = e.target;
    let newValue = oldValue;
    let newFormula = oldFormula;
    if (isNaN(value)) {
      newValue = this.parseFormula(value);
      newFormula = value;
    } else {
      if (parseFloat(newValue) !== parseFloat(value)) {
        newValue = value;
        newFormula = `=${value}`;
      }
    }
    this.setState({ value: newValue, formula: newFormula });
    localStorage.setItem(`ssc-value-${this.cellId()}`, newValue);
    localStorage.setItem(`ssc-formula-${this.cellId()}`, newFormula);
  };

  /**
   * Converts a formula into a value
   * @param {String} formula the formula to be parsed, must start with =
   */
  parseFormula = formula => {
    if (typeof formula === "string") {
      // must be a string
      if (formula.startsWith("=")) {
        // must start with =
        const components = formula
          .substring(1) // remove =
          .replace(/ /g, "") // remove all white space
          .replace(/([A-Za-z0-9.]+)/g, "$1|") // insert delimiters
          .split("|"); // split by numbers
        let value = this.resolveToNumber(components[0]);
        if (value === null) {
          return this.mathError(); // Could not resolve first value short circuit
        }
        return components.slice(1).reduce((y, x) => {
          if (!x) return y; // End of array short circuit
          const number = this.resolveToNumber(x.substring(1));
          let result = y;
          if (x.startsWith("+")) {
            result = number ? +y + +number : null; // Addition
          } else if (x.startsWith("-")) {
            result = number ? +y - +number : null; // Subtraction
          }
          if (result === null) {
            return this.mathError(); // Could not resolve one of the values short circuit
          }
          return result;
        }, value);
      }
    }
    return this.mathError(); // Could not parse formula error out
  };

  resolveToNumber = x => {
    if (x === this.cellId()) {
      console.log("Error: Circular math");
      return null;
    }
    const b = !isNaN(parseFloat(x))
      ? parseFloat(x)
      : document.getElementById(x)
      ? document.getElementById(x).value
      : null;
    return b;
  };

  mathError = () => {
    console.log("Error: Could not solve formula");
    return "#N/A"; // Could not resolve one of the values short circuit
  };

  render() {
    const { children } = this.props;
    const { value } = this.state;
    const cellName = this.cellId();
    return cellName ? (
      <textarea
        id={cellName}
        value={value}
        onChange={this.handleChange}
        onBlur={this.handleSave}
        onClick={() => this.onClick()}
        className="Cell data"
      >
        {children}
      </textarea>
    ) : (
      <div id={cellName} onClick={() => this.onClick()} className="Cell">
        {children}
      </div>
    );
  }
}

export default Cell;
