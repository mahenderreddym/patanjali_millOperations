<template>
  <q-page>
    <div class="title">
      <h4 class="text-center q-bold" style="position: relative">
        Press Station Log
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
              <span class="input-text input-text-bl-frm">Date : </span
              ><q-input
                style="width: 55%"
                dense
                outlined
                v-model="pressStationForm.date"
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
              >
              <div style="width: 55%">
              <q-select
                outlined
                dense
                v-model="pressStationForm.shift"
                :options="options"
                label="Shift"
                :rules="[required('shift')]"
              />
              <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].shift" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].shift}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].shift" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].shift}}</div>
      </div>
            </div>
          </div>
          <div class="line-tr"></div>
          <div class="right-container">
            <div class="input-feilds">
              <span class="input-text input-text-bl-frm">Time : </span>
              <div  style="width: 55%; margin-bottom: 20px">
              <q-input
                outlined
                dense
                v-model="pressStationForm.dateTime"
                label="Time"
                :rules="[required('Time')]"
              >
              </q-input>
              <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].shift" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].shift}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].shift" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].shift}}</div>
      </div>
            </div>
          </div>
        </div>
        <div class="flex flex-center">
          <div class="input-feilds q-mt-md">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th colspan="2">SFB Conveyor</th>
                </tr>
                <tr>
                  <th>SFB Conveyor-1 <br />Amps</th>
                  <th>SFB Conveyor-2 <br />Amps</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div  style="width: 100px">
                    <q-input
                      dense
                      v-model="pressStationForm.sfb_conveyor1"
                      :rules="[requiredRange('SFB Conveyor1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].sfb_conveyor1" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].sfb_conveyor1}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].sfb_conveyor1" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].sfb_conveyor1}}</div>
      </div>
                  </td>
                  <td>
                    <div  style="width: 100px">
                    <q-input
                      dense
                      v-model="pressStationForm.sfb_conveyor2"
                      :rules="[requiredRange('SFB Conveyor2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].sfb_conveyor2" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].sfb_conveyor2}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].sfb_conveyor2" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].sfb_conveyor2}}</div>
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
                  <th colspan="3">STRIP</th>
                </tr>
                <tr>
                  <th>Strip No-1</th>
                  <th>Strip No-2</th>
                  <th>Strip No-3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div  style="width: 100px">
                    <q-input
                      dense
                      v-model="pressStationForm.strip_no1"
                      :rules="[requiredRange('Strip No1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].strip_no1" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].strip_no1}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].strip_no1" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].strip_no1}}</div>
      </div>
                  </td>
                  <td>
                    <div  style="width: 100px">
                    <q-input
                      dense
                      v-model="pressStationForm.strip_no2"
                      :rules="[requiredRange('Strip No2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].strip_no2" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].strip_no2}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].strip_no2" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].strip_no2}}</div>
      </div>
                  </td>
                  <td>
                    <div  style="width: 100px">
                    <q-input
                      dense
                      v-model="pressStationForm.strip_no3"
                      :rules="[requiredRange('Strip No3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].strip_no3" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].strip_no3}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].strip_no3" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].strip_no3}}</div>
      </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="subtitle" style="margin-top: 20px">
          <p class="text-center q-mt-sm">FRUIT ELEVATOR</p>
        </div>
        <div class="flex flex-center">
          <div class="input-feilds q-mt-md">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th>Fruit Elevator-1</th>
                  <th>Fruit Elevator-2</th>
                  <th>Fruit Elevator-3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div  style="width: 100px">
                    <q-input
                      dense
                      v-model="pressStationForm.fruit_elevator1"
                      :rules="[requiredRange('Fruit Elevator1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].fruit_elevator1" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].fruit_elevator1}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].fruit_elevator1" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].fruit_elevator1}}</div>
      </div>
                  </td>
                  <td>
                    <div  style="width: 100px">
                    <q-input
                      dense
                      v-model="pressStationForm.fruit_elevator2"
                      :rules="[requiredRange('Fruit Elevator2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].fruit_elevator2" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].fruit_elevator2}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].fruit_elevator2" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].fruit_elevator2}}</div>
      </div>
                  </td>
                  <td>
                    <div  style="width: 100px">
                    <q-input
                      dense
                      v-model="pressStationForm.fruit_elevator3"
                      :rules="[requiredRange('Fruit Elevator3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].fruit_elevator3" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].fruit_elevator3}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].fruit_elevator3" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].fruit_elevator3}}</div>
      </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="subtitle" style="margin-top: 20px">
          <p class="text-center q-mt-sm">DIGESTOR PRESSURE READINGS</p>
        </div>
        <div class="">
          <div class="" style="width: 100%">
            <table class="q-mt-md q-mb-md">
              <thead>
                <tr>
                  <th colspan="2">Digestor 1</th>
                  <th colspan="2">Pressure No-1</th>
                  <th colspan="2">Digestor 2</th>
                  <th colspan="2">Pressure No-2</th>
                </tr>
                <tr>
                  <th>Temp</th>
                  <th>Amps</th>
                  <th>Amps</th>
                  <th>Hydraulic Pressure</th>
                  <th>Temp</th>
                  <th>Amps</th>
                  <th>Amps</th>
                  <th>Hydraulic Pressure</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.digestor_temp1"
                      :rules="[requiredRange('Digestor Temp1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].digestor_temp1" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].digestor_temp1}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].digestor_temp1" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].digestor_temp1}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.digestor_amps1"
                      :rules="[requiredRange('Digestor Amps1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].digestor_amps1" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].digestor_amps1}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].digestor_amps1" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].digestor_amps1}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.press_no_temp1"
                      :rules="[requiredRange('Press No Amps1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].press_no_temp1" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].press_no_temp1}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].press_no_temp1" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].press_no_temp1}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.press_no_hydraulic_pressure1"
                      :rules="[requiredRange('Press No Hyderaulic Pressure1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].press_no_hydraulic_pressure1" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].press_no_hydraulic_pressure1}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].press_no_hydraulic_pressure1" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].press_no_hydraulic_pressure1}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.digestor_temp2"
                      :rules="[requiredRange('Digestor Temp2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].digestor_temp2" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].digestor_temp2}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].digestor_temp2" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].digestor_temp2}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.digestor_amps2"
                      :rules="[requiredRange('Digestor Amps2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].digestor_amps2" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].digestor_amps2}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].digestor_amps2" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].digestor_amps2}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.press_no_temp2"
                      :rules="[requiredRange('Press No Amps2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].press_no_temp2" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].press_no_temp2}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].press_no_temp2" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].press_no_temp2}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.press_no_hydraulic_pressure2"
                      :rules="[requiredRange('Press No Hyderaulic Pressure2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].press_no_hydraulic_pressure2" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].press_no_hydraulic_pressure2}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].press_no_hydraulic_pressure2" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].press_no_hydraulic_pressure2}}</div>
      </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="" style="width: 100%">
            <table class="q-mt-md q-mb-md">
              <thead>
                <tr>
                  <th colspan="2">Digestor-3</th>
                  <th colspan="2">Pressure No-3</th>
                  <th colspan="2">Digestor-4</th>
                  <th colspan="2">Pressure No-4</th>
                </tr>
                <tr>
                  <th>Temp</th>
                  <th>Amps</th>
                  <th>Amps</th>
                  <th>Hydraulic Pressure</th>
                  <th>Temp</th>
                  <th>Amps</th>
                  <th>Amps</th>
                  <th>Hydraulic Pressure</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.digestor_temp3"
                      :rules="[requiredRange('Digestor Temp3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].digestor_temp3" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].digestor_temp3}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].digestor_temp3" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].digestor_temp3}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.digestor_amps3"
                      :rules="[requiredRange('Digestor Amps3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].digestor_amps3" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].digestor_amps3}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].digestor_amps3" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].digestor_amps3}}</div>
      </div>
                  </td>

                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.press_no_temp3"
                      :rules="[requiredRange('Press No Amps3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].press_no_temp3" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].press_no_temp3}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].press_no_temp3" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].press_no_temp3}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.press_no_hydraulic_pressure3"
                      :rules="[requiredRange('Press No Hyderaulic Pressure3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].press_no_hydraulic_pressure3" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].press_no_hydraulic_pressure3}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].press_no_hydraulic_pressure3" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].press_no_hydraulic_pressure3}}</div>
      </div>
                  </td>

                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.digestor_temp4"
                      :rules="[requiredRange('Digestor Temp4')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].digestor_temp4" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].digestor_temp4}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].digestor_temp4" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].digestor_temp4}}</div>
      </div>
                  </td>

                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.digestor_amps4"
                      :rules="[requiredRange('Digestor Amps4')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].digestor_amps4" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].digestor_amps4}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].digestor_amps4" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].digestor_amps4}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.press_no_temp4"
                      :rules="[requiredRange('Press No Amps4')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].press_no_temp4" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].press_no_temp4}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].press_no_temp4" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].press_no_temp4}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.press_no_hydraulic_pressure4"
                      :rules="[requiredRange('Press No Hyderaulic Pressure4')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].press_no_hydraulic_pressure4" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].press_no_hydraulic_pressure4}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].press_no_hydraulic_pressure4" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].press_no_hydraulic_pressure4}}</div>
      </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="" style="width: 100%">
            <table class="q-mt-md q-mb-md">
              <thead>
                <tr>
                  <th colspan="2">Digestor-5</th>
                  <th colspan="2">Pressure No-5</th>
                  <th colspan="2">Digestor-6</th>
                  <th colspan="2">Pressure No-6</th>
                </tr>
                <tr>
                  <th>Temp</th>
                  <th>Amps</th>
                  <th>Amps</th>
                  <th>Hydraulic Pressure</th>
                  <th>Temp</th>
                  <th>Amps</th>
                  <th>Amps</th>
                  <th>Hydraulic Pressure</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.digestor_temp5"
                      :rules="[requiredRange('Digestor Temp5')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].digestor_temp5" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].digestor_temp5}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].digestor_temp5" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].digestor_temp5}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.digestor_amps5"
                      :rules="[requiredRange('Digestor Amps5')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].digestor_amps5" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].digestor_amps5}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].digestor_amps5" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].digestor_amps5}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.press_no_temp5"
                      :rules="[requiredRange('Press No Amps4')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].press_no_temp5" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].press_no_temp5}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].press_no_temp5" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].press_no_temp5}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.press_no_hydraulic_pressure5"
                      :rules="[requiredRange('Press No Hyderaulic Pressure5')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].press_no_hydraulic_pressure5" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].press_no_hydraulic_pressure5}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].press_no_hydraulic_pressure5" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].press_no_hydraulic_pressure5}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.digestor_temp6"
                      :rules="[requiredRange('Digestor Temp6')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].digestor_temp6" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].digestor_temp6}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].digestor_temp6" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].digestor_temp6}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.digestor_amps6"
                      :rules="[requiredRange('Digestor Amps6')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].digestor_amps6" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].digestor_amps6}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].digestor_amps6" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].digestor_amps6}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.press_no_temp6"
                      :rules="[requiredRange('Press No Amps6')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].press_no_temp6" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].press_no_temp6}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].press_no_temp6" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].press_no_temp6}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.press_no_hydraulic_pressure6"
                      :rules="[requiredRange('Press No Hyderaulic Pressure6')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].press_no_hydraulic_pressure6" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].press_no_hydraulic_pressure6}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].press_no_hydraulic_pressure6" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].press_no_hydraulic_pressure6}}</div>
      </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- cake brayers -->
        <div class="flex flex-center">
          <div class="input-feilds q-mt-md q-mb-md">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th colspan="2">Cake Break Conveyors</th>
                </tr>
                <tr>
                  <th>No 1 Amps</th>
                  <th>No 2 Amps</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div style="width:100px">
                    <q-input
                      dense
                      v-model="pressStationForm.cake_breake_conveyor_no1_amps"
                      :rules="[requiredRange('Cake Break Conveyor No1 Amps')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].cake_breake_conveyor_no1_amps" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].cake_breake_conveyor_no1_amps}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].cake_breake_conveyor_no1_amps" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].cake_breake_conveyor_no1_amps}}</div>
      </div>
                  </td>
                  <td>
                    <div style="width:100px">
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="pressStationForm.cake_breake_conveyor_no2_amps"
                      :rules="[requiredRange('Cake Break Conveyor No2 Amps')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].cake_breake_conveyor_no2_amps" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].cake_breake_conveyor_no2_amps}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].cake_breake_conveyor_no2_amps" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].cake_breake_conveyor_no2_amps}}</div>
      </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- total -->
        <div class="flex flex-center">
          <div class="input-feilds q-mt-sm">
            <span class="input-text text-wd-hev"
              >Total FFB Cages/Qty Processed: </span
            >
            <div  style="width: 20%">
            <q-input
              dense
              v-model="pressStationForm.total_ffb_cages_or_qty_processed"
              :rules="[requiredRange('Fur (mmw)')]"
              type="number"
              outlined
              label="Input"
              :min="0"
              class="q-mt-md"
            />
            <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].total_ffb_cages_or_qty_processed" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].total_ffb_cages_or_qty_processed}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].total_ffb_cages_or_qty_processed" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].total_ffb_cages_or_qty_processed}}</div>
      </div>
          </div>
        </div>

        <!-- total press running hours -->
        <div class="subtitle" style="margin-top: 20px">
          <p class="text-center q-mt-sm">Total Press Running Hours</p>
        </div>
        <div class="q-mt-md q-mb-md">
          <div class="input-fields">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th></th>
                  <th>Start Time</th>
                  <th>Stop Time</th>
                  <th>Total Hours</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Press No-1</td>
                  <td>
                    <div>
                    <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                      v-model="pressStationForm.start_time1"
                      mask="time"
                      :rules="[required('field')]"
                      @click="showTimePicker"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="timePopup"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="pressStationForm.start_time1">
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
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].start_time1" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].start_time1}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].start_time1" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].start_time1}}</div>
      </div>
                  </td>

                  <td>
                    <div>
                    <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                      v-model="pressStationForm.stop_time1"
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
                            <q-time v-model="pressStationForm.stop_time1">
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
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].stop_time1" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].stop_time1}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].stop_time1" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].stop_time1}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.total_hours1"
                      :rules="[requiredRange('Total Hours1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].total_hours1" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].total_hours1}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].total_hours1" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].total_hours1}}</div>
      </div>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Press No-2</td>
                  <td>
                    <div>
                    <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                      v-model="pressStationForm.start_time2"
                      :rules="[requiredRange('Start Time2')]"
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
                            <q-time v-model="pressStationForm.start_time2">
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
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].start_time2" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].start_time2}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].start_time2" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].start_time2}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                      v-model="pressStationForm.stop_time2"
                      :rules="[requiredRange('Stop Time2')]"
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
                            <q-time v-model="pressStationForm.stop_time2">
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
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].stop_time2" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].stop_time2}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].stop_time2" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].stop_time2}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.total_hours2"
                      :rules="[requiredRange('Total Hours2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].total_hours2" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].total_hours2}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].total_hours2" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].total_hours2}}</div>
      </div>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Press No-3</td>
                  <td>
                    <div>
                    <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                      v-model="pressStationForm.start_time3"
                      :rules="[requiredRange('Start Time3')]"
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
                            <q-time v-model="pressStationForm.start_time3">
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
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].start_time3" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].start_time3}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].start_time3" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].start_time3}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                      v-model="pressStationForm.stop_time3"
                      :rules="[requiredRange('Stop Time3')]"
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
                            <q-time v-model="pressStationForm.stop_time3">
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
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].stop_time3" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].stop_time3}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].stop_time3" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].stop_time3}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.total_hours3"
                      :rules="[requiredRange('Total Hours3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].total_hours3" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].total_hours3}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].total_hours3" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].total_hours3}}</div>
      </div>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Press No-4</td>
                  <td>
                    <div>
                    <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                      v-model="pressStationForm.start_time4"
                      :rules="[requiredRange('Start Time4')]"
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
                            <q-time v-model="pressStationForm.start_time4">
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
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].start_time4" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].start_time4}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].start_time4" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].start_time4}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                      v-model="pressStationForm.stop_time4"
                      :rules="[requiredRange('Stop Time4')]"
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
                            <q-time v-model="pressStationForm.stop_time4">
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
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].stop_time4" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].stop_time4}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].stop_time4" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].stop_time4}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.total_hours4"
                      :rules="[requiredRange('Total Hours4')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].total_hours4" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].total_hours4}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].total_hours4" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].total_hours4}}</div>
      </div>
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Press No-5</td>
                  <td>
                    <div>
                    <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                      v-model="pressStationForm.start_time5"
                      :rules="[requiredRange('Start Time5')]"
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
                            <q-time v-model="pressStationForm.start_time5">
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
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].start_time5" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].start_time5}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].start_time5" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].start_time5}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                      v-model="pressStationForm.stop_time5"
                      :rules="[requiredRange('Stop Time5')]"
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
                            <q-time v-model="pressStationForm.stop_time5">
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
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].stop_time5" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].stop_time5}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].stop_time5" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].stop_time5}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.total_hours5"
                      :rules="[requiredRange('Total Hours5')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].total_hours5" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].total_hours5}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].total_hours5" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].total_hours5}}</div>
      </div>
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Press No-6</td>
                  <td>
                    <div>
                    <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                      v-model="pressStationForm.start_time6"
                      :rules="[requiredRange('Start Time6')]"
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
                            <q-time v-model="pressStationForm.start_time6">
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
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].start_time6" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].start_time6}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].start_time6" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].start_time6}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      class="TwoTimeInpts"
                      label="Time in"
                      dense
                      outlined
                      v-model="pressStationForm.stop_time6"
                      :rules="[requiredRange('Stop Time6')]"
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
                            <q-time v-model="pressStationForm.stop_time6">
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
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].stop_time6" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].stop_time6}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].stop_time6" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].stop_time6}}</div>
      </div>
                  </td>
                  <td>
                    <div>
                    <q-input
                      dense
                      v-model="pressStationForm.total_hours6"
                      :rules="[requiredRange('Total Hours6')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].total_hours6" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].total_hours6}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].total_hours6" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].total_hours6}}</div>
      </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="subtitle" style="margin-top: 0px">
          <p class="text-center q-mt-sm">BREAK DOWN DETAILS</p>
        </div>

        <div class="flex flex-center">
          <div class="input-feilds q-mt-md">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th colspan="2">Break down hours</th>
                  <th rowspan="2">Reason / Rectification</th>
                </tr>
                <tr>
                  <th>From</th>
                  <th>To</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="pressStationForm.break_down_hours_from"
                      :rules="[requiredRange('Break Down Hours From')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].break_down_hours_from" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].break_down_hours_from}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].break_down_hours_from" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].break_down_hours_from}}</div>
      </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="pressStationForm.break_down_hours_to"
                      :rules="[requiredRange('Break Down Hours To')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].break_down_hours_to" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].break_down_hours_to}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].break_down_hours_to" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].break_down_hours_to}}</div>
      </div>
                  </td>
                  <td>
                    <textarea
                      v-model="pressStationForm.reason_or_rectification"
                    >
                    </textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="input-feilds q-mt-md">
          <span class="input-text" style="width: 100px">Remarks : </span
          >
          <div style="width: 70%; margin-left: 28px">
          <q-input 
            outlined
            dense
            v-model="pressStationForm.remarks"
            type="textarea"
            float-label="Textarea"
            :max-height="10"
            :min-rows="2"
          />
          <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 0 && todayCompletedShiftDetailsOfPressStaionLog[0].remarks" class="text-orange">{{ this.todayCompletedShiftDetailsOfPressStaionLog[0].remarks}}</div>
        <div v-if="todayCompletedShiftDetailsOfPressStaionLog.length > 1 && todayCompletedShiftDetailsOfPressStaionLog[1].remarks" class="text-blue">{{ this.todayCompletedShiftDetailsOfPressStaionLog[1].remarks}}</div>
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
  name: "PressStationLog",
  data() {
    return {
      ...validations,
      shift: "",
      date: "",
      options: ["Shift 1", "Shift 2", "Shift 3"],
      time: new Date().toLocaleTimeString(),
      pressStationForm: {
        date: date.formatDate(Date.now(), "YYYY/MM/DD"),
        dateTime: "",
        sfb_conveyor1: "",
        sfb_conveyor2: "",
        strip_no1: "",
        strip_no2: "",
        strip_no3: "",
        fruit_elevator1: "",
        fruit_elevator2: "",
        fruit_elevator3: "",
        digestor_temp1: "",
        digestor_amps1: "",
        press_no_temp1: "",
        press_no_hydraulic_pressure1: "",
        digestor_temp2: "",
        digestor_amps2: "",
        press_no_temp2: "",
        press_no_hydraulic_pressure2: "",
        digestor_temp3: "",
        digestor_amps3: "",
        press_no_temp3: "",
        press_no_hydraulic_pressure3: "",
        digestor_temp4: "",
        digestor_amps4: "",
        press_no_temp4: "",
        press_no_hydraulic_pressure4: "",
        digestor_temp5: "",
        digestor_amps5: "",
        press_no_temp5: "",
        press_no_hydraulic_pressure5: "",
        digestor_temp6: "",
        digestor_amps6: "",
        press_no_temp6: "",
        press_no_hydraulic_pressure6: "",
        cake_breake_conveyor_no1_amps: "",
        cake_breake_conveyor_no2_amps: "",
        total_ffb_cages_or_qty_processed: "",
        start_time1: "",
        stop_time1: "",
        total_hours1: "",
        start_time2: "",
        stop_time2: "",
        total_hours2: "",
        start_time3: "",
        stop_time3: "",
        total_hours3: "",
        start_time4: "",
        stop_time4: "",
        total_hours4: "",
        start_time5: "",
        stop_time5: "",
        total_hours5: "",
        start_time6: "",
        stop_time6: "",
        total_hours6: "",
        break_down_hours_from: "",
        break_down_hours_to: "",
        reason_or_rectification: "",
        remarks: "",
      },
      todayCompletedShiftDetailsOfPressStaionLog:[],
    };
  },
  created() {},
  mounted() {
    this.startClock();
    this.getTodayCompletedShiftDetails();
  },
  methods: {
    ...mapActions("indexedDb", ["initDB"]),
    ...mapActions("indexedDb", ["syncPressStationFormData"]),
    ...mapActions("indexedDb", ["clearPressStationFormIndexedDB"]),

    showTimePicker() {
      this.$refs.timePopup.show();
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
      this.pressStationForm.dateTime = this.getCurrentTime(); // Set initial time
      setInterval(() => {
        this.pressStationForm.dateTime = this.getCurrentTime(); // Update time every second
      }, 1000); // Update every 1 second
    },

    async PressStationLogOnSubmit() {
      let userDetailsData = JSON.parse(localStorage.getItem("userDetails"));

      const TotalPressStationLogDetails = {
        ...this.pressStationForm,
        ...userDetailsData,
      };
      console.log("TotalPressStationLogDetails ", TotalPressStationLogDetails);

      const validate = await this.$refs.boilForm.validate();
console.log("valdiate",validate)
      if (validate) {
        try {
          if (navigator.onLine === true) {
            const response = await fetch(
              "https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/pressStaionLogEntry.php",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(TotalPressStationLogDetails),
              }
            );

            const result = await response.json();
            console.log("1423",result)
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
              this.PressStationLogOnReset();
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
              this.PressStationLogOnReset();
            }
          } else {
            this.PressStationDataSaveToIndexedDB(TotalPressStationLogDetails);
          }
        } catch (error) {
          Notify.create({
            message: "Error while uploading",
            color: "negative", // optional: 'positive', 'negative', 'warning', 'info'
            position: "top", // optional: 'top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left', 'center'
            timeout: 2000, // optional: milliseconds, set to 0 to disable auto-close
            actions: [{ label: "Dismiss", color: "white", handler: () => {} }], // optional: actions to display in the notification
          });
          this.PressStationLogOnReset();
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
    PressStationLogOnReset() {
      this.pressStationForm.dateTime = "" ;
      this.pressStationForm.sfb_conveyor1 = "" ;
      this.pressStationForm.sfb_conveyor2 = "" ;
      this.pressStationForm.strip_no1 = "" ;
      this.pressStationForm.strip_no2 = "" ;
      this.pressStationForm.strip_no3 = "" ;
      this.pressStationForm.fruit_elevator1 = "" ;
      this.pressStationForm.fruit_elevator2 = "" ;
      this.pressStationForm.fruit_elevator3 = "" ;
      this.pressStationForm.digestor_temp1 = "" ;
      this.pressStationForm.digestor_amps1 = "" ;
      this.pressStationForm.press_no_temp1 = "" ;
      this.pressStationForm.press_no_hydraulic_pressure1 = "" ;
      this.pressStationForm.digestor_temp2 = "" ;
      this.pressStationForm.digestor_amps2 = "" ;
      this.pressStationForm.press_no_temp2 = "" ;
      this.pressStationForm.press_no_hydraulic_pressure2 = "" ;
      this.pressStationForm.digestor_temp3 = "" ;
      this.pressStationForm.digestor_amps3 = "" ;
      this.pressStationForm.press_no_temp3 = "" ;
      this.pressStationForm.press_no_hydraulic_pressure3 = "" ;
      this.pressStationForm.digestor_temp4 = "" ;
      this.pressStationForm.digestor_amps4 = "" ;
      this.pressStationForm.press_no_temp4 = "" ;
      this.pressStationForm.press_no_hydraulic_pressure4 = "" ;
      this.pressStationForm.digestor_temp5 = "" ;
      this.pressStationForm.digestor_amps5 = "" ;
      this.pressStationForm.press_no_temp5 = "" ;
      this.pressStationForm.press_no_hydraulic_pressure5 = "" ;
      this.pressStationForm.digestor_temp6 = "" ;
      this.pressStationForm.digestor_amps6 = "" ;
      this.pressStationForm.press_no_temp6 = "" ;
      this.pressStationForm.press_no_hydraulic_pressure6 = "" ;
      this.pressStationForm.cake_breake_conveyor_no1_amps = "" ;
      this.pressStationForm.cake_breake_conveyor_no2_amps = "" ;
      this.pressStationForm.total_ffb_cages_or_qty_processed = "" ;
      this.pressStationForm.start_time1 = "" ;
      this.pressStationForm.stop_time1 = "" ;
      this.pressStationForm.total_hours1 = "" ;
      this.pressStationForm.start_time2 = "" ;
      this.pressStationForm.stop_time2 = "" ;
      this.pressStationForm.total_hours2 = "" ;
      this.pressStationForm.start_time3 = "" ;
      this.pressStationForm.stop_time3 = "" ;
      this.pressStationForm.total_hours3 = "" ;
      this.pressStationForm.start_time4 = "" ;
      this.pressStationForm.stop_time4 = "" ;
      this.pressStationForm.total_hours4 = "" ;
      this.pressStationForm.start_time5 = "" ;
      this.pressStationForm.stop_time5 = "" ;
      this.pressStationForm.total_hours5 = "" ;
      this.pressStationForm.start_time6 = "" ;
      this.pressStationForm.stop_time6 = "" ;
      this.pressStationForm.total_hours6 = "" ;
      this.pressStationForm.break_down_hours_from = "" ;
      this.pressStationForm.break_down_hours_to = "" ;
      this.pressStationForm.reason_or_rectification = "";
      this.pressStationForm.remarks = "";
    },

    // sync process methods

    PressStationDataSaveToIndexedDB(data) {
      const transactionPressStation = this.db.transaction(
        ["PressStationFormData"],
        "readwrite"
      );
      const objectStore = transactionPressStation.objectStore(
        "PressStationFormData"
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
      this.syncPressStationFormData();
    },


    // completed Shift details 

    async getTodayCompletedShiftDetails(){
console.log("1578")
      let user=JSON.parse(localStorage.getItem('userDetails'))

      const response=await fetch(`https://sedotsgroup.com/pflipalmdev/web-services/MillOperations//pressStaionLogReportDataForTheDay.php?date=${this.date}&plant_code=${user.plant_code}&state_code=${user.state_code}`)

      const responseDataArray= await response.json();
      console.log("1584",responseDataArray)
this.todayCompletedShiftDetailsOfPressStaionLog = responseDataArray;
console.log("1585",this.todayCompletedShiftDetailsOfPressStaionLog)

    }
  },
};
</script>
