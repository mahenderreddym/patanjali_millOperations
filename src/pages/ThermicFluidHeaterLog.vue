<template>
    
    <q-page>
      <div class="title">
        <h4 class="text-center q-bold" style="position: relative">
          Thermic Fluid Heater Log
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
        <q-form class="SrFm" ref="thermicForm">
          <div class="split-container">
            <div class="left-container">
              <div class="input-feilds">
                <span class="input-text input-text-bl-frm">Date : </span
                ><q-input
                  style="width: 55%"
                  dense
                  outlined
                  v-model="thermicForm.date"
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
                <span class="input-text input-text-bl-frm">Time : </span
                ><q-input
                  outlined
                  dense
                  style="width: 55%; margin-bottom: 20px"
                  v-model="thermicForm.dateTime"
                  label="Time"
                  :rules="[required('Time')]"
                >
    </q-input>
              </div>
            </div>
          </div>
          <div class="subtitle" style="margin-top: 20px">
            <p class="text-center q-mt-sm">Temperature</p>
          </div>
          <div class="flex flex-center">
            <div class="input-feilds q-mt-md">
              <table class="long-feilds">
                <thead>
                  <tr>
                    <th>Forward Temperature</th>
                    <th>Reverse Temperature</th>
                    <th>Stack Temperature</th>
                    <th>Orifice Flow</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <q-input
                        style="width: 100px"
                        dense
                        v-model="thermicForm.forward_temperature"
                        :rules="[requiredRange('nozzle centrifuge1')]"
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
                        v-model="thermicForm.reverse_temperature"
                        :rules="[requiredRange('nozzle centrifuge2')]"
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
                        v-model="thermicForm.stack_temperature"
                        :rules="[requiredRange('nozzle centrifuge3')]"
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
                        v-model="thermicForm.orifice_flow"
                        :rules="[requiredRange('nozzle centrifuge4')]"
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
          
          <div class=" row flex flex-center q-mt-md">

            <div class="q-ma-md">
            <table>
            <tr>
              <th>Bed Temperature1</th>
              <th>Bed Temperature2</th>
            </tr>
            <tr>
              <td>
                <q-input
                        style="width: 100px"
                        dense
                        v-model="thermicForm.bed_temperature1"
                        :rules="[requiredRange('Bed Temperature1')]"
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
                        v-model="thermicForm.bed_temperature2"
                        :rules="[requiredRange('Bed Temperature2')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
              </td>
            </tr>
            </table>
          </div>

          <div class="q-ma-md">
            <table>
            <tr>
              <th>Furnace Draft</th>
              <th>FD Fan (HZ)</th>
              <th>ID Fan (HZ)</th>
            </tr>
            <tr>
              <td>
                <q-input
                        style="width: 100px"
                        dense
                        v-model="thermicForm.furnace_draft"
                        :rules="[requiredRange('Furnace Draft')]"
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
                        v-model="thermicForm.fd_fan"
                        :rules="[requiredRange('FD Fan')]"
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
                        v-model="thermicForm.id_fan"
                        :rules="[requiredRange('ID Fan')]"
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
            <p class="text-center q-mt-sm">Grate Time Setting</p>
          </div>
          <div class="flex flex-center">
            <div class="input-feilds q-mt-md">
              <table class="long-feilds">
                <thead>
                    <tr><th colspan="4">Grate Time Settings</th></tr>
                  <tr>
                    <th>Forward Cycle-1</th>
                    <th>Reverse Cycle-1</th>
                    <th>Forward Cycle-2</th>
                    <th>Reverse Cycle-2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <q-input
                        style="width: 100px"
                        dense
                        v-model="thermicForm.forward_cycle1"
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
                        v-model="thermicForm.reverse_cycle1"
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
                        v-model="thermicForm.forward_cycle2"
                        :rules="[requiredRange('Forward Cycle2')]"
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
                        v-model="thermicForm.reverse_cycle2"
                        :rules="[requiredRange('Reverse Cycle2')]"
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

          <div class="row justify-center">
            <div class="q-ma-md">
            <table>
              <tr><th colspan="2">Drum Feeder</th></tr>
            <tr>
              <th>Drum Feeder-1</th>
              <th>Drum Feeder-2</th>
            </tr>
            <tr>
              <td>
                <q-input
                        style="width: 100px"
                        dense
                        v-model="thermicForm.drum_feeder1"
                        :rules="[requiredRange('Drum Feeder1')]"
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
                        v-model="thermicForm.drum_feeder2"
                        :rules="[requiredRange('Drum Feeder2')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
              </td>
            </tr>
            </table>
          </div>

          <div class="q-ma-md">
            <table>
              <tr><th colspan="3">Pressures</th></tr>
            <tr>
              <th>Pump Pressure</th>
              <th>Circuit Pressure-1</th>
              <th>Circuit Pressure-2</th>
            </tr>
            <tr>
              <td>
                <q-input
                        style="width: 100px"
                        dense
                        v-model="thermicForm.pump_pressure"
                        :rules="[requiredRange('Pump Pressure')]"
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
                        v-model="thermicForm.circuit_pressure1"
                        :rules="[requiredRange('Circuit Pressure1')]"
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
                        v-model="thermicForm.circuit_pressure2"
                        :rules="[requiredRange('Circuit Pressure2')]"
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
          <div class="input-feilds q-mt-md">
          <span class="input-text" style="width: 100px">Remarks : </span
          ><q-input
            outlined
            dense
            v-model="thermicForm.remarks"
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
              @click="ThermicReportOnSubmit"
            />
            <q-btn
              @click="ThermicReportOnReset"
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
        shift_options: ["Shift 1", "Shift 2", "Shift 3"],
        unit_options: ["I", "II"],
        date:"",
        thermicForm:{
          date: date.formatDate(Date.now(), "YYYY/MM/DD"),
          dateTime:"",
        unit: "",
        shift: "",
        forward_temperature: "",
        reverse_temperature: "",
        stack_temperature: "",
        orifice_flow: "",
        bed_temperature1:"",
        bed_temperature2:"",
        furnace_draft:"",
        fd_fan:"",
        id_fan:"",
        forward_cycle1:"",
        reverse_cycle1:"",
        forward_cycle2:"",
        reverse_cycle2: "",
        drum_feeder1: "",
        drum_feeder2: "",
        pump_pressure: "",
        circuit_pressure1: "",
        circuit_pressure2: "",
        remarks: "",
       
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
      this.thermicForm.dateTime = this.getCurrentTime(); 
      setInterval(() => {
        this.thermicForm.dateTime = this.getCurrentTime(); 
      }, 1000); 
    },
  
  
      async ThermicReportOnSubmit() {
        const user = JSON.parse(localStorage.getItem("userDetails"));
        const TotalThermicReportLogDetails = {
          ...this.thermicForm,
          ...user,
        };
        console.log("599",TotalThermicReportLogDetails)
  
        const validate = await this.$refs.thermicForm.validate();
  
        if (validate) {
          try {
            if (navigator.onLine === true) {
              const response = await fetch(
                "https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/shiftLogEntry.php",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(TotalThermicReportLogDetails),
                }
              );
  
              const result = await response.json();
              if (result.IsDataUploaded == true) {
                Notify.create({
                  message: "✔ Log Submitted",
                  color: "positive", // optional: 'positive', 'negative', 'warning', 'info'
                  position: "top", // optional: 'top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left', 'center'
                  timeout: 2000, // optional: milliseconds, set to 0 to disable auto-close
                  actions: [
                    { label: "Dismiss", color: "white", handler: () => {} },
                  ], // optional: actions to display in the notification
                });
                this.ThermicReportOnReset();
              } else if (result.IsDataUploaded == false) {
                Notify.create({
                  message: "❌ Log Submission Failed",
                  color: "negative", // optional: 'positive', 'negative', 'warning', 'info'
                  position: "top", // optional: 'top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left', 'center'
                  timeout: 2000, // optional: milliseconds, set to 0 to disable auto-close
                  actions: [
                    { label: "Dismiss", color: "white", handler: () => {} },
                  ], // optional: actions to display in the notification
                });
                this.ThermicReportOnReset();
              }
            } else {
              this.ClarifierDataSaveToIndexedDB(TotalThermicReportLogDetails);
            }
          } catch (error) {
            Notify.create({
              message: "Error while uploading",
              color: "negative", // optional: 'positive', 'negative', 'warning', 'info'
              position: "top", // optional: 'top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left', 'center'
              timeout: 2000, // optional: milliseconds, set to 0 to disable auto-close
              actions: [{ label: "Dismiss", color: "white", handler: () => {} }], // optional: actions to display in the notification
            });
            this.ThermicReportOnReset();
          }
        } else {
          Notify.create({
            message: "Please fill the form properly",
            color: "negative",
            timeout: 2000,
            position: "top",
          });
        }
      },
    
  

      ThermicReportOnReset(){
          this.thermicForm.dateTime = "";
          this.thermicForm.unit = "";
          this.thermicForm.shift = "";
          this.thermicForm.forward_temperature = "";
          this.thermicForm.reverse_temperature = "";
          this.thermicForm.stack_temperature = "";
          this.thermicForm.orifice_flow = "";
          this.thermicForm.bed_temperature1 ="";
          this.thermicForm.bed_temperature2 ="";
          this.thermicForm.furnace_draft ="";
          this.thermicForm.fd_fan ="";
          this.thermicForm.id_fan ="";
          this.thermicForm.forward_cycle1 ="";
          this.thermicForm.reverse_cycle1 ="";
          this.thermicForm.forward_cycle2 ="";
          this.thermicForm.reverse_cycle2 = "";
          this.thermicForm.drum_feeder1 = "";
          this.thermicForm.drum_feeder2 = "";
          this.thermicForm.pump_pressure = "";
          this.thermicForm.circuit_pressure1 = "";
          this.thermicForm.circuit_pressure2 = "";
          this.thermicForm.remarks = "";
       
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
  
        this.ThermicReportOnReset();
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
  