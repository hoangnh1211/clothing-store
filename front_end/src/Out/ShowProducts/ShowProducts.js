import React,{Component} from 'react';
import Frame from '../Frame/Frame';
import './ShowProducts.css'
import '../../hover.css'
import Axios from 'axios';
// import { Redirect } from 'react-router';

// import axios from "axios"
class ShowProducts extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentPage:1,
            newsPerPage:9,
            pageNumbers:1,
            tech: 'ten-az',
            data:{},datas:'',data1:[],
            loading:0,true:0
        };
      }
    changedata(){
        var {match}=this.props;
        var length=match.path.length
        var name=match.path.slice(1,length)
        // console.log(name)   
        Axios.post("/data",{name:name}).then(res=>{
            Axios.post("/datageneral",{name:res.data,order:"order by Name"}).then(res => {
                // console.log(this.props.datas,res.data);
                this.setState({
                  data:res.data,loading:1
                });
            });
        })
        
    }
    // componentDidMount(){
    //     var {match}=this.props;
    //     var length=match.path.length
    //     var name=match.path.slice(1,length)
    //     // console.log(name)   
    //     Axios.post("/data1",{name:name}).then(res=>{
    //         Axios.post("/datageneral1",{name:res.data,order:"order by Name"}).then(res => {
    //             // console.log(this.props.datas,res.data);
    //             this.setState({
    //               data:res.data,loading:1
    //             });
    //         });
    //     })
    // }
      handleChange(e){
        var abc=""
        if (e.target.value==="ten-az") abc="order by Name"
        if (e.target.value==="ten-za") abc="order by Name desc"
        if (e.target.value==="giathap") abc="order by NewPrice"
        if (e.target.value==="giacao") abc="order by NewPrice desc"
        // console.log(abc)
        var {match}=this.props;
        var length=match.path.length
        var name=match.path.slice(1,length)
        // console.log(name)   
        Axios.post("/data",{name:name}).then(res=>{
            Axios.post("/datageneral",{name:res.data,order:abc}).then(res => {
                // console.log(this.props.datas,res.data);
                this.setState({
                  data:res.data,loading:1
                });
            });
        })
        this.setState({
          tech: e.target.value
        })
        // var match=this.props.match.path
        window.location = this.props.match.path+"#1";
        // console.log(match)
      }
    changepage=(pageNumbers)=>{
        this.setState({
            pageNumbers:pageNumbers
        })
    }

    Show = (menus,match,currentPage) => {
        var result = null;
        if (menus !== undefined){
        if (menus.length > 0) {
            result = menus.map((menu, index) =>{
                var link=menu.Link+"_1"
                if (index>=(currentPage-1)*this.state.newsPerPage && index <= currentPage*this.state.newsPerPage-1 && menu.active===1)
                return(
                    <Frame key={menu.Link} match={match.match} className="flex-left" anh={link} ten={menu.Name} giamoi={menu.NewPrice} giacu={menu.NewPrice*1.5} to={menu.Link}>  </Frame>
                )
                return null;
            })
        }}
        return result;
    }
    Showpage = (length,abc1 )=>{
        // console.log(length)
        var result=null;
        var a=[];
        for (var i=1;i<=length;i++){
            a[i]=i;
        }
        if (a.length>0){
            result=a.map((menu,index)=>{
                var a="#"+index;
                abc1=parseInt(abc1)
                // console.log(abc1,index)
                if (index===abc1){
                    return(
                        <a href={a} key={a} ><li className="pagelink hvr-grow-shadow pagelink_click" onClick={this.scrollToTop}> {index}</li></a>
                        )
                } else 
                return(
                    <a href={a} key={a}><li className="pagelink hvr-grow-shadow" onClick={this.scrollToTop}> {index}</li></a>
                    )
            })   
        }
        return result;
    }
    scrollToTop=()=> {
        this.setState({
            true:1
        })
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    render(){
        var match=this.props;
        // console.log("a")
        var abc=match.location.hash;
        var abc1,length;
        // var aProps = Object.getOwnPropertyNames(this.state.datas);
        // var bProps = Object.getOwnPropertyNames(match.datas);
        // Nếu độ dài của mảng không bằng nhau,
        // thì 2 objects đó không bằnh nhau.
        if (this.state.datas !== match.match.path) { 
            this.setState({ 
                datas:match.match.path,tech:"ten-az" 
            }) 
            var a="order by Name" 
            this.changedata(a) 
        }

        // for (var i = 0; i < aProps.length; i++) {
        //     var propName = aProps[i];          
        //     if (this.state.datas[propName] !== match.datas[propName]) {             
        //         this.setState({
        //             datas:match.datas,tech:"ten-az"
        //         })
        //         // var a="order by Name"
        //         this.changedata()    
        //     }     
        // }
         
        var d=this.state.newsPerPage;
        if (this.state.data !== undefined) length=this.state.data.length;
        
        // console.log(length)
        if (length !== undefined){
            if (length%d===0) length=length/d; else length=parseInt(length/d)+1;
            if (this.state.pageNumbers!==length)
                this.setState({
                    pageNumbers:length
                })
        }
        if (abc === "") abc1=1; else  abc1=abc.slice(1)
        // console.log(abc1)
        
        if (this.state.currentPage!==abc1)
        this.setState({
            currentPage:abc1,
            pageNumbers:length
        })
        // console.log(abc1)
       
        return(
            <div className="shirt">
                <pre className="color-darkgray">HOME  <i className="fas fa-arrow-right color-black"></i> <b className="color-black"> {this.props.Name}</b></pre>
                <div className="page row">
                    <span className="col-3" >Trang {this.state.currentPage} trên tổng số {this.state.pageNumbers} :</span>
                    <ul className="col ">
                    {this.Showpage(this.state.pageNumbers,abc1)}
                    </ul>
                    <select id="lang" className="col-2 order-12" onChange={this.handleChange.bind(this)} value={this.state.tech} >
                        <option value="ten-az" >Tên : A ---> Z</option>
                        <option value="ten-za">Tên : Z ---> A</option>
                        <option value="giathap">Giá : Thấp Đến Cao</option>
                        <option value="giacao">Giá : Cao Đến Thấp</option>
                    </select>
                </div>
                <div className=" flex-container ">
                    {/* <Frame className="flex-left"  anh="111" ten="Váy đầm trắng" gia="320.000" to="aaa"  ></Frame> */}
                    {this.Show(this.state.data,match,this.state.currentPage)}
                </div>
                
                <div className="page row">
                    <span className="col-3" >Trang {this.state.currentPage} trên tổng số {this.state.pageNumbers} :</span>
                    <ul className="col ">
                        {this.Showpage(this.state.pageNumbers,abc1)}
                    </ul>
                </div>
            </div>
        
        )
}}
export default ShowProducts