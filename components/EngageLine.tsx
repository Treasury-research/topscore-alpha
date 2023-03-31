import { useEffect } from 'react';
import * as echarts from 'echarts';

const overLineColor = ['#009589', '#830000', '#001FB9']

const overAreaColor = ['#A1C3BE', '#FF3300', '#3B5CFF']

const lineColor = ['#FF33FF', '#001FB9', '#009589', '#C70011', '#007EB8', '#932D00', '#4400D0', '#9A0040', '#00DEA8', '#FFD891', '#830000']

const areaColor = ['#FF33CC', '#3B5CFF', '#A1C3BE', '#F95D6A', '#003F5C', '#FF7C43', '#665191', '#D45087', '#4A8073', '#FFA600', '#FF3300']

const ChartLine = (props: any) => {

  const { id = 'default-id',
    width = '100%',
    height = '100%',
    dates,
    dayType,
    lineData,
    commentSwitch,
    mirrorSwitch,
    postSwitch,
    type,
    sigleData,
    overviewPostData
  } = props;

  const getSeriesData = (s: any, i: number) => {
    let seriesObj: any = {
      name: `${s[i]['pubId'] === 0 ? 'Others' : `#${s[i]['pubId']}`}`,
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
      seriesObj.itemStyle.color = lineColor[i];
      seriesObj.areaStyle.color = areaColor[i];
      if (type === 1) {
        if (commentSwitch && !mirrorSwitch) {
          if (flx.length == 0) {
            seriesObj.data.push({
              name: `${type}_${s[i]['type']}_comment_0`,
              value: 0
            })
          } else {
            seriesObj.data.push({
              name: `${type}_${flx[0]['type']}_comment_${flx[0]['commentByCount']}`,
              value: Number(flx[0]['commentByCount'])
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
              name: `${type}_${flx[0]['type']}_mirror_${flx[0]['mirrorByCount']}`,
              value: Number(flx[0]['mirrorByCount'])
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
              name: `${type}_${flx[0]['type']}_total_${flx[0]['commentByCount']}_${flx[0]['mirrorByCount']}`,
              value: Number(flx[0]['commentByCount']) + Number(flx[0]['mirrorByCount'])
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
        if (flx.length == 0) {
          seriesObj.data.push({
            name: `${type}_${s[i]['type']}_${s[i]['isFee']}_0_0`,
            value: 0
          })
        } else {
          seriesObj.data.push({
            name: `${type}_${flx[0]['type']}_${flx[0]['isFee']}_${flx[0]['collectByCount']}`,
            value: Number(flx[0]['collectByCount'])
          })
        }
      }
    }
    return seriesObj;
  }

  useEffect(() => {
    let legendData = [];
    let seriesData: any = [];
    if (type === 1 || type === 2) {
      if (lineData.length == 0) return;
      const s = lineData[lineData.length - 1];
      for (let i = 0; i < s.length; i++) {
        legendData.push(`${s[i]['pubId'] === 0 ? 'Others' : `#${s[i]['pubId']}`}`)
        seriesData.push(getSeriesData(s, i))
      }
    } else {
      legendData = ['Comments (by)', 'Mirrors (by)', 'Collected (by)']
      legendData.map((t, i) => {
        let seriesObj: any = {
          name: t,
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
            color: overAreaColor[i]
          },
          itemStyle: {
            color: overLineColor[i]
          },
          lineStyle: {
            width: 1
          },
          data: [],
          showSymbol: false
        }
        seriesData.push(seriesObj)
      })
      lineData.forEach((t, i) => {
        seriesData[0]['data'].push({
          name: `${t.commentByCount}`,
          value: t.commentByCount
        })
        seriesData[1]['data'].push({
          name: `${t.mirrorByCount}`,
          value: t.mirrorByCount
        })
        seriesData[2]['data'].push({
          name: `${t.collectByCount}`,
          value: t.collectByCount
        })
      })
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
    let dy: any = [];
    dates.forEach((t: any, i: any) => {
      const dtr = t.toString()
      if (dtr) {
        dy.push(`${dtr.slice(2, 4)}/${dtr.slice(4, 6)}/${dtr.slice(6, 8)}`)
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
          let idx = 0
          if (params[0]['seriesName'] === 'amount') {
            idx = 1
          }
          params.forEach((v: any, i: number) => {
            htmlDate = `<div class="engage-head-right-date">${v.axisValue}</div>`
            if (!v.name || v.seriesName === 'amount') return false;
            if (type == 0) {
              htmlCon += `<div class="overflow-items">
              <div class="overflow-items-head">
                ${v.seriesIndex === 0 ?
                  `<div class="engage-items-head-comment-icon" style="background-color: ${overLineColor[i - idx]};"><div class="comment-icon"></div></div>` :
                  v.seriesIndex === 1 ?
                    `<div class="engage-items-head-comment-icon" style="background-color: ${overLineColor[i - idx]};"><div class="mirrors-icon"></div></div>` :
                    `<div class="engage-items-head-comment-icon" style="background-color: ${overLineColor[i - idx]};"><div class="collect-icon"></div></div>`}
                <div class="overflow-items-head-pubName">${v.seriesName}</div>
              </div>
              <div class="overflow-items-content">
                  ${v.data.value}
              </div>
            </div>
            `
            } else if (type == 1) {
              htmlCon += `<div class="engage-items">
              <div class="engage-items-head">
                ${v.name.split('_')[1] === 'Post' ?
                  `<div class="engage-items-head-post-icon" style="background-color: ${lineColor[i - idx]};"><div class="post-icon"></div></div>` :
                  v.name.split('_')[1] === 'Comment' ?
                    `<div class="engage-items-head-comment-icon" style="background-color: ${lineColor[i - idx]};"><div class="comment-icon"></div></div>` :
                    `<div class="engage-items-head-comment-icon" style="background-color: ${lineColor[i - idx]};"></div>`}
                <div class="engage-items-head-pubName">${v.seriesName}</div>
              </div>
              <div class="engage-items-content">
              ${(v.name.split('_')[2] === 'total' || v.name.split('_')[2] === 'comment') ?
                  '<div class="engage-items-comment-icon"></div>' : ''}
              
              ${(v.name.split('_')[2] === 'total' || v.name.split('_')[2] === 'comment') ?
                  `<div class="engage-items-comment-num">${v.name.split('_')[3] || 0}</div>` : ''}

              ${(v.name.split('_')[2] === 'total' || v.name.split('_')[2] === 'mirror') ?
                  '<div class="engage-items-mirror-icon"></div>' : ''}
              
              ${v.name.split('_')[2] === 'total' ?
                  `<div class="engage-items-mirror-num">${v.name.split('_')[4]}</div>` : v.name.split('_')[2] === 'mirror' ?
                    `<div class="engage-items-mirror-num">${v.name.split('_')[3] || 0}</div>` : ''}
              </div>
            </div>
            `
            } else if (type == 2) {
              htmlCon += `<div class="engage-items">
                            <div class="engage-items-head">
                            ${v.name.split('_')[1] === 'Post' ?
                  `<div class="engage-items-head-post-icon" style="background-color: ${lineColor[i - idx]};"><div class="post-icon"></div></div>` :
                  v.name.split('_')[1] === 'Comment' ?
                    `<div class="engage-items-head-comment-icon" style="background-color: ${lineColor[i - idx]};"><div class="comment-icon"></div></div>` :
                    `<div class="engage-items-head-comment-icon" style="background-color: ${lineColor[i - idx]};"></div>`}
                              <div class="engage-items-head-pubName">${v.seriesName}</div>
                            </div>
                            <div class="engage-collect-items-content">
                            ${v.name.split('_')[2] === '0' ? '<div class="engage-items-noFee-icon"></div>' : '<div class="engage-items-fee-icon"></div>'}
                            <div class="engage-items-mirror-num">${v.name.split('_')[3] || 0}</div>
                            </div>
                          </div>
                          `
            }
          })
          let t = params.filter((h: any) => {
            return h.seriesName === 'amount'
          })
          if (type == 0) {
            return `
                <div class="engage-tooltip">
                  <div class="engage-head">
                    <div class="engage-head-left">
                      <div class="engage-head-left-icon"></div>
                      <div class="engage-head-left-des">Followers：</div>
                      <div class="engage-head-left-num">${t.length !== 0 ? t[0]['value'] : 0}</div>
                    </div>
                  </div>
                  
                  <div class="engage-content">
                    <div class="overflow-items">
                      <div class="engage-items-head">
                        <div class="engage-items-head-post-icon" style="background-color: ${lineColor[4]};"><div class="post-icon"></div></div>
                        <div class="overview-des">Posts</div>
                        <div class="overview-count">${overviewPostData[params[0]['dataIndex']]['postCount']}</div>
                      </div>
                    </div>
                  </div>

                  ${!postSwitch ?
                ` <div class="engage-content overview-border-b">
                    <div>
                      <div class="engage-items-head">
                        <div class="engage-items-head-comment-icon" style="background-color: ${lineColor[5]};"><div class="comment-icon"></div></div>
                        <div class="overview-des">Comments</div>
                        <div class="overview-count">${overviewPostData[params[0]['dataIndex']]['commentCount']}</div>
                      </div>
                    </div>
                  </div>` : ``}
                  
                  <div class="engage-content">${htmlCon}</div>
                  <div class="dash-line-date">${htmlDate}<div>
                </div>
              `
          } else if (type == 1) {
            return `
                <div class="engage-tooltip">
                  <div class="engage-head">
                    <div class="engage-head-left">
                      <div class="engage-head-left-icon"></div>
                      <div class="engage-head-left-des">Followers：</div>
                      <div class="engage-head-left-num">${t.length !== 0 ? t[0]['value'] : 0}</div>
                    </div>
                    
                  </div>
                  <div class="engage-content">${htmlCon}</div>
                  <div class="dash-line-date">${htmlDate}<div>
                </div>
              `
          } else if (type == 2) {
            return `
              <div class="engage-tooltip">
                <div class="engage-content">${htmlCon}</div>
                <div class="dash-line-date">${htmlDate}<div>
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
        left: 60,
        right: 60,
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
          minValueSpan: 6,
          xAxisIndex: [0, 1],
          top: '86%',
          zoomOnMouseWheel: false,
          moveOnMouseMove: false,
          preventDefaultMouseMove: true
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
          name: (type === 0 || type === 1) ? 'Engagements' : 'Collections',
          nameLocation: 'end',
          nameTextStyle: {
            color: 'rgba(255,255,255,0.8)',
            padding: [0, 0, 0, -20]
          },
          minInterval: 1,
          nameGap: 20,
          scale: true,
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          max: function (value: any) {//取最大值向上取整为最大刻度
            return Math.ceil(value.max * 1.2)
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
          name: (type === 0 || type === 1) ? 'Followers' : '',
          nameLocation: 'end',
          minInterval: 1,
          nameTextStyle: {
            color: 'rgba(255,255,255,0.8)',
          },
          nameGap: 20,
          position: 'right',
          max: function (value: any) {//取最大值向上取整为最大刻度
            return (value.max * 1.02).toFixed(0)
          },
          min: function (value: any) {//取最大值向上取整为最大刻度
            return (value.min * 0.98).toFixed(0)
          },
          // scale:true,
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
    // option.series = seriesData;

    const HTMLElement = document.getElementById(id) as HTMLElement;

    const chart = echarts.init(HTMLElement);

    chart.setOption({ ...option });

    window.addEventListener("resize", () => {
      if (chart) {
        chart.resize()
      }
    })

  });

  return (
    <div id={id} style={{ width: width, height: height }}>

    </div>
  );

};

export default ChartLine;
