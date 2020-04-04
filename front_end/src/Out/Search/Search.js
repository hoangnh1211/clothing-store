import React,{Component} from 'react';
import Frame from '../Frame/Frame';
import './Search.css'
import axios from "axios"
class Search extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            name:'',
            currentPage:1,
            newsPerPage:9,
            pageNumbers:1
        };
      }
      componentDidMount() {
        axios.get('/search1')
        .then(res=>{
          console.log(res.data);
          this.setState({
            data:res.data
        });
        })
        axios.get('/search2')
        .then(res=>{
          console.log(res.data);
          this.setState({
            name:res.data
        });
        })
    }
    // Show = (menus,match) => {
    //     var result = null;
    //     if (menus.length > 0) {
    //         result = menus.map((menu, index) =>{
    //             var link=menu.Link+"_1"
    //             return(
    //                 <Frame match={match.match} className="flex-left" anh={link} ten={menu.Name} giamoi={menu.NewPrice} giacu={menu.Price} to={menu.Link}>  </Frame>
    //             )
    //         })
    //     }
    //     return result;
    // }
    Show = (menus,match,currentPage) => {
        var result = null;
        if (menus !== undefined){
        if (menus.length > 0) {
            result = menus.map((menu, index) =>{
                var link=menu.Link+"_1"
                if (index>=(currentPage-1)*this.state.newsPerPage && index <= currentPage*this.state.newsPerPage-1 && menu.active)
                return(
                    <Frame match={match.match} className="flex-left" anh={link} ten={menu.Name} giamoi={menu.NewPrice} giacu={menu.Price} to={menu.Link}>  </Frame>
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
                        <a href={a} ><li className="pagelink hvr-grow-shadow pagelink_click" onClick={this.scrollToTop}> {index}</li></a>
                        )
                } else 
                return(
                    <a href={a} ><li className="pagelink hvr-grow-shadow" onClick={this.scrollToTop}> {index}</li></a>
                    )
            })   
        }
        return result;
    }
    scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    render(){
        // console.log(this.state.data)
        var match=this.props;
        var abc=match.location.hash;
        var abc1,length;
        // var match=this.props;
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
        return(
            <div className="shirt">
                <pre className="color-darkgray">HOME <i class="fas fa-arrow-right color-black"></i> <b className="color-black"> Search</b>  </pre>
                <p class="size-20"><b>Kết quả tìm kiếm cho " {this.state.name} "</b></p>
                
                <div className="page row">
                    <span className="col-3" >Trang {this.state.currentPage} trên tổng số {this.state.pageNumbers} :</span>
                    <ul className="col ">
                    {this.Showpage(this.state.pageNumbers,abc1)}
                    </ul>
                </div>
                <div className=" flex-container ">
                    {/* <Frame className="flex-left"  anh="111" ten="Váy đầm trắng" gia="320.000"  ></Frame> */}
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
export default Search