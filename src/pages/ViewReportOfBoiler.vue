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
                report.reportName.value === 'Boiler Log Report' &&
                boiler_log_report_data.length
              "
            >
              <div class="row col-12">
                <span class="col-4 text-bold"
                  >Employee Name :
                  <span style="color: blue" class="text-bold">{{
                    this.boiler_log_report_data[0].emp_name
                  }}</span></span
                >
                <span class="col-4 text-bold"
                  >Plant Name :
                  <span style="color: blue" class="text-bold">{{
                    this.boiler_log_report_data[0].plant_name
                  }}</span></span
                >
                <span class="col-4 text-bold"
                  >State :
                  <span style="color: blue" class="text-bold">{{
                    this.boiler_log_report_data[0].state_name
                  }}</span></span
                >
              </div>
              <q-table
                :title="title3"
                style="font-family: verdana"
                :data="boiler_log_report_data"
                :columns="boiler_log_columns"
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
                      @click="viewBoilerDataItem(props.row)"
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
                report.reportName.value === 'Boiler Log Report' &&
                boiler_log_report_data.length === 0
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

        <!-- {{fourth}} -->
        <!-- view of boiler log report -->
        <q-dialog
          v-model="boilerDataDialog"
          persistent
          :maximized="maximizedToggle"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-layout view="Lhh lpr fff" container class="bg-white">
            <q-header class="bg-primary">
              <q-bar class="bg-primary text-white">
                <q-icon name="feed"></q-icon>
                <div style="font-family: verdana">Boiler Log Details</div>
                <q-space />
                <q-btn dense flat icon="close" @click="closeBoilerDialog()">
                  <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
              </q-bar>
            </q-header>

            <!-- Include a QPageContainer and QPage if necessary -->
            <q-page-container>
              <q-page class="q-pa-md">
                <!-- Your content goes here -->

                <div class="title">
                  <h4 class="text-center q-bold">Boiler Log Sheet</h4>
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
                    v-model="boilerToggle"
                    checked-icon="check"
                    color="red"
                    unchecked-icon="clear"
                    size="lg"
                  />
                  <span class="q-ma-sm text-bold text-h6"> Edit</span>
                </div>
                <!-- view of boiler -->
                <div v-if="!boilerToggle" class="container">
                  <q-form class="BlFrm" @submit.prevent="onUpdateBoilerLog">
                    <div class="split-container">
                      <div class="left-container">
                        <div class="input-feilds">
                          <span class="input-text input-text-bl-frm"
                            >Date : </span
                          ><q-input
                            readonly
                            style="width: 55%"
                            dense
                            outlined
                            v-model="viewBoilerData.date"
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
                                    v-model="viewBoilerData.date"
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
                          <span class="input-text input-text-bl-frm"
                            >Shift : </span
                          ><q-select
                            readonly
                            outlined
                            dense
                            style="width: 55%; margin-bottom: 20px"
                            v-model="viewBoilerData.shift"
                            :options="shiftOptions"
                            label="Shift"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text input-text-bl-frm"
                            >Time : </span
                          ><q-input
                            readonly
                            style="width: 55%"
                            label="Time"
                            dense
                            outlined
                            v-model="viewBoilerData.time"
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
                                    v-model="viewBoilerData.time"
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
                      </div>
                      <div class="line-tr"></div>
                      <div class="right-container">
                        <div class="input-feilds">
                          <span class="input-text input-text-bl-frm q-ml-md"
                            >Capacity : </span
                          ><q-input
                            readonly
                            dense
                            v-model="viewBoilerData.capacity"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Please provide a valid value',
                            ]"
                            type="number"
                            outlined
                            suffix="TPH"
                            style="width: 53%"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text input-text-bl-frm q-ml-md"
                            >Working pr : </span
                          ><q-input
                            readonly
                            dense
                            style="width: 53%"
                            v-model="viewBoilerData.working_pre"
                            suffix="Kg.cm2"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Please provide a valid value',
                            ]"
                            type="text"
                            outlined
                          />
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-center">
                      <div class="input-feilds q-mt-md">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th colspan="2">BOILER FEED WATER</th>
                            </tr>
                            <tr>
                              <th>Dis Pr (kg/cm2)</th>
                              <th>Drum Level (%)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 100px"
                                  dense
                                  v-model="
                                    viewBoilerData.boiler_feed_water_dis_pre
                                  "
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
                                  v-model="
                                    viewBoilerData.boiler_feed_water_drum_level
                                  "
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
                      <div class="input-feilds q-ml-md q-mt-md">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th colspan="2">MAIN STEAM</th>
                            </tr>
                            <tr>
                              <th>Press (kg/cm2)</th>
                              <th>Temp (%)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 100px"
                                  dense
                                  v-model="viewBoilerData.main_steam_pre"
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
                                  v-model="viewBoilerData.main_steam_temp"
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
                    </div>
                    <div class="subtitle" style="margin-top: 20px">
                      <p class="text-center q-mt-sm">FLUE GAS TEMP</p>
                    </div>
                    <div class="flex flex-center">
                      <div class="input-feilds q-mt-md">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th>Furnace (°C)</th>
                              <th>BANK O/L (°C)</th>
                              <th>ECO O/L (°C)</th>
                              <th>APH O/L(°C)</th>
                              <th>ID I/L (°C)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 100px"
                                  dense
                                  v-model="viewBoilerData.fgt_furnance"
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
                                  v-model="viewBoilerData.fgt_bank_ol"
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
                                  v-model="viewBoilerData.fgt_eco_ol"
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
                                  v-model="viewBoilerData.fgt_aph_ol"
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
                                  v-model="viewBoilerData.fgt_id_ol"
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
                      <div class="input-feilds q-mt-md">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th colspan="2">ATEMPERATURE</th>
                              <th colspan="2">FEED WATER TEMP</th>
                            </tr>
                            <tr>
                              <th>DSH (I/L)</th>
                              <th>DSH (O/L)</th>
                              <th>ECO (I/L)</th>
                              <th>ECO (O/L)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 100px"
                                  dense
                                  v-model="viewBoilerData.atemperature_dsh_il"
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
                                  v-model="viewBoilerData.atemperature_dsh_ol"
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
                                  v-model="viewBoilerData.fwt_eco_il"
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
                                  v-model="viewBoilerData.fwt_eco_ol"
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
                    </div>
                    <div class="subtitle" style="margin-top: 20px">
                      <p class="text-center q-mt-sm">FUEL FEEDERS RPM</p>
                    </div>
                    <div class="flex flex-center">
                      <div class="left">
                        <div class="input-feilds q-mt-sm">
                          <span class="input-text text-wd-hev"
                            >Fuel Feeder 1RPM (RPM) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewBoilerData.fuel_feeder_rpm_1"
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
                            >Fuel Feeder 2RPM (RPM) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewBoilerData.fuel_feeder_rpm_2"
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
                            >Fuel Feeder 3RPM (RPM) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewBoilerData.fuel_feeder_rpm_3"
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
                            >Fuel Feeder 4RPM (RPM) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewBoilerData.fuel_feeder_rpm_4"
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
                      <div class="right"></div>
                    </div>
                    <div class="subtitle" style="margin-top: 0px">
                      <p class="text-center q-mt-sm">FLUE GAS DRAUGHT</p>
                    </div>
                    <div class="flex flex-center">
                      <div class="left">
                        <div class="input-feilds q-mt-sm">
                          <span class="input-text text-wd-hev"
                            >Fur (mmw) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewBoilerData.fgd_fur"
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
                            >Eco I/L (mmwc) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewBoilerData.fgd_eco"
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
                            >APH I/L (mmwc) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewBoilerData.fgd_aph"
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
                            >ID I/L (mmwc) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewBoilerData.fgd_id"
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
                      <div class="right"></div>
                    </div>
                    <div class="subtitle" style="margin-top: 0px">
                      <p class="text-center q-mt-sm">
                        AIR PRESSURES DE-AERATOR
                      </p>
                    </div>
                    <div class="flex flex-center">
                      <div class="left">
                        <div class="input-feilds q-mt-md">
                          <span class="input-text text-wd-hev">FD (mmw) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewBoilerData.apd_fd"
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
                          <span class="input-text text-wd-hev">SA (mmw) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewBoilerData.apd_sa"
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
                            >APH O/L Air (Degc) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewBoilerData.apd_aph"
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
                            >Level (%) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewBoilerData.apd_level"
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
                            >Pres (kg/cm2) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewBoilerData.apd_pre"
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
                      <div class="right"></div>
                    </div>
                    <div class="subtitle" style="margin-top: 0px">
                      <p class="text-center q-mt-sm">FEED WATER</p>
                    </div>
                    <div class="flex flex-center">
                      <div class="left">
                        <div class="input-feilds q-mt-sm">
                          <span class="input-text text-wd-hev"
                            >Feed Water Flow (TPH) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewBoilerData.feed_water_flow_tph"
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
                            >Steam Flow (TPH) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewBoilerData.steam_flow_tph"
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
                      <div class="right"></div>
                    </div>
                    <div class="subtitle" style="margin-top: 0px">
                      <p class="text-center q-mt-sm">STEAM</p>
                    </div>
                    <div class="flex flex-center">
                      <div class="left">
                        <div class="input-feilds q-mt-sm">
                          <span class="input-text text-wd-hev"
                            >Feed Water Totalizer (MT) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewBoilerData.feed_water_totalizer"
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
                            >Steam Totalizer (MT) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewBoilerData.steam_totalizer"
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
                            >Turbine Load (KW) : </span
                          ><q-input
                            readonly
                            style="width: 20%"
                            dense
                            v-model="viewBoilerData.turbine_load"
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
                      <div class="right"></div>
                    </div>
                    <div class="flex flex-center">
                      <div class="input-feilds q-mt-md">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th colspan="2">ID FAN</th>
                            </tr>
                            <tr>
                              <th>RPM</th>
                              <th>AMPS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 100px"
                                  dense
                                  v-model="viewBoilerData.id_fan_rpm"
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
                                  v-model="viewBoilerData.id_fan_amps"
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
                    </div>
                    <div class="input-feilds q-mt-md">
                      <span class="input-text" style="width: 100px"
                        >Remarks : </span
                      ><q-input
                        outlined
                        readonly
                        dense
                        v-model="viewBoilerData.remarks"
                        type="textarea"
                        float-label="Textarea"
                        :max-height="10"
                        :min-rows="2"
                        style="width: 70%; margin-left: 28px"
                      />
                    </div>
                    <div class="btns">
                      <q-btn
                        disable
                        class="q-pa-sm"
                        color="primary"
                        label="Submit"
                      />
                      <q-btn
                        disable
                        @click="BoilerLogOnReset"
                        class="q-pa-xsm"
                        style="margin-left: 10px"
                        color="secondary"
                        label="Reset"
                      />
                    </div>
                  </q-form>
                </div>

                <!-- edit of boiler -->

                <div v-if="boilerToggle" class="container">
                  <q-form
                    class="BlFrm"
                    ref="boilerForm"
                    @submit.prevent="onUpdateBoilerLog"
                  >
                    <div class="split-container">
                      <div class="left-container">
                        <div class="input-feilds">
                          <span class="input-text input-text-bl-frm"
                            >Date : </span
                          ><q-input
                            style="width: 55%"
                            dense
                            outlined
                            v-model="editBoilerData.date"
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
                                  <q-date v-model="editBoilerData.date">
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
                          <span class="input-text input-text-bl-frm"
                            >Shift : </span
                          ><q-select
                            outlined
                            dense
                            style="width: 55%; margin-bottom: 20px"
                            v-model="editBoilerData.shift"
                            :options="shiftOptions"
                            label="Shift"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text input-text-bl-frm"
                            >Time : </span
                          ><q-input
                            style="width: 55%"
                            label="Time"
                            dense
                            outlined
                            v-model="editBoilerData.time"
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
                                  <q-time v-model="editBoilerData.time">
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
                      </div>
                      <div class="line-tr"></div>
                      <div class="right-container">
                        <div class="input-feilds">
                          <span class="input-text input-text-bl-frm q-ml-md"
                            >Capacity : </span
                          ><q-input
                            dense
                            v-model="editBoilerData.capacity"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Please provide a valid value',
                            ]"
                            type="number"
                            outlined
                            suffix="TPH"
                            style="width: 53%"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text input-text-bl-frm q-ml-md"
                            >Working pr : </span
                          ><q-input
                            dense
                            style="width: 53%"
                            v-model="editBoilerData.working_pre"
                            suffix="Kg.cm2"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                'Please provide a valid value',
                            ]"
                            type="text"
                            outlined
                          />
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-center">
                      <div class="input-feilds q-mt-md">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th colspan="2">BOILER FEED WATER</th>
                            </tr>
                            <tr>
                              <th>Dis Pr (kg/cm2)</th>
                              <th>Drum Level (%)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 100px"
                                  dense
                                  v-model="
                                    editBoilerData.boiler_feed_water_dis_pre
                                  "
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
                                  v-model="
                                    editBoilerData.boiler_feed_water_drum_level
                                  "
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
                      <div class="input-feilds q-ml-md q-mt-md">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th colspan="2">MAIN STEAM</th>
                            </tr>
                            <tr>
                              <th>Press (kg/cm2)</th>
                              <th>Temp (%)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 100px"
                                  dense
                                  v-model="editBoilerData.main_steam_pre"
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
                                  v-model="editBoilerData.main_steam_temp"
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
                    </div>
                    <div class="subtitle" style="margin-top: 20px">
                      <p class="text-center q-mt-sm">FLUE GAS TEMP</p>
                    </div>
                    <div class="flex flex-center">
                      <div class="input-feilds q-mt-md">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th>Furnace (°C)</th>
                              <th>BANK O/L (°C)</th>
                              <th>ECO O/L (°C)</th>
                              <th>APH O/L(°C)</th>
                              <th>ID I/L (°C)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 100px"
                                  dense
                                  v-model="editBoilerData.fgt_furnance"
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
                                  v-model="editBoilerData.fgt_bank_ol"
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
                                  v-model="editBoilerData.fgt_eco_ol"
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
                                  v-model="editBoilerData.fgt_aph_ol"
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
                                  v-model="editBoilerData.fgt_id_ol"
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
                      <div class="input-feilds q-mt-md">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th colspan="2">ATEMPERATURE</th>
                              <th colspan="2">FEED WATER TEMP</th>
                            </tr>
                            <tr>
                              <th>DSH (I/L)</th>
                              <th>DSH (O/L)</th>
                              <th>ECO (I/L)</th>
                              <th>ECO (O/L)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 100px"
                                  dense
                                  v-model="editBoilerData.atemperature_dsh_il"
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
                                  v-model="editBoilerData.atemperature_dsh_ol"
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
                                  v-model="editBoilerData.fwt_eco_il"
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
                                  v-model="editBoilerData.fwt_eco_ol"
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
                    </div>
                    <div class="subtitle" style="margin-top: 20px">
                      <p class="text-center q-mt-sm">FUEL FEEDERS RPM</p>
                    </div>
                    <div class="flex flex-center">
                      <div class="left">
                        <div class="input-feilds q-mt-sm">
                          <span class="input-text text-wd-hev"
                            >Fuel Feeder 1RPM (RPM) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editBoilerData.fuel_feeder_rpm_1"
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
                            >Fuel Feeder 2RPM (RPM) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editBoilerData.fuel_feeder_rpm_2"
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
                            >Fuel Feeder 3RPM (RPM) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editBoilerData.fuel_feeder_rpm_3"
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
                            >Fuel Feeder 4RPM (RPM) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editBoilerData.fuel_feeder_rpm_4"
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
                      <div class="right"></div>
                    </div>
                    <div class="subtitle" style="margin-top: 0px">
                      <p class="text-center q-mt-sm">FLUE GAS DRAUGHT</p>
                    </div>
                    <div class="flex flex-center">
                      <div class="left">
                        <div class="input-feilds q-mt-sm">
                          <span class="input-text text-wd-hev"
                            >Fur (mmw) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editBoilerData.fgd_fur"
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
                            >Eco I/L (mmwc) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editBoilerData.fgd_eco"
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
                            >APH I/L (mmwc) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editBoilerData.fgd_aph"
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
                            >ID I/L (mmwc) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editBoilerData.fgd_id"
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
                      <div class="right"></div>
                    </div>
                    <div class="subtitle" style="margin-top: 0px">
                      <p class="text-center q-mt-sm">
                        AIR PRESSURES DE-AERATOR
                      </p>
                    </div>
                    <div class="flex flex-center">
                      <div class="left">
                        <div class="input-feilds q-mt-md">
                          <span class="input-text text-wd-hev">FD (mmw) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editBoilerData.apd_fd"
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
                          <span class="input-text text-wd-hev">SA (mmw) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editBoilerData.apd_sa"
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
                            >APH O/L Air (Degc) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editBoilerData.apd_aph"
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
                            >Level (%) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editBoilerData.apd_level"
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
                            >Pres (kg/cm2) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editBoilerData.apd_pre"
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
                      <div class="right"></div>
                    </div>
                    <div class="subtitle" style="margin-top: 0px">
                      <p class="text-center q-mt-sm">FEED WATER</p>
                    </div>
                    <div class="flex flex-center">
                      <div class="left">
                        <div class="input-feilds q-mt-sm">
                          <span class="input-text text-wd-hev"
                            >Feed Water Flow (TPH) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editBoilerData.feed_water_flow_tph"
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
                            >Steam Flow (TPH) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editBoilerData.steam_flow_tph"
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
                      <div class="right"></div>
                    </div>
                    <div class="subtitle" style="margin-top: 0px">
                      <p class="text-center q-mt-sm">STEAM</p>
                    </div>
                    <div class="flex flex-center">
                      <div class="left">
                        <div class="input-feilds q-mt-sm">
                          <span class="input-text text-wd-hev"
                            >Feed Water Totalizer (MT) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editBoilerData.feed_water_totalizer"
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
                            >Steam Totalizer (MT) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editBoilerData.steam_totalizer"
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
                            >Turbine Load (KW) : </span
                          ><q-input
                            style="width: 20%"
                            dense
                            v-model="editBoilerData.turbine_load"
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
                      <div class="right"></div>
                    </div>
                    <div class="flex flex-center">
                      <div class="input-feilds q-mt-md">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th colspan="2">ID FAN</th>
                            </tr>
                            <tr>
                              <th>RPM</th>
                              <th>AMPS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 100px"
                                  dense
                                  v-model="editBoilerData.id_fan_rpm"
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
                                  v-model="editBoilerData.id_fan_amps"
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
                    </div>
                    <div class="input-feilds q-mt-md">
                      <span class="input-text" style="width: 100px"
                        >Remarks : </span
                      ><q-input
                        outlined
                        dense
                        v-model="editBoilerData.remarks"
                        type="textarea"
                        float-label="Textarea"
                        :max-height="10"
                        :min-rows="2"
                        style="width: 70%; margin-left: 28px"
                      />
                    </div>
                    <div class="btns">
                      <q-btn
                        @click="onUpdateBoilerLog"
                        class="q-pa-sm"
                        color="primary"
                        label="Submit"
                      />
                      <q-btn
                        @click="BoilerLogOnReset"
                        class="q-pa-xsm"
                        style="margin-left: 10px"
                        color="secondary"
                        label="Reset"
                      />
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
        { label: "Boiler Log Report", value: "Boiler Log Report" },
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

      editBoilerData: {
        date: "",
        time: "",
        shift: "",
        capacity: "",
        working_pre: "",
        boiler_feed_water_dis_pre: "",
        boiler_feed_water_drum_level: "",
        main_steam_pre: "",
        main_steam_temp: "",
        fgt_furnance: "",
        fgt_bank_ol: "",
        fgt_eco_ol: "",
        fgt_aph_ol: "",
        fgt_id_ol: "",
        atemperature_dsh_il: "",
        atemperature_dsh_ol: "",
        fwt_eco_il: "",
        fwt_eco_ol: "",
        fuel_feeder_rpm_1: "",
        fuel_feeder_rpm_2: "",
        fuel_feeder_rpm_3: "",
        fuel_feeder_rpm_4: "",
        fgd_fur: "",
        fgd_eco: "",
        fgd_aph: "",
        fgd_id: "",
        apd_fd: "",
        apd_sa: "",
        apd_aph: "",
        apd_level: "",
        apd_pre: "",
        feed_water_flow_tph: "",
        steam_flow_tph: "",
        feed_water_totalizer: "",
        steam_totalizer: "",
        turbine_load: "",
        id_fan_rpm: "",
        id_fan_amps: "",
        remarks: "",
      },

      viewDataItem: [],

      // boiler data
      viewBoilerData: {},
      viewBoilerDataIndex: {},
      boilerDataDialog: false,
      boilerToggle: false,
    };
  },
  created() {
    this.UserInfo = this.GetUserInfo();
  },
  computed: {
    ...mapState({
      boiler_log_report_data: (state) => state.reports.boiler_log_report_data,
      boiler_log_columns: (state) => state.reports.boiler_log_columns,
    }),
    GetDate() {
      const timeStamp = Date.now();
      const formattedString = date.formatDate(timeStamp, "YYYY/MM/DD");
      return formattedString;
    },
    //  ...mapGetters("reports", ["sterilisation_station_columns"]),
  },
  methods: {
    ...mapActions("reports", ["loadReportWiseBoilerLogData"]),
    ...mapActions("reports", ["updateBoilerLog"]),
    async reloadPage() {
      this.$router.go(0);
      window.location.reload();
    },

    loadSelectData() {
      this.$store.commit("reports/CLEAR_BOILER_LOG_REPORT_DATA");
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
        if (this.report.reportName.value === "Boiler Log Report") {
          let user = JSON.parse(localStorage.getItem("userDetails"));
          const boilerUserReport = { ...user, ...this.report };

          this.loadReportWiseBoilerLogData(boilerUserReport);
        }
      } else {
        window.alert("please fill the form correctly");
      }
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

    // Boiler Log Methods start from here

    viewBoilerDataItem(item) {
      this.viewBoilerData = {};
      this.viewBoilerDataIndex = {};

      this.viewBoilerDataIndex = this.data.indexOf(item);
      this.viewBoilerData = Object.assign({}, item);
      this.boilerDataDialog = true;
      this.editBoilerData.apd_aph = item.apd_aph;
      this.editBoilerData.apd_fd = item.apd_fd;
      this.editBoilerData.apd_level = item.apd_level;
      this.editBoilerData.apd_pre = item.apd_pre;
      this.editBoilerData.apd_sa = item.apd_sa;
      this.editBoilerData.atemperature_dsh_il = item.atemperature_dsh_il;
      this.editBoilerData.atemperature_dsh_ol = item.atemperature_dsh_ol;
      this.editBoilerData.boiler_feed_water_dis_pre =
        item.boiler_feed_water_dis_pre;
      this.editBoilerData.boiler_feed_water_drum_level =
        item.boiler_feed_water_drum_level;
      this.editBoilerData.capacity = item.capacity;
      this.editBoilerData.date = item.date;
      this.editBoilerData.time = item.time;
      this.editBoilerData.shift = item.shift;
      this.editBoilerData.feed_water_flow_tph = item.feed_water_flow_tph;
      this.editBoilerData.feed_water_totalizer = item.feed_water_totalizer;
      this.editBoilerData.fgd_aph = item.fgd_aph;
      this.editBoilerData.fgd_eco = item.fgd_eco;
      this.editBoilerData.fgd_fur = item.fgd_fur;
      this.editBoilerData.fgd_id = item.fgd_id;
      this.editBoilerData.fgt_aph_ol = item.fgt_aph_ol;
      this.editBoilerData.fgt_bank_ol = item.fgt_bank_ol;
      this.editBoilerData.fgt_eco_ol = item.fgt_eco_ol;
      this.editBoilerData.fgt_furnance = item.fgt_furnance;
      this.editBoilerData.fgt_id_ol = item.fgt_id_ol;
      this.editBoilerData.fuel_feeder_rpm_1 = item.fuel_feeder_rpm_1;
      this.editBoilerData.fuel_feeder_rpm_2 = item.fuel_feeder_rpm_2;
      this.editBoilerData.fuel_feeder_rpm_3 = item.fuel_feeder_rpm_3;
      this.editBoilerData.fuel_feeder_rpm_4 = item.fuel_feeder_rpm_4;
      this.editBoilerData.fwt_eco_il = item.fwt_eco_il;
      this.editBoilerData.fwt_eco_ol = item.fwt_eco_ol;
      this.editBoilerData.id_fan_amps = item.id_fan_amps;
      this.editBoilerData.id_fan_rpm = item.id_fan_rpm;
      this.editBoilerData.main_steam_pre = item.main_steam_pre;
      this.editBoilerData.main_steam_temp = item.main_steam_temp;
      this.editBoilerData.remarks = item.remarks;
      this.editBoilerData.steam_flow_tph = item.steam_flow_tph;
      this.editBoilerData.steam_totalizer = item.steam_totalizer;
      this.editBoilerData.turbine_load = item.turbine_load;
      this.editBoilerData.working_pre = item.working_pre;
      this.editBoilerData.sno = item.sno;
    },

    closeBoilerDialog() {
      this.boilerDataDialog = false;
    },

    BoilerLogOnReset() {
      this.editBoilerData.apd_aph = "";
      this.editBoilerData.apd_fd = "";
      this.editBoilerData.apd_level = "";
      this.editBoilerData.apd_pre = "";
      this.editBoilerData.apd_sa = "";
      this.editBoilerData.atemperature_dsh_il = "";
      this.editBoilerData.atemperature_dsh_ol = "";
      this.editBoilerData.boiler_feed_water_dis_pre = "";
      this.editBoilerData.boiler_feed_water_drum_level = "";
      this.editBoilerData.capacity = "";
      this.editBoilerData.date = "";
      this.editBoilerData.time = "";
      this.editBoilerData.shift = "";
      this.editBoilerData.feed_water_flow_tph = "";
      this.editBoilerData.feed_water_totalizer = "";
      this.editBoilerData.fgd_aph = "";
      this.editBoilerData.fgd_eco = "";
      this.editBoilerData.fgd_fur = "";
      this.editBoilerData.fgd_id = "";
      this.editBoilerData.fgt_aph_ol = "";
      this.editBoilerData.fgt_bank_ol = "";
      this.editBoilerData.fgt_eco_ol = "";
      this.editBoilerData.fgt_furnance = "";
      this.editBoilerData.fgt_id_ol = "";
      this.editBoilerData.fuel_feeder_rpm_1 = "";
      this.editBoilerData.fuel_feeder_rpm_2 = "";
      this.editBoilerData.fuel_feeder_rpm_3 = "";
      this.editBoilerData.fuel_feeder_rpm_4 = "";
      this.editBoilerData.fwt_eco_il = "";
      this.editBoilerData.fwt_eco_ol = "";
      this.editBoilerData.id_fan_amps = "";
      this.editBoilerData.id_fan_rpm = "";
      this.editBoilerData.main_steam_pre = "";
      this.editBoilerData.main_steam_temp = "";
      this.editBoilerData.remarks = "";
      this.editBoilerData.steam_flow_tph = "";
      this.editBoilerData.steam_totalizer = "";
      this.editBoilerData.turbine_load = "";
      this.editBoilerData.working_pre = "";
    },

    onUpdateBoilerLog() {
      if (this.$refs.boilerForm.validate()) {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Do you want to Update data ?",
            cancel: true,
            persistent: true,
          })
          .onOk(() => {
            this.updateBoilerLog(this.editBoilerData);
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
