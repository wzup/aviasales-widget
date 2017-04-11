'use strict';

const React = require('react');
// const ReactDOM = require('react-dom');
const DatePicker = require('./DatePicker');
let css = require('Widget.scss');


class Widget extends React.Component {
    render() {
        /**
         * @todo Если по серьезному, то нужна валидация входящих props. Не делаю.
         */
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
    componentDidMount() { }
    componentWillUnmount() { }
    componentWillUpdate(nextProps, nextState) { }
    componentDidUpdate(prevProps, prevState) { }
    componentWillMount() { }
    shouldComponentUpdate(nextProps, nextState) { return true; }
    componentWillAppear(cb) { }
    componentWillEnter(cb) { }
};

module.exports = Widget;