<template>
  <q-page>
    <div class="title">
      <h4 class="text-center q-bold" style="position: relative;">Turbine Log
        <q-icon
      name="sync"
      size="lg"
      class="absolute-right"
      style="border:1px solid green;background-color:#DAFDBA"
      @click="syncTurbineData()"
    />
      </h4>
    </div>
 
    <div class="container">
      <q-form ref='turbForm'
        class="trblgFrm"
      >
        <div class="split-container">
          <div class="left-container" style="width: 50%">
            <div class="input-feilds">
              <span class="input-text input-text-trb-frm">Date : </span
              ><q-input
                style="width: 40%"
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
            </div>
            <div class="input-feilds">
              <span class="input-text input-text-trb-frm">Shift : </span
              >
              <div style="width: 40%; margin-bottom: 20px">
              <q-input
                outlined
                dense
                v-model="shift"
                label="Shift"
                readonly
                :rules="[required('shift')]"
              />
              <!-- {{ todayShiftDetailsOfTurbine }} -->
                <!-- {{ todayShiftDetailsOfTurbine.length > 0 }} -->
              <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].shift" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].shift}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[0].shift" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].shift}}</div>
            </div>
            </div>
            <div class="input-feilds" style="width: 100%">
              <span class="input-text input-text-trb-frm">Time :</span
              >
              <div style="width: 40%">
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
              <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].time" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].time}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].time" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].time}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span
                class="input-text input-text-trb-frm"
                style="padding-top: 4px"
                >Speed(RPM) : </span
              >
              <!-- {{ todayShiftDetailsOfTurbine }} -->
              <div style="margin-top: 10px; width: 40%">
              <q-input
                dense
                v-model="speed_rpm"
                type="number"
                outlined
                label="Speed(RPM)"
                :min="0"
                :rules="[required('Speed')]"
                required
              />
              <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].speed_rpm" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].speed_rpm}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].speed_rpm" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].speed_rpm}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text input-text-trb-frm">Load (KW) : </span
              >
              <div style="width: 40%">
              <q-input     
                dense
                v-model="load_kw"
                :rules="[required('Load Kw')]"
                type="number"
                outlined
                label="Load (KW)"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].load_kw" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].load_kw}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].load_kw" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].load_kw}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev" style="padding-top: 4px"
                >Inlet Steam Temp (Deg C) : </span

              >
              <div   style="margin-top: 10px; width: 20%">
              <q-input 
                dense
                v-model="inlet_steam_temp"
                :rules="[requiredRange('inlet steam temp')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].inlet_steam_temp" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].inlet_steam_temp}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].inlet_steam_temp" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].inlet_steam_temp}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev"
                >Inlet Steam Pfe. (kg/cm2) : </span
              >
              <div  style="width: 20%">
              <q-input
                dense
                v-model="inlet_steam_pre"
                :rules="[requiredRange('Inlet Steam Press')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].inlet_steam_pre" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].inlet_steam_pre}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].inlet_steam_pre" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].inlet_steam_pre}}</div>
            </div>
            </div>
          </div>
          <div class="line-tr"></div>
          <div class="right-container" style="width: 50%; margin-left: 20px">
            <div class="input-feilds">
              <span class="input-text text-wd-hev"
                >Intet Steam flow (TPH) : </span
              >
              <div style="width: 20%">
              <q-input
                dense
                v-model="inlet_steam_flow"
                :rules="[requiredRange('number')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].inlet_steam_pre" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].inlet_steam_pre}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].inlet_steam_pre" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].inlet_steam_pre}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev"
                >Lub Oil Pre. (kg/cm2) : </span
              >
              <div style="width: 20%">
              <q-input
                dense
                v-model="lub_oil_pre"
                :rules="[requiredRange('lub oil pre')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].lub_oil_pre" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].lub_oil_pre}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].lub_oil_pre" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].lub_oil_pre}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev"
                >Control Oil Pre. (kg/cm2) : </span
              >
              <div style="width: 20%">
              <q-input
                dense
                v-model="control_oil_pre"
                :rules="[requiredRange('control oil pre')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].control_oil_pre" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].control_oil_pre}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].control_oil_pre" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].control_oil_pre}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev"
                >Trip Oil Pre. (kg/cm2) : </span
              >
              <div style="width: 20%">
              <q-input
                dense
                v-model="trip_oil_pre"
                :rules="[requiredRange('trip oil pre')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].trip_oil_pre" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].trip_oil_pre}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].trip_oil_pre" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].trip_oil_pre}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev">Chust pres. (Kg/cm2) : </span
              >
              <div style="width: 20%">
              <q-input
                dense
                v-model="chust_pre"
                :rules="[requiredRange('chust press')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].chust_pre" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].chust_pre}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].chust_pre" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].chust_pre}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev"
                >Exhaust Stem pipe (Kg/cm2) : </span
              >
              <div style="width: 20%">
              <q-input
                dense
                v-model="exhaust_stem_pipe"
                :rules="[requiredRange('exhaust steam pipe')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].exhaust_stem_pipe" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].exhaust_stem_pipe}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].exhaust_stem_pipe" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].exhaust_stem_pipe}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text text-wd-hev"
                >Exhaust Stem Temp (DegC) : </span
              >
              <div style="width: 20%">
              <q-input             
                dense
                v-model="exhaust_stem_temp"
                :rules="[requiredRange('exhaust steam temp')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].exhaust_stem_temp" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].exhaust_stem_temp}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].exhaust_stem_temp" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].inlet_steam_pre}}</div>
            </div>
            </div>
          </div>
        </div>
        <div class="subtitle">
          <p class="text-center q-mt-sm">GEAR BOX BEARING TEMPRATURE</p>
        </div>
        <div class="flex flex-center">
          <div class="input-feilds q-mt-sm">
            <span class="input-text text-wd-hev"
              >Thrust Wear Pres. (Kg/cm2) : </span
            >
            <div  style="width: 20%">
            <q-input     
              dense
              v-model="gb_thrust_wear_pre"
              :rules="[requiredRange('Thrust Wear Pres')]"
              type="number"
              outlined
              label="Input"
              :min="0"
            />
            <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].gb_thrust_wear_pre" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].gb_thrust_wear_pre}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].gb_thrust_wear_pre" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].gb_thrust_wear_pre}}</div>
            </div>
          </div>
          <div class="input-feilds">
            <span class="input-text text-wd-hev"
              >HP Casing Vibra (mm/sec) : </span
            >
            <div style="width:20%">
            <q-input
              dense
              v-model="gb_hp_casing_vibra"
              :rules="[requiredRange('Hp Casing Vibra(mm/secs)')]"
              type="number"
              outlined
              label="Input"
              :min="0"
            />
            <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].gb_thrust_wear_pre" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].gb_thrust_wear_pre}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].gb_thrust_wear_pre" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].gb_thrust_wear_pre}}</div>
            </div>
          </div>
          <div class="input-feilds">
            <span class="input-text text-wd-hev"
              >LP Casing Vibra (mm/sec) : </span
            >
            <div style="width:20%">
            <q-input
              dense
              v-model="gb_lp_casing_vibra"
              :rules="[requiredRange('LP casing vibra')]"
              type="number"
              outlined
              label="Input"
              :min="0"
            />
            <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].gb_thrust_wear_pre" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].gb_thrust_wear_pre}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].gb_thrust_wear_pre" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].gb_thrust_wear_pre}}</div>
            </div>
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
                    <div  style="width: 100px">
                    <q-input
                      dense
                      v-model="gb_hp_degc"
                      :rules="[requiredRange('Gb hp degc')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].gb_hp_degc" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].gb_hp_degc}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].gb_hp_degc" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].gb_hp_degc}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="gb_lp_degc"
                      :rules="[requiredRange('gb lp degc') ]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].gb_thrust_wear_pre" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].gb_thrust_wear_pre}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].gb_thrust_wear_pre" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].gb_thrust_wear_pre}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="gb_pf_degc"
                      :rules="[requiredRange('gb pf degc')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].gb_pf_degc" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].gb_pf_degc}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].gb_pf_degc" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].gb_pf_degc}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="gb_pa_degc"
                      :rules="[requiredRange('gb pa degc')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].gb_pa_degc" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].gb_pa_degc}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].gb_pa_degc" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].gb_pa_degc}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="gb_gf_degc"
                      :rules="[requiredRange('gb gf degc')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].gb_gf_degc" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].gb_gf_degc}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].gb_gf_degc" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].gb_gf_degc}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="gb_gr_degc"
                      :rules="[requiredRange('gb gr degc')                      ]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].gb_gr_degc" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].gb_gr_degc}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].gb_gr_degc" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].gb_gr_degc}}</div>
            </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="input-feilds">
            <span class="input-text text-wd-hev"
              >Lube Oil coller Before (Deg C) : </span
            >
            <div style="width: 20%; margin-top: 10px">
            <q-input
              dense
              v-model="gb_lube_oil_coller_before"
              :rules="[requiredRange('Lube Oil coller Before(Deg C)')]"
              type="number"
              outlined
              label="Input"
              :min="0"
            />
            <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].gb_lube_oil_coller_before" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].gb_lube_oil_coller_before}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].gb_lube_oil_coller_before" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].gb_lube_oil_coller_before}}</div>
            </div>
          </div>
          <div class="input-feilds">
            <span class="input-text text-wd-hev"
              >Lube Oil coller After (Deg C) : </span
            >
            <div style="width: 20%">
            <q-input
              dense
              v-model="gb_lube_oil_coller_after"
              :rules="[requiredRange('Lube Oil coller After (Deg C)')]"
              type="number"
              outlined
              label="Input"
              :min="0"
            />
            <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].gb_lube_oil_coller_after" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].gb_lube_oil_coller_after}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].gb_lube_oil_coller_after" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].gb_lube_oil_coller_after}}</div>
            </div>
          </div>
          <div class="input-feilds">
            <span class="input-text text-wd-hev">Differ Pre. (Deg C) : </span
            >
            <div style="width: 20%">
            <q-input
              dense
              v-model="gb_differ_pre"
              :rules="[requiredRange('Differ Pre. (Deg C)')]"
              type="number"
              outlined
              label="Input"
              :min="0"
            />
            <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].gb_differ_pre" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].gb_differ_pre}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].gb_differ_pre" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].gb_differ_pre}}</div>
            </div>
          </div>
          <div class="input-feilds">
            <span class="input-text text-wd-hev">ALT DE (Deg C) : </span
            >
            <div style="width: 20%">  
            <q-input
              dense
              v-model="gb_alt_de"
              :rules="[requiredRange('ALT DE (Deg C)')]"
              type="number"
              outlined
              label="Input"
              :min="0"
            />
            <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].gb_alt_de" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].gb_alt_de}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].gb_alt_de" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].gb_alt_de}}</div>
            </div>
          </div>
          <div class="input-feilds">
            <span class="input-text text-wd-hev">ALT NDE (Deg C) : </span
            >
            <div style="width: 20%">
            <q-input     
              dense
              v-model="gb_alt_nde"
              :rules="[requiredRange('ALT NDE (Deg C)')]"
              type="number"
              outlined
              label="Input"
              :min="0"
            />
            <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].gb_alt_nde" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].gb_alt_nde}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].gb_alt_nde" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].gb_alt_nde}}</div>
            </div>
          </div>
        </div>
        <div class="subtitle">
          <p class="text-center q-mt-sm">Water</p>
        </div>
        <div class="flex flex-center">
          <div class="input-feilds">
            <span class="input-text text-wd-hev"
              >Water Pressure (Kg/cm2) : </span
            >
                        <div style="width: 20%; margin-top: 10px">
            <q-input
              dense
              v-model="water_pre"
              :rules="[requiredRange('Water Pressure (Kg/cm2)')]"
              type="number"
              outlined
              label="Input"
              :min="0"
            />
                    <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].water_pre" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].water_pre}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].water_pre" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].water_pre}}</div>
            </div>
          </div>
          <div class="input-feilds">
            <span class="input-text text-wd-hev"
              >Water Inlet Temp (Deg C) : </span
            >
                        <div  style="width: 20%" >
            <q-input
              dense
              v-model="water_inlet_temp"
              :rules="[requiredRange('Water Inlet Temp (Deg C)')]"
              type="number"
              outlined
              label="Input"
              :min="0"
            />
                    <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].water_inlet_temp" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].water_inlet_temp}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].water_inlet_temp" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].water_inlet_temp}}</div>
            </div>
          </div>
          <div class="input-feilds">
            <span class="input-text text-wd-hev">
              Water Outlet Temp (Deg C) : </span
            >
            <div  style="width: 20%" >
            <q-input
              dense
              v-model="water_outlet_temp"
              :rules="[requiredRange('Water Outlet Temp (Deg C)')]"
              type="number"
              outlined
              label="Input"
              :min="0"
            />
                    <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].water_outlet_temp" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].water_outlet_temp}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].water_outlet_temp" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].water_outlet_temp}}</div>
            </div>
          </div>
          <div class="input-feilds">
            <span class="input-text">Remarks : </span
            >
            <div style="width: 70%; margin-left: 28px">
            <q-input 
              outlined
              dense
              v-model="remarks"
              type="textarea"
              float-label="Textarea"
              :max-height="10"
              :min-rows="2"
              
            />
                    <div v-if="todayShiftDetailsOfTurbine.length >0  && todayShiftDetailsOfTurbine[0].remarks" class="text-orange">{{ this.todayShiftDetailsOfTurbine[0].remarks}}</div>
        <div v-if="todayShiftDetailsOfTurbine.length > 1  && todayShiftDetailsOfTurbine[1].remarks" class="text-blue">{{ this.todayShiftDetailsOfTurbine[1].remarks}}</div>
            </div>
          </div>
          <div class="btns" style="margin-left: 15%">
            <q-btn
              @click="TurbineLogOnSubmit"
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
</template>
<script>
import validations from "../helpers/validations"
import { date, Notify } from "quasar";
import axios from "axios";
import ApiEndPoint from "src/boot/axios";
import {mapActions} from "vuex"


