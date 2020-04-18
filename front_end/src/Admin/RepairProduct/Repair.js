import React,{Component} from 'react';
// import Frame from '../Frame/Frame';
// import './Search.css'
// import { Form } from 'react-bootstrap';
import './RepairProduct.css'
import axios from "axios"
class Repair extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[],data1:[],
            name:'',loading:0,class:[]
        };
      }
      componentDidMount() {
        axios.get('/products')
        .then(res=>{
        //   console.log(res.data);
          this.setState({
            data:res.data,loading:1
        });
        })
        
        axios.get('/search2')
        .then(res=>{
        //   console.log(res.data);
          this.setState({
            name:res.data,loading:1
        });
        })
    }
    deleteP(id,link){
        axios.post("/deleteP",{id:id,link:link})
        .then(res=>{
            var al="xóa thành công sản phẩm Id : "+id
            // if (res.data==="thanh cong"){
                alert(al);
                window.location.reload()
            // }
        })
        // console.log(id,link)
    }
    active(id,active,index){
        axios.post("/activeP",{id:id,active:active})
        .then(res=>{
            axios.get('/products')
                .then(res=>{
                console.log(res.data);
                this.setState({
                    data:res.data,loading:1
                });
                })
                
            }
        )
    }
    
    Show = (menus) => {
        var result = null;
        if (menus.length > 0) {
            result = menus.map((menu, index) =>{
                var a=this.state.class
                var link=menu.Link+"_1"
                
                if (menu.active===1){
                    if (a[index]!=="fas fa-pause"){
                        a[index]="fas fa-pause"
                        this.setState({
                            class:a
                        })
                    }
                } else {
                    if (a[index]!=="fas fa-play"){
                        a[index]="fas fa-play"
                        this.setState({
                            class:a
                        })
                    }
                }
                // var name=this.props.to;
                var anh ='http://localhost:4000/anh/' + link;
                // var anhhover='http://localhost:4000/anh/'+menu.Link+"_3";
                return(
                    <div className="frame" key={menu.Link}>
                        
                            <div className="container1">
                                <img className="img1" src={anh} alt="Avatar"></img>
                                <div className="overlay">
                                {/* <img className="img1"alt="anh" src={anhhover}></img> */}
                                    <div className="infor">
                                        <div>
                                            <button><a href={`/admin/repairproduct/${menu.Link}`}  ><i className="fas fa-cog"></i></a></button>
                                        </div>
                                        <div>
                                            <button onClick={()=>this.deleteP(menu.id,menu.Link)}><i className="fas fa-trash-alt"></i></button>
                                        </div>
                                        <div>
                                            <button onClick={()=>this.active(menu.id,menu.active,index)}><i className={this.state.class[index]}></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="frame-p">{menu.Name} </p>
                            <b>
                                <span className="frame-giacu"> {menu.Price+'đ'}</span>
                                <span className="frame-giamoi"> {menu.NewPrice +"đ"}</span>
                            </b>
                        
                        
                    </div>
                )
            })
        }
        return result;
    }
    render(){
        // console.log(this.state.data)
        if (this.state.loading===0){
            return(
                <div className="lds">
                    <div className="lds-hourglass"></div>
                </div>
             )
        } else 
        return(
            <div className="navright">
                <div className="shirt">
                    {/* <pre className="color-darkgray">HOME <i class="fas fa-arrow-right color-black"></i> <b className="color-black"> Search</b>  </pre> */}
                    <p className="size-20"><b>Tất cả sản phẩm</b></p>
                    <div className="container">
                         <div className=" flex-container ">
                        
                            {this.Show(this.state.data)}
                        </div>
                        {/* <Frame className="flex-left"  anh="111" ten="Váy đầm trắng" gia="320.000"  ></Frame> */}
                    </div>
                    
                </div>
            </div>
        
        )
}}
export default Repair