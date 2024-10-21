<template>
  <q-page class="">
    <div class="title">
      <h4 class="text-center q-bold" style="position: relative">
        Update Password
      </h4>
    </div>
    <div class="q-ma-lg">
      <div class="justify-center items-center">
        <q-form ref="resetFormPage">
          <q-input
            class="q-mt-sm"
            type="password"
            outlined
            v-model="resetForm.newPassword"
            label="New Password"
            :rules="[
              (val) => (val && val.length > 0) || 'new password is required',
            ]"
            style="width: 40%"
          />

          <q-input
            class="q-mt-sm"
            type="password"
            outlined
            style="width: 40%"
            v-model="resetForm.confirmPassword"
            label="Confirm Password"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'confirm password is required',
            ]"
          />
          <div>
            <q-btn
              label="Update Password"
              color="primary"
              class="q-mt-sm flex justify-center"
              style="width: 40%; padding: 10px"
              @click="onResetPassword"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { Notify } from "quasar";
import { mapActions } from "vuex";

export default {
  name: "resetPassword",
  data() {
    return {
      resetForm: {
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    ...mapActions("reports", ["updateUserPassword"]),
    async onResetPassword() {
      const validate = await this.$refs.resetFormPage.validate();
      if (validate) {
        let user = JSON.parse(localStorage.getItem("userDetails"));
        let userResetData = { ...user, ...this.resetForm };
        if (this.resetForm.newPassword === this.resetForm.confirmPassword) {
          this.updateUserPassword(userResetData);
        } else {
          Notify.create({
            message: "new password is not matching with confirm password",
            color: "negative",
            timeout: 2000,
            position: "top",
            actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
          });
        }
      } else {
        Notify.create({
          message: "Please fill the form properly",
          color: "negative",
          timeout: 2000,
          position: "top",
          actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
        });
      }
    },
  },
};
</script>

<style scoped>
.reset-container {
  width: 40%;
}
</style>
