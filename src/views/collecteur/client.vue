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
      <a-col :span="12" :lg="12" :xl="24" class="mb-24 text-right">
        <a-button class="mx-2" @click="$router.go(-1)">Retour</a-button>
      </a-col>
      <a-col :span="12" :lg="12" :xl="24" class="mb-24">
        <template>
          <h6 class="font-semibold m-0">
            Affecter client a un autre collecteur
          </h6>
        </template>
        <a-form layout="inline" id="components-form-demo-normal-login" :form="form" class="login-form mt-4"
          @submit="handleSubmit" :hideRequiredMark="true">
          <a-form-item label="Selectionnez le collecteur">
            <a-select style="width: 120px" v-decorator="[
              'collecteur',
              {
                rules: [
                  {
                    required: true,
                    message: 'Collecteur incorrect!',
                  },
                ],
              },
            ]">
              <a-select-option :value="item.id" v-for="item in collecteurs" :key="item.id">
                {{ item.nom }} {{ item.prenom }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item class="" label="Code secret" :colon="false">
            <a-input v-decorator="[
              'code_secret',
              {
                rules: [
                  {
                    required: true,
                    message: 'Code secret incorrect!',
                  },
                ],
              },
            ]" type="text" placeholder="Code secret" />
          </a-form-item>

          <a-form-item class="" :colon="false">
            <a-button type="primary" html-type="submit" class="login-form-button">
              Affecter
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>

      <a-col :span="12" :lg="12" :xl="24" class="mb-24">
        <a-card class="card card-body border-0">
          <a-table :columns="columns" :data-source="data" :row-selection="rowSelection"
            :expanded-row-keys.sync="expandedRowKeys">
            <template slot="operation" slot-scope="text, record">
              <router-link :to="{ name: 'Client_detail', params: { id: record.key } }">
                <a-button type="primary" size="small">Détail</a-button>
              </router-link>
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

const stats = [
  {
    title: "Nombre de clients",
    value: 53,
    prefix: "",
    suffix: "",
    icon: `<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z" fill="#111827"/>
							<path d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z" fill="#111827"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z" fill="#111827"/>
						</svg>`,
  },
];

export default {
  components: {
    WidgetCounter,
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "check form" });
  },
  data() {
    return {
      
      callback: process.env.VUE_APP_API_BASE_URL,
      namApp: process.env.VUE_APP_NAME,
      token_admin: null,
      stats,
      columns: null,
      data: null,
      buttonText: "Détail",
      rowSelection: {},
      expandedRowKeys: [],
      selected: null,
      collecteurs: null,
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
        title: "Quartier",
        dataIndex: "quartier",
        key: "quartier",
      },
      {
        title: "Collecteur en charge",
        dataIndex: "collecteur",
        key: "collecteur",
      },
      {
        title: "Action",
        key: "Action",
        scopedSlots: { customRender: "operation" },
      },
    ];

    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.selected = selectedRowKeys;
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };

    this.listeClient();
    this.listeCollecteur();
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
          `${this.callback}/agent_collecteur/client/${this.$route.params.id}`,
          {},
          headers
        )
        .then(
          (response) => {
            let data = response.body.data;

            this.stats[0].value = data.length;
            this.data = [];

            console.log(this.data)

            for (let i = data.length-1; i >=0; i--) {
              this.data.push({
                key: data[i].id,
                created_at: new Date(data[i].created_at).toLocaleString(),
                nom: data[i].nom,
                numero: data[i].numero,
                profession: data[i].profession,
                quartier: data[i].quartier,
                collecteur: data[i].collecteur,
              });
            }
          },
          (response) => {
            flash(response.body.message, "Erreur", "fa fa-times", "danger");
          }
        );
    },

    listeCollecteur() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(`${this.callback}/agent_collecteur/list?all=true`, {}, headers)
        .then((response) => {
          let data = response.body.data;
          this.collecteurs = []
          data.forEach(item => {
            if (item.id != this.$route.params.id) {
              this.collecteurs.push(item)
            }
          });
        });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.code_secret == localStorage.getItem("code_secret")) {
            console.log(this.selected);
            console.log(values);

            let session = localStorage;
            this.token_admin = session.getItem("token");

            let headers = { headers: { Authorization: this.token_admin } };
            let val = {
              clients: this.selected,
              id_collecteur: values.collecteur,
            };

            this.$http
              .post(
                `${this.callback}/affectation/client/collecteur`,
                val,
                headers
              )
              .then((response) => {
                let data = response.body;

                console.log(data);
                if (data.status == true) {
                  this.showAlert(
                    "success",
                    "Success",
                    "Affectation effectuer avec success!"
                  );
                  this.listeClient()
                  this.form.resetFields()
                }
              });
          } else {
            this.showAlert("error", "Erreur", "Code secret incorrect!");
          }
        } else {
          console.log("error");
        }
      });
    },
  },
};
</script>