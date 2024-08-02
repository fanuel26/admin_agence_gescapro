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
      <a-col :span="12" :lg="18" :xl="18" class="mb-24">
        <a-card class="card card-body border-0">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <a-select style="width: 220px" v-model="ville_select">
                <a-select-option v-for="dt in dataVilles" :key="dt.id" :value="dt.id">
                  {{ dt.ville }}
                </a-select-option>
              </a-select>
              <a-button type="primary" class="mx-2" @click="showModalStatistique()">
                Lancer les statistiques
              </a-button>
            </div>
            <div>
              <a-button type="primary" v-if="nbr_pays == 0" class="mx-2" @click="showModalPays()">
                Créer un pays
              </a-button>
              <a-button type="primary" class="mx-2" @click="showModalVille()">
                Créer une ville
              </a-button>
              <a-button type="primary" class="mx-2" @click="showModalQuartier()">
                Créer un quartier
              </a-button>
            </div>
          </div>

          <!-- showModalStatistique -->
          <a-modal :width="width" title="Statistique par ville" :visible="visibleStat" @cancel="handleCancelStat">
            <a-row type="flex" :gutter="24">
              <!-- Billing Information Column -->
              <a-col :span="24" :lg="24" :xl="24" class="mb-24" v-for="(stat, index) in stats_villes" :key="index">
                <!-- Widget 1 Card -->
                <WidgetCounter :title="stat.title" :value="stat.value" :prefix="stat.prefix" :suffix="stat.suffix"
                  :icon="stat.icon" :status="stat.status"></WidgetCounter>
                <!-- / Widget 1 Card -->
              </a-col>
            </a-row>
          </a-modal>


          <a-modal :width="width" title="Creer un pays" :visible="visiblepays" :confirm-loading="confirmLoading"
            @ok="handleOkPays" @cancel="handleCancelPays">
            <a-row type="flex" :gutter="24">
              <!-- Billing Information Column -->
              <a-col :span="24" :md="24" class="">
                <a-form id="components-form-demo-normal-login" :form="form_pays" class="login-form" @submit="paysSubmit"
                  :hideRequiredMark="true">
                  <a-row type="flex" :gutter="24">
                    <a-col :span="24" :md="24" class="">
                      <a-form-item class="" label="Pays" :colon="false">
                        <a-input v-decorator="[
                          'libelle',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Nom du pays est vide!',
                              },
                            ],
                          },
                        ]" type="text" placeholder="Nom du pays" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-form>
              </a-col>
            </a-row>
          </a-modal>

          <a-modal :width="width" title="Creer une ville" :visible="visibleville" :confirm-loading="confirmLoading"
            @ok="handleOkVille" @cancel="handleCancelVille">
            <a-row type="flex" :gutter="24">
              <!-- Billing Information Column -->
              <a-col :span="24" :md="24" class="">
                <a-form id="components-form-demo-normal-login" :form="form_ville" class="login-form" @submit="villeSubmit"
                  :hideRequiredMark="true">
                  <a-row type="flex" :gutter="24">
                    <!-- Billing Information Column -->
                    <a-col :span="24" :md="24" class="">
                      <a-form-item label="Selectionnez le pays">
                        <div class="d-flex">
                          <a-select v-decorator="[
                            'id_pays',
                            {
                              rules: [
                                {
                                  required: true,
                                  message: 'Sélectionner un pays!',
                                },
                              ],
                            },
                          ]">
                            <a-select-option v-for="dt in dataPays" :key="dt.id" :value="dt.id">
                              {{ dt.pays }}
                            </a-select-option>
                          </a-select>
                        </div>
                      </a-form-item>
                    </a-col>
                    <a-col :span="24" :md="24" class="">
                      <a-form-item class="" label="Ville" :colon="false">
                        <a-input v-decorator="[
                          'libelle',
                          {
                            initialValue: '',
                            rules: [
                              {
                                required: true,
                                message: 'Nom de la ville est vide!',
                              },
                            ],
                          },
                        ]" type="text" placeholder="Nom de la ville" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-form>
              </a-col>
            </a-row>
          </a-modal>

          <a-modal :width="width" title="Creer un quartier" :visible="visiblequartier" :confirm-loading="confirmLoading"
            @ok="handleOkQuartier" @cancel="handleCancelQuartier">
            <a-row type="flex" :gutter="24">
              <!-- Billing Information Column -->
              <a-col :span="24" :md="24" class="">
                <a-form id="components-form-demo-normal-login" :form="form_quartier" class="login-form"
                  @submit="quartierSubmit" :hideRequiredMark="true">
                  <a-row type="flex" :gutter="24">
                    <!-- Billing Information Column -->

                    <a-col :span="24" :md="24" class="">
                      <a-form-item label="Selectionnez le pays">
                        <div class="d-flex">
                          <a-select v-decorator="[
                            'id_pays',
                            {
                              rules: [
                                {
                                  required: true,
                                  message: 'Sélectionner un pays!',
                                },
                              ],
                            },
                          ]" @change="changePays">
                            <a-select-option v-for="dt in dataPays" :key="dt.id" :value="dt.id">
                              {{ dt.pays }}
                            </a-select-option>
                          </a-select>
                        </div>
                      </a-form-item>
                    </a-col>
                    <a-col :span="24" :md="24" class="">
                      <a-form-item label="Selectionnez la ville">
                        <div class="d-flex">
                          <a-select v-decorator="[
                            'id_ville',
                            {
                              rules: [
                                {
                                  required: true,
                                  message: 'Sélectionner une ville!',
                                },
                              ],
                            },
                          ]">
                            <a-select-option v-for="dt in dataVilles" :key="dt.id" :value="dt.id">
                              {{ dt.ville }}
                            </a-select-option>
                          </a-select>
                        </div>
                      </a-form-item>
                    </a-col>
                    <a-col :span="24" :md="24" class="">
                      <a-form-item class="" label="Quartier" :colon="false">
                        <a-input v-decorator="[
                          'libelle',
                          {
                            rules: [
                              {
                                required: true,
                                message: 'Nom du quartier est vide!',
                              },
                            ],
                          },
                        ]" type="text" placeholder="Nom du quartier" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-form>
              </a-col>
            </a-row>
          </a-modal>
        </a-card>
      </a-col>
      <a-col :span="12" :lg="18" :xl="18" class="mb-24">
        <a-card class="card card-body border-0">
          <template #title>
            <h6>Liste des pays</h6>
          </template>
          <a-table :columns="columnsPays" :data-source="dataPays"> </a-table>
        </a-card>
      </a-col>
      <a-col :span="12" :lg="18" :xl="18" class="mb-24">
        <a-card class="card card-body border-0">
          <template #title>
            <h6>Liste des villes</h6>
          </template>
          <a-table :columns="columnsVilles" :data-source="dataVilles">
          </a-table>
        </a-card>
      </a-col>
      <a-col :span="12" :lg="18" :xl="18" class="mb-24">
        <a-card class="card card-body border-0">
          <template #title>
            <div class="d-flex justify-content-between align-items-center">
              <h6>Liste des quartiers</h6>
              <a-input-search v-model="value" placeholder="Recherche ici" style="width: 300px" @change="onSearch" />
            </div>
          </template>
          <a-table :columns="columnsQuartier" :data-source="dataQuartier">
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// Counter Widgets
import WidgetCounter from "../../components/Widgets/WidgetCounter";

