import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/**
 * Courses Component
 *  - retrieves the list of courses from the REST API /api/courses route
 *  - renders list of courses
 *  - each course needs to link to its respective "Course Detail" screen
 *  - component renders a link to the "Create Course" screen
 */
export default class Courses extends Component {
  constructor() {
    // lets us use this keyword within the Courses class
    super();
    this.state = {
      courses: [],
    };
  }

  // fetch this - http://localhost:5000/api/courses"

  // do axios request

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/courses`)
      .then((response) => {
        console.log("What does response look like", response);
        this.setState({
          courses: response.data,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
        // push onto error stack
      });
  }

  // componentDidUpdate()

  // then populate the DOM with the fetched data

  render() {
    return (
      <div className="bounds">
        <div className="grid-33">
          <Link
            className="course--module course--add--module"
            to="/courses/create"
          >
            <h3 className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </h3>
          </Link>
        </div>
      </div>
    );
  }
}
