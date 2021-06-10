<template>
  <v-app class="pa-6">
    <v-card class="mx-auto login pa-3">
      <v-card-title>Login Panel</v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="password"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="login"
          >login</v-btn
        >
      </v-form>
    </v-card>
  </v-app>
</template>
<script>
import Config from "../config.json";
export default {
  data: () => ({
    valid: true,
    password: "",
    email: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    show1: false,
  }),

  methods: {
    login() {
      this.validation_errors = [];
      this.error_message = "";

      this.clearStorage();
      let login_data = {
        email: this.email,
        password: this.password,
      };
      console.log(Config.BASE_URL);
      this.axios
        .post(Config.BASE_URL + "/api/login", login_data)
        .then((response) => {
          this.saveIntoStorage(response.data);
          this.$refs.form.validate();
          if (response.data.user.id === 1) {
            this.$router.push("/dashboard");
          } else {
            this.$router.push("/");
          }
        })
        .catch((error) => {
          this.error_message = error.response.data.message;

          if (error.response.data.errors) {
            for (let key in error.response.data.errors) {
              this.validation_errors.push(error.response.data.errors[key][0]);
            }
          }
        });
    },
    clearStorage() {
      localStorage.removeItem("is_authenticated");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
    },
    saveIntoStorage(response) {
      localStorage.setItem("is_authenticated", 1);
      localStorage.setItem("auth_token", response.access_token);
      localStorage.setItem("user_data", JSON.stringify(response.user));
    },

    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
<style scoped>
.login {
  width: 600px;
  margin-top: 100px;
}
</style>
