<template>
  <div class="container">
    <div class="item-recebida" v-if="uid !== getUid">
     
      
      <v-avatar size="32" tile>
        <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png"  alt="avatar" />
        <div class="id-mensagem-recebida"> {{ autorEmail }}</div>
      </v-avatar>
      <div class="bolha-recebidad">{{ mensagem }}</div>
    </div>
    <p class="hora-recebida" v-if="uid !== getUid">{{ dataHoraMin }}</p>
    <div class="item-enviada" v-if="uid === getUid">
      <v-avatar size="32" tile>
        <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png"   alt="avatar" />
        <div class="id-mensagem-enviada" > {{ autorEmail }}</div>
      </v-avatar>
      <div class="bolha-enviada" >{{ mensagem }}</div>
    </div>
    <p class="hora-enviada" v-if="uid === getUid">{{ dataHoraMin }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import firebase from "../../firebase"
export default {
  props: {
    uid: String,
    mensagem: String,
    dataMensagem: String,
    autorEmail: String
  },

  computed: {
    ...mapGetters(["getUid"]),
    dataHoraMin() {
      return (
        
        new Date(this.dataMensagem).getHours()+
        ":" +
        new Date(this.dataMensagem).getMinutes()
      );
    },
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

.item-recebida {
  display: flex;
  align-items: flex-end;
}

.id-mensagem-recebida{
  position: absolute;
    bottom: 50px;
    left: 0px;
    width: auto;
    padding: 4px 12px;
    background-color: #8080809e;
    color: white;
    border-radius: 3px;
    opacity: 0;
    transition: 500ms opacity linear;
}

.item-recebida div:hover > .id-mensagem-recebida{
  opacity: 1;
}

.bolha-recebidad {
  max-width: 50%;
  word-wrap: break-word;
  overflow: hidden;
  padding: 10px 14px;
  margin-left: 10px;
  background-color: rgb(93, 116, 216);
  color: white;
  border-radius: 20px 20px 20px 0px;
}

.hora-recebida {
  font-size: 10px;
  margin-top: 5px;
  margin-left: 42px;
}

.item-enviada {
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
}

.id-mensagem-enviada{
  position: absolute;
    bottom: 50px;
    right: 0px;
    width: auto;
    padding: 4px 12px;
    background-color: #8080809e;
    color: white;
    border-radius: 3px;
    opacity: 0;
    transition: 500ms opacity linear;
}

.item-enviada div:hover > .id-mensagem-enviada{
  opacity: 1;
}

.bolha-enviada {
  max-width: 50%;
  word-wrap: break-word;
  overflow: hidden;
  padding: 10px 14px;
  margin-left: 10px;
  background-color: rgb(152, 233, 98);
  color: white;
  border-radius: 20px 20px 0px 20px;
  
}

.hora-enviada {
  font-size: 10px;
  margin-top: 5px;
  text-align: end;
  margin-right: 42px;
}
</style>
