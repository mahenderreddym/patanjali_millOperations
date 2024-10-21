<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title> Mill operations </q-toolbar-title>
        <q-toolbar-title class="text-right"
          >{{ userDetails.plant_name }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="600"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <!-- <q-list padding>
          <q-item clickable v-ripple to="/Dashboard">
            <q-item-section @click="CloseDrawer"> Dashboard </q-item-section>
          </q-item>
        </q-list> -->
        <q-list v-show="this.userDetails.user_role === 'manager'">
          <q-item clickable v-ripple to="/Dashboard">
            <q-item-section @click="CloseDrawer"> Dashboard </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="SterilisationStationLog">
            <q-item-section @click="CloseDrawer">
              Sterilisation Station Log
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="TurbineLog" @click="CloseDrawer">
            <q-item-section> Turbine Log </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="BoilerLog" @click="CloseDrawer">
            <q-item-section> Boiler Log </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="ShiftReport" @click="CloseDrawer">
            <q-item-section> Shift Report </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="ClarificationLog" @click="CloseDrawer">
            <q-item-section> Clarification Log </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="PressStationLog" @click="CloseDrawer">
            <q-item-section>Press Station Log</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="ThermicFluidHeaterLog" @click="CloseDrawer">
            <q-item-section>Thermic Fluid Heater Log</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="SludgeDryerLog" @click="CloseDrawer">
            <q-item-section>Sludge Dryer Log</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="KernelStationLog" @click="CloseDrawer">
            <q-item-section>Kernel Station Log</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="DailyLogSheetForROPlantLog" @click="CloseDrawer">
            <q-item-section>Daily Log Sheet For RO Plant Log</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="UFandROLog" @click="CloseDrawer">
            <q-item-section>UF AND RO Log</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="ExpellerSectionLog" @click="CloseDrawer">
            <q-item-section>Expeller Section Log</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="ViewReports" @click="CloseDrawer">
            <q-item-section> View Reports </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="Sync" @click="CloseDrawer">
            <q-item-section> Sync </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="About" @click="CloseDrawer">
            <q-item-section> About App </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="Settings" @click="CloseDrawer">
            <q-item-section> Settings </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section @click="OnLogout"> Logout </q-item-section>
          </q-item>
        </q-list>
        <!-- sterilisation_user -->
        <q-list v-show="this.userDetails.user_role === 'sterlisation_user'">
          <q-item clickable v-ripple to="/Dashboard">
            <q-item-section @click="CloseDrawer"> Dashboard </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="SterilisationStationLog">
            <q-item-section @click="CloseDrawer">
              Sterilisation Station Log
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="ViewReportOfSterilisation">
            <q-item-section @click="CloseDrawer">
              View Report
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="SyncSterilisationLog">
            <q-item-section @click="CloseDrawer">
              Sync Sterilisation Log
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="About" @click="CloseDrawer">
            <q-item-section> About App </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="Settings" @click="CloseDrawer">
            <q-item-section> Settings </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section @click="OnLogout"> Logout </q-item-section>
          </q-item>

        </q-list>

        <!--boiler_user -->
        <q-list v-show="this.userDetails.user_role === 'boiler_user'">
          <q-item clickable v-ripple to="/Dashboard">
            <q-item-section @click="CloseDrawer"> Dashboard </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="BoilerLog">
            <q-item-section @click="CloseDrawer">
              Boiler Log
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="ViewReportOfBoiler">
            <q-item-section @click="CloseDrawer">
              Boiler Log Report
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="SyncBoilerLog">
            <q-item-section @click="CloseDrawer">
              Sync Boiler Log
            </q-item-section>
          </q-item>
          
          <q-item clickable v-ripple to="About" @click="CloseDrawer">
            <q-item-section> About App </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="Settings" @click="CloseDrawer">
            <q-item-section> Settings </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section @click="OnLogout"> Logout </q-item-section>
          </q-item>
        </q-list>


        <!-- turbine user -->
        <q-list v-show="this.userDetails.user_role === 'turbine_user'">
          <q-item clickable v-ripple to="/Dashboard">
            <q-item-section @click="CloseDrawer"> Dashboard </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="TurbineLog">
            <q-item-section @click="CloseDrawer">
              Turbine Log
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="ViewReportOfTurbine">
            <q-item-section @click="CloseDrawer">
              Turbine Log Report
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="SyncTurbineLog">
            <q-item-section @click="CloseDrawer">
              Sync Turbine Log
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="About" @click="CloseDrawer">
            <q-item-section> About App </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="Settings" @click="CloseDrawer">
            <q-item-section> Settings </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section @click="OnLogout"> Logout </q-item-section>
          </q-item>
        </q-list>

            <!--shift_user -->
            <q-list v-show="this.userDetails.user_role === 'shift_user'">
              <q-item clickable v-ripple to="/Dashboard">
            <q-item-section @click="CloseDrawer"> Dashboard </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="ShiftReport">
            <q-item-section @click="CloseDrawer">
              Shift Log
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="ViewReportOfShift">
            <q-item-section @click="CloseDrawer">
              Shift Log Report
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="SyncShiftLog">
            <q-item-section @click="CloseDrawer">
              Sync Shift Log
            </q-item-section>
          </q-item>
          
          <q-item clickable v-ripple to="About" @click="CloseDrawer">
            <q-item-section> About App </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="Settings" @click="CloseDrawer">
            <q-item-section> Settings </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section @click="OnLogout"> Logout </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://img.freepik.com/free-photo/beige-plain-concrete-textured-background_53876-102585.jpg?t=st=1685625682~exp=1685626282~hmac=73c3fe89643669f88472345a5b77d752ee4df70b82cc4f16fff7dc82e1e88ef7"
        style="height: 150px" 
      >
        <div
          class="q-mt-xl absolute-top q-mt-lg bg-transparent"
          style="margin-top: 38px"
        >
          <q-img src="..//assets/images/logo.png"></q-img>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";
import Cookies from 'js-cookie';

export default {
  name: "MainLayout",
  mixins: [],

  data() {
    return {
      leftDrawerOpen: false,
      UserInfo: {},
    };
  },
  created() {
    //     this.UserInfo = this.GetUserInfo()
    // console.log("userInfo",this.UserInfo)
  },
  mounted() {
    // console.log("mounted",this.UserInfo)
  },
  computed: {
    userDetails() {
      let user = JSON.parse(localStorage.getItem("userDetails")) || {};
      return user;
    },
  },
  methods: {
    ...mapActions("milloperations", ["UpdateLoginState"]),
    async OnLogout() {

      let userData = localStorage.getItem('userDetails')
      console.log("239",userData)
      // this.UpdateLoginState(false);
      const response= await fetch ("http://sedotsgroup.com/pflipalmdev/web-services/MillOperations/logout.php?user_name=`${userData.user_name}`&password=guest",
       {method:"GET",
    }
      )
// console.log("reponse",await response.json())
const result = await response.json()


if (result == '101'){
  if (Cookies.get("isUserLoggedIn") === "true") {
            Cookies.set("isUserLoggedIn", false)
          }
        this.$router.push("/login");
}
else {
    Notify.create({
              message: "Error while getting Logout",
              color: "negative",
              position: "top",
              timeout: 2000,
              actions: [
                { label: "Dismiss", color: "white", handler: () => {} },
              ],
  })
}
    },
    CloseDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
};
</script>
<style></style>
