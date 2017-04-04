"use strict";

var React = require('react');
var Link = require('react-router').Link;

var Home = React.createClass({
    render: () => {
        return (
            <div className="jumbotron">
                <h1>Pluralsight Administration</h1>
                <p>REact, React Router, and Flux fro ultra responsive web applications</p>
                <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
            </div>
        );
    }
});
module.exports = Home;