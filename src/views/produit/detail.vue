<!-- 
	This is the billing page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>
    <a-row type="flex" :gutter="24">
      <!-- Billing Information Column -->
      <a-col :span="24" :md="16" class="mb-24">
        <a-card
          :bordered="false"
          class="header-solid h-full"
          :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }"
        >
          <div class="text-right mb-4">
            <a-button @click="$router.go(-1)">Retour</a-button>
          </div>
          <template #title>
            <h6 class="font-semibold m-0">Information du produit</h6>
          </template>
          <a-row :gutter="[24, 24]">
            <a-col :span="24">
              <a-card :bordered="false" class="card-billing-info">
                <div class="col-info">
                  <a-descriptions
                    :title="'Date de creation: ' + new Date(produit.created_at).toLocaleString()"
                    :column="2"
                  >
                    <a-descriptions-item label="Nom du produit">
                      {{ produit.libelle }}
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
                <h6 class="font-semibold m-0">Modification du produit</h6>
              </template>
              <a-row>
                <a-col :span="24" :md="24" class="mb-24">
                  <a-form
                    id="components-form-demo-normal-login"
                    :form="form"
                    class="login-form"
                    @submit="updateSubmit"
                    :hideRequiredMark="true"
                  >
                    <a-row type="flex" :gutter="24">
                      <!-- Billing Information Column -->
                      <a-col :span="12" :md="12" class="">
                        <a-form-item
                          class=""
                          label="Nom du produit"
                          :colon="false"
                        >
                          <a-input
                            v-decorator="[
                              'libelle',
                              {
                                initialValue: produit.libelle,
                                rules: [
                                  {
                                    required: true,
                                    message: 'Nom du produit est vide!',
                                  },
                                ],
                              },
                            ]"
                            type="text"
                            placeholder="Nom produit"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12" :md="12" class="">
                        <a-form-item
                          class=""
                          label="Code secret"
                          :colon="false"
                        >
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
                            type="number"
                            placeholder="Code secret"
                          />
                        </a-form-item>
                      </a-col>

                      <a-col :span="24" :md="24" class="mb-4 text-right">
                        <a-button
                          type="primary"
                          html-type="submit"
                          class="login-form-button"
                        >
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

export default {
  components: {
    CardCredit,
    WidgetSalary,
    CardPaymentMethods,
    CardInvoices,
    CardBillingInfo,
    CardTransactions,
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  data() {
    return {
      
      callback: process.env.VUE_APP_API_BASE_URL,
      namApp: process.env.VUE_APP_NAME,
      token_admin: null,
      produit: {},
    };
  },

  mounted() {
    this.detailProduit();
  },

  methods: {
    showAlert(type, title, description) {
      this.$notification[type]({
        message: title,
        description: description,
      });
    },

    detailProduit() {
      let session = localStorage;
      this.token_admin = session.getItem("token");

      let headers = { headers: { Authorization: this.token_admin } };

      this.$http.post(`${this.callback}/produit/list`, {}, headers).then(
        (response) => {
          let data = response.body.data;
          for (let i = data.length - 1; i >= 0; i--) {
            if ((data[i].id == this.$route.params.id)) {
              console.log(data[i])
              this.produit = {
                key: data[i].id,
                created_at: new Date(data[i].created_at).toLocaleString(),
                libelle: data[i].libelle,
              };

              break;
            }
          }
        },
        (response) => {
          this.showAlert("error", "Error", response.body.message);
        }
      );
    },

    updateSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.code_secret == localStorage.getItem("code_secret")) {
            let session = localStorage;
            this.token_admin = session.getItem("token");
            let headers = { headers: { Authorization: this.token_admin } };

            const data = { libelle: values.libelle };

            this.$http
              .post(`${this.callback}/produit/update/${this.$route.params.id}`, data, headers)
              .then(
                (response) => {
                  console.log(response)
                  if (response) {
                    this.detailProduit();
                    this.showAlert('success', 'Success', "Modification de produit effectuer avec success");
                  }
                },
                (response) => {
                  if (response) {
                    this.showAlert('error', 'Erreur', "Erreur lors de la modification")
                  }
                }
              );
          } else {
            this.showAlert("error", "Erreur", "Code secret incorrect");
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
</style>