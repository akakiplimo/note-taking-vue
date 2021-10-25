const state = {
  notes: [],
  timestamps: []
};

const mutations = {
  ADD_NOTE(state, payload){
    let newNote = payload;
    state.notes.push(newNote);
  },
  ADD_TIMESTAMP(state, payload){
    let newTimestamp = payload;
    state.timestamps.push(newTimestamp);
  },
};

const actions = {
  addNote(context, payload){
    context.commit('ADD_NOTE', payload);
  },
  addTimestamp(context, payload){
    context.commit('ADD_TIMESTAMP', payload);
  },
};

const getters = {
  getNotes: state => state.notes,
  getTimestamps: state => state.timestamps,
  getNoteCount: state => state.notes.length,

};

const store = Vuex.createStore({
  state,
  mutations,
  actions,
  getters
})

const inputComponent = {
  template: `<input placeholder='Enter a note' class="input is-small" type="text" 
            v-model = "input"
            @keyup.enter = "monitorEnterKey"
            />`,
  data(){
    return{
      input: ''
    };
  },
  methods: {
    monitorEnterKey(){
      if (this.input === '') return;
      this.$store.dispatch('addNote', this.input);
      this.$store.dispatch('addTimestamp', new Date().toLocaleString());
      this.input = ''; //set input field back to blank
    }
  }
}

const noteCountComponent = {
  template: `<div class="note-count">
            Note count: <strong>{{ noteCount }}</strong>
            </div>`,
  computed: {
    noteCount(){
      return this.$store.getters.getNoteCount;
    }
  }          
}

const app = Vue.createApp({
  computed: {
    notes(){
      return this.$store.getters.getNotes;
    },
    timestamps(){
      return this.$store.getters.getTimestamps;
    },
  },
  components: {
    'input-component': inputComponent,
    'note-count-component': noteCountComponent,
  }
});

app.use(store);
app.mount('#app');
