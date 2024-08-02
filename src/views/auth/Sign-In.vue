<!-- 
	This is the sign in page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template>
  <div class="sign-in" style="height: 75vh">
    <a-row type="flex" :gutter="24" justify="space-around" align="center">
      <!-- Sign In Form Column -->
      <div style="width: 100vw; display: flex; justify-content: center">
        <a-col :span="24" :md="12" :lg="6" :xl="6" class="col-form mt-4">
          <a-card>
            <h3 class="mb-15 text-center text-primary mt-4">gescapro</h3>
            <h5 class="font-regular text-center text-muted">
              Entrez l'adresse email et le mot de passe pour se connecter
            </h5>

            <!-- Sign In Form -->
            <a-form id="components-form-demo-normal-login" :form="form" class="login-form mt-4" @submit="LoginSubmit"
              :hideRequiredMark="true">
              <a-form-item class="mb-10" label="Adresse email" :colon="false">
                <a-input v-decorator="[
                  'email',
                  {
                    rules: [
                      { required: true, message: 'Please input your email!' },
                    ],
                  },
                ]" placeholder="Adresse email" />
              </a-form-item>
              <a-form-item class="mb-5" label="Mot de passe" :colon="false">
                <a-input v-decorator="[
                  'password',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ],
                  },
                ]" type="password" placeholder="Mot de passe" />
              </a-form-item>
              <a-form-item>
                <a-button type="primary" block html-type="submit" class="login-form-button">
                  CONNEXION
                </a-button>
              </a-form-item>
            </a-form>
          </a-card>
          <!-- / Sign In Form -->
        </a-col>
      </div>

      <!-- Sign In Image Column -->
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      callbackControle: process.env.VUE_APP_API_BASE_URL_CONTROLE,
      callback: process.env.VUE_APP_API_BASE_URL,
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    ShowAlert(type, title, description) {
      this.$notification[type]({
        message: title,
        description: description,
      });
    },
    // Handles input validation after submission.
    LoginSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$http.post(`${this.callback}/login`, values).then(
            (response) => {
              let session = localStorage;

              console.log(response);
              if (response.body.status == true) {
                session.setItem(
                  "token",
                  `${response.body.token_type} ${response.body.access_token}`
                );
                session.setItem("id", response.body.info.id);
                session.setItem("username", response.body.info.username);
                session.setItem("code_secret", response.body.info.code_secret);
                session.setItem("type", response.body.info.adminAttributes);
                session.setItem("agenceId", JSON.parse(response.body.info.adminAttributes).agenceId);

                this.$router.push({ name: "Dashboard" });
                // let data = {
                //   "email": "admin@gmail.com",
                //   "password": "admin1234"
                // }

                // this.$http.post(`${this.callbackControle}/auth/login`, data).then(
                //   (response) => {
                //     let responseData = response.body.data

                //     console.log(responseData)
                //     if (response.body.status == true) {
                //       session.setItem(
                //         "tokenControle",
                //         `${responseData.token.type} ${responseData.token.token}`
                //       );
                //     }

                //   })
              } else {
                this.ShowAlert("error", "Erreur", response.body.message);
              }
            },
            (response) => {
              if (response) {
                this.ShowAlert("error", "Erreur", "Erreur lors de la requete");
              }
            }
          );
        } else {
          this.ShowAlert(
            "warning",
            "Erreur",
            "Veillez remplir tous les champs"
          );
        }
      });
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #ffffff;
}
</style>