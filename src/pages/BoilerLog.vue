<template>
  <q-page>
    <div class="title">
      <h4 class="text-center q-bold" style="position: relative">
        Boiler Log
        <q-icon
          name="sync"
          size="lg"
          class="absolute-right"
          style="border: 1px solid green; background-color: #dafdba"
          @click="syncBoilerData"
        />
      </h4>
    </div>
    <div class="container">
      <q-form ref="boilForm" class="BlFrm">
        <div class="split-container">
          <div class="left-container">
            <div class="input-feilds">
              <span class="input-text input-text-bl-frm">Date : </span
              >
              <div  style="width: 55%">
              <q-input
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
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].date" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].date}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].date" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].date}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text input-text-bl-frm">Shift : </span
              >
              <div  style="width: 55%">
              <q-input
                outlined
                dense
                v-model="shift"
                readonly
                label="Shift"
                :rules="[required('shift')]"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].shift" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].shift}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].shift" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].shift}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text input-text-bl-frm">Time : </span
              >
              <div style="width: 55%">
              <q-input
                label="Time"
                dense
                outlined
                v-model="time"
                mask="time"
                :rules="[required('time')]"
              >
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time v-model="time">
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
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].time" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].time}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].time" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].time}}</div>
            </div>
            </div>
          </div>
          <div class="line-tr"></div>
          <div class="right-container">
            <div class="input-feilds">
              <span class="input-text input-text-bl-frm q-ml-md"
                >Capacity : </span
              >
              <div  style="width:53%">
              <q-input
                dense
                v-model="capacity"
                :rules="[requiredRange('capacity')]"
                type="number"
                outlined
                suffix="TPH"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].capacity" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].capacity}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].capacity" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].capacity}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text input-text-bl-frm q-ml-md"
                >Working pr : </span
              >
              <div style="width: 53%">
              <q-input
                dense
                v-model="working_pre"
                suffix="Kg.cm2"
                :rules="[requiredRange('working pres')]"
                type="text"
                outlined
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].working_pre" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].working_pre}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].working_pre" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].working_pre}}</div>
            </div>
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
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="boiler_feed_water_dis_pre"
                      :rules="[requiredRange('Boiler Feed Water Dis Pre')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"

                    />
                    <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].boiler_feed_water_dis_pre" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].boiler_feed_water_dis_pre}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].boiler_feed_water_dis_pre" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].boiler_feed_water_dis_pre}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="boiler_feed_water_drum_level"
                      :rules="[requiredRange('Boiler Feed Water Drum Level')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"

                    />
                    <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].boiler_feed_water_drum_level" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].boiler_feed_water_drum_level}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].boiler_feed_water_drum_level" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].boiler_feed_water_drum_level}}</div>
            </div>
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
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="main_steam_pre"
                      :rules="[requiredRange('main steam pre')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].main_steam_pre" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].main_steam_pre}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].main_steam_pre" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].main_steam_pre}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input       
                      dense
                      v-model="main_steam_temp"
                      :rules="[
                        requiredRange('Main Steam Temp')
                      ]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].main_steam_temp" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].main_steam_temp}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].main_steam_temp" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].main_steam_temp}}</div>
            </div>
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
                    <div  style="width: 100px">
                    <q-input
                      dense
                      v-model="fgt_furnance"
                      :rules="[requiredRange('FGT furnace')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].fgt_furnance" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].fgt_furnance}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].fgt_furnance" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].fgt_furnance}}</div>
            </div>
                  </td>
                  <td>
                    <div  style="width: 100px">
                    <q-input
                      dense
                      v-model="fgt_bank_ol"
                      :rules="[requiredRange('fgt bank ol')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].fgt_bank_ol" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].fgt_bank_ol}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].fgt_bank_ol" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].fgt_bank_ol}}</div>
            </div>
                  </td>

                  <td>
                    <div  style="width: 100px">
                    <q-input
                      dense
                      v-model="fgt_eco_ol"
                      :rules="[
                        requiredRange('fgt eco ol'),
                      ]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].fgt_eco_ol" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].fgt_eco_ol}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].fgt_eco_ol" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].fgt_eco_ol}}</div>
            </div>
                  </td>
                  <td>
                    <div  style="width: 100px">
                    <q-input
                      dense
                      v-model="fgt_aph_ol"
                      :rules="[
                        requiredRange('fgt aph ol'),
                      ]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].fgt_aph_ol" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].fgt_aph_ol}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].fgt_aph_ol" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].fgt_aph_ol}}</div>
            </div>
                  </td>
                  <td>
                    <div  style="width: 100px">
                    <q-input
                      dense
                      v-model="fgt_id_ol"
                      :rules="[requiredRange('fgt id ol')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].fgt_id_ol" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].fgt_id_ol}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].fgt_id_ol" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].fgt_id_ol}}</div>
            </div>
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
                    <div  style="width: 100px">
                    <q-input
                      dense
                      v-model="atemperature_dsh_il"
                      :rules="[
                        requiredRange('atemperature dsh il')
                      ]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].atemperature_dsh_il" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].atemperature_dsh_il}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].atemperature_dsh_il" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].atemperature_dsh_il}}</div>
            </div>
                  </td>
                  <td>
                    <div  style="width: 100px">
                    <q-input
                      dense
                      v-model="atemperature_dsh_ol"
                      :rules="[
                        requiredRange('atemperature dsh ol')
                      ]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].atemperature_dsh_ol" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].atemperature_dsh_ol}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].atemperature_dsh_ol" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].atemperature_dsh_ol}}</div>
            </div>
                  </td>
                  <td>
                    <div  style="width: 100px">
                    <q-input
                      dense
                      v-model="fwt_eco_il"
                      :rules="[
                        requiredRange('fwt eco il'),
                      ]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].fwt_eco_il" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].fwt_eco_il}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].fwt_eco_il" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].fwt_eco_il}}</div>
            </div>
                  </td>
                  <td>
                    <div  style="width: 100px">
                    <q-input
                      
                      dense
                      v-model="fwt_eco_ol"
                      :rules="[
                        requiredRange('fwt eco ol'),
                      ]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].fwt_eco_ol" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].fwt_eco_ol}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].fwt_eco_ol" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].fwt_eco_ol}}</div>
            </div>
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
              >
              <div  style="width: 20%">
              <q-input
                dense
                v-model="fuel_feeder_rpm_1"
                :rules="[requiredRange('Fuel Feeder 1RPM')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].fuel_feeder_rpm_1" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].fuel_feeder_rpm_1}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].fuel_feeder_rpm_1" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].fuel_feeder_rpm_1}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev"
                >Fuel Feeder 2RPM (RPM) : </span
              >
              <div  style="width:20%">
              <q-input
                dense
                v-model="fuel_feeder_rpm_2"
                :rules="[requiredRange('Fuel Feeder 2RPM')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].fuel_feeder_rpm_2" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].fuel_feeder_rpm_2}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].fuel_feeder_rpm_2" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].fuel_feeder_rpm_2}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev"
                >Fuel Feeder 3RPM (RPM) : </span
              >
              <div  style="width: 20%">
              <q-input
                dense
                v-model="fuel_feeder_rpm_3"
                :rules="[requiredRange('Fuel Feeder 3RPM')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].fuel_feeder_rpm_3" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].fuel_feeder_rpm_3}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].fuel_feeder_rpm_3" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].fuel_feeder_rpm_3}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev"
                >Fuel Feeder 4RPM (RPM) : </span
              >
              <div  style="width: 20%">
              <q-input
                dense
                v-model="fuel_feeder_rpm_4"
                :rules="[requiredRange('Fuel Feeder 4RPM')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].fuel_feeder_rpm_4" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].fuel_feeder_rpm_4}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].fuel_feeder_rpm_4" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].fuel_feeder_rpm_4}}</div>
            </div>
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
              <span class="input-text text-wd-hev">Fur (mmw) : </span
              >
              <div style="width: 20%"> 
              <q-input
                dense
                v-model="fgd_fur"
                :rules="[requiredRange('Fur (mmw)')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].fgd_fur" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].fgd_fur}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].fgd_fur" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].fgd_fur}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev">Eco I/L (mmwc) : </span
              >
              <div style="width: 20%">
              <q-input
                dense
                v-model="fgd_eco"
                :rules="[requiredRange('Eco I/L (mmwc)')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].fgd_eco" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].fgd_eco}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].fgd_eco" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].fgd_eco}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev">APH I/L (mmwc) : </span
              >
              <div style="width: 20%">
              <q-input
                dense
                v-model="fgd_aph"
                :rules="[requiredRange('APH I/L (mmwc)')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].fgd_aph" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].fgd_aph}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].fgd_aph" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].fgd_aph}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev">ID I/L (mmwc) : </span
              >
              <div style="width: 20%">
              <q-input
                dense
                v-model="fgd_id"
                :rules="[requiredRange('ID I/L (mmwc)')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].fgd_id" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].fgd_id}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].fgd_id" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].fgd_id}}</div>
            </div>
            </div>
          </div>
          <div class="right"></div>
        </div>
        <div class="subtitle" style="margin-top: 0px">
          <p class="text-center q-mt-sm">AIR PRESSURES DE-AERATOR</p>
        </div>
        <div class="flex flex-center">
          <div class="left">
            <div class="input-feilds q-mt-md">
              <span class="input-text text-wd-hev">FD (mmw) : </span
              >
              <div style="width: 20%">
              <q-input
                dense
                v-model="apd_fd"
                :rules="[requiredRange('FD (mmw)')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].apd_fd" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].apd_fd}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].apd_fd" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].apd_fd}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev">SA (mmw) : </span
              >
              <div style="width: 20%">
              <q-input
                dense
                v-model="apd_sa"
                :rules="[requiredRange('SA (mmw)')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].apd_sa" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].apd_sa}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].apd_sa" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].apd_sa}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev">APH O/L Air (Degc) : </span
              >
              <div style="width: 20%">
              <q-input
                dense
                v-model="apd_aph"
                :rules="[requiredRange('APH O/L Air (Degc)')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].apd_aph" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].apd_aph}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].apd_aph" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].apd_aph}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev">Level (%) : </span
              >
              <div style="width: 20%"> 
              <q-input
                dense
                v-model="apd_level"
                :rules="[requiredRange('Level (%)')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].apd_level" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].apd_level}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].apd_level" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].apd_level}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev">Pres (kg/cm2) : </span
              >
              <div style="width: 20%">
              <q-input
                dense
                v-model="apd_pre"
                :rules="[requiredRange('Pres (kg/cm2)')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].apd_pre" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].apd_pre}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].apd_pre" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].apd_pre}}</div>
            </div>
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
              >
              <div style="width: 20%">
              <q-input
                dense
                v-model="feed_water_flow_tph"
                :rules="[requiredRange('Feed Water Flow(TPH)')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].feed_water_flow_tph" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].feed_water_flow_tph}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].feed_water_flow_tph" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].feed_water_flow_tph}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev">Steam Flow (TPH) : </span
              >
              <div style="width: 20%">
              <q-input
                dense
                v-model="steam_flow_tph"
                :rules="[requiredRange('Steam Flow (TPH)')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].steam_flow_tph" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].steam_flow_tph}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].steam_flow_tph" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].steam_flow_tph}}</div>
            </div>
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
              >
              <div style="width: 20%">
              <q-input
                dense
                v-model="feed_water_totalizer"
                :rules="[requiredRange('Feed Water Totalizer (MT)')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].feed_water_totalizer" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].feed_water_totalizer}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].feed_water_totalizer" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].feed_water_totalizer}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev">Steam Totalizer (MT) : </span
              >
              <div style="width: 20%">
              <q-input
                dense
                v-model="steam_totalizer"
                :rules="[requiredRange('Steam Totalizer')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].steam_totalizer" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].steam_totalizer}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].steam_totalizer" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].steam_totalizer}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev">Turbine Load (KW) : </span
              >
              <div style="width: 20%">
              <q-input   
                dense
                v-model="turbine_load"
                :rules="[requiredRange('Turbine Load(KW)')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].turbine_load" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].turbine_load}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].turbine_load" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].turbine_load}}</div>
            </div>
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
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="id_fan_rpm"
                      :rules="[
                        requiredRange('id fan rpm')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].id_fan_rpm" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].id_fan_rpm}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].id_fan_rpm" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].id_fan_rpm}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      
                      dense
                      v-model="id_fan_amps"
                      :rules="[
                        requiredRange('ID Fan Amps')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].id_fan_amps" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].id_fan_amps}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].id_fan_amps" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].id_fan_amps}}</div>
            </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="input-feilds q-mt-md">
          <span class="input-text" style="width: 100px">Remarks : </span
          >
          <div  style="width: 70%; margin-left: 28px">
          <q-input
            outlined
            dense
            v-model="remarks"
            type="textarea"
            float-label="Textarea"
            :max-height="10"
            :min-rows="2"
          />
          <div v-if="todayShiftDetailsOfBoiler.length >0  && todayShiftDetailsOfBoiler[0].remarks" class="text-orange">{{ this.todayShiftDetailsOfBoiler[0].remarks}}</div>
        <div v-if="todayShiftDetailsOfBoiler.length > 1  && todayShiftDetailsOfBoiler[1].remarks" class="text-blue">{{ this.todayShiftDetailsOfBoiler[1].remarks}}</div>
            </div>
        </div>
        <div class="btns">
          <q-btn
            @click="BoilerLogOnSubmit"
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
</template>
<script>
import { date, Notify } from "quasar";
import validations from "../helpers/validations";
import { mapActions } from "vuex";

