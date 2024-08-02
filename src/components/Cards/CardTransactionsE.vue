<template>
  <!-- Your Transactions Card -->
  <a-card
    :bordered="false"
    class="header-solid h-full"
    :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }"
  >
    <template #title>
      <h6 class="font-semibold m-0">Liste des carnets epargnes</h6>
    </template>
    <a-list
      class="transactions-list"
      item-layout="horizontal"
      :split="false"
      :data-source="data"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <template>
          <a-list-item-meta :title="item.title" :description="item.description">
            <a-avatar
              size="small"
              v-if="item.type == 1"
              slot="avatar"
              style="background-color: #edf9e7"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="fill-success"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 3C10.5523 3 11 3.44772 11 4V9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11H4C3.44772 11 3 10.5523 3 10C3 9.44771 3.44772 9 4 9L9 9V4C9 3.44772 9.44772 3 10 3Z"
                />
              </svg>
            </a-avatar>
            <a-avatar
              size="small"
              v-if="item.type == 0"
              slot="avatar"
              style="background-color: #fffce7"
            >
              <strong class="text-warning"> ! </strong>
            </a-avatar>
            <a-avatar
              size="small"
              v-if="item.type == -1"
              slot="avatar"
              style="background-color: #fee9ea"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="fill-danger"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5 10C5 9.44772 5.44772 9 6 9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11L6 11C5.44772 11 5 10.5523 5 10Z"
                />
              </svg>
            </a-avatar>
          </a-list-item-meta>
          <div>
            <div class="amount">
              <span v-if="item.type == 1" class="text-success">
                {{ item.amount }} Fcfa
              </span>
              <span v-if="item.type == 0" class="text-warning">
                {{ item.amount }} Fcfa
              </span>
              <span v-if="item.type == -1" class="text-danger">
                {{ item.amount }} Fcfa
              </span>
            </div>

            <a-button size="small" @click="showModal(item)">Detail</a-button>
          </div>
        </template>
      </a-list-item>
    </a-list>

    <a-modal
      :visible="visible_m"
      width="1000px"
      title="Liste des cotisations"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-table :columns="columns" :data-source="data_f"></a-table>
    </a-modal>
  </a-card>
  <!-- / Your Transactions Card -->
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      callback: process.env.VUE_APP_API_BASE_URL,
      token_admin: null,
      motif: null,
      visible: false,
      id: null,
      status: false,
      visible_m: false,
      columns: [],
      data_f: [],
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
        title: "Nombre cotisé",
        dataIndex: "nbr",
        key: "nbr",
      },
      {
        title: "Mise unitaire",
        dataIndex: "mise",
        key: "mise",
      },
      {
        title: "Total cotisation",
        dataIndex: "total",
        key: "total",
      },
    ];
  },
  methods: {
    showAlert(type, title, description) {
      this.$notification[type]({
        message: title,
        description: description,
      });
    },

    confirm(id) {
      this.id = id;

      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(
          `${this.callback}/cotisation/delete/last-info/${this.id}`,
          {},
          headers
        )
        .then(
          (response) => {
            if (response) {
              this.status = response.body.status;
              if (this.status == false) {
                this.showAlert("warning", "Warning", response.body.message);
              }
              this.visible = true;
            }
          },
          (response) => {
            this.showAlert("error", "Erreur", response.body.message);
          }
        );
    },

    cancel(e) {
      console.log(e);
    },

    resetForm() {
      this.form.resetFields();
      this.visible = false;
    },

    onSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let session = localStorage;
          this.token_admin = session.getItem("token");

          let headers = { headers: { Authorization: this.token_admin } };

          this.$http
            .post(
              `${this.callback}/carnet/exemplaire/change/state/${this.id}`,
              values,
              headers
            )
            .then(
              (response) => {
                if (response) {
                  this.showAlert(
                    "success",
                    "Success",
                    "Operation effectuer avec success"
                  );
                }
              },
              (response) => {
                this.showAlert("error", "Erreur", response.body.message);
              }
            );
        } else {
          this.showAlert("error", "Erreur", "Veillez mettre la motif");
        }
      });
    },

    delete_cotisation() {
      let session = localStorage;
      this.token_admin = session.getItem("token");
      let headers = { headers: { Authorization: this.token_admin } };

      this.$http
        .post(`${this.callback}/cotisation/delete/last/${this.id}`, {}, headers)
        .then(
          (response) => {
            if (response.body.status == true) {
              this.showAlert("success", "Success", response.body.message);
            } else {
              this.showAlert("error", "Erreur", response.body.message);
            }
          },
          (response) => {
            this.showAlert("error", "Erreur", response.body.message);
          }
        );
    },

    showModal(data) {
      let d = data.cotisations;
      this.data_f = [];
      for (let i = d.length - 1; i >= 0; i--) {
        console.log(d[i]);
        this.data_f.push({
          created_at: d[i].date_cotisation,
          nbr: d[i].nb,
          mise: `${d[i].mise} Fcfa`,
          total: `${d[i].mise * d[i].nb} Fcfa`,
        });
      }
      this.visible_m = true;
    },

    handleOk() {
      console.log("fermer");
      this.visible_m = false;
    },

    handleCancel(e) {
      this.visible_m = false;
    },
  },
};
</script>