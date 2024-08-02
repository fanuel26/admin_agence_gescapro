<!-- 
	This is the dashboard page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>
    <a-row :gutter="24" type="flex" align="stretch">
      <a-col :span="24" :xl="24" class="mb-24">
        <a-card
          :bordered="false"
          class="header-solid h-full"
          :bodyStyle="{ paddingTop: '12px' }"
        >
          <template #title>
            <h6>Livraison à {{ val }} mois</h6>
          </template>
          <div class="d-flex justify-content-end align-items-center">
            <a-form
              id="components-form-demo-normal-login"
              :form="form"
              @submit="checkLivraison"
              class="login-form mx-4 d-flex"
              :hideRequiredMark="true"
            >
              <a-form-item label="Selectionnez nombre de mois">
                <div class="d-flex">
                  <a-select
                    style="width: 250px"
                    v-decorator="[
                      'nbr',
                      {
                        rules: [
                          {
                            required: true,
                            message: 'Sélectionner nombre de mois',
                          },
                        ],
                      },
                    ]"
                  >
                    <a-select-option value="1"> 1 mois </a-select-option>
                    <a-select-option value="2"> 2 mois </a-select-option>
                    <a-select-option value="3"> 3 mois </a-select-option>
                    <a-select-option value="4"> 4 mois </a-select-option>
                    <a-select-option value="5"> 5 mois </a-select-option>
                    <a-select-option value="6"> 6 mois </a-select-option>
                    <a-select-option value="7"> 7 mois </a-select-option>
                    <a-select-option value="8"> 8 mois </a-select-option>
                    <a-select-option value="9"> 9 mois </a-select-option>
                    <a-select-option value="10"> 10 mois </a-select-option>
                    <a-select-option value="11"> 11 mois </a-select-option>
                    <a-select-option value="12"> 12 mois </a-select-option>
                  </a-select>
                  <a-button htmlType="submit" type="primary" class="mx-2">
                    Checker
                  </a-button>
                </div>
              </a-form-item>
            </a-form>
          </div>
          <a-table :columns="columnsCarnet" :data-source="dataCarnets">
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// Bar chart for "Active Users" card.
import CardBarChart from "../../components/Cards/CardBarChart";

// Line chart for "Sales Overview" card.
import CardLineChart from "../../components/Cards/CardLineChart";

// Counter Widgets
import WidgetCounter from "../../components/Widgets/WidgetCounter";

// "Projects" table component.
import CardProjectTable from "../../components/Cards/CardProjectTable";

// Order History card component.
import CardOrderHistory from "../../components/Cards/CardOrderHistory";

// Information card 1.
import CardInfo from "../../components/Cards/CardInfo";

// Information card 2.
import CardInfo2 from "../../components/Cards/CardInfo2";

export default {
  components: {
    CardBarChart,
    CardLineChart,
    WidgetCounter,
    CardProjectTable,
    CardOrderHistory,
    CardInfo,
    CardInfo2,
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },

  data() {
    return {
      
      callback: process.env.VUE_APP_API_BASE_URL,
      namApp: process.env.VUE_APP_NAME,
      token_admin: null,
      columnsCarnet: null,
      dataCarnets: [],
      val: 2,
    };
  },

  mounted() {
    this.columnsCarnet = [
      {
        title: "Nom du carnet",
        dataIndex: "libelle",
        key: "libelle",
      },
      {
        title: "Nombre mois",
        dataIndex: "nbr_mois",
        key: "nbr_mois",
      },
      {
        title: "Prix par jour (Fcfa)",
        dataIndex: "prix_jour",
        key: "prix_jour",
      },
      {
        title: "Nombre de cotisation",
        dataIndex: "nbr_cot",
        key: "nbr_cot",
      },
      {
        title: "Nom client",
        dataIndex: "nom_client",
        key: "nom_client",
      },
      {
        title: "Numero client",
        dataIndex: "numero_client",
        key: "numero_client",
      },
    ];

    this.statistique();
  },

  methods: {
    showAlert(type, title, description) {
      this.$notification[type]({
        message: title,
        description: description,
      });
    },

    statistique() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(`${this.callback}/carnet-clients`, {}, headers)
        .then((response) => {
          let data = response.body.data;
          // this.stats[5].value = data.length;

          this.dataCarnets = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].nbcotisattion > 31 * 12 - 62) {
              this.dataCarnets.push({
                key: data[i].id,
                libelle: data[i].carnet.libelle,
                nbr_mois: data[i].carnet.period / 31,
                prix_jour: data[i].carnet.tarif,
                nbr_cot: data[i].nbcotisattion,
                nom_client: `${data[i].client.nom} ${data[i].client.prenom}`,
                numero_client: data[i].client.numero,
              });
            }
          }
        });
    },

    checkLivraison(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let session = localStorage;
          this.token_admin = session.getItem("token");

          let headers = { headers: { Authorization: this.token_admin } };
          this.val = parseInt(values.nbr);

          this.$http
            .post(`${this.callback}/carnet-clients`, {}, headers)
            .then((response) => {
              let data = response.body.data;

              this.dataCarnets = [];
              for (let i = 0; i < data.length; i++) {
                if (data[i].nbcotisattion > 372 - this.val * 31) {
                  this.dataCarnets.push({
                    key: data[i].id,
                    libelle: data[i].carnet.libelle,
                    nbr_mois: data[i].carnet.period / 31,
                    prix_jour: data[i].carnet.tarif,
                    nbr_cot: data[i].nbcotisattion,
                    nom_client: `${data[i].client.nom} ${data[i].client.prenom}`,
                    numero_client: data[i].client.numero,
                  });
                }
              }

              console.log(this.dataCarnets);
            });
        } else {
          this.showAlert("error", "Error", "Veuillez selectionnez le mois");
        }
      });
    },
  },
};
</script>

