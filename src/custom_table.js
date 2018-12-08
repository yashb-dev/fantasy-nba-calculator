import React, { Component } from "react";
import Table from "./components/table";

export default class customTable extends Component {
  render() {
    return (
        <div>
          <Table query={this.props.query} page={1}/>
        </div>
    );
  }
}
