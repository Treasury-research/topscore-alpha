import { useEffect } from 'react';
import * as echarts from 'echarts';
import radorImg from '../../statics/img/radar.png'
import Image from 'next/image'
// const dataBJ = [
//     [98, 80, 99, 70, 79, 80],
// ];

const ChartLine = (props: any) => {
    const { optionsData = null, id = 'default-id', width = '100%', height = '100%', data = [], showTooltip } = props;
    let dataBJ = data.map((t: any) => {
        t.max = 10;
        return t.value
    })
    useEffect(() => {
        const option = {
            tooltip: {
                trigger: 'item',
                show: true
            },
            radar: {
                axisName: {
                    color: 'rgba(255,255,255,.5)',
                    fontSize: 14,
                    backgroundColor: '#232429',
                    padding: [8, 10, 8, 10],
                    clickable: true,
                },
                indicator: data,
                shape: 'circle',
                splitNumber: 4,
                name: {
                    textStyle: {
                        color: '#ffffff',
                        fontSize: 16
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: [
                            'rgba(238,238,238, 0.3)', 'rgba(238,238,238, 0.2)',
                            'rgba(238,238,238, 0.2)', 'rgba(238,238,238, 0.2)',
                            'rgba(238,238,238, 0.2)', 'rgba(238,238,238, 0.2)'
                        ].reverse(),
                        width: 1
                    }
                },
                splitArea: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(238,238,238, 0.2)'
                    }
                },
                itemStyle: {
                    show: false,
                    normal: {
                        color: '#B5EA22',
                    }
                },
                triggerEvent: true
            },
            series: [{
                type: 'radar',
                name: 'Stats',
                tooltip: {
                    show: showTooltip,
                    trigger: 'item'
                },
                data: [dataBJ],
                symbol: 'circle',
                symbolSize: 0,
                // itemStyle: {
                //     normal: {
                //         color: '#B5EA22',
                //         borderColor: 'rgba(181, 234, 34,0.2)',
                //         borderWidth: 10,
                //     }
                // },
                lineStyle: {
                    show: false,
                    color: '#B5EA22',
                    width: 0
                },
                itemStyle: {
                    show: false,
                    normal: {
                        color: 'red'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.2
                    }
                }
            }],


        };
        const HTMLElement = document.getElementById(id) as HTMLElement;
        const chart = echarts.init(HTMLElement);
        chart.on('click', function (param) {
            if (param.targetType == "axisName") {
                props.showList(param.name)
            }

            if (param.seriesType && param.seriesType == "radar") {
                props.showList('Overall')
            }
        })
        chart.setOption(option);
        window.addEventListener("resize", () => {
            if (chart) {
                chart.resize()
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionsData, data]);
    return (
        <div style={{ width: width, height: height, position: "relative" }}>
            <div id={id} style={{ width: width, height: height, zIndex: '99' }}>

            </div>
            <Image src={radorImg} alt="" style={{ position: "absolute",heigth:"400px",width:"360px", zIndex: '9', height: "80%", left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
        </div>
    );
};

export default ChartLine;
