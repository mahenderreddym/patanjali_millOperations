<template>
    <q-page>
      <div class="title">
        <h4 class="text-center q-bold" style="position: relative">
          Clarification Log
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
        <q-form class="SrFm" ref="clarificationForm">
          <div class="split-container">
            <div class="left-container">
              <div class="input-feilds">
                <span class="input-text input-text-bl-frm">Date : </span
                > 
                <q-input
                  style="width: 55%"
                  dense
                  outlined
                  v-model="clarificationForm.date"
                  :rules="[required('date')]"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="clarificationForm.date">
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
                <span class="input-text input-text-bl-frm">Unit : </span
                >
                <!-- {{ todayShiftDetailsOfClarifierForm }} -->
                <div  style="width: 55%; margin-bottom: 20px">
                <q-select
                  outlined
                  dense
                  v-model="clarificationForm.unit"
                  :options="unit_options"
                  label="Unit"
                  :rules="[required('unit')]"
                />

                <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].unit" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].unit}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].unit" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].unit}}</div>
      </div>
              </div>
              <div class="input-feilds">
                <span class="input-text input-text-bl-frm">Shift : </span
                >
                <div style="width: 55%; margin-bottom: 20px">
                                <q-input
                  outlined
                  dense
                  v-model="shift"
                  label="Shift"
                  readonly
                  :rules="[required('shift')]"
                />
                <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].shift" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].shift}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].shift" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].shift}}</div>
      </div>
              </div>
              <div class="input-feilds">
                <span class="input-text input-text-bl-frm">Time : </span
                >
                <div style="width: 55%; margin-bottom: 20px">
                <q-input
                  outlined
                  dense
                  v-model="clarificationForm.dateTime"
                  label="Time"
                  :rules="[required('Time')]"
                >

    </q-input>
    <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].dateTime" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].dateTime}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].dateTime" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].dateTime}}</div>
      </div>
              </div>
            </div>
            <div class="line-tr"></div>
            <div class="right-container">
              <div class="input-feilds">
                <span
                  class="input-text input-text-bl-frm q-ml-md"
                  style="width: 198px"
                  >Crude Oil Temp : </span
                >
                <div style="width: 38%">
                <q-input
                  dense
                  v-model="clarificationForm.crude_oil_temp"
                  type="number"
                  outlined
                  label="input"
                  :rules="[requiredRange('Crude Oil Temp')]"
                  :min="0"
                />
                <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].crude_oil_temp" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].crude_oil_temp}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].crude_oil_temp" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].crude_oil_temp}}</div>
      </div>
              </div>
              <div class="input-feilds">
                <span
                  class="input-text input-text-bl-frm q-ml-md"
                  style="width: 198px"
                  >Clarifier Temp : </span
                >
                <div style="width: 38%">
                <q-input
                  dense
                  v-model="clarificationForm.clarifier_temp"
                  :rules="[requiredRange('Clarifier Temp')]"
                  type="number"
                  outlined
                  label="Input"
                  :min="0"
                />
                <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].clarifier_temp" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].clarifier_temp}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].clarifier_temp" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].clarifier_temp}}</div>
      </div>
              </div>
              <div class="input-feilds">
                <span
                  class="input-text input-text-bl-frm q-ml-md"
                  style="width: 198px"
                  >Wet Oil Temp : </span
                >
                <div style="width: 38%">
                <q-input
                  dense
                  v-model="clarificationForm.wet_oil_temp"
                  :rules="[requiredRange('Wet Oil Temp')]"
                  type="number"
                  outlined
                  label="Input"
                  :min="0"
                />
                <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].wet_oil_temp" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].wet_oil_temp}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].wet_oil_temp" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].wet_oil_temp}}</div>
      </div>
              </div>
              <div class="input-feilds">
                <span
                  class="input-text input-text-bl-frm q-ml-md"
                  style="width: 198px"
                  >Sludge Temp : </span
                >
                <div style="width: 38%">
                <q-input 
                  dense
                  v-model="clarificationForm.sludge_temp"
                  :rules="[requiredRange('Sludge Temp')]"
                  type="number"
                  outlined
                  label="Input"
                  :min="0"
                />
                <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].sludge_temp" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].sludge_temp}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].sludge_temp" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].sludge_temp}}</div>
      </div>
              </div>
            </div>
          </div>
          <div class="subtitle" style="margin-top:20px">
            <p class="text-center q-mt-sm">Decanter Readings</p>
          </div>
            <div class="input-fields q-mt-md q-mr-sm"  style="width: 100%;" >
            <table class=" long-feilds" style="width: 100%; table-layout: fixed;">
              <thead>
                <tr>
                  <th colspan="2">Decanter1</th>
                  <th colspan="2">Decanter2</th>
                  <th colspan="2">Decanter3</th>
                  <th colspan="2">Decanter4</th>
                </tr>
                <tr> 
                  <th >Flow MT/HR</th>
                  <th >Load Amps</th>
                  <th>Flow MT/HR</th>
                  <th>Load Amps</th>
                  <th>Flow MT/HR</th>
                  <th>Load Amps</th>
                  <th>Flow MT/HR</th>
                  <th>Load Amps</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>
                      <div style="width:100%">
                      <q-input
                        dense
                        v-model="clarificationForm.flow_mt_hr1"
                        :rules="[requiredRange('ffb ramp')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].flow_mt_hr1" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].flow_mt_hr1}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].flow_mt_hr1" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].flow_mt_hr1}}</div>
      </div>
                    </td>
                    <td>
                      <div style="width:100%">
                      <q-input
                        dense
                        v-model="clarificationForm.load_amps1"
                        :rules="[requiredRange('ffb ramp')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].load_amps1" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].load_amps1}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].load_amps1" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].load_amps1}}</div>
      </div>
                    </td>
                    <td>
                      <div style="width:100%">
                      <q-input
                        dense
                        v-model="clarificationForm.flow_mt_hr2"
                        :rules="[requiredRange('ffb ramp')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].flow_mt_hr2" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].flow_mt_hr2}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].flow_mt_hr2" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].flow_mt_hr2}}</div>
      </div>
                    </td>
                    <td>
                      <div style="width:100%">
                      <q-input
                        dense
                        v-model="clarificationForm.load_amps2"
                        :rules="[requiredRange('ffb ramp')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].load_amps2" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].load_amps2}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].load_amps2" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].load_amps2}}</div>
      </div>
                    </td>
                    <td>
                      <div style="width:100%">
                      <q-input
                        dense
                        v-model="clarificationForm.flow_mt_hr3"
                        :rules="[requiredRange('ffb ramp')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].flow_mt_hr3" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].flow_mt_hr3}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].flow_mt_hr3" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].flow_mt_hr3}}</div>
      </div>
                    </td>
                    <td>
                      <div style="width:100%">
                      <q-input
                        dense
                        v-model="clarificationForm.load_amps3"
                        :rules="[requiredRange('ffb ramp')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].load_amps3" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].load_amps3}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].load_amps3" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].load_amps3}}</div>
      </div>
                    </td>
                    <td>
                      <div style="width:100%">
                      <q-input
                        dense
                        v-model="clarificationForm.flow_mt_hr4"
                        :rules="[requiredRange('ffb ramp')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].flow_mt_hr4" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].flow_mt_hr4}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].flow_mt_hr4" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].flow_mt_hr4}}</div>
      </div>
                    </td>

                    <td>
                      <div style="width:100%">
                      <q-input
                        dense
                        v-model="clarificationForm.load_amps4"
                        :rules="[requiredRange('ffb ramp')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].load_amps4" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].load_amps4}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].load_amps4" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].load_amps4}}</div>
      </div>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="subtitle" style="margin-top: 20px">
            <p class="text-center q-mt-sm">Nozzle Centrifuge</p>
          </div>
          <div class="flex flex-center">
            <div class="input-feilds q-mt-md">
              <table class="long-feilds">
                <thead>
                  <tr>
                    <th>Nozzle Centrifuge1</th>
                    <th>Nozzle Centrifuge2</th>
                    <th>Nozzle Centrifuge3</th>
                    <th>Nozzle Centrifuge4</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div style="width: 100px">
                      <q-input
                        dense
                        v-model="clarificationForm.nozzle_centrifuge1"
                        :rules="[requiredRange('nozzle centrifuge1')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].nozzle_centrifuge1" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].nozzle_centrifuge1}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].nozzle_centrifuge1" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].nozzle_centrifuge1}}</div>
      </div>
                    </td>
                    <td>
                      <div style="width: 100px">
                      <q-input
                        dense
                        v-model="clarificationForm.nozzle_centrifuge2"
                        :rules="[requiredRange('nozzle centrifuge2')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].nozzle_centrifuge2" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].nozzle_centrifuge2}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].nozzle_centrifuge2" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].nozzle_centrifuge2}}</div>
      </div>
                    </td>
                    <td>
                      <div style="width: 100px">
                      <q-input
                        dense
                        v-model="clarificationForm.nozzle_centrifuge3"
                        :rules="[requiredRange('nozzle centrifuge3')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].nozzle_centrifuge3" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].nozzle_centrifuge3}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].nozzle_centrifuge3" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].nozzle_centrifuge3}}</div>
      </div>
                    </td>
                    <td>
                      <div style="width: 100px">
                      <q-input
                        dense
                        v-model="clarificationForm.nozzle_centrifuge4"
                        :rules="[requiredRange('nozzle centrifuge4')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].nozzle_centrifuge4" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].nozzle_centrifuge4}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].nozzle_centrifuge4" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].nozzle_centrifuge4}}</div>
      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div class=" row flex flex-center q-mt-md">

            <div class="q-mt-md">
            <table>
              <tr>
                <th colspan="2">Vacuum Dryer Readings</th>
              </tr>
            <tr>
              <th>Vacuum Dryer-1 <br/>(mmmHg)</th>
              <th>Vacuum Dryer-2 <br/>(mmmHg)</th>
            </tr>
            <tr>
              <td>
                <div style="width: 100px">
                <q-input
                        dense
                        v-model="clarificationForm.Vacuum_dryer1"
                        :rules="[requiredRange('Vacuum dryer1')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].nozzle_centrifuge4" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].nozzle_centrifuge4}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].nozzle_centrifuge4" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].nozzle_centrifuge4}}</div>
      </div>
              </td>
              <td>
                <div style="width: 100px">
                <q-input
                        dense
                        v-model="clarificationForm.Vacuum_dryer2"
                        :rules="[requiredRange('Vacuum dryer2')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].Vacuum_dryer2" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].Vacuum_dryer2}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].Vacuum_dryer2" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].Vacuum_dryer2}}</div>
      </div>
              </td>
            </tr>
            </table>
          </div>

          <div class="q-ma-md">
            <table>
              <tr><th colspan="2">Flow Meter Readings</th></tr>
            <tr>
              <th>Opening</th>
              <th>Closing</th>
            </tr>
            <tr>
              <td>
                <div style="width: 100px">
                <q-input
                        dense
                        v-model="clarificationForm.flow_meter_reading_opening"
                        :rules="[requiredRange('fmr opening')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].flow_meter_reading_opening" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].flow_meter_reading_opening}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].flow_meter_reading_opening" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].flow_meter_reading_opening}}</div>
      </div>
              </td>
              <td>
                <div style="width: 100px">
                <q-input  
                        dense
                        v-model="clarificationForm.flow_meter_reading_closing"
                        :rules="[requiredRange('fmr closing')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].flow_meter_reading_closing" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].flow_meter_reading_closing}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].flow_meter_reading_closing" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].flow_meter_reading_closing}}</div>
      </div>
              </td>
            </tr>
            </table>
          </div>

          <div class="q-mt-md">
              <div class="input-feilds">
                <span
                  class="input-text input-text-bl-frm q-ml-md"
                  style="width: 198px"
                  >CPO Production MT : </span
                >
                <div  style="width: 38%">
                <q-input
                  dense
                  v-model="clarificationForm.cpo_production_mt"
                  type="number"
                  outlined
                  label="input"
                  :rules="[requiredRange('Crude Oil Temp')]"
                  :min="0"
                />
                <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].cpo_production_mt" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].cpo_production_mt}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].cpo_production_mt" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].cpo_production_mt}}</div>
      </div>
              </div>
              <div class="input-feilds">
                <span
                  class="input-text input-text-bl-frm q-ml-md"
                  style="width: 198px"
                  >Wet Oil Tank Qty in MT : </span
                >
                <div  style="width: 38%">
                <q-input
                  dense
                  v-model="clarificationForm.wet_oil_tank_qty_in_mt"
                  :rules="[requiredRange('Wet Oil Tank Qty in MT')]"
                  type="number"
                  outlined
                  label="Input"
                  :min="0"
                />
                <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].wet_oil_tank_qty_in_mt" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].wet_oil_tank_qty_in_mt}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].wet_oil_tank_qty_in_mt" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].wet_oil_tank_qty_in_mt}}</div>
      </div>
              </div>
              <div class="input-feilds">
                <span
                  class="input-text input-text-bl-frm q-ml-md"
                  style="width: 198px"
                  >Sludge Tank Qty in MT : </span
                >
                <div  style="width: 38%">
                <q-input
                  dense
                  v-model="clarificationForm.sludge_tank_qty_in_mt"
                  :rules="[requiredRange('Sludge Tank Qty in MT')]"
                  type="number"
                  outlined
                  label="Input"
                  :min="0"
                />
                <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].sludge_tank_qty_in_mt" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].sludge_tank_qty_in_mt}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].sludge_tank_qty_in_mt" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].sludge_tank_qty_in_mt}}</div>
      </div>
              </div>
            </div>
          </div>

          <div class="subtitle" style="margin-top: 20px">
            <p class="text-center q-mt-sm">Equipment Readings</p>
          </div>
          <div class="q-mt-md">
