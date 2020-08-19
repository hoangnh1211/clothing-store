import React,{Component} from 'react';
// import Frame from '../Frame/Frame';
// import './Search.css'
// import { Form } from 'react-bootstrap';
import './RepairProduct.css'
import './Repair.css'
import axios from "axios"
class Repair extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[],data1:[],
            name:'',loading:0,class:[],search:'',datasearch:[]
        };
      }
      componentDidMount() {
        
        this.alldata()
        axios.get('/search2')
        .then(res=>{
        //   console.log(res.data);
          this.setState({
            name:res.data,loading:1
        });
        })
    }
    alldata=()=>{
        axios.get('/products')
        .then(res=>{
        //   console.log(res.data);
          this.setState({
            data:res.data,loading:1
        });
        })
    }
    changedata(name){
       
        // console.log(name)   
        axios.post("/data",{name:name}).then(res=>{
            axios.post("/datageneral1",{name:res.data,order:"order by Name"}).then(res => {
                console.log(res.data);
                this.setState({
                  data:res.data,loading:1
                });
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
            var data=this.state.data;
            data[index].active=res.data.active
            this.setState({
                data:data
            })
         }   )
    }
    search=(e)=>{
        if (e.key === 'Enter') {
            // console.log(this.state.search)
            axios.post('/searchP',{search:this.state.search}).then(res=>{
                console.log(res.data)
                this.setState({
                    data:res.data
                })
            })
          }
    }
    change=(e)=>{
        this.setState({
            search:e.target.value
        })
    }
    Show = (menus) => {
        var result = null;
        if (menus.length > 0) {
            result = menus.map((menu, index) =>{
                var a=this.state.class
                var link=menu.Link+"_1"
                // console.log(menu)
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
                    <div className="frame" key={menu.id}>
                        
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
        } else {
            return(
                <p> sản phẩm không tồn tại</p>
            )
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
                    {/* <p className="size-20"><b>Tất cả sản phẩm</b></p> */}
                    <div className="container">
                        <div className="navall">
                            <h5> Tìm Kiếm </h5>
                            <input type="search"onKeyDown={this.search} onChange={this.change} ></input>
                            <h5> Thể Loại </h5>
                            <nav className="navigation">
                                <ul className="mainmenu">
                                    <li><p onClick={this.alldata}>Tất cả</p></li>
                                    <li>
                                        <p onClick={()=>this.changedata('shirt')}>Áo</p>
                                        <ul className="submenu">
                                            <li><p onClick={()=>this.changedata('len')}>Áo Len</p></li>
                                            <li><p onClick={()=>this.changedata('thun')}>Áo Thun</p></li>
                                            <li><p onClick={()=>this.changedata('khoac')}>Áo Khoác</p></li>
                                            <li><p onClick={()=>this.changedata('somi')}>Áo Sơ Mi</p></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <p onClick={()=>this.changedata('trouser')}>Quần</p>
                                        <ul className="submenu">
                                            <li><p onClick={()=>this.changedata('sooc')}>Quần Sooc</p></li>
                                            <li><p onClick={()=>this.changedata('jean')}>Quần Jean</p></li>
                                            <li><p onClick={()=>this.changedata('baggy')}>Quần Baggy</p></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <p onClick={()=>this.changedata('vay')}>Váy</p>
                                        <ul className="submenu">
                                            <li><p onClick={()=>this.changedata('dam')}>Váy Đầm</p></li>
                                            <li><p onClick={()=>this.changedata('jum')}>Váy Jumsuit</p></li>
                                            <li><p onClick={()=>this.changedata('yem')}>Váy Yếm</p></li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="naval">
                            <div className=" flex-container ">
                                {this.Show(this.state.data)}
                            </div>
                        </div>
                         
                        {/* <Frame className="flex-left"  anh="111" ten="Váy đầm trắng" gia="320.000"  ></Frame> */}
                    </div>
                    
                </div>
            </div>
        
        )
}}
export default Repair