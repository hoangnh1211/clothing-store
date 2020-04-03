import React,{Component} from 'react';
import "./About.css"
class About extends Component {
  render(){
  return (
    <div className="about">
        <p className="about1"><b>OUR BELOVED TEACHER</b></p>
        <div className="row">
          <div className="col-4">
            <img src='http://localhost:4000/anh/thay' alt="anh" className="thay"></img>
          </div>
          <div className="col-8">
            <p className="about2">Our thank you letter</p>
            <p className="about3">Thank you constantly encouraging us every step of the way. You truly did the impossible as we honestly could not imagine having achieved 
            what we did, without your guidance. You inspired us to be better people, with every class being full of love and passion. It’s all those little things you did for us
            , treating us like we are your very own family, scolding us when we did not perform to our potential, showing us your unique sense of coffee, 
            being respectful to us and so much more. Sir, you have no idea how much those few months of being your student has impacted our life. 
            We don’t think that we would ever meet anyone as selfless, or as impacting us as you. This is too short a space for us to express how much of a change you made in us,
            but we’d like to thank you from the very bottom of our heart, for helping us overcome through the darkness of our life.</p>
            <p>--Team 1</p>
            <div className="about4" >
              <i>
            I love those who can smile in trouble, who can gather strength from distress, and grow brave by reflection. 
            'Tis the business of little minds to shrink, but they whose heart is firm, and whose conscience approves their conduct, will pursue their principles unto death. 
            </i>
            <p>-- Leonardo Da Vinci</p>
            </div>
          </div>
        </div>
        <p className="about1"><b >TEAM 1 'S MEMBERS</b></p>
        <div className="row">
            <div className="col">
                <img src='http://localhost:4000/anh/hoanganh' alt="anh" className="hoanganh"></img>
                <div className="about5"> VŨ MINH HOÀNG ANH
                <div> 20176689</div></div>
                
            </div>
            <div className="col">
              <img src='http://localhost:4000/anh/tra' alt="anh" className="hoanganh"></img>
              <div className="about5"> NGUYỄN THỊ THU TRÀ
              <div>20176890</div>
              </div>
              
            </div>
            <div className="col">
              <img src='http://localhost:4000/anh/duc' alt="anh" className="hoanganh"></img>
              <div className="about5">ĐÀO VIỆT ĐỨC
              <div> 20176719</div>
              </div>
            </div>
            <div className="col">
              <img src='http://localhost:4000/anh/dat' alt="anh" className="hoanganh"></img>
              <div className="about5"> NGUYỄN VĂN ĐẠT
              <div> 20176712</div>
              </div>
              
            </div>
        </div>
        <img src='http://localhost:4000/anh/nhom' alt="anh" className="nhom"></img>
    </div>
  );
}}

export default About;
