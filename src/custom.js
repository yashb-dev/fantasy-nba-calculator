import React, { Component } from "react";
import Table from './components/table';

export default class custom extends Component {
  render() {
    return (
      <div className="text-center text-secondary" style={{ marginTop: "10%" }}>
        <h1 style={{ marginBottom: "5%" }}>
          Welcome to the NBA Fantasy Ranking Calculator
        </h1>
        <div style={{ marginTop: "5%", marginLeft: "25%", marginRight: "25%" }}>
          <Table query="http://localhost:5002/rankplayers?mode=official" />
        </div>
      </div>
    );
  }
}
