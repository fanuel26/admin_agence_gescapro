<template>
  <div>
    <a-row :gutter="24">
      <a-col :span="24" :lg="12" :xl="6" class="mb-24" v-for="(stat, index) in stats" :key="index">
        <!-- Widget 1 Card -->
        <WidgetCounter :title="stat.title" :value="stat.value" :prefix="stat.prefix" :suffix="stat.suffix"
          :icon="stat.icon" :status="stat.status"></WidgetCounter>
        <!-- / Widget 1 Card -->
      </a-col>
    </a-row>

    <a-row :gutter="24">
      <a-col :span="12" :lg="12" :xl="24" class="mb-24">
        <a-card class="card card-body border-0">
          <div class="mb-4 d-flex justify-content-between align-items-center">
            <a-input-search v-model="value" placeholder="Recherche ici" style="width: 300px" @change="onSearch" />
            <!-- <router-link :to="{ name: 'Collecteur_ville' }">
              <a-button> Liste de collecteur par ville </a-button></router-link>
              <router-link :to="{ name: 'Collecteur_classement' }">
              <a-button> Classement des collecteurs </a-button></router-link>
            <router-link :to="{ name: 'Collecteur_archived' }">
              <a-button> Liste de collecteur archiver </a-button></router-link> -->
            <a-button type="primary" @click="showModal">
              Créer un agent collecteur
            </a-button>
          </div>

          <a-modal :width="width" title="Creer un agent collecteur" :visible="visible" :confirm-loading="confirmLoading"
            @ok="handleOk" @cancel="handleCancel">
            <a-row type="flex" :gutter="24">
              <!-- Billing Information Column -->
              <a-col :span="16" :md="16" class="">
                <a-form id="components-form-demo-normal-login" :form="form" class="login-form"
                  @submit="collecteurSubmit" :hideRequiredMark="true">
                  <a-row type="flex" :gutter="24">
                    <!-- Billing Information Column -->
                    <a-col :span="12" :md="12" class="">
                      <a-form-item class="" label="Nom du collecteur" :colon="false">
                        <a-input v-model="nom" v-decorator="[
                          'nom',
                          {
                            initialValue: nom,
                            rules: [
                              {
                                required: true,
                                message: 'Nom du collecteur est vide!',
                              },
                            ],
                          },
                        ]" type="text" placeholder="Nom agent collecteur" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="">
                      <a-form-item class="" label="Prénom du collecteur" :colon="false">
                        <a-input v-model="prenom" v-decorator="[
                          'prenom',
                          {
                            initialValue: prenom,
                            rules: [
                              {
                                required: true,
                                message: 'Prénom du collecteur est vide!',
                              },
                            ],
                          },
                        ]" type="text" placeholder="Prénom agent collecteur" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="">
                      <a-form-item class="" label="Numéro de téléphone" :colon="false">
                        <a-input v-model="numero" v-decorator="[
                          'numero',
                          {
                            initialValue: numero,
                            rules: [
                              {
                                required: true,
                                message: 'Numero est vide!',
                              },
                            ],
                          },
                        ]" type="number" placeholder="Numéro de téléphone" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="">
                      <a-form-item class="" label="Ville" :colon="false">
                        <a-select v-decorator="[
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
                        ]" @change="listeQuartier">
                          <a-select-option v-for="ville in villes" :value="ville.id" :key="ville.id">
                            {{ ville.libelle }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12" :md="12" class="">
                      <a-form-item class="" label="Quartier" :colon="false">
                        <a-select v-decorator="[
                          'quartier',
                          {
                            initialValue: quartier,
                            rules: [
                              {
                                required: true,
                                message: 'quartier est vide!',
                              },
                            ],
                          },
                        ]">
                          <a-select-option v-for="quartier in quartiers" :value="quartier.id" :key="quartier.id">
                            {{ quartier.libelle }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-form>
              </a-col>
              <a-col :span="8" :md="8" class="mt-4">
                <a-card :bordered="false" class="card-billing-info">
                  <div class="col-info">
                    <a-descriptions title="Information du collecteur" :column="1">
                      <a-descriptions-item label="Nom">
                        {{ nom }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Prenom">
                        {{ prenom }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Numéro de téléphone">
                        (+228) {{ numero }}
                      </a-descriptions-item>
                      <a-descriptions-item label="Mot de passe">
                        {{ password }}
                      </a-descriptions-item>
                    </a-descriptions>
                  </div>
                </a-card>
              </a-col>
            </a-row>
          </a-modal>
          <a-table :columns="columns" :data-source="data" :pagination="true">
            <template slot="etat" slot-scope="text, record">
              <span v-if="record.etat == 0" class="text-success">Online</span>
              <span v-if="record.etat == 1" class="text-danger">Offline</span>
            </template>
            <template slot="operation" slot-scope="text, record">
              <div class="d-flex justify-content-center">
                <router-link class="mx-2" :to="{
                  name: 'Collecteur_detail',
                  params: { id: record.key },
                }"><a-button type="primary" size="small">Détail</a-button></router-link>
                <a-popconfirm v-if="record.status == 1" title="Sûre de bloquer?"
                  @confirm="() => block(record.key)"><a-button type="danger" class="mx-2"
                    size="small">Bloquer</a-button>
                </a-popconfirm>

                <a-popconfirm v-if="record.status == 0" title="Sûre de débloquer?"
                  @confirm="() => block(record.key)"><a-button type="success" class="mx-2"
                    size="small">Debloquer</a-button>
                </a-popconfirm>
                <a-popconfirm v-if="record.status == 1" title="Sûre d'archiver?"
                  @confirm="() => Archive(record.key)"><a-button type="warning" class="mx-2"
                    size="small">Archiver</a-button>
                </a-popconfirm>
              </div>
            </template>
          </a-table>

          <!-- <div class="d-flex justify-content-between align-items-center mt-4">
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
          </div> -->
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
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  data() {
    return {
      callback: process.env.VUE_APP_API_BASE_URL,
      namApp: process.env.VUE_APP_NAME,
      token_admin: null,
      stats: [],
      width: 1000,
      columns: [],
      data: [],
      data_s: [],
      value: null,
      buttonText: "Détail",
      visible: false,
      confirmLoading: false,

      villes: null,
      quartiers: null,

      row: 5,
      page: 1,
      total_page: 0,

      nom: null,
      prenom: null,
      numero: null,
      ville: null,
      quartier: null,
      password: null,
    };
  },
  mounted() {
    this.password = `${this.namApp}@${Math.floor(
      Math.random() * (9999 - 1000) + 1000
    )}`;

    this.columns = [
      {
        title: "Date de creation",
        dataIndex: "created_at",
        key: "created_at",
        scopedSlots: { customRender: "name" },
      },
      {
        title: "Nom/Prénom collecteur",
        dataIndex: "nom",
        key: "nom",
      },
      {
        title: "Numéro de téléphone",
        dataIndex: "numero",
        key: "numero",
      },
      {
        title: "Agence",
        dataIndex: "agence",
        key: "agence",
      },
      {
        title: "Etat",
        dataIndex: "etat",
        key: "etat",
        scopedSlots: { customRender: "etat" },
      },
      {
        title: "Action",
        key: "Action",
        scopedSlots: { customRender: "operation" },
      },
    ];

    this.stats = [
      {
        title: "Nombre d'agent collecteur",
        value: 0,
        prefix: "",
        suffix: "",
        icon: `<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
							<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
						</svg>`,
      },
      // {
      //   title: "Deversement du jour",
      //   value: 0,
      //   prefix: "",
      //   suffix: "",
      //   icon: `<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      // 				<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
      // 				<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
      // 				<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
      // 			</svg>`,
      // },
      // {
      //   title: "Deversement total",
      //   value: 0,
      //   prefix: "",
      //   suffix: "",
      //   icon: `<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      // 				<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
      // 				<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
      // 				<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
      // 			</svg>`,
      // },
      // {
      //   title: "Collecteur/Deversement",
      //   value: 0,
      //   prefix: "",
      //   suffix: "",
      //   icon: `<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      // 				<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
      // 				<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
      // 				<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
      // 			</svg>`,
      // },
    ];

    this.listeVille();
    this.listeCollecteur();
  },
  methods: {
    showAlert(type, title, description) {
      this.$notification[type]({
        message: title,
        description: description,
      });
    },

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

    listeQuartier(id) {
      let session = localStorage;
      this.token_admin = session.getItem("token");
      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(`${this.callback}/quartier/liste?all=true`, {}, headers)
        .then(
          (response) => {
            let data = response.body.data;

            this.quartiers = [];
            for (let i = 0; i < data.length; i++) {
              if (data[i].id_ville == id) {
                this.quartiers.push(data[i]);
              }
            }
          },
          (response) => {
            this.showAlert("error", "Erreur", response.body.message);
          }
        );
    },

    listeCollecteur() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(
          `${this.callback}/agent_collecteur/list?all=true`,
          {},
          headers
        )
        .then(
          (response) => {
            let data = response.body.data;

            let idAgence = localStorage.getItem("agenceId");

            console.log(response.body);
            // this.total_page = response.body.total_pages;
            this.data = [];
            for (let i = 0; i < data.length; i++) {
              if (data[i].id_agence == idAgence) {
                this.data.push({
                  key: data[i].id,
                  created_at: new Date(data[i].created_at).toLocaleString(),
                  nom: `${data[i].nom} ${data[i].prenom}`,
                  numero: `(+228) ${data[i].numero}`,
                  agence: data[i].agc_name,
                  status: data[i].is_active,
                  etat: data[i].is_disconnect,
                });

                this.data_s = this.data;

                this.stats[0].value = this.data.length;
              }
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

      this.page += 1;

      this.$http
        .post(
          `${this.callback}/agent_collecteur/list?row=${this.row}&page=${this.page}`,
          {},
          headers
        )
        .then(
          (response) => {
            let d = response.body.data;

            console.log(this.data_s);
            this.data = [];

            let data = Object.keys(d).map(function (key) {
              return d[key];
            });

            for (let i = 0; i < data.length; i++) {
              console.log(data[i]);
              this.data.push({
                key: data[i].id,
                created_at: new Date(data[i].created_at).toLocaleString(),
                nom: `${data[i].nom} ${data[i].prenom}`,
                numero: `(+228) ${data[i].numero}`,
                agence: data[i].agc_name,
                status: data[i].is_active,
                etat: data[i].is_disconnect,
              });

              this.data_s = this.data;
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

      this.page -= 1;

      this.$http
        .post(
          `${this.callback}/agent_collecteur/list?row=${this.row}&page=${this.page}`,
          {},
          headers
        )
        .then(
          (response) => {
            let d = response.body.data;

            console.log(this.data_s);
            this.data = [];

            let data = Object.keys(d).map(function (key) {
              return d[key];
            });
            for (let i = 0; i < data.length; i++) {
              this.data.push({
                key: data[i].id,
                created_at: new Date(data[i].created_at).toLocaleString(),
                nom: `${data[i].nom} ${data[i].prenom}`,
                numero: `(+228) ${data[i].numero}`,
                agence: data[i].agc_name,
                status: data[i].is_active,
                etat: data[i].is_disconnect,
              });

              this.data_s = this.data;
            }
          },
          (response) => {
            this.showAlert("error", "Error", response.body.message);
          }
        );
    },

    showModal() {
      this.visible = true;
    },

    block(id) {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(
          `${this.callback}/agent_collecteur/${id}/state/change`,
          {},
          headers
        )
        .then(
          (response) => {
            this.showAlert("success", "Success", response.body.message);
            this.listeCollecteur();
          },
          (response) => {
            this.showAlert("error", "Erreur", response.body.message);
          }
        );
    },

    Archive(id) {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(
          `${this.callback}/agent_collecteur/${id}/archive-state/change`,
          {},
          headers
        )
        .then(
          (response) => {
            this.showAlert("success", "Success", response.body.message);
            this.listeCollecteur();
          },
          (response) => {
            this.showAlert("error", "Erreur", response.body.message);
          }
        );
    },

    handleOk(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true;
          this.collecteurSubmit(values);
          setTimeout(() => {
            this.listeCollecteur();
            this.visible = false;
            this.confirmLoading = false;
          }, 2000);
        } else {
          console.log("error");
        }
      });
    },

    handleCancel(e) {
      this.visible = false;
    },

    collecteurSubmit(data) {
      let session = localStorage;
      this.token_admin = session.getItem("token");
      let headers = { headers: { Authorization: this.token_admin } };


      let idAgence = localStorage.getItem("agenceId");

      let data_create = {
        nom: data.nom,
        prenom: data.prenom,
        numero: data.numero,
        id_quartier: data.quartier,
        password: this.password,
      };

      this.$http
        .post(`${this.callback}/agent_collecteur/create`, data_create, headers)
        .then(
          (resp) => {
            console.log(resp.body.user.id)
            this.$http
              .post(
                `${this.callback}/agence/affectation/agence/${idAgence}/collecteur/${resp.body.user.id}`,
                {},
                headers
              )
              .then(
                (response) => {
                  if (response) {
                    this.showAlert(
                      "success",
                      "Success",
                      "Agent collecteur creer avec success"
                    );
                    this.listeCollecteur();
                    this.form.resetFields();
                  }
                })
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
          `${this.callback}/agent_collecteur/list?search=${this.value}&row=${this.row}&page=1`,
          {},
          headers
        )
        .then(
          (response) => {
            let data = response.body.data;

            console.log(response.body);
            this.data = [];
            for (let i = 0; i < data.length; i++) {
              this.data.push({
                key: data[i].id,
                created_at: new Date(data[i].created_at).toLocaleString(),
                nom: `${data[i].nom} ${data[i].prenom}`,
                numero: `(+228) ${data[i].numero}`,
                agence: data[i].agc_name,
                status: data[i].is_active,
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