export default {
  name: "BoilerLog",
  data() {
    return {
      ...validations,
      date: date.formatDate(Date.now(), "YYYY/MM/DD"),
      options: ["Shift A", "Shift B", "Shift C"],
      time: new Date().toLocaleTimeString(),
      capacity: "30",
      working_pre: "45",
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
      UserInfo: {},
      todayShiftDetailsOfBoiler:[],
    };
  },
  created() {
    this.UserInfo = this.GetUserInfo();
    this.initDB().then((db) => {
      this.db = db;
    });
  },
  mounted() {

    this.getTodayShiftDetailsOfBoiler();
  },

  computed:{
    shift(){
      return this.options[this.todayShiftDetailsOfBoiler.length]
    }
  },
  methods: {
    ...mapActions("indexedDb", ["initDB"]),
    ...mapActions("indexedDb", ["syncBoilerFormData"]),
    ...mapActions("indexedDb", ["clearBoilerFormIndexedDB"]),

    async getTodayShiftDetailsOfBoiler(){

      let user=JSON.parse(localStorage.getItem('userDetails'))

      const response= await fetch(`https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/boilerLogReportDataForTheDay.php?date=${this.date}&plant_code=${user.plant_code}&state_code=${user.state_code}`,
        {
          method:"POST"
        }
      )

      const responsedDataArray = await response.json()
      this.todayShiftDetailsOfBoiler= responsedDataArray
      console.log("816",this.todayShiftDetailsOfBoiler)

    },

    async BoilerLogOnSubmit() {
      let userDetailsData = JSON.parse(localStorage.getItem("userDetails"));

      const BoilerLogDetails = {
        date: this.date,
        shift: this.shift,
        time: this.time,
        capacity: this.capacity,
        working_pre: this.working_pre,
        boiler_feed_water_dis_pre: this.boiler_feed_water_dis_pre,
        boiler_feed_water_drum_level: this.boiler_feed_water_drum_level,
        main_steam_pre: this.main_steam_pre,
        main_steam_temp: this.main_steam_temp,
        fgt_furnance: this.fgt_furnance,
        fgt_bank_ol: this.fgt_bank_ol,
        fgt_eco_ol: this.fgt_eco_ol,
        fgt_aph_ol: this.fgt_aph_ol,
        fgt_id_ol: this.fgt_id_ol,
        atemperature_dsh_il: this.atemperature_dsh_il,
        atemperature_dsh_ol: this.atemperature_dsh_ol,
        fwt_eco_il: this.fwt_eco_il,
        fwt_eco_ol: this.fwt_eco_ol,
        fuel_feeder_rpm_1: this.fuel_feeder_rpm_1,
        fuel_feeder_rpm_2: this.fuel_feeder_rpm_2,
        fuel_feeder_rpm_3: this.fuel_feeder_rpm_3,
        fuel_feeder_rpm_4: this.fuel_feeder_rpm_4,
        fgd_fur: this.fgd_fur,
        fgd_eco: this.fgd_eco,
        fgd_aph: this.fgd_aph,
        fgd_id: this.fgd_id,
        apd_fd: this.apd_fd,
        apd_sa: this.apd_sa,
        apd_aph: this.apd_aph,
        apd_level: this.apd_level,
        apd_pre: this.apd_pre,
        feed_water_flow_tph: this.feed_water_flow_tph,
        steam_flow_tph: this.steam_flow_tph,
        feed_water_totalizer: this.feed_water_totalizer,
        steam_totalizer: this.steam_totalizer,
        turbine_load: this.turbine_load,
        id_fan_rpm: this.id_fan_rpm,
        id_fan_amps: this.id_fan_amps,
        remarks: this.remarks,
      };
      const TotalBoilerLogDetails = { ...BoilerLogDetails, ...userDetailsData };

      const validate = await this.$refs.boilForm.validate();
      if (validate) {
        try {
          if (navigator.onLine === true) {
            const response = await fetch(
              "https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/boilerLogEntry.php",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(TotalBoilerLogDetails),
              }
            );

            const result = await response.json();
            if (result.IsDataUploaded === true) {
              Notify.create({
                message: "✔ Log Submitted",
                color: "positive", // optional: 'positive', 'negative', 'warning', 'info'
                position: "top", // optional: 'top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left', 'center'
                timeout: 2000, // optional: milliseconds, set to 0 to disable auto-close
                actions: [
                  { label: "Dismiss", color: "white", handler: () => {} },
                ], // optional: actions to display in the notification
              });
              this.BoilerLogOnReset();
            } else if (result.IsDataUploaded === false) {
              Notify.create({
                message: "❌ Log Submission Failed",
                color: "negative", // optional: 'positive', 'negative', 'warning', 'info'
                position: "top", // optional: 'top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left', 'center'
                timeout: 2000, // optional: milliseconds, set to 0 to disable auto-close
                actions: [
                  { label: "Dismiss", color: "white", handler: () => {} },
                ], // optional: actions to display in the notification
              });
              this.BoilerLogOnReset();
            }
          } else {
            this.boilerDataSaveToIndexedDB(TotalBoilerLogDetails);
          }
        } catch (error) {
          Notify.create({
            message: "Error while uploading",
            color: "negative", // optional: 'positive', 'negative', 'warning', 'info'
            position: "top", // optional: 'top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left', 'center'
            timeout: 2000, // optional: milliseconds, set to 0 to disable auto-close
            actions: [{ label: "Dismiss", color: "white", handler: () => {} }], // optional: actions to display in the notification
          });
          this.BoilerLogOnReset();
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
    BoilerLogOnReset() {
      this.shift = "";
      // this.capacity = '';
      // this.working_pre = '';
      this.boiler_feed_water_dis_pre = "";
      this.boiler_feed_water_drum_level = "";
      this.main_steam_pre = "";
      this.main_steam_temp = "";
      this.fgt_furnance = "";
      this.fgt_bank_ol = "";
      this.fgt_eco_ol = "";
      this.fgt_aph_ol = "";
      this.fgt_id_ol = "";
      this.atemperature_dsh_il = "";
      this.atemperature_dsh_ol = "";
      this.fwt_eco_il = "";
      this.fwt_eco_ol = "";
      this.fuel_feeder_rpm_1 = "";
      this.fuel_feeder_rpm_2 = "";
      this.fuel_feeder_rpm_3 = "";
      this.fuel_feeder_rpm_4 = "";
      this.fgd_fur = "";
      this.fgd_eco = "";
      this.fgd_aph = "";
      this.fgd_id = "";
      this.apd_fd = "";
      this.apd_sa = "";
      this.apd_aph = "";
      this.apd_level = "";
      this.apd_pre = "";
      this.feed_water_flow_tph = "";
      this.steam_flow_tph = "";
      this.feed_water_totalizer = "";
      this.steam_totalizer = "";
      this.turbine_load = "";
      this.id_fan_rpm = "";
      this.id_fan_amps = "";
      this.remarks = "";
    },

    // sync process methods

    boilerDataSaveToIndexedDB(data) {
      const transactionBoiler = this.db.transaction(
        ["boilerFormData"],
        "readwrite"
      );
      const objectStore = transactionBoiler.objectStore("boilerFormData");
      objectStore.add(data);

      transactionBoiler.oncomplete = () => {
        Notify.create({
          message: "Data Synced Successfully",
          color: "positive",
          timeout: 2000,
          position: "top",
        });
      };

      transactionBoiler.onerror = (event) => {
        Notify.create({
          message: "Data Synced Failed Please Try Again",
          color: "negative",
          timeout: 2000,
          position: "top",
          actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
        });
      };

      this.BoilerLogOnReset();
    },

    async syncBoilerData() {
      if (!this.db) {
        console.error("Database not initialized");
        await this.initDB();
      }
      this.syncBoilerFormData();
    },
  },
};
</script>
<style>
@media (max-width: 602px) {
}
</style>
