import React, { Component } from "react";
import "./Grid.css";
import { Row } from "./Row";
import { FormulaInput } from "./FormulaInput";

export class Grid extends Component {
  state = { currentFormula: "" };
  setFormula = formula => {
    this.setState({ currentFormula: formula });
  };
  render() {
    const { columns, rows } = this.props;
    const { currentFormula } = this.state;
    return (
      <div className="Grid">
        <FormulaInput formula={currentFormula} />
        <Row key="grid-header" column={0} columns={columns} header={true} />
        {Array(rows)
          .fill()
          .map((el, i) => (
            <Row
              key={i + 1}
              column={i + 1}
              columns={columns}
              setFormula={this.setFormula}
            />
          ))}
      </div>
    );
  }
}

export default Grid;
