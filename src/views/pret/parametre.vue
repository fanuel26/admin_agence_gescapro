<!-- 
	This is the user profile page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>
    <a-row :gutter="24" class="mb-24">
      <!-- Profile Information Column -->
      <a-col :span="12" :md="8" class="mb-24">
        <!-- Profile Information Card -->

        <!-- Profile Information Card -->
        <a-card
          :bordered="false"
          class="header-solid h-full card-profile-information"
          :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }"
          :headStyle="{ paddingRight: 0 }"
        >
          <template #title>
            <a-row>
              <a-col :span="12">
                <h6 class="font-semibold m-0 my-4">Paramètre de prêt</h6>
              </a-col>
              <a-col :span="12">
                <router-link :to="{ name: 'Pret_type' }">
                  <a-button type="primary">
                    Créer type de pret
                  </a-button></router-link
                >
              </a-col></a-row
            >
          </template>
          <a-descriptions :title="Parametre" :column="1">
            <a-descriptions-item label="Taux d'interet prêt">
              30%
            </a-descriptions-item>
            <a-descriptions-item label="Taux de pénalité">
              10%
            </a-descriptions-item>
            <a-descriptions-item label="Eligible à partir de:">
              3 ans
            </a-descriptions-item>
            <a-descriptions-item label="Garantie de compte pour le prêt">
              300000 Fcfa
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
        <!-- / Profile Information Card -->

        <!-- / Profile Information Card -->
      </a-col>
      <!-- / Profile Information Column -->

      <!-- Platform Settings Column -->
      <a-col :span="12" :md="16">
        <a-card
          :bordered="false"
          class="header-solid h-full"
          :bodyStyle="{ paddingTop: '16px', paddingBottom: '16px' }"
        >
          <a-row :gutter="24">
            <!-- Profile Information Column -->

            <a-col :span="24" :md="24" class="mb-24">
              <!-- Profile Information Card -->

              <template>
                <h6 class="font-semibold m-0">Parametres généraux</h6>
              </template>
              <a-form
                id="components-form-demo-normal-login"
                :form="form_password"
                class="login-form"
                @submit="passwordSubmit"
                :hideRequiredMark="true"
              >
                <a-row :gutter="24">
                  <!-- Profile Information Column -->

                  <a-col :span="12" :md="12">
                    <a-form-item
                      class=""
                      label="Taux d'interêt de prêt (%)"
                      :colon="false"
                    >
                      <a-input
                        v-decorator="[
                          'taux_interet',
                          {
                            initialValue: 0,
                            rules: [
                              {
                                required: true,
                                message: 'Taux de penalite generer incorrect!',
                              },
                            ],
                          },
                        ]"
                        type="number"
                        placeholder="Taux d'interêt"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12" :md="12">
                    <a-form-item
                      class=""
                      label="Taux de pénalité de prêt (%)"
                      :colon="false"
                    >
                      <a-input
                        v-decorator="[
                          'taux_penalite',
                          {
                            initialValue: 0,
                            rules: [
                              {
                                required: true,
                                message: 'Taux de penalite generer incorrect!',
                              },
                            ],
                          },
                        ]"
                        type="number"
                        placeholder="Taux de penalité"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12" :md="12">
                    <a-form-item
                      class=""
                      label="Temps d'eligibilité  (Mois)"
                      :colon="false"
                    >
                      <a-input
                        v-decorator="[
                          'temps',
                          {
                            initialValue: 0,
                            rules: [
                              {
                                required: true,
                                message:
                                  'Temps d\'éligibilité generer incorrect!',
                              },
                            ],
                          },
                        ]"
                        type="number"
                        placeholder="Taux d'eligibilite"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12" :md="12">
                    <a-form-item
                      class=""
                      label="Garantie du compte (Fcfa)"
                      :colon="false"
                    >
                      <a-input
                        v-decorator="[
                          'garantie',
                          {
                            initialValue: 0,
                            rules: [
                              {
                                required: true,
                                message: 'Garantie generer incorrect!',
                              },
                            ],
                          },
                        ]"
                        type="number"
                        placeholder="Garantie du compte"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12" :md="12">
                    <a-form-item class="" label="Code secret" :colon="false">
                      <a-input
                        v-decorator="[
                          'code_secret',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Code secret incorrect!',
                              },
                            ],
                          },
                        ]"
                        type="text"
                        placeholder="Code secret"
                      />
                    </a-form-item>
                  </a-col>

                  <a-col :span="24" :md="24">
                    <div class="mb-4 text-right">
                      <a-button
                        type="primary"
                        html-type="submit"
                        class="login-form-button"
                      >
                        Generer
                      </a-button>
                    </div>
                  </a-col>
                </a-row>
              </a-form>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <!-- / Platform Settings Column -->
    </a-row>
  </div>
</template>

<script>
import CardPlatformSettings from "../../components/Cards/CardPlatformSettings";
import CardProfileInformation from "../../components/Cards/CardProfileInformation";
import CardConversations from "../../components/Cards/CardConversations";
import CardProject from "../../components/Cards/CardProject";

