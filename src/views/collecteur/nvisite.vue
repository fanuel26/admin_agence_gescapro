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
      <a-col :span="12" :lg="12" :xl="24" class="mb-24">
        <a-card class="card card-body border-0">
          <template #title>
            <div class="d-flex justify-content-between">
              <h6>Liste de tous les clients non visité</h6>
              <div>
                <a-range-picker v-model="valueDate" :format="dateFormat" @change="listeClient"/>

                <!-- <a-button type="primary" @click="listeClient" class="mx-4">
                  Envoyer
                </a-button> -->
              </div>
              <a-input-search
                v-model="value"
                placeholder="Recherche ici"
                style="width: 300px"
                @change="onSearch"
              />
            </div>
          </template>
          <a-table :columns="columns" :data-source="data" :pagination="false">
            <template slot="operation" slot-scope="text, record">
              <router-link
                :to="{ name: 'Client_detail', params: { id: record.key } }"
                ><a-button type="primary" size="small"
                  >Détail</a-button
                ></router-link
              >
            </template>
          </a-table>

          <div class="d-flex justify-content-between align-items-center mt-4">
            <div>
              <p>Page {{ page }}/{{ total_page }}</p>
            </div>
            <div>
              <a-button class="mx-2" @click="preview()" v-if="page > 1">
                Retour
              </a-button>
              <a-button class="mx-2" @click="next()" v-if="page != total_page">
                Suivant
              </a-button>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// Counter Widgets
import WidgetCounter from "../../components/Widgets/WidgetCounter";

export default {
  components: {
    WidgetCounter,
  },
  data() {
    return {
      callback: process.env.VUE_APP_API_BASE_URL,
      namApp: process.env.VUE_APP_NAME,
      token_admin: null,
      dateFormat: 'YYYY/MM/DD',
      valueDate: null,
      stats: [],
      columns: [],
      data: [],
      row: 5,
      page: 1,
      nbr: 0,
      total_page: 0,
      value: null,
      buttonText: "Détail",
    };
  },
  mounted() {
    this.stats = [
      /*{
        title: "Clients inactifs",
        value: 0,
        prefix: "",
        suffix: "",
        icon: `<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
							<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
						</svg>`,
      },*/
    ];

    this.columns = [
      {
        title: "Date de creation",
        dataIndex: "created_at",
        key: "created_at",
        scopedSlots: { customRender: "name" },
      },
      {
        title: "Nom/Prénom client",
        dataIndex: "nom",
        key: "nom",
      },
      {
        title: "Numéro de téléphone",
        dataIndex: "numero",
        key: "numero",
      },
      {
        title: "Profession",
        dataIndex: "profession",
        key: "profession",
      },
      {
        title: "Nombre carnet",
        dataIndex: "nbr_carnet",
        key: "nbr_carnet",
      },
      {
        title: "Action",
        key: "Action",
        scopedSlots: { customRender: "operation" },
      },
    ];

    // this.listeClient();
  },
  methods: {
    showAlert(type, title, description) {
      this.$notification[type]({
        message: title,
        description: description,
      });
    },

    listeClient() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(
          `${this.callback}/v2/client/not-visited/by-collector/${this.$route.params.id}?row=${this.row}&page=${this.page}`,
          {startDate: this.valueDate[0], endDate: this.valueDate[0]},
          headers
        )
        .then(
          (response) => {
            let data = response.body.data;

            console.log(response);
            this.nbr = response.body.total;

            // this.stats[0].value = this.nbr;
            this.total_page = response.body.total_pages;

            console.log(this.nbr);
            this.data = [];

            for (let i = 0; i < data.length; i++) {
              this.data.push({
                key: data[i].id,
                created_at: new Date(data[i].created_at).toLocaleString(),
                nom: data[i].nom,
                numero: data[i].numero,
                profession: data[i].profession,
                nbr_carnet: data[i].nb_carnets,
              });
            }
          },
          (response) => {
            this.showAlert("error", "Error", response.body.message);
          }
        );
    },

    next() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.page = this.page + 1;

      this.$http
        .post(
         `${this.callback}/v2/client/not-visited/by-collector/${this.$route.params.id}?row=${this.row}&page=${this.page}`,
          {startDate: this.valueDate[0], endDate: this.valueDate[0]},
          headers
        )
        .then(
          (response) => {
            let dt = response.body.data;

            console.log(dt);

            this.data = [];

            let d = Object.keys(dt).map(function (key) {
              return dt[key];
            });

            console.log(d);
            for (let i = 0; i < d.length; i++) {
              console.log(this.data);
              this.data.push({
                key: d[i].id,
                created_at: d[i].created_at,
                nom: d[i].nom,
                numero: d[i].numero,
                profession: d[i].profession,
                nbr_carnet: d[i].nb_carnets,
              });
            }
          },
          (response) => {
            this.showAlert("error", "Error", response.body.message);
          }
        );
    },

    preview() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.page = this.page - 1;

      this.$http
        .post(
          `${this.callback}/v2/client/not-visited/by-collector/${this.$route.params.id}?row=${this.row}&page=${this.page}`,
          {startDate: this.valueDate[0], endDate: this.valueDate[0]},
          headers
        )
        .then(
          (response) => {
            let dt = response.body.data;

            console.log(dt);

            this.data = [];

            let d = Object.keys(dt).map(function (key) {
              return dt[key];
            });

            console.log(d);
            for (let i = 0; i < d.length; i++) {
              console.log(d[i]);
              this.data.push({
                key: d[i].id,
                created_at: d[i].created_at,
                nom: d[i].nom,
                numero: d[i].numero,
                profession: d[i].profession,
                nbr_carnet: d[i].nb_carnet,
              });
            }
          },
          (response) => {
            this.showAlert("error", "Error", response.body.message);
          }
        );
    },

    onSearch() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(
         `${this.callback}/v2/client/not-visited/by-collector/${this.$route.params.id}?row=${this.row}&page=${this.page}`,
          {startDate: this.valueDate[0], endDate: this.valueDate[0]},
          headers
        )
        .then(
          (response) => {
            let d = response.body.data;

            console.log(response.body);
            this.data = [];
            for (let i = 0; i < d.length; i++) {
              this.data.push({
                key: d[i].id,
                created_at: d[i].created_at,
                nom: d[i].nom,
                numero: d[i].numero,
                profession: d[i].profession,
                nbr_carnet: d[i].nb_carnet,
              });

              this.data_s = this.data;
            }
          },
          (response) => {
            this.showAlert("error", "Error", response.body.message);
          }
        );
      /*this.value = this.value.toLowerCase();

      let data = this.data_s;

      this.data = [];
      for (let i = 0; i < data.length; i++) {
        let nom = data[i].nom.toLowerCase().indexOf(this.value);
        let numero = data[i].numero.toLowerCase().indexOf(this.value);
        if (nom > -1 || numero > -1) {
          this.data.push(data[i]);
        }
      }*/
    },
  },
};
</script>