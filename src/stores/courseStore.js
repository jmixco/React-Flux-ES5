"use strict";
var _ = require('lodash');
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CourseApi = require('../api/courseApi');

const CHANGE_EVENT = 'change';

var _courses = [];

var CourseStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (cb) {
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function (cb) {
        this.removeListener(CHANGE_EVENT, cb);
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT)
    },
    getAllCourses: function () {
        return _courses;
    },
    getCourseById: function (id) {
        return _.find(_courses, { id: id });
    },
    updateAuthorNameById: function (id, name) {
        var filtered = _courses.filter((c, index, array) => {
            return c.author.id === id;
        });
        filtered.forEach((c, index, array) => {
            c.author.name = name;
            this.updateCourse(c);
        });
        return true;
    },
    updateCourse: function (course) {
        var existingCourse = _.find(_courses, { id: course.id });
        var existingCourseIndex = _.indexOf(_courses, existingCourse);
        _courses.splice(existingCourseIndex, 1, course);
    }
});

Dispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionTypes.INITIALIZE:
            _courses = action.initialData.courses;
            CourseStore.emitChange();
            break;
        case ActionTypes.CREATE_COURSE:
            _courses.push(action.course);
            CourseStore.emitChange();
            break;
        case ActionTypes.UPDATE_COURSE:
            var existingCourse = _.find(_courses, { id: action.course.id });
            var existingCourseIndex = _.indexOf(_courses, existingCourse);
            _courses.splice(existingCourseIndex, 1, action.course);
            CourseStore.emitChange();
            break;
        case ActionTypes.DELETE_COURSE:
            _.remove(_courses, function (course) {
                return action.id === course.id;
            });
            CourseStore.emitChange();
            break;

        case ActionTypes.UPDATE_AUTHOR:
            CourseStore.updateAuthorNameById(action.author.id, `${action.author.firstName} ${action.author.lastName}`)

            CourseStore.emitChange();
            break;


        default:
            break;
    }
});
module.exports = CourseStore;