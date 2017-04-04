"use strict";
var React = require('react');
var Input = require('../common/textInput');
var Dropdown = require('../common/dropdown');



var CourseForm = React.createClass({
    propTypes: {
        course: React.PropTypes.object.isRequired,
        authors: React.PropTypes.array.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object,
    },

    render: function () {
        var ddoptions = this.props.authors.map((author) => {
            return {
                value: author.id,
                text: `${author.firstName} ${author.lastName}`
            };
        });
        return (
            <form >
                <h1>Manage Author</h1>
                <Input
                    name='title'
                    label="Title"
                    value={this.props.course.title}
                    onChange={this.props.onChange}
                    error={this.props.errors.title} />
                <Dropdown
                    name='author'
                    label="Author"
                    value={this.props.course.author.id}
                    options={ddoptions}
                    onChange={this.props.onChange}
                    error={this.props.errors.author} />

                <Input
                    name='category'
                    label="Category"
                    value={this.props.course.category}
                    onChange={this.props.onChange}
                    error={this.props.errors.category} />

                <Input
                    name='length'
                    label="Length"
                    value={this.props.course.length}
                    onChange={this.props.onChange}
                    error={this.props.errors.length} />

                <input type="submit" value="Save"
                    className="btn btn-default"
                    onClick={this.props.onSave}
                />
            </form>
        );
    }
});
module.exports = CourseForm;