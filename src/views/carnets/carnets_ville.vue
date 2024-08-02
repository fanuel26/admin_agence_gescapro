<template>
  <div>
    <a-row :gutter="24">
      <a-col
        :span="24"
        :lg="12"
        :xl="6"
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

    <a-row :gutter="24">
      <a-col
        :span="12"
        :lg="12"
        :xl="24"
        class="mb-24"
        v-for="(stat, index) in stats"
        :key="index"
      >
        <a-card class="card card-body border-0">
          <div class="mb-4 d-flex justify-content-between align-items-center">
            <a-input-search
              v-model="value"
              placeholder="Recherche ici"
              style="width: 300px"
              @change="onSearch"
            />
            <div>
              <!-- Carnets_classement -->
              <a-form-item class="" :colon="false">
                <a-select
                  style="width: 300px"
                  v-decorator="[
                    'ville',
                    {
                      initialValue: ville,
                      rules: [
                        {
                          required: true,
                          message: 'ville est vide!',
                        },
                      ],
                    },
                  ]"
                  @change="listeCarnet"
                >
                  <a-select-option
                    v-for="ville in villes"
                    :value="ville.id"
                    :key="ville.id"
                  >
                    {{ ville.libelle }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </div>
          </div>

          <a-table :columns="columns" :data-source="data">
            <template slot="operation" slot-scope="text, record">
              <div class="d-flex">
                <router-link
                  :to="{
                    name: 'Carnets_detail',
                    params: { id: record.key },
                  }"
                  ><a-button type="primary" size="small"
                    >Détail</a-button
                  ></router-link
                >
                <a-popconfirm
                  v-if="record.status == 1"
                  title="Sûre de descactiver?"
                  cancel-text="annuler"
                  ok-text="Valider"
                  @confirm="() => block(record.key)"
                  ><a-button type="danger" class="mx-2" size="small"
                    >Descactiver</a-button
                  >
                </a-popconfirm>

                <a-popconfirm
                  v-if="record.status == 0"
                  title="Sûre d'activé?"
                  cancel-text="annuler"
                  ok-text="Valider"
                  @confirm="() => block(record.key)"
                  ><a-button type="success" class="mx-2" size="small"
                    >Activé</a-button
                  >
                </a-popconfirm>
              </div>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
  
  <script>
