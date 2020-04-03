import React,{Component} from 'react';
import './Cart.css'
import axios from "axios"
import {Redirect, Link} from 'react-router-dom'
class Cart extends Component{
    constructor (props) {
        super(props)
        this.state = {
          order:[],
          order1:[],
          name:'',
          tong:0,
          value:2,
          dem:[],
          cl:"ca-button hvr-sweep-to-left-black none",
          cl1:"ca-button hvr-sweep-to-left-black ",
          tt:""
        }
     }
    componentDidMount() {
        axios.get('/order')
        .then(res=>{
          console.log(res.data);
        if (res.data.length>0){
            this.setState({
                cl:"ca-button hvr-sweep-to-left-black",
                cl1:"ca-button hvr-sweep-to-left-black none"
            })
        } else {
            this.setState({
                cl1:"ca-button hvr-sweep-to-left-black",
                cl:"ca-button hvr-sweep-to-left-black none"
            })
        }
          this.setState({
            order:res.data
            // order1:res.data
        });
        })
        axios.get('/order1')
        .then(res=>{
        //   console.log(res.data);
          this.setState({
            // order:res.data
            order1:res.data
        });
        })
        axios.get('/test')
        .then(res=>{
        //   console.log(res.data);
          this.setState({
            name:res.data,
            tt:res.data
        });
        })
    }
    de=(a,b)=>{
        console.log();
        axios.post('/delete',{id:a,size:b})
        .then(res=>{
         console.log(res.data);
        //  this.setState({search:res.data})
       })
        .catch(err => console.log(err))
    }
    update = () =>{
        // var {data}=this.props.order;
        console.log(this.state.order)
        axios.post('/update',{data:this.state.order})
        .then(res=>{
         console.log(res.data);
        //  this.setState({search:res.data})
       })
        .catch(err => console.log(err))
      }
      tt = () =>{
          var data=this.state.order,data1=this.state.order1;
        //   console.log("data",this.state.order,'data1:',this.state.order1);
          for ( var i=0;i<=data.length-1;i++)
            data1[i].soluong=data1[i].soluong-data[i].soluong;
            console.log('data:',data1);
            axios.post('/update',{data:data1})
            .then(res=>{
            console.log(res.data);
            //  this.setState({search:res.data})
        })
            .catch(err => console.log(err))
            axios.post('/thanhtoan',{data:data})
            .then(res=>{
            console.log(res.data);
            //  this.setState({search:res.data})
        })
            .catch(err => console.log(err))
      }
      cl = () =>{
        // var {data}=this.props.order;
        console.log(this.state.order)
        axios.post('/clear',{data:this.state.order})
        .then(res=>{
         console.log(res.data);
        //  this.setState({search:res.data})
       })
        .catch(err => console.log(err))
      }
    //   a{}
    Show = (menus,name) => {
        var result = null;
        var tong=0;
        if (menus.length > 0) {
            result = menus.map((menu, index) =>{
                if (menu.username===name ){
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
                                <div className="col-3">
                                    <input type="number" value={menu.soluong} min="0"  onChange={e=>{
                                        var a=this.state.order;
                                        // var b=this.state.order1;
                                        // console.log(b[index].soluong,b[index].soluong-Number(e.target.value),Number(e.target.value))
                                        // console.log(a,b)
                                        // b[index].soluong=b[index].soluong-Number(e.target.value);
                                        a[index].soluong=Number(e.target.value);
                                        // console.log(a,b)
                                        this.setState({order:a});
                                        // console.log(this.state.order,this.state.order1)
                                        // console.log(b[index].soluong,b[index].soluong-Number(e.target.value),Number(e.target.value))
                                    }}></input>
                                </div>
                                <div className="col-4"><p>{menu.NewPrice*menu.soluong}</p></div>
                                <div className="col-1" onClick={this.de.bind(this,menu.id,menu.size)} ><a href="/cart"><i class="fas fa-times" ></i></a></div>
                            </div>
                        </div>
                    )
                }
                return null
                // i=i+1;
            })
            if (tong!==this.state.tong)
            this.setState({
                tong:tong
            });
            if (this.state.tong>0){
                if (this.state.cl!=="ca-button hvr-sweep-to-left-black" && this.state.cl1!=="ca-button hvr-sweep-to-left-black none")
                this.setState({
                    cl:"ca-button hvr-sweep-to-left-black",
                    cl1:"ca-button hvr-sweep-to-left-black none"
                })
            } else {
                if (this.state.cl1!=="ca-button hvr-sweep-to-left-black" && this.state.cl!=="ca-button hvr-sweep-to-left-black  none")
                this.setState({
                    cl1:"ca-button hvr-sweep-to-left-black",
                    cl:"ca-button hvr-sweep-to-left-black none"
                })
            }
        }
        return result;
    }
    tb=()=>{
        var ab=this.state.order;
        var t=this.state.tong;
        if (ab.length>0 && t===0){alert("bạn chưa chọn mua sản phẩm nào")}
            else {
                alert("bạn không có sản phẩm nào");
            }
        
    }

  render(){
    //   var data=this.props.data;
    //   console.log(this.state.order);
    //   var d=data[0] || {soluong:1};
    // console.log(this.state.name)
    if (this.state.tt === 'chua dang nhap') {
      return <Redirect to="/login1"/>
    }
    var tt=this.state.tt;
    // console.log(tt);
    if (tt !==""){
        return(
            <div className="cart">
                <p><b>GIỎ HÀNG </b></p>
                <div className="tb">
                    <div className="tb1">
                        <div className="row tb1top">
                            <div className="col-7 clear"><p className="">TÊN SẢN PHẨM</p></div>
                            <div className="col-5 row">
                                <div className="col-4"><p>GIÁ TIỀN</p></div>
                                <div className="col-3"><p>SỐ LƯỢNG</p></div>
                                <div className="col-4"><p>CỘNG</p></div>
                                <div className="col-1"></div>
                            </div>
                        </div>
                        {this.Show(this.state.order,this.state.name)}
                        
                        <div className="row tb1top" >
                            <div className="col-7 clear">
                                <a href="/cart"><button className="cart-button hvr-sweep-to-left-black" onClick={this.cl} ><b>XÓA GIỎ HÀNG</b></button></a>
                            </div>
                            <div className="col-5 row">
                                <div className="col-7 c">
                                    <a href="/"><button className="cart-button hvr-sweep-to-left-black"><b>TIẾP TỤC MUA HÀNG</b></button></a>
                                </div>
                                <div className="col-5 c">
                                    <a href="/cart"><button className="cart-button hvr-sweep-to-left-black" onClick={this.update}><b>CẬP NHẬT</b></button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-7"></div>
                    <div className="col-5 tb2 ">
                        <div className="row">
                            <div className="col-8">
                                Cộng
                            </div>
                            <div className="col-4">
                                {this.state.tong}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                              <p>Shipping &#38; Handling (Phí vận chuyển)</p>
                            </div>
                            <div className="col-4">
                                0
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <b>Tổng</b>
                            </div>
                            <div className="col-4">
                                <b>{this.state.tong}</b>
                            </div>
                        </div>
                        <button className={this.state.cl1} onClick={this.tb} ><b>THANH TOÁN</b></button>
                        <a href="history"><button className={this.state.cl} onClick={this.tt} ><b>THANH TOÁN</b></button></a>
                    </div>
                </div>
            </div>
          )
    } else{
        return(
            <div className="lds">
                    <div class="lds-hourglass"></div>
                </div>
        )
    }
      
  }
}
export default Cart;