import React, { Component } from 'react'
import Table from './components/table'

export default class customTable extends Component {
  render() {
    return (
        <div className="text-center text-secondary" style={{ marginTop: "10%" }}>
        <h4 style={{ marginBottom: "5%" }}>
          Here are your customized rankings!
        </h4>
        <div style={{ marginTop: "5%", marginLeft: "25%", marginRight: "25%" }}>
          <Table query={this.props.query} />
        </div>
      </div>
    )
  }
}
