import React,{Component} from 'react';
import './Products.css';
import axios from "axios";
import ReactImageZoom from 'react-image-zoom';
import { Link } from 'react-router-dom';
import '../../loading.css'
class Products extends Component{
    constructor(props) {
        super(props);
     
        this.state = {
            data:{},
            new: "",
            soluong:1,
            id:1,
            class1:["col a",'col a1','col a1'],
            size:"S",
            link:'login1',
            a1:"none",
            a2:"block",
            linkimg:'_1',
            sl:0,loading:0
        };
      }
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
      componentDidMount() {
        this.scrollToTop();
        var {match}=this.props;
        axios.post("/getproduct",{link:match.params.name}).then(
            res=>{
                // console.log(res.data[0])
                if (res.data[0]!==undefined){
                    this.setState({
                        data:res.data[0],sl:res.data[0].sizeS  ,loading:1  
                    });
                }
                
                // console.log(this.state.data)
            }
        )   
        // axios.get('/products')
        // .then(res=>{
        // //   console.log(res.data);
        //   var {match}=this.props;
        // //   console.log(match.params.name);
        //   res.data.map((menu, index) =>{
        //     if (menu.Link==match.params.name) {
        //         this.setState({
        //             data:menu,sl:menu.sizeS    
        //         });
        //         // console.log(menu);
        //         return;
        //     }
        // })
        // })
        axios.get('/test')
            .then(res=>{
                this.setState({
                name:res.data
            });
                if (res.data!=="chua dang nhap"){
                this.setState({
                a1:"block",a2:'none'
            });} else {
                this.setState({
                    a2:"block",a1:'none'
            });
            }
            })
    }
    up = () => {
            var d=this.state.soluong ;
            if (d<this.state.sl) d=d+1;
            this.setState({
                soluong:d
            });
    }
    down = () => {
            var d=this.state.soluong;
            if (d>1) d=d-1;
            this.setState({
                soluong:d
            });
    }
    clicksize = (dem) => {
        var newArray=["col a1",'col a1','col a1'];
        var newArray1=["S","M","L",""];
        var abc=newArray1[dem];
        var sl=0;
        var data=this.state.data;
        if (dem===0) sl=data.sizeS; else if (dem===1) sl=data.sizeM; else sl=data.sizeL 
        newArray[dem]="col a";
        var soluong=this.state.soluong;
        if (soluong>sl) soluong=sl;
        this.setState({
            class1:newArray,
            size:abc,sl:sl,
            soluong:soluong
        });
    }
    add=()=>{
        var data=this.state.data;
        var id=data.id;
        var soluong=this.state.soluong;
        var size=this.state.size;
        var name=data.Name;
        var gia=data.NewPrice;
        var link=data.Link;
        console.log(data);
        console.log(id,name,gia);
        axios.post('/add',{id:id,soluong:soluong,size:size,name:name,gia:gia,link:link})
        .then(res=>{
            console.log(res.data);
        })
        .catch(err => console.log(err))
       }
    changlinkimg=(link)=>{
        this.setState({
            linkimg:link
        })
        // console.log(link)
    }
    onChange=(e)=>{
        var value=e.target.value;
        if (value>this.state.sl) value=this.state.sl;
        if (value<=0) value=1;
        this.setState({
            soluong:value
        })
        console.log(e.target)
    }
    
