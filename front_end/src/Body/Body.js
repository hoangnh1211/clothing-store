import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Body.css";
import {
  Route,
  Switch,
  Link
} from "react-router-dom";
import Home from "../Out/Home/Home";
// import Contact from '../Out/Contact/Contact';
import Search from "../Out/Search/Search";
// import Shirt from "../Out/Shirt/Shirt";
import History from "../Out/History/History";

import Products from "../Out/Products/Products";
// import Routershirt from '../Out/Shirt/Router';
import Contact from "../Out/Contact/Contact";
import About from "../Out/About/About";
import Login from "../Login";
// import Admin from "../Admin/Admin";
import Cart from "../Out/Cart/Cart";
import axios from "axios";
import ShowProducts from "../Out/ShowProducts/ShowProducts";
// import Axios from "axios";

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      name: "",
      dem: [],data:[],datarouter:[],
      class:"col-6",
      class2:"col-6"
    };
  }
 
  componentDidMount() {
    axios.get("/order").then(res => {
      this.setState({
        order: res.data
      });
    });
    axios.get("/datashow").then(res=>{
      // console.log(res.data)
      this.setState({
        data:res.data
      })
      })
    axios.get("/datarouter").then(res=>{
      // console.log(res.data)
      this.setState({
        datarouter:res.data
      })
    })
    // axios.get("http://forcommunity.byethost5.com/api/category").then(res=>{
    //   console.log(res)
    // })
  }
  showallnav(data){
    var result = null;
    result=data.map((datas,index)=>{
      var link="/"+datas.name
      return(
        <Link to={link} key={link}>
          <div className="abcd">{datas.description}</div>
        </Link>
      )
    })
    return result
  }
  showRouter=(data)=>{
    var result=null;
    result=data.map((datas,index)=>{
      var path="/"+datas.name
      // console.log(datas)
      return(
        <Route key={path}
            path={path}
            exact
            render={props => 
              <ShowProducts {...props}   Name={datas.description} />
            }/>
      )
    })
    return result
  }
  shownav=(data)=>{
    var result = null;
    result = data.map((datas,index)=>{
      var link="/"+datas.N;
      var linkanh="http://localhost:4000/anh/"+datas.L;
      // console.log(linkanh,da)
      return(
        <div onMouseEnter={this.mo} key={datas.D} onClick={this.scrollToTop} onMouseLeave={this.mo1} className="subnav">
          <button  className="subnavbtn">
            <Link to={link}><b className="size25">{datas.D}</b></Link>
          </button>
          <div  className=" subnav-content ">
            <div className="row">
              <div className={this.state.class}>
                <div className="abc1">
                  <b>{datas.D}</b>
                </div>
                {this.showallnav(datas.dc)}
              </div>
              <div className="col-6">
                <img
                  className="img" alt="anh"
                  src={linkanh}
                ></img>
              </div>
            </div>
          </div>
        </div>
      )
    })
    return result;
  }
  mo=()=>{
    if (this.state.class==="col-6"){
      this.setState({
        class:"col-6 animated fadeIn"
      })
    }
  }
  // mo1=()=>{
  
  //     this.setState({
  //       class:"col-6 animated bounceOut"
  //     })
    
  // }
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  render() {
    // console.log(this.state.data)
    return (
      <div className="body">
        <div className={this.props.class}>
          <div className="subnav">
          <button className="subnavbtn">
              <Link to="/" ><b className="size25"><i className="fas fa-home"></i></b></Link>
            </button>
          </div>
          {this.shownav(this.state.data)}
          
        </div>
        <div className="container">
        <Switch >
          <Route path="/" exact component={Home} />
          <Route path="/login1" render={props => <Login {...props} data="Khách hàng đã đăng ký" />} />
          <Route path="/loginadmin" render={props => <Login {...props} data="admin" />} />
          <Route path="/search" exact component={Search} />
          <Route path="/product/search" exact component={Search} />
          {/* <Route path="/admin" component={Admin} /> */}
          {/* <Route path="/search?" exact component={Search} /> */}
          <Route path="/contact" exact component={Contact} />
          <Route path="/about" exact component={About} />
          <Route path="/history" exact component={History} />
          <Route
            path="/cart"
            exact
            render={props => <Cart {...props} data={this.state.order} />}
          />
          {/* <Route path="/shirt" exact component={Shirt} /> */}
          {/* <Route
            path="/shirt"
            exact
            render={props => <ShowProducts {...props}  Name="Áo" />}
          />
          <Route
            path="/len"
            exact
            render={props => 
              <ShowProducts {...props}    Name="Áo Len" />
            }
          />
          <Route
            path="/thun"
            exact
            render={props => 
              <ShowProducts {...props}   Name="Áo Thun" />
            }
          />
          <Route
            path="/khoac"
            exact
            render={props => 
              <ShowProducts {...props}    Name="Áo Khoác" />
            }
          />
          <Route
            path="/somi"
            exact
            render={props => 
              <ShowProducts {...props}  Name="Áo Sơ Mi" />
            }
          />
          <Route
            path="/trouser"
            exact
            render={props => <ShowProducts {...props}    Name="Quần" />}
          />
          <Route
            path="/sooc"
            exact
            render={props => 
              <ShowProducts {...props}  Name="Quần Sooc" />
            }
          />
          <Route
            path="/jean"
            exact
            render={props => 
              <ShowProducts {...props}   Name="Quần Jean" />
            }
          />
          <Route
            path="/baggy"
            exact
            render={props => 
              <ShowProducts {...props}   Name="Quần Baggy" />
            }
          />
          <Route
            path="/vay"
            exact
            render={props => <ShowProducts {...props}  Name="Váy" />}
          />
          <Route
            path="/dam"
            exact
            render={props => 
              <ShowProducts {...props}  Name="Váy Đầm" />
            }
          />
          <Route
            path="/jum"
            exact
            render={props => 
              <ShowProducts {...props}   Name="Váy Jumsuit" />
            }
          />
          <Route
            path="/yem"
            exact
            render={props => 
              <ShowProducts {...props}  Name="Váy Yếm" />
            }
          /> */}
          {this.showRouter(this.state.datarouter)}
          <Route path="/shirt/aaa" component={Products} />
          <Route path="/product/:name" component={Products} />
          <Route path="/trouser/:name" component={Products} />
          <Route path="/vay/:name" component={Products} />
          <Route path="/search/:name" component={Products} />
        </Switch>
        </div>
        
      </div>
    );
  }
}

export default Body;
