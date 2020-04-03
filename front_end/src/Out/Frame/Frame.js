
import React,{Component} from 'react';
import './Frame .css'
import { Link } from 'react-router-dom';

class Frame extends Component{
    render(){
        // var match=this.props.match;
        // console.log(match);
        var anh='http://localhost:4000/anh/' + this.props.anh;
        var anhhover='http://localhost:4000/anh/'+this.props.to+"_3";
        // var anhhover1='http://localhost:4000/anh/'+this.props.to+"_5";
        // console.log(this.prop.to);
        var name=this.props.to;
        var link='/product/'+name
        // console.log('http://localhost:4000/anh/'+this.state.to+"_to2");
        return(
            <div className="frame">
                <Link to={link}  >
                    <div className="container1">
                        <img className="img1 ol1" src={anh} alt="Avatar"></img>
                        <div className="overlay1">
                        <img alt="anh" className="img1" src={anhhover}></img>
                        </div>
                    </div>
                    <p className="frame-p">{this.props.ten} </p>
                    <b>
                        <span className="frame-giacu"> {this.props.giacu+'đ'}</span>
                        <span className="frame-giamoi"> {this.props.giamoi +"đ"}</span>
                    </b>
                </Link>
                {/* <div className="scene">
                    <div className="movie" >
                        <div className="poster">
                            <img className="img1" src={anh} alt="Avatar"></img>
                        </div>
                        <div className="info">
                            <div className="row">
                                <div className="col">
                                    <img className="img1" src={anhhover}></img>
                                </div>
                                <div className="col">
                                    <img className="img1" src={anhhover1}></img>
                                </div>
                            </div>
                            <p>
                                a
                            </p>
                        </div>
                    </div>
                </div> */}
            </div>
        )
}}
export default Frame