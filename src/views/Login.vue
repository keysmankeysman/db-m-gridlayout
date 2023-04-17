<template>
  <v-app color="primary" id="inspire" style="height: 100%">
    <v-row align="center" justify="center">
      <v-col cols="12" md="4" sm="8">
        <form label-position="top">
          <v-card width="600" outlined>
            <v-toolbar flat>
              <v-toolbar-title
                color="primary_text"
                style="font-size: 28px; font-weight: bold"
                >Авторизация</v-toolbar-title
              >
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-select
                  v-model="form.provider"
                  :items="providerOptions"
                  class="set-int-header"
                  offset-y
                />
                <v-text-field
                  :disabled="form.loading"
                  color="primary_text"
                  label="Имя пользователя"
                  class="mb-3"
                  background-color="input_bg"
                  name="login"
                  filled
                  type="text"
                  hide-details
                  v-model="form.login"
                  v-on:keyup.enter="submit"
                ></v-text-field>

                <v-text-field
                  :disabled="form.loading"
                  color="primary_text"
                  id="password"
                  label="Пароль"
                  filled
                  hide-details
                  background-color="input_bg"
                  name="password"
                  type="password"
                  v-model="form.password"
                  v-on:keyup.enter="submit"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="login__actions">
              <v-btn
                @click="submit"
                color="primary"
                class="white--text"
                :loading="form.loading"
                depressed
                >Войти</v-btn
              >
            </v-card-actions>
          </v-card>
        </form>
      </v-col>
    </v-row>

  </v-app>
</template>

<script>

export default {
  name: "LoginView",
  data() {
    return {
      form: {
        login: "",
        password: "",
        provider: "Local",
        loading: false,
      },
      providerOptions: [
        {
          value:"Local",
          text:"Встроенная учетная запись"
        },
        {
          value:"Ldap",
          text:"Доменная учетная запись"
        },
      ],
      warnModal: {
        isVisible: false,
        title: "",
        msg: "",
      },
      recoveryModal: {
        isVisible: false,
        email: "",
      },
      changeModal: {
        isVisible: false,
        email: "",
      },
    };
  },
  computed: {

  },
  methods: {

    showWarn(title, message) {
      this.warnModal.isVisible = true;
      this.warnModal.title = title;
      this.warnModal.msg = message;
    },

    closeWarn() {
      this.warnModal.isVisible = false;
      this.warnModal.title = "";
      this.warnModal.msg = "";
    },

    submit() {
      console.log(this.form)
      if (this.form.login === 'admin' && this.form.password === 'admin') {
        console.log('авторизация прошла успешно')
        this.handleSubmitSuccess()
      } else {
        this.handleSubmitError()
      }
    },

    handleSubmitSuccess() {
      console.log('успешный запрос')
      // localStorage.setItem("clientId", 1);
      // localStorage.removeItem("selectedPeriod");
      // localStorage.removeItem("selectedPeriodStart");
      // localStorage.removeItem("selectedPeriodEnd");
      // this.$store.state.selectedPeriod = "Текущий день";
      // this.$store.state.selectedPeriodStart = "";
      // this.$store.state.selectedPeriodEnd = "secondDate";
      // this.$eventManager.$emit("initApp");
      // this.login(data);

      this.$router.push({ path: "/" });
    },
    handleSubmitError() {
      console.log('ошибка')
    }
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  background: white;
  padding: 20px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  &__submit {
    width: 100%;
  }
}

.login__actions {
  display: flex;
  justify-content: space-between;
}
.login__recovery-text {
}
</style>
