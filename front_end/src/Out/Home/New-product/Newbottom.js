import React,{Component} from 'react';
import './Newbottom.css'
import {
    Link
  } from "react-router-dom";
class NewBottom extends Component{
    render(){
        return(
            <div className="new-bottom">
                <div className="row">
                    <div className='col ab1 wow animated fadeInLeft'>
                        <Link to="/shirt"><img className="img1" alt="anh" src="http://localhost:4000/anh/ao"></img></Link>
                    </div>
                    <div className='col ab2 wow animated fadeInRight'>
                    <Link to="/trouser"><img className="img1" alt="anh" src="http://localhost:4000/anh/quan"></img></Link>
                    </div>
                </div>
                <div className="row-2 ab3 wow animated fadeInUp">
                <Link to="/vay"><img className="img1" alt="anh" src="http://localhost:4000/anh/vay"></img></Link>
                </div>
            </div>
        )
}}
export default NewBottom