    render(){
        // var styleimg = {width:362,zoomWidth:362,zoomPosition:'original',img: 'http://localhost:4000/anh/thun1_1'};
        var {match}=this.props;
        // console.log(match.params.name);
        // console.log(this.state.data);
        var data=this.state.data;
        // var link1="http://localhost:3000/product/"+match.params.name;
        var link='http://localhost:4000/anh/'+match.params.name;
        // console.log(link+'_to2');
        // var styleimg = {width:362,zoomWidth:362,zoomPosition:'original',img: link+'_1'};
        var style={width:80,margin:10}
        if (this.state.loading===0){
            return(
                <div className="lds">
                    <div className="lds-hourglass"></div>
                </div>
             )
        } else{
        return(
            <div className="product">
                <pre className="color-darkgray">HOME  <i className="fas fa-arrow-right color-black"></i> <b className="color-black"> {data.Name} </b></pre>
                <div className="boder-product">
                    <div className=" row ">
                        <div className=" col-6 ">
                            {/* <a href={link+'_1'} className="MagicZoom abc24" id="trainer"  data-options="zoomPosition: inner"><img src={link+'_to1'}></img></a> */}
                            <div className="abc24 img1">
                            <ReactImageZoom width={362} zoomWidth={362} zoomPosition='original' img= {link+this.state.linkimg} />
                            </div>
                            
                            <div className="abc2" >
                                <img alt="anh" onMouseMove={()=>this.changlinkimg('_1')} style={style} src={link+'_1'}></img>
                                <img alt="anh" onMouseMove={()=>this.changlinkimg('_2')} style={style} src={link+'_2'}></img>
                                <img alt="anh" onMouseMove={()=>this.changlinkimg('_3')} style={style} src={link+'_3'}></img>
                                <img alt="anh" onMouseMove={()=>this.changlinkimg('_4')} style={style} src={link+'_4'}></img>
                                <img alt="anh" onMouseMove={()=>this.changlinkimg('_5')} style={style} src={link+'_5'}></img>
                            </div>
                        </div>
                        <div className="col"></div>
                        <div className="col-5">
                            <p className="name-product">{data.Name}</p>
                            <p className="gia">
                                <span className="giacu"> {data.NewPrice*1.5+'đ'}</span>
                                <span className="giamoi"> {data.NewPrice +"đ"}</span>
                            </p>
                            <div className="sizeM">
                                <p>SIZE <b className="color-red">{this.state.size} *</b></p>
                                <div className="row" >
                                    <div className='col row'>
                                        <div className={this.state.class1[0]} onClick={() =>  this.clicksize(0)} >
                                            <button className="size tooltip1">S<span className="tooltiptext1">S</span></button>
                                        </div>
                                        <div className={this.state.class1[1]} onClick={() =>  this.clicksize(1)}>
                                            <button className="size tooltip1">M<span className="tooltiptext1">M</span></button>
                                        </div>
                                        <div className={this.state.class1[2]} onClick={() =>  this.clicksize(2)}>
                                            <button className="size tooltip1">L<span className="tooltiptext1">L</span></button>
                                        </div>
                                    </div>
                                    <div className='col'></div>
                                    <div className='col'></div>
                                </div>
                            </div>
                            <p className="color-red">* Thông tin bắt buộc</p>
                            <div className="row">
                                <div className="col-6 row aa111">
                                    <button className="col-3 a12 tooltip1" onClick={this.down}>
                                        <b>-</b>
                                        <span className="tooltiptext1">decrease</span>   
                                    </button>
                                    <div className="col-5 a12">
                                        <input type="number" className="inputsl" onChange={this.onChange} value={this.state.soluong}  pattern="[0-9]"></input>
                                        {/* <input type="text" onkeypress='return event.charCode >= 48'></input> */}
                                    </div>

                                    <button className="col-3 a12 tooltip1" onClick={this.up}>
                                        <b>+</b>
                                        <span className="tooltiptext1">increase</span>
                                    </button>
                                </div>
                                <div className="col-6">{this.state.sl} sản phẩm có sẵn</div> 
                            </div>
                            <a href={match.params.name} className={this.state.a1}><button className="add hvr-sweep-to-left1" onClick={this.add}>THÊM VÀO GIỎ HÀNG</button></a>
                            <Link to='/login1' className={this.state.a2}><button className="add hvr-sweep-to-left1">THÊM VÀO GIỎ HÀNG</button></Link>
                            <p>MÔ TẢ SẢN PHẨM</p>
                            <p>{data.Description}</p>
                        </div>
                    </div>
                </div>
                <div className="product-buttom">
                    <div className="aaa">
                        <div className="aaa1">
                            <p>THÔNG TIN SẢN PHẨM</p>
                        </div>
                    </div>
                    <div className="aaa2"><p>{data.Description}</p></div>
                </div>
                <div className="product-buttom">
                    <div className="aaa">
                        <div className="aaa1">
                            <p>ĐÁNH GIÁ SẢN PHẨM</p>
                        </div>
                    </div>
                    <div className="user">
                    <i className="far fa-user"></i>
                    </div>
                </div>
            </div>
        )}
}}
export default Products