
import React,{Component} from 'react';
import './Admin.css'
// import axios from "axios"
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
class Admin extends Component{
    render(){
      return(
        <Router>
            <div className="headeradmin">
                <img src="http://localhost:4000/logo"  className="logo" alt="a"></img>
            </div>
            <div className="cac">
                <div className="nav1">
                    <ul>
                        <Link to='/admin'><li><i className="fas fa-plus"></i>Dashboard</li></Link>
                        <Link to='/admin/addproduct'><li><i className="fas fa-plus"></i>Thêm sản phẩm</li></Link>
                        <Link to='/admin/repairproduct'><li><i className="fas fa-plus"></i>Sửa sản phẩm</li></Link>
                        <Link to='/admin/order'><li><i className="fas fa-plus"></i>Đơn hàng</li></Link>
                        <Link to='/admin/order_confirm'><li><i className="fas fa-plus"></i>Đơn hàng Xử Lý</li></Link>
                        <li><i className="fas fa-plus"></i>Thêm sản phẩm</li>
                    </ul>
                </div>
                <Route path='/admin' exact component={HomeAdmin}></Route>
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