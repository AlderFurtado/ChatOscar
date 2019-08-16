import Vue from 'vue';
import Vuex from 'vuex';
import mensagem from './modules/mensagens'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        mensagem,
        auth
    }
})