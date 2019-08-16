<template>
  <div class="container-principal">
    <span id="nMensagens" v-if="!modalChat">{{nMensagens}}</span>

    <transition name="fade">
      <v-fab-transition v-if="!modalChat">
        <v-btn id="flat-button" color="pink" dark absolute right bottom fab @click="openChat">
          <v-icon>chat</v-icon>
        </v-btn>
      </v-fab-transition>
    </transition>
    <transition name="fade">
      <v-sheet elevation="4" color="warning" id="chat" v-if="modalChat">
        <div class="container-titulo">
          <h1>Chat do oscar</h1>
          <v-icon size="42" id="icone-close" tile @click="openChat">close</v-icon>
        </div>
        <div class="container-mensagens" ref="chatList">
          <chatItem
            v-for="(m,index) in allMensagens"
            :key="index"
            :uid="m.uid"
            :mensagem="m.mensagem"
            :dataMensagem="m.dataMensagem"
            :autorEmail="m.autorEmail"
          />
        </div>
        <div class="container-input">
          <input
            type="text"
            placeholder="Escreva aqui ..."
            v-model="mensagem.mensagem"
            v-on:keyup.enter="mandarMensagem(mensagem)"
          />
          <v-icon size="42" id="icone-close" @click="mandarMensagem(mensagem)">send</v-icon>
        </div>
      </v-sheet>
    </transition>
       <v-snackbar
      v-model="snackbar"
      :timeout=timeout
    >
        Você recebeu uma nova mensagem
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
      ok
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import chatItem from "./chatItem";
import { mapGetters } from "vuex";
import firebase from "../../firebase"

import { setTimeout } from 'timers';
import { constants } from 'crypto';
export default {
  components: {
    chatItem
  },

  data() {
    return {
      modalChat: false,
      mensagem: {
        mensagem: "",
        uid: "",
        dataMensagem: new Date().toString()
      },
      snackbar:false,
      timeout:2000,
      nMensagens: 0
    };
  },

  mounted(){
    this.$store.dispatch("recuperarCredenciais");
    this.$store.dispatch("recuperarMensagens") 
  },

  computed: {
    ...mapGetters(
      {allMensagens :"allMensagens"},
      {nMensagens: "nMensagens"}
      ),
  },

  methods: {
    openChat() {
      this.modalChat = !this.modalChat;
    },
    mandarMensagem() {
      if (!this.mensagem.mensagem == "") {
        this.$store.dispatch("mandarMensagem", this.mensagem);
        this.mensagem.mensagem = "";
      }
    }
  },

  watch:{
    allMensagens(){
      this.nMensagens = this.$store.getters.nMensagens
      if(this.modalChat == false && this.nMensagens > 0){
        this.snackbar = true
      }
      console.log(this.nMensagens)
      this.$nextTick(() => {
        this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight;
      });
    },

  }
 
};
</script>

<style scoped>
.container-principal {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
}

#flat-button {
  bottom: 2% !important;
}

#nMensagens{
  position: absolute;
    bottom: 50px;
    right: 10px;
    z-index: 10;
    padding: 5px;
    background-color: red;
    border-radius: 50%;
    color: white;
}

#chat {
  width: 85%;
  height: 80%;
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 2%;
  right: 16px;
  box-shadow: rgb(202, 199, 199) 8px 10px 16px;
}

#icone-close {
  align-self: flex-end;
}

.container-titulo {
  display: flex;
  align-items: center;
  padding: 10px;
}

.container-titulo h1 {
  flex: 1;
  margin: 0;
}

.container-mensagens {
  flex: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}

.container-input {
  flex: auto;
  padding: 0px 10px;
  display: flex;
  border-top: rgb(202, 202, 202) 1px solid;
}

.container-input input {
  flex: 0.99;
  outline: none;
}

.container-input i {
  flex: 0.01;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
