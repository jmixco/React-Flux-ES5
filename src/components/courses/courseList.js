"use strict";
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var toastr = require('toastr');

var CourseList = React.createClass({
    propTypes: {
        courses: React.PropTypes.array.isRequired
    },
    deleteCourse: function (id, event) {
        event.preventDefault();
        CourseActions.deleteCourse(id);
        toastr.success('Course deleted');
    },
    render: function () {
        var createCourseRow = function (course) {
            return (
                <tr key={course.id}>
                    <td><a href={course.watchHref} >WATCH</a></td>
                    <td><a href="#" onClick={this.deleteCourse.bind(this, course.id)}>DELETE</a></td>
                    <td><Link to="manageCourse" params={{ id: course.id }}>{course.id}</Link></td>
                    <td>{course.title}</td>
                    <td>{course.author.name}</td>
                    <td>{course.length}</td>
                </tr>
            );
        };
        return (
            <div>
                <table className="table">
                    <thead>
                        <th></th>
                        <th></th>
                        <th>ID</th>
                        <th>Title</th>
                        <th>author</th>
                        <th>length</th>
                    </thead>
                    <tbody>
                        {this.props.courses.map(createCourseRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});
module.exports = CourseList;