<template>
  <q-page>
    <div class="title">
      <h4 class="text-center q-bold" style="position: relative">
        Expeller Section Log Sheet
        <q-icon
          name="sync"
          size="lg"
          class="absolute-right"
          style="border: 1px solid green; background-color: #dafdba"
        />
      </h4>
    </div>
    <div class="container">
      <q-form class="BlFrm" ref="dataForm">
        <div class="split-container">
          <div class="left-container">
            <div class="input-feilds">
              <span class="input-text input-text-bl-frm">Date : </span
              ><q-input
                style="width: 55%"
                dense
                outlined
                v-model="expellerForm.date"
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
              ><q-select
                style="width: 55%"
                dense
                outlined
                :options="options"
                label='shift'
                v-model="expellerForm.shift"
                :rules="[required('shift')]"
              />
            </div>
          </div>
          <div class="line-tr"></div>
          <div class="right-container">
            <div class="input-feilds">
              <span class="input-text input-text-bl-frm">Time : </span>
              <q-input
                outlined
                dense
                style="width: 55%; margin-bottom: 20px"
                v-model="expellerForm.date_time"
                label="Time"
                :rules="[required('Time')]"
              >
              </q-input>
            </div>
          </div>
        </div>

        <!-- load in amps -->
        <div class="subtitle" style="margin-top: 20px">
          <p class="text-center q-mt-sm">Load in AMPS</p>
        </div>
        <div class="flex flex-center">
          <div class="input-feilds q-ml-sm q-mt-md q-mr-sm">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th>A1</th>
                  <th>A2</th>
                  <th>A3</th>
                  <th>A4</th>
                  <th>A5</th>
                  <th>A6</th>
                  <th>A7</th>
                  <th>A8</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.amps_a1"
                      :rules="[requiredRange('amps_a1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.amps_a2"
                      :rules="[requiredRange('amps_a2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.amps_a3"
                      :rules="[requiredRange('amps_a3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.amps_a4"
                      :rules="[requiredRange('amps_a4')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.amps_a5"
                      :rules="[requiredRange('amps_a5')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.amps_a6"
                      :rules="[requiredRange('amps_a6')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.amps_a7"
                      :rules="[requiredRange('amps_a7')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.amps_a8"
                      :rules="[requiredRange('amps_a8')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="input-feilds q-ml-sm q-mt-md q-mr-sm">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th>B1</th>
                  <th>B2</th>
                  <th>B3</th>
                  <th>B4</th>
                  <th>B5</th>
                  <th>B6</th>
                  <th>B7</th>
                  <th>B8</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.amps_b1"
                      :rules="[requiredRange('amps_b1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.amps_b2"
                      :rules="[requiredRange('amps_b2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.amps_b3"
                      :rules="[requiredRange('amps_b3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>

                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.amps_b4"
                      :rules="[requiredRange('amps_b4')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.amps_b5"
                      :rules="[requiredRange('amps_b5')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.amps_b6"
                      :rules="[requiredRange('amps_b6')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>

                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.amps_b7"
                      :rules="[requiredRange('amps_b7')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.amps_b8"
                      :rules="[requiredRange('amps_b8')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Expellers Running Hours-->
        <div class="subtitle" style="margin-top: 20px">
          <p class="text-center q-mt-sm">Expellers Running Hours</p>
        </div>
        <div class="flex flex-center">
          <!-- for A -->
          <div class="input-feilds q-ml-sm q-mt-md q-mr-sm">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>A1</th>
                  <th>A2</th>
                  <th>A3</th>
                  <th>A4</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p class="text-center fa-w">Opening</p>
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.opening_hours_a1"
                      :rules="[required('opening A1')]"
                      @click="showTimePicker('opening_hours_a1')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="opening_hours_a1"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.opening_hours_a1">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.opening_hours_a2"
                      :rules="[required('opening A2')]"
                      @click="showTimePicker('opening_hours_a2')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="opening_hours_a2"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.opening_hours_a2">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.opening_hours_a3"
                      :rules="[required('opening A3')]"
                      @click="showTimePicker('opening_hours_a3')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="opening_hours_a3"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.opening_hours_a3">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.opening_hours_a4"
                      :rules="[required('opening A4')]"
                       @click="showTimePicker('opening_hours_a4')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="opening_hours_a4"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.opening_hours_a4">
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
                  </td>
                </tr>

                <!-- for closing  -->
                <tr>
                  <td>
                    <p class="text-center fa-w">Closing</p>
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.closing_hours_a1"
                      :rules="[required('closing A1')]"
                      @click="showTimePicker('closing_hours_a1')"   
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="closing_hours_a1"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.closing_hours_a1">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.closing_hours_a2"
                      :rules="[required('closing A2')]"
                      @click="showTimePicker('closing_hours_a2')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="closing_hours_a2"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.closing_hours_a2">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.closing_hours_a3"
                      :rules="[required('closing A3')]"
                      @click="showTimePicker('closing_hours_a3')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="closing_hours_a3"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.closing_hours_a3">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.closing_hours_a4"
                      :rules="[required('closing A4')]"
                      @click="showTimePicker('closing_hours_a4')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="closing_hours_a4"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.closing_hours_a4">
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
                  </td>
                </tr>

                <!-- R hours -->
                <tr>
                  <td>
                    <p class="text-center fa-w">R. Hours</p>
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.running_hours_a1"
                      :rules="[requiredRange('running_hours_a1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.running_hours_a2"
                      :rules="[requiredRange('running_hours_a2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.running_hours_a3"
                      :rules="[requiredRange('running_hours_a3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.running_hours_a4"
                      :rules="[requiredRange('running_hours_a4')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="input-feilds q-ml-sm q-mt-md q-mr-sm">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>A5</th>
                  <th>A6</th>
                  <th>A7</th>
                  <th>A8</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p class="text-center fa-w">Opening</p>
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.opening_hours_a5"
                      :rules="[required('opening A5')]"
                       @click="showTimePicker('opening_hours_a5')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="opening_hours_a5"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.opening_hours_a5">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.opening_hours_a6"
                      :rules="[required('opening A6')]"
                      @click="showTimePicker('opening_hours_a6')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref='opening_hours_a6'
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.opening_hours_a6">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.opening_hours_a7"
                      :rules="[required('opening A7')]"
                      @click="showTimePicker('opening_hours_a7')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="opening_hours_a7"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.opening_hours_a7">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.opening_hours_a8"
                      :rules="[required('opening A8')]"
                       @click="showTimePicker('opening_hours_a8')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="opening_hours_a8"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.opening_hours_a8">
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
                  </td>
                </tr>

                <!-- for closing  -->
                <tr>
                  <td>
                    <p class="text-center fa-w">Closing</p>
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.closing_hours_a5"
                      :rules="[required('closing A5')]"
                      @click="showTimePicker('closing_hours_a5')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="closing_hours_a5"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.closing_hours_a5">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.closing_hours_a6"
                      :rules="[required('closing A6')]"
                      @click="showTimePicker('closing_hours_a6')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="closing_hours_a6"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.closing_hours_a6">
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
                  </td>

                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.closing_hours_a7"
                      :rules="[required('closing A7')]"
                      @click="showTimePicker('closing_hours_a7')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="closing_hours_a7"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.closing_hours_a7">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.closing_hours_a8"
                      :rules="[required('closing A8')]"
                      @click="showTimePicker('closing_hours_a8')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref='closing_hours_a8'
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.closing_hours_a8">
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
                  </td>
                </tr>

                <!-- R hours -->
                <tr>
                  <td>
                    <p class="text-center fa-w">R. Hours</p>
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.running_hours_a5"
                      :rules="[requiredRange('running_hours_a5')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.running_hours_a6"
                      :rules="[requiredRange('running_hours_a6')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.running_hours_a7"
                      :rules="[requiredRange('running_hours_a7')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.running_hours_a8"
                      :rules="[requiredRange('running_hours_a8')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- for B -->
          <div class="input-feilds q-ml-sm q-mt-md q-mr-sm">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>B1</th>
                  <th>B2</th>
                  <th>B3</th>
                  <th>B4</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p class="text-center fa-w">Opening</p>
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.opening_hours_b1"
                      :rules="[required('opening B1')]"
                      @click="showTimePicker('opening_hours_b1')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="opening_hours_b1"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.opening_hours_b1">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.opening_hours_b2"
                      :rules="[required('opening B2')]"
                      @click="showTimePicker('opening_hours_b2')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref='opening_hours_b2'
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.opening_hours_b2">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.opening_hours_b3"
                      :rules="[required('opening B3')]"
                      @click="showTimePicker('opening_hours_b3')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="opening_hours_b3"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.opening_hours_b3">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.opening_hours_b4"
                      :rules="[required('opening B4')]"
                      @click="showTimePicker('opening_hours_b4')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="opening_hours_b4"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.opening_hours_b4">
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
                  </td>
                </tr>

                <!-- for closing  -->
                <tr>
                  <td>
                    <p class="text-center fa-w">Closing</p>
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.closing_hours_b1"
                      :rules="[required('closing B1')]"
                      @click="showTimePicker('closing_hours_b1')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="closing_hours_b1"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.closing_hours_b1">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.closing_hours_b2"
                      :rules="[required('closing B2')]"
                      @click="showTimePicker('closing_hours_b2')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="closing_hours_b2"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.closing_hours_b2">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.closing_hours_b3"
                      :rules="[required('closing B3')]"
                      @click="showTimePicker('closing_hours_b3')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref='closing_hours_b3'
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.closing_hours_b3">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.closing_hours_b4"
                      :rules="[required('closing B4')]"
                      @click="showTimePicker('closing_hours_b4')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref='closing_hours_b4'
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.closing_hours_b4">
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
                  </td>
                </tr>

                <!--B_R hours -->
                <tr>
                  <td>
                    <p class="text-center fa-w">R. Hours</p>
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.running_hours_b1"
                      :rules="[requiredRange('running_hours_b1')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.running_hours_b2"
                      :rules="[requiredRange('running_hours_b2')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.running_hours_b3"
                      :rules="[requiredRange('running_hours_b3')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.running_hours_b4"
                      :rules="[requiredRange('running_hours_b4')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="input-feilds q-ml-sm q-mt-md q-mr-sm">
            <table class="long-feilds">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>B5</th>
                  <th>B6</th>
                  <th>B7</th>
                  <th>B8</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p class="text-center fa-w">Opening</p>
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.opening_hours_b5"
                      :rules="[required('opening B5')]"
                      @click="showTimePicker('opening_hours_b5')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="opening_hours_b5"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.opening_hours_b5">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.opening_hours_b6"
                      :rules="[required('opening B6')]"
                      @click="showTimePicker('opening_hours_b6')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="opening_hours_b6"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.opening_hours_b6">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.opening_hours_b7"
                      :rules="[required('opening B7')]"
                      @click="showTimePicker('opening_hours_b7')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="opening_hours_b7"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.opening_hours_b7">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.opening_hours_b8"
                      :rules="[required('opening B8')]"
                      @click="showTimePicker('opening_hours_b8')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="opening_hours_b8"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.opening_hours_b8">
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
                  </td>
                </tr>

                <!-- for closing  -->
                <tr>
                  <td>
                    <p class="text-center fa-w">Closing</p>
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.closing_hours_b5"
                      :rules="[required('closing B5')]"
                      @click="showTimePicker('closing_hours_b5')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="closing_hours_b5"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.closing_hours_b5">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.closing_hours_b6"
                      :rules="[required('closing B6')]"
                      @click="showTimePicker('closing_hours_b6')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref='closing_hours_b6'
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.closing_hours_b6">
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
                  </td>

                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.closing_hours_b7"
                      :rules="[required('closing B7')]"
                      @click="showTimePicker('closing_hours_b7')"
                      
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="closing_hours_b7"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.closing_hours_b7">
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
                  </td>
                  <td>
                    <q-input
                      label="time"
                      dense
                      outlined
                      v-model="expellerForm.closing_hours_b8"
                      :rules="[required('closing B8')]"
                      @click="showTimePicker('closing_hours_b8')"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            ref="closing_hours_b8"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="expellerForm.closing_hours_b8">
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
                  </td>
                </tr>

                <!--B_R hours -->
                <tr>
                  <td>
                    <p class="text-center fa-w">R. Hours</p>
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.running_hours_b5"
                      :rules="[requiredRange('running_hours_b5')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.running_hours_b6"
                      :rules="[requiredRange('running_hours_b6')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.running_hours_b7"
                      :rules="[requiredRange('running_hours_b7')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                  <td>
                    <q-input
                      style=""
                      dense
                      v-model="expellerForm.running_hours_b8"
                      :rules="[requiredRange('running_hours_b8')]"
                      type="number"
                      outlined
                      label="Input"
                      :min="0"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="btns">
          <q-btn
            @click="ExpellerFormOnSubmit"
            class="q-pa-sm"
            color="primary"
            label="Submit"
          />
          <q-btn
            @click="ExpellerFormOnReset"
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
import validations from "src/helpers/validations";
import { date, Notify } from "quasar";
export default {
  data() {
    return {
      name:"ExpellerSectionLog",
      ...validations,
      date:"",
      time: new Date().toLocaleTimeString(),
      options: ["Shift A", "Shift B", "Shift C"],
      expellerForm: {
        date_time: "",
        date: date.formatDate(Date.now(), "YYYY/MM/DD"),
        amps_a1: "",
        amps_a2: "",
        amps_a3: "",
        amps_a4: "",
        amps_a5: "",
        amps_a6: "",
        amps_a7: "",
        amps_a8: "",
        amps_b1: "",
        amps_b2: "",
        amps_b3: "",
        amps_b4: "",
        amps_b5: "",
        amps_b6: "",
        amps_b7: "",
        amps_b8: "",
        
        opening_hours_a1: "",
        opening_hours_a2: "",
        opening_hours_a3: "",
        opening_hours_a4: "",
        opening_hours_a5: "",
        opening_hours_a6: "",
        opening_hours_a7: "",
        opening_hours_a8: "",

        closing_hours_a1: "",
        closing_hours_a2: "",
        closing_hours_a3: "",
        closing_hours_a4: "",
        closing_hours_a5: "",
        closing_hours_a6: "",
        closing_hours_a7: "",
        closing_hours_a8: "",

        running_hours_a1: "",
        running_hours_a2: "",
        running_hours_a3: "",
        running_hours_a4: "",
        running_hours_a5: "",
        running_hours_a6: "",
        running_hours_a7: "",
        running_hours_a8: "",

        // for B
        opening_hours_b1: "",
        opening_hours_b2: "",
        opening_hours_b3: "",
        opening_hours_b4: "",
        opening_hours_b5: "",
        opening_hours_b6: "",
        opening_hours_b7: "",
        opening_hours_b8: "",

        closing_hours_b1: "",
        closing_hours_b2: "",
        closing_hours_b3: "",
        closing_hours_b4: "",
        closing_hours_b5: "",
        closing_hours_b6: "",
        closing_hours_b7: "",
        closing_hours_b8: "",

        running_hours_b1: "",
        running_hours_b2: "",
        running_hours_b3: "",
        running_hours_b4: "",
        running_hours_b5: "",
        running_hours_b6: "",
        running_hours_b7: "",
        running_hours_b8: "",
      },
    };
  },

  mounted() {
    this.startTime();
  },

  methods: {
    getCurrentTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`; // Format time as HH:MM:SS
    },

    startTime() {
      this.expellerForm.date_time = this.getCurrentTime();
      setInterval(() => {
        this.expellerForm.date_time = this.getCurrentTime();
      }, 1000);
    },

    async ExpellerFormOnSubmit() {

      const user=JSON.parse(localStorage.getItem("userDetails"))
      const formData = {...this.expellerForm,...user}

      const validate = await this.$refs.dataForm.validate();
      console.log("formDAta",formData);
    },

    ExpellerFormOnReset() {
      this.expellerForm = {
        date: date.formatDate(Date.now(), "YYYY/MM/DD"),
        date_time: "",
        amps_a1: "",
        amps_a2: "",
        amps_a3: "",
        amps_a4: "",
        amps_a5: "",
        amps_a6: "",
        amps_a7: "",
        amps_a8: "",
        amps_b1: "",
        amps_b2: "",
        amps_b3: "",
        amps_b4: "",
        amps_b5: "",
        amps_b6: "",
        amps_b7: "",
        amps_b8: "",

        opening_hours_a1: "",
        opening_hours_a2: "",
        opening_hours_a3: "",
        opening_hours_a4: "",
        opening_hours_a5: "",
        opening_hours_a6: "",
        opening_hours_a7: "",

        closing_hours_a1: "",
        closing_hours_a2: "",
        closing_hours_a3: "",
        closing_hours_a4: "",
        closing_hours_a5: "",
        closing_hours_a6: "",
        closing_hours_a7: "",
        closing_hours_a8: "",

        running_hours_a1: "",
        running_hours_a2: "",
        running_hours_a3: "",
        running_hours_a4: "",
        running_hours_a5: "",
        running_hours_a6: "",
        running_hours_a7: "",
        running_hours_a8: "",

        // for B
        opening_hours_b1: "",
        opening_hours_b2: "",
        opening_hours_b3: "",
        opening_hours_b4: "",
        opening_hours_b5: "",
        opening_hours_b6: "",
        opening_hours_b7: "",
        opening_hours_b8: "",

        closing_hours_b1: "",
        closing_hours_b2: "",
        closing_hours_b3: "",
        closing_hours_b4: "",
        closing_hours_b5: "",
        closing_hours_b6: "",
        closing_hours_b7: "",
        closing_hours_b8: "",

        running_hours_b1: "",
        running_hours_b2: "",
        running_hours_b3: "",
        running_hours_b4: "",
        running_hours_b5: "",
        running_hours_b6: "",
        running_hours_b7: "",
        running_hours_b8: "",
      };
    },

    showTimePicker(variable) {
      this.$refs[variable].show();
    },
  },
};
</script>
<style></style>
