import axios from "axios";

export default class Services {
  static async fetchURLs(offset = 0, token) {
    const response = await axios.get("http://localhost:5000/url/fetchURLs", {
      headers: {
        authorization: `Bearer ${token}`,
        limit: 10,
        offset,
      },
    });
    return response;
  }

  static async searchURLs(offset = 0, token, tagsearchparam, titlesearchparam) {
    const response = await axios.get("http://localhost:5000/url/searchURLs", {
      headers: {
        authorization: `Bearer ${token}`,
        limit: 10,
        offset,
        tagsearchparam,
        titlesearchparam,
      },
    });
    return response;
  }

  static async fetchURL(param, token) {
    const response = await axios.get("http://localhost:5000/url/fetchURL", {
      params: {
        shortURL: `http://localhost:5000/${param}`,
      },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response;
  }

  static async shortURL(longURL, title, tagsStr, token) {
    let tagsArr = [];
    if (tagsStr.length !== 0) tagsArr = tagsStr.split(" ");
    const response = await axios.post(
      "http://localhost:5000/url/shortURL",
      {
        originalURL: longURL,
        title: title,
        tags: tagsArr,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }

  static async deleteURL(_id, token) {
    const response = await axios.delete(`http://localhost:5000/url/deleteURL`, {
      params: { _id },
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response;
  }

  static async updateTags(url, token, tags) {
    const response = await axios.post(
      "http://localhost:5000/url/updateTags",
      {
        tags,
      },
      {
        params: {
          _id: url._id,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }
}
