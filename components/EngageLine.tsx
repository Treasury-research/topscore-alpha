import { useEffect } from 'react';
import * as echarts from 'echarts';

const lineColor = ['#830000', '#001FB9', '#009589', '#C70011', '#007EB8', '#932D00', '#4400D0', '#9A0040', '#00DEA8', '#FFD891']

const areaColor = ['#FF3300', '#3B5CFF', '#A1C3BE', '#F95D6A', '#003F5C', '#FF7C43', '#665191', '#D45087', '#4A8073', '#FFA600']

const ChartLine = (props: any) => {

  const { id = 'default-id', width = '100%', height = '100%', dates, dayType, lineData, commentSwitch, mirrorSwitch, postSwitch, type, sigleData } = props;
  console.log(lineData)
  const getSeriesData = (s: any, i: number) => {
    let seriesObj:any = {
      name: `Pub#${s[i]['pubId']}`,
      type: 'line',
      stack: 'Total',
      yAxisIndex: 0,
      emphasis: {
        focus: 'series'
      },
      label: {
        show: false,
        position: 'top'
      },
      areaStyle: {
        opacity: 0.6,
        color: '#fff'
      },
      itemStyle: {
        color: '#fff'
      },
      lineStyle: {
        width: 1
      },
      data: [],
      showSymbol: false
    }

    for (let j = 0; j < lineData.length; j++) {

      let flx = lineData[j].filter((t: any) => {
        return t.pubId == s[i]['pubId']
      })

      let flxPre:any = []

      if (j !== 0) {
        flxPre = lineData[j - 1].filter((t: any) => {
          return t.pubId == s[i]['pubId']
        })
      }

      if(flxPre.length == 0){
        if (type === 0 || type === 1) {
          flxPre = [{
            commentByCount:0,
            mirrorByCount:0
          }]
        }else{
          flxPre = [{
            collectByCount:0,
          }]
        }
      }

      seriesObj.itemStyle.color = lineColor[i];
      seriesObj.areaStyle.color = areaColor[i];
      if ((type === 0 || type === 1) && j !== 0) {
        if (commentSwitch && !mirrorSwitch) {
          if (flx.length == 0) {
            seriesObj.data.push({
              name: `${type}_${s[i]['type']}_comment_0`,
              value: 0
            })
          } else {
            seriesObj.data.push({
              name: `${type}_${flx[0]['type']}_comment_${flx[0]['commentByCount'] - flxPre[0]['commentByCount']}`,
              value: flx[0]['commentByCount'] - flxPre[0]['commentByCount'] || 0
            })
          }
        }
        if (!commentSwitch && mirrorSwitch) {
          if (flx.length == 0) {
            seriesObj.data.push({
              name: `${type}_${s[i]['type']}_mirror_0`,
              value: 0
            })
          } else {
            seriesObj.data.push({
              name: `${type}_${flx[0]['type']}_mirror_${flx[0]['mirrorByCount'] - flxPre[0]['mirrorByCount']}`,
              value: flx[0]['mirrorByCount'] - flxPre[0]['mirrorByCount'] || 0
            })
          }
        }
        if (commentSwitch && mirrorSwitch) {
          if (flx.length == 0) {
            seriesObj.data.push({
              name: `${type}_${s[i]['type']}_total_0_0`,
              value: 0
            })
          } else {
            seriesObj.data.push({
              name: `${type}_${flx[0]['type']}_total_${flx[0]['commentByCount'] - flxPre[0]['commentByCount']}_${flx[0]['mirrorByCount'] - flxPre[0]['mirrorByCount']}`,
              value: ((flx[0]['commentByCount'] + flx[0]['mirrorByCount']) - (flxPre[0]['commentByCount'] + flxPre[0]['mirrorByCount'])) || 0
            })
          }
        }
        if (!commentSwitch && !mirrorSwitch) {
          seriesObj.data.push({
            name: `${type}_total_total_0_0}`,
            value: 0
          })
        }
      } else {
        if(j !== 0){
          if (flx.length == 0) {
            seriesObj.data.push({
              name: `${type}_${s[i]['type']}_${s[i]['isFee']}_0_0`,
              value: 0
            })
          } else {
            seriesObj.data.push({
              name: `${type}_${flx[0]['type']}_${flx[0]['isFee']}_${flx[0]['collectByCount'] - flxPre[0]['collectByCount']}`,
              value: flx[0]['collectByCount'] - flxPre[0]['collectByCount'] || 0
            })
          }
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
    console.log(s);
    console.log(lineData);
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
    seriesData.push({
      name: `amount`,
      type: 'line',
      yAxisIndex: 1,
      label: {
        show: false,
        position: 'top'
      },
      itemStyle: {
        color: '#48D8BF'
      },
      lineStyle: {
        width: 2
      },
      smooth: true,
      data: sigleData,
      showSymbol: false
    })
    let dy:any = [];
    dates.forEach((t:any,i:any) => {
      if(i !== 0){
        const dtr = t.toString()
        if(dtr){
          dy.push(`${dtr.slice(2,4)}/${dtr.slice(4,6)}/${dtr.slice(6,8)}`)
        }
      }
    })
    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#292929',
        borderWidth: 0,
        formatter: (params: any) => {
          let htmlCon = ``
          let htmlDate = ``
          params.forEach((v: any) => {
            if (!v.name || v.seriesName === 'amount') return false;
            if (type == 0 || type == 1) {
              htmlCon += `<div class="engage-items">
              <div class="engage-items-head">
                ${v.name.split('_')[1] === 'Post' ? '<div class="engage-items-head-post-icon"></div>' : '<div class="engage-items-head-comment-icon"></div>'}
                <div class="engage-items-head-pubName">${v.seriesName}</div>
              </div>
              <div class="engage-items-content">
              ${(v.name.split('_')[2] === 'total' || v.name.split('_')[2] === 'comment') ? '<div class="engage-items-comment-icon"></div>' : ''}
              
              ${(v.name.split('_')[2] === 'total' || v.name.split('_')[2] === 'comment') ? `<div class="engage-items-comment-num">${v.name.split('_')[3] || 0}</div>` : ''}

              ${(v.name.split('_')[2] === 'total' || v.name.split('_')[2] === 'mirror') ? '<div class="engage-items-mirror-icon"></div>' : ''}
              
              ${v.name.split('_')[2] === 'total' ? `<div class="engage-items-mirror-num">${v.name.split('_')[4]}</div>` : v.name.split('_')[2] === 'mirror' ? `<div class="engage-items-mirror-num">${v.name.split('_')[3] || 0}</div>` : ''}
              </div>
            </div>
            `
            } else {
              htmlCon += `<div class="engage-items">
                            <div class="engage-items-head">
                              ${v.name.split('_')[1] === 'Post' ? '<div class="engage-items-head-post-icon"></div>' : '<div class="engage-items-head-comment-icon"></div>'}
                              <div class="engage-items-head-pubName">${v.seriesName}</div>
                            </div>
                            <div class="engage-collect-items-content">
                            ${v.name.split('_')[2] === '0' ? '<div class="engage-items-noFee-icon"></div>' : '<div class="engage-items-fee-icon"></div>'}
                            <div class="engage-items-mirror-num">${v.name.split('_')[3] || 0}</div>
                            </div>
                          </div>
                          `

            }

            htmlDate = `<div class="engage-head-right-date">${v.axisValue}</div>`
          })

          let t = params.filter((h: any) => {
            return h.seriesName === 'amount'
          })

          if (type == 0 || type == 1) {
            return `
                <div class="engage-tooltip">
                  <div class="engage-head">
                    <div class="engage-head-left">
                      <div class="engage-head-left-icon"></div>
                      <div class="engage-head-left-des">Followers：</div>
                      <div class="engage-head-left-num">${t.length !== 0 ? t[0]['value'] : 0}</div>
                    </div>
                    <div class="engage-head-right">
                      ${htmlDate}
                    </div>
                  </div>
                  ${htmlCon}
                </div>
              `
          } else {
            return `
              <div class="engage-tooltip">
                <div class="engage-head">
                  <div class="engage-head-left">
                    <div class="engage-head-fee-left-icon"></div>
                    <div class="engage-head-fee-left-des">Revenue：</div>
                    <div class="engage-head-fee-score-icon"></div>
                    <div class="engage-head-fee-score-num">${t.length !== 0 ? t[0]['value'] : 0}</div>
                  </div>
                  <div class="engage-head-right">
                    <div class="engage-head-right-date">${htmlDate}</div>
                  </div>
                </div>
                ${htmlCon}
              </div>
            `
          }



        }
      },
      legend: {
        icon: 'rect',
        bottom: '0px',
        left: '60px',
        emplasis: {
          focus: 'self'
        },
        data: legendData,
        textStyle: {
          color: 'rgba(255,255,255,0.8)'
        },
        itemWidth: 16,
        itemHeight: 16,
        itemGap: 10
      },
      toolbox: {
        show: false,
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '16%',
        containLabel: true
      },
      dataZoom: [
        {
          show: true,
          brushSelect: false,
          borderColor: 'rgba(255,255,255,0)',
          start: 0,
          end: 100,
          xAxisIndex: [0, 1],
          top: '86%',
          zoomOnMouseWheel:false,
          moveOnMouseMove :false,
          preventDefaultMouseMove:true
        },
        // {
        //   type: 'inside',
        //   brushSelect: false,
        //   borderColor: 'rgba(255,255,255,0)',
        //   start: 0,
        //   end: 100,
        //   xAxisIndex: [0, 1],
        //   top: '86%',
        //   zoomOnMouseWheel:false,
        //   moveOnMouseMove :false,
        //   preventDefaultMouseMove:true
        // }
      ],
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: dy,
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,0.8)',
              fontSize: 14
            },
          }
        }
      ],
      emplasis: {
        focus: 'self'
      },
      yAxis: [
        {
          type: 'value',
          name: type === 0 ? 'Engagements' : 'Collections',
          nameLocation :'end',
          nameTextStyle:{
            color: 'rgba(255,255,255,0.8)',
          },
          nameGap :20,
          scale: true,
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          max: function (value: any) {//取最大值向上取整为最大刻度
            return Math.ceil(value.max) * 1
          },
          min: function (value: any) {//取最大值向上取整为最大刻度
            return value.min
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,0.8)',
              fontSize: 14
            },
          }
        }, {
          type: 'value',
          name: type === 0 ? 'Followers' : 'Earnings(WMATIC)',
          nameLocation :'end',
          nameTextStyle:{
            color: 'rgba(255,255,255,0.8)',
          },
          nameGap :20,
          position: 'right',
          max: function (value: any) {//取最大值向上取整为最大刻度
            return value.max
          },
          min: function (value: any) {//取最大值向上取整为最大刻度
            return value.min
          },
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
