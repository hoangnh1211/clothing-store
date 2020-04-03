
import React,{Component} from 'react';
// import './Admin.css'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class Linecharts extends Component{
  constructor(props) {
    super(props); 
    this.state = {
      chartOptions:{
            chart: {
                type: 'line'
            },
            title: {
                text: 'Doanh thu theo tháng'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                 categories: ['1-10', '11-20', '20-end']
            },
            yAxis: {
                title: {
                    text: 'Doanh Thu'
                }
            },
            plotOptions: {
            line: {
                dataLabels: {
                enabled: true
                },
                enableMouseTracking: false
            }
            },
            series: this.props.data
        }
    }
  }
    render(){
        console.log(this.props.data,this.props.data.length)
        return(
            <HighchartsReact
                highcharts={Highcharts}
                options={this.state.chartOptions}
            />
      )
    }
}
export default Linecharts;