import config from './config';

export default class Data {
  api(
    path,
    method = 'GET',
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    /* check if auth is required - are we making a request to a protected route on the server
      if yes, encode user credentials and set HTTP Authorization request header to Basic authentication type,
      followed by encoded user credentials
    */
    if (requiresAuth) {
      // btoa() creates base-64 encoded string
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      // hold the credentials to authenticate the client with the server
      // encodedCredentials is a series of letters and numbers
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  // API GET user
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, {
      emailAddress,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  // makes POST request to the API to create new user
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      console.log('user successfully created');
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else if (response.status === 500) {
      this.props.history.push('/error');
    } else {
      throw new Error();
    }
  }

  // makes post request to create new course
  async createCourse(course, emailAddress, password) {
    const response = await this.api('/courses', 'POST', course, true, {
      emailAddress,
      password,
    });
    if (response.status === 201) {
      console.log('course successfully created');
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else if (response.status === 500) {
      this.props.history.push('/error');
    } else {
      throw new Error();
    }
  }

  // makes put request to update course
  async updateCourse(id, course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, {
      emailAddress,
      password,
    });
    if (response.status === 204) {
      console.log(`course successfully updated by ${emailAddress}`);
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else if (response.status === 500) {
      this.props.history.push('/error');
    } else {
      throw new Error();
    }
  }

  // send delete request to to /api/courses/:id route
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {
      emailAddress,
      password,
    });
    if (response.status === 204) {
      console.log(`course successfully deleted by ${emailAddress}`);
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else if (response.status === 500) {
      this.props.history.push('/error');
    } else {
      throw new Error();
    }
  }

  // make get request to /api/courses/:id route
  async getCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'GET', null, true, {
      emailAddress,
      password,
    });
    if (response.status === 200) {
      console.log('Course was successfully fetched!');
      return response.json().then((data) => data);
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else if (response.status === 500) {
      this.props.history.push('/error');
    } else {
      throw new Error();
    }
  }
}
