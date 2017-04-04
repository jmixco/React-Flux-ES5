"use strict";
var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');


var ManageCoursePage = React.createClass({
    mixins: [
        Router.Navigation
    ],
    statics: {
        willTransitionFrom: function (transition, component) {
            if (component.state.dirty && !confirm('Leave without saving!?')) {
                transition.abort();
            }
        }
    },
    getInitialState: function () {
        return {
            course: { id: '', title: '', watchHref: '', category: '', author: {}, length: '' },
            authors: AuthorStore.getAllAuthors(),
            errors: {},
            dirty: false
        };
    },
    componentWillMount: function () {
        var courseId = this.props.params.id;
        if (courseId) {
            this.setState({ course: CourseStore.getCourseById(courseId) });
        }

    },
    setCourseState: function (event) {
        var field = event.target.name;
        var value = event.target.value;
        if (field === 'author') {
            console.log(value);
            var aut = AuthorStore.getAuthorById(value);
            value = {
                id: aut.id,
                name: `${aut.firstName} ${aut.lastName}`
            };
            console.log(value);
        }
        this.state.course[field] = value;

        return this.setState({ course: this.state.course, dirty: true });
    },
    courseFormIsValid: function () {
        var formIsValid = true;
        var errors = {};

        if (this.state.course.title.length < 3) {
            errors.firstName = 'First name must be at least 3 characters';
            formIsValid = false;
        }
        if (this.state.course.category.length < 3) {
            errors.lastName = 'Last name must be at least 3 characters';
            formIsValid = false;
        }
        this.setState({ errors: errors });
        return formIsValid;
    },
    saveCourse: function (event) {
        event.preventDefault();

        if (!this.courseFormIsValid()) {
            return;
        }
        if (this.state.course.id) {
            CourseActions.updateCourse(this.state.course);
        } else {
            CourseActions.createCourse(this.state.course);
        }
        this.setState({ dirty: false });
        toastr.success('Course Saved!');
        this.transitionTo('courses');
    },
    render: function () {
        return (

            <CourseForm course={this.state.course}
                authors={this.state.authors}
                onChange={this.setCourseState}
                onSave={this.saveCourse}
                errors={this.state.errors}
            />

        );
    }
});
module.exports = ManageCoursePage;