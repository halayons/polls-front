<template lang="html">
  <h2>Lista de Preguntas</h2>
  <!-- <q-table
    title="Encuestas"
    :rows="questions"
    :columns="fields"
    row-key="name"
  /> -->
  <ul id="example-1">
    <li v-for="(question, index) in questions" :key="index">
      {{ question.question_text }}
    </li>
  </ul>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      fields: [
        { name: "question_text", label: "Preguntas", field: "question_text" },
        //{ name: "pub_date", label: "Fecha", field: "pub_date" },
        //{ name: "poll_name", label: "Encuesta", field: "poll_name" },
        { name: "action", label: "Action" },
      ],
      questions: [],
    };
  },
  methods: {
    getQuestions() {
      const path = "http://127.0.0.1:8000/api/polls/questions/";
      axios
        .get(path)
        .then((response) => {
          const questionst = response.data;
          this.questions = questionst.filter((question) => question.poll == 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getQuestions();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
