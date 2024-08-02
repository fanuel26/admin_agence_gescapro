<!-- 
	This is the dashboard page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>
    <div>
      <!-- Counter Widgets -->
      <a-row :gutter="24">
        <a-col :xs="24" :sm="24" :md="12" :lg="8" class="mb-24" v-for="(stat, index) in stats" :key="index">
          <!-- Widget 1 Card -->
          <WidgetCounter :title="stat.title" :value="stat.value" :prefix="stat.prefix" :suffix="stat.suffix"
            :icon="stat.icon" :status="stat.status"></WidgetCounter>
          <!-- / Widget 1 Card -->
        </a-col>
      </a-row>
      <!-- / Counter Widgets -->
    </div>

    
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
  data() {
    return {
      callback: process.env.VUE_APP_API_BASE_URL,
      namApp: process.env.VUE_APP_NAME,
      token_admin: null,
      dataCollecteur: [],
      columnCollecteur: null,
      dataCollecteur_c: [],
      columnCollecteur_c: [],
      dataCollecteur_cli: [],
      dataCollecteur_vente_jour: [],
      columnCollecteur_cli: null,
      columnsCarnet: null,
      dataCarnets: [],
      ville: null,
      agence: null,
      villes: [],
      Agences: [],
      dataCarnetsVilles: [],
      dataCarnetsAgences: [],
      dataCarnet: [],
      stats: [],
      width: 500,
      timelineReverse: false,
      type: null,
      i: 0,
      dataC: 0,
      dataCollecteur_inactif: [],
      dataCollecteur_actif: [],
      nb_dataCollecteur_inactif: 0,
      nb_dataCollecteur_actif: 0,
      somme_deverse: 0,
      confirmLoading: false,
      load: false,
      loader: false,
      load_m: false,
      visible: false
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

    this.columnCollecteur = [
      {
        title: "Nom",
        dataIndex: "nom",
        key: "nom",
      },
      {
        title: "Numéro de téléphone",
        dataIndex: "numero",
        key: "numero",
      },
      {
        title: "Somme collectée (Fcfa)",
        dataIndex: "somme",
        key: "somme",
        scopedSlots: { customRender: "action" },
      },
      {
        title: "Agence",
        dataIndex: "agence",
        key: "agence",
      },
    ];

    this.columnCollecteur_c = [
      {
        title: "Nom",
        dataIndex: "nom",
        key: "nom",
      },
      {
        title: "Numéro de téléphone",
        dataIndex: "numero",
        key: "numero",
      },
      {
        title: "Carnet vendus",
        dataIndex: "carnet_vendu",
        key: "carnet_vendu",

        scopedSlots: { customRender: "action" },
      },
      {
        title: "Agence",
        dataIndex: "agence",
        key: "agence",
      },
    ];

    this.columnCollecteur_cli = [
      {
        title: "Nom",
        dataIndex: "nom",
        key: "nom",
      },
      {
        title: "Numéro de téléphone",
        dataIndex: "numero",
        key: "numero",
      },
      {
        title: "Nombre clients",
        dataIndex: "client",
        key: "client",

        scopedSlots: { customRender: "action" },
      },
      {
        title: "Agence",
        dataIndex: "agence",
        key: "agence",
      },
    ];

    this.stats = [
      {
        title: "Total clients produit",
        value: 0,
        prefix: "",
        suffix: "",
        icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
							<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
						</svg>`,
      },
      {
        title: "Total clients epargne",
        value: 0,
        prefix: "",
        suffix: "",
        icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
							<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
						</svg>`,
      },
      {
        title: "Nombre de client total",
        value: 0,
        prefix: "",
        suffix: "",
        icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z" fill="#111827"/>
							<path d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z" fill="#111827"/>
							<path d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z" fill="#111827"/>
							<path d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z" fill="#111827"/>
						</svg>`,
      },
      /*{
        title: "Agent collecteur",
        value: 0,
        suffix: "",
        icon: `
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z" fill="#111827"/>
              <path d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z" fill="#111827"/>
              <path d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z" fill="#111827"/>
              <path d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z" fill="#111827"/>
            </svg>`,
      },
      {
        title: "Agences créés",
        value: 0,
        prefix: "",
        status: "danger",
        suffix: "",
        icon: `
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z" fill="#111827"/>
          %	</svg>`,
      },*/
      {
        title: "Nombre de carnets produit vendus",
        value: 0,
        prefix: "",
        suffix: "",
        icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
						</svg>`,
      },
      {
        title: "Nombre de carnets epargne vendus",
        value: 0,
        prefix: "",
        suffix: "",
        icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
						</svg>`,
      },
      // {
      //   title: "livraison dans 2 mois",
      //   value: 0,
      //   prefix: "",
      //   status: "danger",
      //   suffix: "",
      //   icon: `
      // 			<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      // 				<path fill-rule="evenodd" clip-rule="evenodd" d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z" fill="#111827"/>
      // 		%	</svg>`,
      // },
      // {
      //   title: "Collectes global épargnes du jour",
      //   value: 0,
      //   prefix: "",
      //   suffix: "Fcfa",
      //   icon: `
      // 			<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      // 				<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
      // 			</svg>`,
      // },
      // {
      //   title: "Collectes global produits du jour",
      //   value: 0,
      //   prefix: "",
      //   suffix: "Fcfa",
      //   icon: `
      // 			<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      // 				<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
      // 			</svg>`,
      // },
      {
        title: "Cumule total de cotisations produits",
        value: 0,
        prefix: "",
        suffix: "Fcfa",
        icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
						</svg>`,
      },
      {
        title: "Cumule total de cotisations épargnes",
        value: 0,
        prefix: "",
        suffix: "Fcfa",
        icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
						</svg>`,
      },
      {
        title: "Deversement global du jour",
        value: 0,
        prefix: "",
        suffix: "Fcfa",
        icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
						</svg>`,
      },
      {
        title: "Deversement global",
        value: 0,
        prefix: "",
        suffix: "Fcfa",
        icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
						</svg>`,
      },
      {
        title: "Collectes globale en cours",
        value: 0,
        prefix: "",
        suffix: "Fcfa",
        icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
						</svg>`,
      },
      {
        title: "Cotisation unique du jour",
        value: 0,
        prefix: "",
        suffix: "",
        icon: `
      			<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      				<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
      			</svg>`,
      },
      // {},
      {
        title: "Sold carnet suspendus",
        value: 0,
        prefix: "",
        suffix: "Fcfa",
        icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
						</svg>`,
      },
      {
        title: "Nombre carnet suspendus",
        value: 0,
        prefix: "",
        suffix: "",
        icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
						</svg>`,
      },
      {
        title: "Carnet vendu du jour",
        value: 0,
        prefix: "",
        suffix: "",
        icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
						</svg>`,
      },
      // {
      //   title: "Nombre Total carnet vendus par jour",
      //   value: 0,
      //   prefix: "",
      //   suffix: "",
      //   icon: `
      // 			<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      // 				<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
      // 			</svg>`,
      // },
      {
        title: "Cotisation unique globale",
        value: 0,
        prefix: "",
        suffix: "",
        icon: `
						<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z" fill="#111827"/>
						</svg>`,
      },
    ];

    this.statistique();
    // this.listeCollecteur();
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

    listeAgence() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http.post(`${this.callback}/agence/list?all=true`, {}, headers).then(
        (response) => {
          let data = response.body.data;

          console.log(data)

          this.Agences = data

          this.iAgence = 0
          // this.launchAgenceClassement(this.iAgence, data)

          setTimeout(() => {
            console.log(this.Agences)
          }, 10000);
        },
        (response) => {
          this.showAlert("error", "Error", response.body.message);
        }
      );
    },

    launchAgenceClassement(id, data) {

      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };
      console.log(data)
      this.$http.post(`${this.callback}/agence/${data[id].id}/collecteur`,
        {},
        headers
      )
        .then(
          (response) => {
            let dt = response.body.data;
            this.getSomDeversionOfListColelcteur(dt, id, data.length, data)


          },
          (response) => {
            this.showAlert("error", "Erreur", response.body.message);
          }
        );
    },

    getSomDeversionOfListColelcteur(data, id, nbrFinal, dataAgence) {
      this.Agences[id].totalDevers = 0
      for (let i = 0; i < data.length; i++) {
        this.Agences[id].totalDevers += data[i].total_cotisation
      }
      if (id < nbrFinal) {
        setTimeout(() => {
          console.log(this.Agences[id])
          this.iAgence += 1
          this.launchAgenceClassement(this.iAgence, dataAgence)
        }, 100);
      }
    },


    statistique() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(`${this.callback}/statistique`, {}, headers)
        .then((response) => {
          let data = response.body;

          console.log(data)

          this.stats[0].value = data.client_produit;
          this.stats[1].value = data.client_epargne;
          this.stats[2].value = data.client_all;
          // this.stats[3].value = data.agent_collecteur
          // this.stats[4].value = data.agence
          this.stats[3].value = data.carnetProduit;
          this.stats[4].value = data.carnetEpargne;
          //this.stats[5].value = 0;
          // this.stats[6].value = data.collecte;
          // this.stats[7].value = data.collecte;
          this.stats[5].value = data.totalProduit;
          this.stats[6].value = data.totalEpargne;
          this.stats[7].value = data.totalDeversementJournalier;
          this.stats[8].value = data.totalDeversement;
          this.stats[9].value = data.cotisationNonDeverse;
          // this.stats[14].value = data.totalCarnetJour;
          this.stats[14].value = data.totalCollecte;
        });

      this.$http
        .post(`${this.callback}/v2-upgrade/type_carnet/gain_global`, {}, headers)
        .then((response) => {
          let data = response.body;

          console.log(data)

          // this.stats[10].value = data.data;
        });
      // 

      this.$http
        .post(`${this.callback}/v2-upgrade/type_carnet/vendu/journaliere`, {}, headers)
        .then((response) => {
          let data = response.body;

          console.log(data)

          this.stats[13].value = data.data;
        });


      this.$http
        .post(`${this.callback}/v2-upgrade/carnet/supendu/stat`, {}, headers)
        .then((response) => {
          let data = response.body.data;

          console.log(data)

          this.stats[12].value = data.count;
          this.stats[11].value = data.amount;
        });

      this.$http
        .post(`${this.callback}/carnet-clients`, {}, headers)
        .then((response) => {
          let data = response.body.data;
          // this.stats[5].value = data.length;

          console.log(data)

          this.dataCarnets = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].nbcotisattion > 31 * 12 - 62) {
              this.dataCarnets.push({
                key: data[i].id,
                libelle: data[i].carnet?.libelle,
                nbr_mois: data[i].carnet?.period / 31,
                prix_jour: data[i].carnet?.tarif,
                nbr_cot: data[i].nbcotisattion,
                nom_client: `${data[i].client.nom} ${data[i].client.prenom}`,
                numero_client: data[i].client.numero,
              });
            }
          }

          console.log(this.dataCarnets);
        });
    },

    listeCarnet(id) {
      // alert(id)
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };


      this.$http
        .post(`${this.callback}/classement/carnet/ville/${id}`, {}, headers)
        .then((response) => {
          let data = response.body.data;
          // this.stats[5].value = data.length;

          console.log(data)
          this.dataCarnetsVilles = [];
          for (let i = 0; i < 10; i++) {
            if (data[i]) {
              this.dataCarnetsVilles.push(data[i]);
              this.dataCarnetsVilles = this.dataCarnetsVilles.filter(value => value.vendu > 0 ? value : null)
            }
          }
        });
    },

    listeCarnetAgence(id) {
      console.log(id)
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };


      this.$http
        .post(`${this.callback}/classement/carnet/agence/${id}`, {}, headers)
        .then((response) => {
          let data = response.body.data;
          // this.stats[5].value = data.length;

          console.log(data)
          this.dataCarnetsAgences = [];
          for (let i = 0; i < 10; i++) {
            if (data[i]) {
              this.dataCarnetsAgences.push(data[i]);
            }
          }
        });
    },

    classementCollecteur() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(`${this.callback}/classement/collecteur?all=true`, {}, headers)
        .then((response) => {
          let data = response.body.data;

          console.log(data);
          this.dataCollecteur = [];
          this.dataCollecteur_c = [];
          this.dataCollecteur_cli = [];
          this.dataCollecteur_vente_jour = [];
          for (let i = 0; i < data.length; i++) {
            this.dataCollecteur.push({
              key: data[i].id,
              nom: `${data[i].nom} ${data[i].prenom}`,
              numero: data[i].numero,
              frais: data[i].compte_agent_collecteur + data[i].total_cotisation,
              somme: `${data[i].compte_agent_collecteur + data[i].total_cotisation
                }`,
              agence: data[i].agc_name,
              carnet_vendu: data[i].carnet_vendu,
              client: data[i].nbr_cli,
            });

            this.dataCollecteur_c.push({
              key: data[i].id,
              nom: `${data[i].nom} ${data[i].prenom}`,
              numero: data[i].numero,
              frais: data[i].compte_agent_collecteur + data[i].total_cotisation,
              somme: `${data[i].compte_agent_collecteur + data[i].total_cotisation
                }`,
              agence: data[i].agc_name,
              carnet_vendu: data[i].carnet_vendu,
              client: data[i].nbr_cli,
            });

            this.dataCollecteur_cli.push({
              key: data[i].id,
              nom: `${data[i].nom} ${data[i].prenom}`,
              numero: data[i].numero,
              frais: data[i].compte_agent_collecteur + data[i].total_cotisation,
              somme: `${data[i].compte_agent_collecteur + data[i].total_cotisation
                }`,
              agence: data[i].agc_name,
              carnet_vendu: data[i].carnet_vendu,
              client: data[i].nbr_cli,
            });


            this.dataCollecteur_vente_jour.push({
              key: data[i].id,
              nom: `${data[i].nom} ${data[i].prenom}`,
              numero: data[i].numero,
              frais: data[i].compte_agent_collecteur + data[i].total_cotisation,
              somme: `${data[i].compte_agent_collecteur + data[i].total_cotisation
                }`,
              agence: data[i].agc_name,
              carnet_vendu_jour: data[i].carnet_vendu_jour,
              client: data[i].nbr_cli,
            });

            // console.log(this.dataCollecteur_vente_jour)
          }

          this.dataCollecteur.sort(function (a, b) {
            return b.frais - a.frais;
          });

          this.dataCollecteur_c.sort(function (a, b) {
            return b.carnet_vendu - a.carnet_vendu;
          });

          console.log(this.dataCollecteur_cli);

          this.dataCollecteur_cli.sort(function (a, b) {
            return b.client - a.client;
          });

          this.dataCollecteur_vente_jour = this.dataCollecteur_vente_jour.filter(value => value.carnet_vendu_jour > 0)
          this.dataCollecteur_vente_jour.sort(function (a, b) {
            return b.carnet_vendu_jour - a.carnet_vendu_jour;
          });

          this.dataCollecteur_vente_jour = this.dataCollecteur_vente_jour.slice(0, 10)

          console.log(this.dataCollecteur_vente_jour)
        });
    },

    classementCarnet() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(`${this.callback}/classement/carnet?all=true`, {}, headers)
        .then((response) => {
          let data = response.body.data;

          console.log(data);
          this.dataCarnet = [];
          for (let i = 0; i < 10; i++) {
            if (data[i]) {
              this.dataCarnet.push(data[i]);
            }
          }
        });
    },

    listeCollecteur() {
      this.loader = true
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(`${this.callback}/agent_collecteur/list?all=true`, {}, headers)
        .then(
          (response) => {
            let data = response.body.data;

            console.log(data);

            this.dataC = data
            console.log(this.dataC.length)
            if (this.dataC.length != 0) {
              this.getValueCollecteur(this.dataC[this.i].id)
            } else {
              this.loader = false
            }

          },
          (response) => {
            this.showAlert("error", "Erreur", response.body.message);
          }
        );
    },

    relanchCollecter() {
      if (this.i < this.dataC.length - 1) {
        this.i += 1
        console.log(this.i)
        setTimeout(() => {
          this.getValueCollecteur(this.dataC[this.i].id)
        }, 2000);
      } else {
        console.log('coooool')
        console.log(this.dataC)
        this.dataCollecteur_inactif = this.dataC.filter(value => parseInt(value.collecte_journalier) == 0 ? value : null);
        this.dataCollecteur_actif = this.dataC.filter(value => parseInt(value.collecte_journalier) > 0 ? value : null);
        if (this.dataCollecteur_actif.length != 0) {
          this.dataCollecteur_actif.sort(function (a, b) {
            return b.collecte_journalier - a.collecte_journalier;
          })
        }
        this.nb_dataCollecteur_inactif = this.dataCollecteur_inactif.length
        this.nb_dataCollecteur_actif = this.dataCollecteur_actif.length
        if (this.dataCollecteur_actif.length != 0) {
          let nbrC = this.dataCollecteur_actif.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.collecte_journalier), 0)
          console.log(nbrC)
          this.stats[10].value = nbrC;
        }
        this.loader = false
        console.log(this.loader)
      }
    },


    getValueCollecteur(id) {
      console.log(id)
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(
          `${this.callback}/agent_collecteur/info/${id}`,
          {},
          headers
        )
        .then(
          (response) => {
            let data = response.body.data;
            console.log(data);
            this.dataC[this.i].collecte_journalier = data.collecte_journalier
            this.dataC[this.i].collecte_encour = data.compte_epargne + data.compte_produit
            this.relanchCollecter()
          },
          (response) => {
            this.showAlert("error", "Erreur", response.body.message);
          }
        );

      return null
    },


    showModal(idAgence) {
      this.load_m = true;
      this.visible = true;
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http.post(`${this.callback}/transaction/agence/${idAgence}/0`, {}, headers).then(
        (response) => {
          let data = response.body.data;
          console.log(data)
          this.somme_deverse = 0
          for (let i = 0; i < data.length; i++) {
            let date_list = new Date(data[i].created_at)
            let date = new Date()
            if (date_list.getDate() == date.getDate() && date_list.getMonth() == date.getMonth() && date_list.getFullYear() == date.getFullYear()) {
              console.log(" ------- date --------------------")
              console.log(date_list)
              console.log(date_list.getDate() + "/" + date_list.getMonth() + "/" + date_list.getFullYear())
              console.log(date)
              console.log(date.getDate() + "/" + date_list.getMonth() + "/" + date_list.getFullYear())
              console.log(" ------- date --------------------")
              this.somme_deverse += data[i].montant
            }
          }
          setTimeout(() => {
            this.load_m = false
          }, 1000);
        },
        (response) => {
          this.showAlert("error", "Erreur", response.body.message);
        }
      );
    },


    handleOk(e) {
      this.visible = false;
    },

    handleCancel(e) {
      this.visible = false;
    },

  },
};
</script>
