import React,{Component} from 'react';
import './Footer-top.css'
class FooterTop extends Component{
    render(){
        return(
            <div className="footer-top ">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p><b>GIỚI THIỆU </b></p>
                            <p> Thương hiệu thời trang thiết kế 2DAT....</p>
                            {/* <a href="https://www.facebook.com/tra1809"> <i class="fab fa-facebook-f icon"></i></a> */}
                        </div>
                        <div className="col">
                            <p><b>TRỢ GIÚP</b></p>
                            <p>Hướng dẫn mua hàng</p>
                            <p>Hướng dẫn thanh toán</p>
                        </div>
                        <div className="col">
                            <p><b>THÔNG TIN</b></p>
                            {/* <p> <a href="about">Giới thiệu </a></p> */}
                            <p><a href="/contact">Liên hệ </a></p>
                        </div>
                        <div className="col">
                            <p><b>THÔNG TIN CÔNG TY</b></p>
                            <p>
                                Công ty TNHH Thương mại thời trang HEDSPI <br/>
                                Số ĐKKD 0106142011 do Sở KHĐT Tp. Hà Nội cấp ngày 20/10/2019<br/>
                                Người đại diện: Vũ Minh Hoàng Anh<br/>
                                Địa chỉ: Đại học Bách Khoa Hà Nội<br/>
                                Hotline: 0853538197<br/>
                                Email: vuminhhoanganh12@gmail.com<br/>
                            </p>
                            <img src="http://localhost:4000/bct" alt="anh"></img>
                        </div>
                    </div>
                </div>
                
            </div>
        )
}}
export default FooterTop