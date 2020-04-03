import React,{Component} from 'react';
import Banner from './Banner/Banner';
import NewProduct from './New-product/New';
class Home extends Component{
    render(){
        return(
            <div>
                <Banner></Banner>
                <NewProduct></NewProduct>
            </div>
        )
}}
export default Home