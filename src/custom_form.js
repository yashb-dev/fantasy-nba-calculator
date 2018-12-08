import React, { Component } from "react";
import CustomTable from "./custom_table";
import ReactDOM from "react-dom";
import CustomTitle from './custom_title';
import Pagination from "./components/pagination";

export default class custom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      W: 0,
      L: 0,
      MIN: 0,
      FG_PCT: 0,
      FG3_PCT: 0,
      FT_PCT: 0,
      PTS: 0,
      REB: 0,
      AST: 0,
      STL: 0,
      BLK: 0,
      TOV: 0
    };
    this.getTable = this.getTable.bind(this);
    ReactDOM.render(null,document.getElementById('table'));
  }
  getTable() {
    var w = "&W=" + this.state.W;
    var l = "&L=" + this.state.L;
    var m = "&MIN=" + this.state.MIN;
    var fg = "&FG_PCT=" + this.state.FG_PCT;
    var fg3 = "&FG3_PCT=" + this.state.FG3_PCT;
    var ft = "&FT_PCT=" + this.state.FT_PCT;
    var pts = "&PTS=" + this.state.PTS;
    var reb = "&REB=" + this.state.REB;
    var ast = "&AST=" + this.state.AST;
    var stl = "&STL=" + this.state.STL;
    var blk = "&BLK=" + this.state.BLK;
    var tov = "&TOV=" + this.state.TOV;
    var query =
      "http://localhost:5002/rankplayers?mode=custom" +
      w +
      l +
      m +
      fg +
      fg3 +
      ft +
      pts +
      reb +
      ast +
      stl +
      blk +
      tov;
    console.log(query);
    ReactDOM.render(<CustomTitle />, document.getElementById('title'));
    ReactDOM.render(<Pagination query={query} pages={10}/>, document.getElementById('pagination'));
    ReactDOM.render(
      <CustomTable query={query} />,
      document.getElementById("table")
    );
  }
  render() {
    return (
      <div className="text-center text-secondary" style={{ marginTop: "10%" }}>
        <h6>Please select which categories you would like to be included</h6>
        <div className="text-left" style={{ marginLeft: "25%" }}>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value=""
                onChange={(this.state.W = !this.state.W)}
              />
              Wins
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value=""
                onChange={(this.state.L = !this.state.L)}
              />
              Losses
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value=""
                onChange={(this.state.MIN = !this.state.MIN)}
              />
              Minuntes Played
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value=""
                onChange={(this.state.FG_PCT = !this.state.FG_PCT)}
              />
              Field Goal %
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value=""
                onChange={(this.state.FG3_PCT = !this.state.FG3_PCT)}
              />
              3-Point %
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value=""
                onChange={(this.state.FT_PCT = !this.state.FT_PCT)}
              />
              Free Throw %
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value=""
                onChange={(this.state.PTS = !this.state.PTS)}
              />
              Points
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value=""
                onChange={(this.state.REB = !this.state.REB)}
              />
              Rebounds
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value=""
                onChange={(this.state.AST = !this.state.AST)}
              />
              Assists
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value=""
                onChange={(this.state.STL = !this.state.STL)}
              />
              Steals
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value=""
                onChange={(this.state.BLK = !this.state.BLK)}
              />
              Blocks
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value=""
                onChange={(this.state.TOV = !this.state.TOV)}
              />
              Turnovers
            </label>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <button className="btn btn-primary btn-sm" onClick={this.getTable}>
            {" "}
            Submit{" "}
          </button>
        </div>
      </div>
    );
  }
}