export default {
  name: "TurbineLog",
  data() {
    return {
      ...validations,
      date: date.formatDate(Date.now(), "YYYY/MM/DD"),
      options: ["Shift 1", "Shift 2", "Shift 3"],
      // db:null,
      time: new Date().toLocaleTimeString(),
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
      UserInfo: {},
      todayShiftDetailsOfTurbine:[],
    };
  },
  computed: {
    GetDate() {
      const timeStamp = Date.now();
      const formattedString = date.formatDate(timeStamp, "DD-MM-YYYY");
      return formattedString;
    },

    shift(){
      return this.options[this.todayShiftDetailsOfTurbine.length];
    }
  },

  created() {
    this.UserInfo = this.GetUserInfo();
    this.initDB().then((db) => {
      this.db = db;
    });
  },

  mounted() {
  this.getTodayCompletedShiftDetailsOfTurbineLog();
  },
  methods: {
    ...mapActions("indexedDb",["initDB"]),
    ...mapActions("indexedDb",["clearTurbineFormIndexedDB"]),
    ...mapActions("indexedDb",["syncTurbineFormData"]),


    async getTodayCompletedShiftDetailsOfTurbineLog(){

      // console.log("formDate",this.date)
      let user=JSON.parse(localStorage.getItem('userDetails'))
    console.log("619",`https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/turbineLogReportDataForTheDay.php?date=${this.date}&plant_code=${user.plant_code}&state_code=${user.state_code}`)

      const response= await fetch(`https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/turbineLogReportDataForTheDay.php?date=${this.date}&plant_code=${user.plant_code}&state_code=${user.state_code}`,
        {
          method:"POST",
    }
      )
const responsedArrayData= await response.json()
// console.log("625",responsedArrayData)

this.todayShiftDetailsOfTurbine=responsedArrayData;
    },

async TurbineLogOnSubmit() {
  let userDetailsData = JSON.parse(localStorage.getItem("userDetails"));

  const TurbineLogDetails = {
    date: this.date,
    shift: this.shift,
    time: this.time,
    speed_rpm: this.speed_rpm,
    load_kw: this.load_kw,
    inlet_steam_temp: this.inlet_steam_temp,
    inlet_steam_pre: this.inlet_steam_pre,
    inlet_steam_flow: this.inlet_steam_flow,
    lub_oil_pre: this.lub_oil_pre,
    control_oil_pre: this.control_oil_pre,
    trip_oil_pre: this.trip_oil_pre,
    chust_pre: this.chust_pre,
    exhaust_stem_pipe: this.exhaust_stem_pipe,
    exhaust_stem_temp: this.exhaust_stem_temp,
    gb_thrust_wear_pre: this.gb_thrust_wear_pre,
    gb_hp_casing_vibra: this.gb_hp_casing_vibra,
    gb_lp_casing_vibra: this.gb_lp_casing_vibra,
    gb_hp_degc: this.gb_hp_degc,
    gb_lp_degc: this.gb_lp_degc,
    gb_pf_degc: this.gb_pf_degc,
    gb_pa_degc: this.gb_pa_degc,
    gb_gf_degc: this.gb_gf_degc,
    gb_gr_degc: this.gb_gr_degc,
    gb_lube_oil_coller_before: this.gb_lube_oil_coller_before,
    gb_lube_oil_coller_after: this.gb_lube_oil_coller_after,
    gb_differ_pre: this.gb_differ_pre,
    gb_alt_de: this.gb_alt_de,
    gb_alt_nde: this.gb_alt_nde,
    water_pre: this.water_pre,
    water_inlet_temp: this.water_inlet_temp,
    water_outlet_temp: this.water_outlet_temp,
    remarks: this.remarks,
  };

  const TotalTurbineLogDetails = { ...TurbineLogDetails, ...userDetailsData };

  const validate = await this.$refs.turbForm.validate();
  if (validate) {
    try {
      if (navigator.onLine === true) {

        const response = await fetch(
          "https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/turbineLogEntry.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(TotalTurbineLogDetails),
          }
        );

        const result = await response.json();

        if (result.IsDataUploaded === true) {
          Notify.create({
            message: "✔ Log Submitted",
            color: "positive", 
            position: "top", 
            timeout: 2000, 
            actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
          });
          this.TurbineLogOnReset();
        } else if (result.IsDataUploaded === false) {
          Notify.create({
            message: "❌ Log Submission Failed",
            color: "negative",
            position: "top",
            timeout: 2000,
            actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
          });
          this.TurbineLogOnReset();
        }
      } else {
        this.turbineDataSaveToIndexedDB(TotalTurbineLogDetails);
      }
    } catch (error) {
      Notify.create({
        message: "Error while uploading",
        color: "negative",
        position: "top",
        timeout: 2000,
        actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
      });
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
    TurbineLogOnReset() {
      this.shift = "";
      this.speed_rpm = "";
      this.load_kw = "";
      this.inlet_steam_temp = "";
      this.inlet_steam_pre = "";
      this.inlet_steam_flow = "";
      this.lub_oil_pre = "";
      this.control_oil_pre = "";
      this.trip_oil_pre = "";
      this.chust_pre = "";
      this.exhaust_stem_pipe = "";
      this.exhaust_stem_temp = "";
      this.gb_thrust_wear_pre = "";
      this.gb_hp_casing_vibra = "";
      this.gb_lp_casing_vibra = "";
      this.gb_hp_degc = "";
      this.gb_lp_degc = "";
      this.gb_pf_degc = "";
      this.gb_pa_degc = "";
      this.gb_gf_degc = "";
      this.gb_gr_degc = "";
      this.gb_lube_oil_coller_before = "";
      this.gb_lube_oil_coller_after = "";
      this.gb_differ_pre = "";
      this.gb_alt_de = "";
      this.gb_alt_nde = "";
      this.water_pre = "";
      this.water_inlet_temp = "";
      this.water_outlet_temp = "";
      this.remarks = "";
    },

    // sync process methods

    turbineDataSaveToIndexedDB(data) {
      const transactionTurbine = this.db.transaction(
        ["turbineFormData"],
        "readwrite"
      );
      const objectStore =
        transactionTurbine.objectStore("turbineFormData");
      objectStore.add(data);

      transactionTurbine.oncomplete = () => {
        Notify.create({
          message: "Data Synced Successfully",
          color: "positive",
          timeout: 2000,
          position: "top",
        });
      };

      transactionTurbine.onerror = (event) => {
        Notify.create({
          message: "Data Synced Failed Please Try Again",
          color: "negative",
          timeout: 2000,
          position: "top",
          actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
        });
      };

      this.TurbineLogOnReset();
    },
    async syncTurbineData(){
      if (!this.db) {
      console.error("Database not initialized");
      await this.initDB();
    };
      this.syncTurbineFormData();
    },
    clearTurbineIndexedDB(){
      this.clearTurbineFormIndexedDB()
    },
  },
};
</script>
<style>
@media (max-width: 602px) {
  .TurbineLogTableContainer {
    width: 535px;
    overflow: scroll;
  }
  .text-wd-hev {
    width: 200px;
  }
}
</style>
