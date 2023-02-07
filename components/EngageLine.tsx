import { useEffect } from 'react';
import * as echarts from 'echarts';
const Icon1 = '../statics/img/p1.png'
import Image from 'next/image'
import { BellOutlined, UserOutlined } from '@ant-design/icons';
const lineColor = ['#FFB9A7', '#A8B7FF', '#8AB2C7', '#A1C3BE', '#DAB0FF', '#DFB798', '#B9ECFF', '#DD6666', '#CDB6FF', '#BEFFC0']

const areaColor = ['#FF3300', '#3B5CFF', '#4A8073', '#135B55', '#7766FF', '#8D503A', '#00B8FF', '#951B1B', '#6219FF', '#00B005']

const ChartLine = (props: any) => {

  const { id = 'default-id', width = '100%', height = '100%', dates, dayType, lineData, commentSwitch, mirrorSwitch, postSwitch, type,sigleData } = props;

  const getSeriesData = (s: any, i: number) => {
    let seriesObj = {
      name: `Pub#${s[i]['pubId']}`,
      type: 'line',
      stack: 'Total',
      yAxisIndex: 0,
      label: {
        show: false,
        position: 'top'
      },
      areaStyle: {
        opacity: 0.5,
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
      seriesObj.itemStyle.color = lineColor[i];
      seriesObj.areaStyle.color = areaColor[i];
      if (flx.length == 0) {
        seriesObj.data.push(null)
      } else {
        if (type === 0 || type === 1) {
          if (commentSwitch && !mirrorSwitch) {
            seriesObj.data.push({
              name: `${type}_${flx[0]['type']}_comment_${flx[0]['commentByCount']}`,
              value: flx[0]['commentByCount'] || 0
            })
          }
          if (!commentSwitch && mirrorSwitch) {
            // seriesObj.data.push(flx[0]['mirrorByCount'])
            seriesObj.data.push({
              name: `${type}_${flx[0]['type']}_mirror_${flx[0]['mirrorByCount']}`,
              value: flx[0]['mirrorByCount'] || 0
            })
          }
          if (commentSwitch && mirrorSwitch) {
            seriesObj.data.push({
              name: `${type}_${flx[0]['type']}_total_${flx[0]['commentByCount']}_${flx[0]['mirrorByCount']}`,
              value: (flx[0]['commentByCount'] + flx[0]['mirrorByCount']) || 0
            })
            // seriesObj.data.push(flx[0]['mirrorByCount'] + flx[0]['commentByCount'])
          }
          if (!commentSwitch && !mirrorSwitch) {
            seriesObj.data.push(0)
          }
        } else {
          seriesObj.data.push({
            name: `${type}_${flx[0]['type']}_${flx[0]['isFee']}_${flx[0]['collectByCount']}`,
            value: flx[0]['collectByCount'] || 0
          })
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
      smooth:true,
      data: sigleData,
      showSymbol: false
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

          let t = params.filter((h:any) => {
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
        right: '10%',
        bottom: '16%',
        containLabel: true
      },
      dataZoom: [
        {
          show: true,
          brushSelect: false,
          borderColor: 'rgba(255,255,255,0)',
          start: 100 - (dayType + 1) * 7 / 30 * 100,
          end: 100,
          xAxisIndex: [0, 1],
          top: '86%',
        },
        {
          type: 'inside',
          brushSelect: false,
          borderColor: 'rgba(255,255,255,0)',
          start: 100 - (dayType + 1) * 7 / 30 * 100,
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
          max: function(value:any) {//取最大值向上取整为最大刻度
            return  Math.ceil(value.max) * 2
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,0.8)',
              fontSize: 14
            },
          }
        }, {
          type: 'value',
          position: 'right',
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
