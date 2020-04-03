import React, { Component } from "react";
import "./History.css";
import axios from "axios";
import {Redirect, Link } from "react-router-dom";
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data1: [],
      name: "",
      classconfirm:"t_3",
      classhistory:"t_2",
      tong: [],loading:0
    };
  }
  componentDidMount() {
    axios.get("/test").then(res => {
      //   console.log(res.data);
      this.setState({
        name: res.data,loading:1
      });
    });
    axios.get("/order_confirm1").then(res => {
      this.setState({
        data: res.data,loading:1
      });
    });
    axios.get("/order_confirm1_time").then(res => {
      this.setState({
        data1: res.data,loading:1
      });
    });
    
  }
  onConfirm=()=>{
    this.setState({
      classhistory: "t_2",
      classconfirm:'t_3',loading:0
    });
    axios.get("/order_confirm1").then(res => {
      this.setState({
        data: res.data,loading:1
      });
    });
    axios.get("/order_confirm1_time").then(res => {
      this.setState({
        data1: res.data,loading:1
      });
    });
  }
  onHistory=()=>{
    this.setState({
      classhistory: "t_3",
      classconfirm:'t_2',loading:0
    });
    axios.get("/history1").then(res => {
      this.setState({
        data: res.data,loading:1
      });
    });
    axios.get("/history_time").then(res => {
      this.setState({
        data1: res.data,loading:1
      });
    });
  }
  
  Show1 = (menus,name,i) => {
    var result = null;
    var tong=0;
    if (menus.length > 0) {
        result = menus.map((menu, index) =>{
            if (menu.time===name ){
                tong=tong+menu.NewPrice*menu.soluong;
                // console.log(index);
                var link='/product/'+menu.Link
                return (
                    <div className="row tb1top" >
                        <div className="col-7 row clear">
                            <div className="col-2"><Link to={link}><img width="80px" alt="anh" src={"http://localhost:4000/anh/"+menu.Link+'_1'}></img></Link></div>
                            <div className="col-9">
                                <Link to={link}><h5>{menu.Name}</h5></Link>
                                <h6>Size:  {menu.size}</h6>
                            </div>
                        </div>
                        <div className="col-5 row t1t1">
                            <div className="col-4"><p>{menu.NewPrice}</p></div>
                            <div className="col-4">
                                <p>{menu.soluong} </p>
                            </div>
                            <div className="col-4"><p>{menu.NewPrice*menu.soluong}</p></div>
                        </div>
                    </div>
                )
            }
            return result;
            // i=i+1;
        })
        if (tong!==this.state.tong[i]){
            var t=this.state.tong;
            t[i]=tong;
            this.setState({
                tong:t
            });
        }
        
    }
    return result;
}
  Show = (data, times) => {
    var result = null;
    // console.log(data, times);
    // console.log(times.length);
    // var tong=0;
    if (times.length > 0) {
      // for (var i=0;i<=times.length-1;i++){
      result = times.map((time, index) => {
          // console.log(data)
        return (
          <div className="tb">
            <div>NGÀY VÀ GIỜ: {time.time} </div>
            <div className="tb1">
              <div className="row tb1top">
                <div className="col-7 clear">
                  <p className="">TÊN SẢN PHẨM</p>
                </div>
                <div className="col-5 row">
                  <div className="col-4">
                    <p>GIÁ TIỀN</p>
                  </div>
                  <div className="col-4">
                    <p>SỐ LƯỢNG</p>
                  </div>
                  <div className="col-4">
                    <p>CỘNG</p>
                  </div>
                </div>
              </div>
              {this.Show1(data,time.time,index)}
            </div>
            <div className="t_right">TỔNG TIỀN : {this.state.tong[index]} </div>
          </div>
        );
      });
    }
    return result;

  };

  render() {
    
    if (this.state.loading===0) {
      return(
        <div className="lds">
            <div class="lds-hourglass"></div>
        </div>
      )
    } else if (this.state.name === 'chua dang nhap') {
      return <Redirect to="/login1"/>
    } else
    return (
      <div className="cart">
        <div  className="t_1">
          <b onClick={this.onConfirm}> <Link className={this.state.classconfirm}> CHỜ XỬ LÝ </Link></b>  <b onClick={this.onHistory}><Link className={this.state.classhistory}> LỊCH SỬ MUA HÀNG </Link></b> 
        </div>

        {this.Show(this.state.data, this.state.data1)}
      </div>
    );
  }
}
export default History;
