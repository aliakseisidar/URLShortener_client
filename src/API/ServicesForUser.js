import axios from "axios";

export default class ServicesForUser {
  static async signIn(username, password) {
    const response = await axios.post(
      "http://localhost:5000/auth/registration",
      {
        username,
        password,
      }
    );
    return response;
  }

  static async logIn(username, password) {
    const response = await axios.post("http://localhost:5000/auth/login", {
      username,
      password,
    });
    return response;
  }
}
