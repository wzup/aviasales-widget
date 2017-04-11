'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
let Widget = require('./Widget');

module.exports = {
    init: (params) => {
        ReactDOM.render(
            <Widget {...params} />,
            document.getElementById(params.id)
        )
    }
}