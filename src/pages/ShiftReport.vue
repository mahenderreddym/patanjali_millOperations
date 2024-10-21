<template>
  <q-page>
    <div class="title">
      <h4 class="text-center q-bold" style="position: relative">
        Shift Report
        <q-icon
          name="sync"
          size="lg"
          class="absolute-right"
          style="border: 1px solid green; background-color: #dafdba"
          @click="syncShiftData()"
        />
      </h4>
    </div>
    <div class="container">
      <q-form class="SrFm" ref="shifForm">
        <div class="split-container">
          <div class="left-container">
            <div class="input-feilds">
              <span class="input-text input-text-bl-frm">Date : </span
              >
              <div style="width: 55%">
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
              <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].date" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].date}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].date" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].date}}</div>
            </div>
              
            </div>
            <div class="input-feilds">
              <span class="input-text input-text-bl-frm">Unit : </span
              >
              <div style="width: 55%; margin-bottom: 20px">
              <q-select
                outlined
                dense
                style="width: 55%; margin-bottom: 20px"
                v-model="unit"
                :options="unit_options"
                label="Unit"
                :rules="[required('unit')]"
              />
              <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].date" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].date}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].date" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].date}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text input-text-bl-frm">Shift : </span
              >
              <div  style="width: 55%; margin-bottom: 20px">
              <q-input
                outlined
                dense
                readonly
                v-model="shift"
                label="Shift"
                :rules="[required('shift')]"
              />
              <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].shift" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].shift}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].shift" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].shift}}</div>
            </div>
            </div>
          </div>
          <div class="line-tr"></div>
          <div class="right-container">
            <div class="input-feilds">
              <span
                class="input-text input-text-bl-frm q-ml-md"
                style="width: 198px"
                >No. of Batches Sterilized : </span
              >
              <div  style="width: 38%">
              <q-input
                dense
                v-model="no_of_batches_sterilized"
                type="number"
                outlined
                label="input"
                :rules="[requiredRange('no of sterilized')]"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].no_of_batches_sterilized" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].no_of_batches_sterilized}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].no_of_batches_sterilized" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].no_of_batches_sterilized}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span
                class="input-text input-text-bl-frm q-ml-md"
                style="width: 198px"
                >No. of Cages Processed : </span
              >
              <div  style="width: 38%">
              <q-input
                dense
                v-model="no_of_cages_processed"
                :rules="[requiredRange('no of cages')]"
                type="text"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].no_of_cages_processed" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].no_of_cages_processed}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].no_of_cages_processed" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].no_of_cages_processed}}</div>
            </div>
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
              >
              <div  style="width: 30%">
              <q-input
                dense
                v-model="press_running_hrs_press1"
                :rules="[requiredRange('Press-1')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].press_running_hrs_press1" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].press_running_hrs_press1}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].press_running_hrs_press1" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].press_running_hrs_press1}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text Srinput">Press-2 : </span
              >
              <div  style="width: 30%">
              <q-input
                dense
                v-model="press_running_hrs_press2"
                :rules="[requiredRange('Press-2')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].press_running_hrs_press2" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].press_running_hrs_press2}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].press_running_hrs_press2" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].press_running_hrs_press2}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text Srinput">Press-3 : </span
              >
              <div  style="width: 30%">
              <q-input
                dense
                v-model="press_running_hrs_press3"
                :rules="[requiredRange('Press-3')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].press_running_hrs_press3" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].press_running_hrs_press3}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].press_running_hrs_press3" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].press_running_hrs_press3}}</div>
            </div>
            </div>
          </div>
          <div class="line-tr q-mt-sm"></div>
          <div class="right-container">
            <div class="input-feilds q-mt-sm">
              <span class="input-text Srinput">Press-4 : </span
              >
              <div  style="width: 30%">
              <q-input
                dense
                v-model="press_running_hrs_press4"
                :rules="[requiredRange('Press-4')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].press_running_hrs_press4" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].press_running_hrs_press4}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].press_running_hrs_press4" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].press_running_hrs_press4}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span class="input-text Srinput">Total Hours : </span
              >
              <div  style="width: 30%">
              <q-input
                dense
                v-model="press_running_total_hrs"
                :rules="[requiredRange('Total Hours')]"
                type="number"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].press_running_total_hrs" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].press_running_total_hrs}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].press_running_total_hrs" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].press_running_total_hrs}}</div>
            </div>
            </div>
          </div>
        </div>
        <div class="subtitle" style="margin-top: 20px">
          <p class="text-center q-mt-sm">EFB Section Running Hours</p>
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
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="efb_shd1"
                      :rules="[requiredRange('efb shd1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].efb_shd1" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].efb_shd1}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].efb_shd1" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].efb_shd1}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="efb_shd2"
                      :rules="[requiredRange('efb shd2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].efb_shd2" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].efb_shd2}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].efb_shd2" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].efb_shd2}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="efb_shd3"
                      :rules="[requiredRange('efb shd3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].efb_shd3" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].efb_shd3}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].efb_shd3" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].efb_shd3}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="efb_shd4"
                      :rules="[requiredRange('efb shd4')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].efb_shd4" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].efb_shd4}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].efb_shd4" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].efb_shd4}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="efb_shd_total_hrs"
                      :rules="[requiredRange('efb shd total hrs')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].efb_shd_total_hrs" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].efb_shd_total_hrs}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].efb_shd_total_hrs" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].efb_shd_total_hrs}}</div>
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
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="efb_prs1"
                      :rules="[requiredRange('efb_prs1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].efb_prs1" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].efb_prs1}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].efb_prs1" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].efb_prs1}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="efb_prs2"
                      :rules="[requiredRange('efb_prs2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].efb_prs2" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].efb_prs2}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].efb_prs2" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].efb_prs2}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="efb_prs3"
                      :rules="[requiredRange('efb press3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].efb_prs3" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].efb_prs3}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].efb_prs3" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].efb_prs3}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="efb_prs4"
                      :rules="[requiredRange('efb prs4')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                      
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].efb_prs4" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].efb_prs4}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].efb_prs4" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].efb_prs4}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="efb_prs_total_hrs"
                      :rules="[requiredRange('efb prs total hrs')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].efb_prs_total_hrs" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].efb_prs_total_hrs}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].efb_prs_total_hrs" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].efb_prs_total_hrs}}</div>
            </div>
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
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="decanter1"
                      :rules="[requiredRange('decanter1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].decanter1" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].decanter1}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].decanter1" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].decanter1}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="decanter2"
                      :rules="[requiredRange('decanter2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].decanter2" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].decanter2}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].decanter2" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].decanter2}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="decanter3"
                      :rules="[requiredRange('decanter3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].decanter3" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].decanter3}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].decanter3" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].decanter3}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width: 100px">
                    <q-input
                      dense
                      v-model="total_hrs_decanter"
                      :rules="[requiredRange('total hrs decanter')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].total_hrs_decanter" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].total_hrs_decanter}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].total_hrs_decanter" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].total_hrs_decanter}}</div>
            </div>
                  </td>
                  <!-- <td>
                    <q-input
                      style="width: 100px"
                      dense
                      v-model="LP"
                      :rules="[
                        requiredRange(''),
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
                    <div style="width:100px">
                    <q-input
                      dense
                      v-model="nozzle_centrifuge_1"
                      :rules="[requiredRange('nozzle centrifuge1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].nozzle_centrifuge_1" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].nozzle_centrifuge_1}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].nozzle_centrifuge_1" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].nozzle_centrifuge_1}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px">
                    <q-input
                      dense
                      v-model="nozzle_centrifuge_2"
                      :rules="[requiredRange('nozzle centrifuge2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].nozzle_centrifuge_2" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].nozzle_centrifuge_2}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].nozzle_centrifuge_2" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].nozzle_centrifuge_2}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px">
                    <q-input
                      dense
                      v-model="nozzle_centrifuge_3"
                      :rules="[requiredRange('nozzle centrifuge3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].nozzle_centrifuge_3" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].nozzle_centrifuge_3}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].nozzle_centrifuge_3" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].nozzle_centrifuge_3}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px">
                    <q-input
                      dense
                      v-model="nozzle_centrifuge_4"
                      :rules="[requiredRange('nozzle centrifuge4')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].nozzle_centrifuge_4" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].nozzle_centrifuge_4}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].nozzle_centrifuge_4" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].nozzle_centrifuge_4}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px">
                    <q-input
                      dense
                      v-model="total_hrs_nozzle_centrifuge"
                      :rules="[requiredRange('total hrs nozzle centrifuge')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].total_hrs_nozzle_centrifuge" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].total_hrs_nozzle_centrifuge}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].total_hrs_nozzle_centrifuge" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].total_hrs_nozzle_centrifuge}}</div>
            </div>
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
                    <div style="width:100px">
                    <q-input
                      dense
                      v-model="cpo_flow_meter_opening"
                      :rules="[requiredRange('cpo flow meter opening')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].cpo_flow_meter_opening" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].cpo_flow_meter_opening}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].cpo_flow_meter_opening" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].cpo_flow_meter_opening}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px">
                    <q-input
                      dense
                      v-model="cpo_flow_meter_closing"
                      :rules="[requiredRange('cpo flow meter closing')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].cpo_flow_meter_closing" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].cpo_flow_meter_closing}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].cpo_flow_meter_closing" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].cpo_flow_meter_closing}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px">
                    <q-input
                      dense
                      v-model="cpo_flow_meter_total_qty"
                      :rules="[requiredRange('cpo flow meter total qty')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].cpo_flow_meter_total_qty" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].cpo_flow_meter_total_qty}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].cpo_flow_meter_total_qty" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].cpo_flow_meter_total_qty}}</div>
            </div>
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
                    <div style="width:100px">
                    <q-input
                      dense
                      v-model="cpo_flow_meter_wel_oil"
                      :rules="[requiredRange('cpo flow meter wel oil')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].cpo_flow_meter_wel_oil" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].cpo_flow_meter_wel_oil}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].cpo_flow_meter_wel_oil" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].cpo_flow_meter_wel_oil}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px">
                    <q-input
                      dense
                      v-model="cpo_flow_meter_sludge"
                      :rules="[requiredRange('cpo flow meter sludge')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].cpo_flow_meter_sludge" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].cpo_flow_meter_sludge}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].cpo_flow_meter_sludge" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].cpo_flow_meter_sludge}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px">
                    <q-input
                      dense
                      v-model="cpo_flow_meter_oer"
                      :rules="[requiredRange('cpo flow meter oer')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].cpo_flow_meter_oer" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].cpo_flow_meter_oer}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].cpo_flow_meter_oer" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].date}}</div>
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
                    <div style="width:100px">
                    <q-input
                      dense
                      v-model="kernel_hrs_silo1"
                      :rules="[requiredRange('kernel hrs silo1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].kernel_hrs_silo1" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].kernel_hrs_silo1}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].kernel_hrs_silo1" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].kernel_hrs_silo1}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px">
                    <q-input
                      dense
                      v-model="kernel_hrs_silo2"
                      :rules="[requiredRange('kernel hrs silo2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].kernel_hrs_silo2" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].kernel_hrs_silo2}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].kernel_hrs_silo2" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].kernel_hrs_silo2}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px">
                    <q-input
                      dense
                      v-model="kernel_hrs_silo3"
                      :rules="[requiredRange('Kernel hrs silo3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].kernel_hrs_silo3" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].kernel_hrs_silo3}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].kernel_hrs_silo3" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].kernel_hrs_silo3}}</div>
            </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="input-feilds q-mt-md q-mr-sm">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th colspan="7">Eepellers Section Running Hrs.</th>
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
                    <div style="width:70px">
                    <q-input
                      dense
                      v-model="esrh_a1"
                      :rules="[requiredRange('esrh a1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].esrh_a1" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].esrh_a1}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].esrh_a1" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].esrh_a1}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:90px" >
                    <q-input
                      dense
                      v-model="esrh_a2"
                      :rules="[requiredRange('esrh a2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].esrh_a2" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].esrh_a2}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].esrh_a2" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].esrh_a2}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:90px" >
                    <q-input
                      dense
                      v-model="esrh_a3"
                      :rules="[requiredRange('esrh a3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].esrh_a3" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].esrh_a3}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].esrh_a3" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].esrh_a3}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:90px" >
                    <q-input
                      dense
                      v-model="esrh_a4"
                      :rules="[requiredRange('esrh a4')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].esrh_a4" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].esrh_a4}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].esrh_a4" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].esrh_a4}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:90px" >
                    <q-input
                      dense
                      v-model="esrh_a5"
                      :rules="[requiredRange('esrh a5')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].esrh_a5" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].esrh_a5}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].esrh_a5" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].esrh_a5}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:90px" >
                    <q-input
                      dense
                      v-model="esrh_a6"
                      :rules="[requiredRange('esrh a6')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].esrh_a6" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].esrh_a6}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].esrh_a6" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].esrh_a6}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:90px" >
                    <q-input
                      dense
                      v-model="total_esrh_a_epellers"
                      :rules="[requiredRange('total esrh a epellers')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].total_esrh_a_epellers" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].total_esrh_a_epellers}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].total_esrh_a_epellers" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].total_esrh_a_epellers}}</div>
            </div>
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
                    <div style="width:80px" >
                    <q-input
                      dense
                      v-model="esrh_b1"
                      :rules="[requiredRange('esrh b1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].esrh_b1" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].esrh_b1}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].esrh_b1" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].esrh_b1}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:80px" >
                    <q-input
                      dense
                      v-model="esrh_b2"
                      :rules="[requiredRange('esrh b2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].esrh_b2" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].esrh_b2}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].esrh_b2" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].esrh_b2}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:80px" >
                    <q-input
                      dense
                      v-model="esrh_b3"
                      :rules="[requiredRange('esrh b3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].esrh_b3" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].esrh_b3}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].esrh_b3" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].esrh_b3}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:80px" >
                    <q-input
                      dense
                      v-model="esrh_b4"
                      :rules="[requiredRange('esrh b4')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].esrh_b4" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].esrh_b4}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].esrh_b4" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].esrh_b4}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:80px" >
                    <q-input
                      dense
                      v-model="esrh_b5"
                      :rules="[requiredRange('esrh b5')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                      
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].esrh_b5" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].esrh_b5}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].esrh_b5" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].esrh_b5}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:80px" >
                    <q-input
                      dense
                      v-model="esrh_b6"
                      :rules="[requiredRange('esrh b6')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].esrh_b6" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].esrh_b6}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].esrh_b6" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].esrh_b6}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:80px" >
                    <q-input
                      dense
                      v-model="total_hrs_b_epellers"
                      :rules="[requiredRange('total hrs b epellers')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].total_hrs_b_epellers" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].total_hrs_b_epellers}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].total_hrs_b_epellers" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].total_hrs_b_epellers}}</div>
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
                    <div style="width:100px" >
                    <q-input
                      dense
                      v-model="cpko_opening"
                      :rules="[requiredRange('cpko opening')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].cpko_opening" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].cpko_opening}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].cpko_opening" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].cpko_opening}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px" >
                    <q-input
                      dense
                      v-model="cpko_closing"
                      :rules="[requiredRange('cpko closing')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].cpko_closing" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].cpko_closing}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].cpko_closing" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].cpko_closing}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px" >
                    <q-input
                      dense
                      v-model="cpko_total_qty"
                      :rules="[requiredRange('cpko total qty')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].cpko_total_qty" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].cpko_total_qty}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].cpko_total_qty" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].cpko_total_qty}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px" >
                    <q-input
                      dense
                      v-model="cpko_oer"
                      :rules="[requiredRange('cpko oer')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].cpko_oer" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].cpko_oer}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].cpko_oer" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].cpko_oer}}</div>
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
                  <th>DOC bags Filling</th>
                  <th>DOC Stock</th>
                  <th>Dispatches</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div style="width:100px" >
                    <q-input
                      dense
                      v-model="cpko_doc_bags_filling"
                      :rules="[requiredRange('cpko doc bags filling')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].cpko_doc_bags_filling" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].cpko_doc_bags_filling}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].cpko_doc_bags_filling" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].cpko_doc_bags_filling}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px" >
                    <q-input
                      dense
                      v-model="cpko_doc_stock"
                      :rules="[requiredRange('cpko doc stock')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].cpko_doc_stock" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].cpko_doc_stock}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].cpko_doc_stock" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].cpko_doc_stock}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px" >
                    <q-input
                      dense
                      v-model="cpko_dispatches"
                      :rules="[requiredRange('cpko dispatches')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].cpko_dispatches" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].cpko_dispatches}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].cpko_dispatches" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].cpko_dispatches}}</div>
            </div>
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
                    <div style="width:100px" >
                    <q-input
                      dense
                      v-model="ffb_ramp"
                      :rules="[requiredRange('ffb ramp')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].ffb_ramp" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].ffb_ramp}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].ffb_ramp" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].ffb_ramp}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px" >
                    <q-input
                      dense
                      v-model="ffb_cages"
                      :rules="[requiredRange('ffb cages')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].ffb_cages" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].ffb_cages}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].ffb_cages" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].ffb_cages}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px" >
                    <q-input
                      dense
                      v-model="ster_ffb"
                      :rules="[requiredRange('ster ffb')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].ster_ffb" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].ster_ffb}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].ster_ffb" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].ster_ffb}}</div>
            </div>
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
                    <div style="width:100px" >
                    <q-input
                      dense
                      v-model="stenlizer1"
                      :rules="[requiredRange('stenlizer1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].stenlizer1" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].stenlizer1}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].stenlizer1" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].stenlizer1}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px" >
                    <q-input
                      dense
                      v-model="stenlizer2"
                      :rules="[requiredRange('stenlizer2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].stenlizer2" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].stenlizer2}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].stenlizer2" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].stenlizer2}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px" >
                    <q-input
                      dense
                      v-model="stenlizer3"
                      :rules="[requiredRange('stenlizer3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].stenlizer3" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].stenlizer3}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].stenlizer3" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].stenlizer3}}</div>
            </div>
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
                    <div style="width:100px" >
                    <q-input
                      dense
                      v-model="pending_vehicles"
                      :rules="[requiredRange('pending vehicles')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].pending_vehicles" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].pending_vehicles}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].pending_vehicles" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].pending_vehicles}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px" >
                    <q-input
                      dense
                      v-model="shift_unloading_qty"
                      :rules="[requiredRange('shift unloading qty')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].shift_unloading_qty" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].shift_unloading_qty}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].shift_unloading_qty" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].shift_unloading_qty}}</div>
            </div>
                  </td>
                  <td>
                    <div style="width:100px" >
                    <q-input
                      dense
                      v-model="weak_total_ffb"
                      :rules="[requiredRange('weak total ffb')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                    <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].weak_total_ffb" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].weak_total_ffb}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].weak_total_ffb" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].weak_total_ffb}}</div>
            </div>
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
              >
              <div style="width: 38%" >
              <q-input
                dense
                v-model="boiler_running_hrs"
                :rules="[requiredRange('boiler running hrs')]"
                type="text"
                outlined
                label="Input"
                style="width: 38%"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].boiler_running_hrs" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].boiler_running_hrs}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].boiler_running_hrs" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].boiler_running_hrs}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span
                class="input-text input-text-bl-frm q-ml-md"
                style="width: 198px"
                >Feed Water Cons : </span
              >
              <div style="width: 38%" >
              <q-input
                dense
                v-model="feed_water_cans"
                :rules="[requiredRange('Feed Water Cons')]"
                type="text"
                outlined
                label="Input"
                style="width: 38%"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].feed_water_cans" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].feed_water_cans}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].feed_water_cans" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].feed_water_cans}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span
                class="input-text input-text-bl-frm q-ml-md"
                style="width: 198px"
                >Steam Cone : </span
              >
              <div style="width: 38%" >
              <q-input
                dense
                v-model="steam_cone"
                :rules="[requiredRange('Steam Cone')]"
                type="text"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].steam_cone" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].steam_cone}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].steam_cone" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].steam_cone}}</div>
            </div>
            </div>
          </div>
          <div class="line-tr"></div>
          <div class="right-container">
            <div class="input-feilds">
              <span
                class="input-text input-text-bl-frm q-ml-md"
                style="width: 198px"
                >Feed Water Stock : </span
              >
              <div style="width: 38%" >
              <q-input
                dense
                v-model="feed_water_stock"
                :rules="[requiredRange('Feed Water Stock')]"
                type="number"
                outlined
                label="input"
                style="width: 38%"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].feed_water_stock" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].feed_water_stock}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].feed_water_stock" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].feed_water_stock}}</div>
            </div>
            </div>
            <div class="input-feilds">
              <span
                class="input-text input-text-bl-frm q-ml-md"
                style="width: 198px"
                >T.G Running Hours : </span
              >
              <div style="width: 38%" >
              <q-input
                dense
                v-model="tg_running_hrs"
                :rules="[requiredRange('tg running hrs')]"
                type="text"
                outlined
                label="Input"
                :min="0"
              />
              <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].tg_running_hrs" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].tg_running_hrs}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].tg_running_hrs" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].tg_running_hrs}}</div>
            </div>
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
            v-model="remarks"
            type="textarea"
            float-label="Textarea"
            :max-height="10"
            :min-rows="2"
            
          />
          <div v-if="todayShiftDetailsOfShiftForm.length >0  && todayShiftDetailsOfShiftForm[0].remarks" class="text-orange">{{ this.todayShiftDetailsOfShiftForm[0].remarks}}</div>
        <div v-if="todayShiftDetailsOfShiftForm.length > 1  && todayShiftDetailsOfShiftForm[1].remarks" class="text-blue">{{ this.todayShiftDetailsOfShiftForm[1].remarks}}</div>
            </div>
        </div>
        <div class="btns">
          <q-btn
            style="margin-left: -80px"
            class="q-pa-sm"
            color="primary"
            label="Submit"
            @click="ShiftReportOnSubmit"
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
</template>
<script>
import { Notify, date } from "quasar";
import validations from "../helpers/validations";
import axios from "axios";
import ApiEndPoint from "src/boot/axios";
import { mapActions } from "vuex";

