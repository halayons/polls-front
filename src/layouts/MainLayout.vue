<template>
  <q-layout view="lHh Lpr lff">
    <q-header elevated class="bg-cyan-8">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="400">
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item
            clickable
            v-ripple
            v-for="(poll, index) in polls"
            :key="index"
            v-on:click="getQuestions(index + 1)"
          >
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> {{ poll.poll_name }} </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <ul id="example-1">
        <q-toolbar class="bg-purple text-white shadow-2 rounded-borders">
          <q-btn flat label="Encuesta" />
        </q-toolbar>
        <div class="div-1">
          <li v-for="(question, index) in questions" :key="index">
            <h6>{{ question.question_text }}</h6>

            <label class="form-control">
              <input
                type="radio"
                class="free-label four col"
                :id="index"
                :value="question.option_one"
                v-model="responses1[index]"
              />
              {{ question.option_one }}</label
            >
            <br />
            <label class="form-control">
              <input
                type="radio"
                class="free-label four col"
                :id="index + 1"
                :value="question.option_two"
                v-model="responses1[index]"
              />
              {{ question.option_two }}</label
            >
            <br />
          </li>
          <li v-for="(question, index) in questionso" :key="index">
            <h6>{{ question.question_text }}</h6>

            <input type="text" v-model="responses2[index]" />
            <br />
          </li>
          <li v-for="(question, index) in questionsm" :key="index">
            <h6>{{ question.question_text }}</h6>
            <label class="form-control">
              <input
                type="checkbox"
                class="option-input checkbox"
                id="jack"
                :value="question.option_one"
                v-model="checkedNames"
              />
              {{ question.option_one }}</label
            >
            <br />
            <label class="form-control">
              <input
                type="checkbox"
                class="option-input checkbox"
                id="john"
                :value="question.option_two"
                v-model="checkedNames"
              />
              {{ question.option_two }}</label
            >
            <br />
            <label class="form-control">
              <input
                type="checkbox"
                class="option-input checkbox"
                id="mike"
                :value="question.option_three"
                v-model="checkedNames"
              />
              {{ question.option_three }}</label
            >
            <br />

            <br />
          </li>

          <q-btn
            color="amber"
            glossy
            label="Guardar"
            type="submit"
            class="btn btn-primary"
            v-on:click="postChoices()"
          />
        </div>
      </ul>

      <!-- <router-view> </router-view> -->
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const drawer = ref(false);
    return {
      drawer,
    };
  },
  data() {
    return {
      numeroe: 0,
      responses1: [],
      responses2: [],
      responses3: [],
      responses4: [],
      checkedNames: [],
      picked: "",
      polls: [],
      questions: [],
      questionsm: [],
      questionso: [],
      answers: [],
    };
  },
  methods: {
    getPolls() {
      const path = "http://127.0.0.1:8000/api/polls/pname/";
      axios
        .get(path)
        .then((response) => {
          this.polls = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getQuestions(numero) {
      console.log("resultado", numero);
      this.numeroe = numero;
      const path = "http://127.0.0.1:8000/api/polls/questions/";
      axios
        .get(path)
        .then((response) => {
          const questionst = response.data;
          this.questions = questionst.filter(
            (question) =>
              (question.poll == numero) & (question.type == "unique")
          );
          this.questionsm = questionst.filter(
            (question) =>
              (question.poll == numero) & (question.type == "multiple")
          );
          this.questionso = questionst.filter(
            (question) => (question.poll == numero) & (question.type == "open")
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    postChoices() {
      let post = {
        poll: this.numeroe,
        choice_q1: this.responses1[0],
        choice_q2: this.responses1[1],
        choice_q3: this.responses2[0],
        choice_q4: this.responses2[1],
        choice_q5:
          this.checkedNames[0] +
          "," +
          this.checkedNames[1] +
          "," +
          this.checkedNames[2],
      };
      axios
        .post("http://127.0.0.1:8000/api/polls/choice/", post)
        .then((result) => {
          console.log(result);
        });
    },
  },
  created() {
    this.getPolls();
    this.getQuestions();
    this.postChoices();
  },

  onRowClick(evt, row) {
    console.log("clicked on", evt, row);
  },
};
</script>
<style>
.div-1 {
  background-color: #ebebeb;
  margin: 5%;
  padding: 5% 5%;
}
input {
  width: 100%;
}

input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  color: #333;
  background-color: #eee;
}

:root {
  --form-control-color: rebeccapurple;
}
*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  margin: 0;
}

form {
  display: grid;
  place-content: center;
  min-height: 100vh;
}

.form-control {
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.1;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
}

.form-control + .form-control {
  margin-top: 1em;
}

.form-control:focus-within {
  color: var(--form-control-color);
}

input[type="radio"] {
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  background-color: var(--form-background);
  /* Not removed via appearance */
  margin: 0;

  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 50%;
  transform: translateY(-0.075em);

  display: grid;
  place-content: center;
}

input[type="checkbox"] {
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  background-color: var(--form-background);
  /* Not removed via appearance */
  margin: 0;

  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;

  transform: translateY(-0.075em);

  display: grid;
  place-content: center;
}
input[type="radio"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
  /* Windows High Contrast Mode */
  background-color: CanvasText;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;

  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
  /* Windows High Contrast Mode */
  background-color: CanvasText;
}
input[type="radio"]:checked::before {
  transform: scale(1);
}

input[type="radio"]:focus {
  outline: max(2px, 0.15em) solid currentColor;
  outline-offset: max(2px, 0.15em);
}
input[type="checkbox"]:checked::before {
  transform: scale(1);
}

input[type="ckeckbox"]:focus {
  outline: max(2px, 0.15em) solid currentColor;
  outline-offset: max(2px, 0.15em);
}
</style>
