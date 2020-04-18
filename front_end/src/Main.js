import React,{Component} from 'react';
import './Main.css';
import Header from './Header/Header';
import Body from './Body/Body';
import Footer from './Footer/Footer';

class Main extends Component{
  constructor(props) {
    super(props);
    this.state = {
      prevScrollpos: window.pageYOffset,
      class:"navbar1",
      top:"return-to-top none",
      bottom:"return-to-bottom",
      height:1000000000
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    
  }
  
  handleScroll = () => {

    const currentScrollPos = window.pageYOffset;
    this.setState({
      prevScrollpos: currentScrollPos
    });
    // console.log(this.state.prevScrollpos)
    if (this.state.prevScrollpos>141){
      this.setState({
        class:"navbar1 navbar2",
        top:"return-to-top"
      })
    } else {
      this.setState({
        class:"navbar1",
        top:"return-to-top none"
      })
    }
    if (this.state.height-this.state.prevScrollpos===979){
      this.setState({
        bottom:"return-to-bottom none"
      })
    } else {
      this.setState({
        bottom:"return-to-bottom"
      })
    }
    // console.log(this.state.height,this.state.prevScrollpos)
  };
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  componentDidUpdate() {
    const node = this.node;
    if (this.state.height!==node.scrollHeight){
      this.setState({
        height:node.scrollHeight
      })
    }
}
  scrollToBottom=()=> {
    window.scrollTo({
      top:this.state.height ,
      behavior: "smooth"
    });
    // console.log(height)
  }
  render(){
    // console.log(this.state.height)
      return(
        <div ref={(node) => { this.node = node; }}>
            <Header></Header>
            <Body class={this.state.class}></Body>
            <Footer></Footer>
            <div  className={this.state.top} onClick={this.scrollToTop} data-toggle="tooltip"><i className="icon-chevron-up"></i></div>
            <div  className={this.state.bottom} onClick={this.scrollToBottom} data-toggle="tooltip"><i className="icon-chevron-down"></i></div>
        </div>
      )
  }
}
export default Main;