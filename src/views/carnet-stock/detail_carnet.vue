<!-- 
	This is the billing page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>
    <a-row type="flex" :gutter="24">
      <!-- Billing Information Column -->
      <a-col :span="24" :md="24" class="mb-24">
        <a-card
          :bordered="false"
          class="header-solid h-full"
          :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }"
        >
          <div class="text-right mb-4">
            <a-button @click="$router.go(-1)">Retour</a-button>
          </div>
          <template #title>
            <h6 class="font-semibold m-0">Information du carnet</h6>
          </template>
          <a-row :gutter="[24, 24]">
            <a-col :span="24">
              <a-card :bordered="false" class="card-billing-info">
                <div class="col-info">
                  <a-descriptions
                    v-bind:title="'Date de creation: ' + new Date(carnet.created_at).toLocaleString()"
                    :column="2"
                  >
                    <a-descriptions-item label="Nom du carnet">
                      {{ carnet.libelle }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Nombre de mois">
                      {{ nbr_jour }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Prix par jour">
                      {{ prix }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Somme total">
                      {{ prix * nbr_jour * 31 }} Fcfa
                    </a-descriptions-item>
                    <a-descriptions-item label="Nombre vendus">
                      {{ carnet.vendu }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Nom du createur">
                      Admin X
                    </a-descriptions-item>
                  </a-descriptions>
                </div>
              </a-card>
            </a-col>
          </a-row>
          <a-col :span="24" :md="24" class="mb-24" v-if="carnet.vendu == 0">
            <a-card
              :bordered="false"
              class="header-solid h-full"
              :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }"
            >
              <template #title>
                <h6 class="font-semibold m-0">Modification du carnet</h6>
              </template>
              <a-row>
                <a-col :span="24" :md="24" class="mb-24">
                  <a-form
                    :form="form"
                    class="carnet-form"
                    @submit="CarnetSubmit"
                    :hideRequiredMark="true"
                  >
                    <a-row type="flex" :gutter="24">
                      <!-- Billing Information Column -->
                      <a-col :span="8" :md="8" class="">
                        <a-form-item
                          class=""
                          label="Nom du carnet"
                          :colon="false"
                        >
                          <a-input
                            v-model="nom"
                            v-decorator="[
                              'nom',
                              {
                                initialValue: nom,
                                rules: [
                                  {
                                    required: true,
                                    message: 'Nom du carnet est vide!',
                                  },
                                ],
                              },
                            ]"
                            type="text"
                            placeholder="Nom carnet"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="4" :md="4" class="">
                        <a-form-item
                          class=""
                          label="Prix par jour"
                          :colon="false"
                        >
                          <a-input
                            v-model="prix"
                            v-decorator="[
                              'prix',
                              {
                                initialValue: prix,
                                rules: [
                                  {
                                    required: true,
                                    message: 'Prix par jour est vide!',
                                  },
                                ],
                              },
                            ]"
                            type="number"
                            placeholder="Prix par jour"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="4" :md="4" class="">
                        <a-form-item
                          class=""
                          label="Nombre de mois"
                          :colon="false"
                        >
                          <a-input
                            v-model="nbr_jour"
                            v-decorator="[
                              'nbr_jour',
                              {
                                initialValue: nbr_jour,
                                rules: [
                                  {
                                    required: true,
                                    message: 'Nombre de mois est vide!',
                                  },
                                ],
                              },
                            ]"
                            type="number"
                            placeholder="Nombre du mois"
                          />
                        </a-form-item>
                      </a-col>

                      <a-col :span="8" :md="8" class="">
                        <a-form-item
                          class=""
                          label="Code secret"
                          :colon="false"
                        >
                          <a-input
                            v-model="code_secret"
                            v-decorator="[
                              'code_secret',
                              {
                                initialValue: null,
                                rules: [
                                  {
                                    required: true,
                                    message: 'Code secret est vide!',
                                  },
                                ],
                              },
                            ]"
                            type="number"
                            placeholder="Code secret"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="24" :md="24" class="mb-4 text-right">
                        <a-button
                          type="primary"
                          html-type="submit"
                          class="login-form-button"
                        >
                          Modifier
                        </a-button>
                      </a-col>
                    </a-row>
                  </a-form>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
        </a-card>
      </a-col>
      <!-- Billing Information Column -->

      <!-- Your Transactions Column -->
      <a-col :span="24" :md="8" class="mb-24">
        <!-- Your Transactions Card -->
        <!--<CardTransactions :data="transactionsData"></CardTransactions>-->
        <!-- / Your Transactions Card -->
      </a-col>
      <!-- / Your Transactions Column -->
    </a-row>
  </div>