// Counter Widgets
import WidgetCounter from "../../components/Widgets/WidgetCounter";
import WidgetCounterC from "../../components/Widgets/WidgetCounter_c";

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "carnet_create" });
  },
  components: {
    WidgetCounter,
    WidgetCounterC,
  },
  data() {
    return {
      callback: process.env.VUE_APP_API_BASE_URL,
      namApp: process.env.VUE_APP_NAME,
      token_admin: null,
      stats: [],
      stats_carnet: [],
      width: 1000,
      columns: [],
      data: [],
      data_s: [],
      value: null,
      produitData: [],
      buttonText: "Détail",
      visible: false,
      confirmLoading: false,
      villes: [],
      page: 1,
      row: 20,
      // form value
      nom: null,
      prix: 0,
      pr: 0,
      nbr_jour: 12,
      produit: [],
      code_secret: null,
      prix_vente: 0,
      prix_achat: 0,
      total: 0,
      prix_w: 0,
    };
  },
  mounted() {
    this.columns = [
      {
        title: "Date de creation",
        dataIndex: "created_at",
        key: "created_at",
        scopedSlots: { customRender: "name" },
      },
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
        title: "Somme total (Fcfa)",
        dataIndex: "somme",
        key: "somme",
      },
      {
        title: "Nombre vendus",
        dataIndex: "nbr_sell",
        key: "nbr_sell",
      },
      {
        title: "Action",
        key: "Action",
        scopedSlots: { customRender: "operation" },
      },
    ];

    this.stats = [
      {
        title: "Nombre de carnets créés",
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

    this.listeProduit();
    this.listeVille();
    // this.listeCarnet();
  },
  methods: {

    listeVille() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http.post(`${this.callback}/ville/liste`, {}, headers).then(
        (response) => {
          let data = response.body.data;

          this.villes = data;
        },
        (response) => {
          this.showAlert("error", "Erreur", response.body.message);
        }
      );
    },

    listeProduit() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(`${this.callback}/produit/list?all=true`, {}, headers)
        .then(
          (response) => {
            let data = response.body.data;
            this.produitData = [];
            for (let i = 0; i < data.length; i++) {
              this.produitData.push({
                value: data[i].libelle,
                title: data[i].libelle,
                id: data[i].id,
                key: data[i].id,
                prix_achat: data[i].prix_achat,
                prix_vente: data[i].prix_vente,
              });
            }
          },
          (response) => {
            flash(response.body.message, "Erreur", "fa fa-times", "danger");
          }
        );
    },

    listeCarnet(id) {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(`${this.callback}/v2-upgrade/type_carnet/ville/${id}?all=true`, {}, headers)
        .then(
          (response) => {
            let data = response.body.data;
            this.stats[0].value = data.length;

            this.data = [];

            console.log("data");
            console.log(data);
            console.log("data");

            for (let i = 0; i < data.length; i++) {
              this.data.push({
                key: data[i].id,
                created_at: new Date(data[i].created_at).toLocaleString(),
                libelle: data[i].libelle,
                nbr_mois: data[i].period / 31,
                prix_jour: data[i].tarif,
                somme: data[i].tarif * data[i].period,
                nbr_sell: data[i].vendu,
                status: data[i].status,
              });

              this.data_s = this.data;
            }
          },
          (response) => {
            this.showAlert("error", "Error", response.body.message);
          }
        );
    },

    generate(value) {
      let data = this.produitData;
      let dt = this.produit;

      this.prix_vente = 0;
      this.prix_achat = 0;

      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < dt.length; j++) {
          if (data[i].key == dt[j]) {
            this.prix_vente += data[i].prix_vente;
            this.prix_achat += data[i].prix_achat;

            this.stats_carnet[0].value = this.prix_achat;
            this.stats_carnet[1].value = this.prix_vente;

            this.pr = Math.round(this.prix_vente / 372);

            this.stats_carnet[3].value = this.pr;

            for (let i = 0; i < 10000; i++) {
              if (this.pr <= i * 25) {
                this.prix = i * 25;
                this.total = this.prix * 372;

                this.stats_carnet[2].value = this.total;

                this.prix_w = this.prix;
                break;
              }
            }
          }
        }
      }
    },

    calcule_total(e) {
      let value = e.target.value;
      this.prix_w = value;
      if (value >= this.pr) {
        this.total = value * 372;
      } else {
        this.showAlert(
          "error",
          "Erreur",
          "Ce prix ne vous est pas favorable, vous aurez des dettes!"
        );
      }
    },

    showModal() {
      this.visible = true;
    },

    handleOk(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.code_secret == localStorage.getItem("code_secret")) {
            this.confirmLoading = true;

            this.CarnetSubmit(values);
            setTimeout(() => {
              this.listeCarnet();
              this.visible = false;
              this.confirmLoading = false;
            }, 2000);
          } else {
            this.showAlert("error", "Erreur", "Code secret incorrect!");
            this.confirmLoading = false;
          }
        } else {
          this.showAlert("error", "Erreur", "Veillez remplir tous les champs");
          this.confirmLoading = false;
        }
      });
    },

    handleCancel(e) {
      this.visible = false;
    },

    showAlert(type, title, description) {
      this.$notification[type]({
        message: title,
        description: description,
        placement: "bottomRight",
      });
    },

    // Handles input validation after submission.
    CarnetSubmit(data) {
      let session = localStorage;
      this.token_admin = session.getItem("token");
      let headers = { headers: { Authorization: this.token_admin } };

      let values = {
        libelle: data.libelle,
        frais: data.prix,
        nbr_jour: 372,
        produits: this.produit,
      };

      this.$http.post(`${this.callback}/carnet/create`, values, headers).then(
        (response) => {
          if (response) {
            this.showAlert(
              "success",
              "Success",
              "Creation de carnet effectuer avec success"
            );

            this.form.resetFields();
          }
        },
        (response) => {
          this.showAlert("error", "Erreur", response.body.message);
        }
      );
    },

    block(id) {
      let session = localStorage;
      this.token_admin = session.getItem("token");
      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(`${this.callback}/carnet/update/change-status/${id}`, {}, headers)
        .then(
          (response) => {
            if (response) {
              this.showAlert(
                "success",
                "Success",
                "Status du carnet changer avec success"
              );

              this.listeCarnet();
            }
          },
          (response) => {
            this.showAlert("error", "Erreur", response.body.message);
          }
        );
    },

    onSearch() {
      this.value = this.value.toLowerCase();

      let data = this.data_s;

      this.data = [];
      for (let i = 0; i < data.length; i++) {
        let libelle = data[i].libelle.toLowerCase();
        if (libelle.indexOf(this.value) > -1) {
          this.data.push(data[i]);
        }
      }
    },
  },
};
</script>