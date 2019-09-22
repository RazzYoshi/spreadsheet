import React, { Component } from "react";
import "./Row.css";
import { Cell } from "./Cell";

export class Row extends Component {
  generateColHeader = column => {
    const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[(column - 1) % 26];
    const repeat = Math.ceil(column / 26);
    return letter.repeat(repeat);
  };
  render() {
    const { column, columns, header, setFormula } = this.props;
    return (
      <ul className="Row auto-fit">
        <li>
          <Cell column={column} row={0}>
            {column}
          </Cell>
        </li>
        {header
          ? Array(columns)
              .fill()
              .map((el, i) => (
                <li key={i + 1}>
                  <Cell column={column} row={i + 1}>
                    {this.generateColHeader(i + 1)}
                  </Cell>
                </li>
              ))
          : Array(columns)
              .fill()
              .map((el, i) => (
                <li key={i + 1}>
                  <Cell
                    column={column}
                    row={i + 1}
                    colHeader={this.generateColHeader}
                    setFormula={setFormula}
                  >
                    10
                  </Cell>
                </li>
              ))}
      </ul>
    );
  }
}

export default Row;