</template>

<script>
import CardCredit from "../../components/Cards/CardCredit";
import WidgetSalary from "../../components/Widgets/WidgetSalary";
import CardPaymentMethods from "../../components/Cards/CardPaymentMethods";
import CardInvoices from "../../components/Cards/CardInvoices";
import CardBillingInfo from "../../components/Cards/CardBillingInfo";
import CardTransactions from "../../components/Cards/CardTransactions";

// "Your Transactions" list data.
const transactionsData = [
  {
    period: "NEWEST",
  },
  {
    title: "Netflix",
    datetime: "27 March 2021, at 12:30 PM",
    amount: "2,500",
    type: -1, // 0 is for pending, 1 is for deposit, -1 is for withdrawal.
    status: "danger",
  },
  {
    title: "Apple",
    datetime: "27 March 2021, at 04:30 AM",
    amount: "2,000",
    type: 1,
    status: "success",
  },
  {
    period: "YESTERDAY",
  },
  {
    title: "Stripe",
    datetime: "26 March 2021, at 12:30 AM",
    amount: "750",
    type: 1,
    status: "success",
  },
  {
    title: "HubSpot",
    datetime: "26 March 2021, at 11:30 AM",
    amount: "1,050",
    type: 1,
    status: "success",
  },
  {
    title: "Creative Tim",
    datetime: "26 March 2021, at 07:30 AM",
    amount: "2,400",
    type: 1,
    status: "success",
  },
  {
    title: "Webflow",
    datetime: "26 March 2021, at 04:00 AM",
    amount: "Pending",
    type: 0,
    status: "warning",
  },
];

export default {
  components: {
    CardCredit,
    WidgetSalary,
    CardPaymentMethods,
    CardInvoices,
    CardBillingInfo,
    CardTransactions,
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "carnet_create" });
  },
  data() {
    return {
      // Associating "Your Transactions" list data with its corresponding property.
      transactionsData,
      
      callback: process.env.VUE_APP_API_BASE_URL,
      namApp: process.env.VUE_APP_NAME,
      token_admin: null,
      stats: [],
      width: 1000,
      produitData: [],
      buttonText: "Détail",
      visible: false,
      confirmLoading: false,
      carnet: {},
      prod: "",
      // form value
      nom: null,
      prix: null,
      nbr_jour: 12,
      produit: null,
      code_secret: null,
    };
  },
  mounted() {
    this.listeCarnet();
  },
  methods: {
    listeCarnet() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http.post(`${this.callback}/carnet/list?all=true`, {}, headers).then(
        (response) => {
          let data = response.body.data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].id == this.$route.params.id) {
              console.log(data[i]);
              this.carnet = data[i];
              this.nom = data[i].libelle;
              this.prix = data[i].tarif;
              this.nbr_jour = parseInt(data[i].period / 31);

              let produits = data[i].prod;
              for (let i = 0; i < produits.length; i++) {
                this.produitData.push({
                  title: data[i].libelle,
                  value: data[i].id,
                  key: data[i].id,
                });
              }
            }
          }
        },
        (response) => {
          flash(response.body.message, "Erreur", "fa fa-times", "danger");
        }
      );
    },

    showAlert(type, title, description) {
      this.$notification[type]({
        message: title,
        description: description,
      });
    },
    // Handles input validation after submission.
    CarnetSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let session = localStorage;
          this.token_admin = session.getItem("token");
          let headers = { headers: { Authorization: this.token_admin } };

          const data = {
            libelle: this.nom,
            frais: this.prix,
            nbr_jour: this.nbr_jour * 31,
            produits: this.produit,
          };

          console.log(data);
          this.$http
            .post(`${this.callback}/carnet/update/${this.$route.params.id}`, data, headers)
            .then(
              (response) => {
                if (response) {
                  this.showAlert(
                    "success",
                    "Success",
                    "Creation de carnet effectuer avec success"
                  );
                }
              },
              (response) => {
                this.showAlert(
                  "error",
                  "Erreur",
                  "Erreur lors de l'enregistrement"
                );
              }
            );
        }
      });
    },
  },
};
</script>

<style lang="scss">
</style>