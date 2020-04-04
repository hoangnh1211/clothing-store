
import React,{Component} from 'react';
import './Addproduct.css'
// import axios from "axios"
import axios from 'axios';
// import { Redirect } from 'react-router';

class Addproduct extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Name:"",
            Price:0,
            NewPrice:0,
            Link:"",
            Description:"",
            name_kodau:"",
            slS:0,
            slM:0,
            slL:0,
            file1:"",
            file2:"",
            file3:"",
            file4:"",
            file5:""
        };
      }
      onChange1=(e)=> {
        var name=e.target.name;
        this.setState({[name]:e.target.files[0]})
      }
      add=(e)=>{
        e.preventDefault();
        var Name=this.state.Name;
        var Price=this.state.NewPrice*1.5;
        var NewPrice=this.state.NewPrice;
        var Link=this.state.Link;
        var Description=this.state.Description;
        var name_kodau=this.state.name_kodau;
        var slS=this.state.slS;
        var slM=this.state.slM;
        var slL=this.state.slL;
        const formData = new FormData();
        // console.log(this.state.file)
        formData.append('file',this.state.file1)
        formData.append('file',this.state.file2)
        formData.append('file',this.state.file3)
        formData.append('file',this.state.file4)
        formData.append('file',this.state.file5)
        const config = {
            headers: {
                authorization:'hoanganh'
            }
        }
        
        axios.post('/addproduct',{Name:Name,Price:Price,NewPrice:NewPrice,Link:Link,Description:Description,name_kodau:name_kodau})
        .then(res=>{
            console.log(res.data);
            if (res.data==="thanhcong"){
                axios.post('/addkho',{Link:Link,slS:slS,slM:slM,slL:slL})
                .then(res=>{
                    if (res.data==="thanhcong"){
                        // alert("Add thành công");
                        // window.location.reload()   
                    }
                })
            }
        })
        .catch(err => console.log(err))
        axios.post('/addimg1',formData,config,{Name:Name,Price:Price,NewPrice:NewPrice,Link:Link,Description:Description,name_kodau:name_kodau})
        .then(res=>{
            console.log(res.data);
        })
        .catch(err => console.log(err))
       } 
       onChange =(e)=>{
        // console.log(e.target)
        var name=e.target.name;
        var value=e.target.value;
        this.setState({
          [name]:value
        })
      }
    render(){
      return(
            <div className="navright">
                <form onSubmit={this.add}  className="formadd " autocomplete="off">
                    <div className="container">
                        <div> 
                            <p> tên sản phẩm</p>
                            <input value={this.state.Name} name="Name" onChange={this.onChange} ></input>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p> Giá Sản Phẩm  </p>
                                <input type="number" min="0" name="NewPrice" value={this.state.NewPrice} onChange={this.onChange} placeholder="0"></input>
                            </div>
                            <div className="col">
                                <p> số lượng size S </p>
                                <input type="number" min="0" value={this.state.slS} name="slS" onChange={this.onChange} placeholder="0"></input>
                            </div>
                            <div className="col">
                                <p> số lượng size M </p>
                                <input type="number" min="0" value={this.state.slM} name="slM" onChange={this.onChange} placeholder="0"></input>
                            </div>
                            <div className="col">
                                <p> số lượng size L </p>
                                <input type="number" min="0" value={this.state.slL} name="slL" onChange={this.onChange} placeholder="0"></input>
                            </div>
                        </div>
                        <div>
                            <p> link </p>
                            <input value={this.state.Link} name="Link" onChange={this.onChange}></input>
                        </div>
                        <div>
                            <p> mô tả sản phẩm </p>
                            <textarea id="ta-04" name="Description"  onChange={this.onChange} value={this.state.Description} ></textarea>
                            <div value={this.state.Description} name="Description"  onChange={this.onChange}></div>
                        </div>
                        <div>
                            <p> tên sản phẩm không dấu </p>
                            <input value={this.state.name_kodau} name="name_kodau" onChange={this.onChange}></input>
                        </div>
                        
                        <div>
                            <p>anh1</p>
                            <input type="file" name="file1" onChange={this.onChange1}></input>
                        </div>
                        <div>
                            <p>anh2</p>
                            <input type="file" name="file2" onChange={this.onChange1}></input>
                        </div>
                        <div>
                            <p>anh3</p>
                            <input type="file" name="file3" onChange={this.onChange1}></input>
                        </div>
                        <div>
                            <p>anh4</p>
                            <input type="file" name="file4" onChange={this.onChange1}></input>
                        </div>
                        <div>
                            <p>anh5</p>
                            <input type="file" name="file5" onChange={this.onChange1}></input>
                        </div>
                        <div>
                            <button type="submit" className="buttonaddproduct btn-primary" > ADD</button>
                         </div>  
                    </div>
                   
                </form>
            </div>
      )
    }
}
export default Addproduct;