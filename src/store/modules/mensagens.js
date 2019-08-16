import firebase from "../../firebase";

const state = {
  mensagens: []
};

const getters = {
  allMensagens: state => {
    return state.mensagens;
  },

  nMensagens: state => {
    return state.mensagens.length;
  },
};

const mutations = {
  RECUPERAR_MENSAGENS(state, payload) {
    state.mensagens = payload;
  }

  // MANDAR_MENSAGEM(state, payload) {
  //   const ms = {
  //     uid: localStorage.getItem("uid"),
  //     mensagem: payload.mensagem,
  //     dataMensagem: payload.dataMensagem
  //   };
  //   // firebase
  //   //   .firestore()
  //   //   .collection("mensagens")
  //   //   .onSnapshot(function(doc) {
  //   //     doc.docChanges().map(data => {
  //   //       state.mensagens.push(data.doc.data());
  //   //     });
  //   //   });
  // }
};

const actions = {
  recuperarMensagens({ commit }) {
    var mensagens = [];
    firebase
      .firestore()
      .collection("mensagens")
      .orderBy("dataMensagem")
      .onSnapshot(function(doc) {
        doc.docChanges().map(data => {
          if (data.type === "added") {
            mensagens.push(data.doc.data());
          }
        });
        commit("RECUPERAR_MENSAGENS", mensagens);
      });
  },

  mandarMensagem({ commit }, mensagem) {
    const ms = {
      uid: localStorage.getItem("uid"),
      mensagem: mensagem.mensagem,
      dataMensagem: mensagem.dataMensagem,
      autorEmail: localStorage.getItem("email")
    };
    firebase
      .firestore()
      .collection("mensagens")
      .add(ms)
      .then(user => {
        // commit("MANDAR_MENSAGEM", ms);
      })
      .catch(err => {});
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
