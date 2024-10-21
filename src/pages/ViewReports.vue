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
                report.reportName.value ===
                  'Sterilisation Station Log Report' &&
                sterilisation_log_report_data.length
              "
            >
              <div class="row col-12">
                <span class="col-4 text-bold"
                  >Employee Name :
                  <span style="color: blue" class="text-bold">{{
                    this.sterilisation_log_report_data[0].emp_name
                  }}</span></span
                >
                <span class="col-4 text-bold"
                  >Plant Name :
                  <span style="color: blue" class="text-bold">{{
                    this.sterilisation_log_report_data[0].plant_name
                  }}</span></span
                >
                <span class="col-4 text-bold"
                  >State :
                  <span style="color: blue" class="text-bold">{{
                    this.sterilisation_log_report_data[0].state_name
                  }}</span></span
                >
              </div>

              <q-table
                style="font-family: verdana"
                :title="title1"
                :data="sterilisation_log_report_data"
                :columns="sterilisation_station_columns"
                dense
                :filter="filter"
                :pagination.sync="pagination"
                separator="cell"
                row-key="sno"
                :grid="mode === 'grid'"
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
                      @click="viewSterilisationDataItem(props.row)"
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
                report.reportName.value === 'Shift Report' &&
                shift_log_report_data.length
              "
            >
              <div class="row col-12">
                <span class="col-4 text-bold"
                  >Employee Name :
                  <span style="color: blue" class="text-bold">{{
                    this.shift_log_report_data[0].emp_name
                  }}</span></span
                >
                <span class="col-4 text-bold"
                  >Plant Name :
                  <span style="color: blue" class="text-bold">{{
                    this.shift_log_report_data[0].plant_name
                  }}</span></span
                >
                <span class="col-4 text-bold"
                  >State :
                  <span style="color: blue" class="text-bold">{{
                    this.shift_log_report_data[0].state_name
                  }}</span></span
                >
              </div>
              <q-table
                :title="title4"
                style="font-family: verdana"
                :data="shift_log_report_data"
                :columns="shift_log_columns"
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
                      @click="viewShiftDataItem(props.row)"
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
                (report.reportName.value ===
                  'Sterilisation Station Log Report' &&
                  sterilisation_log_report_data.length === 0) ||
                (report.reportName.value === 'Turbine Log Report' &&
                  turbine_log_report_data.length === 0) ||
                (report.reportName.value === 'Boiler Log Report' &&
                  boiler_log_report_data.length === 0) ||
                (report.reportName.value === 'Shift Report' &&
                  shift_log_report_data.length === 0)
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
        <!-- view sterilisation data dialogue  -->

        <!-- {{fourth}} -->

        <q-dialog
          v-model="sterilisationDataDialog"
          persistent
          :maximized="maximizedToggle"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-layout view="Lhh lpr fff" container class="bg-white">
            <q-header class="bg-primary">
              <q-bar class="bg-primary text-white">
                <q-icon name="feed"></q-icon>
                <div style="font-family: verdana">
                  Sterilisation Station Log Details
                </div>
                <q-space />
                <q-btn
                  dense
                  flat
                  icon="close"
                  @click="closeSterilisationDialog()"
                >
                  <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
              </q-bar>
            </q-header>

            <!-- Include a QPageContainer and QPage if necessary -->
            <q-page-container>
              <q-page class="q-pa-md">
                <!-- Your content goes here -->

                <div class="title">
                  <h4 class="text-center q-bold">
                    Sterilisation Station Log Sheet
                  </h4>
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
                    v-model="fourth"
                    checked-icon="check"
                    color="red"
                    unchecked-icon="clear"
                    size="lg"
                  />
                  <span class="q-ma-sm text-bold text-h6"> Edit</span>
                </div>
                <div v-if="!fourth" class="container q-mt-lg container-sm">
                  <q-form class="ster-form" @submit.prevent="FetchFormDetails">
                    <div class="input-feilds">
                      <span class="input-text">Batch No : </span>
                      <q-input
                        readonly
                        style="width: 40%"
                        dense
                        required
                        outlined
                        label="Batch No"
                        v-model="viewSterilisationData.batch_no"
                        type="text"
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'Please provide a valid value',
                        ]"
                      />
                    </div>
                    <div class="input-feilds">
                      <span class="input-text">Date : </span
                      ><q-input
                        readonly
                        style="width: 40%"
                        dense
                        outlined
                        v-model="viewSterilisationData.date"
                        mask="date"
                        :rules="[
                          'date',
                          (val) =>
                            (val && val.length > 0) ||
                            'Please provide a valid value',
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
                                v-model="viewSterilisationData.date"
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
                      <span class="input-text">Shift : </span
                      ><q-select
                        readonly
                        outlined
                        dense
                        style="width: 40%; margin-bottom: 20px"
                        v-model="viewSterilisationData.shift"
                        :options="shiftOptions"
                        label="Shift"
                      />
                    </div>

                    <div class="input-feilds">
                      <span class="input-text">Sterilizer no : </span
                      ><q-select
                        readonly
                        outlined
                        dense
                        style="width: 40%; margin-bottom: 20px"
                        v-model="viewSterilisationData.sterilizer_no"
                        :options="SterOptions"
                        label="Sterilizer no"
                      />
                    </div>
                    <div class="input-feilds" style="width: 100%">
                      <span class="input-text">1st peak :</span
                      ><q-input
                        readonly
                        class="TwoTimeInpts"
                        style="width: 32%"
                        label="Time in"
                        dense
                        outlined
                        v-model="viewSterilisationData.peak_1st_time_in"
                        mask="time"
                        :rules="[
                          'time',
                          (val) =>
                            (val && val.length > 0) ||
                            'Please provide a valid value',
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
                                v-model="viewSterilisationData.peak_1st_time_in"
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
                        </template> </q-input
                      ><q-input
                        readonly
                        class="TwoTimeInpts"
                        style="margin-left: 10px; width: 32%"
                        label="Time out"
                        dense
                        outlined
                        v-model="viewSterilisationData.peak_1st_time_out"
                        mask="time"
                        :rules="[
                          'time',
                          (val) =>
                            (val && val.length > 0) ||
                            'Please provide a valid value',
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
                                v-model="
                                  viewSterilisationData.peak_1st_time_out
                                "
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
                        </template> </q-input
                      ><br />
                    </div>
                    <div class="input-feilds">
                      <span class="input-text">2nd Peak : </span
                      ><q-input
                        readonly
                        class="TwoTimeInpts"
                        dense
                        label="Time in"
                        style="width: 32%"
                        outlined
                        v-model="viewSterilisationData.peak_2nd_time_in"
                        mask="time"
                        :rules="[
                          'time',
                          (val) =>
                            (val && val.length > 0) ||
                            'Please provide a valid value',
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
                                v-model="viewSterilisationData.peak_2nd_time_in"
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
                        </template> </q-input
                      ><q-input
                        readonly
                        dense
                        class="TwoTimeInpts"
                        label="Time out"
                        style="margin-left: 10px; width: 32%"
                        outlined
                        v-model="viewSterilisationData.peak_2nd_time_out"
                        mask="time"
                        :rules="[
                          'time',
                          (val) =>
                            (val && val.length > 0) ||
                            'Please provide a valid value',
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
                                v-model="
                                  viewSterilisationData.peak_2nd_time_out
                                "
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
                        class="input-text ThirdPeakTxt"
                        style="margin-right: 74px"
                        >3rd Peak : </span
                      ><q-input
                        readonly
                        class="ThirdPeakInpt"
                        dense
                        label="Time in"
                        style="width: 30%"
                        outlined
                        v-model="viewSterilisationData.peak_3rd_time_in"
                        mask="time"
                        :rules="[
                          'time',
                          (val) =>
                            (val && val.length > 0) ||
                            'Please provide a valid value',
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
                                v-model="viewSterilisationData.peak_3rd_time_in"
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
                        </template> </q-input
                      ><q-input
                        readonly
                        class="ThirdPeakInpt"
                        dense
                        style="margin-left: 8px; width: 30%"
                        label="40 PSI"
                        outlined
                        v-model="viewSterilisationData.peak_3rd_40psi_time"
                        mask="time"
                        :rules="[
                          'time',
                          (val) =>
                            (val && val.length > 0) ||
                            'Please provide a valid value',
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
                                v-model="
                                  viewSterilisationData.peak_3rd_40psi_time
                                "
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
                      <q-input
                        readonly
                        class="ThirdPeakInpt"
                        dense
                        style="margin-left: 8px; width: 30%; margin-right: 6px"
                        label="Time out"
                        outlined
                        v-model="viewSterilisationData.peak_3rd_time_out"
                        mask="time"
                        :rules="[
                          'time',
                          (val) =>
                            (val && val.length > 0) ||
                            'Please provide a valid value',
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
                                v-model="
                                  viewSterilisationData.peak_3rd_time_out
                                "
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
                      <span class="input-text">No.of Cages : </span
                      ><q-select
                        readonly
                        outlined
                        dense
                        style="width: 40%; margin-bottom: 20px"
                        v-model="this.viewSterilisationData.no_of_cages"
                        :options="NoOfCagesOptions"
                        label="No of cages"
                      />
                    </div>
                    <div class="input-feilds">
                      <span class="input-text">Remarks : </span
                      ><q-input
                        readonly
                        outlined
                        dense
                        v-model="this.viewSterilisationData.remarks"
                        type="textarea"
                        float-label="Textarea"
                        :max-height="10"
                        :min-rows="2"
                        class="remarks"
                        style="width: 70%; margin-left: 10px"
                      />
                    </div>
                    <div class="btns">
                      <q-btn
                        class="q-pa-sm q-ml-xl"
                        color="primary"
                        label="Submit"
                        disable
                      />
                      <q-btn
                        @click="ResetForm"
                        class="q-pa-xsm"
                        style="margin-left: 10px"
                        color="secondary"
                        label="Reset"
                        disable
                      />
                    </div>
                  </q-form>
                </div>

                <div v-if="fourth" class="container q-mt-lg container-sm">
                  <q-form class="ster-form" ref="sterform">
                    <div class="input-feilds">
                      <span class="input-text">Batch No : </span>
                      <q-input
                        style="width: 40%"
                        dense
                        outlined
                        label="Batch No"
                        v-model="editSterilisationData.BatchNo"
                        type="text"
                        :rules="[required('Batch No')]"
                      />
                    </div>
                    <div class="input-feilds">
                      <span class="input-text">Date : </span
                      ><q-input
                        style="width: 40%"
                        dense
                        outlined
                        v-model="editSterilisationData.sterFormDate"
                        mask="date"
                        :rules="[required('Date')]"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                v-model="editSterilisationData.sterFormDate"
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
                      <span class="input-text">Shift : </span
                      ><q-select
                        outlined
                        dense
                        style="width: 40%; margin-bottom: 20px"
                        v-model="editSterilisationData.shift"
                        :options="shiftOptions"
                        label="Shift"
                        :rules="[required('Shift')]"
                      />
                    </div>

                    <div class="input-feilds">
                      <span class="input-text">Sterilizer no : </span
                      ><q-select
                        outlined
                        dense
                        style="width: 40%; margin-bottom: 20px"
                        v-model="editSterilisationData.sterilizerno"
                        :options="SterOptions"
                        label="Sterilizer no"
                        :rules="[required('Sterilizer no')]"
                      />
                    </div>
                    <div class="input-feilds" style="width: 100%">
                      <span class="input-text">1st peak :</span>
                      <q-input
                        class="TwoTimeInpts"
                        style="width: 32%"
                        label="Time in"
                        dense
                        outlined
                        v-model="editSterilisationData.firstpeaktimein"
                        mask="time"
                        :rules="[required('1st peak time in')]"
                      >
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-time
                                v-model="editSterilisationData.firstpeaktimein"
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

                      <q-input
                        class="TwoTimeInpts"
                        style="margin-left: 10px; width: 32%"
                        label="Time out"
                        dense
                        outlined
                        v-model="editSterilisationData.firstpeaktimeout"
                        mask="time"
                        :rules="[required('1st peak time out')]"
                      >
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-time
                                v-model="editSterilisationData.firstpeaktimeout"
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
                        </template> </q-input
                      ><br />
                    </div>
                    <div class="input-feilds">
                      <span class="input-text">2nd Peak : </span
                      ><q-input
                        class="TwoTimeInpts"
                        dense
                        label="Time in"
                        style="width: 32%"
                        outlined
                        v-model="editSterilisationData.secondpeaktimein"
                        mask="time"
                        :rules="[required('2nd peak time in')]"
                      >
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-time
                                v-model="editSterilisationData.secondpeaktimein"
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
                        </template> </q-input
                      ><q-input
                        dense
                        class="TwoTimeInpts"
                        label="Time out"
                        style="margin-left: 10px; width: 32%"
                        outlined
                        v-model="editSterilisationData.secondpeaktimeout"
                        mask="time"
                        :rules="[required('2nd peak time out')]"
                      >
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-time
                                v-model="
                                  editSterilisationData.secondpeaktimeout
                                "
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
                        class="input-text ThirdPeakTxt"
                        style="margin-right: 74px"
                        >3rd Peak : </span
                      ><q-input
                        class="ThirdPeakInpt"
                        dense
                        label="Time in"
                        style="width: 30%"
                        outlined
                        v-model="editSterilisationData.thirdpeaktimein"
                        mask="time"
                        :rules="[required('3rd peak time in')]"
                      >
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-time
                                v-model="editSterilisationData.thirdpeaktimein"
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
                        </template> </q-input
                      ><q-input
                        class="ThirdPeakInpt"
                        dense
                        style="margin-left: 8px; width: 30%"
                        label="40 PSI"
                        outlined
                        v-model="editSterilisationData.FortyPsi"
                        mask="time"
                        :rules="[required('forty PSI')]"
                      >
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-time v-model="editSterilisationData.FortyPsi">
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
                      <q-input
                        class="ThirdPeakInpt"
                        dense
                        style="margin-left: 8px; width: 30%; margin-right: 6px"
                        label="Time out"
                        outlined
                        v-model="editSterilisationData.thirdpeaktimeout"
                        mask="time"
                        :rules="[required('3rd peak time out')]"
                      >
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-time
                                v-model="editSterilisationData.thirdpeaktimeout"
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
                      <span class="input-text">No.of Cages : </span
                      ><q-select
                        outlined
                        dense
                        style="width: 40%; margin-bottom: 20px"
                        v-model="editSterilisationData.NoOfCages"
                        :options="NoOfCagesOptions"
                        label="No of Cages"
                        :rules="[required('no of cages')]"
                      />
                    </div>
                    <div class="input-feilds">
                      <span class="input-text">Remarks : </span
                      ><q-input
                        outlined
                        dense
                        v-model="editSterilisationData.remarks"
                        type="textarea"
                        float-label="Textarea"
                        :max-height="10"
                        :min-rows="2"
                        class="remarks"
                        style="width: 70%; margin-left: 10px"
                        :rules="[required('remarks')]"
                      />
                    </div>
                    <div class="btns">
                      <q-btn
                        class="q-pa-sm q-ml-xl"
                        color="primary"
                        label="Submit"
                        @click="onUpdateSterilisationStationLog()"
                      />
                      <q-btn
                        @click="ResetForm"
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
        <!-- view of shift log report -->
        <q-dialog
          v-model="shiftDataDialog"
          persistent
          :maximized="maximizedToggle"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-layout view="Lhh lpr fff" container class="bg-white">
            <q-header class="bg-primary">
              <q-bar class="bg-primary text-white">
                <q-icon name="feed"></q-icon>
                <div style="font-family: verdana">Shift Log Details</div>
                <q-space />
                <q-btn dense flat icon="close" @click="closeShiftDialog()">
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
                    v-model="shiftToggle"
                    checked-icon="check"
                    color="red"
                    unchecked-icon="clear"
                    size="lg"
                  />
                  <span class="q-ma-sm text-bold text-h6"> Edit</span>
                </div>
                <!-- view of shift -->
                <div v-if="!shiftToggle" class="container">
                  <q-form class="SrFm" @submit.prevent="ShiftReportOnSubmit">
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
                            v-model="viewShiftData.date"
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
                                  <q-date readonly v-model="viewShiftData.date">
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
                            >Unit : </span
                          ><q-select
                            readonly
                            outlined
                            dense
                            style="width: 55%; margin-bottom: 20px"
                            v-model="viewShiftData.unit"
                            :options="unitOptions"
                            label="Unit"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text input-text-bl-frm"
                            >Shift : </span
                          ><q-select
                            readonly
                            outlined
                            dense
                            style="width: 55%; margin-bottom: 20px"
                            v-model="viewShiftData.shift"
                            :options="shiftOptions"
                            label="Shift"
                          />
                        </div>
                      </div>
                      <div class="line-tr"></div>
                      <div class="right-container">
                        <div class="input-feilds">
                          <span
                            class="input-text input-text-bl-frm q-ml-md"
                            style="width: 198px"
                            >No. of Batches Sterilized : </span
                          ><q-input
                            readonly
                            dense
                            v-model="viewShiftData.no_of_batches_sterilized"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required Field',
                            ]"
                            type="number"
                            outlined
                            label="input"
                            style="width: 38%"
                          />
                        </div>
                        <div class="input-feilds">
                          <span
                            class="input-text input-text-bl-frm q-ml-md"
                            style="width: 198px"
                            >No. of Cages Processed : </span
                          ><q-input
                            readonly
                            dense
                            v-model="viewShiftData.no_of_cages_processed"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required Field',
                            ]"
                            type="text"
                            outlined
                            label="Input"
                            style="width: 38%"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="subtitle" style="margin-top: 20px">
                      <p class="text-center q-mt-sm">Press Running Hours</p>
                    </div>
                    <div class="flex justify-center">
                      <div class="left-container">
                        <div class="input-feilds q-mt-sm">
                          <span class="input-text Srinput">Press-1 : </span
                          ><q-input
                            readonly
                            style="width: 30%"
                            dense
                            v-model="viewShiftData.press_running_hrs_press1"
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
                          <span class="input-text Srinput">Press-2 : </span
                          ><q-input
                            readonly
                            style="width: 30%"
                            dense
                            v-model="viewShiftData.press_running_hrs_press2"
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
                          <span class="input-text Srinput">Press-3 : </span
                          ><q-input
                            style="width: 30%"
                            dense
                            v-model="viewShiftData.press_running_hrs_press3"
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
                      <div class="line-tr q-mt-sm"></div>
                      <div class="right-container">
                        <div class="input-feilds q-mt-sm">
                          <span class="input-text Srinput">Press-4 : </span
                          ><q-input
                            readonly
                            style="width: 30%"
                            dense
                            v-model="viewShiftData.press_running_hrs_press4"
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
                          <span class="input-text Srinput">Total Hours : </span
                          ><q-input
                            readonly
                            style="width: 30%"
                            dense
                            v-model="viewShiftData.press_running_total_hrs"
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
                    <div class="subtitle" style="margin-top: 20px">
                      <p class="text-center q-mt-sm">
                        EFB Section Running Hours
                      </p>
                    </div>
                    <div class="flex flex-center">
                      <div class="input-feilds q-mt-md">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th>Shd-1</th>
                              <th>Shd-2</th>
                              <th>Shd-3</th>
                              <th>Shd-4</th>
                              <th>Total Hours</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 100px"
                                  dense
                                  v-model="viewShiftData.efb_shd1"
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
                                  v-model="viewShiftData.efb_shd2"
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
                                  v-model="viewShiftData.efb_shd3"
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
                                  v-model="viewShiftData.efb_shd4"
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
                                  v-model="viewShiftData.efb_shd_total_hrs"
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
                              <th>Prs-1</th>
                              <th>Prs-2</th>
                              <th>Prs-3</th>
                              <th>Prs-4</th>
                              <th>Total Hours</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 100px"
                                  dense
                                  v-model="viewShiftData.efb_prs1"
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
                                  v-model="viewShiftData.efb_prs2"
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
                                  v-model="viewShiftData.efb_prs3"
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
                                  v-model="viewShiftData.efb_prs4"
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
                                  v-model="viewShiftData.efb_prs_total_hrs"
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
                      <p class="text-center q-mt-sm">Equipment Running Hours</p>
                    </div>
                    <div class="flex flex-center">
                      <div class="input-feilds q-mt-md">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th>Decanter-1</th>
                              <th>Decanter-2</th>
                              <th>Decanter-3</th>
                              <th>Total Hours</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 100px"
                                  dense
                                  v-model="viewShiftData.decanter1"
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
                                  v-model="viewShiftData.decanter2"
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
                                  v-model="viewShiftData.decanter3"
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
                                  v-model="viewShiftData.total_hrs_decanter"
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
                              <!-- <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="LP"
                      :rules="[
                        (val) => (val && val.length > 0) || 'Required field',
                      ]"
                      type="number"
                      outlined
                      label="Input"
                    />
                  </td> -->
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="input-feilds q-mt-md">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th colspan="5">Nozzle Contrifuge (CPO)</th>
                            </tr>
                            <tr>
                              <th>No 1</th>
                              <th>No 2</th>
                              <th>No 3</th>
                              <th>No 4</th>
                              <th>Total Hours</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 100px"
                                  dense
                                  v-model="viewShiftData.nozzle_centrifuge_1"
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
                                  v-model="viewShiftData.nozzle_centrifuge_2"
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
                                  v-model="viewShiftData.nozzle_centrifuge_3"
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
                                  v-model="viewShiftData.nozzle_centrifuge_4"
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
                                    viewShiftData.total_hrs_nozzle_centrifuge
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
                      <div
                        class="input-feilds q-mt-md"
                        style="margin-left: 47px; margin-right: 40px"
                      >
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th colspan="6">Flow Meter Reading (CPO)</th>
                            </tr>
                            <tr>
                              <th>Opening</th>
                              <th>Closing</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 100px"
                                  dense
                                  v-model="viewShiftData.cpo_flow_meter_opening"
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
                                  v-model="viewShiftData.cpo_flow_meter_closing"
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
                                    viewShiftData.cpo_flow_meter_total_qty
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
                          <thead>
                            <tr>
                              <th>Wel Oil</th>
                              <th>Sludge</th>
                              <th>OER</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 100px"
                                  dense
                                  v-model="viewShiftData.cpo_flow_meter_wel_oil"
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
                                  v-model="viewShiftData.cpo_flow_meter_sludge"
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
                                  v-model="viewShiftData.cpo_flow_meter_oer"
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
                              <th colspan="3">Kernel Section Running Hrs.</th>
                            </tr>
                            <tr>
                              <th>Silo-1</th>
                              <th>Silo-2</th>
                              <th>Silo-3</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 100px"
                                  dense
                                  v-model="viewShiftData.kernel_hrs_silo1"
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
                                  v-model="viewShiftData.kernel_hrs_silo2"
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
                                  v-model="viewShiftData.kernel_hrs_silo3"
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
                      <div class="input-feilds q-mt-md q-mr-sm">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th colspan="7">
                                Eepellers Section Running Hrs.
                              </th>
                            </tr>
                            <tr>
                              <th>A1</th>
                              <th>A2</th>
                              <th>A3</th>
                              <th>A4</th>
                              <th>A5</th>
                              <th>A6</th>
                              <th>Total hrs</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 70px"
                                  dense
                                  v-model="viewShiftData.esrh_a1"
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
                                  style="width: 90px"
                                  dense
                                  v-model="viewShiftData.esrh_a2"
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
                                  style="width: 90px"
                                  dense
                                  v-model="viewShiftData.esrh_a3"
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
                                  style="width: 90px"
                                  dense
                                  v-model="viewShiftData.esrh_a4"
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
                                  style="width: 90px"
                                  dense
                                  v-model="viewShiftData.esrh_a5"
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
                                  style="width: 90px"
                                  dense
                                  v-model="viewShiftData.esrh_a6"
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
                                  style="width: 90px"
                                  dense
                                  v-model="viewShiftData.total_esrh_a_epellers"
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
                          <thead>
                            <tr>
                              <th>B1</th>
                              <th>B2</th>
                              <th>B3</th>
                              <th>B4</th>
                              <th>B5</th>
                              <th>B6</th>
                              <th>Total hrs</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 80px"
                                  dense
                                  v-model="viewShiftData.esrh_b1"
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
                                  style="width: 80px"
                                  dense
                                  v-model="viewShiftData.esrh_b2"
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
                                  style="width: 80px"
                                  dense
                                  v-model="viewShiftData.esrh_b3"
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
                                  style="width: 80px"
                                  dense
                                  v-model="viewShiftData.esrh_b4"
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
                                  style="width: 80px"
                                  dense
                                  v-model="viewShiftData.esrh_b5"
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
                                  style="width: 80px"
                                  dense
                                  v-model="viewShiftData.esrh_b6"
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
                                  style="width: 80px"
                                  dense
                                  v-model="viewShiftData.total_hrs_b_epellers"
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
                              <th colspan="6">Flow mtr reading (CPKO)</th>
                            </tr>
                            <tr>
                              <th>Opening</th>
                              <th>Closing</th>
                              <th>Total Qty</th>
                              <th>OER</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 100px"
                                  dense
                                  v-model="viewShiftData.cpko_opening"
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
                                  v-model="viewShiftData.cpko_closing"
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
                                  v-model="viewShiftData.cpko_total_qty"
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
                                  v-model="viewShiftData.cpko_oer"
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
                              <th>DOC bags Filling</th>
                              <th>DOC Stock</th>
                              <th>Dispatches</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 100px"
                                  dense
                                  v-model="viewShiftData.cpko_doc_bags_filling"
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
                                  v-model="viewShiftData.cpko_doc_stock"
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
                                  v-model="viewShiftData.cpko_dispatches"
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
                    <div class="flex flex-center">
                      <div class="input-feilds q-mt-md">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th>FFB Ramp</th>
                              <th>FFB Cages</th>
                              <th>Ster FFB</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 100px"
                                  dense
                                  v-model="viewShiftData.ffb_ramp"
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
                                  v-model="viewShiftData.ffb_cages"
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
                                  v-model="viewShiftData.ster_ffb"
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
                          <thead>
                            <tr>
                              <th>Stenlizer 1</th>
                              <th>Stenlizer 2</th>
                              <th>Stenlizer 3</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 100px"
                                  dense
                                  v-model="viewShiftData.stenlizer1"
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
                                  v-model="viewShiftData.stenlizer2"
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
                                  v-model="viewShiftData.stenlizer3"
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
                          <thead>
                            <tr>
                              <th>Pending Vehicle</th>
                              <th>Shift unloading Qty</th>
                              <th>Week Total FFB</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  readonly
                                  style="width: 100px"
                                  dense
                                  v-model="viewShiftData.pending_vehicles"
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
                                  v-model="viewShiftData.shift_unloading_qty"
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
                                  v-model="viewShiftData.weak_total_ffb"
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
                    <div class="split-container q-mt-lg">
                      <div class="left-container">
                        <div class="input-feilds">
                          <span
                            class="input-text input-text-bl-frm q-ml-md"
                            style="width: 198px"
                            >Boiler runing Hours : </span
                          ><q-input
                            readonly
                            dense
                            v-model="viewShiftData.boiler_running_hrs"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required Field',
                            ]"
                            type="text"
                            outlined
                            label="Input"
                            style="width: 38%"
                          />
                        </div>
                        <div class="input-feilds">
                          <span
                            class="input-text input-text-bl-frm q-ml-md"
                            style="width: 198px"
                            >Feed Water Cons : </span
                          ><q-input
                            dense
                            readonly
                            v-model="viewShiftData.feed_water_cans"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required Field',
                            ]"
                            type="text"
                            outlined
                            label="Input"
                            style="width: 38%"
                          />
                        </div>
                        <div class="input-feilds">
                          <span
                            class="input-text input-text-bl-frm q-ml-md"
                            style="width: 198px"
                            >Steam Cone : </span
                          ><q-input
                            dense
                            readonly
                            v-model="viewShiftData.steam_cone"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required Field',
                            ]"
                            type="text"
                            outlined
                            label="Input"
                            style="width: 38%"
                          />
                        </div>
                      </div>
                      <div class="line-tr"></div>
                      <div class="right-container">
                        <div class="input-feilds">
                          <span
                            class="input-text input-text-bl-frm q-ml-md"
                            style="width: 198px"
                            >Feed Water Stock : </span
                          ><q-input
                            readonly
                            dense
                            v-model="viewShiftData.feed_water_stock"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required Field',
                            ]"
                            type="number"
                            outlined
                            label="input"
                            style="width: 38%"
                          />
                        </div>
                        <div class="input-feilds">
                          <span
                            class="input-text input-text-bl-frm q-ml-md"
                            style="width: 198px"
                            >T.G Running Hours : </span
                          ><q-input
                            dense
                            readonly
                            v-model="viewShiftData.tg_running_hrs"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required Field',
                            ]"
                            type="text"
                            outlined
                            label="Input"
                            style="width: 38%"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="input-feilds q-mt-md">
                      <span class="input-text" style="width: 100px"
                        >Remarks : </span
                      ><q-input
                        readonly
                        outlined
                        dense
                        v-model="viewShiftData.remarks"
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
                        style="margin-left: -80px"
                        class="q-pa-sm"
                        color="primary"
                        label="Submit"
                      />
                      <q-btn
                        disable
                        @click="ShiftReportOnReset"
                        class="q-pa-xsm"
                        style="margin-left: 10px"
                        color="secondary"
                        label="Reset"
                      />
                    </div>
                  </q-form>
                </div>

                <!-- edit of shift -->

                <div v-if="shiftToggle" class="container">
                  <q-form
                    ref="shiftForm"
                    class="SrFm"
                    @submit.prevent="onUpdateTurbineLog"
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
                            v-model="editShiftData.date"
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
                                  <q-date v-model="editShiftData.date">
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
                            >Unit : </span
                          ><q-select
                            outlined
                            dense
                            style="width: 55%; margin-bottom: 20px"
                            v-model="editShiftData.unit"
                            :options="unitOptions"
                            label="Unit"
                          />
                        </div>
                        <div class="input-feilds">
                          <span class="input-text input-text-bl-frm"
                            >Shift : </span
                          ><q-select
                            outlined
                            dense
                            style="width: 55%; margin-bottom: 20px"
                            v-model="editShiftData.shift"
                            :options="shiftOptions"
                            label="Shift"
                          />
                        </div>
                      </div>
                      <div class="line-tr"></div>
                      <div class="right-container">
                        <div class="input-feilds">
                          <span
                            class="input-text input-text-bl-frm q-ml-md"
                            style="width: 198px"
                            >No. of Batches Sterilized : </span
                          ><q-input
                            dense
                            v-model="editShiftData.no_of_batches_sterilized"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required Field',
                            ]"
                            type="number"
                            outlined
                            label="input"
                            style="width: 38%"
                          />
                        </div>
                        <div class="input-feilds">
                          <span
                            class="input-text input-text-bl-frm q-ml-md"
                            style="width: 198px"
                            >No. of Cages Processed : </span
                          ><q-input
                            dense
                            v-model="editShiftData.no_of_cages_processed"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required Field',
                            ]"
                            type="text"
                            outlined
                            label="Input"
                            style="width: 38%"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="subtitle" style="margin-top: 20px">
                      <p class="text-center q-mt-sm">Press Running Hours</p>
                    </div>
                    <div class="flex justify-center">
                      <div class="left-container">
                        <div class="input-feilds q-mt-sm">
                          <span class="input-text Srinput">Press-1 : </span
                          ><q-input
                            style="width: 30%"
                            dense
                            v-model="editShiftData.press_running_hrs_press1"
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
                          <span class="input-text Srinput">Press-2 : </span
                          ><q-input
                            style="width: 30%"
                            dense
                            v-model="editShiftData.press_running_hrs_press2"
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
                          <span class="input-text Srinput">Press-3 : </span
                          ><q-input
                            style="width: 30%"
                            dense
                            v-model="editShiftData.press_running_hrs_press3"
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
                      <div class="line-tr q-mt-sm"></div>
                      <div class="right-container">
                        <div class="input-feilds q-mt-sm">
                          <span class="input-text Srinput">Press-4 : </span
                          ><q-input
                            style="width: 30%"
                            dense
                            v-model="editShiftData.press_running_hrs_press4"
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
                          <span class="input-text Srinput">Total Hours : </span
                          ><q-input
                            style="width: 30%"
                            dense
                            v-model="editShiftData.press_running_total_hrs"
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
                    <div class="subtitle" style="margin-top: 20px">
                      <p class="text-center q-mt-sm">
                        EFB Section Running Hours
                      </p>
                    </div>
                    <div class="flex flex-center">
                      <div class="input-feilds q-mt-md">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th>Shd-1</th>
                              <th>Shd-2</th>
                              <th>Shd-3</th>
                              <th>Shd-4</th>
                              <th>Total Hours</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 100px"
                                  dense
                                  v-model="editShiftData.efb_shd1"
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
                                  v-model="editShiftData.efb_shd2"
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
                                  v-model="editShiftData.efb_shd3"
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
                                  v-model="editShiftData.efb_shd4"
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
                                  v-model="editShiftData.efb_shd_total_hrs"
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
                              <th>Prs-1</th>
                              <th>Prs-2</th>
                              <th>Prs-3</th>
                              <th>Prs-4</th>
                              <th>Total Hours</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 100px"
                                  dense
                                  v-model="editShiftData.efb_prs1"
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
                                  v-model="editShiftData.efb_prs2"
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
                                  v-model="editShiftData.efb_prs3"
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
                                  v-model="editShiftData.efb_prs4"
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
                                  v-model="editShiftData.efb_prs_total_hrs"
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
                      <p class="text-center q-mt-sm">Equipment Running Hours</p>
                    </div>
                    <div class="flex flex-center">
                      <div class="input-feilds q-mt-md">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th>Decanter-1</th>
                              <th>Decanter-2</th>
                              <th>Decanter-3</th>
                              <th>Total Hours</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 100px"
                                  dense
                                  v-model="editShiftData.decanter1"
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
                                  v-model="editShiftData.decanter2"
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
                                  v-model="editShiftData.decanter3"
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
                                  v-model="editShiftData.total_hrs_decanter"
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
                              <!-- <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="LP"
                      :rules="[
                        (val) => (val && val.length > 0) || 'Required field',
                      ]"
                      type="number"
                      outlined
                      label="Input"
                    />
                  </td> -->
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="input-feilds q-mt-md">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th colspan="5">Nozzle Contrifuge (CPO)</th>
                            </tr>
                            <tr>
                              <th>No 1</th>
                              <th>No 2</th>
                              <th>No 3</th>
                              <th>No 4</th>
                              <th>Total Hours</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 100px"
                                  dense
                                  v-model="editShiftData.nozzle_centrifuge_1"
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
                                  v-model="editShiftData.nozzle_centrifuge_2"
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
                                  v-model="editShiftData.nozzle_centrifuge_3"
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
                                  v-model="editShiftData.nozzle_centrifuge_4"
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
                                    editShiftData.total_hrs_nozzle_centrifuge
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
                      <div
                        class="input-feilds q-mt-md"
                        style="margin-left: 47px; margin-right: 40px"
                      >
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th colspan="6">Flow Meter Reading (CPO)</th>
                            </tr>
                            <tr>
                              <th>Opening</th>
                              <th>Closing</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 100px"
                                  dense
                                  v-model="editShiftData.cpo_flow_meter_opening"
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
                                  v-model="editShiftData.cpo_flow_meter_closing"
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
                                    editShiftData.cpo_flow_meter_total_qty
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
                          <thead>
                            <tr>
                              <th>Wel Oil</th>
                              <th>Sludge</th>
                              <th>OER</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 100px"
                                  dense
                                  v-model="editShiftData.cpo_flow_meter_wel_oil"
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
                                  v-model="editShiftData.cpo_flow_meter_sludge"
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
                                  v-model="editShiftData.cpo_flow_meter_oer"
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
                              <th colspan="3">Kernel Section Running Hrs.</th>
                            </tr>
                            <tr>
                              <th>Silo-1</th>
                              <th>Silo-2</th>
                              <th>Silo-3</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 100px"
                                  dense
                                  v-model="editShiftData.kernel_hrs_silo1"
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
                                  v-model="editShiftData.kernel_hrs_silo2"
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
                                  v-model="editShiftData.kernel_hrs_silo3"
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
                      <div class="input-feilds q-mt-md q-mr-sm">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th colspan="7">
                                Eepellers Section Running Hrs.
                              </th>
                            </tr>
                            <tr>
                              <th>A1</th>
                              <th>A2</th>
                              <th>A3</th>
                              <th>A4</th>
                              <th>A5</th>
                              <th>A6</th>
                              <th>Total hrs</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 70px"
                                  dense
                                  v-model="editShiftData.esrh_a1"
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
                                  style="width: 90px"
                                  dense
                                  v-model="editShiftData.esrh_a2"
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
                                  style="width: 90px"
                                  dense
                                  v-model="editShiftData.esrh_a3"
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
                                  style="width: 90px"
                                  dense
                                  v-model="editShiftData.esrh_a4"
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
                                  style="width: 90px"
                                  dense
                                  v-model="editShiftData.esrh_a5"
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
                                  style="width: 90px"
                                  dense
                                  v-model="editShiftData.esrh_a6"
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
                                  style="width: 90px"
                                  dense
                                  v-model="editShiftData.total_esrh_a_epellers"
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
                          <thead>
                            <tr>
                              <th>B1</th>
                              <th>B2</th>
                              <th>B3</th>
                              <th>B4</th>
                              <th>B5</th>
                              <th>B6</th>
                              <th>Total hrs</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 80px"
                                  dense
                                  v-model="editShiftData.esrh_b1"
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
                                  style="width: 80px"
                                  dense
                                  v-model="editShiftData.esrh_b2"
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
                                  style="width: 80px"
                                  dense
                                  v-model="editShiftData.esrh_b3"
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
                                  style="width: 80px"
                                  dense
                                  v-model="editShiftData.esrh_b4"
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
                                  style="width: 80px"
                                  dense
                                  v-model="editShiftData.esrh_b5"
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
                                  style="width: 80px"
                                  dense
                                  v-model="editShiftData.esrh_b6"
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
                                  style="width: 80px"
                                  dense
                                  v-model="editShiftData.total_hrs_b_epellers"
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
                              <th colspan="6">Flow mtr reading (CPKO)</th>
                            </tr>
                            <tr>
                              <th>Opening</th>
                              <th>Closing</th>
                              <th>Total Qty</th>
                              <th>OER</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 100px"
                                  dense
                                  v-model="editShiftData.cpko_opening"
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
                                  v-model="editShiftData.cpko_closing"
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
                                  v-model="editShiftData.cpko_total_qty"
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
                                  v-model="editShiftData.cpko_oer"
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
                              <th>DOC bags Filling</th>
                              <th>DOC Stock</th>
                              <th>Dispatches</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 100px"
                                  dense
                                  v-model="editShiftData.cpko_doc_bags_filling"
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
                                  v-model="editShiftData.cpko_doc_stock"
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
                                  v-model="editShiftData.cpko_dispatches"
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
                    <div class="flex flex-center">
                      <div class="input-feilds q-mt-md">
                        <table class="long-feilds">
                          <thead>
                            <tr>
                              <th>FFB Ramp</th>
                              <th>FFB Cages</th>
                              <th>Ster FFB</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 100px"
                                  dense
                                  v-model="editShiftData.ffb_ramp"
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
                                  v-model="editShiftData.ffb_cages"
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
                                  v-model="editShiftData.ster_ffb"
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
                          <thead>
                            <tr>
                              <th>Stenlizer 1</th>
                              <th>Stenlizer 2</th>
                              <th>Stenlizer 3</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 100px"
                                  dense
                                  v-model="editShiftData.stenlizer1"
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
                                  v-model="editShiftData.stenlizer2"
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
                                  v-model="editShiftData.stenlizer3"
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
                          <thead>
                            <tr>
                              <th>Pending Vehicle</th>
                              <th>Shift unloading Qty</th>
                              <th>Week Total FFB</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <q-input
                                  style="width: 100px"
                                  dense
                                  v-model="editShiftData.pending_vehicles"
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
                                  v-model="editShiftData.shift_unloading_qty"
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
                                  v-model="editShiftData.weak_total_ffb"
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
                    <div class="split-container q-mt-lg">
                      <div class="left-container">
                        <div class="input-feilds">
                          <span
                            class="input-text input-text-bl-frm q-ml-md"
                            style="width: 198px"
                            >Boiler runing Hours : </span
                          ><q-input
                            dense
                            v-model="editShiftData.boiler_running_hrs"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required Field',
                            ]"
                            type="text"
                            outlined
                            label="Input"
                            style="width: 38%"
                          />
                        </div>
                        <div class="input-feilds">
                          <span
                            class="input-text input-text-bl-frm q-ml-md"
                            style="width: 198px"
                            >Feed Water Cons : </span
                          ><q-input
                            dense
                            v-model="editShiftData.feed_water_cans"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required Field',
                            ]"
                            type="text"
                            outlined
                            label="Input"
                            style="width: 38%"
                          />
                        </div>
                        <div class="input-feilds">
                          <span
                            class="input-text input-text-bl-frm q-ml-md"
                            style="width: 198px"
                            >Steam Cone : </span
                          ><q-input
                            dense
                            v-model="editShiftData.steam_cone"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required Field',
                            ]"
                            type="text"
                            outlined
                            label="Input"
                            style="width: 38%"
                          />
                        </div>
                      </div>
                      <div class="line-tr"></div>
                      <div class="right-container">
                        <div class="input-feilds">
                          <span
                            class="input-text input-text-bl-frm q-ml-md"
                            style="width: 198px"
                            >Feed Water Stock : </span
                          ><q-input
                            dense
                            v-model="editShiftData.feed_water_stock"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required Field',
                            ]"
                            type="number"
                            outlined
                            label="input"
                            style="width: 38%"
                          />
                        </div>
                        <div class="input-feilds">
                          <span
                            class="input-text input-text-bl-frm q-ml-md"
                            style="width: 198px"
                            >T.G Running Hours : </span
                          ><q-input
                            dense
                            v-model="editShiftData.tg_running_hrs"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) || 'Required Field',
                            ]"
                            type="text"
                            outlined
                            label="Input"
                            style="width: 38%"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="input-feilds q-mt-md">
                      <span class="input-text" style="width: 100px"
                        >Remarks : </span
                      ><q-input
                        outlined
                        dense
                        v-model="editShiftData.remarks"
                        type="textarea"
                        float-label="Textarea"
                        :max-height="10"
                        :min-rows="2"
                        style="width: 70%; margin-left: 28px"
                      />
                    </div>
                    <div class="btns">
                      <q-btn
                        type="submit"
                        style="margin-left: -80px"
                        class="q-pa-sm"
                        color="primary"
                        label="Submit"
                        @click="onUpdateShiftLog"
                      />
                      <q-btn
                        @click="ShiftReportOnReset"
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
      ...validations,
      UserInfo: {},
      differentReport: [
        {
          label: "Sterilisation Station Log Report",
          value: "Sterilisation Station Log Report",
        },
        { label: "Turbine Log Report", value: "Turbine Log Report" },
        { label: "Boiler Log Report", value: "Boiler Log Report" },
        { label: "Shift Report", value: "Shift Report" },
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
      editSterilisationData: {
        BatchNo: "",
        sterFormDate: "",
        shift: "",
        sterilizerno: "",
        firstpeaktimein: "",
        firstpeaktimeout: "",
        secondpeaktimein: "",
        secondpeaktimeout: "",
        thirdpeaktimein: "",
        thirdpeaktimeout: "",
        FortyPsi: "",
        NoOfCages: "",
        remarks: "",
        server_datetime:"",
      },

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
      viewTurbineData: {},
      viewTurbineDataIndex: {},
      turbineDataDialog: false,
      viewDataItem: [],

      // boiler data
      viewBoilerData: {},
      viewBoilerDataIndex: {},
      boilerDataDialog: false,
      boilerToggle: false,

      // shift data
      viewShiftData: {},
      viewShiftDataIndex: {},
      shiftDataDialog: false,
      shiftToggle: false,

      editShiftData: {
        date: date.formatDate(Date.now(), "YYYY/MM/DD"),
        unit: "",
        shift: "",
        shift_options: ["A", "B", "C", "D"],
        unitOptions: ["I", "II", "III"],
        no_of_batches_sterilized: "",
        no_of_cages_processed: "",
        press_running_hrs_press1: "",
        press_running_hrs_press2: "",
        press_running_hrs_press3: "",
        press_running_hrs_press4: "",
        press_running_total_hrs: "",
        efb_shd1: "",
        efb_shd2: "",
        efb_shd3: "",
        efb_shd4: "",
        efb_shd_total_hrs: "",
        efb_prs1: "",
        efb_prs2: "",
        efb_prs3: "",
        efb_prs4: "",
        efb_prs_total_hrs: "",
        decanter1: "",
        decanter2: "",
        decanter3: "",
        total_hrs_decanter: "",
        nozzle_centrifuge_1: "",
        nozzle_centrifuge_2: "",
        nozzle_centrifuge_3: "",
        nozzle_centrifuge_4: "",
        total_hrs_nozzle_centrifuge: "",
        cpo_flow_meter_opening: "",
        cpo_flow_meter_closing: "",
        cpo_flow_meter_total_qty: "",
        cpo_flow_meter_wel_oil: "",
        cpo_flow_meter_sludge: "",
        cpo_flow_meter_oer: "",
        kernel_hrs_silo1: "",
        kernel_hrs_silo2: "",
        kernel_hrs_silo3: "",
        esrh_a1: "",
        esrh_a2: "",
        esrh_a3: "",
        esrh_a4: "",
        esrh_a5: "",
        esrh_a6: "",
        total_esrh_a_epellers: "",
        esrh_b1: "",
        esrh_b2: "",
        esrh_b3: "",
        esrh_b4: "",
        esrh_b5: "",
        esrh_b6: "",
        total_hrs_b_epellers: "",
        cpko_opening: "",
        cpko_closing: "",
        cpko_total_qty: "",
        cpko_oer: "",
        cpko_doc_bags_filling: "",
        cpko_doc_stock: "",
        cpko_dispatches: "",
        ffb_ramp: "",
        ffb_cages: "",
        ster_ffb: "",
        stenlizer1: "",
        stenlizer2: "",
        stenlizer3: "",
        pending_vehicles: "",
        shift_unloading_qty: "",
        weak_total_ffb: "",
        boiler_running_hrs: "",
        feed_water_cans: "",
        steam_cone: "",
        feed_water_stock: "",
        tg_running_hrs: "",
        remarks: "",
      },
      // headerValue:"Sterilisation Station Log Report",
    };
  },
  created() {
    this.UserInfo = this.GetUserInfo();
  },
  computed: {
    ...mapState({
      sterilisation_log_report_data: (state) =>
        state.reports.sterilisation_log_report_data,
      sterilisation_station_columns: (state) =>
        state.reports.sterilisation_station_columns,
      turbine_log_report_data: (state) => state.reports.turbine_log_report_data,
      turbine_log_columns: (state) => state.reports.turbine_log_columns,
      boiler_log_report_data: (state) => state.reports.boiler_log_report_data,
      boiler_log_columns: (state) => state.reports.boiler_log_columns,
      shift_log_report_data: (state) => state.reports.shift_log_report_data,
      shift_log_columns: (state) => state.reports.shift_log_columns,
    }),
    GetDate() {
      const timeStamp = Date.now();
      const formattedString = date.formatDate(timeStamp, "YYYY/MM/DD");
      return formattedString;
    },
    //  ...mapGetters("reports", ["sterilisation_station_columns"]),
  },

  methods: {
    ...mapActions("reports", ["loadReportWiseSterilizationLogData"]),
    ...mapActions("reports", ["loadReportWiseTurbineLogData"]),
    ...mapActions("reports", ["loadReportWiseBoilerLogData"]),
    ...mapActions("reports", ["loadReportWiseShiftLogData"]),
    ...mapActions("reports", ["updateSterilisationStationLog"]),
    ...mapActions("reports", ["updateTurbineLog"]),
    ...mapActions("reports", ["updateBoilerLog"]),
    ...mapActions("reports", ["updateShiftLog"]),

    async reloadPage() {
      this.$router.go(0);
      window.location.reload();
    },

    loadSelectData() {
      // this.$store.state.reports.sterilisation_log_report_data = [];
      // this.$store.state.reports.turbine_log_report_data = [];
      // this.$store.state.reports.boiler_log_report_data = [];
      // this.$store.state.reports.shift_log_report_data = [];

      this.$store.commit("reports/CLEAR_STERILISATION_LOG_REPORT_DATA");
      this.$store.commit("reports/CLEAR_TURBINE_LOG_REPORT_DATA");
      this.$store.commit("reports/CLEAR_BOILER_LOG_REPORT_DATA");
      this.$store.commit("reports/CLEAR_SHIFT_LOG_REPORT_DATA");

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
        if (
          this.report.reportName.value === "Sterilisation Station Log Report"
        ) {
          let user = JSON.parse(localStorage.getItem("userDetails"));
          const sterUserReport = { ...user, ...this.report };
          this.loadReportWiseSterilizationLogData(sterUserReport);
        } else if (this.report.reportName.value === "Turbine Log Report") {
          let user = JSON.parse(localStorage.getItem("userDetails"));
          const turbineUserReport = { ...user, ...this.report };

          this.loadReportWiseTurbineLogData(turbineUserReport);
        } else if (this.report.reportName.value === "Boiler Log Report") {
          let user = JSON.parse(localStorage.getItem("userDetails"));
          const boilerUserReport = { ...user, ...this.report };

          this.loadReportWiseBoilerLogData(boilerUserReport);
        } else if (this.report.reportName.value === "Shift Report") {
          let user = JSON.parse(localStorage.getItem("userDetails"));
          const shiftUserReport = { ...user, ...this.report };
          this.loadReportWiseShiftLogData(shiftUserReport);
        }
      } else {
        window.alert("please fill the form correctly");
      }
    },

    viewSterilisationDataItem(item) {
      this.viewSterilisationData = {};
      this.viewSterilisationDataIndex = {};

      this.viewSterilisationDataIndex = this.data.indexOf(item);
      this.viewSterilisationData = Object.assign({}, item);

      this.sterilisationDataDialog = true;

      this.editSterilisationData.BatchNo = item.batch_no;
      this.editSterilisationData.sterFormDate = item.date;
      this.editSterilisationData.shift = item.shift;
      this.editSterilisationData.sterilizerno = item.sterilizer_no;
      this.editSterilisationData.firstpeaktimein = item.peak_1st_time_in;
      this.editSterilisationData.firstpeaktimeout = item.peak_1st_time_out;
      this.editSterilisationData.secondpeaktimein = item.peak_2nd_time_in;
      this.editSterilisationData.secondpeaktimeout = item.peak_2nd_time_in;
      this.editSterilisationData.thirdpeaktimein = item.peak_3rd_time_in;
      this.editSterilisationData.thirdpeaktimeout = item.peak_3rd_time_out;
      this.editSterilisationData.FortyPsi = item.peak_3rd_40psi_time;
      this.editSterilisationData.NoOfCages = item.no_of_cages;
      this.editSterilisationData.remarks = item.remarks;
      this.editSterilisationData.sno = item.sno;
    },

    closeSterilisationDialog() {
      this.sterilisationDataDialog = false;
    },

    closeTurbineDialog() {
      this.turbineDataDialog = false;
    },

    closeEditSterilisationDialog() {
      this.sterilisationDataDialog = true;
      this.editSterilisationDataDialog = false;
    },

    editSterilisationForm(item) {
      console.log("8790",item)
      (this.editSterilisationData.BatchNo = item.batch_no),
        (this.editSterilisationData.sterFormDate = item.date),
        (this.editSterilisationData.shift = item.shift),
        (this.editSterilisationData.sterilizerno = item.sterilizer_no),
        (this.editSterilisationData.firstpeaktimein = item.peak_1st_time_in),
        (this.editSterilisationData.firstpeaktimeout = item.peak_1st_time_out),
        (this.editSterilisationData.secondpeaktimein = item.peak_2nd_time_in),
        (this.editSterilisationData.secondpeaktimeout = item.peak_2nd_time_in),
        (this.editSterilisationData.thirdpeaktimein = item.peak_3rd_time_in),
        (this.editSterilisationData.thirdpeaktimeout = item.peak_3rd_time_out),
        (this.editSterilisationData.FortyPsi = item.peak_3rd_40psi_time),
        (this.editSterilisationData.NoOfCages = item.no_of_cages),
        (this.editSterilisationData.remarks = item.remarks),
        (this.editSterilisationData.sno = item.sno),
        (this.editSterilisationData.server_datetime=item.server_datetime),
        this.sterilisationDataDialog = false;
      this.editSterilisationDataDialog = true;
    },

    // update sterilisation staion log data

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

    async onUpdateSterilisationStationLog() {
      console.log("7955",this.editSterilisationData)
      const validate = await this.$refs.sterform.validate();
      if (validate) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Do you want to Update data ?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          console.log("7955",this.editSterilisationData)
          this.updateSterilisationStationLog(this.editSterilisationData);
        })
        .onCancel(() => {});
      }

      else{
        Notify.create({
                  message: "Please Fill the Form Properly",
                  color: "negative",
                  position: "top",
                  timeout: 2000,
                });
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

    viewShiftDataItem(item) {
      this.viewShiftData = {};
      this.viewShiftDataIndex = {};

      this.viewShiftDataIndex = this.data.indexOf(item);
      this.viewShiftData = Object.assign({}, item);
      this.shiftDataDialog = true;
      this.editShiftData.boiler_running_hrs = item.boiler_running_hrs;
      this.editShiftData.cpko_closing = item.cpko_closing;
      this.editShiftData.cpko_dispatches = item.cpko_dispatches;
      this.editShiftData.cpko_doc_bags_filling = item.cpko_doc_bags_filling;
      this.editShiftData.cpko_doc_stock = item.cpko_doc_stock;
      this.editShiftData.cpko_oer = item.cpko_oer;
      this.editShiftData.cpko_opening = item.cpko_opening;
      this.editShiftData.cpko_total_qty = item.cpko_total_qty;
      this.editShiftData.cpo_flow_meter_closing = item.cpo_flow_meter_closing;
      this.editShiftData.cpo_flow_meter_oer = item.cpo_flow_meter_oer;
      this.editShiftData.cpo_flow_meter_opening = item.cpo_flow_meter_opening;
      this.editShiftData.cpo_flow_meter_sludge = item.cpo_flow_meter_sludge;
      this.editShiftData.cpo_flow_meter_total_qty =
        item.cpo_flow_meter_total_qty;
      this.editShiftData.cpo_flow_meter_wel_oil = item.cpo_flow_meter_wel_oil;
      this.editShiftData.feed_water_totalizer = item.feed_water_totalizer;
      this.editShiftData.date = item.date;
      this.editShiftData.decanter1 = item.decanter1;
      this.editShiftData.decanter2 = item.decanter2;
      this.editShiftData.decanter3 = item.decanter3;
      this.editShiftData.efb_prs1 = item.efb_prs1;
      this.editShiftData.efb_prs2 = item.efb_prs2;
      this.editShiftData.efb_prs3 = item.efb_prs3;
      this.editShiftData.efb_prs4 = item.efb_prs4;
      this.editShiftData.efb_prs_total_hrs = item.efb_prs_total_hrs;
      this.editShiftData.efb_shd1 = item.efb_shd1;
      this.editShiftData.efb_shd2 = item.efb_shd2;
      this.editShiftData.efb_shd3 = item.efb_shd3;
      this.editShiftData.efb_shd4 = item.efb_shd4;
      this.editShiftData.efb_shd_total_hrs = item.efb_shd_total_hrs;
      this.editShiftData.esrh_a1 = item.esrh_a1;
      this.editShiftData.esrh_a2 = item.esrh_a2;
      this.editShiftData.esrh_a3 = item.esrh_a3;
      this.editShiftData.esrh_a4 = item.esrh_a4;
      this.editShiftData.esrh_a5 = item.esrh_a5;
      this.editShiftData.esrh_a6 = item.esrh_a6;
      this.editShiftData.esrh_b1 = item.esrh_b1;
      this.editShiftData.esrh_b2 = item.esrh_b2;
      this.editShiftData.esrh_b3 = item.esrh_b3;
      this.editShiftData.esrh_b4 = item.esrh_b4;
      this.editShiftData.esrh_b5 = item.esrh_b5;
      this.editShiftData.esrh_b6 = item.esrh_b6;
      this.editShiftData.feed_water_cans = item.feed_water_cans;
      this.editShiftData.feed_water_stock = item.feed_water_stock;
      this.editShiftData.ffb_cages = item.ffb_cages;
      this.editShiftData.ffb_ramp = item.ffb_ramp;
      this.editShiftData.kernel_hrs_silo1 = item.kernel_hrs_silo1;
      this.editShiftData.kernel_hrs_silo2 = item.kernel_hrs_silo2;
      this.editShiftData.kernel_hrs_silo3 = item.kernel_hrs_silo3;
      this.editShiftData.no_of_batches_sterilized =
        item.no_of_batches_sterilized;
      this.editShiftData.no_of_cages_processed = item.no_of_cages_processed;
      this.editShiftData.nozzle_centrifuge_1 = item.nozzle_centrifuge_1;
      this.editShiftData.nozzle_centrifuge_2 = item.nozzle_centrifuge_2;
      this.editShiftData.nozzle_centrifuge_3 = item.nozzle_centrifuge_3;
      this.editShiftData.nozzle_centrifuge_4 = item.nozzle_centrifuge_4;
      this.editShiftData.pending_vehicles = item.pending_vehicles;
      this.editShiftData.press_running_hrs_press1 =
        item.press_running_hrs_press1;
      this.editShiftData.press_running_hrs_press2 =
        item.press_running_hrs_press2;
      this.editShiftData.press_running_hrs_press3 =
        item.press_running_hrs_press3;
      this.editShiftData.press_running_hrs_press4 =
        item.press_running_hrs_press4;
      this.editShiftData.press_running_total_hrs = item.press_running_total_hrs;
      this.editShiftData.remarks = item.remarks;
      this.editShiftData.shift = item.shift;
      this.editShiftData.shift_unloading_qty = item.shift_unloading_qty;
      this.editShiftData.steam_cone = item.steam_cone;
      this.editShiftData.stenlizer1 = item.stenlizer1;
      this.editShiftData.stenlizer2 = item.stenlizer2;
      this.editShiftData.stenlizer3 = item.stenlizer3;
      this.editShiftData.ster_ffb = item.ster_ffb;
      this.editShiftData.tg_running_hrs = item.tg_running_hrs;
      this.editShiftData.total_esrh_a_epellers = item.total_esrh_a_epellers;
      this.editShiftData.total_hrs_b_epellers = item.total_hrs_b_epellers;
      this.editShiftData.total_hrs_decanter = item.total_hrs_decanter;
      this.editShiftData.total_hrs_nozzle_centrifuge =
        item.total_hrs_nozzle_centrifuge;
      this.editShiftData.unit = item.unit;
      this.editShiftData.weak_total_ffb = item.weak_total_ffb;
      this.editShiftData.sno = item.sno;
    },

    closeShiftDialog() {
      this.shiftDataDialog = false;
    },
    ShiftReportOnReset() {
      this.editShiftData.boiler_running_hrs = "";
      this.editShiftData.cpko_closing = "";
      this.editShiftData.cpko_dispatches = "";
      this.editShiftData.cpko_doc_bags_filling = "";
      this.editShiftData.cpko_doc_stock = "";
      this.editShiftData.cpko_oer = "";
      this.editShiftData.cpko_opening = "";
      this.editShiftData.cpko_total_qty = "";
      this.editShiftData.cpo_flow_meter_closing = "";
      this.editShiftData.cpo_flow_meter_oer = "";
      this.editShiftData.cpo_flow_meter_opening = "";
      this.editShiftData.cpo_flow_meter_sludge = "";
      this.editShiftData.cpo_flow_meter_total_qty = "";
      this.editShiftData.cpo_flow_meter_wel_oil = "";
      this.editShiftData.feed_water_totalizer = "";
      this.editShiftData.date = "";
      this.editShiftData.decanter1 = "";
      this.editShiftData.decanter2 = "";
      this.editShiftData.decanter3 = "";
      this.editShiftData.efb_prs1 = "";
      this.editShiftData.efb_prs2 = "";
      this.editShiftData.efb_prs3 = "";
      this.editShiftData.efb_prs4 = "";
      this.editShiftData.efb_prs_total_hrs = "";
      this.editShiftData.efb_shd1 = "";
      this.editShiftData.efb_shd2 = "";
      this.editShiftData.efb_shd3 = "";
      this.editShiftData.efb_shd4 = "";
      this.editShiftData.efb_shd_total_hrs = "";
      this.editShiftData.esrh_a1 = "";
      this.editShiftData.esrh_a2 = "";
      this.editShiftData.esrh_a3 = "";
      this.editShiftData.esrh_a4 = "";
      this.editShiftData.esrh_a5 = "";
      this.editShiftData.esrh_a6 = "";
      this.editShiftData.esrh_b1 = "";
      this.editShiftData.esrh_b2 = "";
      this.editShiftData.esrh_b3 = "";
      this.editShiftData.esrh_b4 = "";
      this.editShiftData.esrh_b5 = "";
      this.editShiftData.esrh_b6 = "";
      this.editShiftData.feed_water_cans = "";
      this.editShiftData.feed_water_stock = "";
      this.editShiftData.ffb_cages = "";
      this.editShiftData.ffb_ramp = "";
      this.editShiftData.kernel_hrs_silo1 = "";
      this.editShiftData.kernel_hrs_silo2 = "";
      this.editShiftData.kernel_hrs_silo3 = "";
      this.editShiftData.no_of_batches_sterilized = "";
      this.editShiftData.no_of_cages_processed = "";
      this.editShiftData.nozzle_centrifuge_1 = "";
      this.editShiftData.nozzle_centrifuge_2 = "";
      this.editShiftData.nozzle_centrifuge_3 = "";
      this.editShiftData.nozzle_centrifuge_4 = "";
      this.editShiftData.pending_vehicles = "";
      this.editShiftData.press_running_hrs_press1 = "";
      this.editShiftData.press_running_hrs_press2 = "";
      this.editShiftData.press_running_hrs_press3 = "";
      this.editShiftData.press_running_hrs_press4 = "";
      this.editShiftData.press_running_total_hrs = "";
      this.editShiftData.remarks = "";
      this.editShiftData.shift = "";
      this.editShiftData.shift_unloading_qty = "";
      this.editShiftData.steam_cone = "";
      this.editShiftData.stenlizer1 = "";
      this.editShiftData.stenlizer2 = "";
      this.editShiftData.stenlizer3 = "";
      this.editShiftData.ster_ffb = "";
      this.editShiftData.tg_running_hrs = "";
      this.editShiftData.total_esrh_a_epellers = "";
      this.editShiftData.total_hrs_b_epellers = "";
      this.editShiftData.total_hrs_decanter = "";
      this.editShiftData.total_hrs_nozzle_centrifuge = "";
      this.editShiftData.unit = "";
      this.editShiftData.weak_total_ffb = "";
    },

    onUpdateShiftLog() {
      if (this.$refs.shiftForm.validate()) {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Do you want to Update data ?",
            cancel: true,
            persistent: true,
          })
          .onOk(() => {
            this.updateShiftLog(this.editShiftData);
          })
          .onCancel(() => {
            console.error("Please fill the form correctly");
          });
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
