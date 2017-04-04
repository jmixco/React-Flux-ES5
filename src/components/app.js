var JQuery = require('jquery');
var $ = JQuery;
var React = require('react');
var Header = require('./common/header');
var RouteHandler = require('react-router').RouteHandler;
var App = React.createClass({
    render: function () {
        var Child;

        return (
            <div>
                <Header />
                <div className="container-fluid">
                    <RouteHandler />
                </div>

            </div>
        );
    }
});
module.exports = App;