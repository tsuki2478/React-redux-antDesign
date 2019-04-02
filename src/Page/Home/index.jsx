import React from 'react'
import {Card,Input} from 'antd'
import ReactEcharts from 'echarts-for-react';
import echartTheme from '../echarts/echartTheme'
// import echarts from 'echarts'
import echarts from 'echarts/lib/echarts'
// 引入饼图和折线图
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import * as R from "ramda";
// import { cond, T, always, curry, compose } from 'ramda';
export default class Home extends React.Component {
    state = {
        A: '',
        add: '',
        f: '',
        g: '',
        d:'',
    }

    componentWillMount() {
        echarts.registerTheme('Imooc', echartTheme);

    }
    componentDidMount() {
        this.state.A = R.eqBy(Math.abs, 5)(-5)
        this.state.add = R.subtract(10)(8) // 2
        // var negative = x => -1 * x;
        // var increaseOne = x => x + 1;
        // var f = R.pipe(Math.pow, negative, increaseOne);
        // this.state.f = f(3, 4) // -80 => -(3^4) + 1
        let add = (a, b, c, d) => a + b + c + d;
        let curryAdd = R.curry(add);
        let f = curryAdd(1, 2);
        let g = f(3);
        this.state.g = g(4) // 10
        this.state.d = R.pipe(R.assoc('a', 2), R.tap(console.log), R.assoc('a', 3))({a: 1})
        let C = {}
        let h = (x, y) => {
            return C['x'] = y 
          };
         this.state.h = R.zipWith(h, [4, 5, 6])(['a', 'b', 'c'])

         let numbers = [1.0,1.1,.12,2.0,3.0,2.2];
         R.countBy(Math.floor)(numbers)

        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
        this.setState({ clientHeight })
        window.addEventListener('resize', this.resize)
    }

    getOption2() {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['OFO订单量', '摩拜订单量']
            },
            xAxis: {
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO订单量',
                    type: 'line',
                    stack: '总量',
                    data: [
                        1200,
                        3000,
                        4500,
                        6000,
                        8000,
                        12000,
                        20000
                    ]
                }, {
                    name: '摩拜订单量',
                    type: 'line',
                    stack: '总量',
                    data: [
                        1000,
                        2000,
                        5500,
                        6000,
                        8000,
                        10000,
                        12000
                    ]
                }
            ]
        }
        return option;
    }


    render() {
        return (
                <Card title="用户表" style={{
                   height:'100%',
                   width:'100%'
                }}>
                    <ReactEcharts
                        option={this.getOption2()}
                        theme="Imooc"
                        notMerge={true}
                        lazyUpdate={true}
                        style={{
                        height: 500
                    }}/>
                </Card>
        );
    }
}