export default {
  name: "ShiftReport",
  data() {
    return {
      ...validations,
      date: date.formatDate(Date.now(), "YYYY/MM/DD"),
      unit: "",
      shift_options: ["Shift A", "Shift B", "Shift C"],
      unit_options: ["I", "II"],
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
      UserInfo: {},
      todayShiftDetailsOfShiftForm:[],
    };
  },
  created() {
    this.UserInfo = this.GetUserInfo();
    this.initDB().then((db) => {
      this.db = db;
    });
  },
  mounted() {
    this.getTodayShiftDetailsOfShiftForm()
  },
  computed:{
shift(){
  return this.shift_options[this.todayShiftDetailsOfShiftForm.length]
}
  },
  methods: {
    ...mapActions("indexedDb", ["initDB"]),
    ...mapActions("indexedDb", ["syncShiftFormData"]),
    ...mapActions("indexedDb", ["clearShiftFormIndexedDB"]),

    async getTodayShiftDetailsOfShiftForm(){
      let user=JSON.parse(localStorage.getItem('userDetails'))

      // console.log("1366",`https://sedotsgroup.com/pflipalmdev/web-services/MillOperations//shiftLogReportDataForTheDay.php?date=${this.date}&plant_code=${user.plant_code}&state_code=${user.state_code}`)
      const response = await fetch(`https://sedotsgroup.com/pflipalmdev/web-services/MillOperations//shiftLogReportDataForTheDay.php?date=${this.date}&plant_code=${user.plant_code}&state_code=${user.state_code}`,
        {
          method:"POST"
        }
      )

      console.log("4243",response)
      const responsedDataArray= await response.json();
      console.log('1370',responsedDataArray)
      this.todayShiftDetailsOfShiftForm= responsedDataArray;
      console.log("1373",this.todayShiftDetailsOfShiftForm)
    },

    async ShiftReportOnSubmit() {
      const ShiftReportLogDetails = {
        date: this.date,
        unit: this.unit,
        shift: this.shift,
        no_of_batches_sterilized: this.no_of_batches_sterilized,
        no_of_cages_processed: this.no_of_cages_processed,
        press_running_hrs_press1: this.press_running_hrs_press1,
        press_running_hrs_press2: this.press_running_hrs_press2,
        press_running_hrs_press3: this.press_running_hrs_press3,
        press_running_hrs_press4: this.press_running_hrs_press4,
        press_running_total_hrs: this.press_running_total_hrs,
        efb_shd1: this.efb_shd1,
        efb_shd2: this.efb_shd2,
        efb_shd3: this.efb_shd3,
        efb_shd4: this.efb_shd4,
        efb_shd_total_hrs: this.efb_shd_total_hrs,
        efb_prs1: this.efb_prs1,
        efb_prs2: this.efb_prs2,
        efb_prs3: this.efb_prs3,
        efb_prs4: this.efb_prs4,
        efb_prs_total_hrs: this.efb_prs_total_hrs,
        decanter1: this.decanter1,
        decanter2: this.decanter2,
        decanter3: this.decanter3,
        total_hrs_decanter: this.total_hrs_decanter,
        nozzle_centrifuge_1: this.nozzle_centrifuge_1,
        nozzle_centrifuge_2: this.nozzle_centrifuge_2,
        nozzle_centrifuge_3: this.nozzle_centrifuge_3,
        nozzle_centrifuge_4: this.nozzle_centrifuge_4,
        total_hrs_nozzle_centrifuge: this.total_hrs_nozzle_centrifuge,
        cpo_flow_meter_opening: this.cpo_flow_meter_opening,
        cpo_flow_meter_closing: this.cpo_flow_meter_closing,
        cpo_flow_meter_total_qty: this.cpo_flow_meter_total_qty,
        cpo_flow_meter_wel_oil: this.cpo_flow_meter_wel_oil,
        cpo_flow_meter_sludge: this.cpo_flow_meter_sludge,
        cpo_flow_meter_oer: this.cpo_flow_meter_oer,
        kernel_hrs_silo1: this.kernel_hrs_silo1,
        kernel_hrs_silo2: this.kernel_hrs_silo2,
        kernel_hrs_silo3: this.kernel_hrs_silo3,
        esrh_a1: this.esrh_a1,
        esrh_a2: this.esrh_a2,
        esrh_a3: this.esrh_a3,
        esrh_a4: this.esrh_a4,
        esrh_a5: this.esrh_a5,
        esrh_a6: this.esrh_a6,
        total_esrh_a_epellers: this.total_esrh_a_epellers,
        esrh_b1: this.esrh_b1,
        esrh_b2: this.esrh_b2,
        esrh_b3: this.esrh_b3,
        esrh_b4: this.esrh_b4,
        esrh_b5: this.esrh_b5,
        esrh_b6: this.esrh_b6,
        total_hrs_b_epellers: this.total_hrs_b_epellers,
        cpko_opening: this.cpko_opening,
        cpko_closing: this.cpko_closing,
        cpko_total_qty: this.cpko_total_qty,
        cpko_oer: this.cpko_oer,
        cpko_doc_bags_filling: this.cpko_doc_bags_filling,
        cpko_doc_stock: this.cpko_doc_stock,
        cpko_dispatches: this.cpko_dispatches,
        ffb_ramp: this.ffb_ramp,
        ffb_cages: this.ffb_cages,
        ster_ffb: this.ster_ffb,
        stenlizer1: this.stenlizer1,
        stenlizer2: this.stenlizer2,
        stenlizer3: this.stenlizer3,
        pending_vehicles: this.pending_vehicles,
        shift_unloading_qty: this.shift_unloading_qty,
        weak_total_ffb: this.weak_total_ffb,
        boiler_running_hrs: this.boiler_running_hrs,
        feed_water_cans: this.feed_water_cans,
        steam_cone: this.steam_cone,
        feed_water_stock: this.feed_water_stock,
        tg_running_hrs: this.tg_running_hrs,
        remarks: this.remarks,
      };

      const user = JSON.parse(localStorage.getItem("userDetails"));
      const TotalShiftReportLogDetails = {
        ...ShiftReportLogDetails,
        ...user,
      };

      const validate = await this.$refs.shifForm.validate();

      if (validate) {
        try {
          if (navigator.onLine === true) {
            const response = await fetch(
              "https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/shiftLogEntry.php",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(TotalShiftReportLogDetails),
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
              this.ShiftReportOnReset();
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
              this.ShiftReportOnReset();
            }
          } else {
            this.shiftDataSaveToIndexedDB(TotalShiftReportLogDetails);
          }
        } catch (error) {
          Notify.create({
            message: "Error while uploading",
            color: "negative", // optional: 'positive', 'negative', 'warning', 'info'
            position: "top", // optional: 'top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left', 'center'
            timeout: 2000, // optional: milliseconds, set to 0 to disable auto-close
            actions: [{ label: "Dismiss", color: "white", handler: () => {} }], // optional: actions to display in the notification
          });
          this.ShiftReportOnReset();
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
    ShiftReportOnReset() {
      this.unit = "";
      this.shift = "";
      this.no_of_batches_sterilized = "";
      this.no_of_cages_processed = "";
      this.press_running_hrs_press1 = "";
      this.press_running_hrs_press2 = "";
      this.press_running_hrs_press3 = "";
      this.press_running_hrs_press4 = "";
      this.press_running_total_hrs = "";
      this.efb_shd1 = "";
      this.efb_shd2 = "";
      this.efb_shd3 = "";
      this.efb_shd4 = "";
      this.efb_shd_total_hrs = "";
      this.efb_prs1 = "";
      this.efb_prs2 = "";
      this.efb_prs3 = "";
      this.efb_prs4 = "";
      this.efb_prs_total_hrs = "";
      this.decanter1 = "";
      this.decanter2 = "";
      this.decanter3 = "";
      this.total_hrs_decanter = "";
      this.nozzle_centrifuge_1 = "";
      this.nozzle_centrifuge_2 = "";
      this.nozzle_centrifuge_3 = "";
      this.nozzle_centrifuge_4 = "";
      this.total_hrs_nozzle_centrifuge = "";
      this.cpo_flow_meter_opening = "";
      this.cpo_flow_meter_closing = "";
      this.cpo_flow_meter_total_qty = "";
      this.cpo_flow_meter_wel_oil = "";
      this.cpo_flow_meter_sludge = "";
      this.cpo_flow_meter_oer = "";
      this.kernel_hrs_silo1 = "";
      this.kernel_hrs_silo2 = "";
      this.kernel_hrs_silo3 = "";
      this.esrh_a1 = "";
      this.esrh_a2 = "";
      this.esrh_a3 = "";
      this.esrh_a4 = "";
      this.esrh_a5 = "";
      this.esrh_a6 = "";
      this.total_esrh_a_epellers = "";
      this.esrh_b1 = "";
      this.esrh_b2 = "";
      this.esrh_b3 = "";
      this.esrh_b4 = "";
      this.esrh_b5 = "";
      this.esrh_b6 = "";
      this.total_hrs_b_epellers = "";
      this.cpko_opening = "";
      this.cpko_closing = "";
      this.cpko_total_qty = "";
      this.cpko_oer = "";
      this.cpko_doc_bags_filling = "";
      this.cpko_doc_stock = "";
      this.cpko_dispatches = "";
      this.ffb_ramp = "";
      this.ffb_cages = "";
      this.ster_ffb = "";
      this.stenlizer1 = "";
      this.stenlizer2 = "";
      this.stenlizer3 = "";
      this.pending_vehicles = "";
      this.shift_unloading_qty = "";
      this.weak_total_ffb = "";
      this.boiler_running_hrs = "";
      this.feed_water_cans = "";
      this.steam_cone = "";
      this.feed_water_stock = "";
      this.tg_running_hrs = "";
      this.remarks = "";
    },

    // sync process methods

    shiftDataSaveToIndexedDB(data) {
      const transactionShift = this.db.transaction(
        ["shiftFormData"],
        "readwrite"
      );
      const objectStore = transactionShift.objectStore("shiftFormData");
      objectStore.add(data);

      transactionShift.oncomplete = () => {
        Notify.create({
          message: "Data Synced Successfully",
          color: "positive",
          timeout: 2000,
          position: "top",
        });
      };

      transactionShift.onerror = (event) => {
        Notify.create({
          message: "Data Synced Failed Please Try Again",
          color: "negative",
          timeout: 2000,
          position: "top",
          actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
        });
      };

      this.ShiftReportOnReset();
    },

    async syncShiftData() {
      if (!this.db) {
        console.error("Database not initialized");
        await this.initDB();
      }
      this.syncShiftFormData();
    },
  },
};
</script>
<style></style>
