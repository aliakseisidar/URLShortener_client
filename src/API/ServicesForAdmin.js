import axios from "axios";

export default class ServicesForAdmin {
  static async getUsers(offset = 0, token, searchparam = "", limit = 10) {
    const response = await axios.get("http://localhost:5000/admin/users", {
      headers: {
        authorization: `Bearer ${token}`,
        limit,
        offset,
        searchparam,
      },
    });
    return response;
  }

  static async updateUser(token, user, username, password, role) {
    const response = await axios.post(
      "http://localhost:5000/admin/updateUser",
      { username, password, role },
      {
        params: { _id: user._id },
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }

  static async deleteUser(_id, token) {
    const response = await axios.delete(
      `http://localhost:5000/admin/deleteUser`,
      {
        params: { _id },
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }

  static async fetchURLsByUser(offset = 0, token, userId) {
    const response = await axios.get(
      "http://localhost:5000/admin/fetchURLsByUser",
      {
        headers: {
          authorization: `Bearer ${token}`,
          limit: 10,
          offset,
          userId,
        },
      }
    );
    return response;
  }
}
