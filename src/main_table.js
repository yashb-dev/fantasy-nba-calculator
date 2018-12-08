import React, { Component } from "react";
import Table from "./components/table";

class App extends Component {
  render() {
    return (
        <div>
          <Table query="http://localhost:5002/rankplayers?mode=official" page={1} />
        </div>
    );
  }
}

export default App;
