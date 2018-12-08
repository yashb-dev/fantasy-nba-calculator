import React, { Component } from "react";
import MainTable from '../main_table';
import ReactDOM from 'react-dom';
import About from '../about';
import Custom from '../custom_form';
import MainTitle from '../main_title';
import Pagination from './pagination';

export default class navBar extends Component {
  loadMain() {
    this.setState({
      mode: "main"
    });
  }
  loadCustom() {
    this.setState({
      mode: "custom"
    });
  }
  loadAbout() {
    this.setState({
      mode: "about"
    });
  }
  componentDidUpdate(){
      if (this.state.mode === 'main'){
        ReactDOM.render(<MainTitle />, document.getElementById('title'));
        ReactDOM.render(<Pagination query="http://localhost:5002/rankplayers?mode=official" pages={10}/>, document.getElementById('pagination'));
        ReactDOM.render(<MainTable />, document.getElementById('table'));
      }
      if (this.state.mode === 'custom'){
        ReactDOM.render(<Custom />, document.getElementById('title'));
        ReactDOM.render(null, document.getElementById('pagination'));
        ReactDOM.render(null, document.getElementById('table'));
      }
      if (this.state.mode === 'about'){
        ReactDOM.render(<About />, document.getElementById('title'));
        ReactDOM.render(null, document.getElementById('pagination'));
        ReactDOM.render(null, document.getElementById('table'));
      }
  }
  componentDidMount(){
    ReactDOM.render(<MainTitle />, document.getElementById('title'));
    ReactDOM.render(<Pagination query="http://localhost:5002/rankplayers?mode=official" pages={10}/>, document.getElementById('pagination'));
    ReactDOM.render(<MainTable />, document.getElementById('table'));
  }
  constructor(props) {
    super(props);
    this.loadMain = this.loadMain.bind(this);
    this.loadCustom = this.loadCustom.bind(this);
    this.loadAbout = this.loadAbout.bind(this);
    this.state = {
      mode: "main"
    };
  }

  render() {
    return (
      <nav className="navbar fixed-top navbar-dark bg-dark">
        <div className="container-fluid justify-content-center">
          <ul className="nav list-inline">
            <li className="btn rounded list-inline-item">
              <a href="#" style={{ color: "linen" }} onClick={this.loadMain}>
                Official Fantasy
              </a>
            </li>
            <li
              className="btn rounded list-inline-item"
              onClick={this.loadCustom}
            >
              <a href="#" style={{ color: "linen" }}>
                Custom Fantasy
              </a>
            </li>
            <li
              className="btn rounded list-inline-item"
              onClick={this.loadAbout}
            >
              <a href="#" style={{ color: "linen" }}>
                About
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
