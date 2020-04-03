import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import {
    BrowserRouter as Router,
    // Route, Link
  } from "react-router-dom";
import FooterTop from './Footer-top';
import FooterBottom from './Footer-bottom';
class Footer extends Component {
  render(){
  return (
    <Router>
      <div className="footer">
          <FooterTop></FooterTop>
          <FooterBottom></FooterBottom>
      </div>
    </Router>
  );
}}

export default Footer;