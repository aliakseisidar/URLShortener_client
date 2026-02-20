import axios from "axios";
import { baseURL } from "../config";

export default class ServicesForUser {
  static async signIn(username, password) {
    const response = await axios.post(
      `${baseURL}/auth/registration`,
      {
        username,
        password,
      }
    );
    return response;
  }

  static async logIn(username, password) {
    const response = await axios.post(`${baseURL}/auth/login`, {
      username,
      password,
    });
    return response;
  }
}
