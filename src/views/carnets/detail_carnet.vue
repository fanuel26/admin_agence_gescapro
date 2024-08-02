<!-- 
	This is the billing page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

 <template>
  <div>
    <a-row type="flex" :gutter="24">
      <!-- Billing Information Column -->
      <a-col :span="24" :md="24" class="mb-24">
        <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }">
          <template #title>
            <h6 class="font-semibold m-0">Statistique du carnet</h6>
          </template>
          <a-row :gutter="24">
            <a-col :span="12" :lg="6" :xl="6" class="mb-24" v-for="(stat, index) in stats" :key="index">
              <!-- Widget 1 Card -->
              <WidgetCounter :title="stat.title" :value="stat.value" :prefix="stat.prefix" :suffix="stat.suffix"
                :icon="stat.icon" :status="stat.status"></WidgetCounter>
              <!-- / Widget 1 Card -->
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="24" :md="24" class="mb-24">
        <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }">
          <div class="text-right mb-4">
            <router-link :to="{ name: 'Carnets_client' }">
              <a-button type="danger" class="mx-2">Liste des clients du carnet</a-button>
            </router-link>
            <router-link :to="{ name: 'Carnets_client_terminer' }">
              <a-button type="primary" class="mx-2">clients terminés</a-button>
            </router-link>
            <a-button @click="$router.go(-1)">Retour</a-button>
          </div>
          <template #title>
            <h6 class="font-semibold m-0">Information du carnet</h6>
          </template>
          <a-row :gutter="[24, 24]">
            <a-col :span="24">
              <a-card :bordered="false" class="card-billing-info">
                <div class="col-info">
                  <a-descriptions v-bind:title="
                    'Date de creation: ' +
                    new Date(carnet.created_at).toLocaleString()
                  " :column="2">
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
                    <a-descriptions-item label="Gain carnet">
                      {{ carnet.benefice_carnet }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Nom du createur">
                      Admin X
                    </a-descriptions-item>
                  </a-descriptions>
                </div>
              </a-card>
            </a-col>
          </a-row>
          <a-col :span="24" :md="24" class="mb-24">
            <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }">
              <template #title>
                <h6 class="font-semibold m-0">Modification du carnet</h6>
              </template>
              <a-row>
                <a-col :span="24" :md="24" class="mb-24">
                  <a-form :form="form" class="carnet-form" @submit="CarnetSubmit" :hideRequiredMark="true">
                    <a-row type="flex" :gutter="24">
                      <!-- Billing Information Column -->
                      <a-col :span="8" :md="8" class="">
                        <a-form-item class="" label="Nom du carnet" :colon="false">
                          <a-input v-model="nom" v-decorator="[
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
                          ]" type="text" placeholder="Nom carnet" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="4" :md="4" class="" v-if="carnet.vendu == 0">
                        <a-form-item class="" label="Prix par jour" :colon="false">
                          <a-input v-model="prix" v-decorator="[
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
                          ]" type="number" placeholder="Prix par jour" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="4" :md="4" class="" v-if="carnet.vendu == 0">
                        <a-form-item class="" label="Nombre de mois" :colon="false">
                          <a-input v-model="nbr_jour" v-decorator="[
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
                          ]" type="number" placeholder="Nombre du mois" />
                        </a-form-item>
                      </a-col>

                      <a-col :span="8" :md="8" class="">
                        <a-form-item class="" label="Gain carnet" :colon="false">
                          <a-input v-model="gain" v-decorator="[
                            'gain',
                            {
                              initialValue: gain,
                              rules: [
                                {
                                  required: true,
                                  message: 'Gain carnet est vide!',
                                },
                              ],
                            },
                          ]" type="number" placeholder="Gain carnet" />
                        </a-form-item>
                      </a-col>

                      <a-col :span="8" :md="8" class="">
                        <a-form-item class="" label="Code secret" :colon="false">
                          <a-input v-model="code_secret" v-decorator="[
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
                          ]" type="number" placeholder="Code secret" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="24" :md="24" class="mb-4 text-right">
                        <a-button type="primary" html-type="submit" class="login-form-button">
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
import WidgetCounter from "../../components/Widgets/WidgetCounter";

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
    WidgetCounter,
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "carnet_create" });
  },
  data() {
    return {
      // Associating "Your Transactions" list data with its corresponding property.
      transactionsData,

      callback: process.env.VUE_APP_API_BASE_URL,
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
      gain: 0,
      code_secret: null,
    };
  },
  mounted() {
    this.stats = [
      {
        title: "Sommes déjà collectées",
        value: 0,
        prefix: "",
        suffix: "Fcfa",
        icon: `<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
							<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
						</svg>`,
      },
      {
        title: "Sommes totales à collectées",
        value: 0,
        prefix: "",
        suffix: "Fcfa",
        icon: `<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
							<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
						</svg>`,
      },
      {
        title: "Total client",
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
        title: "Sommes restantes à versées",
        value: 0,
        prefix: "",
        suffix: "Fcfa",
        icon: `<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
							<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
						</svg>`,
      },
      {
        title: "Gain Par carnet",
        value: 0,
        prefix: "",
        suffix: "Fcfa",
        icon: `<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
							<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
						</svg>`,
      },
      {
        title: "Gain unique total du jour",
        value: 0,
        prefix: "",
        suffix: "Fcfa",
        icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
						</svg>`,
      },
      {
        title: "Nombre unique deja collecté",
        value: 0,
        prefix: "",
        suffix: "",
        icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
						</svg>`,
      },
      {
        title: "Nombre unique à collecter",
        value: 0,
        prefix: "",
        suffix: "",
        icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
						</svg>`,
      },
    ];
    this.listeCarnet();
  },
  methods: {
    listeCarnet() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(
          `${this.callback}/v2/carnet/detail/${this.$route.params.id}`,
          {},
          headers
        )
        .then(
          (response) => {
            let data = response.body.data;
            let dt = response.body.extraParam;
            console.log(dt);
            console.log(data);

            // somme_global_pour_cotiser
            // montant_finalisation
            this.stats[0].value = dt.somme_global_pour_cotiser;
            this.stats[1].value = dt.somme_global_pour_finalisation;
            this.stats[2].value = dt.nb_client;
            this.stats[3].value =
              dt.somme_global_pour_finalisation - dt.somme_global_pour_cotiser;
            this.stats[6].value = data.total_collecte
            this.stats[7].value = 372 * dt.nb_client
            this.carnet = data;
            this.nom = data.libelle;
            this.prix = data.tarif;
            this.gain = data.benefice_carnet;
            this.nbr_jour = parseInt(data.period / 31);

            let produits = data.prod;
            for (let i = 0; i < produits.length; i++) {
              this.produitData.push({
                title: data.libelle,
                value: data.id,
                key: data.id,
              });
            }
          },
          (response) => {
            flash(response.body.message, "Erreur", "fa fa-times", "danger");
          }
        );

      // {

      this.$http
        .post(
          `${this.callback}/v2-upgrade/type_carnet/gain_total/${this.$route.params.id}`,
          {},
          headers
        )
        .then(
          (response) => {
            console.log(response.body.data)
            this.stats[4].value = response.body.data;
          },
          (response) => {
            flash(response.body.message, "Erreur", "fa fa-times", "danger");
          }
        );

      this.$http
        .post(
          `${this.callback}/v2-upgrade/type_carnet/gain_total_today/${this.$route.params.id}`,
          {},
          headers
        )
        .then(
          (response) => {
            console.log(response.body.data)
            this.stats[5].value = response.body.data;
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
            tarif: this.prix,
            nbr_jour: this.nbr_jour * 31,
            produits: this.produit,
            benefice_carnet: parseInt(this.gain),
          };

          console.log(data);
          this.$http
            .post(
              `${this.callback}/carnet/update/${this.$route.params.id}`,
              data,
              headers
            )
            .then(
              (response) => {
                if (response) {
                  this.showAlert(
                    "success",
                    "Success",
                    "Mise à jour de carnet effectuer avec success"
                  );
                  this.listeCarnet()
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