import axios from "axios";

import { URL_DOMAIN_V1 } from "./API";
import token from "../utils/token";

export const APP_AUTH_HEADER_KEY = "Authorization";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
};

// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
const injectToken = (config) => {
  try {
    if (token.isTokenValid()) {
      if (config.headers !== undefined) {
        config.headers[APP_AUTH_HEADER_KEY] = `Bearer ${token.getToken()}`;
      }
    }
    return config;
  } catch (error) {
    throw new Error(error);
  }
};

class Http {
  instance = null;

  get http() {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: URL_DOMAIN_V1,
      headers,
      // withCredentials: true,
      timeout: 1000,
    });

    http.interceptors.request.use(injectToken, (error) =>
      Promise.reject(error)
    );

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return Promise.reject(error);
      }
    );

    this.instance = http;
    return http;
  }

  cancel() {
    try {
      const controller = new AbortController();
      controller.abort();
    } catch (err) {
      console.log(err);
    }
  }

  // async handleError(error) {
  //   const { status } = error
  //   console.log(error)
  //   this.cancel()
  //   switch (status) {
  //     case StatusCode.InternalServerError: {
  //       // Handle InternalServerError
  //       break
  //     }
  //     case StatusCode.Forbidden: {
  //       // Handle Forbidden
  //       break
  //     }
  //     case StatusCode.Unauthorized: {
  //       // Handle Unauthorized
  //       removeToken()
  //       if (
  //         typeof window !== 'undefined' &&
  //         window.location.pathname !== rc(RouteKey.Login).path
  //       ) {
  //         window.location.replace(rc(RouteKey.Login).path)
  //       }
  //       break
  //     }
  //     case StatusCode.TooManyRequests: {
  //       // Handle TooManyRequests
  //       break
  //     }
  //     case StatusCode.NotFound: {
  //       break
  //     }
  //     //
  //   }

  //   return Promise.reject(error)
  // }
}

export const http = new Http();

const AjaxHelper = {};

AjaxHelper.get = (url, params, options) => {
  return http.http.get(url, { params: params, ...options });
};

AjaxHelper.post = (url, params, options) => {
  return http.http.post(url, params, options);
};

AjaxHelper.put = (url, params, options) => {
  return http.http.put(url, params, options);
};

AjaxHelper.delete = (url, options) => {
  return http.http.delete(url, options);
};

AjaxHelper.getList = async (url, params, options) => {
  const configedUrl = configUrl(url);

  var result = await http.http.get(configedUrl, params, options);

  result = configResult(url, result, "get list");

  return result;
};
AjaxHelper.getOne = async (url, params) => {
  const configedUrl = `${configUrl(url)}/sku/${params.id}`;

  var result = await http.http.get(configedUrl);

  result = configResult(url, result, "get one");

  return result;
};
AjaxHelper.update = async function (url, payload) {
  var { id, ...restData } = payload?.data;

  const configedUrl = `${configUrl(url)}/${restData?.sku}`;

  await http.http.put(configedUrl, restData);

  const result = await AjaxHelper.getOne(url, payload?.data);

  return { data: payload?.data };
};

AjaxHelper.create = async function (url, payload) {
  const configedUrl = `${configUrl(url)}`;

  var result = await http.http.post(configedUrl, payload?.data);

  console.log(result);

  return { data: { id: payload?.sku, ...payload?.data } };
};

export default AjaxHelper;

//----------------------------------------------------------------
const configUrl = (url) => {
  switch (url) {
    case "products":
    case "users":
    case "orders":
      return `${URL_DOMAIN_V1}/${url}`;
    default:
      return url;
  }
};

//----------------------------------------------------------------
const configResult = (url, result, action) => {
  switch (url) {
    case "products": {
      switch (action) {
        case "get list": {
          var data = {};
          data = result?.data?.data?.items?.map((item, idx) => ({
            id: item.sku,
            ...item,
          }));
          const total = result?.data?.data?.itemsCount;

          return { data, total };
        }
        case "get one": {
          var data = {};
          data = result?.data?.data ?? {};
          data.id = data?.sku;

          return { data };
        }
        case "update": {
        }
        default:
          return result;
      }
    }
    case "users": {
      switch (action) {
        case "get list": {
          var data = {};
          data = result?.data?.data?.items;
          console.log(data);
          const total = result?.data?.data?.itemsCount;

          return { data, total };
        }
        case "get one": {
          var data = {};
          data = result?.data?.data;
          data.id = data?.sku;

          return { data };
        }
        case "update": {
        }
        default:
          return result;
      }
    }
    case "orders": {
      switch (action) {
        case "get list": {
          var data = {};
          data = result?.data?.data?.items;
          console.log(data);
          const total = result?.data?.data?.itemsCount;

          return { data, total };
        }
        case "get one": {
          var data = {};
          data = result?.data?.data;
          data.id = data?.sku;

          return { data };
        }
        case "update": {
        }
        default:
          return result;
      }
    }
    default:
      return result;
  }
};