<div class="input-fields">
  <table>
    <thead>
      <tr>
        <th rowspan="2">Equipment Name</th>
        <th colspan="2" >Running Hours</th>
        <th rowspan="2">Total Hours</th>
      </tr>
      <tr>
        <th>Opening <br/>Reading</th>
        <th>Closing <br/>Reading</th>
      </tr>
    </thead>
    <tbody>
      <tr>

        <td>Decanter-1</td>
        <td>
          <div>
                      <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                       v-model="clarificationForm.erhd_opening_reading1"
                      mask="time"
                      :rules="[requiredRange('ERHD Opening Reading1')]"
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
                            <q-time  v-model="clarificationForm.erhd_opening_reading1">
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
                    <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhd_opening_reading1" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhd_opening_reading1}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhd_opening_reading1" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhd_opening_reading1}}</div>
      </div>
                    </td>
                      <td>
                        <div>
                        <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                        v-model="clarificationForm.erhd_closing_reading1"
                      mask="time"
                      :rules="[requiredRange('ERHD Closing Reading1')]"
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
                            <q-time  v-model="clarificationForm.erhd_closing_reading1">
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
                    <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhd_closing_reading1" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhd_closing_reading1}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhd_closing_reading1" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhd_closing_reading1}}</div>
      </div>
                      </td>
                      <td>
                        <div  style="width: 100px">
                        <q-input
                        dense
                        v-model="clarificationForm.erhd_total_hours1"
                        :rules="[requiredRange('ERHD Total Hours1')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhd_total_hours1" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhd_total_hours1}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhd_total_hours1" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhd_total_hours1}}</div>
      </div>
                    </td>
      </tr>
      <tr>
        <td>Decanter-2</td>
        <td>
          <div>
                      <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                        v-model="clarificationForm.erhd_opening_reading2"
                        :rules="[requiredRange('ERHD Opening Reading2')]"
                      mask="time"
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
                            <q-time  v-model="clarificationForm.erhd_opening_reading2">
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
                    <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhd_opening_reading2" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhd_opening_reading2}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhd_opening_reading2" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhd_opening_reading2}}</div>
      </div>
                    </td>
                      <td>
                        <div>
                        <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                          v-model="clarificationForm.erhd_closing_reading2"
                        :rules="[requiredRange('ERHD Closing Reading2')]"
                      mask="time"
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
                            <q-time v-model="clarificationForm.erhd_closing_reading2">
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
                    <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhd_closing_reading2" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhd_closing_reading2}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhd_closing_reading2" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhd_closing_reading2}}</div>
      </div>
                      </td>
                      <td>
                        <div style="width:100px">
                        <q-input
                        dense
                        v-model="clarificationForm.erhd_total_hours2"
                        :rules="[requiredRange('ERHD Total Hours2')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhd_total_hours2" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhd_total_hours2}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhd_total_hours2" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhd_total_hours2}}</div>
      </div>
                    </td>
      </tr>
      <tr>
        <td>Decanter-3</td>
        <td>
          <div>
                      <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                    v-model="clarificationForm.erhd_opening_reading3"
                        :rules="[requiredRange('ERHD Opening Reading3')]"
                      mask="time"
                      @click="showTimePicker5"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="timePopup5"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time  v-model="clarificationForm.erhd_opening_reading3">
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
                    <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhd_opening_reading3" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhd_opening_reading3}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhd_opening_reading3" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhd_opening_reading3}}</div>
      </div>
                    </td>
                      <td>
                        <div>
                        <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                       v-model="clarificationForm.erhd_closing_reading3"
                        :rules="[requiredRange('ERHD Closing Reading3')]"
                      mask="time"
                      @click="showTimePicker6"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="timePopup6"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="clarificationForm.erhd_closing_reading3">
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
                    <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhd_closing_reading3" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhd_closing_reading3}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhd_closing_reading3" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhd_closing_reading3}}</div>
      </div>
                      </td>
                      <td>
                        <div  style="width: 100px">
                        <q-input
                        dense
                        v-model="clarificationForm.erhd_total_hours3"
                        :rules="[requiredRange('ERHD Total Hours3')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhd_total_hours3" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhd_total_hours3}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhd_total_hours3" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhd_total_hours3}}</div>
      </div>
                    </td>
      </tr>
      <tr>
        <td>Decanter-4</td>
        <td>
          <div>
                      <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                     v-model="clarificationForm.erhd_opening_reading4"
                        :rules="[requiredRange('ERHD Opening Reading4')]"
                      mask="time"
                      @click="showTimePicker7"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="timePopup7"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time  v-model="clarificationForm.erhd_opening_reading4">
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
                    <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhd_opening_reading4" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhd_opening_reading4}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhd_opening_reading4" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhd_opening_reading4}}</div>
      </div>
                    </td>
                      <td>
                        <div>
                        <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                              v-model="clarificationForm.erhd_closing_reading4"
                        :rules="[requiredRange('ERHD Closing Reading4')]"
                      mask="time"
                      @click="showTimePicker8"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="timePopup8"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="clarificationForm.erhd_closing_reading4">
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
                    <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhd_closing_reading4" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhd_closing_reading4}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhd_closing_reading4" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhd_closing_reading4}}</div>
      </div>
                      </td>
                      <td>
                        <div  style="width: 100px">
                        <q-input
                        dense
                        v-model="clarificationForm.erhd_total_hours4"
                        :rules="[requiredRange('ERHD Total Hours4')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhd_total_hours4" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhd_total_hours4}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhd_total_hours4" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhd_total_hours4}}</div>
      </div>
                    </td>
      </tr>
      <tr>
        <td>Nozzle Centrifuge 1</td>
        
        <td>
          <div>
                      <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                      v-model="clarificationForm.erhn_opening_reading1"
                        :rules="[requiredRange('ERHN Opening Reading1')]"
                      mask="time"
                      @click="showTimePicker9"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="timePopup9"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time  v-model="clarificationForm.erhn_opening_reading1">
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
                    <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhn_opening_reading1" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhn_opening_reading1}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhn_opening_reading1" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhn_opening_reading1}}</div>
      </div>
                    </td>
                      <td>
                        <div>
                        <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                             v-model="clarificationForm.erhn_closing_reading1"
                        :rules="[requiredRange('ERHN Closing Reading1')]"
                      mask="time"
                      @click="showTimePicker10"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="timePopup10"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="clarificationForm.erhn_closing_reading1">
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
                    <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhn_closing_reading1" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhn_closing_reading1}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhn_closing_reading1" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhn_closing_reading1}}</div>
      </div>
                      </td>
                      <td>
                        <div  style="width: 100px">
                                                  <q-input
                        dense
                        v-model="clarificationForm.erhn_total_hours1"
                        :rules="[requiredRange('ERHN Total Hours1')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhn_total_hours1" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhn_total_hours1}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhn_total_hours1" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhn_total_hours1}}</div>
      </div>
                    </td>
      </tr>
      <tr>
        <td>Nozzle Centrifuge 2</td>
        <td>
          <div>
                      <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                         v-model="clarificationForm.erhn_opening_reading2"
                        :rules="[requiredRange('ERHN Opening Reading2')]"
                      mask="time"
                      @click="showTimePicker11"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="timePopup11"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time  v-model="clarificationForm.erhn_opening_reading2">
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
                    <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhn_opening_reading2" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhn_opening_reading2}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhn_opening_reading2" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhn_opening_reading2}}</div>
      </div>
                    </td>
                      <td>
                        <div>
                        <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                               v-model="clarificationForm.erhn_closing_reading2"
                        :rules="[requiredRange('ERHN Closing Reading2')]"
                      mask="time"
                      @click="showTimePicker12"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="timePopup12"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="clarificationForm.erhn_closing_reading2">
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
                    <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhn_closing_reading2" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhn_closing_reading2}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhn_closing_reading2" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhn_closing_reading2}}</div>
      </div>
                      </td>
                      <td>
                        <div style="width: 100px">
                        <q-input
                        dense
                        v-model="clarificationForm.erhn_total_hours2"
                        :rules="[requiredRange('ERHN Total Hours2')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhn_total_hours2" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhn_total_hours2}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhn_total_hours2" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhn_total_hours2}}</div>
      </div>
                    </td>
      </tr>
      <tr>
        <td>Nozzle Centrifuge 3</td>

        <td>
          <div>
                                 <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                          v-model="clarificationForm.erhn_opening_reading3"
                        :rules="[requiredRange('ERHN Opening Reading3')]"
                      mask="time"
                      @click="showTimePicker13"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="timePopup13"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time   v-model="clarificationForm.erhn_opening_reading3"
                            :rules="[requiredRange('ERHN Opening Reading3')]">
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
                    <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhn_opening_reading3" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhn_opening_reading3}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhn_opening_reading3" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhn_opening_reading3}}</div>
      </div>
                    </td>
                      <td>
                        <div>
                        <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                               v-model="clarificationForm.erhn_closing_reading3"
                        :rules="[requiredRange('ERHN Closing Reading3')]"
                      mask="time"
                      @click="showTimePicker14"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="timePopup14"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="clarificationForm.erhn_closing_reading3">
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
                    <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhn_closing_reading3" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhn_closing_reading3}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhn_closing_reading3" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhn_closing_reading3}}</div>
      </div>
                      </td>
                      <td>
                        <div style="width: 100px">
                        <q-input
                        dense
                        v-model="clarificationForm.erhn_total_hours3"
                        :rules="[requiredRange('ERHN Total Hours3')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhn_total_hours3" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhn_total_hours3}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhn_total_hours3" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhn_total_hours3}}</div>
      </div>
                    </td>
      </tr>
      <tr>
        <td>Nozzle Centrifuge 4</td>
        <td>
          <div>
                      <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                          v-model="clarificationForm.erhn_opening_reading4"
                        :rules="[requiredRange('ERHN Opening Reading4')]"
                      mask="time"
                      @click="showTimePicker15"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="timePopup15"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time   v-model="clarificationForm.erhn_opening_reading4"
                            :rules="[requiredRange('ERHN Opening Reading4')]">
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
                    <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhn_opening_reading4" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhn_opening_reading4}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhn_opening_reading4" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhn_opening_reading4}}</div>
      </div>
                    </td>
                      <td>
                        <div>
                        <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                               v-model="clarificationForm.erhn_closing_reading4"
                        :rules="[requiredRange('ERHN Closing Reading4')]"
                      mask="time"
                      @click="showTimePicker16"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="timePopup16"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="clarificationForm.erhn_closing_reading4">
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
                    <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhn_closing_reading4" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhn_closing_reading4}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhn_closing_reading4" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhn_closing_reading4}}</div>
      </div>
                      </td>
                      <td>
                        <div style="width: 100%">
                        <q-input
                        dense
                        v-model="clarificationForm.erhn_total_hours4"
                        :rules="[requiredRange('ERHN Total Hours4')]"
                        type="number"
                        outlined
                        label="Input"
                        :min="0"
                      />
                      <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].erhn_total_hours4" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].erhn_total_hours4}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].erhn_total_hours4" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].erhn_total_hours4}}</div>
      </div>
                    </td>
      </tr>
    </tbody>
  </table>
