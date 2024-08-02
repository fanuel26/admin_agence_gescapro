<!-- 
	This is the billing page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>
    <a-row type="flex" :gutter="24">
      <!-- Billing Information Column -->
      <a-col :span="24" :md="16" class="mb-24">
        <a-card
          :bordered="false"
          class="header-solid h-full"
          :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }"
        >
          <div class="text-right mb-4">
            <router-link
              :to="{ name: 'Agence_depot', params: { id: caissier.id } }"
            >
              <a-button type="primary" class="mx-2">Liste des dépots</a-button>
            </router-link>
            <a-button class="mx-2" @click="$router.go(-1)">Retour</a-button>
          </div>
          <template #title>
            <h6 class="font-semibold m-0">Information du caissier</h6>
          </template>
          <a-row :gutter="[24, 24]">
            <a-col :span="24">
              <a-card :bordered="false" class="card-billing-info">
                <div class="col-info">
                  <a-descriptions
                    :title="'date de création: ' + caissier.created_at"
                    :column="2"
                  >
                    <a-descriptions-item label="Nom">
                      {{ caissier.nom }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Prenom">
                      {{ caissier.prenom }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Numéro de téléphone">
                      (+228) {{ caissier.numero }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Agence">
                      {{ caissier.agence.nom_agence }}
                    </a-descriptions-item>
                    <a-descriptions-item> </a-descriptions-item>
                    <a-descriptions-item label="Ville">
                      {{ ville }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Quartier">
                      {{ quartier }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Code secret">
                      {{ caissier.code_secret }}
                    </a-descriptions-item>
                  </a-descriptions>
                </div>
              </a-card>
            </a-col>
          </a-row>
          <a-col :span="24" :md="24" class="mb-24">
            <a-card
              :bordered="false"
              class="header-solid h-full"
              :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }"
            >
              <template #title>
                <h6 class="font-semibold m-0">Statistique du caissier</h6>
              </template>
              <a-row :gutter="24">
                <a-col
                  :span="12"
                  :lg="12"
                  :xl="12"
                  class="mb-24"
                  v-for="(stat, index) in stats"
                  :key="index"
                >
                  <!-- Widget 1 Card -->
                  <WidgetCounter
                    :title="stat.title"
                    :value="stat.value"
                    :prefix="stat.prefix"
                    :suffix="stat.suffix"
                    :icon="stat.icon"
                    :status="stat.status"
                  ></WidgetCounter>
                  <!-- / Widget 1 Card -->
                </a-col>
              </a-row>
            </a-card>
          </a-col>
        </a-card>
      </a-col>
      <!-- Billing Information Column -->

      <!-- Your Transactions Column -->
      <a-col :span="8" :md="8" class="mb-24">
        <a-card
          :bordered="false"
          class="header-solid h-full"
          :bodyStyle="{ paddingTop: '16px', paddingBottom: '16px' }"
        >
          <template>
            <h6 class="font-semibold m-0">Generer code secret</h6>
          </template>
          <a-form
            id="components-form-demo-normal-login"
            :form="form_code"
            class="login-form"
            @submit="changeCode"
            :hideRequiredMark="true"
          >
            <a-form-item class="" label="Code secret generer" :colon="false">
              <a-input
                v-decorator="[
                  'code_secret',
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
            <a-form-item class="" label="Mot de passe generer" :colon="false">
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
          <template>
            <h6 class="font-semibold m-0">Deconnectez le caissier</h6>
          </template>
          <a-form
            id="components-form-demo-normal-login"
            :form="form_disconnect"
            class="login-form"
            @submit="disconnectSubmit"
            :hideRequiredMark="true"
          >
            <a-form-item class="" label="Code secret" :colon="false">
              <a-input
                v-decorator="[
                  'code_secret',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Code secret est vide!',
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
                type="danger"
                html-type="submit"
                class="login-form-button"
              >
                Deconnexion
              </a-button>
            </div>
          </a-form>
        </a-card>
      </a-col>
      <!-- / Your Transactions Column -->
    </a-row>
  </div>
</template>

<script>
import CardCredit from "../../../components/Cards/CardCredit";
import WidgetSalary from "../../../components/Widgets/WidgetSalary";
import CardPaymentMethods from "../../../components/Cards/CardPaymentMethods";
import CardBillingInfo from "../../../components/Cards/CardBillingInfo";
import CardTransactions from "../../../components/Cards/CardTransactions";
import WidgetCounter from "../../../components/Widgets/WidgetCounter";

export default {
  components: {
    CardCredit,
    WidgetSalary,
    CardPaymentMethods,
    CardBillingInfo,
    CardTransactions,
    WidgetCounter,
  },

  beforeCreate() {
    this.form_code = this.$form.createForm(this, { name: "code_secret form" });
    this.form_password = this.$form.createForm(this, { name: "password form" });
    this.form_disconnect = this.$form.createForm(this, {
      name: "disconnect form",
    });
  },
  data() {
    return {
      
      callback: process.env.VUE_APP_API_BASE_URL,
      namApp: process.env.VUE_APP_NAME,
      token_admin: null,
      stats: [],
      caissier: {},
      caissiers: null,
      ville: null,
      quartier: null,
      code_secret: null,
      password: null,
    };
  },

  mounted() {
    this.code_secret = Math.floor(Math.random() * (9999 - 1000) + 1000);
    this.password = `${this.namApp}@${Math.floor(
      Math.random() * (9999 - 1000) + 1000
    )}`;

    this.stats = [
      {
        title: "Nombre de Depot par jour",
        value: 0,
        prefix: "",
        suffix: "",
        icon: `<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
							<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
						</svg>`,
      },
      {
        title: "Nombre total de Depot",
        value: 0,
        prefix: "",
        suffix: "",
        icon: `<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
							<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
						</svg>`,
      },
    ];

    this.listecaissier();
    this.detailcaissier();
  },

  methods: {
    showAlert(type, title, description) {
      this.$notification[type]({
        message: title,
        description: description,
      });
    },

    listecaissier() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http.post(`${this.callback}/agent/list`, {}, headers).then(
        (response) => {
          let data = response.body.data;
          this.caissiers = data;
        },
        (response) => {
          this.showAlert("error", "Erreur", response.body.message);
        }
      );
    },

    detailcaissier() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(
          `${this.callback}/agent/info/${this.$route.params.id}`,
          {},
          headers
        )
        .then(
          (response) => {
            let data = response.body.data;
            this.caissier = data;
            this.ville = data.quartier.ville.libelle;
            this.quartier = data.quartier.libelle;
          },
          (response) => {
            this.showAlert("error", "Erreur", response.body.message);
          }
        );

      this.$http
        .post(
          `${this.callback}/transaction/agent/${this.$route.params.id}`,
          {},
          headers
        )
        .then(
          (response) => {
            let data = response.body.data;
            console.log(data);
            this.stats[0].value = data.length;
          },
          (response) => {
            this.showAlert("error", "Erreur", response.body.message);
          }
        );
    },

    changeCode(e) {
      e.preventDefault();
      this.form_code.validateFields((err, values) => {
        if (!err) {
          let session = localStorage;
          this.token_admin = session.getItem("token");

          let headers = { headers: { Authorization: this.token_admin } };

          let data_param = {
            code_secret: this.caissier.code_secret,
            newcode_secret: values.code_secret,
          };

          this.$http
            .post(
              `${this.callback}/agent/${this.$route.params.id}/code/change`,
              data_param,
              headers
            )
            .then(
              (response) => {
                let data = response.body;

                if (data.status == true) {
                  this.showAlert(
                    "success",
                    "Success",
                    `Code secret générer avec success! Code secret: ${values.code_secret}`
                  );
                  this.detailcaissier();

                  this.code_secret = Math.floor(
                    Math.random() * (9999 - 1000) + 1000
                  );
                } else {
                  this.showAlert("danger", "Erreur", data.message);
                }
              },
              (response) => {
                this.showAlert("danger", "Erreur", response.body.message);
              }
            );
        } else {
          console.log(err);
        }
      });
    },

    passwordSubmit(e) {
      e.preventDefault();
      this.form_password.validateFields((err, values) => {
        if (!err) {
          let session = localStorage;
          this.token_admin = session.getItem("token");

          let headers = { headers: { Authorization: this.token_admin } };

          this.$http
            .post(
              `${this.callback}/agent/${this.$route.params.id}/password/change/token`,
              {},
              headers
            )
            .then(
              (response) => {
                let data = response.body.data;

                let token_password = data;

                let headers = { headers: { Authorization: token_password } };

                let data_param = {
                  newpassword: values.password,
                };

                this.$http
                  .post(
                    `${this.callback}/agent/${this.$route.params.id}/password/change/operation`,
                    data_param,
                    headers
                  )
                  .then(
                    (response) => {
                      let data = response.body;

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
              },
              (response) => {
                this.showAlert("error", "Erreur", response.body.message);
              }
            );
        } else {
          console.log("error");
        }
      });
    },

    disconnectSubmit(e) {
      e.preventDefault();
      this.form_disconnect.validateFields((err, values) => {
        if (!err) {
          if (values.code_secret == localStorage.getItem("code_secret")) {
            let session = localStorage;
            this.token_admin = session.getItem("token");

            let headers = { headers: { Authorization: this.token_admin } };

            this.$http
              .post(
                `${this.callback}/agent/disconnect/${this.$route.params.id}`,
                {},
                headers
              )
              .then(
                (response) => {
                  let data = response.body;

                  if (data) {
                    this.showAlert(
                      "success",
                      "Success",
                      "Agent caissier deconneter avec success"
                    );
                  }
                },
                (response) => {
                  this.showAlert("error", "Erreur", response.body.message);
                }
              );
          } else {
            this.showAlert("error", "Erreur", "Code secret incorrect");
          }
        }
      });
    },

    handleSubmit() {},
  },
};
</script>

<style lang="scss">
</style>