/**
 * Create Course Component
 *  - /courses/create route
 *  - renders a form allowing user to create new course
 *  - renders "Create Course" button that sends POST request to /api/courses route
 *  - renders "Cancel" button that returns user to default route (i.e. list of courses)
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CreateCourse extends Component {
  render() {
    return (
      <div>
        <h1>Create Course Component!</h1>
      </div>
    );
  }
}
