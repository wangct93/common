/**
 * Created by Administrator on 2018/5/28.
 */
import React, {Component} from 'react';
const wt = require('@util/browse');
import {Spin} from 'antd';
import ErrorSrc from '../static/img/noImg.jpg';

const queue = new wt.Queue({
    execFunc(item,cb){
        if(item.unmount){
            cb();
        }else{
            item.finish = cb;
            item.setState({
                status:'start'
            });
        }
    }
});

export default class Img extends Component{
    render(){
        let {full = true,src = errorSrc} = this.props;
        let {status} = this.state || {};
        let loading = status !== 'finish';
        return <Spin spinning={loading}>
            <div className={`img-box-${full ? 'full' : 'auto'}`}>
                <img ref="img" src={status ? src : null} onError={e => {e.target.src = errorSrc}} onLoad={this.load.bind(this)}/>
            </div>
        </Spin>
    }
    componentWillUpdate(props,state){
        let {src} = props;
        let {src:oldSrc} = this.props;
        let {status} = this.state || {};
        if(oldSrc !== src && status === 'finish'){
            queue.addItem(this);
            queue.start();
        }
    }
    componentWillUnmount(){
        this.unmount = true;
        this.next();
    }
    componentDidMount(){
        queue.addItem(this);
        queue.start();
    }
    load(){
        this.setState({
            status:'finish'
        });
        this.next();
    }
    next(){
        wt.execFunc(this.finish);
        delete this.finish;
    }
}

let errorSrc = ErrorSrc;

export const setErrorSrc = src => {
    errorSrc = src;
};