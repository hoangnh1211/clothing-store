import React,{Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
class Createuser extends Component {
  render(){
  return (
    <div>
      <Form id="form-login" action="create" method="POST">
        <p>
          <label for="name">name: </label>
          <input type="text" id="name" name="name"></input>
        </p>
        <p>
          <label for="username">username: </label>
          <input type="text" id="username" name="username"></input>
        </p>
        <p>
          <label for="pasword">Password: </label>
          <input type="password" id="password" name="password"></input>
        </p>
        <input type="submit" value="Submit"></input>
      </Form>
    </div>
    
  );
}}

export default Createuser;
