<!-- 
	This is the billing page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>
    <a-row type="flex" :gutter="24">
      <!-- Billing Information Column -->
      <a-col :span="24" :md="16" class="mb-24">
        <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }">
          <div class="text-left mb-4">
            <a-button type="primary" class="mr-2" @click="changeState()">
              Modifier le collecteur
            </a-button>
            <!-- <router-link class="mx-2" :to="{
              name: 'Collecteur_depot',
              params: { id: this.$route.params.id },
            }">
              <a-button type="primary">Deversement collecteur</a-button>
            </router-link>
            <router-link class="mx-2" :to="{
              name: 'Collecteur_client',
              params: { id: this.$route.params.id },
            }">
              <a-button type="primary">Liste des clients</a-button>
            </router-link> -->
            <!-- <router-link class="mx-2" :to="{
              name: 'Collecteur_classement',
              params: { id: this.$route.params.id },
            }">
              <a-button type="primary">Classement clients</a-button>
            </router-link> -->
            <!-- <router-link class="mr-2" :to="{
              name: 'Collecteur_not_visite',
              params: { id: this.$route.params.id },
            }">
              <a-button type="primary">Clients non visités</a-button>
            </router-link> -->
            <!-- <router-link class="mx-2" :to="{
              name: 'Collecteur_classement_carnet',
              params: { id: this.$route.params.id },
            }">
              <a-button type="primary">Classement carnet</a-button>
            </router-link> -->
          </div>
          <template #title>
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="font-semibold m-0">Information du collecteur</h6>

              <a-button class="mx-2" @click="$router.go(-1)">Retour</a-button>
            </div>
          </template>
          <a-row :gutter="[24, 24]">
            <a-col :span="24">
              <a-card :bordered="false" class="card-billing-info">
                <div class="col-info">
                  <div>
                    <img :src="`${callbackProfile}/file/${this.$route.params.id}`"
                      style="width: 100px; height: 100px; border-radius: 50%; margin-bottom: 10px;" alt="">
                  </div>
                  <a-descriptions :title="'date de création: ' +
                    new Date(collecteur.created_at).toLocaleString()
                    " :column="2">
                    <a-descriptions-item label="Nom">
                      {{ collecteur.nom }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Prenom">
                      {{ collecteur.prenom }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Numéro de téléphone">
                      (+228) {{ collecteur.numero }}
                    </a-descriptions-item>
                    <a-descriptions-item> </a-descriptions-item>
                    <a-descriptions-item label="Ville">
                      {{ ville }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Quartier">
                      {{ quartier }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Code secret">
                      {{ collecteur.code_secret }}
                    </a-descriptions-item>
                    <a-descriptions-item label="Nom d'agence">
                      {{ collecteur.agc_name }}
                    </a-descriptions-item>
                  </a-descriptions>
                </div>
              </a-card>
            </a-col>
          </a-row>
          <a-col :span="24" :md="24" class="mb-24" v-if="state == true">
            <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }">
              <template #title>
                <h6 class="font-semibold m-0">Modification du collecteur</h6>
              </template>
              <a-form id="components-form-demo-normal-login" :form="form_update" class="login-form"
                @submit="collecteurUpdate" :hideRequiredMark="true">
                <a-row type="flex" :gutter="24">
                  <!-- Billing Information Column -->
                  <a-col :span="12" :md="12" class="">
                    <a-form-item class="" label="Nom du collecteur" :colon="false">
                      <a-input v-decorator="[
                        'nom',
                        {
                          initialValue: collecteur.nom,
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
                      <a-input v-decorator="[
                        'prenom',
                        {
                          initialValue: collecteur.prenom,
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
                  <a-col :span="24" :md="24">
                    <div class="d-flex justify-content-end">
                      <a-button htmlType="submit" type="primary">
                        Modifier
                      </a-button>
                    </div>
                  </a-col>
                </a-row>
              </a-form>
            </a-card>
          </a-col>
          <a-col :span="24" :md="24" class="mb-24">
            <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }">
              <template #title>
                <h6 class="font-semibold m-0">Statistique du collecteur</h6>
              </template>
              <a-row :gutter="24">
                <a-col :span="12" :lg="12" :xl="12" class="mb-24" v-for="(stat, index) in stats" :key="index">
                  <!-- Widget 1 Card -->
                  <WidgetCounter :title="stat.title" :value="stat.value" :prefix="stat.prefix" :suffix="stat.suffix"
                    :icon="stat.icon" :status="stat.status"></WidgetCounter>
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
        <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ paddingTop: '16px', paddingBottom: '16px' }">
          <template>
            <h6 class="font-semibold m-0">Photo de profile</h6>
          </template>
          <div style="padding-bottom: 10px;">
            <a-upload class="mb-4" name="file"
              :headers="headers" @change="handleChange">
              <a-button>
                <upload-outlined></upload-outlined>
                Click to Upload
              </a-button>
            </a-upload>
            <!-- <div class="mb-4 text-right">
              <a-button type="primary" @click="uploader()" class="login-form-button">
                Uploader le profile
              </a-button>
            </div> -->
          </div>
          <template>
            <h6 class="font-semibold m-0">Generer code secret</h6>
          </template>
          <a-form id="components-form-demo-normal-login" :form="form_code" class="login-form" @submit="changeCode"
            :hideRequiredMark="true">
            <a-form-item class="" label="Code secret generer" :colon="false">
              <a-input v-decorator="[
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
              ]" disabled type="text" placeholder="Code secret" />
            </a-form-item>
            <div class="mb-4 text-right">
              <a-button type="primary" html-type="submit" class="login-form-button">
                Generer
              </a-button>
            </div>
          </a-form>
          <template>
            <h6 class="font-semibold m-0">Generer mot de passe</h6>
          </template>
          <a-form id="components-form-demo-normal-login" :form="form_password" class="login-form" @submit="passwordSubmit"
            :hideRequiredMark="true">
            <a-form-item class="" label="Mot de passe generer" :colon="false">
              <a-input v-decorator="[
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
              ]" disabled type="text" placeholder="Mot de passe" />
            </a-form-item>
            <div class="mb-4 text-right">
              <a-button type="primary" html-type="submit" class="login-form-button">
                Generer
              </a-button>
            </div>
          </a-form>
          <template>
            <h6 class="font-semibold m-0">Deconnectez le collecteur</h6>
          </template>
          <a-form id="components-form-demo-normal-login" :form="form_disconnect" class="login-form"
            @submit="disconnectSubmit" :hideRequiredMark="true">
            <a-form-item class="" label="Code secret" :colon="false">
              <a-input v-decorator="[
                'code_secret',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Code secret est vide!',
                    },
                  ],
                },
              ]" type="text" placeholder="Code secret" />
            </a-form-item>
            <div class="mb-4 text-right">
              <a-button type="danger" html-type="submit" class="login-form-button">
                Deconnexion
              </a-button>
            </div>
          </a-form>
          <!-- <template>
            <h6 class="font-semibold m-0">
              Changer ce collecteur par un autre collecteur
            </h6>
          </template>
          <a-form
            id="components-form-demo-normal-login"
            :form="form_affect"
            class="login-form"
            @submit="affectSubmit"
            :hideRequiredMark="true"
          >
            <a-form-item label="Selectionnez le collecteur">
              <div class="d-flex">
                <a-select
                  v-decorator="[
                    'collecteur',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Collecteur est vide!',
                        },
                      ],
                    },
                  ]"
                >
                  <a-select-option
                    v-for="collect in collecteurs"
                    :value="collect.id"
                    :key="collect.id"
                  >
                    {{ collect.nom }} {{ collect.prenom }}
                  </a-select-option>
                </a-select>
              </div>
            </a-form-item>
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
                type="primary"
                html-type="submit"
                class="login-form-button"
              >
                Affecter
              </a-button>
            </div>
          </a-form> -->

          <template>
            <h6 class="font-semibold m-0">Statistique par date</h6>
          </template>
          <a-form id="components-form-demo-normal-login" :form="form_date" class="login-form" @submit="dateStateSubmit"
            :hideRequiredMark="true">
            <a-form-item label="Date de debut">
              <a-input v-decorator="[
                'date_debut',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Date debut incorrect!',
                    },
                  ],
                },
              ]" type="date" placeholder="Date debut" />
            </a-form-item>
            <a-form-item class="" label="Date de fin :" :colon="false">
              <a-input v-decorator="[
                'date_fin',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Date de fin incorrect!',
                    },
                  ],
                },
              ]" type="date" placeholder="Date de fin" />
            </a-form-item>
            <a-form-item class="" label="Code secret" :colon="false">
              <a-input v-decorator="[
                'code_secret',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Code secret est vide!',
                    },
                  ],
                },
              ]" type="text" placeholder="Code secret" />
            </a-form-item>
            <div class="mb-4 text-right">
              <a-button type="primary" html-type="submit" class="login-form-button">
                Lancer la recherche
              </a-button>
            </div>
          </a-form>
        </a-card>
      </a-col>
      <!-- / Your Transactions Column -->
    </a-row>

    <a-modal title="Statistique d'une periode daté" :visible="visible" @cancel="handleCancel">
      <a-row :gutter="24">
        <a-col :span="24" :lg="24" :xl="24" class="mb-24" v-for="(stat, index) in stats_date" :key="index">
          <!-- Widget 1 Card -->
          <WidgetCounter :title="stat.title" :value="stat.value" :prefix="stat.prefix" :suffix="stat.suffix"
            :icon="stat.icon" :status="stat.status"></WidgetCounter>
          <!-- / Widget 1 Card -->
        </a-col>
      </a-row>
    </a-modal>
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
    this.form_update = this.$form.createForm(this, { name: "update form" });
    this.form_code = this.$form.createForm(this, { name: "code_secret form" });
    this.form_password = this.$form.createForm(this, { name: "password form" });
    this.form_affect = this.$form.createForm(this, { name: "affect form" });
    this.form_date = this.$form.createForm(this, { name: "date form" });
    this.form_disconnect = this.$form.createForm(this, {
      name: "disconnect form",
    });
    this.form_agence = this.$form.createForm(this, { name: "agence form" });
  },
  data() {
    return {
      callback: process.env.VUE_APP_API_BASE_URL,
      callbackProfile: process.env.VUE_APP_API_BASE_URL_PROFILE,
      namApp: process.env.VUE_APP_NAME,
      token_admin: null,
      visible: false,
      stats: [],
      stats_date: [],
      collecteur: {},
      collecteurs: null,
      ville: null,
      quartier: null,
      code_secret: null,
      password: null,
      state: false,
      dataDate: null,
    };
  },

  mounted() {
    this.code_secret = Math.floor(Math.random() * (9999 - 1000) + 1000);
    this.password = `${this.namApp}@${Math.floor(
      Math.random() * (9999 - 1000) + 1000
    )}`;

    this.stats_date = [
      {
        title: "Nombre de clients",
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
        title: "Carnet total vendus",
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
        title: "Total versement",
        value: 0,
        prefix: "",
        suffix: "Fcfa",
        icon: `<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
							<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
						</svg>`,
      },
    ];

    this.stats = [
      {
        title: "Total versement",
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
        title: "Total global des collectes",
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
        title: "Collectes en cours",
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
        title: "Frais carnet",
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
        title: "Nombre de clients",
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
        title: "Carnet total vendus",
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
        title: "Carnet vendus / Jour",
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
        title: "Frais carnet jour",
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
        title: "Total de cotisation unique globale",
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
        title: "Total de cotisation unique / jour",
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
        title: "Dette collecteur",
        value: 0,
        prefix: "",
        suffix: "Fcfa",
        icon: `<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
							<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
						</svg>`,
      },
    ];

    this.listeCollecteur();
    this.detailCollecteur();
  },

  methods: {
    showAlert(type, title, description) {
      this.$notification[type]({
        message: title,
        description: description,
      });
    },

    handleChange(info) {
      console.log(info.file)
      const body = new FormData()
      body.append('file', info.file.originFileObj);
      body.append('id_collecteur', this.$route.params.id)

      // let headers = {};
      this.$http
        .post(`${this.callbackProfile}/upload`, body)
        .then(
          (response) => {
            let data = response.body;
            console.log(data);
            // this.collecteurs = data;
            this.showAlert("success", "Success", response.body.message);
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
        .post(`${this.callback}/agent_collecteur/list`, {}, headers)
        .then(
          (response) => {
            let data = response.body.data;
            console.log(data);
            this.collecteurs = data;
          },
          (response) => {
            this.showAlert("error", "Erreur", response.body.message);
          }
        );
    },

    detailCollecteur() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(
          `${this.callback}/agent_collecteur/info/${this.$route.params.id}`,
          {},
          headers
        )
        .then(
          (response) => {
            let data = response.body.data;
            console.log(data);
            this.collecteur = data;
            this.ville = data.quartier.ville.libelle;
            this.quartier = data.quartier.libelle;
            this.stats[0].value = data.total_cotisation;
            this.stats[1].value =
              data.compte_agent_collecteur + data.total_cotisation;
            this.stats[2].value = data.compte_epargne + data.compte_produit;
            this.stats[3].value = data.carnet_vendu * 200;
            this.stats[5].value = data.carnet_vendu;
            this.stats[10].value = data.dette;
            this.stats[6].value = data.carnet_vendu_jour;
            this.stats[7].value = data.carnet_vendu_jour * 200;
            this.stats[8].value = data.collecte_general
            this.stats[9].value = data.collecte_journalier
          },
          (response) => {
            this.showAlert("error", "Erreur", response.body.message);
          }
        );


      // this.$http
      //   .post(
      //     `${this.callback}/v2-upgrade/collector/gain_global/journaliere/by/id/${this.$route.params.id}`,
      //     {},
      //     headers
      //   )
      //   .then(
      //     (response) => {
      //       let data = response.body.data;
      //       console.log(data);
      //       this.stats[8].value = data
      //     },
      //     (response) => {
      //       this.showAlert("error", "Erreur", response.body.message);
      //     }
      //   );

      this.$http
        .post(
          `${this.callback}/transaction/collecteur/${this.$route.params.id}`,
          {},
          headers
        )
        .then(
          (response) => {
            let data = response.body.data;

            console.log(data);
          },
          (response) => {
            this.showAlert("error", "Erreur", response.body.message);
          }
        );

      this.$http
        .post(
          `${this.callback}/agent_collecteur/client/${this.$route.params.id}`,
          {},
          headers
        )
        .then(
          (response) => {
            let data = response.body.data;

            this.stats[4].value = data.length;
            console.log(data);
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
            code_secret: this.collecteur.code_secret,
            newcode_secret: values.code_secret,
          };

          this.$http
            .post(
              `${this.callback}/agent_collecteur/${this.$route.params.id}/code/change`,
              data_param,
              headers
            )
            .then(
              (response) => {
                let data = response.body;
                console.log(data);

                if (data.status == true) {
                  this.showAlert(
                    "success",
                    "Success",
                    `Code secret générer avec success! Code secret: ${values.code_secret}`
                  );
                  this.detailCollecteur();

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
              `${this.callback}/agent_collecteur/${this.$route.params.id}/password/change/token`,
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
                    `${this.callback}/agent_collecteur/${this.$route.params.id}/password/change/operation`,
                    data_param,
                    headers
                  )
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
                `${this.callback}/agent_collecteur/disconnect/${this.$route.params.id}`,
                {},
                headers
              )
              .then(
                (response) => {
                  let data = response.body;
                  console.log(data);

                  if (data) {
                    this.showAlert(
                      "success",
                      "Success",
                      "Agent collecteur deconneter avec success"
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

    affectSubmit(e) {
      e.preventDefault();
      this.form_affect.validateFields((err, values) => {
        if (!err) {
          if (values.code_secret == localStorage.getItem("code_secret")) {
            let session = localStorage;
            this.token_admin = session.getItem("token");

            let headers = { headers: { Authorization: this.token_admin } };

            this.$http
              .post(
                `${this.callback}/agent_collecteur/affect/agent1/${this.$route.params.id}/client-to-agent2/${values.collecteur}`,
                {},
                headers
              )
              .then(
                (response) => {
                  let data = response.body;
                  console.log(data);

                  if (data.status == true) {
                    this.showAlert(
                      "success",
                      "Success",
                      "Agent collecteur deleguer avec success"
                    );
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
        }
      });
    },

    changeState() {
      this.state = !this.state;
    },

    handleCancel(e) {
      this.visible = false;
    },

    dateStateSubmit(e) {
      e.preventDefault();
      this.form_date.validateFields((err, values) => {
        if (!err) {
          if (values.code_secret == localStorage.getItem("code_secret")) {
            let session = localStorage;
            this.token_admin = session.getItem("token");

            let headers = { headers: { Authorization: this.token_admin } };

            this.$http
              .post(
                `${this.callback}/agent_collecteur/statistique/by-period/${this.$route.params.id}`,
                { endDate: values.date_fin, startDate: values.date_debut },
                headers
              )
              .then(
                (response) => {
                  let data = response.body;
                  console.log(data);

                  if (data) {
                    this.dataDate = data.data;
                    this.stats_date[0].value = this.dataDate.totalClients;
                    this.stats_date[1].value = this.dataDate.totalCarnets;
                    this.stats_date[2].value = this.dataDate.totalDeversements;
                    this.visible = true;
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

    collecteurUpdate(e) {
      e.preventDefault();
      this.form_update.validateFields((err, values) => {
        if (!err) {
          let session = localStorage;
          this.token_admin = session.getItem("token");
          let headers = { headers: { Authorization: this.token_admin } };

          let data_create = {
            nom: values.nom,
            prenom: values.prenom,
          };

          this.$http
            .post(
              `${this.callback}/suppfunc/update/collecteur/info/${this.collecteur.id}`,
              data_create,
              headers
            )
            .then(
              (response) => {
                this.showAlert(
                  "success",
                  "Success",
                  "Agent collecteur modifier avec success"
                );

                this.detailCollecteur();
              },
              (response) => {
                this.showAlert("error", "Error", response.body.message);
              }
            );
        }
      });
    },

    handleSubmit() { },
  },
};
</script>

<style lang="scss"></style>