import axios from "axios";
import { URL_DOMAIN_V1 } from "../../services/API";
import token from "../../utils/token";

const authProvider = {
  login: async ({ username, password }) => {
    try {
      const result = await axios.post(`${URL_DOMAIN_V1}/Auths/signin`, {
        email: username,
        password: password,
      });

      const config = {
        headers: { Authorization: "Bearer " + result.data?.data?.accessToken },
      };
      const order = await axios.get(
        `${URL_DOMAIN_V1}/orders?sortBy=createAt`,
        config
      );
      //console.log(order)
      token.setToken(result.data?.data?.accessToken);
    } catch (e) {
      console.log(e);
      throw new Error(e.response?.data?.message);
    }
  },
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => {
    // Required for the authentication to work
    return Promise.resolve();
  },
  // ...
};

export default authProvider;
