import Axios from "axios"


const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");

function setLocalStorageTokens(tokens) {
  if (tokens.access_token)
    localStorage.setItem("access_token", tokens.access_token);
  if (tokens.refresh_token)
    localStorage.setItem("refresh_token", tokens.refresh_token);
}

function removeLocalStorageTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

function errorHandle(error) {
  console.log('Http error: ', error, error.response);

  if (error.response.status == 401) {
    return api.refresh() //TODO: need rerun request
  }
  return Promise.reject(error);
}

class Api {
  constructor() {
    this.api = Axios.create({
      baseURL: "http://localhost:43343", //TODO: change this before send to production
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    });
    this.api.interceptors.request.use(config => {
      config.headers.common['x-access-tokens'] = getAccessToken();
      return config;
    });
    if (getAccessToken()) {
      this.auth.authorized = true;
    }
  }

  auth = {
    authorized: false,
  }
  refreshToken = async function () {
    return await this.api.post(`/api/refresh`, { refresh_token: getRefreshToken() });
  }

  /* METHODS */
  get = async function (...args) {
    return await this.api.get.apply(this.api, args).then(this.getData).catch(errorHandle);
  }
  post = async function (...args) {
    return await this.api.post.apply(this.api, args).then(this.getData).catch(errorHandle);
  }
  put = async function (...args) {
    return await this.api.put.apply(this.api, args).then(this.getData).catch(errorHandle);
  }
  delete = async function (...args) {
    return await this.api.delete.apply(this.api, args).then(this.getData).catch(errorHandle);
  }

  /* response handling */
  getData = function (response) {
    //console.log(response.config.method, response.config.url, "->", response.status)
    return response.data;
  }

  refresh = async function () {
    var resp = await this.refreshToken()
    setLocalStorageTokens(resp.data)
    this.auth.authorized = true;
  }

  /* login */
  login = async function (login, password) {

    var tokens = await this.api.get(`/api/login`, {
      auth: {
        username: login,
        password: password
      }
    }
    )
    setLocalStorageTokens(tokens.data)
    this.auth.authorized = true;
  }

  logout = async function () {
    removeLocalStorageTokens()
    this.auth.authorized = false;
  }

  /* API ENDPOINTS */
  getUser = async function () {

    return await this.get("/api/user");
  }
  getUsers = async function () {
    return await this.get("/api/users");
  }
}

const api = new Api()
export default api
