import React,{Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import axios from "axios"
// import axois from "axois"
import {Redirect} from 'react-router-dom'
class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // kq:"that bai",
      username:"",
      password:"",name:"chua dang nhap",
      nameadmin:"chua dang nhap"
    }
 }
 componentDidMount() {
  
  axios.get('/test')
  .then(res=>{
    this.setState({
      name:res.data
  });
  })
  axios.get('/testadmin')
  .then(res=>{
    this.setState({
      nameadmin:res.data
  });
  })
}
  handleRequert=(e)=>{
    // e.preventDefault();
    var username=this.state.username;
    var password=this.state.password;
    console.log(username);
    console.log(password);
    if (this.props.data !== "admin"){
      axios.post('/login1',{username:username,password:password})
      .then(res=>{
        if (res.data==="thanh cong") {
          localStorage.setItem('user',JSON.stringify({
              username:this.state.username,
              password:this.state.username
          }));
        }
      //  console.log(res.data);
      console.log(res.data);
      })} else {
        axios.post('/loginadmin',{username:username,password:password})
        .then(res=>{
          if (res.data==="thanh cong") {
            localStorage.setItem('user',JSON.stringify({
                username:this.state.username,
                password:this.state.username
            }));
          }
        //  console.log(res.data);
        console.log(res.data);
        })
      }
    // .catch(err => console.log(err))
  }
  onChange =(e)=>{
    // console.log(e.target)
    var name=e.target.name;
    var value=e.target.value;
    this.setState({
      [name]:value
    })
  }
  render(){
    // var login=localStorage.getItem('user');
    // console.log(this.state.name)
    if (this.props.data === "admin"){
    if (this.state.nameadmin !== 'chua dang nhap') {
      return <Redirect to="/admin"/>
    }} else {
      if (this.state.name !== 'chua dang nhap') {
        return <Redirect to="/"/>
      }
    }
  return (
    <div className="login1">
      <div class="page-title">
        <h1 className="size32">{this.props.data}</h1>
        {/* <div class="field note">If you have an account, sign in with your email address.</div> */}
      </div>
      <div className="li">
          <span>Login and password are required.</span>
      </div>
      <form onSubmit={this.handleRequert }  className="lo"> 
        <div ><input placeholder="Username"  type="text" name="username" ref="username" className="borderinput" value={this.state.username} onChange={this.onChange} ></input></div>
        <div><input placeholder="Password"  type="password" name="password" ref="password" className="borderinput"  value={this.state.password} onChange={this.onChange}></input></div>
        <button type="submit"  className="hvr-sweep-to-left1"><b>ĐĂNG NHẬP</b></button>
      </form>
    </div>
  );
}}

export default Login;
