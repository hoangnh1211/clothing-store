import React,{Component} from 'react';
import './Banner.css'
class Banner extends Component{
    
    render(){
        return(
            <div className="banner">
                <div id="carouselExampleInterval" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item" data-interval="1000">
                            <img  src="http://localhost:4000/anh/banner4" className="d-block w-200 anh" alt="..."></img>
                        </div>
                        <div className="carousel-item active" data-interval="1000">
                            <img  src="http://localhost:4000/anh/banner2" className="d-block w-200 anh" alt="..."></img>
                        </div>
                        <div className="carousel-item" data-interval="1000">
                            <img  src="http://localhost:4000/anh/banner-web-92_1" className="d-block w-200 anh" alt="..."></img>
                        </div>
                        <div className="carousel-item" data-interval="1000">
                            <img  src="http://localhost:4000/anh/banner3" className="d-block w-200 anh" alt="..."></img>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        )
}}
export default Banner