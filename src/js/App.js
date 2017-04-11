'use strict';

/* React stuff */
const util = require('util');
const React = require('react');
// const ReactDOM = require('react-dom');

let globals = require('globals.scss');
let css = require('App.local');

class App extends React.Component {
    render() {
       return (
            <div className="content">

            </div>
        );
    }
    constructor() {
        super();
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

module.exports = App;