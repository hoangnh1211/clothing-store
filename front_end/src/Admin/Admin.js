
import React,{Component} from 'react';
import './Admin.css'
import axios from "axios"
// import axios, { post } from 'axios';
import {
    BrowserRouter as Router,
    Route,Link
} from "react-router-dom";
import Addproduct from './Addproduct/Addproduct';
import HomeAdmin from './Dashboard/Dashboard';
import Repair from './RepairProduct/Repair';
import Repairproduct from './RepairProduct/RepairProduct';
import Orders from './Order/Order';
import Order_confirm from './Order_confirm/Order_confirm';
import {Redirect} from 'react-router-dom'
class Admin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name:""
        };
      }
    componentDidMount(){
        axios.get("/testadmin").then(res=>{
            console.log(res.data)
            this.setState({
                name:res.data
            })
        })
    }
    logout(){
        axios.get('/logoutadmin').then(res=>{console.log(res)
            window.location.reload()   
        })
        .catch(err=>console.log(err))
       }
    render(){
        if (this.state.name === 'chua dang nhap') {
            return <Redirect to="/"/>
          }
      return(
        <Router>
            <div className="headeradmin">
                
                <div className="row">
                <div className="col"><img src="http://localhost:4000/logo"  className="logo" alt="a"></img></div>
                <div className="col">
                    <h1 >Admin : {this.state.name}</h1>
                </div>
                <div className="col">
                    <button onClick={this.logout}>Đăng Xuất</button>
                </div>
            </div>
            </div>
            <div className="cac">
                <div className="nav1">
                    <ul>
                        <Link to='/admin'><li><i className="fas fa-chart-bar"></i>Dashboard</li></Link>
                        <Link to='/admin/addproduct'><li><i className="fas fa-plus"></i>Thêm sản phẩm</li></Link>
                        <Link to='/admin/repairproduct'><li><i className="fas fa-cog"></i>Sửa sản phẩm</li></Link>
                        <Link to='/admin/order'><li><i className="fas fa-history"></i>Đơn hàng đã giao</li></Link>
                        <Link to='/admin/order_confirm'><li><i className="fas fa-shopping-cart"></i>Đơn hàng chờ Xử Lý</li></Link>
                    </ul>
                </div>
                {/* <Route path='/admin' exact component={HomeAdmin}></Route> */}
                <Route
                    path='/admin'
                    exact
                    render={props => 
                    <HomeAdmin {...props}   Name={this.state.name} />
                    }/>
                <Route path='/admin/addproduct' exact component={Addproduct}></Route>
                <Route path='/admin/repairproduct' exact component={Repair}></Route>
                <Route path='/admin/order' exact component={Orders}></Route>
                <Route path='/admin/order_confirm' exact component={Order_confirm}></Route>
                <Route path='/admin/repair' exact component={Repair}></Route>
                <Route path='/admin/repairproduct/:name' exact component={Repairproduct}></Route>
            </div>
        </Router>
      )
    }
}
export default Admin;