</div>
          </div>


          <div class="q-mt-md" >
              <div class="input-feilds">
                <span
                  class="input-text input-text-bl-frm q-ml-md"
                  style="width: 198px"
                  >CPO Production MT : </span
                >
                <div>
                <q-input
                  dense
                  v-model="clarificationForm.cpo_production_mt"
                  type="number"
                  outlined
                  label="input"
                  :rules="[requiredRange('Crude Oil Temp')]"
                  :min="0"
                />
                <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].cpo_production_mt" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].cpo_production_mt}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].cpo_production_mt" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].cpo_production_mt}}</div>
      </div>
              </div> 
              <br/>
              <div class="input-feilds">
                <span
                  class="input-text input-text-bl-frm q-ml-md"
                  style="width: 198px"
                  >Wet Oil Tank Qty in MT : </span
                >
                <div>
                <q-input
                  dense
                  v-model="clarificationForm.wet_oil_tank_qty_in_mt"
                  :rules="[requiredRange('Wet Oil Tank Qty in MT')]"
                  type="number"
                  outlined
                  label="Input"
                  :min="0"
                />
                <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].wet_oil_tank_qty_in_mt" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].wet_oil_tank_qty_in_mt}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].wet_oil_tank_qty_in_mt" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].wet_oil_tank_qty_in_mt}}</div>
      </div>
              </div>
            </div>


          <div class="input-feilds q-mt-md">
          <span class="input-text" style="width: 100px">Remarks : </span
          >
          <div style="width: 70%; margin-left: 28px">
                     <q-input 
            outlined
            dense
            v-model="clarificationForm.remarks"
            type="textarea"
            float-label="Textarea"
            :max-height="10"
            :min-rows="2"
            
          />
          <div v-if="todayShiftDetailsOfClarifierForm.length > 0 && todayShiftDetailsOfClarifierForm[0].remarks" class="text-orange">{{ this.todayShiftDetailsOfClarifierForm[0].remarks}}</div>
        <div v-if="todayShiftDetailsOfClarifierForm.length > 1 && todayShiftDetailsOfClarifierForm[1].remarks" class="text-blue">{{ this.todayShiftDetailsOfClarifierForm[1].remarks}}</div>
      </div>
        </div>
          <div class="btns">
            <q-btn
              style="margin-left: -80px"
              class="q-pa-sm"
              color="primary"
              label="Submit"
              @click="ClarifierReportOnSubmit"
            />
            <q-btn
              @click="ClarifierReportOnReset"
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
    name: "ClarificationLog",
    data() {
      return {
        ...validations,
        shift_options: ["Shift A", "Shift B", "Shift C"],
        unit_options: ["I", "II"],
        date:"",
        clarificationForm:{
          date: date.formatDate(Date.now(), "YYYY/MM/DD"),
          dateTime:"",
        unit: "",
        crude_oil_temp: "",
        clarifier_temp: "",
        wet_oil_temp: "",
        sludge_temp: "",
        flow_mt_hr1:"",
        flow_mt_hr2:"",
        flow_mt_hr3:"",
        flow_mt_hr4:"",
        load_amps1:"",
        load_amps2:"",
        load_amps3:"",
        load_amps4:"",
        nozzle_centrifuge1: "",
        nozzle_centrifuge2: "",
        nozzle_centrifuge3: "",
        nozzle_centrifuge4: "",
        Vacuum_dryer1: "",
        Vacuum_dryer2: "",
        flow_meter_reading_opening: "",
        flow_meter_reading_closing: "",
        erhd_opening_reading1 : "",
        erhd_closing_reading1 : "",
        erhd_total_hours1 : "",
        erhd_opening_reading2 : "",
        erhd_closing_reading2 : "",
        erhd_total_hours2 : "",
        erhd_opening_reading3 : "",
        erhd_closing_reading3 : "",
        erhd_total_hours3 : "",
        erhd_opening_reading4 : "",
        erhd_closing_reading4 : "",
        erhd_total_hours4 : "",
        erhn_opening_reading1 : "",
        erhn_closing_reading1 : "",
        erhn_total_hours1 : "",
        erhn_opening_reading2 : "",
        erhn_closing_reading2 : "",
        erhn_total_hours2 : "",
        erhn_opening_reading3 : "",
        erhn_closing_reading3 : "",
        erhn_total_hours3 : "",
        erhn_opening_reading4 : "",
        erhn_closing_reading4 : "",
        erhn_total_hours4 : "",
        cpo_production_mt: "",
        wet_oil_tank_qty_in_mt: "",
        sludge_tank_qty_in_mt: "",
        remarks: "",
      
        },
        UserInfo: {},
        todayShiftDetailsOfClarifierForm:[],

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
      this.getTodayCompletedShiftDetails();

    },
    computed:{
      shift(){
        console.log("1520",this.todayShiftDetailsOfClarifierForm.length)
      return this.shift_options[this.todayShiftDetailsOfClarifierForm.length]
    }
    },
    methods: {
      ...mapActions("indexedDb", ["initDB"]),
      ...mapActions("indexedDb", ["syncClarifierFormData"]),
      ...mapActions("indexedDb", ["clearClarifierFormIndexedDB"]),

      async getTodayCompletedShiftDetails(){
        let user=JSON.parse(localStorage.getItem('userDetails'))
        console.log("1330",`https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/clarificationLogReportDataForTheDay.php?date=${this.date}&plant_code=${user.plant_code}&state_code=${user.state_code}`
          )
        let response=await fetch(`https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/clarificationLogReportDataForTheDay.php?date=${this.date}&plant_code=${user.plant_code}&state_code=${user.state_code}`,{
          method:"POST",
        })
        const responseData= await response.json()
        this.todayShiftDetailsOfClarifierForm = responseData
        console.log("135",this.todayShiftDetailsOfClarifierForm)

      },

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
      this.clarificationForm.dateTime = this.getCurrentTime(); // Set initial time
      setInterval(() => {
        this.clarificationForm.dateTime = this.getCurrentTime(); // Update time every second
      }, 1000); // Update every 1 second
    },
  
  
      async ClarifierReportOnSubmit() {
     
        const user = JSON.parse(localStorage.getItem("userDetails"));
        const TotalClarifierReportLogDetails = {
          ...this.clarificationForm,
          ...user,
        };
        console.log("599",TotalClarifierReportLogDetails)
  
        const validate = await this.$refs.clarificationForm.validate();
  
        if (validate) {
          try {
            if (navigator.onLine === true) {
              const response = await fetch(
                "https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/clarificationLogEntry.php",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(TotalClarifierReportLogDetails),
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
                this.ClarifierReportOnReset();
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
                this.ClarifierReportOnReset();
              }
            } else {
              // this.ClarifierDataSaveToIndexedDB(TotalClarifierReportLogDetails);
            }
          } catch (error) {
            Notify.create({
              message: "Error while uploading",
              color: "negative", // optional: 'positive', 'negative', 'warning', 'info'
              position: "top", // optional: 'top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left', 'center'
              timeout: 2000, // optional: milliseconds, set to 0 to disable auto-close
              actions: [{ label: "Dismiss", color: "white", handler: () => {} }], // optional: actions to display in the notification
            });
            this.ClarifierReportOnReset();
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
      ClarifierReportOnReset() {
        this.clarificationForm.dateTime = "" ;
        this.clarificationForm.unit = "" ;
        this.clarificationForm.shift = "" ;
        this.clarificationForm.crude_oil_temp = "" ;
        this.clarificationForm.clarifier_temp = "" ;
        this.clarificationForm.wet_oil_temp = "" ;
        this.clarificationForm.sludge_temp = "" ;
        this.clarificationForm.flow_mt_hr1 ="" ;
        this.clarificationForm.flow_mt_hr2 ="" ;
        this.clarificationForm.flow_mt_hr3 ="" ;
        this.clarificationForm.flow_mt_hr4 ="" ;
        this.clarificationForm.load_amps1 ="" ;
        this.clarificationForm.load_amps2 ="" ;
        this.clarificationForm.load_amps3 ="" ;
        this.clarificationForm.load_amps4 ="" ;
        this.clarificationForm.nozzle_centrifuge1 = "" ;
        this.clarificationForm.nozzle_centrifuge2 = "" ;
        this.clarificationForm.nozzle_centrifuge3 = "" ;
        this.clarificationForm.nozzle_centrifuge4 = "" ;
        this.clarificationForm.Vacuum_dryer1 = "" ;
        this.clarificationForm.Vacuum_dryer2 = "" ;
        this.clarificationForm.flow_meter_reading_opening = "" ;
        this.clarificationForm.flow_meter_reading_closing = "" ;
        this.clarificationForm.erhd_opening_reading1  = "" ;
        this.clarificationForm.erhd_closing_reading1  = "" ;
        this.clarificationForm.erhd_total_hours1  = "" ;
        this.clarificationForm.erhd_opening_reading2  = "" ;
        this.clarificationForm.erhd_closing_reading2  = "" ;
        this.clarificationForm.erhd_total_hours2  = "" ;
        this.clarificationForm.erhd_opening_reading3  = "" ;
        this.clarificationForm.erhd_closing_reading3  = "" ;
        this.clarificationForm.erhd_total_hours3  = "" ;
        this.clarificationForm.erhd_opening_reading4  = "" ;
        this.clarificationForm.erhd_closing_reading4  = "" ;
        this.clarificationForm.erhd_total_hours4  = "" ;
        this.clarificationForm.erhn_opening_reading1  = "" ;
        this.clarificationForm.erhn_closing_reading1  = "" ;
        this.clarificationForm.erhn_total_hours1  = "" ;
        this.clarificationForm.erhn_opening_reading2  = "" ;
        this.clarificationForm.erhn_closing_reading2  = "" ;
        this.clarificationForm.erhn_total_hours2  = "" ;
        this.clarificationForm.erhn_opening_reading3  = "" ;
        this.clarificationForm.erhn_closing_reading3  = "" ;
        this.clarificationForm.erhn_total_hours3  = "" ;
        this.clarificationForm.erhn_opening_reading4  = "" ;
        this.clarificationForm.erhn_closing_reading4  = "" ;
        this.clarificationForm.erhn_total_hours4  = "" ;
        this.clarificationForm.cpo_production_mt = "" ;
        this.clarificationForm.wet_oil_tank_qty_in_mt = "" ;
        this.clarificationForm.sludge_tank_qty_in_mt = "" ;
        this.clarificationForm.remarks = "" ;
      
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
  
        this.ClarifierReportOnReset();
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
  