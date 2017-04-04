"use strict";

var React = require('react');
var Link = require('react-router').Link;

var NotFoundPage = React.createClass({
    render: () => {
        return (
            <div >
                <h1>Page Not Found</h1>
                <p>Whoops! Sorry, ther is nothing to see here.</p>
                <p><Link to="app" className="btn btn-primary btn-lg">Back To Home!</Link></p>
            </div>
        );
    }
});
module.exports = NotFoundPage;