<template>
  <q-page>
    <div class="title">
      <h4 class="text-center q-bold" style="position: relative">
        Daily Log Sheet For UF & RO Plant
        <q-icon
          name="sync"
          size="lg"
          class="absolute-right"
          style="border: 1px solid green; background-color: #dafdba"
        />
      </h4>
    </div>
    <div class="container">
      <q-form class="BlFrm" ref="boilForm">
        <div class="split-container">
          <div class="left-container">
            <div class="input-feilds">
              <span class="input-text input-text-bl-frm">Date : </span
              ><q-input
                style="width: 55%"
                dense
                outlined
                v-model="UFandROform.date"
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
              <span class="input-text input-text-bl-frm">Shift : </span
              ><q-select
                style="width: 55%"
                dense
                outlined
                :options="options"
                label='shift'
                v-model="UFandROform.shift"
                :rules="[required('shift')]"
              />
            </div>
          </div>
          <div class="line-tr"></div>
          <div class="right-container">
            <div class="input-feilds">
              <span class="input-text input-text-bl-frm">Time : </span>
              <q-input
                outlined
                dense
                style="width: 55%; margin-bottom: 20px"
                v-model="UFandROform.date_time"
                label="Time"
                :rules="[required('Time')]"
              >
              </q-input>
            </div>
          </div>
        </div>

     


 <!-- Pressure (Kg/cm2)  -->        
        <div class="subtitle" style="margin-top: 20px">
          <p class="text-center q-mt-sm">Pressure (Kg/cm2)</p>
        </div>

        <div class="flex flex-center">
          <div class="input-feilds q-ml-md q-mt-md">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th colspan="4">Pressures (Kg/cm2)</th>
                </tr>
                <tr>
                  <th colspan="2">MGF1</th>
                  <th colspan="2">MGF2</th>
                </tr>
                <tr>
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
                      v-model="UFandROform.mfg1_il"
                      :rules="[requiredRange('mfg1_il')]"
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
                      v-model="UFandROform.mfg1_ol"
                      :rules="[requiredRange('mfg1_ol')]"
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
                      v-model="UFandROform.mfg2_il"
                      :rules="[requiredRange('mfg2_il')]"
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
                      v-model="UFandROform.mfg2_ol"
                      :rules="[requiredRange('mfg2_ol')]"
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

        <!-- UF system  -->
        <div class="subtitle" style="margin-top: 20px">
          <p class="text-center q-mt-sm">UF System</p>
        </div>
        <div class="flex flex-center">
          <div class="input-feilds q-ml-md q-mt-md">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th colspan="4">Pressures (Kg/cm2) Ultra Filters</th>
                </tr>
                <tr>
                  <th>Feed</th>
                  <th>Prod.</th>
                  <th>Rej</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="UFandROform.ultra_filter_pressure_feed"
                      :rules="[requiredRange('pressure_feed')]"
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
                      v-model="UFandROform.ultra_filter_pressure_prod"
                      :rules="[requiredRange('pressure_prod')]"
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
                      v-model="UFandROform.ultra_filter_pressure_rej"
                      :rules="[requiredRange('pressure_rej')]"
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
          <div class="input-feilds q-ml-md q-mt-md">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th colspan="4">Flow (Kg/cm2) Ultra Filters</th>
                </tr>
                <tr>
                  <th>Feed</th>
                  <th>Prod.</th>
                  <th>Reg</th>
                  <th>Rec %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="UFandROform.ultra_filter_flow_feed"
                      :rules="[requiredRange('flow_feed')]"
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
                      v-model="UFandROform.ultra_filter_flow_prod"
                      :rules="[requiredRange('flow_prod')]"
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
                      v-model="UFandROform.ultra_filter_flow_rej"
                      :rules="[requiredRange('flow_rej')]"
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
                      v-model="UFandROform.ultra_filter_flow_rec"
                      :rules="[requiredRange('flow_rec')]"
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

        <!-- RO-1 system  -->
        <div class="subtitle" style="margin-top: 20px">
          <p class="text-center q-mt-sm">RO-1 System</p>
        </div>
        <div class="flex flex-center">
          <div class="input-feilds q-ml-md q-mt-md">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th colspan="4">Pressures (Kg/cm2) RO-1</th>
                </tr>
                <tr>
                  <th>Feed</th>
                  <th>Prod.</th>
                  <th>Rej</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="UFandROform.ro_first_pressure_feed"
                      :rules="[requiredRange('ro_first_pressure_feed')]"
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
                      v-model="UFandROform.ro_first_pressure_prod"
                      :rules="[requiredRange('ro_first_pressure_prod')]"
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
                      v-model="UFandROform.ro_first_pressure_rej"
                      :rules="[requiredRange('ro_first_pressure_rej')]"
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
          <div class="input-feilds q-ml-md q-mt-md">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th colspan="4">Flow (Kg/cm2) RO-1</th>
                </tr>
                <tr>
                  <th>Feed</th>
                  <th>Prod.</th>
                  <th>Reg</th>
                  <th>Rec %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="UFandROform.ro_first_flow_feed"
                      :rules="[requiredRange('ro_first_flow_feed')]"
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
                      v-model="UFandROform.ro_first_flow_prod"
                      :rules="[requiredRange('ro_first_flow_prod')]"
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
                      v-model="UFandROform.ro_first_flow_rej"
                      :rules="[requiredRange('ro_first_flow_rej')]"
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
                      v-model="UFandROform.ro_first_flow_rec"
                      :rules="[requiredRange('ro_first_flow_rec')]"
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

        <!--RO-2 system  -->
        <div class="subtitle" style="margin-top: 20px">
          <p class="text-center q-mt-sm">RO-2 System</p>
        </div>
        <div class="flex flex-center">
          <div class="input-feilds q-ml-md q-mt-md">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th colspan="4">Pressures (Kg/cm2) RO-2</th>
                </tr>
                <tr>
                  <th>Feed</th>
                  <th>Prod.</th>
                  <th>Rej</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="UFandROform.ro_second_pressure_feed"
                      :rules="[requiredRange('ro_second_pressure_feed')]"
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
                      v-model="UFandROform.ro_second_pressure_prod"
                      :rules="[requiredRange('ro_second_pressure_prod')]"
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
                      v-model="UFandROform.ro_second_pressure_rej"
                      :rules="[requiredRange('ro_second_pressure_rej')]"
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
          <div class="input-feilds q-ml-md q-mt-md">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th colspan="4">Flow (Kg/cm2) RO-2</th>
                </tr>
                <tr>
                  <th>Feed</th>
                  <th>Prod.</th>
                  <th>Reg</th>
                  <th>Rec %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="UFandROform.ro_second_flow_feed"
                      :rules="[requiredRange('ro_second_flow_feed')]"
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
                      v-model="UFandROform.ro_second_flow_prod"
                      :rules="[requiredRange('ro_second_flow_prod')]"
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
                      v-model="UFandROform.ro_second_flow_rej"
                      :rules="[requiredRange('ro_second_flow_rej')]"
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
                      v-model="UFandROform.ro_second_flow_rec"
                      :rules="[requiredRange('ro_second_flow_rec')]"
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

           <!-- Analysis form  -->
           <div class="subtitle" style="margin-top: 20px">
          <p class="text-center q-mt-sm">Analysis Report</p>
        </div>
        <div class="flex flex-center">
          <div class="input-feilds q-ml-md q-mt-md">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th colspan="2">UF-pH</th>
                  <th colspan="3">RO-1 TDS</th>
                </tr>
                <tr>
                  <th>I/L</th>
                  <th>O/L</th>
                  <th>I/L</th>
                  <th>Prod.</th>
                  <th>Rej</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="UFandROform.analysis_uf_il"
                      :rules="[requiredRange('analysis_uf_il')]"
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
                      v-model="UFandROform.analysis_uf_ol"
                      :rules="[requiredRange('analysis_uf_ol')]"
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
                      v-model="UFandROform.analysis_ro1_tds_il"
                      :rules="[requiredRange('analysis_ro1_tds_il')]"
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
                      v-model="UFandROform.analysis_ro1_tds_prod"
                      :rules="[requiredRange('analysis_ro1_tds_prod')]"
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
                      v-model="UFandROform.analysis_ro1_tds_rej"
                      :rules="[requiredRange('analysis_ro1_tds_rej')]"
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
          <div class="input-feilds q-ml-md q-mt-md">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th colspan="2">RO-1 pH</th>
                  <th colspan="2">RO-2 TDS</th>
                </tr>
                <tr>
                  <th>I/L</th>
                  <th>O/L</th>
                  <th>I/L</th>
                  <th>Prod.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="UFandROform.analysis_ro1_ph_prod"
                      :rules="[requiredRange('analysis_ro1_ph_prod')]"
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
                      v-model="UFandROform.analysis_ro1_ph_rej"
                      :rules="[requiredRange('analysis_ro1_ph_rej')]"
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
                      v-model="UFandROform.analysis_ro2_tds_il"
                      :rules="[requiredRange('analysis_ro2_tds_il')]"
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
                      v-model="UFandROform.analysis_ro2_tds_prod"
                      :rules="[requiredRange('analysis_ro2_tds_prod')]"
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
          <div class="input-feilds q-ml-md q-mt-md">
            <table class="long-feilds">
              <thead>
                <tr>
                  
                  <th colspan="3">RO-2 pH</th>
                  <th colspan="1">RO-1 ORP</th>
                  <th colspan="1">RO-2 ORP</th>
                
                </tr>
                <tr>
                  
                  <th>Rej</th>
                  <th>Prod.</th>
                  <th>Rej</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="UFandROform.analysis_ro2_tds_rej"
                      :rules="[requiredRange('analysis_ro2_tds_rej')]"
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
                      v-model="UFandROform.analysis_ro2_ph_prod"
                      :rules="[requiredRange('analysis_ro2_tds_prod')]"
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
                      v-model="UFandROform.analysis_ro2_ph_rej"
                      :rules="[requiredRange('analysis_ro2_tds_rej')]"
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
                      v-model="UFandROform.analysis_ro1_orp"
                      :rules="[requiredRange('analysis_ro1_orp')]"
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
                      v-model="UFandROform.analysis_ro2_orp"
                      :rules="[requiredRange('analysis_ro2_orp')]"
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
        <div class="btns">
          <q-btn
            @click="UFandRoLogOnSubmit"
            class="q-pa-sm"
            color="primary"
            label="Submit"
          />
          <q-btn
            @click="UFandRoLogOnReset"
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
  name: "UFandROLog",
  data() {
    return {
      ...validations,
      date: "",
      shift:"",
      time: new Date().toLocaleTimeString(),
      options: ["Shift A", "Shift B", "Shift C"],
      UFandROform: {
        shift: "",
        analysis_uf_il:"",
        analysis_uf_ol:"",

        analysis_ro1_tds_il:"",
        analysis_ro1_tds_prod:"",
        analysis_ro1_tds_rej:"",

        analysis_ro1_ph_prod:"",
        analysis_ro1_ph_rej:"",

        analysis_ro2_tds_il:"",
        analysis_ro2_tds_prod:"",
        analysis_ro2_tds_rej:"",

        analysis_ro2_ph_prod:"",
        analysis_ro2_ph_rej:"",

        analysis_ro1_orp:"",
        analysis_ro2_orp:"",
        date: date.formatDate(Date.now(), "YYYY/MM/DD"),
        date_time: "",
        mfg1_il: "",
        mfg1_ol: "",
        mfg2_il: "",
        mfg2_ol: "",
        ultra_filter_pressure_feed: "",
        ultra_filter_pressure_prod: "",
        ultra_filter_pressure_rej: "",
        ultra_filter_flow_feed: "",
        ultra_filter_flow_prod: "",
        ultra_filter_flow_rej: "",
        ultra_filter_flow_rec: "",

        ro_first_pressure_feed: "",
        ro_first_pressure_prod: "",
        ro_first_pressure_rej: "",
        ro_first_flow_feed: "",
        ro_first_flow_prod: "",
        ro_first_flow_rej: "",
        ro_first_flow_rec: "",

        ro_second_pressure_feed: "",
        ro_second_pressure_prod: "",
        ro_second_pressure_rej: "",
        ro_second_flow_feed: "",
        ro_second_flow_prod: "",
        ro_second_flow_rej: "",
        ro_second_flow_rec: "",
      },
    };
  },

  mounted() {
    this.startClock();
  },

  methods: {
    getCurrentTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`; // Format time as HH:MM:SS
    },
    // Method to start the clock and update time every second
    startClock() {
      this.UFandROform.date_time = this.getCurrentTime(); // Set initial time
      setInterval(() => {
        this.UFandROform.date_time = this.getCurrentTime(); // Update time every second
      }, 1000); // Update every 1 second
    },

    async UFandRoLogOnSubmit() {
      console.log(this.UFandROform);
      console.log("Analysis Report:", this.UFandROform)
      const validate = await this.$refs.boilForm.validate();
    },

    UFandRoLogOnReset() {
      this.UFandROform = {
        date: date.formatDate(Date.now(), "YYYY/MM/DD"),
        date_time: "",
        mfg1_il: "",
        mfg1_ol: "",
        mfg2_il: "",
        mfg2_ol: "",
        ultra_filter_pressure_feed: "",
        ultra_filter_pressure_prod: "",
        ultra_filter_pressure_rej: "",
        ultra_filter_flow_feed: "",
        ultra_filter_flow_prod: "",
        ultra_filter_flow_rej: "",
        ultra_filter_flow_rec: "",

        ro_first_pressure_feed: "",
        ro_first_pressure_prod: "",
        ro_first_pressure_rej: "",
        ro_first_flow_feed: "",
        ro_first_flow_prod: "",
        ro_first_flow_rej: "",
        ro_first_flow_rec: "",

        ro_second_pressure_feed: "",
        ro_second_pressure_prod: "",
        ro_second_pressure_rej: "",
        ro_second_flow_feed: "",
        ro_second_flow_prod: "",
        ro_second_flow_rej: "",
        ro_second_flow_rec: "",
        shift: "",
        analysis_uf_il:"",
        analysis_uf_ol:"",

        analysis_ro1_tds_il:"",
        analysis_ro1_tds_prod:"",
        analysis_ro1_tds_rej:"",

        analysis_ro1_ph_prod:"",
        analysis_ro1_ph_rej:"",

        analysis_ro2_tds_il:"",
        analysis_ro2_tds_prod:"",
        analysis_ro2_tds_rej:"",

        analysis_ro2_ph_prod:"",
        analysis_ro2_ph_rej:"",

        analysis_ro1_orp:"",
        analysis_ro2_orp:""
      }

      this.$refs.boilForm.resetValidation();
    },
  },
};
</script>
<style></style>
