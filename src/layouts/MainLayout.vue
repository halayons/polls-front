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
        <li v-for="(question, index) in questions" :key="index">
          {{ question.question_text }}
          <br />

          <input
            type="radio"
            :id="index"
            :value="question.option_one"
            v-model="test"

                      />
                      <p>mensaje:{{test}}</p>
          <label for="uno">{{ question.option_one }}</label>
          <br />
          <input
            type="radio"
            :id="index + 1"
            :value="question.option_two"
            v-model="question.id"
          />
          <label for="Dos">{{ question.option_two }}</label>
          <br />
          <span>Eligió: {{ question.id }}</span>
        </li>
        <li v-for="(question, index) in questionso" :key="index">
          {{ question.question_text }}
          <br />

          <input type="text" v-model="question.id" />
          <br />
          {{ question.id }}
        </li>
        <li v-for="(question, index) in questionsm" :key="index">
          {{ question.question_text }}
          <br />

          <input
            type="checkbox"
            id="jack"
            :value="question.option_one"
            v-model="checkedNames"
          />
          <label for="jack">{{ question.option_one }}</label>
          <br />
          <input
            type="checkbox"
            id="john"
            :value="question.option_two"
            v-model="checkedNames"
          />
          <label for="john">{{ question.option_two }}</label>
          <br />
          <input
            type="checkbox"
            id="mike"
            :value="question.option_three"
            v-model="checkedNames"
          />
          <label for="mike">{{ question.option_three }}</label>
          <br />
          <span>Checked names: {{ checkedNames }}</span>
          <br />
        </li>

        <button
          type="submit"
          class="btn btn-primary"
          v-on:click="postChoices()"
        >
          Save changes
        </button>
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
      test:"",
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
        poll: 1,
        choice_q1: "bar",
        choice_q2: "r",
      };
      console.log("testing",this.test);
      // axios
      //   .post("http://127.0.0.1:8000/api/polls/choice/", post)
      //   .then((result) => {
      //     console.log(result);
      //   });
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
