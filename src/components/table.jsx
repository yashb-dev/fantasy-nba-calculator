import React, { Component } from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css'

export default class table extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
        };
    }  

    componentDidMount(){
        fetch(this.props.query)
        .then(res => res.json())
        .then(
            (myJson) => {
                this.setState({
                    data:JSON.parse(myJson)['data']
                });
        })
    }
  render() {
    return (
      <div style={{marginTop:'5%', marginLeft:'10%', marginRight:'10%'}}>
        <BootstrapTable data={this.state.data}>
            <TableHeaderColumn isKey dataField='PLAYER_NAME'>
            Player Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField='SCORES'>
            Fantasy Score
            </TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}
