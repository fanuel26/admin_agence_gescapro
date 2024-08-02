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
            <a-button class="mx-2" @click="$router.go(-1)">Retour</a-button>
          </div>
          <template #title>
            <h6 class="font-semibold m-0">Information du livreur</h6>
          </template>
          <a-row :gutter="[24, 24]">
            <a-col :span="24">
              <a-card :bordered="false" class="card-billing-info">
                <div class="col-info">
                  <a-descriptions
                    :title="'date de création: ' + new Date(livreur.created_at).toLocaleString()"
                    :column="2"
                  >
                    <a-descriptions-item label="Nom">
                      {{ livreur.nom }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Prenom">
                      {{ livreur.prenom }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Numéro de téléphone">
                      (+228) {{ livreur.numero }}
                    </a-descriptions-item>
                    <a-descriptions-item> </a-descriptions-item>
                    <a-descriptions-item label="Ville">
                      {{ ville }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Quartier">
                      {{ quartier }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Code secret">
                      {{ livreur.code_secret }}
                    </a-descriptions-item>
                  </a-descriptions>
                </div>
              </a-card>
            </a-col>
            
            <a-col :span="24">
              <a-card :bordered="false">
                <template #title>
                  <h6>Liste des livraisons</h6>
                </template>

                <a-table :columns="columns" :data-source="data"> </a-table>
              </a-card>
            </a-col>
          </a-row>
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
            <h6 class="font-semibold m-0">Deconnectez le livreur</h6>
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
import CardCredit from "../../components/Cards/CardCredit";
import WidgetSalary from "../../components/Widgets/WidgetSalary";
import CardPaymentMethods from "../../components/Cards/CardPaymentMethods";
import CardBillingInfo from "../../components/Cards/CardBillingInfo";
import CardTransactions from "../../components/Cards/CardTransactions";
import WidgetCounter from "../../components/Widgets/WidgetCounter";

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
      livreur: {},
      livreurs: null,
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

    this.listelivreur();
    this.detaillivreur();
  },

  methods: {
    showAlert(type, title, description) {
      this.$notification[type]({
        message: title,
        description: description,
      });
    },

    listelivreur() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http.post(`${this.callback}/agent/list`, {}, headers).then(
        (response) => {
          let data = response.body.data;
          this.livreurs = data;
        },
        (response) => {
          this.showAlert("error", "Erreur", response.body.message);
        }
      );
    },

    detaillivreur() {
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
            this.livreur = data;
            this.ville = data.quartier.ville.libelle;
            this.quartier = data.quartier.libelle;
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
            code_secret: this.livreur.code_secret,
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
                  this.detaillivreur();

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
                      "Agent livreur deconneter avec success"
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