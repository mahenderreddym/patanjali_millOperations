<template>
    <q-page class="SterPage">
      <div>
        <div class="title">
          <h4 class="text-center q-bold">View Reports</h4>
        </div>
        <div>
          <q-form class="q-pa-md" ref="reportForm">
            <div
              style="display: flex; flex-direction: row; justify-content: start"
              class="q-gutter-md"
            >
              <q-select
                dense
                options-dense
                outlined
                use-input
                hide-selected
                fill-input
                style="width: 30vw"
                option-value="value"
                option-label="label"
                :options="differentReport"
                v-model="report.reportName"
                label="Select Report"
                label-color="black"
                class="col-4 q-mr-sm"
                @input="loadSelectData()"
                ><template v-slot:prepend>
                  <q-icon name="assignment" color="secondary" /> </template
              ></q-select>
              <q-input
                dense
                outlined
                debounce="300"
                label="from Date"
                ref="checkFromDate"
                label-color="black"
                clear-icon="close"
                minimal
                @click="$refs.qDateProxyFromDate.show()"
                v-model="report.fromDate"
                style="width: 20vw"
                :rules="[required('Date')]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxyFromDate"
                      minimal
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        @input="closeDialog()"
                        minimal
                        mask="YYYY/MM/DD"
                        v-model="report.fromDate"
                        :options="optionsFn"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            minimal
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
  
              <q-input
                dense
                outlined
                debounce="300"
                label="To Date"
                ref="checkFromDate"
                label-color="black"
                clear-icon="close"
                minimal
                @click="$refs.qDateProxyFromDate2.show()"
                v-model="report.toDate"
                style="width: 20vw"
                :rules="[required('Date')]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxyFromDate2"
                      minimal
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        @input="closeDialog2()"
                        minimal
                        mask="YYYY/MM/DD"
                        v-model="report.toDate"
                        :options="optionsFn2"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            minimal
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <div>
                <q-btn
                  @click="loadReportWiseData"
                  style="margin-right: 10px"
                  color="secondary"
                  label="Submit"
                  class="q-ml-md text-bold bg-primary"
                  no-caps
                />
              </div>
            </div>
          </q-form>
  
          <!-- {{sterlisation_Station_Log_Data}} -->
          <!-- {{sterilisation_log_report_data }} -->
          <q-card flat class="bordered">
            <q-card-section>
            
              <div
                v-if="
                  report.reportName.value === 'Turbine Log Report' &&
                  turbine_log_report_data.length
                "
              >
                <div class="row col-12">
                  <span class="col-4 text-bold"
                    >Employee Name :
                    <span style="color: blue" class="text-bold">{{
                      this.turbine_log_report_data[0].emp_name
                    }}</span></span
                  >
                  <span class="col-4 text-bold"
                    >Plant Name :
                    <span style="color: blue" class="text-bold">{{
                      this.turbine_log_report_data[0].plant_name
                    }}</span></span
                  >
                  <span class="col-4 text-bold"
                    >State :
                    <span style="color: blue" class="text-bold">{{
                      this.turbine_log_report_data[0].state_name
                    }}</span></span
                  >
                </div>
                <q-table
                  :title="title2"
                  style="font-family: verdana"
                  :data="turbine_log_report_data"
                  :columns="turbine_log_columns"
                  dense
                  :filter="filter"
                  :pagination.sync="pagination"
                  separator="cell"
                  row-key="sno"
                  :grid="mode === 'grid'"
                  color="green"
                  wrap-cells
                  :hide-header="mode === 'grid'"
                >
                  <template v-slot:top-right="props">
                    <q-input
                      outlined
                      dense
                      debounce="300"
                      v-model="filter"
                      placeholder="Search"
                      style="width: 20vw"
                    >
                      <template v-slot:append>
                        <q-icon name="search" />
                      </template>
                    </q-input>
  
                    <q-btn
                      flat
                      round
                      dense
                      :icon="
                        props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'
                      "
                      @click="props.toggleFullscreen"
                      v-if="mode === 'list'"
                    >
                      <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
                        >{{
                          props.inFullscreen
                            ? "Exit Fullscreen"
                            : "Toggle Fullscreen"
                        }}
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      flat
                      round
                      dense
                      :icon="mode === 'grid' ? 'list' : 'grid_on'"
                      @click="
                        mode = mode === 'grid' ? 'list' : 'grid';
                        separator = mode === 'grid' ? 'none' : 'horizontal';
                      "
                      v-if="!props.inFullscreen"
                    >
                      <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
                        >{{ mode === "grid" ? "List" : "Grid" }}
                      </q-tooltip>
                    </q-btn>
                  </template>
  
                  <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                      <q-btn
                        color="secondary"
                        @click="viewTurbineDataItem(props.row)"
                        icon="las la-eye"
                        size="sm"
                        ><q-tooltip :disable="$q.platform.is.mobile"
                          >View</q-tooltip
                        ></q-btn
                      >
                    </q-td>
                  </template>
                </q-table>
              </div>
              <div
                v-if="
                  (report.reportName.value === 'Turbine Log Report' &&
                    turbine_log_report_data.length === 0)
                "
                class="justify-center items-center row col-12"
                style="height: 60vh"
              >
                <q-img
                  src="../../public/DataNotFound.png"
                  alt="data not found image"
                  style="height: 200px; width: 200px"
                />
              </div>
            </q-card-section>
          </q-card>
       

          <!-- view turbine log report  -->
  
          <q-dialog
            v-model="turbineDataDialog"
            persistent
            :maximized="maximizedToggle"
            transition-show="slide-up"
            transition-hide="slide-down"
          >
            <q-layout view="Lhh lpr fff" container class="bg-white">
              <q-header class="bg-primary">
                <q-bar class="bg-primary text-white">
                  <q-icon name="feed"></q-icon>
                  <div style="font-family: verdana">Turbine Log Details</div>
                  <q-space />
                  <q-btn dense flat icon="close" @click="closeTurbineDialog()">
                    <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                  </q-btn>
                </q-bar>
              </q-header>
  
              <!-- Include a QPageContainer and QPage if necessary -->
              <q-page-container>
                <q-page class="q-pa-md">
                  <!-- Your content goes here -->
  
                  <div class="title">
                    <h4 class="text-center q-bold">Turbine Log Sheet</h4>
                  </div>
                  <div
                    style="
                      display: flex;
                      flex-direction: row;
                      justify-content: flex-end;
                    "
                  >
                    <span class="q-ma-sm text-bold text-h6"> View</span>
                    <q-toggle
                      v-model="turbineToggle"
                      checked-icon="check"
                      color="red"
                      unchecked-icon="clear"
                      size="lg"
                    />
                    <span class="q-ma-sm text-bold text-h6"> Edit</span>
                  </div>
                  <div v-if="!turbineToggle" class="container">
                    <q-form
                      class="trblgFrm"
                      @submit.prevent.stop="onUpdateTurbineLog"
                      @reset="TurbineLogOnReset"
                    >
                      <div class="split-container">
                        <div class="left-container" style="width: 50%">
                          <div class="input-feilds">
                            <span class="input-text input-text-trb-frm"
                              >Date : </span
                            ><q-input
                              readonly
                              style="width: 40%"
                              dense
                              outlined
                              v-model="viewTurbineData.date"
                              :rules="[
                                'date',
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                            >
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date
                                      readonly
                                      v-model="viewTurbineData.date"
                                    >
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
                            <span class="input-text input-text-trb-frm"
                              >Shift : </span
                            ><q-select
                              readonly
                              outlined
                              dense
                              style="width: 40%; margin-bottom: 20px"
                              v-model="viewTurbineData.shift"
                              :options="shiftOptions"
                              label="Shift"
                            />
                          </div>
                          <div class="input-feilds" style="width: 100%">
                            <span class="input-text input-text-trb-frm"
                              >Time :</span
                            ><q-input
                              readonly
                              style="width: 40%"
                              label="Time"
                              dense
                              outlined
                              v-model="viewTurbineData.time"
                              mask="time"
                              :rules="[
                                'time',
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                            >
                              <template v-slot:append>
                                <q-icon name="access_time" class="cursor-pointer">
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-time
                                      readonly
                                      v-model="viewTurbineData.time"
                                    >
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
                          <div class="input-feilds">
                            <span
                              class="input-text input-text-trb-frm"
                              style="padding-top: 4px"
                              >Speed(RPM) : </span
                            ><q-input
                              readonly
                              style="margin-top: 10px; width: 40%"
                              dense
                              v-model="viewTurbineData.speed_rpm"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Speed(RPM)"
                            />
                          </div>
                          <div class="input-feilds">
                            <span class="input-text input-text-trb-frm"
                              >Load (KW) : </span
                            ><q-input
                              readonly
                              style="width: 40%"
                              dense
                              v-model="viewTurbineData.load_kw"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Load (KW)"
                            />
                          </div>
                          <div class="input-feilds">
                            <span
                              class="input-text text-wd-hev"
                              style="padding-top: 4px"
                              >Inlet Steam Temp (Deg C) : </span
                            ><q-input
                              readonly
                              style="margin-top: 10px; width: 20%"
                              dense
                              v-model="viewTurbineData.inlet_steam_temp"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Input"
                            />
                          </div>
                          <div class="input-feilds">
                            <span class="input-text text-wd-hev"
                              >Inlet Steam Pfe. (kg/cm2) : </span
                            ><q-input
                              readonly
                              style="width: 20%"
                              dense
                              v-model="viewTurbineData.inlet_steam_pre"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Input"
                            />
                          </div>
                        </div>
                        <div class="line-tr"></div>
                        <div
                          class="right-container"
                          style="width: 50%; margin-left: 20px"
                        >
                          <div class="input-feilds">
                            <span class="input-text text-wd-hev"
                              >Intet Steam flow (TPH) : </span
                            ><q-input
                              readonly
                              style="width: 20%"
                              dense
                              v-model="viewTurbineData.inlet_steam_flow"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Input"
                            />
                          </div>
                          <div class="input-feilds">
                            <span class="input-text text-wd-hev"
                              >Lub Oil Pre. (kg/cm2) : </span
                            ><q-input
                              readonly
                              style="width: 20%"
                              dense
                              v-model="viewTurbineData.lub_oil_pre"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Input"
                            />
                          </div>
                          <div class="input-feilds">
                            <span class="input-text text-wd-hev"
                              >Control Oil Pre. (kg/cm2) : </span
                            ><q-input
                              readonly
                              style="width: 20%"
                              dense
                              v-model="viewTurbineData.control_oil_pre"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Input"
                            />
                          </div>
                          <div class="input-feilds">
                            <span class="input-text text-wd-hev"
                              >Trip Oil Pre. (kg/cm2) : </span
                            ><q-input
                              readonly
                              style="width: 20%"
                              dense
                              v-model="viewTurbineData.trip_oil_pre"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Input"
                            />
                          </div>
                          <div class="input-feilds">
                            <span class="input-text text-wd-hev"
                              >Chust pres. (Kg/cm2) : </span
                            ><q-input
                              readonly
                              style="width: 20%"
                              dense
                              v-model="viewTurbineData.chust_pre"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Input"
                            />
                          </div>
                          <div class="input-feilds">
                            <span class="input-text text-wd-hev"
                              >Exhaust Stem pipe (Kg/cm2) : </span
                            ><q-input
                              readonly
                              style="width: 20%"
                              dense
                              v-model="viewTurbineData.exhaust_stem_pipe"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Input"
                            />
                          </div>
                          <div class="input-feilds">
                            <span class="input-text text-wd-hev"
                              >Exhaust Stem Temp (DegC) : </span
                            ><q-input
                              readonly
                              style="width: 20%"
                              dense
                              v-model="viewTurbineData.exhaust_stem_temp"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Input"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="subtitle">
                        <p class="text-center q-mt-sm">
                          GEAR BOX BEARING TEMPRATURE
                        </p>
                      </div>
                      <div class="flex flex-center">
                        <div class="input-feilds q-mt-sm">
                          <span class="input-text text-wd-hev"
                            >Thrust Wear Pres. (Kg/cm2) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewTurbineData.gb_thrust_wear_pre"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev"
                            >HP Casing Vibra (mm/sec) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewTurbineData.gb_hp_casing_vibra"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev"
                            >LP Casing Vibra (mm/sec) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewTurbineData.gb_lp_casing_vibra"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds TurbineLogTableContainer">
                          <table class="long-feilds turbineLogTableContent">
                            <thead>
                              <tr>
                                <th>H.P (Deg C)</th>
                                <th>L.P (Deg C)</th>
                                <th>P.F (Deg C)</th>
                                <th>P.A (Deg C)</th>
                                <th>G.F (Deg C)</th>
                                <th>G.R (Deg C)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <q-input
                                    readonly
                                    style="width: 100px"
                                    dense
                                    v-model="viewTurbineData.gb_hp_degc"
                                    :rules="[
                                      (val) =>
                                        (val && val.length > 0) ||
                                        'Required field',
                                    ]"
                                    type="number"
                                    outlined
                                    label="Input"
                                  />
                                </td>
                                <td>
                                  <q-input
                                    readonly
                                    style="width: 100px"
                                    dense
                                    v-model="viewTurbineData.gb_lp_degc"
                                    :rules="[
                                      (val) =>
                                        (val && val.length > 0) ||
                                        'Required field',
                                    ]"
                                    type="number"
                                    outlined
                                    label="Input"
                                  />
                                </td>
                                <td>
                                  <q-input
                                    readonly
                                    style="width: 100px"
                                    dense
                                    v-model="viewTurbineData.gb_pf_degc"
                                    :rules="[
                                      (val) =>
                                        (val && val.length > 0) ||
                                        'Required field',
                                    ]"
                                    type="number"
                                    outlined
                                    label="Input"
                                  />
                                </td>
                                <td>
                                  <q-input
                                    readonly
                                    style="width: 100px"
                                    dense
                                    v-model="viewTurbineData.gb_pa_degc"
                                    :rules="[
                                      (val) =>
                                        (val && val.length > 0) ||
                                        'Required field',
                                    ]"
                                    type="number"
                                    outlined
                                    label="Input"
                                  />
                                </td>
                                <td>
                                  <q-input
                                    readonly
                                    style="width: 100px"
                                    dense
                                    v-model="viewTurbineData.gb_gf_degc"
                                    :rules="[
                                      (val) =>
                                        (val && val.length > 0) ||
                                        'Required field',
                                    ]"
                                    type="number"
                                    outlined
                                    label="Input"
                                  />
                                </td>
                                <td>
                                  <q-input
                                    readonly
                                    style="width: 100px"
                                    dense
                                    v-model="viewTurbineData.gb_gr_degc"
                                    :rules="[
                                      (val) =>
                                        (val && val.length > 0) ||
                                        'Required field',
                                    ]"
                                    type="number"
                                    outlined
                                    label="Input"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev"
                            >Lube Oil coller Before (Deg C) : </span
                          ><q-input
                            readonly
                            style="width: 20%; margin-top: 10px"
                            dense
                            v-model="viewTurbineData.gb_lube_oil_coller_before"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev"
                            >Lube Oil coller After (Deg C) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewTurbineData.gb_lube_oil_coller_after"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev"
                            >Differ Pre. (Deg C) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewTurbineData.gb_differ_pre"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev"
                            >ALT DE (Deg C) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewTurbineData.gb_alt_de"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev"
                            >ALT NDE (Deg C) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewTurbineData.gb_alt_nde"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                      </div>
                      <div class="subtitle">
                        <p class="text-center q-mt-sm">Water</p>
                      </div>
                      <div class="flex flex-center">
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev"
                            >Water Pressure (Kg/cm2) : </span
                          ><q-input
                            readonly
                            style="width: 20%; margin-top: 10px"
                            dense
                            v-model="viewTurbineData.water_pre"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev"
                            >Water Inlet Temp (Deg C) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewTurbineData.water_inlet_temp"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev">
                            Water Outlet Temp (Deg C) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewTurbineData.water_outlet_temp"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text">Remarks : </span
                          ><q-input
                            outlined
                            readonly
                            dense
                            v-model="viewTurbineData.remarks"
                            type="textarea"
                            float-label="Textarea"
                            :max-height="10"
                            :min-rows="2"
                            style="width: 70%; margin-left: 28px"
                          />
                        </div>
                        <div class="btns" style="margin-left: 15%">
                          <q-btn
                            disable
                            @click="onUpdateTurbineLog"
                            class="q-pa-sm q-ml-xl"
                            color="primary"
                            label="Submit"
                          />
                          <q-btn
                            disable
                            @click="TurbineLogOnReset"
                            class="q-pa-xsm"
                            style="margin-left: 10px"
                            color="secondary"
                            label="Reset"
                          />
                        </div>
                      </div>
                    </q-form>
                  </div>
  
                  <div v-if="turbineToggle" class="container">
                    <q-form
                      ref="turbineForm"
                      class="trblgFrm"
                      @submit.prevent.stop="onUpdateTurbineLog"
                      @reset="TurbineLogOnReset"
                    >
                      <div class="split-container">
                        <div class="left-container" style="width: 50%">
                          <div class="input-feilds">
                            <span class="input-text input-text-trb-frm"
                              >Date : </span
                            ><q-input
                              style="width: 40%"
                              dense
                              outlined
                              v-model="editTurbineData.turbineDate"
                              :rules="[
                                'date',
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                            >
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-date v-model="editTurbineData.turbineDate">
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
                            <span class="input-text input-text-trb-frm"
                              >Shift : </span
                            ><q-select
                              outlined
                              dense
                              style="width: 40%; margin-bottom: 20px"
                              v-model="editTurbineData.shift"
                              :options="shiftOptions"
                              label="Shift"
                            />
                          </div>
                          <div class="input-feilds" style="width: 100%">
                            <span class="input-text input-text-trb-frm"
                              >Time :</span
                            ><q-input
                              style="width: 40%"
                              label="Time"
                              dense
                              outlined
                              v-model="editTurbineData.time"
                              mask="time"
                              :rules="[
                                'time',
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                            >
                              <template v-slot:append>
                                <q-icon name="access_time" class="cursor-pointer">
                                  <q-popup-proxy
                                    cover
                                    transition-show="scale"
                                    transition-hide="scale"
                                  >
                                    <q-time v-model="editTurbineData.time">
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
                          <div class="input-feilds">
                            <span
                              class="input-text input-text-trb-frm"
                              style="padding-top: 4px"
                              >Speed(RPM) : </span
                            ><q-input
                              style="margin-top: 10px; width: 40%"
                              dense
                              v-model="editTurbineData.speed_rpm"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Speed(RPM)"
                            />
                          </div>
                          <div class="input-feilds">
                            <span class="input-text input-text-trb-frm"
                              >Load (KW) : </span
                            ><q-input
                              style="width: 40%"
                              dense
                              v-model="editTurbineData.load_kw"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Load (KW)"
                            />
                          </div>
                          <div class="input-feilds">
                            <span
                              class="input-text text-wd-hev"
                              style="padding-top: 4px"
                              >Inlet Steam Temp (Deg C) : </span
                            ><q-input
                              style="margin-top: 10px; width: 20%"
                              dense
                              v-model="editTurbineData.inlet_steam_temp"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Input"
                            />
                          </div>
                          <div class="input-feilds">
                            <span class="input-text text-wd-hev"
                              >Inlet Steam Pfe. (kg/cm2) : </span
                            ><q-input
                              style="width: 20%"
                              dense
                              v-model="editTurbineData.inlet_steam_pre"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Input"
                            />
                          </div>
                        </div>
                        <div class="line-tr"></div>
                        <div
                          class="right-container"
                          style="width: 50%; margin-left: 20px"
                        >
                          <div class="input-feilds">
                            <span class="input-text text-wd-hev"
                              >Intet Steam flow (TPH) : </span
                            ><q-input
                              style="width: 20%"
                              dense
                              v-model="editTurbineData.inlet_steam_flow"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Input"
                            />
                          </div>
                          <div class="input-feilds">
                            <span class="input-text text-wd-hev"
                              >Lub Oil Pre. (kg/cm2) : </span
                            ><q-input
                              style="width: 20%"
                              dense
                              v-model="editTurbineData.lub_oil_pre"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Input"
                            />
                          </div>
                          <div class="input-feilds">
                            <span class="input-text text-wd-hev"
                              >Control Oil Pre. (kg/cm2) : </span
                            ><q-input
                              style="width: 20%"
                              dense
                              v-model="editTurbineData.control_oil_pre"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Input"
                            />
                          </div>
                          <div class="input-feilds">
                            <span class="input-text text-wd-hev"
                              >Trip Oil Pre. (kg/cm2) : </span
                            ><q-input
                              style="width: 20%"
                              dense
                              v-model="editTurbineData.trip_oil_pre"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Input"
                            />
                          </div>
                          <div class="input-feilds">
                            <span class="input-text text-wd-hev"
                              >Chust pres. (Kg/cm2) : </span
                            ><q-input
                              style="width: 20%"
                              dense
                              v-model="editTurbineData.chust_pre"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Input"
                            />
                          </div>
                          <div class="input-feilds">
                            <span class="input-text text-wd-hev"
                              >Exhaust Stem pipe (Kg/cm2) : </span
                            ><q-input
                              style="width: 20%"
                              dense
                              v-model="editTurbineData.exhaust_stem_pipe"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Input"
                            />
                          </div>
                          <div class="input-feilds">
                            <span class="input-text text-wd-hev"
                              >Exhaust Stem Temp (DegC) : </span
                            ><q-input
                              style="width: 20%"
                              dense
                              v-model="editTurbineData.exhaust_stem_temp"
                              :rules="[
                                (val) =>
                                  (val && val.length > 0) || 'Required field',
                              ]"
                              type="number"
                              outlined
                              label="Input"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="subtitle">
                        <p class="text-center q-mt-sm">
                          GEAR BOX BEARING TEMPRATURE
                        </p>
                      </div>
                      <div class="flex flex-center">
                        <div class="input-feilds q-mt-sm">
                          <span class="input-text text-wd-hev"
                            >Thrust Wear Pres. (Kg/cm2) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editTurbineData.gb_thrust_wear_pre"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev"
                            >HP Casing Vibra (mm/sec) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editTurbineData.gb_hp_casing_vibra"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev"
                            >LP Casing Vibra (mm/sec) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editTurbineData.gb_lp_casing_vibra"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds TurbineLogTableContainer">
                          <table class="long-feilds turbineLogTableContent">
                            <thead>
                              <tr>
                                <th>H.P (Deg C)</th>
                                <th>L.P (Deg C)</th>
                                <th>P.F (Deg C)</th>
                                <th>P.A (Deg C)</th>
                                <th>G.F (Deg C)</th>
                                <th>G.R (Deg C)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <q-input
                                    style="width: 100px"
                                    dense
                                    v-model="editTurbineData.gb_hp_degc"
                                    :rules="[
                                      (val) =>
                                        (val && val.length > 0) ||
                                        'Required field',
                                    ]"
                                    type="number"
                                    outlined
                                    label="Input"
                                  />
                                </td>
                                <td>
                                  <q-input
                                    style="width: 100px"
                                    dense
                                    v-model="editTurbineData.gb_lp_degc"
                                    :rules="[
                                      (val) =>
                                        (val && val.length > 0) ||
                                        'Required field',
                                    ]"
                                    type="number"
                                    outlined
                                    label="Input"
                                  />
                                </td>
                                <td>
                                  <q-input
                                    style="width: 100px"
                                    dense
                                    v-model="editTurbineData.gb_pf_degc"
                                    :rules="[
                                      (val) =>
                                        (val && val.length > 0) ||
                                        'Required field',
                                    ]"
                                    type="number"
                                    outlined
                                    label="Input"
                                  />
                                </td>
                                <td>
                                  <q-input
                                    style="width: 100px"
                                    dense
                                    v-model="editTurbineData.gb_pa_degc"
                                    :rules="[
                                      (val) =>
                                        (val && val.length > 0) ||
                                        'Required field',
                                    ]"
                                    type="number"
                                    outlined
                                    label="Input"
                                  />
                                </td>
                                <td>
                                  <q-input
                                    style="width: 100px"
                                    dense
                                    v-model="editTurbineData.gb_gf_degc"
                                    :rules="[
                                      (val) =>
                                        (val && val.length > 0) ||
                                        'Required field',
                                    ]"
                                    type="number"
                                    outlined
                                    label="Input"
                                  />
                                </td>
                                <td>
                                  <q-input
                                    style="width: 100px"
                                    dense
                                    v-model="editTurbineData.gb_gr_degc"
                                    :rules="[
                                      (val) =>
                                        (val && val.length > 0) ||
                                        'Required field',
                                    ]"
                                    type="number"
                                    outlined
                                    label="Input"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev"
                            >Lube Oil coller Before (Deg C) : </span
                          ><q-input
                            style="width: 20%; margin-top: 10px"
                            dense
                            v-model="editTurbineData.gb_lube_oil_coller_before"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev"
                            >Lube Oil coller After (Deg C) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editTurbineData.gb_lube_oil_coller_after"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev"
                            >Differ Pre. (Deg C) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editTurbineData.gb_differ_pre"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev"
                            >ALT DE (Deg C) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editTurbineData.gb_alt_de"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev"
                            >ALT NDE (Deg C) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editTurbineData.gb_alt_nde"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                      </div>
                      <div class="subtitle">
                        <p class="text-center q-mt-sm">Water</p>
                      </div>
                      <div class="flex flex-center">
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev"
                            >Water Pressure (Kg/cm2) : </span
                          ><q-input
                            style="width: 20%; margin-top: 10px"
                            dense
                            v-model="editTurbineData.water_pre"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev"
                            >Water Inlet Temp (Deg C) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editTurbineData.water_inlet_temp"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text text-wd-hev">
                            Water Outlet Temp (Deg C) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editTurbineData.water_outlet_temp"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required field',
                            ]"
                            type="number"
                            outlined
                            label="Input"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text">Remarks : </span
                          ><q-input
                            outlined
                            dense
                            v-model="editTurbineData.remarks"
                            type="textarea"
                            float-label="Textarea"
                            :max-height="10"
                            :min-rows="2"
                            style="width: 70%; margin-left: 28px"
                          />
                        </div>
                        <div class="btns" style="margin-left: 15%">
                          <q-btn
                            @click="onUpdateTurbineLog"
                            class="q-pa-sm q-ml-xl"
                            color="primary"
                            label="Submit"
                          />
                          <q-btn
                            @click="TurbineLogOnReset"
                            class="q-pa-xsm"
                            style="margin-left: 10px"
                            color="secondary"
                            label="Reset"
                          />
                        </div>
                      </div>
                    </q-form>
                  </div>
                </q-page>
              </q-page-container>
            </q-layout>
          </q-dialog>
        </div>
      </div>
    </q-page>
  </template>
  
  <script>
  import { mapActions, mapState } from "vuex";
  import { date, Notify } from "quasar";
  import moment from "moment";
  import validations from "src/helpers/validations";
  export default {
    name: "ViewReports",
    data() {
      return {
        title1: "Sterilisation Station Log Details",
        title2: "Turbine Log Details",
        title3: "Boiler Log Details",
        title4: "Shift Log Details",
        fourth: false,
        pagination: {
          rowsPerPage: 10,
          page: 1,
        },
        turbineToggle: false,
        mmr: false,
        ...validations,
        UserInfo: {},
        differentReport: [ 
          { label: "Turbine Log Report", value: "Turbine Log Report" },
        ],
        report: {
          reportName: "",
          fromDate: "",
          toDate: "",
        },
        data: [],
        filter: "",
        excel_date: moment(new Date()).format("DD/MM/YYYY"),
  
        optionsFn(d) {
          return d <= date.formatDate(Date.now(), "YYYY/MM/DD");
        },
        optionsFn2(d) {
          return d <= date.formatDate(Date.now(), "YYYY/MM/DD");
        },
        mode: "list",
        table1: false,
        table2: false,
        table3: false,
        table4: false,
        viewSterilisationData: {},
        viewSterilisationDataIndex: -1,
        sterilisationDataDialog: false,
        editSterilisationDataDialog: false,
        editSterilisationDataIndex: -1,
        maximizedToggle: true,
  
        shiftOptions: ["A", "B", "C"],
        unitOptions: ["I", "II", "III"],
  
        SterOptions: ["Sterilizer 1", "Sterilizer 2", "Sterilizer 3"],
        NoOfCagesOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        sterFormDate: date.formatDate(Date.now(), "YYYY/MM/DD"),
        turbineDate: date.formatDate(Date.now(), "YYYY/MM/DD"),
        editTurbineData: {
          sno: "",
          turbineDate: "",
          time: "",
          shift: "",
          speed_rpm: "",
          load_kw: "",
          inlet_steam_temp: "",
          inlet_steam_pre: "",
          inlet_steam_flow: "",
          lub_oil_pre: "",
          control_oil_pre: "",
          trip_oil_pre: "",
          chust_pre: "",
          exhaust_stem_pipe: "",
          exhaust_stem_temp: "",
          gb_thrust_wear_pre: "",
          gb_hp_casing_vibra: "",
          gb_lp_casing_vibra: "",
          gb_hp_degc: "",
          gb_lp_degc: "",
          gb_pf_degc: "",
          gb_pa_degc: "",
          gb_gf_degc: "",
          gb_gr_degc: "",
          gb_lube_oil_coller_before: "",
          gb_lube_oil_coller_after: "",
          gb_differ_pre: "",
          gb_alt_de: "",
          gb_alt_nde: "",
          water_pre: "",
          water_inlet_temp: "",
          water_outlet_temp: "",
          remarks: "",
        },
        viewTurbineData: {},
        viewTurbineDataIndex: {},
        turbineDataDialog: false,
        viewDataItem: [],
      
      };
    },
    created() {
      this.UserInfo = this.GetUserInfo();
    },
    computed: {
      ...mapState({
        turbine_log_report_data: (state) => state.reports.turbine_log_report_data,
        turbine_log_columns: (state) => state.reports.turbine_log_columns,
      }),
      GetDate() {
        const timeStamp = Date.now();
        const formattedString = date.formatDate(timeStamp, "YYYY/MM/DD");
        return formattedString;
      },
    },
    methods: {
      ...mapActions("reports", ["loadReportWiseTurbineLogData"]),
      ...mapActions("reports", ["updateTurbineLog"]),
   
      async reloadPage() {
        this.$router.go(0);
        window.location.reload();
      },
  
      loadSelectData() {
        this.$store.commit("reports/CLEAR_TURBINE_LOG_REPORT_DATA");
        this.report.fromDate = "";
        this.report.toDate = "";
      },
      closeDialog() {
        this.$refs.qDateProxyFromDate.hide();
      },
  
      closeDialog2() {
        this.$refs.qDateProxyFromDate2.hide();
      },
  
      loadReportWiseData() {
        if (this.$refs.reportForm.validate()) {
          this.mmr = true;
        if (this.report.reportName.value === "Turbine Log Report") {
            let user = JSON.parse(localStorage.getItem("userDetails"));
            const turbineUserReport = { ...user, ...this.report };
  
            this.loadReportWiseTurbineLogData(turbineUserReport);
          } 
        } else {
          window.alert("please fill the form correctly");
        }
      },
  
  
      closeTurbineDialog() {
        this.turbineDataDialog = false;
      },
   
      // update turbine station log data
  
      viewTurbineDataItem(item) {
        this.viewTurbineData = {};
        this.viewTurbineDataIndex = {};
        this.viewTurbineDataIndex = this.data.indexOf(item);
        this.viewTurbineData = Object.assign({}, item);
        this.turbineDataDialog = true;
        this.editTurbineData.turbineDate = item.date;
        this.editTurbineData.time = item.time;
        this.editTurbineData.shift = item.shift;
        this.editTurbineData.speed_rpm = item.speed_rpm;
        this.editTurbineData.load_kw = item.load_kw;
        this.editTurbineData.inlet_steam_temp = item.inlet_steam_temp;
        this.editTurbineData.inlet_steam_pre = item.inlet_steam_pre;
        this.editTurbineData.inlet_steam_flow = item.inlet_steam_flow;
        this.editTurbineData.lub_oil_pre = item.lub_oil_pre;
        this.editTurbineData.control_oil_pre = item.control_oil_pre;
        this.editTurbineData.trip_oil_pre = item.trip_oil_pre;
        this.editTurbineData.chust_pre = item.chust_pre;
        this.editTurbineData.exhaust_stem_pipe = item.exhaust_stem_pipe;
        this.editTurbineData.exhaust_stem_temp = item.exhaust_stem_temp;
        this.editTurbineData.gb_thrust_wear_pre = item.gb_thrust_wear_pre;
        this.editTurbineData.gb_hp_casing_vibra = item.gb_hp_casing_vibra;
        this.editTurbineData.gb_lp_casing_vibra = item.gb_lp_casing_vibra;
        this.editTurbineData.gb_hp_degc = item.gb_hp_degc;
        this.editTurbineData.gb_lp_degc = item.gb_lp_degc;
        this.editTurbineData.gb_pf_degc = item.gb_pf_degc;
        this.editTurbineData.gb_pa_degc = item.gb_pa_degc;
        this.editTurbineData.gb_gf_degc = item.gb_gf_degc;
        this.editTurbineData.gb_gr_degc = item.gb_gr_degc;
        this.editTurbineData.gb_lube_oil_coller_before =
          item.gb_lube_oil_coller_before;
        this.editTurbineData.gb_lube_oil_coller_after =
          item.gb_lube_oil_coller_after;
        this.editTurbineData.gb_differ_pre = item.gb_differ_pre;
        this.editTurbineData.gb_alt_de = item.gb_alt_de;
        this.editTurbineData.gb_alt_nde = item.gb_alt_nde;
        this.editTurbineData.water_pre = item.water_pre;
        this.editTurbineData.water_inlet_temp = item.water_inlet_temp;
        this.editTurbineData.water_outlet_temp = item.water_outlet_temp;
        this.editTurbineData.remarks = item.remarks;
        this.editTurbineData.sno = item.sno;
      },
  
      ResetForm() {
        this.$refs.sterform.resetValidation();
        this.editSterilisationData.BatchNo = "";
        this.editSterilisationData.sterFormDate = "";
        this.editSterilisationData.shift = "";
        this.editSterilisationData.sterilizerno = "";
        this.editSterilisationData.firstpeaktimein = "";
        this.editSterilisationData.firstpeaktimeout = "";
        this.editSterilisationData.secondpeaktimein = "";
        this.editSterilisationData.secondpeaktimeout = "";
        this.editSterilisationData.thirdpeaktimein = "";
        this.editSterilisationData.FortyPsi = "";
        this.editSterilisationData.thirdpeaktimeout = "";
        this.editSterilisationData.NoOfCages = "";
        this.editSterilisationData.remarks = "";
      },
  
      TurbineLogOnReset() {
        this.editTurbineData.date = "";
        this.editTurbineData.shift = "";
        this.editTurbineData.time = "";
        this.editTurbineData.speed_rpm = "";
        this.editTurbineData.load_kw = "";
        this.editTurbineData.inlet_steam_temp = "";
        this.editTurbineData.inlet_steam_pre = "";
        this.editTurbineData.inlet_steam_flow = "";
        this.editTurbineData.lub_oil_pre = "";
        this.editTurbineData.control_oil_pre = "";
        this.editTurbineData.trip_oil_pre = "";
        this.editTurbineData.chust_pre = "";
        this.editTurbineData.exhaust_stem_pipe = "";
        this.editTurbineData.exhaust_stem_temp = "";
        this.editTurbineData.gb_thrust_wear_pre = "";
        this.editTurbineData.gb_hp_casing_vibra = "";
        this.editTurbineData.gb_lp_casing_vibra = "";
        this.editTurbineData.gb_hp_degc = "";
        this.editTurbineData.gb_lp_degc = "";
        this.editTurbineData.gb_pf_degc = "";
        this.editTurbineData.gb_pa_degc = "";
        this.editTurbineData.gb_gf_degc = "";
        this.editTurbineData.gb_gr_degc = "";
        this.editTurbineData.gb_lube_oil_coller_before = "";
        this.editTurbineData.gb_lube_oil_coller_after = "";
        this.editTurbineData.gb_differ_pre = "";
        this.editTurbineData.gb_alt_de = "";
        this.editTurbineData.gb_alt_nde = "";
        this.editTurbineData.water_pre = "";
        this.editTurbineData.water_inlet_temp = "";
        this.editTurbineData.water_outlet_temp = "";
        this.editTurbineData.remarks = "";
      },
  
      onUpdateTurbineLog() {
        if (this.$refs.turbineForm.validate()) {
          this.$q
            .dialog({
              title: "Confirm",
              message: "Do you want to Update data ?",
              cancel: true,
              persistent: true,
            })
            .onOk(() => {
              this.updateTurbineLog(this.editTurbineData);
            })
            .onCancel(() => {});
        }
      },

    },
  };
  </script>
  <style>
  table {
    border: none;
  }
  
  .TwoTimeInpts {
    width: 167px !important;
  }
  </style>
  