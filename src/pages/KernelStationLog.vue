<template>
  <q-page>
    <div class="title">
      <h4 class="text-center q-bold" style="position: relative">
        KERNEL STATION LOG SHEET
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
              <span class="input-text input-text-bl-frm">Unit : </span>
         <q-select
                outlined
                dense
                style="width:100%; margin-bottom: 20px"
                v-model="kernelStationForm[`UNIT`]"
                label="Unit"
                :options="unit_options"
                :rules="[required('unit')]"
              />
            </div>

            <div class="input-feilds">
              <span class="input-text input-text-bl-frm">Shift : </span
              ><q-select
                outlined
                dense
                style="width: 100%"
                v-model="kernelStationForm[`shift`]"
                :options="options"
                label="Shift"
                :rules="[required('shift')]"
              />
            </div>
          </div>
          <div class="line-tr"></div>
          <div class="right-container">
            <div class="input-feilds">
              <span class="input-text input-text-bl-frm">Date : </span
              ><q-input
                style="width: 55%"
                dense
                outlined
                v-model="kernelStationForm[`date`]"
                :rules="[required('date')]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="kernelStationForm[`date`]">
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
              <span class="input-text input-text-bl-frm">Time : </span>
              <q-input
                outlined
                dense
                style="width: 55%; margin-bottom: 20px"
                v-model="kernelStationForm[`dateTime`]"
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
                  <th colspan="1">De-stoner fan</th>
                  <th colspan="1">LTD Fan-1</th>
                  <th colspan="1">LTD Fan-2</th>
                  <th colspan="1">Shell tm.fan</th>
                </tr>
                <tr>
                  <th>Amps</th>
                  <th>Amps</th>
                  <th>Amps</th>
                  <th>Amps</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="kernelStationForm[`de_stoner_fan_amps`]"
                      :rules="[requiredRange('DeStonerfanAmps')]"
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
                      v-model="kernelStationForm[`ltds_fan1_amps`]"
                      :rules="[requiredRange('ltds_fan1_amps')]"
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
                      v-model="kernelStationForm[`ltds_fan2_amps`]"
                      :rules="[requiredRange('ltds_fan2_amps')]"
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
                      v-model="kernelStationForm[`shell_trn_fan`]"
                      :rules="[requiredRange('shell_trn_fan')]"
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
          <p class="text-center q-mt-sm">HYD CYCL PUMP</p>
        </div>
        <div class="flex flex-center">
          <div class="input-feilds q-ml-md q-mt-md">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th colspan="2">Hyd.Cycl.pump-1</th>
                </tr>
                <tr>
                  <th>Pressure</th>
                  <th>Amps</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="kernelStationForm[`hyd_cycl_pump1_pressure`]"
                      :rules="[requiredRange('hyd_cycl_pump1_pressure')]"
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
                      v-model="kernelStationForm[`hyd_cycl_pump1_amps`]"
                      :rules="[requiredRange('hyd_cycl_pump1_amps')]"
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
                  <th colspan="2">Hyd.Cycl.pump-2</th>
                </tr>
                <tr>
                  <th>Pressure</th>
                  <th>Amps</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="kernelStationForm[`hyd_cycl_pump2_pressure`]"
                      :rules="[requiredRange('hyd_cycl_pump2_pressure')]"
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
                      v-model="kernelStationForm[`hyd_cycl_pump2_amps`]"
                      :rules="[requiredRange('hyd_cycl_pump2_amps')]"
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
                  <th colspan="2">Hyd.Cycl.pump-3</th>
                </tr>
                <tr>
                  <th>Pressure</th>
                  <th>Amps</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="kernelStationForm[`hyd_cycl_pump3_pressure`]"
                      :rules="[requiredRange('hyd_cycl_pump3_pressure')]"
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
                      v-model="kernelStationForm[`hyd_cycl_pump3_amps`]"
                      :rules="[requiredRange('hyd_cycl_pump3_amps')]"
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
          <p class="text-center q-mt-sm">RIPPLE MILL/DRIER</p>
        </div>
        <div class="">
          <div class="flex flex-center">
            <div class="input-feilds q-ml-md q-mt-md">
              <table class="long-feilds">
                <thead>
                  <tr>
                    <th colspan="1">Ripple mill-1</th>
                    <th colspan="1">Ripple mill-2</th>
                    <th colspan="1">Ripple mill-3</th>
                  </tr>
                  <tr>
                    <th>Amps</th>
                    <th>Amps</th>
                    <th>Amps</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <q-input
                        style="width: 100px"
                        dense
                        v-model="kernelStationForm[`ripple_mill1_amps`]"
                        :rules="[requiredRange('ripple_mill1_amps')]"
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
                        v-model="kernelStationForm[`ripple_mill2_amps`]"
                        :rules="[requiredRange('ripple_mill2_amps')]"
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
                        v-model="kernelStationForm[`ripple_mill3_amps`]"
                        :rules="[requiredRange('ripple_mill3_amps')]"
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
                    <th colspan="1">Drier-1</th>
                    <th colspan="1">Drier-2</th>
                    <th colspan="1">Drier-3</th>
                  </tr>
                  <tr>
                    <th>Temp.</th>
                    <th>Temp.</th>
                    <th>Temp.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <q-input
                        style="width: 100px"
                        dense
                        v-model="kernelStationForm[`drier1_temp`]"
                        :rules="[requiredRange('drier1_temp')]"
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
                        v-model="kernelStationForm[`drier2_temp`]"
                        :rules="[requiredRange('drier2_temp')]"
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
                        v-model="kernelStationForm[`drier3_temp`]"
                        :rules="[requiredRange('drier3_temp')]"
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
                    <th colspan="1">Nut elev</th>
                    <th colspan="1">W.ker ele</th>
                    <th colspan="1">ker ele</th>
                    <th colspan="1">Conveyor</th>
                  </tr>
                  <tr>
                    <th>Amp</th>
                    <th>Amps</th>
                    <th>Amps</th>
                    <th>Amps</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <q-input
                        style="width: 100px"
                        dense
                        v-model="kernelStationForm[`nut_elev_amp`]"
                        :rules="[requiredRange('nut_elev_amp')]"
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
                        v-model="kernelStationForm[`w_ker_ele_amps`]"
                        :rules="[requiredRange('w.kerele')]"
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
                        v-model="kernelStationForm[`ker_ele_amps`]"
                        :rules="[requiredRange('kerele')]"
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
                        v-model="kernelStationForm[`conveyor_amps`]"
                        :rules="[requiredRange('hyd_cycl_pump3_amps')]"
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
        </div>

        <div class="flex flex-center" style="margin-top: 20px">
          <table class="long-feilds" style="width: 800px">
            <thead>
              <tr>
                <th colspan="1">Sl. No.</th>
                <th colspan="1">Starting Time</th>
                <th colspan="1">Stopping Time</th>
                <th colspan="1">Total Hours</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>

               
                <td>
                    <q-input
                      class="TwoTimeInpts"
                      label="Start Time"
                      dense
                      outlined
                      v-model="kernelStationForm.starting_time"
                      mask="time"
                      :rules="[required('field')]"
                      @click="showTimePicker1"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="timePopup1"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="kernelStationForm.starting_time">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
            
                  </td>

                  <td>
                    <q-input
                      class="TwoTimeInpts"
                      label="Stop Time"
                      dense
                      outlined
                      v-model="kernelStationForm.stoping_time"
                      mask="time"
                      :rules="[required('field')]"
                      @click="showTimePicker2"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="timePopup2"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="kernelStationForm.stoping_time">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
            
                  </td>
                  <td>
                    <q-input
                      style="flex: 1; min-width: 100px; margin-right: 5px"
                      dense
                      v-model="kernelStationForm[`total_hours`]"
                      :rules="[requiredRange('Total Hours')]"
                      type="number"
                      outlined
                      label="Hours"
                      :min="0"
                    />
                  </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="flex flex-center"
          style="margin-top: 20px; overflow-x: auto"
        >
          <table
            class="long-feilds"
            style="width: 100%; min-width: 300px; table-layout: auto"
          >
            <thead>
              <tr>
                <th colspan="3">Break down hours</th>
                <th rowspan="2">Reason / Rectification</th>
              </tr>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Hours</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div style="display: flex; justify-content: space-between">
                  
                    <q-input
                      class="TwoTimeInpts"
                      style="flex: 1; min-width: 100px; margin-right: 5px"
                      label="From"
                      dense
                      outlined
                      v-model="kernelStationForm.break_down_hours_from"
                      mask="time"
                      :rules="[required('field')]"
                      @click="showTimePicker3"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="timePopup3"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="kernelStationForm.break_down_hours_from">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
            
                  </div>
                </td>
                <td>
                  <div style="display: flex; justify-content: space-between">
                    
                    <q-input
                      class="TwoTimeInpts"
                      label="To"
                      dense
                      outlined
                      style="flex: 1; min-width: 100px; margin-right: 5px"
                      v-model="kernelStationForm.break_down_hours_to"
                      mask="time"
                      :rules="[required('field')]"
                      @click="showTimePicker4"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="timePopup4"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="kernelStationForm.break_down_hours_to">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
            

                  
                  </div>
                </td>
                <td>
                  <div style="display: flex; justify-content: space-between">
                    <q-input
                      style="flex: 1; min-width: 100px; margin-right: 5px"
                      dense
                      v-model="kernelStationForm[`break_down_hours`]"
                      :rules="[requiredRange('Break Down Hours')]"
                      type="number"
                      outlined
                      label="Hours"
                      :min="0"
                    />
                  </div>
                </td>
                <td>
                  <textarea
                    style="width: 100%"
                    v-model="kernelStationForm[`reason_or_rectification`]"
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="input-container"
          style="
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-top: 22px;
          "
        >
          <div class="input-field">
            <span>Prepaid:</span>
            <q-input v-model="kernelStationForm[`prepaid`]" dense outlined />
          </div>
          <div class="input-field">
            <span>Checked:</span>
            <q-input v-model="kernelStationForm[`checked`]" dense outlined />
          </div>
          <div class="input-field">
            <span>Authorised:</span>
            <q-input v-model="kernelStationForm[`authorised`]" dense outlined />
          </div>
        </div>

        <div class="btns">
          <q-btn
            @click="PressStationLogOnSubmit"
            class="q-pa-sm"
            color="primary"
            label="Submit"
          />
          <q-btn
            @click="PressStationLogOnReset"
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
  name: "KernelStationLog",
  data() {
    return {
      ...validations,
      shift: "",
      date: "",
      options: ["Shift A", "Shift B", "Shift C"],
      unit_options: ["I", "II"],
      time: new Date().toLocaleTimeString(),
      kernelStationForm: {
        date: date.formatDate(Date.now(), "YYYY/MM/DD"),
        dateTime: "",
        UNIT: "",
        de_stoner_fan_amps: "",
        ltds_fan1_amps: "",
        ltds_fan2_amps: "",
        shell_trn_fan: "",
        hyd_cycl_pump1_pressure: "",
        hyd_cycl_pump1_amps: "",
        hyd_cycl_pump2_pressure: "",
        hyd_cycl_pump2_amps: "",
        hyd_cycl_pump3_pressure: "",
        hyd_cycl_pump3_amps: "",
        ripple_mill1_amps: "",
        ripple_mill2_amps: "",
        ripple_mill3_amps: "",
        drier1_temp: "",
        drier2_temp: "",
        drier3_temp: "",
        nut_elev_amp: "",
        w_ker_ele_amps: "",
        ker_ele_amps: "",
        conveyor_amps: "",
        stoping_time: "",
        starting_time: "",
        total_hours:"",
        reason_or_rectification: "",
        authorised: "",
        checked: "",
        prepaid: "",
        break_down_hours_from: "",
        break_down_hours_to: "",
        break_down_hours: "",
      },
    };
  },
  created() {},
  mounted() {
    this.startClock();
  },
  methods: {
    ...mapActions("indexedDb", ["initDB"]),
    ...mapActions("indexedDb", ["synckernelStationFormData"]),
    ...mapActions("indexedDb", ["clearkernelStationFormIndexedDB"]),

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

    getCurrentTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`; // Format time as HH:MM:SS
    },
    // Method to start the clock and update time every second
    startClock() {
      this.kernelStationForm.dateTime = this.getCurrentTime(); // Set initial time
      setInterval(() => {
        this.kernelStationForm.dateTime = this.getCurrentTime(); // Update time every second
      }, 1000); // Update every 1 second
    },

    async PressStationLogOnSubmit() {
      let userDetailsData = JSON.parse(localStorage.getItem("userDetails"));

      const TotalPressStationLogDetails = {
        ...this.kernelStationForm,
        ...userDetailsData,
      };
      console.log("TotalPressStationLogDetails ", TotalPressStationLogDetails);

      const validate = await this.$refs.boilForm.validate();
    },

    PressStationLogOnReset() {
      this.kernelStationForm = {
        UNIT: "",
        de_stoner_fan_amps: "",
        ltds_fan1_amps: "",
        ltds_fan2_amps: "",
        shell_trn_fan: "",
        hyd_cycl_pump1_pressure: "",
        hyd_cycl_pump1_amps: "",
        hyd_cycl_pump2_pressure: "",
        hyd_cycl_pump2_amps: "",
        hyd_cycl_pump3_pressure: "",
        hyd_cycl_pump3_amps: "",
        ripple_mill1_amps: "",
        ripple_mill2_amps: "",
        ripple_mill3_amps: "",
        drier1_temp: "",
        drier2_temp: "",
        drier3_temp: "",
        nut_elev_amp: "",
        w_ker_ele_amps: "",
        ker_ele_amps: "",
        conveyor_amps: "",
        stoping_time: "",
        starting_time: "",
        reason_or_rectification: "",
        authorised: "",
        checked: "",
        prepaid: "",
        break_down_hours_from: "",
        break_down_hours_to: "",
        break_down_hours: "",
      };
    },

    // sync process methods

    PressStationDataSaveToIndexedDB(data) {
      const transactionPressStation = this.db.transaction(
        ["kernelStationFormData"],
        "readwrite"
      );
      const objectStore = transactionPressStation.objectStore(
        "kernelStationFormData"
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

      this.PressStationLogOnReset();
    },

    async syncPressStationData() {
      if (!this.db) {
        console.error("Database not initialized");
        await this.initDB();
      }
      this.synckernelStationFormData();
    },
  },
};
</script>
