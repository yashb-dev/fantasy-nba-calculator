import React, { Component } from "react";
import ReactDOM from "react-dom";
import Table from "./table";

export default class pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current:1
    };
    this.createBlocks = this.createBlocks.bind(this);
  }
  updateTable(next){
    this.state.current = next;
    ReactDOM.render(<Table query={this.props.query} page={this.state.current} />, document.getElementById('table'));
  }
  createBlocks() {
    var temp = [];
    for (var i = 0; i < this.props.pages; i++) {
      temp.push(
        <li className="container">
          <a
            href="#"
            className="btn btn-dark btn-block"
            style={{ color: "linen" }}
            id={i + 1}
            onClick={this.updateTable.bind(this, i + 1)}
          >
            {i + 1}
          </a>
        </li>
      );
    }
    return temp;
  }
  render() {
    return (
      <div
        className="text-center"
        style={{ marginLeft: "25%", marginRight: "25%" }}
      >
        <ul className="pagination">{this.createBlocks()}</ul>
      </div>
    );
  }
}
