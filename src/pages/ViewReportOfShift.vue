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

        <q-card flat class="bordered">
          <q-card-section>
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
      mmr: false,
      ...validations,
      UserInfo: {},
      differentReport: [{ label: "Shift Report", value: "Shift Report" }],
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
    ...mapActions("reports", ["loadReportWiseShiftLogData"]),
    ...mapActions("reports", ["updateShiftLog"]),

    async reloadPage() {
      this.$router.go(0);
      window.location.reload();
    },

    loadSelectData() {
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
        this.mmr = true;
        if (this.report.reportName.value === "Shift Report") {
          let user = JSON.parse(localStorage.getItem("userDetails"));
          const shiftUserReport = { ...user, ...this.report };

          this.loadReportWiseShiftLogData(shiftUserReport);
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
