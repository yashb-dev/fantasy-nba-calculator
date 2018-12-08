import React, { Component } from "react";
import "react-bootstrap-table/css/react-bootstrap-table.css";
import Pagination from "./pagination";

export default class table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      rows: null,
      page: this.props.page
    };
    this.createRows = this.createRows.bind(this);
  }

  componentDidMount() {
    console.log(this.props.query);
    fetch(this.props.query)
      .then(res => res.json())
      .then(myJson => {
        this.setState({
          data: JSON.parse(myJson)["data"]
        });
      });
  }
  createRows() {
    var temp = [];
    for (
      var i = (this.props.page - 1) * 50;
      (i < this.props.page * 50) & (i < this.state.data.length);
      i++
    ) {
      temp.push(
        <tr>
          <th scope="row">{i + 1}</th>
          <td>{this.state.data[i]["PLAYER_NAME"]}</td>
          <td>{this.state.data[i]["SCORES"]}</td>
        </tr>
      );
    }
    return temp;
  }
  render() {
    this.state.rows = this.createRows();
    return (
      <div className="text-center text-secondary" style={{marginLeft: "25%", marginRight: "25%" }}>
        <table
          id="results"
          className="table table-striped"
          data={this.state.data}
        >
          <thead className="bg-dark" style={{ color: "linen" }}>
            <tr>
              <th scope="col">Ranking</th>
              <th scope="col">Plater Name</th>
              <th scope="col">Fantasy Score</th>
            </tr>
          </thead>
          <tbody>{this.state.rows}</tbody>
        </table>
      </div>
    );
  }
}
