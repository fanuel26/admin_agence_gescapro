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
            <h6 class="font-semibold m-0">Information de l'entreprise</h6>
          </template>
          <a-row :gutter="[24, 24]">
            <a-col :span="24">
              <a-card :bordered="false" class="card-billing-info">
                <div class="col-info">
                  <a-descriptions
                    :title="
                      'Date de creation: ' +
                      new Date(client.created_at).toLocaleString()
                    "
                    :column="4"
                  >
                    <a-descriptions-item label="Raison social">
                      {{ client.nom }} {{ client.prenom }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Numéro de téléphone">
                      (+228){{ client.numero }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Nom du gerant">
                      {{ client.profession }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Carte CFE">
                      015868541866
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
                <h6 class="font-semibold m-0">Statistique du client</h6>
              </template>
              <a-row :gutter="24">
                <a-col
                  :span="8"
                  :lg="8"
                  :xl="8"
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
      <a-col :span="24" :md="24" class="mb-24">
        <a-card
          :bordered="false"
          class="header-solid h-full"
          :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }"
        >
          <template #title>
            <h6 class="font-semibold m-0">Liste des personnelles</h6>
          </template>
          <a-table :columns="columns" :data-source="data">
            <template slot="operation" slot-scope="text, record">
              <router-link
                :to="{ name: 'Entreprise_detail', params: { id: record.key } }"
                ><a-button type="primary" size="small"
                  >Detail</a-button
                ></router-link
              >
            </template>
          </a-table>
        </a-card>
      </a-col>

      <!-- Billing Information Column -->
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
import CardTransactionsE from "../../components/Cards/CardTransactionsE";
import WidgetCounter from "../../components/Widgets/WidgetCounter";

// "Your Transactions" list data.

export default {
  components: {
    CardCredit,
    WidgetSalary,
    CardPaymentMethods,
    CardInvoices,
    CardBillingInfo,
    CardTransactions,
    CardTransactionsE,
    WidgetCounter,
  },
  data() {
    return {
      callback: process.env.VUE_APP_API_BASE_URL,
      namApp: process.env.VUE_APP_NAME,
      token_admin: null,
      carnets: [],
      stats: [],
      collumns: [],
      data: [],
      client: {},
      carnets_sus: [],
      collecteur: {},
      nom: null,
      prenom: null,
      numero: null,
      profession: null,
      motif: null,
      type: 0,
      time_out: 0,
      quartier: null,
    };
  },

  mounted() {
    this.stats = [
      {
        title: "Nombre de carnet total",
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
        title: "Nombre de carnet suspendus",
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
        title: "Carnets livrés",
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

    this.columns = [
      {
        title: "Date de creation",
        dataIndex: "created_at",
        key: "created_at",
        scopedSlots: { customRender: "name" },
      },
      {
        title: "Nom & Prénoms",
        dataIndex: "nom",
        key: "nom",
      },
      {
        title: "Numéro de téléphone",
        dataIndex: "numero",
        key: "numero",
      },
      {
        title: "Nom Gerant",
        dataIndex: "gerant",
        key: "gerant",
      },
      {
        title: "Numero de carte CFE",
        dataIndex: "carte",
        key: "carte",
      },
      {
        title: "Action",
        key: "Action",
        scopedSlots: { customRender: "operation" },
      },
    ];

    this.carnets = [];
    this.detailClient();
  },

  methods: {
    detailClient() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(
          `${this.callback}/client/info/${this.$route.params.id}`,
          {},
          headers
        )
        .then(
          (response) => {
            let data = response.body.data;
            console.log(data);
            this.client = data;
            this.collecteur = data.collecteur;
            this.nom = this.client.nom;
            this.prenom = this.client.prenom;
            this.numero = this.client.numero;
            this.profession = this.client.profession;
            this.quartier = this.client.quartier.libelle;
            let dd = this.client.carnets;

            let n_s = 0;
            let n_l = 0;
            let n_e = 0;
            for (let i = 0; i < dd.length; i++) {
              if (dd[i].id_pack == 1) {
                n_e = n_e + 1;

                this.stats[0].value = n_e;
                this.carnets.push({
                  title: `${dd[i].carnet.libelle.substr(0, 30)} ..., N° ${
                    dd[i].ids
                  }`,
                  description: `Nbr de cotisation: ${dd[i].nbcotisattion} | Prix du carnet: ${dd[i].carnet.tarif} Fcfa`,
                  amount: dd[i].nbcotisattion * dd[i].carnet.tarif,
                  type: dd[i].state == 0 ? -1 : 1, // 0 is for pending, 1 is for deposit, -1 is for withdrawal.
                  status: "danger",
                });

                if (dd[i].state == 0) {
                  n_s = n_s + 1;
                  this.stats[1].value = n_s;
                }

                if (dd[i].is_delivered == 1) {
                  n_l = n_l + 1;
                  this.stats[2].value = n_l;
                }
              }
            }
          },
          (response) => {
            flash(response.body.message, "Erreur", "fa fa-times", "danger");
          }
        );
    },
  },
};
</script>

<style lang="scss">
</style>