// Conversation's list data.
const conversationsData = [
  {
    id: "1",
    title: "Sophie B.",
    code: "Hi! I need more information…",
    avatar: "/images/face-3.jpg",
  },
  {
    id: "2",
    title: "Anne Marie",
    code: "Awesome work, can you…",
    avatar: "/images/face-4.jpg",
  },
  {
    id: "3",
    title: "Ivan",
    code: "About files I can…",
    avatar: "/images/face-5.jpeg",
  },
  {
    id: "4",
    title: "Peterson",
    code: "Have a great afternoon…",
    avatar: "/images/face-6.jpeg",
  },
  {
    id: "5",
    title: "Nick Daniel",
    code: "Hi! I need more information…",
    avatar: "/images/face-2.jpg",
  },
];

// Project cards data
const projects = [
  {
    id: 1,
    title: "Modern",
    content:
      "As Uber works through a huge amount of internal management turmoil.",
    cover: "/images/home-decor-3.jpeg",
    team: [
      "/images/face-1.jpg",
      "/images/face-4.jpg",
      "/images/face-2.jpg",
      "/images/face-3.jpg",
    ],
  },
  {
    id: 2,
    title: "Scandinavian",
    content:
      "Music is something that every person has his or her own specific opinion about.",
    cover: "/images/home-decor-2.jpeg",
    team: [
      "/images/face-1.jpg",
      "/images/face-4.jpg",
      "/images/face-2.jpg",
      "/images/face-3.jpg",
    ],
  },
  {
    id: 3,
    title: "Minimalist",
    content:
      "Different people have different taste, and various types of music, Zimbali Resort.",
    cover: "/images/home-decor-1.jpeg",
    team: [
      "/images/face-1.jpg",
      "/images/face-4.jpg",
      "/images/face-2.jpg",
      "/images/face-3.jpg",
    ],
  },
];

export default {
  components: {
    CardPlatformSettings,
    CardProfileInformation,
    CardConversations,
    CardProject,
  },

  beforeCreate() {
    this.form_code_secret = this.$form.createForm(this, {
      name: "normal_login",
    });
    this.form_password = this.$form.createForm(this, { name: "normal_login" });
  },
  data() {
    return {
      
      callback: process.env.VUE_APP_API_BASE_URL,
      namApp: process.env.VUE_APP_NAME,
      token_admin: null,
      profileHeaderBtns: "overview",
      conversationsData,
      projects,
      compte: {},

      code_secret: null,
      password: null,
    };
  },

  mounted() {
    this.password = `${this.namApp}@${Math.floor(
      Math.random() * (9999 - 1000) + 1000
    )}`;

    this.code_secret = Math.floor(Math.random() * (9999 - 1000) + 1000);

    this.infoCompte();
  },

  methods: {
    showAlert(type, title, description) {
      this.$notification[type]({
        message: title,
        description: description,
      });
    },

    infoCompte() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http.post(`${this.callback}/info`, {}, headers).then(
        (response) => {
          let data = response.body.data;

          this.compte = data;

          console.log(data);
        },
        (response) => {
          flash(response.body.message, "Erreur", "fa fa-times", "danger");
        }
      );
    },

    codeSubmit(e) {
      e.preventDefault();
      this.form_code_secret.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          if (values.code_secret == localStorage.getItem("code_secret")) {
            let session = localStorage;
            this.token_admin = session.getItem("token");

            let headers = { headers: { Authorization: this.token_admin } };

            let data_param = {
              code_secret: this.compte.code_secret,
              newcode_secret: values.code_secret_new,
            };

            this.$http
              .post(`${this.callback}/change/code_secret`, data_param, headers)
              .then(
                (response) => {
                  let data = response.body;
                  console.log(data);

                  if (data.status == true) {
                    session.setItem("code_secret", values.code_secret_new);

                    this.code_secret = Math.floor(
                      Math.random() * (9999 - 1000) + 1000
                    );

                    this.showAlert(
                      "success",
                      "Success",
                      `Code secret générer avec success! Code secret: ${values.code_secret_new}`
                    );
                    this.infoCompte();
                  } else {
                    this.showAlert("danger", "Erreur", data.message);
                  }
                },
                (response) => {
                  this.showAlert("danger", "Erreur", response.body.message);
                }
              );
          } else {
            this.showAlert("error", "Erreur", "Code secret incorrect");
          }
        } else {
          console.log(err);
        }
      });
    },

    passwordSubmit(e) {
      e.preventDefault();
      this.form_password.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          if (values.code_secret == localStorage.getItem("code_secret")) {
            let session = localStorage;
            this.token_admin = session.getItem("token");

            let headers = { headers: { Authorization: this.token_admin } };

            let data_param = {
              password: this.compte.password,
              newpassword: values.password,
            };

            this.$http
              .post(`${this.callback}/change/password`, data_param, headers)
              .then(
                (response) => {
                  let data = response.body;
                  console.log(data);

                  if (data.status == true) {
                    this.showAlert(
                      "success",
                      "Success",
                      `Mot de passe generer avec succes! Mot de passe: ${values.password}`
                    );
                    this.password = `${this.namApp}@${Math.floor(
                      Math.random() * (9999 - 1000) + 1000
                    )}`;
                  } else {
                    this.showAlert("error", "Erreur", data.message);
                  }
                },
                (response) => {
                  this.showAlert("error", "Erreur", response.body.message);
                }
              );
          } else {
            this.showAlert("error", "Erreur", "Code secret incorrect");
          }
        } else {
          console.log("error");
        }
      });
    },
  },
};
</script>

<style lang="scss">
</style>