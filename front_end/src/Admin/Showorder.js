
import React,{Component} from 'react';
// import './Order_confirm.css'
// import dayjs from "dayjs"
// import toArray from 'dayjs/plugin/toArray'
import '../Animate.css'
import axios from "axios";
class Showorder extends Component{
    constructor(props) {
        super(props);
        // console.log(this.props)

        this.state = {
            // date:dayjs().format("YYYY-MM-DD"),
            data: [],
            data1: [],
            name: "",
            tong: [],
            date1:[],
            d:0,
            tb:[]
        };
      }
      onConfirm=(time,index)=>{
        console.log(time);
        axios.post('/confirmorder',{time:time})
        var tb=this.state.tb;
        tb[index]="tb wow animated bounceOutRight"
        this.setState({
          tb:tb
        })
        axios.get(this.props.link).then(res => {
          // console.log(res.data)
          var length=res.data.time.length;
          this.setState({
            data: res.data.data,
            date1:res.data.time,
            tb:Array(length).fill('tb')
          });
        });
      }
      componentDidMount() {
        axios.get(this.props.link).then(res => {
          // console.log(res.data)
          var length=res.data.time.length;

          // console.log(length)
          this.setState({
            data: res.data.data,
            date1:res.data.time,
            tb:Array(length).fill('tb')
          });
        });
      }
      Show1 = (menus,time,name,i) => {
        // console.log(menus,time,name)
        var result = null;
        var tong=0;
        if (menus.length > 0) {
            result = menus.map((menu, index) =>{
                if (menu.time===time && menu.username===name ){
                    tong=tong+menu.NewPrice*menu.soluong;
                    // console.log(index);
                    var link='/product/'+menu.Link
                    return (
                        <div className="row tb1top" >
                            <div className="col-7 row clear">
                                <div className="col-3"><a href={link}><img width="80px" alt="anh" src={"http://localhost:4000/anh/"+menu.Link+'_1'}></img></a></div>
                                <div className="col"></div>
                                <div className="col-8">
                                    <a href={link}><h5>{menu.Name}</h5></a>
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
                return null;
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
      Show = (data, times,name,cl,cl1) => {
        var result = null;
        // var tong=0;
        if (times!==undefined){
        if (times.length > 0) {
          // for (var i=0;i<=times.length-1;i++){
          result = times.map((time, index) => {
            // console.log(time);
            var tb=this.state.tb;
            return (
              <div className={tb[index]}>
                <div className="row">
                  <div className="col-8">
                    <div>HỌ VÀ TÊN: {time.username}</div>
                    <div>NGÀY VÀ GIỜ ĐẶT HÀNG: {time.time}  </div>
                    <div className={cl1}>NGÀY VÀ GIỜ GIAO HÀNG: {time.timenhan}  </div>
                  </div>
                  <div className="col-4">
                       <div className={cl} > <button onClick={()=>this.onConfirm(time,index)}>{name}</button></div>
                  </div>
                </div>
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
                  {this.Show1(data,time.time,time.username,index)}
                </div>
                <div className="t_right">TỔNG TIỀN : {this.state.tong[index]} </div>
              </div>
            );
          });
        } else {
          return(
            <div>
              ko co don hang
            </div>
          )
        }}
        return result;
    
      };
    
      render(){
        // console.log(this.state.data,this.props.data)
        // // if (this.state.data!==this.props.data){
        //   this.data=this.props.data
        // // }
        // console.log(this.props.name)
        // console.log(this.state.tb)
        if (this.props.name==="Xác Nhận")
         {
          return(
            <div>
                  {this.Show(this.state.data, this.state.date1,this.props.name,this.props.cl,this.props.cl1)}
              </div>
            )
         } else {
          return(
            <div>
                  {this.Show(this.props.data, this.props.date1,this.props.name,this.props.cl,this.props.cl1)}
              </div>
        )
         }
        
        
    }
}
export default Showorder;