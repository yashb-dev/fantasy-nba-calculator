import React, { Component } from "react";
import Main from '../main';
import ReactDOM from 'react-dom';
import About from '../about';
import Custom from '../custom';

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
        ReactDOM.render(<Main />, document.getElementById('table'));
      }
      if (this.state.mode === 'custom'){
        ReactDOM.render(<Custom />, document.getElementById('table'));
      }
      if (this.state.mode === 'about'){
        ReactDOM.render(<About />, document.getElementById('table'));
      }
  }
  componentDidMount(){
    ReactDOM.render(<Main />, document.getElementById('table'));
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
