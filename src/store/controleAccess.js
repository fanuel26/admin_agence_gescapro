import { defineStore } from 'pinia';


export const useValidationStore = defineStore({
    id: 'validations',
    state: () => ({
        validateEmail: { email: "" },
    }),
    getters: {
    },
    actions: {
        emptyObjectValues(obj) {
            const newObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newObj[key] = "";
                }
            }
            return newObj;
        },

        getAttrValue() {
            let session = localStorage;
            this.token_admin = session.getItem("token");

            let headers = { headers: { Authorization: this.token_admin } };

            this.$http.post(`${this.callback}/liste`, {}, headers).then(
                (response) => {
                    console.log(response.data)
                })
        },

        loginValidate(data) {

        }

    },
})
