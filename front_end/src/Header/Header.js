import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
// import {
//   BrowserRouter as Router,
//    Link
// } from "react-router-dom";
import axios from "axios"
class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chua:"abc",
      roi:"abc none",
      user:'',
      a:"",
      order:[],
      name:'',
      tong:0,
      soluong:0,
      link:'login1',
      search:[],
    }
 }

 componentDidMount() {
  axios.get('/order')
  .then(res=>{
    // console.log(res.data);
    this.setState({
      order:res.data
  });
  })
  axios.get('/test')
  .then(res=>{
    this.setState({
      name:res.data
  });})
  //   if (res.data!="chua dang nhap"){
  //   this.setState({
  //     link:"cart"
  // });} else {
  //   this.setState({
  //     link:'login1'
  // });
  // }
  // })
    axios.get('/test1')
    .then(res=>{
      if (res.data!=="chua dang nhap"){
        this.setState({user:res.data,chua:'abc none', roi:'abc'})
        console.log(res.data);
      } else {
        this.setState({user:res.data,chua:'abc', roi:'abc none'})
        // console.log(res.data);
      }
    })
}
Show = (menus,name) => {
  var result = null;
  var tong=0;
  var dem=0;
  // console.log('abc')
  if (menus.length > 0) {
      result = menus.map((menu, index) => {
          if (menu.username===name){
              tong=tong+menu.NewPrice*menu.soluong;
              dem=dem+menu.soluong;
            }
            return null;
      })
      if (tong!==this.state.tong)
      this.setState({
          tong:tong,
          soluong:dem
      });
  } 
  return result;
} 
 handleRequert(){
   var {username,password }=this.refs;
  axios.post('/login1',{username:username.value,password:password.value})
   .then(res=>{
      if (res.data==="that bai") {this.setState({a:"ac"})} else  this.setState({a:""}) ;
    console.log(res.data);
    console.log(this.state.a);
  })
   .catch(err => console.log(err))
 }
 search=()=>{
  var {search}=this.refs;
  axios.post('/search',{search:search.value})
  .then(res=>{
   console.log(res.data);
   this.setState({search:res.data})
 })
  .catch(err => console.log(err))
}
 logout(){
  axios.get('/logout').then(res=>{
  window.location.reload()

  })
  .catch(err=>console.log(err))
 }
   create1(){
    var {username1,password1,name1 }=this.refs;
    axios.post('/create',{username:username1.value,password:password1.value,name:name1.value})
    .then(res=>{console.log(res.data)
    })
     .catch(err => console.log(err))
   }
   handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      var {search}=this.refs;
    axios.post('/search',{search:search.value})
    .then(res=>{
    console.log(res.data);
    this.setState({search:res.data})
  })
    .catch(err => console.log(err))
    }
  }
  render(){
  return (
    <div className="header">
      
      
      {this.Show(this.state.order,this.state.name)}
      <div className=" header-top " >
      <div className="container">
        <div className={this.state.chua}>
          <span className="aa">
              <i className="fas fa-sign-in-alt space-right dropdown-toggle aa grey" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Đăng Ký </i>
              <div className="dropdown-menu login">
                <div ><p>Name</p><input placeholder="name"  type="text" id="name1" ref="name1" className="borderinput" ></input></div>
                <div ><p>UserName</p><input placeholder="Username"  type="text" id="username1" ref="username1" className="borderinput" ></input></div>
                <div><p>Password</p><input placeholder="Password"  type="password" id="password1" ref="password1" className="borderinput"></input></div>
                 <a href="/"> <button className="hvr-sweep-to-left1" onClick={this.create1.bind(this)}> <b>CREATE</b></button></a>
              </div>
          </span>
          
          <span className="aa">
              <i className="fas fa-sign-in-alt space-right dropdown-toggle aa" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Đăng Nhập </i>
              <div className="dropdown-menu login"><form  action="/"> 
                <div ><input placeholder="Username"  type="text" id="username" ref="username" className="borderinput" ></input></div>
                <div><input placeholder="Password"  type="password" id="password" ref="password" className="borderinput"></input></div>
                <a href="/loginadmin"><pre className='p'> ĐĂNG NHẬP VỚI TƯ CÁCH ADMIN</pre></a>
                <button type="submit" className="hvr-sweep-to-left1" onClick={this.handleRequert.bind(this) } ><b>ĐĂNG NHẬP</b></button></form>
              </div>
          </span>
          
        </div>
        <div className={this.state.roi}>
          <span className="aa"><a href="history"><i className="fas fa-user space-left grey" > {this.state.user}</i></a></span>
          <span className="aa">
            <a href="/"><i className="fas fa-sign-in-alt space-right  " onClick={this.logout} > ĐĂNG XUẤT</i></a>
          </span>
        </div>
        </div>
      </div>
      <div className="header-bottom">
      <div className="container">
          <div className="row ">
            <div className="col-6">
              <a href="/"><img src="http://localhost:4000/logo"  className="logo" alt="a"></img></a>
            </div>
            <div className="col-3 center formsearch border-bottom1">
              <div className="row" >
                <div className="col-3 cu dropdown-toggle" data-toggle="dropdown"  >Tất Cả</div>
                <div className="dropdown-menu bordersearch">
                  <a href="/Shirt"><p>áo</p></a>
                  <a href="trouser"><p>quần</p></a>
                  <a href="vay"><p>váy</p></a>
                </div>
                <div className="col-9 ">
                  <form action="search" className="row">
                    <div className="col-9">
                      <input type="text" className="form-control-plaintext" ref="search"  id="search" placeholder="search" onKeyDown={this.handleKeyDown}></input>
                    </div>
                    <div className="col-3 cu">
                      <a href="search" className=""><button type="button" className="btn btn-outline button-search" onClick={this.search.bind(this)}><i className="fas fa-search"></i></button></a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-3 left shop">
              <a href="/cart">
                <div className="row " >
                  <div className="col-8 shop-div">
                    <i className="fas fa-shopping-cart size50 iconshop"></i>
                    <p className="shop-value">{this.state.soluong}</p>
                  </div>
                  <div className="col-4 shop-div">
                    <p className="shop-div-p">Giỏ Hàng</p>
                    <p> {this.state.tong} đ</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}}

export default Header;