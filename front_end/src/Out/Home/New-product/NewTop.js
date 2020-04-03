import React,{Component} from 'react';
import './NewTop.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
class NewTop extends Component{
    constructor(props) {
        super(props);
     
        this.state = {
            new: ["col ",'col ','col ','col ','col none','col none'],
            dem:0,data:[]
        };
      }
      componentDidMount(){
          axios.get("/newproduct").then(res=>{
              this.setState({
                  data:res.data
              })
          })
      }
     Next = () => {
         console.log(this.state.dem)
         if(this.state.dem<2){
        var newAaray = Array(6).fill("col none")
        var d=this.state.dem+1;
        newAaray[d]="col";
        newAaray[d+1]="col";
        newAaray[d+2]="col";
        newAaray[d+3]="col";
        console.log(d);
        console.log(newAaray);
        this.setState({
            dem:d,
            new: newAaray
        });
        console.log(this.state.dem);
        console.log(this.state.new)
    }}
    Back = () => {
        console.log(this.state.dem)
        if (this.state.dem>0){
            var newAaray = Array(6).fill("col none")
            var d=this.state.dem-1;
            newAaray[d]="col";
            newAaray[d+1]="col";
            newAaray[d+2]="col";
            newAaray[d+3]="col";
            this.setState({
                dem:d,
                new: newAaray
            });
            console.log(this.state.dem);
            console.log(this.state.new)
    }}
    showdata=(datas)=>{
        // console.log(datas)
        var result=null;
        if (datas!==undefined){
            result= datas.map((data,index)=>{
                // console.log(data,index)
                if (data !== null){
                    var link1="http://localhost:4000/anh/"+data.Link;
                     var link2="product/"+data.Link;
                }
                return(
                    <div className={this.state.new[index]}>
                        <div class="container1">
                            <a href={link2}>
                            <img className="img1" src={link1+"_1"} alt="Avatar"></img>
                            <div class="overlay">
                            <img alt="anh" className="img1" src={link1+"_5"}></img>
                            </div></a>
                        </div>
                            
                        </div>
                )
            })
        }
        return result;
    }
    render(){
        return(
            <div className="new-top">
                <p className="wow animated fadeInDown">Sản Phẩm Thịnh Hành</p>
                
                <div id="carouselExampleInterval" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                    <div className="slideshow-container">
                    <div className="row">
                         {this.showdata(this.state.data)}
                    </div>
                    {/* <i class="fas fa-arrow-left  prev" onClick={this.Back} ></i>
                    <i class="fas fa-arrow-right next" onClick={this.Next}></i> */}
                </div>
                    </div>
                    <Link  className="a_prev" onClick={this.Back} >
                    <i class="fas fa-arrow-left  prev" onClick={this.Back} ></i>
                    </Link>
                    <Link className="a_next"  onClick={this.Next}>
                        <i class="fas fa-arrow-right next" onClick={this.Next}></i>
                    </Link>
                </div>
            </div>
        )
}}
export default NewTop