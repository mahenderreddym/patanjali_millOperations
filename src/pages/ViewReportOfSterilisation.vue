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
          {
            label: "Sterilisation Station Log Report",
            value: "Sterilisation Station Log Report",
          },
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
           ...mapActions("reports", ["updateSterilisationStationLog"]),
  
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
  
   
  
      closeEditSterilisationDialog() {
        this.sterilisationDataDialog = true;
        this.editSterilisationDataDialog = false;
      },
  
      editSterilisationForm(item) {
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
          (this.sterilisationDataDialog = false);
        this.editSterilisationDataDialog = true;
      },
  
      // update sterilisation staion log data
  
   
  
      async onUpdateSterilisationStationLog() {
      
        const validate = await this.$refs.sterform.validate();
  
        // if (validate) {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Do you want to Update data ?",
            cancel: true,
            persistent: true,
          })
          .onOk(() => {
            this.updateSterilisationStationLog(this.editSterilisationData);
          })
          .onCancel(() => {});
        // }
  
        // else{
        //   Notify.create({
        //             message: "Please Fill the Form Properly",
        //             color: "negative",
        //             position: "top",
        //             timeout: 2000,
        //           });
        // }
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
  