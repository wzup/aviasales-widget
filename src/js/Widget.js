'use strict';


// const util = require('util');
const React = require('react');
// const ReactDOM = require('react-dom');

// import { DateRange } from 'react-date-range';
const DatePicker = require('./DatePicker');

let css = require('Widget.scss');
// let dp  = require('react-datepicker/dist/react-datepicker.css');

// console.log(dp);


class Widget extends React.Component {
    render() {
        let button_color = this.props.button_color ? this.props.button_color : '#f5a523';
        let bg_color = this.props.button_color ? this.props.bg_color : '#498fe1';
        let font_color = this.props.button_color ? this.props.font_color : '#fff';

        return (
            <div className={css.saWidget} style={{backgroundColor: bg_color, color: font_color}}>
                <div className={css.titleDiv}>
                    <h2 className="titleH">Where does it come from? Why do we use it?</h2>
                </div>
                <div className={css.contentDiv}>
                    <div className={css.fact}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                    {/*<div className={css.control}>
                        <div className={css.outBox}></div>
                        <div className={css.outBox}><DatePicker /></div>
                        <div className={css.rtBox}></div>

                        <DatePicker className="rtBox" />
                        <div className={css.searchBtnBox}>
                            <button className={css.btn}>SEARCH</button>
                        </div>
                    </div>*/}
                    <DatePicker wrapperClassName={css.control}>
                        <div className={css.searchBtnBox}>
                            <button className={css.btn} style={{ backgroundColor: button_color, color: font_color }}>SEARCH</button>
                        </div>
                    </DatePicker>
                </div>
            </div>
        );
    }
    constructor(props) {
        super(props);
        // this.state = {
        //     value: null,
        // };
    }
    componentDidMount() {
        let a = 10;
    }
    componentWillUnmount() {
        let a = 10;
    }
    componentWillUpdate(nextProps, nextState) {
        let a = 10;
    }''
    componentDidUpdate(prevProps, prevState) {
        let a = 10;
    }
    componentWillMount() {
        let a = 10;
    }
    shouldComponentUpdate(nextProps, nextState) {
        let a = 10;
        return true;
    }
    componentWillAppear(cb) {
        let a = 10;
    }
    componentWillEnter(cb) {
        let a = 10;
    }
};

module.exports = Widget;