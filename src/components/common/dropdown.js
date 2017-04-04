"use strict";
var React = require('react');



var Dropdown = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.string,
        error: React.PropTypes.string
    },

    render: function () {
        var wrapperClass = 'form-group';

        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += "" + ' has-error';
        }
        var values = [];
        values = this.props.options.slice();

        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <select name={this.props.name}
                        className="form-control"
                        placeholder={this.props.placeholder}
                        ref={this.props.name}
                        onChange={this.props.onChange}
                        value={this.props.value}>
                        {
                            values.map((element)=>{
                                return(<option value={element.value}>{element.text}</option>)
                            })
                        }
                        
                    </select>

                    <div className="input">{this.props.error}</div>
                </div>
            </div>
        );
    }
});
module.exports = Dropdown;