const stats = [
  {
    title: "Pays actif",
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
    title: "Villes actives",
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
    title: "Quartiers actifs",
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

const stats_villes = [
  {
    title: "Carnets",
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
    title: "Collecteurs",
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
    title: "Sommes cotisés",
    value: 0,
    prefix: "",
    suffix: "Fcfa",
    icon: `<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
							<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
						</svg>`,
  },
  // {
  //   title: "Cotisation Encour Produit",
  //   value: 0,
  //   prefix: "",
  //   suffix: "Fcfa",
  //   icon: `<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
	// 						<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
	// 						<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
	// 						<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
	// 					</svg>`,
  // },
  // {
  //   title: "Cotisation Encour Epargne",
  //   value: 0,
  //   prefix: "",
  //   suffix: "Fcfa",
  //   icon: `<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
	// 						<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
	// 						<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
	// 						<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
	// 					</svg>`,
  // },
];

export default {
  components: {
    WidgetCounter,
  },

  beforeCreate() {
    this.form_pays = this.$form.createForm(this, { name: "normal_login" });
    this.form_ville = this.$form.createForm(this, { name: "normal_login" });
    this.form_quartier = this.$form.createForm(this, { name: "normal_login" });
  },
  data() {
    return {

      callback: process.env.VUE_APP_API_BASE_URL,
      namApp: process.env.VUE_APP_NAME,
      token_admin: null,
      stats,
      stats_villes,
      width: 500,
      columnsPays: [],
      dataPays: [],
      columnsVilles: [],
      dataVilles: [],
      columnsQuartier: [],
      dataQuartier: [],
      dataQuartier_s: [],
      buttonText: "Détail",
      visibleStat: false,
      visiblepays: false,
      visibleville: false,
      visiblequartier: false,
      confirmLoading: false,
      villes: [],
      ville_select: null,
      nbr_pays: 0,
    };
  },
  mounted() {
    this.columnsPays = [
      {
        title: "Date de creation",
        dataIndex: "created_at",
        key: "created_at",
      },
      {
        title: "Nom pays",
        dataIndex: "pays",
        key: "pays",
      },
    ];
    this.columnsVilles = [
      {
        title: "Date de creation",
        dataIndex: "created_at",
        key: "created_at",
      },
      {
        title: "Nom pays",
        dataIndex: "pays",
        key: "pays",
      },
      {
        title: "Nom ville",
        dataIndex: "ville",
        key: "ville",
      },
    ];
    this.columnsQuartier = [
      {
        title: "Date de creation",
        dataIndex: "created_at",
        key: "created_at",
      },
      {
        title: "Nom pays",
        dataIndex: "pays",
        key: "pays",
      },
      {
        title: "Nom villes",
        dataIndex: "ville",
        key: "ville",
      },
      {
        title: "Nom quartier",
        dataIndex: "quartier",
        key: "quartier",
      },
    ];

    this.listePays();
    this.listeVilles();
    this.listeQuartier();
  },

  methods: {
    showAlert(type, title, description) {
      this.$notification[type]({
        message: title,
        description: description,
      });
    },

    listePays() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http.post(`${this.callback}/pays/liste`, {}, headers).then(
        (response) => {
          let data = response.body.data;

          this.stats[0].value = data.length;
          this.nbr_pays = data.length;

          this.dataPays = data.map((item) => ({
            id: item.id,
            key: item.id,
            created_at: new Date(item.created_at).toLocaleString(),
            pays: item.libelle,
          }));
        },
        (response) => {
          this.showAlert("error", "Error", response.body.message);
        }
      );
    },

    listeVilles() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http.post(`${this.callback}/ville/liste`, {}, headers).then(
        (response) => {
          let data = response.body.data;

          console.log(data);
          this.stats[1].value = data.length;

          this.dataVilles = data.map((item) => ({
            id: item.id,
            key: item.id,
            created_at: new Date(item.created_at).toLocaleString(),
            pays: item.pays.libelle,
            ville: item.libelle,
            data: item.cotisationEnCours
          }));
        },
        (response) => {
          this.showAlert("error", "Error", response.body.message);
        }
      );
    },

    listeQuartier() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(`${this.callback}/quartier/liste?all=true`, {}, headers)
        .then(
          (response) => {
            let data = response.body.data;

            console.log(data);
            this.stats[2].value = data.length;

            for (let i = 0; i < data.length; i++) {
              this.dataQuartier.push({
                id: data[i].id,
                key: data[i].id,
                created_at: new Date(data[i].created_at).toLocaleString(),
                pays: data[i].ville.pays.libelle,
                ville: data[i].ville.libelle,
                quartier: data[i].libelle,
              })

              this.dataQuartier_s = this.dataQuartier;
            }

            console.log(this.dataQuartier)

          },
          (response) => {
            this.showAlert("error", "Error", response.body.message);
          }
        );
    },

    changePays(value) {
      let data = this.dataPays;

      for (let i = 0; i < data.length; i++) {
        if (data[i].id == value) {
          this.villes = data[i].children;
        }
      }
    },

    // visibleStat
    showModalStatistique() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      console.log(this.ville_select)

      this.$http.post(`${this.callback}/v2/ville/detail/${this.ville_select}`, {}, headers).then(
        (response) => {
          let data = response.body.extraParam;

          console.log(data)
          this.stats_villes[0].value = data.carnets;
          this.stats_villes[1].value = data.collecteurs;
          this.stats_villes[2].value = data.cotiser;
          // this.stats_villes[3].value = this.ville_select.data.produit;
          // this.stats_villes[4].value = this.ville_select.data.epargne;
          this.visibleStat = true;
        },
        (response) => {
          this.showAlert("error", "Error", response.body.message);
        }
      );
    },
    handleCancelStat(e) {
      this.visibleStat = false;
    },

    showModalPays() {
      this.visiblepays = true;
    },

    showModalVille() {
      this.visibleville = true;
    },

    showModalQuartier() {
      this.visiblequartier = true;
    },

    handleOkPays(e) {
      e.preventDefault();
      this.form_pays.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          this.confirmLoading = true;
          this.paysSubmit(values);
          setTimeout(() => {
            this.listePays();
            this.visiblepays = false;
            this.confirmLoading = false;
          }, 1000);
        } else {
          console.log("error");
        }
      });
    },

    handleCancelPays(e) {
      this.visiblepays = false;
    },

    paysSubmit(data) {
      let session = localStorage;
      this.token_admin = session.getItem("token");
      let headers = { headers: { Authorization: this.token_admin } };

      let data_create = {
        libelle: data.libelle,
      };

      this.$http
        .post(`${this.callback}/pays/create`, data_create, headers)
        .then(
          (response) => {
            if (response) {
              this.showAlert("success", "Success", "Pays creer avec success");
              this.form_pays.resetFields();
            }
          },
          (response) => {
            this.showAlert("error", "Error", response.body.message);
          }
        );
    },

    handleOkVille(e) {
      e.preventDefault();
      this.form_ville.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          this.confirmLoading = true;
          this.villeSubmit(values);
          setTimeout(() => {
            this.listeVilles();
            this.visibleville = false;
            this.confirmLoading = false;
          }, 1000);
        } else {
          console.log("error");
        }
      });
    },

    handleCancelVille(e) {
      this.visibleville = false;
    },

    villeSubmit(data) {
      let session = localStorage;
      this.token_admin = session.getItem("token");
      let headers = { headers: { Authorization: this.token_admin } };

      let data_create = {
        id_pays: data.id_pays,
        libelle: data.libelle,
      };

      this.$http
        .post(`${this.callback}/ville/create`, data_create, headers)
        .then(
          (response) => {
            if (response) {
              this.showAlert("success", "Success", "Ville creer avec success");
              this.form_ville.resetFields();
            }
          },
          (response) => {
            this.showAlert("error", "Error", response.body.message);
          }
        );
    },

    handleOkQuartier(e) {
      e.preventDefault();
      this.form_quartier.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          this.confirmLoading = true;
          this.quartierSubmit(values);
          setTimeout(() => {
            this.listeQuartier();
            this.visiblequartier = false;
            this.confirmLoading = false;
          }, 2000);
        } else {
          console.log("error");
        }
      });
    },

    handleCancelQuartier(e) {
      this.visiblequartier = false;
    },

    quartierSubmit(data) {
      let session = localStorage;
      this.token_admin = session.getItem("token");
      let headers = { headers: { Authorization: this.token_admin } };

      let data_create = {
        id_ville: data.id_ville,
        libelle: data.libelle,
      };

      this.$http
        .post(`${this.callback}/quartier/create`, data_create, headers)
        .then(
          (response) => {
            if (response) {
              this.showAlert(
                "success",
                "Success",
                "Quartier creer avec success"
              );
              this.form_quartier.resetFields();
            }
          },
          (response) => {
            this.showAlert(
              "error",
              "Error",
              "Libelle de quartier déjà utiliser"
            );
          }
        );
    },

    onSearch() {
      this.value = this.value.toLowerCase();

      let data = this.dataQuartier_s;

      this.dataQuartier = [];
      for (let i = 0; i < data.length; i++) {
        let libelle = data[i].quartier.toLowerCase();
        if (libelle.indexOf(this.value) > -1) {
          this.dataQuartier.push(data[i]);
        }
      }
    },
  },
};
</script>