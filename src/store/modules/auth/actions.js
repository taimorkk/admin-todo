//let baseServerUrl=sessionStorage.getItem('base_server_url')
//import axios from 'axios'

//var baseServerUrl = sessionStorage.getItem("base_server_url");

export default {
  login(context) {
    console.log("in action");

    return context.dispatch("auth");
  },

  auth(context) {
    console.log("in context");
    sessionStorage.setItem("token", "Zl49StyUu9721TFoRHfDqGmEVikCKNhJayGUgDvK");

    context.commit("setUser", {
      token: sessionStorage.getItem("token"),
    });
  },

  autoLogin(context) {
    const token = sessionStorage.getItem("token");

    if (token) {
      context.commit("setUser", {
        token: token,
      });
    }
  },

  logout(context) {
    console.log("logout");
    sessionStorage.removeItem("token");

    context.commit("setUser", {
      token: null,
      userId: null,
      roleId: null,
    });
  },
};
