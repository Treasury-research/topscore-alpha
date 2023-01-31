import { useEffect } from 'react';
import * as echarts from 'echarts';
import linData from './kLineData'

const upColor = '#16B57F';
const downColor = '#E45555';

const splitData = (rawData: any) => {
    let categoryData = [];
    let values = [];
    for (let i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i][0]);
        values.push(rawData[i].slice(1,5));
    }
    return {
        categoryData: categoryData,
        values: values
    };
}

const ChartLine = (props: any) => {

    const { id = 'default-id', width = '100%', height = '100%' } = props;
    
    let data = splitData(linData);
    
    useEffect(() => {
        const option = {
            animation: false,
            legend: {
              show:false,
              bottom: 10,
              left: 'center',
              data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              },
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              textStyle: {
                color: '#000'
              },
            },
            grid: [
              {
                left: '5%',
                right: '80px',
                top:'20',
                bottom:'60'
              },
              {
                left: '10%',
                right: '8%',
                top: '63%',
                height: '16%'
              }
            ],
            xAxis: [
              {
                type: 'category',
                data: data.categoryData,
                boundaryGap: false,
                axisLine: { onZero: false,show: false },
                splitLine: { show: false },
                axisTick: { show: false },
                min: 'dataMin',
                max: 'dataMax',
                axisPointer: {
                  z: 100
                },
                axisLabel:{
                    margin:40
                }
              },
              {
                type: 'category',
                show:false,
                gridIndex: 1,
                data: data.categoryData,
                boundaryGap: false,
                axisLine: { onZero: false,show: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                min: 'dataMin',
                max: 'dataMax'
              }
            ],
            yAxis: [
              {
                scale: true,
                position: 'right',
                splitArea: {
                  show: false
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                      type: 'dotted',
                      color: 'rgba(255, 255, 255,0.3)'
                    }
                  }
              },
              {
                scale: true,
                gridIndex: 1,
                splitNumber: 2,
                axisLabel: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false }
              }
            ],
            dataZoom: [
              {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: 98,
                end: 100
              },
            ],
            series: [
              {
                name: 'BTC',
                type: 'candlestick',
                data: data.values,
                itemStyle: {
                  color: upColor,
                  color0: downColor,
                  borderColor: undefined,
                  borderColor0: undefined
                },
                tooltip: {
                  formatter: function (param:any) {
                    param = param[0];
                    return [
                      'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                      'Open: ' + param.data[0] + '<br/>',
                      'Close: ' + param.data[1] + '<br/>',
                      'Lowest: ' + param.data[2] + '<br/>',
                      'Highest: ' + param.data[3] + '<br/>'
                    ].join('');
                  }
                }
              }
            ]
          };

        const HTMLElement = document.getElementById(id) as HTMLElement;

        const chart = echarts.init(HTMLElement);

        chart.setOption(option);

        chart.dispatchAction({
            type: 'brush',
            areas: [
              {
                brushType: 'lineX',
                coordRange: ['2016-06-02', '2016-06-20'],
                xAxisIndex: 0
              }
            ]
          });

        window.addEventListener("resize", () => {
            if (chart) {
                chart.resize()
            }
        })

    });

    useEffect(() => {
        console.log(1)
    })

    return (
        <div id={id} style={{ width: width, height: height }}>

        </div>
    );

};

export default ChartLine;
