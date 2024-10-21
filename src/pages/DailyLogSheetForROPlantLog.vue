<template>
  <q-page>
    <div class="title">
      <h4 class="text-center q-bold" style="position: relative">
        DAILY LOG SHEET FOR RO PLANT
        <q-icon
          name="sync"
          size="lg"
          class="absolute-right"
          style="border: 1px solid green; background-color: #dafdba"
          @click="syncPressStationData"
        />
      </h4>
    </div>
    <div class="container">
      <q-form ref="boilForm" class="BlFrm">
        <div class="split-container">
          <div class="left-container">
            <div class="input-feilds">
              <span class="input-text input-text-bl-frm">Date : </span>
              <q-input
                style="width: 55%"
                dense
                outlined
                v-model="dailyLogSheetForROPlantForm.date"
                :rules="[required('date')]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="date">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="line-tr"></div>
          <div class="right-container">
            <div class="input-feilds">
              <span class="input-text input-text-bl-frm"> Time : </span>
              <q-input
                outlined
                dense
                style="width: 55%; margin-bottom: 20px"
                v-model="dailyLogSheetForROPlantForm.dateTime"
                label="Time"
                :rules="[required('Time')]"
              >
              </q-input>
            </div>
          </div>
        </div>
        <div class="flex flex-center">
          <div class="input-feilds q-mt-md">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th colspan="6">PRESSURE(KG/CM<sup>2</sup>)</th>
                </tr>
                <tr>
                  <th colspan="2">MGF</th>
                  <th colspan="2">ACF</th>
                  <th colspan="2">CF</th>
                </tr>
                <tr>
                  <th>I/L</th>
                  <th>O/L</th>
                  <th>I/L</th>
                  <th>O/L</th>
                  <th>I/L</th>
                  <th>O/L</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="dailyLogSheetForROPlantForm[`pressure_mgf_IL`]"
                      :rules="[requiredRange(`MGF_I/L`)]"
                      type="number"
                      outlined
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="dailyLogSheetForROPlantForm[`pressure_mgf_OL`]"
                      :rules="[requiredRange(`MGF_O/L`)]"
                      type="number"
                      outlined
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="dailyLogSheetForROPlantForm[`pressure_acf_IL`]"
                      :rules="[requiredRange(`ACF_I/L`)]"
                      type="number"
                      outlined
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="dailyLogSheetForROPlantForm[`pressure_acf_OL`]"
                      :rules="[requiredRange(`ACF_O/L`)]"
                      type="number"
                      outlined
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="dailyLogSheetForROPlantForm[`pressure_cf_IL`]"
                      :rules="[requiredRange(`CF_I/L`)]"
                      type="number"
                      outlined
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="dailyLogSheetForROPlantForm[`pressure_cf_OL`]"
                      :rules="[requiredRange(`CF_O/L`)]"
                      type="number"
                      outlined
                      :min="0"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="input-feilds q-ml-md q-mt-md"></div>
        </div>
        <div class="subtitle" style="margin-top: 20px">
          <p class="text-center q-mt-sm">RO SYSTEM</p>
        </div>
        <div class="flex flex-center">
          <div class="input-feilds q-mt-md">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th colspan="8">RO SYSTEM</th>
                </tr>
                <tr>
                  <th colspan="3">PRESSURE (KG/CM<sup>2</sup>)</th>
                  <th colspan="4">FLOW m3/hr</th>
                </tr>
                <tr>
                  <th>1st stage</th>
                  <th>2nd stage</th>
                  <th>3rd Stage Reject</th>
                  <th>Feed</th>
                  <th>Product</th>
                  <th>Reject</th>
                  <th>Recovery%</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="
                        dailyLogSheetForROPlantForm[
                          `ro_system_pressure_1ststage`
                        ]
                      "
                      :rules="[requiredRange(`ro_system_pressure_1ststage`)]"
                      type="number"
                      outlined
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="
                        dailyLogSheetForROPlantForm[
                          `ro_system_pressure_2ndstage`
                        ]
                      "
                      :rules="[requiredRange(`ro_system_pressure_2ndstage`)]"
                      type="number"
                      outlined
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="
                        dailyLogSheetForROPlantForm[
                          `ro_system_pressure_3rdstage`
                        ]
                      "
                      :rules="[requiredRange(`ro_system_pressure_3rdstage`)]"
                      type="number"
                      outlined
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="
                        dailyLogSheetForROPlantForm[`ro_system_flow_feed`]
                      "
                      :rules="[requiredRange(`ro_system_flow_feed`)]"
                      type="number"
                      outlined
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="
                        dailyLogSheetForROPlantForm[`ro_system_flow_product`]
                      "
                      :rules="[requiredRange(`ro_system_flow_product`)]"
                      type="number"
                      outlined
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="
                        dailyLogSheetForROPlantForm[`ro_system_flow_reject`]
                      "
                      :rules="[requiredRange(`ro_system_flow_reject`)]"
                      type="number"
                      outlined
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="
                        dailyLogSheetForROPlantForm[`ro_system_flow_recovery`]
                      "
                      :rules="[requiredRange(`ro_system_flow_recovery%`)]"
                      type="number"
                      outlined
                      :min="0"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="flex flex-center">
          <div class="input-feilds q-mt-md">
            <div class="split-container" style="margin-top: 10px">
              <div class="input-feilds">
                <span class="input-text input-text-bl-frm">ORP mv:</span
                ><q-input
                  style="width: 55%"
                  v-model="dailyLogSheetForROPlantForm[`orp_mv`]"
                  dense
                  outlined
                  :rules="[required('ORP mv')]"
                  type="number"
                  :min="0"
                >
                </q-input>
              </div>

              <div class="input-feilds">
                <span class="input-text input-text-bl-frm">Cond.Us/Cm : </span>
                <q-input
                  outlined
                  dense
                  style="width: 55%; margin-bottom: 20px"
                  v-model="dailyLogSheetForROPlantForm[`cond_us`]"
                  :rules="[required('Cond.Us/Cm')]"
                   type="number"
                  :min="0"
                >
                </q-input>
              </div>
            </div>
          </div>
        </div>

        <div class="subtitle" style="margin-top: 20px">
          <p class="text-center q-mt-sm">MB</p>
        </div>
        <div class="">
          <div class="" style="width: 100%">
            <div class="flex flex-center">
              <div class="input-feilds q-mt-md">
                <table class="long-feilds">
                  <thead>
                    <tr>
                      <th colspan="6">MB</th>
                    </tr>
                    <tr>
                      <th>FLOW m3/hr</th>
                      <th>Cond.Us/cm</th>
                      <th>pH</th>
                      <th>After boosting pH</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <q-input
                          style="width: 100px"
                          dense
                          v-model="dailyLogSheetForROPlantForm[`mb_Flowm3`]"
                          :rules="[requiredRange(`mb_flow3`)]"
                          type="number"
                          outlined
                          :min="0"
                        />
                      </td>
                      <td>
                        <q-input
                          style="width: 100px"
                          dense
                          v-model="dailyLogSheetForROPlantForm[`mb_condus`]"
                          :rules="[requiredRange(`mb_condus`)]"
                          type="number"
                          outlined
                          :min="0"
                        />
                      </td>
                      <td>
                        <q-input
                          style="width: 100px"
                          dense
                          v-model="dailyLogSheetForROPlantForm[`mb_PH`]"
                          :rules="[requiredRange(`mb_ph`)]"
                          type="number"
                          outlined
                          :min="0"
                        />
                      </td>
                      <td>
                        <q-input
                          style="width: 100px"
                          dense
                          v-model="
                            dailyLogSheetForROPlantForm[`mb_after_boosting_ph`]
                          "
                          :rules="[requiredRange(`mb_after_boosting_ph`)]"
                          type="number"
                          outlined
                          :min="0"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-center">
          <div class="input-feilds q-mt-lg">
            <div class="input-feilds">
              <div class="q-mt-sm">
              <span class="input-text input-text-bl-frm"
                >Flow Meter Reading M3:</span
              >
            </div>
            <div>
              <q-input
                outlined
                dense
                style="width: 55%"
                v-model="dailyLogSheetForROPlantForm[`flow_meter`]"
                :rules="[requiredRange('Flow Meter Reading M3')]"
                type="number"
                :min="0"
              >
              </q-input>
            </div>
            </div>
          </div>
        </div>
        <div class="flex flex-center">
          <div class="input-feilds q-mt-sm">
            <div class="split-container" style="margin-top: 10px">
              <div class="flex justify-center">
                <div class="q-mt-sm">
                <span class="input-text input-text-bl-frm"
                  >Chemical Consumption:
                </span>
                </div>
                <div>
                <q-input
                  outlined
                  dense
                  style="width: 55%; margin-bottom: 20px"
                  v-model="dailyLogSheetForROPlantForm[`chemical_consumption`]"
                  :rules="[requiredRange('Chemical Consumption')]"
                  type="number"
                  :min="0"

                >
                
                </q-input>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div class="input-feilds q-mt-sm">
          <span class="input-text" style="width: 100px">Remarks : </span
          ><q-input
            outlined
            dense
            v-model="dailyLogSheetForROPlantForm.remarks"
            type="textarea"
            float-label="Textarea"
            :max-height="10"
            :min-rows="2"
            style="width: 70%; margin-left: 28px"
          />
        </div>

        <div class="btns">
          <q-btn
            @click="dailyLogSheetForRoPlantSubmit()"
            class="q-pa-sm"
            color="primary"
            label="Submit"
          />
          <q-btn
            @click="dailyLogSheetForRoPlantReset()"
            class="q-pa-xsm"
            style="margin-left: 10px"
            color="secondary"
            label="Reset"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { date, Notify } from "quasar";
