import React,{Component} from 'react';
import './New.css'
import NewTop from './NewTop';
import NewBottom from './Newbottom';
class NewProduct extends Component{
    
    render(){
        return(
            <div className="new-product">
                <NewTop></NewTop>
                <NewBottom></NewBottom>
            </div>
        )
}}
export default NewProduct