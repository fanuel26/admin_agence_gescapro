<!-- 
	This is the user profile page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>
    <!-- Header Background Image -->
    <div
      class="profile-nav-bg"
      style="background-image: url('/images/bg-profile.jpg')"
    ></div>
    <!-- / Header Background Image -->

    <!-- User Profile Card -->
    <a-card
      :bordered="false"
      class="card-profile-head"
      :bodyStyle="{ padding: 0 }"
    >
      <template #title>
        <a-row type="flex" align="middle">
          <a-col :span="24" :md="12" class="col-info">
            <a-avatar :size="74" shape="square" src="/images/logo1.png" />
            <div class="avatar-info">
              <h4 class="font-semibold m-0">{{ compte.nom }}</h4>
              <p>{{ compte.username }}</p>
            </div>
          </a-col>
          <a-col
            :span="24"
            :md="12"
            style="
              display: flex;
              align-items: center;
              justify-content: flex-end;
            "
          >
          </a-col>
        </a-row>
      </template>
    </a-card>
    <!-- User Profile Card -->

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
            <h6 class="font-semibold m-0">Information du compte</h6>
          </template>
          <a-descriptions :title="compte.username" :column="1">
            <a-descriptions-item label="Nom & Prénom">
              {{ compte.nom }} {{ compte.prenom }}
            </a-descriptions-item>
            <a-descriptions-item label="Adresse email">
              {{ compte.email }}
            </a-descriptions-item>
            <a-descriptions-item label="Code secret">
              {{ compte.code_secret }}
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
            <a-col :span="12" :md="12" class="mb-24">
              <!-- Profile Information Card -->

              <template>
                <h6 class="font-semibold m-0">Generer code secret</h6>
              </template>
              <a-form
                id="components-form-demo-normal-login"
                :form="form_code_secret"
                class="login-form"
                @submit="codeSubmit"
                :hideRequiredMark="true"
              >
                <a-form-item
                  class=""
                  label="Code secret generer"
                  :colon="false"
                >
                  <a-input
                    v-decorator="[
                      'code_secret_new',
                      {
                        initialValue: code_secret,
                        rules: [
                          {
                            required: true,
                            message: 'Code secret generer incorrect!',
                          },
                        ],
                      },
                    ]"
                    disabled
                    type="text"
                    placeholder="Code secret"
                  />
                </a-form-item>

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

                <div class="mb-4 text-right">
                  <a-button
                    type="primary"
                    html-type="submit"
                    class="login-form-button"
                  >
                    Generer
                  </a-button>
                </div>
              </a-form>
            </a-col>

            <a-col :span="12" :md="12" class="mb-24">
              <!-- Profile Information Card -->

              <template>
                <h6 class="font-semibold m-0">Generer mot de passe</h6>
              </template>
              <a-form
                id="components-form-demo-normal-login"
                :form="form_password"
                class="login-form"
                @submit="passwordSubmit"
                :hideRequiredMark="true"
              >
                <a-form-item
                  class=""
                  label="Mot de passe generer"
                  :colon="false"
                >
                  <a-input
                    v-decorator="[
                      'password',
                      {
                        initialValue: password,
                        rules: [
                          {
                            required: true,
                            message: 'Mot de passe generer incorrect!',
                          },
                        ],
                      },
                    ]"
                    disabled
                    type="text"
                    placeholder="Mot de passe"
                  />
                </a-form-item>

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
                <div class="mb-4 text-right">
                  <a-button
                    type="primary"
                    html-type="submit"
                    class="login-form-button"
                  >
                    Generer
                  </a-button>
                </div>
              </a-form>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <!-- / Platform Settings Column -->
    </a-row>
    <a href="https://wa.me/22892432861" target="_brank"
      ><a-button class="fab" shape="circle">
        <a-icon type="wechat" theme="filled" /> </a-button
    ></a>
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