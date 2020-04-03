
import React,{Component} from 'react';
import './Order_confirm.css'
import dayjs from "dayjs"
// import toArray from 'dayjs/plugin/toArray'
import axios from "axios";
import Showorder from '../Showorder';
class Order_confirm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            date:dayjs().format("YYYY-MM-DD"),
            data: [],
            data1: [],
            name: "",
            tong: [],loading:0
        };
      }
      componentDidMount() {
        axios.get("/orderadmin2").then(res => {
          // console.log(res.data)
          this.setState({
            data: res.data.data,
            date1:res.data.time,loading:1
          });
        });
      }
      render(){
        console.log('a')
        if (this.state.loading===0){
          return(
              <div className="lds">
                  <div class="lds-hourglass"></div>
              </div>
           )
      } else 
      return(
        <div  className="navright">
            <h1> Đơn Hàng Chờ Xử Lý</h1>
            <div className="order">
              <Showorder link="/orderadmin2" name="Xác Nhận" cl="" cl1="none"></Showorder>
            </div>
        </div>
      )
    }
}
export default Order_confirm;