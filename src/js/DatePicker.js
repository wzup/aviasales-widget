'use strict';


const React = require('react');
const ReactDOM = require('react-dom');


// const DatePicker = require('react-datepicker');
const moment = require('moment');
// import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
var DatePicker = require('react-datepicker');
// require('react-datepicker/dist/react-datepicker.css');


class DP extends React.Component {
    render() {

        // return (
        //     <SingleDatePicker
        //         {...this.props}
        //         id="date_input"
        //         date={this.state.date} // momentPropTypes.momentObj or null
        //         onDateChange={this.onDateChange} // PropTypes.func.isRequired
        //         focused={this.state.focused} // PropTypes.bool
        //         onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
        //     />
        // );
        return (
            <div className={this.props.wrapperClassName}>
                <div className="outBox">
                    <DatePicker
                        placeholderText="Depart Date"
                        // customInput={<span>Return Date</span>}
                        className="dp"
                        dateFormat="DD.MM.YYYY"
                        selected={this.state.startDate}
                        selectsStart
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeStart} />
                </div>
                <div className="rtBox">
                    <DatePicker
                        placeholderText="Return Date"
                        // customInput={<span>Return Date</span>}
                        className="dp"
                        dateFormat="DD.MM.YYYY"
                        selected={this.state.endDate}
                        selectsEnd
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChange={this.handleChangeEnd} />
                </div>
                {this.props.children}
            </div>
        )
    }

    onFocusChange = ({focused}) => {
        console.log('[onFocusChange] focused', focused);
        this.setState({
            focused: focused
        })
    }

    onDateChange = (date) => {
        console.log('[onDateChange] date', date)
        this.setState({ date })
    }

    handleChangeStart = (date) => {
        this.setState({
          startDate: date
        });
    }

    handleChangeEnd = (date) => {
        this.setState({
          endDate: date
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            // date: moment(),
            startDate: moment(),
            endDate: moment().add(1, 'day'),
            // focused: false,
        };
        // this.onDateChange = this.onDateChange.bind(this);
        // this.onFocusChange = this.onFocusChange.bind(this);
        // this.onClick = this.onClick.bind(this);
    }
    componentDidMount() {
        let a = 10;
    }
    componentWillUnmount() {
        let a = 10;
    }
    componentWillUpdate(nextProps, nextState) {
        let a = 10;
    }
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

DP.defaultProps = {
    id: 'date',
    placeholder: 'Date',
    screenReaderInputMessage: '== screenReaderInputMessage ==',
    showClearDate: true,
    reopenPickerOnClearDate: true,
    monthFormat: 'MMMM YYYY',
    displayFormat: () => moment.localeData().longDateFormat('L'),
}

module.exports = DP;