<template>
    
    <q-page>
      <div class="title">
        <h4 class="text-center q-bold" style="position: relative">
          Sludge Dryer Log
          <q-icon
            name="sync"
            size="lg"
            class="absolute-right"
            style="border: 1px solid green; background-color: #dafdba"
            @click="syncClarifierData()"
          />
        </h4>
      </div>
      <div class="container">
        <q-form class="SrFm" ref="sludgeForm">
          <div class="split-container">
            <div class="left-container">
              <div class="input-feilds">
                <span class="input-text input-text-bl-frm">Date : </span
                ><q-input
                  style="width: 55%"
                  dense
                  outlined
                  v-model="date"
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
              <div class="input-feilds">
          <span class="input-text">Shift : </span
          >
          <div style="width: 40%" class="q-mb-md">
          <q-input
            outlined
            dense
            v-model="sludgeForm.shift"
            label="Shift"
            readonly
            :rules="[required('Shift')]"
          />
        
          <!-- <div v-if="sterilisationDayDetails.length > 0 && sterilisationDayDetails[0].shift" class="text-orange">{{ this.sterilisationDayDetails[0].shift}}</div>
        <div v-if="sterilisationDayDetails.length > 1 && sterilisationDayDetails[1].shift" class="text-blue">{{ this.sterilisationDayDetails[1].shift}}</div> -->
      </div>
        </div>

        <div class="input-feilds">
                <span class="input-text input-text-bl-frm">Time : </span
                ><q-input
                  outlined
                  dense
                  style="width: 55%; margin-bottom: 20px"
                  v-model="sludgeForm.dateTime"
                  label="Time"
                  :rules="[required('Time')]"
                >
    </q-input>
              </div>
            </div>

            <div class="line-tr"></div>
            <div class="right-container">
                <div class="input-feilds">
                <span class="input-text input-text-bl-frm">Feed Rate : </span
                ><q-input
                  outlined
                  dense
                  style="width: 55%; margin-bottom: 20px"
                  v-model="sludgeForm.feed_rate"
                  label="Feed Rate(Kg/hr)"
                  :rules="[required('Feed Rate')]"
                   type="number"
                          :min="0"
                >
    </q-input>
              </div>
              <div class="input-feilds">
                <span class="input-text input-text-bl-frm">Oil Inlet Temp : </span
                ><q-input
                  outlined
                  dense
                  style="width: 55%; margin-bottom: 20px"
                  v-model="sludgeForm.oil_inlet_temperature"
                  label="Oil inlet temp"
                  :rules="[required('Oil Inlet Temp')]"
                   type="number"
                          :min="0"
                >
    </q-input>
              </div>

              <div class="input-feilds">
                <span class="input-text input-text-bl-frm">Oil Pressure : </span
                ><q-input
                  outlined
                  dense
                  style="width: 55%; margin-bottom: 20px"
                  v-model="sludgeForm.oil_pressure"
                  label="Oil Pressure"
                  :rules="[required('Oil Pressure')]"
                   type="number"
                          :min="0"
                >
    </q-input>
              </div>
            </div>
          </div>
          <div class="subtitle" style="margin-top: 20px">
            <p class="text-center q-mt-sm">Product Temperature in Dryer</p>
          </div>
          <div class="flex flex-center">
            <div class="input-feilds q-mt-md">
              <table class="long-feilds">
                <thead>
                  <tr>
                    <th>(TE-101)</th>
                    <th>(TE-102)</th>
                    <th>(TE-103)</th>
                    <th>(TE-104)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <q-input
                        style="width: 100px"
                        dense
                        v-model="sludgeForm.product_temp_in_dryer_TE_101"
                        :rules="[requiredRange('TE-101')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                    </td>
                    <td>
                      <q-input
                        style="width: 100px"
                        dense
                        v-model="sludgeForm.product_temp_in_dryer_TE_102"
                        :rules="[requiredRange('TE_102')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                    </td>
                    <td>
                      <q-input
                        style="width: 100px"
                        dense
                        v-model="sludgeForm.product_temp_in_dryer_TE_103"
                        :rules="[requiredRange('TE_103')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                    </td>
                    <td>
                      <q-input
                        style="width: 100px"
                        dense
                        v-model="sludgeForm.product_temp_in_dryer_TE_104"
                        :rules="[requiredRange('TE_104')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          
          <div class="subtitle" style="margin-top: 20px">
            <p class="text-center q-mt-sm">FD</p>
          </div>
          
          <div class=" row flex flex-center q-mt-md">

            <div class="q-ma-md">
            <table>
            <tr>
              <th>Temp (TG-101) ()</th>
              <th>Pressure <br>(PG-101)<br/>MMWC</th>
            </tr>
            <tr>
              <td>
                <q-input
                        style="width: 100px"
                        dense
                        v-model="sludgeForm.fd_temp_tg_101"
                        :rules="[requiredRange('Temp (TG-101)')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
              </td>
              <td>
                <q-input
                        style="width: 100px"
                        dense
                        v-model="sludgeForm.fd_pressure_pg_101"
                        :rules="[requiredRange('PG-101')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
              </td>
            </tr>
            </table>
          </div>
   
        
          </div>

          <div class="subtitle" style="margin-top: 20px">
            <p class="text-center q-mt-sm">ID</p>
          </div>
          <div class="q-ma-md">
            <table>
            <tr>
              <th>ID TE-105 ()</th>
              <th>ID Pressure <br/>(PT-101)<br/>MMWC</th>
              <th>ID TE-106 ()</th>
              <th>ID Pressure <br/>(PT-102)<br/>MMWC</th>
              <th>ID Pressure <br/>(PT-103)<br/>MMWC</th>
            </tr>
            <tr>
              <td>
                <q-input
                        style="width: 100px"
                        dense
                        v-model="sludgeForm.id_te_105"
                        :rules="[requiredRange('TE-105')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
              </td>
              <td>
                <q-input
                        style="width: 100px"
                        dense
                        v-model="sludgeForm.id_pressure_pt_101"
                        :rules="[requiredRange('PT-101')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
              </td>
              <td>
                <q-input
                        style="width: 100px"
                        dense
                        v-model="sludgeForm.id_te_106"
                        :rules="[requiredRange('te_106')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
              </td>
              <td>
                <q-input
                        style="width: 100px"
                        dense
                        v-model="sludgeForm.id_pressure_pt_102"
                        :rules="[requiredRange('PT-102')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
              </td>
              <td>
                <q-input
                        style="width: 100px"
                        dense
                        v-model="sludgeForm.id_pressure_pt_103"
                        :rules="[requiredRange('PT-103')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
              </td>
            </tr>
            </table>
          </div>

          <div class="subtitle" style="margin-top: 20px">
            <p class="text-center q-mt-sm">Product Temperature in Cooler</p>
          </div>
          <div class="flex flex-center">
            <div class="input-feilds q-mt-md">
              <table class="long-feilds">
                <thead>
                  <tr>
                    <th>(TT-107)()</th>
                    <th>(TT-108)()</th>
                    <th>(TT-109)()</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <q-input
                        style="width: 100px"
                        dense
                        v-model="sludgeForm.pt_in_cooler_tt_107"
                        :rules="[requiredRange('Forward Cycle1')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                    </td>
                    <td>
                      <q-input
                        style="width: 100px"
                        dense
                        v-model="sludgeForm.pt_in_cooler_tt_108"
                        :rules="[requiredRange('Reverse Cycle1')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                    </td>
                    <td>
                      <q-input
                        style="width: 100px"
                        dense
                        v-model="sludgeForm.pt_in_cooler_tt_109"
                        :rules="[requiredRange('TT_109')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>


          <div class="subtitle" style="margin-top: 20px">
            <p class="text-center q-mt-sm">Cooling water Temp & Pressure</p>
          </div>
          <div class="flex flex-center">
            <div class="input-feilds q-mt-md">
              <table class="long-feilds">
                <thead>
                  <tr>
                    <th>I/L Temp (TG-103)()</th>
                    <th>O/L Temp (TG-102)()</th>
                    <th>Pressure (PG-103)MMWC</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <q-input
                        style="width: 100px"
                        dense
                        v-model="sludgeForm.cooling_temp_il_temp"
                        :rules="[requiredRange('I/L Temp')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                    </td>
                    <td>
                      <q-input
                        style="width: 100px"
                        dense
                        v-model="sludgeForm.cooling_temp_ol_temp"
                        :rules="[requiredRange('O/L Temp')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                    </td>
                    <td>
                      <q-input
                        style="width: 100px"
                        dense
                        v-model="sludgeForm.cooling_temp_pressure"
                        :rules="[requiredRange('PG-103')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="input-feilds q-mt-md justify-center">
            <span class="input-text text-wd-hev">Product Moisture % : </span
            >
            <div style="width: 20%">
            <q-input     
              dense
              v-model="sludgeForm.product_moisture"
              :rules="[requiredRange('Product Moisture')]"
              type="number"
              outlined
              label="Input"
              :min="0"
            />
       </div>
          </div>

          <div class="input-feilds q-mt-md justify-center">
            <span class="input-text text-wd-hev">Total Bags : </span
            >
            <div style="width: 20%">
            <q-input     
              dense
              v-model="sludgeForm.total_bags"
              :rules="[requiredRange('Total Bags')]"
              type="number"
              outlined
              label="Input"
              :min="0"
            />
       </div>
          </div>
        
          <div class="input-feilds q-mt-md">
          <span class="input-text" style="width: 100px">Remarks : </span
          ><q-input
            outlined
            dense
            v-model="sludgeForm.remarks"
            type="textarea"
            float-label="Textarea"
            :max-height="10"
            :min-rows="2"
            style="width: 70%; margin-left: 28px"
          />
        </div>
          <div class="btns">
            <q-btn
              style="margin-left: -80px"
              class="q-pa-sm"
              color="primary"
              label="Submit"
              @click="SludgeReportOnSubmit"
            />
            <q-btn
              @click="SludgeReportOnReset"
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
  import { Notify, date } from "quasar";
  import validations from "../helpers/validations";
  import { mapActions } from "vuex";
  
  export default {
    name: "ThermicFluidHeaterLog",
    data() {
      return {
        ...validations,
        date: date.formatDate(Date.now(), "YYYY/MM/DD"),
        shift_options: ["Shift 1", "Shift 2", "Shift 3"],
        unit_options: ["I", "II"],
        sludgeForm:{
          dateTime:"",
          feed_rate:"",
          oil_inlet_temperature:"",
          oil_pressure:"",
          product_temp_in_dryer_TE_101:"",
          product_temp_in_dryer_TE_102:"",
          product_temp_in_dryer_TE_103:"",
          product_temp_in_dryer_TE_104:"",
          fd_temp_tg_101:"",
          fd_pressure_pg_101:"",
          id_te_105:"",
          id_pressure_pt_101:"",
          id_te_106:"",
          id_pressure_pt_102:"",
          id_pressure_pt_103:"",
          pt_in_cooler_tt_107:"",
          pt_in_cooler_tt_108:"",
          pt_in_cooler_tt_109:"",
          cooling_temp_il_temp:"",
          cooling_temp_ol_temp:"",
          cooling_temp_pressure:"",
          product_moisture:"",
          total_bags:"",
          remarks:"",
          unit: "",
          shift: "",       
        },
        UserInfo: {},
      };
    },
    created() {
      this.UserInfo = this.GetUserInfo();
      this.initDB().then((db) => {
        this.db = db;
      });
    },
    mounted() {
      this.startClock();
    },
    methods: {
      ...mapActions("indexedDb", ["initDB"]),
      ...mapActions("indexedDb", ["syncClarifierFormData"]),
      ...mapActions("indexedDb", ["clearClarifierFormIndexedDB"]),

      showTimePicker1() {
      this.$refs.timePopup1.show();
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

    showTimePicker13() {
      this.$refs.timePopup13.show();
    },
    showTimePicker14() {
      this.$refs.timePopup14.show();
    },
    showTimePicker15() {
      this.$refs.timePopup15.show();
    },
    showTimePicker16() {
      this.$refs.timePopup16.show();
    },


      getCurrentTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`; // Format time as HH:MM:SS
    },
    // Method to start the clock and update time every second
    startClock() {
      this.sludgeForm.dateTime = this.getCurrentTime(); 
      setInterval(() => {
        this.sludgeForm.dateTime = this.getCurrentTime(); 
      }, 1000); 
    },
  
  
      async SludgeReportOnSubmit() {
        const user = JSON.parse(localStorage.getItem("userDetails"));
        const TotalSludgeReportLogDetails = {
          ...this.sludgeForm,
          ...user,
        };
        console.log("599",TotalSludgeReportLogDetails)
  
        const validate = await this.$refs.sludgeForm.validate();
  
        if (validate) {
        //   try {
        //     if (navigator.onLine === true) {
        //       const response = await fetch(
        //         "https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/shiftLogEntry.php",
        //         {
        //           method: "POST",
        //           headers: {
        //             "Content-Type": "application/json",
        //           },
        //           body: JSON.stringify(TotalSludgeReportLogDetails),
        //         }
        //       );
  
        //       const result = await response.json();
        //       if (result.IsDataUploaded == true) {
        //         Notify.create({
        //           message: "✔ Log Submitted",
        //           color: "positive", // optional: 'positive', 'negative', 'warning', 'info'
        //           position: "top", // optional: 'top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left', 'center'
        //           timeout: 2000, // optional: milliseconds, set to 0 to disable auto-close
        //           actions: [
        //             { label: "Dismiss", color: "white", handler: () => {} },
        //           ], // optional: actions to display in the notification
        //         });
        //         this.SludgeReportOnReset();
        //       } else if (result.IsDataUploaded == false) {
        //         Notify.create({
        //           message: "❌ Log Submission Failed",
        //           color: "negative", // optional: 'positive', 'negative', 'warning', 'info'
        //           position: "top", // optional: 'top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left', 'center'
        //           timeout: 2000, // optional: milliseconds, set to 0 to disable auto-close
        //           actions: [
        //             { label: "Dismiss", color: "white", handler: () => {} },
        //           ], // optional: actions to display in the notification
        //         });
        //         this.SludgeReportOnReset();
        //       }
        //     } else {
        //       this.ClarifierDataSaveToIndexedDB(TotalSludgeReportLogDetails);
        //     }
        //   } catch (error) {
        //     Notify.create({
        //       message: "Error while uploading",
        //       color: "negative", // optional: 'positive', 'negative', 'warning', 'info'
        //       position: "top", // optional: 'top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left', 'center'
        //       timeout: 2000, // optional: milliseconds, set to 0 to disable auto-close
        //       actions: [{ label: "Dismiss", color: "white", handler: () => {} }], // optional: actions to display in the notification
        //     });
        //     this.SludgeReportOnReset();
        //   }
        } else {
          Notify.create({
            message: "Please fill the form properly",
            color: "negative",
            timeout: 2000,
            position: "top",
          });
        }
      },
    
  

      SludgeReportOnReset(){
          this.sludgeForm.dateTime = "";
          this.sludgeForm.unit = "";
          this.sludgeForm.shift = "";
          this.sludgeForm.forward_temperature = "";
          this.sludgeForm.reverse_temperature = "";
          this.sludgeForm.stack_temperature = "";
          this.sludgeForm.orifice_flow = "";
          this.sludgeForm.bed_temperature1 ="";
          this.sludgeForm.bed_temperature2 ="";
          this.sludgeForm.furnace_draft ="";
          this.sludgeForm.fd_fan ="";
          this.sludgeForm.id_fan ="";
          this.sludgeForm.forward_cycle1 ="";
          this.sludgeForm.reverse_cycle1 ="";
          this.sludgeForm.forward_cycle2 ="";
          this.sludgeForm.reverse_cycle2 = "";
          this.sludgeForm.drum_feeder1 = "";
          this.sludgeForm.drum_feeder2 = "";
          this.sludgeForm.pump_pressure = "";
          this.sludgeForm.circuit_pressure1 = "";
          this.sludgeForm.circuit_pressure2 = "";
          this.sludgeForm.remarks = "";
       
        },
      // sync process methods
  
      ClarifierDataSaveToIndexedDB(data) {
        const transactionClarifier = this.db.transaction(
          ["ClarifierFormData"],
          "readwrite"
        );
        const objectStore = transactionClarifier.objectStore("ClarifierFormData");
        objectStore.add(data);
  
        transactionClarifier.oncomplete = () => {
          Notify.create({
            message: "Data Synced Successfully",
            color: "positive",
            timeout: 2000,
            position: "top",
          });
        };
  
        transactionClarifier.onerror = (event) => {
          Notify.create({
            message: "Data Synced Failed Please Try Again",
            color: "negative",
            timeout: 2000,
            position: "top",
            actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
          });
        };
  
        this.SludgeReportOnReset();
      },
  
      async syncClarifierData() {
        if (!this.db) {
          console.error("Database not initialized");
          await this.initDB();
        }
        this.syncClarifierFormData();
      },
    },
  };
  </script>
  <style></style>
  