import React,{Component} from 'react';
import Shirt from './Shirt';
import Products from '../Products/Products';
import {
    BrowserRouter as Router,
     Link,Route,Switch
  } from "react-router-dom";
class Routershirt extends Component {
  render() {
        const { match } = this.props
        console.log(match);
        return (
          <Switch>
            <Route exact path={match.path + '/'} component={Shirt} />
          </Switch>
        )
      }
}

export default Routershirt;