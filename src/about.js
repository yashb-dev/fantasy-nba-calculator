import React, { Component } from "react";

export default class about extends Component {
  render() {
    return (
      <div className="text-center text-secondary" style={{ marginTop: "10%" }}>
        <h1 style={{ marginBottom: "5%" }}>
          Welcome to the NBA Fantasy Ranking Calculator
        </h1>
        <p>
            The official NBA rules for fantasy leagues states the following point allocations: Points(1), Rebounds(1.2), Assists(1.5), Steals(3), Blocks(3), Turnovers(-1).
        </p>
      </div>
    );
  }
}
