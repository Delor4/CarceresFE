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
function checkLocalStorageTokens() {
  return !(!getAccessToken() || !getRefreshToken())
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
    this._updateAuthorizedStatus()
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
    api._saveTokens(tokens.data)
  }

  logout = function () {
    api._removeTokens()
  }

  /* METHODS */
  get = async function (...args) {
    return await this.api.get.apply(this.api, args).then(this._getData).catch(this._errorHandle);
  }
  post = async function (...args) {
    return await this.api.post.apply(this.api, args).then(this._getData).catch(this._errorHandle);
  }
  put = async function (...args) {
    return await this.api.put.apply(this.api, args).then(this._getData).catch(this._errorHandle);
  }
  delete = async function (...args) {
    return await this.api.delete.apply(this.api, args).then(this._getData).catch(this._errorHandle);
  }

  /* API ENDPOINTS */
  getUser = async function () {
    return await this.get("/api/user");
  }
  getUsers = async function () {
    return await this.get("/api/users");
  }

  /* response handling */
  /* Response to methods this.get(), this.post(), ... */
  _getData = function (response) {
    //console.log(response.config.method, response.config.url, "->", response.status)
    return response.data;
  }

  /* Errors in methods this.get(), this.post(), ... */
  _errorHandle = function (error) {
    if (error.response.status == 401) {
      console.log('Refreshing token...');
      return api._refresh(error)
    }
    console.log('Http error: ', error);
    return Promise.reject(error);
  }

  _refreshToken = async function () {
    return await this.api.post(`/api/refresh`, { refresh_token: getRefreshToken() });
  }

  _refresh = async function (err) {
    return await this._refreshToken().then(resp => {
      /* save tokens */
      api._saveTokens(resp.data)
      /* rerun request with new token */
      err.config.headers['x-access-tokens'] = getAccessToken();
      return api.api.request(err.config)
    });
  }

  auth = {
    authorized: false,
  }
  _updateAuthorizedStatus() {
    this.auth.authorized = checkLocalStorageTokens()
  }
  _removeTokens() {
    removeLocalStorageTokens()
    api._updateAuthorizedStatus()
  }

  _saveTokens(tokens) {
    setLocalStorageTokens(tokens)
    api._updateAuthorizedStatus()
  }

}

const api = new Api()
export default api
