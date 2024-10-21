<template>
    <q-page style="min-height: 948px;">
        <div class="container">
            <div v-show="dialog1">
            <div class="title">
                <h4 class="text-center q-bold">Settings</h4>
            </div>
            <div class="userInfoSettings"  >
                <div class="UserInfoItemSettings" style="margin-top:0px;">
                    <!-- <span class="QItemSettings">Update Password :<span class="AItemSettings" @click="onClickReset()">Click Here</span></span> -->
                    <span class="QItemSettings">Reset password :</span><span class="AItemSettings" @click="onClickReset()">Click Here</span>
                </div>
            </div>
        </div>


            <div v-show="dialog2">
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
              @click="onResetPassword()"
            />
          </div>
        </q-form>
      </div>
    </div>
</div>
        </div>


    </q-page>
</template>
<script>
import { mapActions } from 'vuex';

export default {
    name:"Settings",
    data(){
    return {
        dialog1:true,
        dialog2:false,
        resetForm:{
            newPassword:'',
            confirmPassword:'',
        }
    }

},
methods:{
    ...mapActions("reports", ["updateUserPassword"]),

     onClickReset(){
this.dialog2=true;
this.dialog1=false;
    },
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
}
}
</script>
<style>
.userInfoSettings {
    background-color: #027373;
    margin: 14px;
    padding: 18px 24px 18px 24px;
    border-radius:10px;
    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.UserInfoItemSettings {
    display: flex;
    justify-content: space-around;
    background-color: #F2E7DC;
    padding: 15px;
    border-radius:10px;
    margin-top: 15px;
    font-size: 18px;
    color: #2D3E40;
    font-weight: 600;
}
.QItemSettings {
    width:348px;
}
.AItemSettings {
    width:348px;
    padding-left: 100px;
}
</style>