import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import './UserCmt.css'
function UserCmt (props){
    const [list,setlist]=useState([])
    const [sentence,setsentence]=useState('')
    const [name,setname]=('hoanganh')
    useEffect(()=>{
        Axios.get("/cmt1").then(res=>{
            setlist(res.data)
        })
    },[list])

    function changeSentence(e){
        setsentence(e.target.value)
        }
    function send(){
        Axios.post('/cmt',{id:props.id,name:name,sentence:sentence})
        setsentence('')
    }
    return(
        <div >
            <div className="product-buttom">
                    <div className="aaa">
                        <div className="aaa1">
                            <p>ĐÁNH GIÁ SẢN PHẨM</p>
                        </div>
                    </div>
                    <div className="user">
                    {list.map(value=>{
                    return(
                        <div className="cmt">
                            <i className="far fa-user"></i>
                            <div className="cmt1">
                                <p>{value.name} <span>{value.time}</span></p>
                                <h5>{value.cmtuser}</h5>

                            </div>
                        </div>
                    )
                })}
                    

                    </div>
                </div>
            <div className="framchat container">
                
                <div className="row" >
                    <div className="col-8" type="text">
                    <textarea type="text" className="tex" name="sentence" value={sentence} onChange={changeSentence}></textarea>
                    </div>
                    <div className="col-1">
                        <button onClick={send}>send </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserCmt;