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

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      name: "",
      dem: [],
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
  }

  mo=()=>{
    if (this.state.class==="col-6"){
      this.setState({
        class:"col-6 animated bounceIn"
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
    return (
      <div className="body">
        <div className={this.props.class}>
          <div className="subnav">
          <button className="subnavbtn">
              <Link to="/" ><b className="size25"><i className="fas fa-home"></i></b></Link>
            </button>
          </div>
          
          <div onMouseEnter={this.mo} onClick={this.scrollToTop} onMouseLeave={this.mo1} className="subnav">
            <button  className="subnavbtn">
              <Link to="/shirt"><b className="size25">Áo</b></Link>
            </button>
            <div  className=" subnav-content ">
              <div className="row">
                <div className={this.state.class}>
                  <div className="abc1">
                    <b >Áo</b>
                  </div>
                  <Link to="/shirt_len">
                    <div className="abcd">Áo len</div>
                  </Link>
                 
                  <Link to="/shirt_thun">
                    <div className="abcd">Áo thun</div>
                  </Link>
                  <Link to="/shirt_khoac">
                    <div className="abcd">Áo khoác</div>
                  </Link>
                  <Link to="/shirt_somi">
                    <div className="abcd">Áo sơ mi</div>
                  </Link>
                </div>
                <div className="col-6">
                  <img
                    className="img" alt="anh"
                    src="http://localhost:4000/anh/menu-ao-92w"
                  ></img>
                </div>
              </div>
            </div>
          </div>
          <div onMouseOver={this.mo} onClick={this.scrollToTop} onMouseOut={this.mo1} className="subnav">
            <button className="subnavbtn">
              <Link to="/trouser"><b className="size25">Quần</b></Link>
            </button>
            <div className=" subnav-content ">
              <div className="row">
                <div className={this.state.class}>
                  <div className="abc1">
                    <b>Quần</b>
                  </div>
                  <Link to="/trouser_sooc">
                    <div className="abcd">Quần Sooc</div>
                  </Link>
                  <Link to="/trouser_jean">
                    <div className="abcd">Quần Jean</div>
                  </Link>
                  <Link to="/trouser_baggy">
                    <div className="abcd">Quần Baggy</div>
                  </Link>
                </div>
                <div className="col-6">
                  <img className="img1" alt="anh" src="http://localhost:4000/92quan"></img>
                </div>
              </div>
            </div>
          </div>
          <div onMouseOver={this.mo} onClick={this.scrollToTop} onMouseOut={this.mo1} className="subnav">
            <button className="subnavbtn">
              <Link to="/vay"><b className="size25">Váy</b></Link>
            </button>
            <div className=" subnav-content ">
              <div className="row">
                <div className={this.state.class}>
                  <div className="abc1">
                    <b>Váy</b>
                  </div>
                  <Link to="/vay_yem">
                    <div className="abcd">
                      <pre>Yếm       </pre>
                    </div>
                  </Link>
                  <Link to="/vay_jum">
                    <div className="abcd">
                      <pre>Jum      </pre>
                    </div>
                  </Link>
                  <Link to="/vay_dam">
                    <div className="abcd">Đầm</div>
                  </Link>
                </div>
                <div className="col-6">
                  <img className="img1" alt="anh" src="http://localhost:4000/92vay"></img>
                </div>
              </div>
            </div>
          </div>
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
          <Route
            path="/shirt"
            exact
            render={props => <ShowProducts {...props}  datas={['len','thun','khoac','somi']}  Name="Áo" />}
          />
          <Route
            path="/shirt_len"
            exact
            render={props => 
              <ShowProducts {...props}  datas={['len']}  Name="Áo Len" />
            }
          />
          <Route
            path="/shirt_thun"
            exact
            render={props => 
              <ShowProducts {...props}  datas={['thun']} Name="Áo Thun" />
            }
          />
          <Route
            path="/shirt_khoac"
            exact
            render={props => 
              <ShowProducts {...props}  datas={['khoac']}  Name="ÁO Khoác" />
            }
          />
          <Route
            path="/shirt_somi"
            exact
            render={props => 
              <ShowProducts {...props}  datas={['somi']} Name="Áo Sơ Mi" />
            }
          />
          <Route
            path="/trouser"
            exact
            render={props => <ShowProducts {...props}   datas={['sooc','jean','baggy']} Name="Quần" />}
          />
          <Route
            path="/trouser_sooc"
            exact
            render={props => 
              <ShowProducts {...props}  datas={['sooc']} Name="Quần Sooc" />
            }
          />
          <Route
            path="/trouser_jean"
            exact
            render={props => 
              <ShowProducts {...props}  datas={['jean']} Name="Quần Jean" />
            }
          />
          <Route
            path="/trouser_baggy"
            exact
            render={props => 
              <ShowProducts {...props}  datas={['baggy']} Name="Quần Baggy" />
            }
          />
          <Route
            path="/vay"
            exact
            render={props => <ShowProducts {...props}  datas={['dam','jum','yem']}  Name="Váy" />}
          />
          <Route
            path="/vay_dam"
            exact
            render={props => 
              <ShowProducts {...props}  datas={['dam']} Name="Váy Đầm" />
            }
          />
          <Route
            path="/Vay_jum"
            exact
            render={props => 
              <ShowProducts {...props}  datas={['jum']} Name="Váy Jumsuit" />
            }
          />
          <Route
            path="/vay_yem"
            exact
            render={props => 
              <ShowProducts {...props}  datas={['yem']} Name="Váy Yếm" />
            }
          />
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
