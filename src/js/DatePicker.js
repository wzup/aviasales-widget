'use strict';


const React = require('react');
const ReactDOM = require('react-dom');

const moment = require('moment');
var DatePicker = require('react-datepicker');



class DP extends React.Component {
    render() {

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
            startDate: moment(),
            endDate: moment().add(1, 'day'),
        };
        // this.onDateChange = this.onDateChange.bind(this);
        // this.onFocusChange = this.onFocusChange.bind(this);
        // this.onClick = this.onClick.bind(this);
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

DP.defaultProps = {
    // id: 'date',
    // placeholder: 'Date',
    // screenReaderInputMessage: '== screenReaderInputMessage ==',
    // showClearDate: true,
    // reopenPickerOnClearDate: true,
    // monthFormat: 'MMMM YYYY',
    // displayFormat: () => moment.localeData().longDateFormat('L'),
}

module.exports = DP;