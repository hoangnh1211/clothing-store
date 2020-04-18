
import React,{Component} from 'react';
import './Order.css'
import dayjs from "dayjs"
import toArray from 'dayjs/plugin/toArray'
import axios from "axios";
import Showorder from '../Showorder';
class Orders extends Component{
    constructor(props) {
        super(props);
        this.state = {
            date:dayjs().format("YYYY-MM-DD"),
            data: [],
            data1: [],
            name: "",
            tong: [],
            date1:[],
            loading:0
        };
      }
      componentDidMount() {
        var now=dayjs();
            var date=now.format("YYYY-MM-DD")
            var tomorow=now.add(1,"day").format("YYYY-MM-DD");
           axios.post("/orderadmin",{date:date,tomorow:tomorow}).then(res => {
          // console.log(res.data)
          this.setState({
            data: res.data.data,
            date1:res.data.time,loading:1
          });
        });
      }
    onChange =(e)=>{
        // console.log(e.target)
        dayjs.extend(toArray);
        var name=e.target.name;
        var value=e.target.value;
        this.setState({
          [name]:value
        })
        var tomorow=dayjs(value).add(1, 'day').format("YYYY-MM-DD");
      
        // tomorow=tomorow.toArray()
        // var value2=tomorow[0]+'-'+(tomorow[1]+1)+'-'+tomorow[2]
        axios.post('/orderadmin',{date:e.target.value,tomorow:tomorow})
        .then(res=>{
          // console.log("a",res.data.data)
          this.setState({
            data: res.data.data,
            date1:res.data.time
          });
        })
        .catch(err => console.log(err))
      }
      render(){
        if (this.state.loading===0){
          return(
              <div className="lds">
                  <div className="lds-hourglass"></div>
              </div>
           )
      } else 
      return(
        <div  className="navright">
            <h1> Đơn Hàng</h1>
            <div className="order">
                <input type="date" name="date" value={this.state.date} onChange={this.onChange} ></input>
                <Showorder data={this.state.data} date1={this.state.date1} name="none" cl="none" cl1=""></Showorder>
            </div>
            <div>

            </div>
        </div>
      )
    }
}
export default Orders;