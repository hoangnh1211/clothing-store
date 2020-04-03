import React,{Component} from 'react';
import {
    BrowserRouter as Router,
 Switch
  } from "react-router-dom";
// import Contact from './Contact/Contact';
// import Shirt from './Shirt/Shirt';
class Out extends Component{
    render(){
        return(
            <Router >
                <Switch>
                    {/* <Route path="/"  component={Home} /> */}
                    {/* <Route path="/contact" exact component={Contact} /> */}
                    {/* <Route path="/shirt" exact component={Shirt} />     */}
                </Switch>
                {/* <Shirt></Shirt> */}
            </Router>
        )
}}
export default Out