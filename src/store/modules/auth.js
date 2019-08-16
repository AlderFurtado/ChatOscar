import firebase from "../../firebase";
import router from "../../plugins/router";

const state = {
  user: {
    email: "",
    uid: ""
  }
};

const getters = {
  getUid: state => {
    return localStorage.getItem("uid");
  }
};

const mutations = {
  // LOGAR(state, payload) {
  //   state.user.email = payload.email;
  //   state.user.uid = payload.uid;
  // },

  GET_CREDENCIAIS(state, payload){
    state.user.email = payload.email;
    state.user.uid = payload.uid;
  }
};

const actions = {
  logar({ commit }, user) {
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(user => {
        var userState = {
          email: user.user.email,
          uid: user.user.uid
        };
        commit("GET_CREDENCIAIS", userState);

        localStorage.setItem("email", userState.email);
        localStorage.setItem("uid", userState.uid);
        window.location.reload();
        router.push({ path: '/chat'});
      })
      .catch(err => {
        return err;
      });
  },

  recuperarCredenciais({commit}){
    const user = {
      email: localStorage.getItem("email"),
      uid: localStorage.getItem("uid")
    }
    commit("GET_CREDENCIAIS",user);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
