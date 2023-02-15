import { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import radorImg from '../../statics/img/radar.png'
import Image from 'next/image'
// const dataBJ = [
//     [98, 80, 99, 70, 79, 80],
// ];

const ChartLine = (props: any) => {
    const { optionsData = null, id = 'default-id', width = '100%', height = '100%', data = [], showTooltip } = props;
    const [activeName, setActiveName] = useState('Influence');

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
                    show: false,
                    color: 'rgba(255,255,255,.5)',
                    fontSize: 14,
                    backgroundColor: '#232429',
                    padding: [8, 10, 8, 10],
                    clickable: true,
                },
                indicator: data,
                shape: 'circle',
                splitNumber: 4,
                // name: {
                //     textStyle: {
                //         color: '#ffffff',
                //         fontSize: 16
                //     }
                // },
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
        // chart.on('click', function (param) {
        //     if (param.targetType == "axisName") {
        //         setActiveName(param.name)
        //         props.showList(param.name)
        //     }
        // })
        chart.setOption(option);
        window.addEventListener("resize", () => {
            if (chart) {
                chart.resize()
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionsData, data]);

    const showRankDetail = (e:any) => {
        setActiveName(e)
        props.showList(e)
    }

    return (
        <div style={{ width: width, height: height, position: "relative" }}>
            <div id={id} style={{ width: width, height: height, zIndex: '99' }}>

            </div>
            <Image src={radorImg} alt="" style={{ position: "absolute", height: "400px", width: "360px", zIndex: '9', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            <div className={`${activeName === 'Influence' ? 'radar-name1 radar-active' : 'radar-name1'}`} style={{ left: '50%', top: '20px', transform: 'translate(-50%, 0)' }} onClick={() => showRankDetail('Influence')}>Influence</div>
            <div className={`${activeName === 'Creation' ? 'radar-active radar-name2' : 'radar-name2'}`} style={{ right: '220px', top: '137px' }} onClick={() => showRankDetail('Creation')}>Creation</div>
            <div className={`${activeName === 'Collection' ? 'radar-active radar-name3' : 'radar-name3'}`} style={{ right: '220px', bottom: '137px' }} onClick={() => showRankDetail('Collection')}>Collection</div>
            <div className={`${activeName === 'Curation' ? 'radar-active radar-name4' : 'radar-name4'}`} style={{ left: '50%', bottom: '20px', transform: 'translate(-50%, 0)' }} onClick={() => showRankDetail('Curation')}>Curation</div>
            <div className={`${activeName === 'Engagement' ? 'radar-active radar-name5' : 'radar-name5'}`} style={{ left: '200px', top: '137px' }} onClick={() => showRankDetail('Engagement')}>Engagement</div>
            <div className={`${activeName === 'Campaign' ? 'radar-active radar-name6' : 'radar-name6'}`} style={{ left: '220px', bottom: '137px' }} onClick={() => showRankDetail('Campaign')}>Campaign</div>
        </div>
    );
};

export default ChartLine;
