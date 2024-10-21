<template>
  <q-layout>
    <q-page-container
      name="LoginContainer"
      class="window-height window-width row justify-center items-center"
      style="background-color: #98eecc"
    >

      <div class="LoginContainer">
        <div class="main-container">
          <div class="companyLogo flex flex-center">
            <q-img
              src="..//..//assets/images/logo.png"
              style="width: 180px; height: auto"
            />
          </div>
          <div class="app-name">
            <p>Mill operations</p>
          </div>
          <q-form @submit.prevent="LoginDetailsOnSubmit">
            <div class="inputs-lg-frm">
              <q-input
                class="q-mt-sm"
                style="margin-bottom: -10px"
                outlined
                v-model="Username"
                label="Username"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'please enter username',
                ]"
              />
              <q-input
                class="q-mt-sm"
                type="password"
                outlined
                v-model="Password"
                label="Password"
                :rules="[
                  (val) => (val && val.length > 0) || 'please enter password',
                ]"
              />
              <div class="forget-pwd">Forget password ? click here</div>
              <q-btn
                label="Login"
                type="submit"
                color="primary"
                class="q-mt-sm"
                style="width: 100%; padding: 10px"
              />
            </div>
          </q-form>
          <div class="subtag">
            &copy; Designed and developed by SEDOTS Info Technologies (P) Ltd.
            <a target="_blank" href="https://sedots.com/">
              <q-img
                src="https://sedots.com/img/top-logo.png"
                style="width: 100px; height: auto"
                class="q-ml-md"
              />
            </a>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script>
import { Loading, Notify, QSpinnerHourglass } from "quasar";
import axios from "axios";
import Cookies from "js-cookie";


import { mapState } from "vuex";
import { mapActions } from "vuex";
import ApiEndPoint from "src/boot/axios";
import AboutApp from "../AboutApp.vue";

export default {
  name: "LoginPage",
  data() {
    return {
      Username: "",
      Password: "",
    };
  },
  computed: {
    ...mapState("milloperations", [
      "IsLoggedIn",
      "emp_code",
      "emp_name",
      "user_name",
      "app_type",
      "state_name",
      "state_code",
      "plant_code",
      "plant_name",
      "cluster_code",
      "cluster_name",
    ]),
  },
  mounted() {
    // this.initDB();
  },
  methods: {
    ...mapActions("milloperations", ["UpdateLoginState"]),
    ...mapActions("milloperations", ["UpdateEmpCodeState"]),
    ...mapActions("milloperations", ["UpdateEmpNameState"]),
    ...mapActions("milloperations", ["UpdateUsernameState"]),
    ...mapActions("milloperations", ["UpdateAppTypeState"]),
    ...mapActions("milloperations", ["UpdateStateNameState"]),
    ...mapActions("milloperations", ["UpdateStateCodeState"]),
    ...mapActions("milloperations", ["UpdatePlantCodeState"]),
    ...mapActions("milloperations", ["UpdatePlantNameState"]),
    ...mapActions("milloperations", ["UpdateClusterCodeState"]),
    ...mapActions("milloperations", ["UpdateClusterNameState"]),
    ...mapActions("alerts_loaders", ["startLoading"]),
    ...mapActions("alerts_loaders", ["stopLoading"]),

    async LoginDetailsOnSubmit() {
      const LoginDetails = {
        Username: this.Username,
        Password: this.Password,
      };

      if (navigator.onLine === true) {
        this.startLoading();

        try {
          const response = await fetch(
            `https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/login.php?Username=${LoginDetails.Username}&Password=${LoginDetails.Password}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const result = await response.json();
          console.log("response", result);

          //  if login is successful
          if (result.IsAuthenticated) {
            localStorage.setItem(
              "userDetails",
              JSON.stringify(result.UserInfo)
            );
            Cookies.set("isUserLoggedIn", true);
            this.UpdateLoginState(true);
            this.UpdateEmpCodeState(result.UserInfo.emp_code);
            this.UpdateEmpNameState(result.UserInfo.emp_name);
            this.UpdateUsernameState(result.UserInfo.user_name);
            this.UpdateAppTypeState(result.UserInfo.app_type);
            this.UpdateStateNameState(result.UserInfo.state_name);
            this.UpdateStateCodeState(result.UserInfo.state_code);
            this.UpdatePlantCodeState(result.UserInfo.plant_code);
            this.UpdatePlantNameState(result.UserInfo.plant_name);
            this.UpdateClusterCodeState(result.UserInfo.cluster_code);
            this.UpdateClusterNameState(result.UserInfo.cluster_name);

            this.$router.push("/dashboard");
            this.stopLoading();
          } else if (!result.IsAuthenticated && !result.ValidCredentials) {
            this.stopLoading();
            Notify.create({
              message: "Invalid Credentials",
              color: "negative",
              position: "top",
              timeout: 2000,
              actions: [
                { label: "Dismiss", color: "white", handler: () => {} },
              ],
            });
          }
        } catch (error) {
          this.stopLoading();
          Notify.create({
            message: `Error while logging in: ${error.message}`,
            color: "negative",
            position: "top",
            timeout: 3000,
            actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
          });
        }
      } else {
        Notify.create({
          message: "You need to check for Internet connection",
          color: "negative",
          position: "top",
          timeout: 3000,
          actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
        });
      }
    },
  },
};
</script>
<style>
.LoginContainer {
  padding: 10px;
  border-radius: 5px;
  background-color: #fbffdc;
  width: 450px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
}

.main-container {
  width: 300px;
  margin-left: 16%;
}

.companyLogo {
  padding: 18px;
}

.inputs-lg-frm {
  margin-bottom: 20px;
}

.app-name {
  text-align: center;
  font-size: 20px;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 5px;
  background-color: #13678a;
  font-weight: 600;
  color: #dafdba;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}

.app-name p {
  margin-bottom: 0px;
}

.forget-pwd {
  margin: 10px;
  margin-bottom: 2px;
  font-size: 16px;
  margin-top: -5px;
}
</style>
