
import React,{Component} from 'react';
// import './Admin.css'
import Highcharts from 'highcharts';
import axios from 'axios';
// import Linecharts from './Linecharts';
import HighchartsReact from 'highcharts-react-official';
var a=[1,2,3,4,5,6,7,8,9,10,11,12];
class HomeAdmin extends Component{
  constructor(props) {
    super(props); 
    // var today=new Date();
    this.state = {
        a:0,
      d:1,
      chartOptions:{
        
        title: {
            text: 'Doanh thu theo tháng'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
             categories: ['ngày 1--> ngày 5','ngày 6--> ngày 10','ngày 11--> ngày 15','ngày 16--> ngày 20','ngày 21--> ngày 25','ngày 26 --> cuối tháng']
        },
        yAxis: {
            title: {
                text: 'Doanh Thu'
            }
        }, 
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
            }
        },
        series: [ ],
          responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    }
    }
    
  }
  componentDidMount() { 
      a.map((user,index)=>{
        // console.log(user)
        axios.post("/revenue13",{thang:user})
            .then(res=>{
            var series=this.state.chartOptions.series;
            var d=this.state.d;
            // var today=new Date;
            var data=res.data;
            var d1=0;
            data.map((user,index)=>{
                if (user===0) d1=d1+1;
                return null;
            })
            if ( d1!==6){
                series[d+1]={
                    name: 'Tháng '+ user,
                    data: res.data
                }
                this.setState({
                    chartOptions: {
                        series: series
                        },
                    d:d+1
                });
            }
            
            // var name1='Tháng '+user;
            // var data1=res.data;
            // var joined = this.state.chartOptions.series.concat({name1,data1});
            
        })
        return null;
      })
    //   axios.get('/revenue12')
    //   .then(res=>{
    //     var series=this.state.chartOptions.series;
    //     var d=this.state.d;
    //     var today=new Date;
    //     series[d+1]={
    //       name: 'Tháng '+ (today.getMonth()+1),
    //       data: res.data
    //     }
    //     var name1='Tháng '+ (today.getMonth()+1);
    //     var data1=res.data;
    //     var joined = this.state.chartOptions.series.concat({name1,data1});
    //     this.setState({
    //         chartOptions: {
    //             series: joined
    //           },
    //         d:d+1
    //   });
    // })
  }
  
   a=()=>{
    var dem=this.state.dem;
    dem[this.state.d+1]={a:'b'}
    this.setState({
      dem:dem
    })
    
    console.log(this.state.dem)
   }
   logout=()=>{
    axios.get('/logoutadmin').then(res=>console.log(res))
    .catch(err=>console.log(err))
    window.location.reload()
   }
    render(){
        return(
        <div className="navright">
            <div className="row">
                <div className="col">
                    <h1 >Admin : {this.props.Name}</h1>
                </div>
                <div className="col">
                    <button onClick={this.logout}>Đăng Xuất</button>
                </div>
            </div>
            {/* <Linecharts data={this.state.series}></Linecharts> */}
            <HighchartsReact
                highcharts={Highcharts}  
                options={this.state.chartOptions}
            />
            {/* <button onClick={this.a} >aaaaa</button> */}
        </div>
      )
    }
}
export default HomeAdmin;