import validations from "../helpers/validations";
import { mapActions } from "vuex";
export default {
  name: "DailyLogSheetForROPlant",
  data() {
    return {
      ...validations,
      date: "",
      time: new Date().toLocaleTimeString(),
      dailyLogSheetForROPlantForm: {
        date: date.formatDate(Date.now(), "YYYY/MM/DD"),
        dateTime: "",
        pressure_mgf_IL: "",
        pressure_mgf_OL: "",
        pressure_acf_IL: "",
        pressure_acf_OL: "",
        pressure_cf_IL: "",
        pressure_cf_OL: "",
        ro_system_pressure_1ststage: "",
        ro_system_pressure_2ndstage: "",
        ro_system_pressure_3rdstage: "",
        ro_system_flow_feed: "",
        ro_system_flow_product: "",
        ro_system_flow_reject: "",
        ro_system_flow_recovery: "",
        cond_us: "",
        mb_Flowm3: "",
        mb_condus: "",
        orp_mv: "",
        mb_PH: "",
        mb_after_boosting_ph: "",
        flow_meter: "",
        remarks: "",
        chemical_consumption: "",
      },
    };
  },
  created() {},
  mounted() {
    this.startClock();
  },
  methods: {
    ...mapActions("indexedDb", ["initDB"]),
    ...mapActions("indexedDb", ["syncdailyLogSheetForROPlantFormData"]),
    ...mapActions("indexedDb", ["cleardailyLogSheetForROPlantFormIndexedDB"]),

    showTimePicker() {
      this.$refs.timePopup.show();
    },

    showTimePicker2() {
      this.$refs.timePopup2.show();
    },

    showTimePicker3() {
      this.$refs.timePopup3.show();
    },
    showTimePicker4() {
      this.$refs.timePopup4.show();
    },
    showTimePicker5() {
      this.$refs.timePopup5.show();
    },
    showTimePicker6() {
      this.$refs.timePopup6.show();
    },
    showTimePicker7() {
      this.$refs.timePopup7.show();
    },

    showTimePicker8() {
      this.$refs.timePopup8.show();
    },
    showTimePicker9() {
      this.$refs.timePopup9.show();
    },
    showTimePicker10() {
      this.$refs.timePopup10.show();
    },
    showTimePicker11() {
      this.$refs.timePopup11.show();
    },
    showTimePicker12() {
      this.$refs.timePopup12.show();
    },

    getCurrentTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`; // Format time as HH:MM:SS
    },
    // Method to start the clock and update time every second
    startClock() {
      this.dailyLogSheetForROPlantForm.dateTime = this.getCurrentTime(); // Set initial time
      setInterval(() => {
        this.dailyLogSheetForROPlantForm.dateTime = this.getCurrentTime(); // Update time every second
      }, 1000); // Update every 1 second
    },

    async dailyLogSheetForRoPlantSubmit() {
      let userDetailsData = JSON.parse(localStorage.getItem("userDetails"));

      const TotalPressStationLogDetails = {
        ...this.dailyLogSheetForROPlantForm,
        ...userDetailsData,
      };
      console.log("TotalPressStationLogDetails ", TotalPressStationLogDetails);

      const validate = await this.$refs.boilForm.validate();
    },
    dailyLogSheetForRoPlantReset() {
      this.dailyLogSheetForROPlantForm.dateTime = "";
      this.dailyLogSheetForROPlantForm.pressure_mgf_IL = "";
      this.dailyLogSheetForROPlantForm.pressure_mgf_OL = "";
      this.dailyLogSheetForROPlantForm.pressure_acf_IL = "";
      this.dailyLogSheetForROPlantForm.pressure_acf_OL = "";
      this.dailyLogSheetForROPlantForm.pressure_cf_IL = "";
      this.dailyLogSheetForROPlantForm.pressure_cf_OL = "";
      this.dailyLogSheetForROPlantForm.ro_system_pressure_1ststage = "";
      this.dailyLogSheetForROPlantForm.ro_system_pressure_2ndstage = "";
      this.dailyLogSheetForROPlantForm.ro_system_pressure_3rdstage = "";
      this.dailyLogSheetForROPlantForm.ro_system_flow_feed = "";
      this.dailyLogSheetForROPlantForm.ro_system_flow_product = "";
      this.dailyLogSheetForROPlantForm.ro_system_flow_reject = "";
      this.dailyLogSheetForROPlantForm.ro_system_flow_recovery = "";
      this.dailyLogSheetForROPlantForm.cond_us = "";
      this.dailyLogSheetForROPlantForm.mb_Flowm3 = "";
      this.dailyLogSheetForROPlantForm.mb_condus = "";
      this.dailyLogSheetForROPlantForm.orp_mv = "";
      this.dailyLogSheetForROPlantForm.mb_PH = "";
      this.dailyLogSheetForROPlantForm.mb_after_boosting_ph = "";
      this.dailyLogSheetForROPlantForm.flow_meter = "";
      this.dailyLogSheetForROPlantForm.chemical_consumption = "";
      this.dailyLogSheetForROPlantForm.remarks = "";
    },
    // sync process methods
    PressStationDataSaveToIndexedDB(data) {
      const transactionPressStation = this.db.transaction(
        ["dailyLogSheetForROPlantFormData"],
        "readwrite"
      );
      const objectStore = transactionPressStation.objectStore(
        "dailyLogSheetForROPlantFormData"
      );
      objectStore.add(data);

      transactionPressStation.oncomplete = () => {
        Notify.create({
          message: "Data Synced Successfully",
          color: "positive",
          timeout: 2000,
          position: "top",
        });
      };

      transactionPressStation.onerror = (event) => {
        Notify.create({
          message: "Data Synced Failed Please Try Again",
          color: "negative",
          timeout: 2000,
          position: "top",
          actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
        });
      };

      this.dailyLogSheetForRoPlantReset();
    },

    async syncPressStationData() {
      if (!this.db) {
        console.error("Database not initialized");
        await this.initDB();
      }
      this.syncdailyLogSheetForROPlantFormData();
    },
  },
};
</script>
