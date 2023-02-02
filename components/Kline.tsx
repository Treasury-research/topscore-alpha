import { useEffect } from 'react';
import * as echarts from 'echarts';

const ChartLine = (props: any) => {

  const { id = 'default-id', width = '100%', height = '100%', dates, dayType, lineData, commentSwitch, mirrorSwitch, postSwitch } = props;

  const getSeriesData = (s: any, i: number) => {
    let seriesObj = {
      name: `Pub#${s[i]['pubId']}`,
      type: 'line',
      stack: 'Total',
      label: {
        show: false,
        position: 'top'
      },
      areaStyle: {},
      data: [],
      showSymbol: false
    }

    for (let j = 0; j < lineData.length; j++) {
      let flx: any[] = lineData[j].filter((t: any) => {
        return t.pubId == s[i]['pubId']
      })
      if (flx.length == 0) {
        seriesObj.data.push(null)
      } else {
        if (commentSwitch && !mirrorSwitch) {
          seriesObj.data.push(flx[0]['commentByCount'])
        }
        if (!commentSwitch && mirrorSwitch) {
          seriesObj.data.push(flx[0]['mirrorByCount'])
        }
        if (commentSwitch && mirrorSwitch) {
          seriesObj.data.push(flx[0]['mirrorByCount'] + flx[0]['commentByCount'])
        }
        if (!commentSwitch && !mirrorSwitch) {
          seriesObj.data.push(0)
        }
      }
    }

    return seriesObj;
  }

  useEffect(() => {
    let legendData = [];
    let seriesData = [];
    if (lineData.length == 0) return;
    const s = lineData[lineData.length - 1];
    if (postSwitch) {
      for (let i = 0; i < s.length; i++) {
        if (s[i]['type'] === 'Post') {
          legendData.push(`Pub#${s[i]['pubId']}`)
          seriesData.push(getSeriesData(s, i))
        }
      }
    } else {
      for (let i = 0; i < s.length; i++) {
        legendData.push(`Pub#${s[i]['pubId']}`)
        seriesData.push(getSeriesData(s, i))
      }
    }

    const option = {
      tooltip: {
        trigger: 'axis',
        // formatter: () => {
        //   return '<div>234234</div>'
        // }
      },
      legend: {
        icon: 'rect',
        bottom: '0px',
        left: '60px',
        data: legendData,
        textStyle: {
          color: 'rgba(255,255,255,0.8)'
        },
        itemWidth: 16,
        itemHeight: 16,
        itemGap: 30
      },
      toolbox: {
        show: false,
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '16%',
        containLabel: true
      },
      dataZoom: [
        {
          show: true,
          brushSelect: false,
          borderColor: 'rgba(255,255,255,0)',
          start: 100 - (dayType +1)*7 / 30 * 100,
          end: 100,
          xAxisIndex: [0, 1],
          top: '86%',
        },
        {
          type: 'inside',
          brushSelect: false,
          borderColor: 'rgba(255,255,255,0)',
          start: 100 - (dayType +1)*7 / 30 * 100,
          end: 100,
          xAxisIndex: [0, 1],
          top: '86%',
        }
      ],
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: dates,
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,0.8)',
              fontSize: 14
            },
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,0.8)',
              fontSize: 14
            },
          }
        }
      ],
      series: [...seriesData]
    };
    console.log(option)
    // option.series = seriesData;

    const HTMLElement = document.getElementById(id) as HTMLElement;

    const chart = echarts.init(HTMLElement);

    chart.setOption({ ...option });
    // console.log(chart)
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
