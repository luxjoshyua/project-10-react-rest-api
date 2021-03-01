import config from "./config";

export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    /* check if auth is required - are we making a request to a protected route on the server
      if yes, encode user credentials and set HTTP Authorization request header to Basic authentication type,
      followed by encoded user credentials
    
    if (requiresAuth) {
      // btoa() creates base-64 encoded string
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );

      // hold the credentials to authenticate the client with the server
      // encodedCredentials is a series of letters and numbers
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    */

    return fetch(url, options);
  }

  // API GET user
  async getUser(username, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      username,
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

  // API POST create user
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
