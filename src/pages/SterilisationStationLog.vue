<template>
  <q-page class="SterPage">
    <div class="title">
      <h4 class="text-center q-bold" style="position: relative">
        Sterilisation Station Log Sheet
        <q-icon
          name="sync"
          size="lg"
          class="absolute-right"
          style="border: 1px solid green; background-color: #dafdba"
          @click="syncSterilisationData()"
        />
      </h4>
    </div>
    <div class="container q-mt-lg container-sm">
      <q-form class="ster-form" ref="sterForm">
        <div class="input-feilds">
          <span class="input-text">Batch No : </span>
          <div style="width: 40%" class="q-mb-md">
          <q-input
            dense
            outlined
            label="Batch No"
            v-model="BatchNo"
            type="text"
            :rules="[required('Batch No')]"
          />
            <div v-if="sterilisationDayDetails.length > 0 && sterilisationDayDetails[0].batch_no" class="text-orange">{{ this.sterilisationDayDetails[0].batch_no}}</div>
        <div v-if="sterilisationDayDetails.length > 1 && sterilisationDayDetails[1].batch_no" class="text-blue">{{ this.sterilisationDayDetails[1].batch_no}}</div>
      </div>
      </div>
        <!-- {{  this.sterilisationDayDetails }} -->
          
        <div class="input-feilds">
          <span class="input-text">Date : </span
          ><q-input
            style="width: 40%"
            dense
            outlined
            v-model="FromDate"
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
                  <q-date v-model="FromDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="input-feilds">
          <span class="input-text">Shift : </span
          >
          <div style="width: 40%" class="q-mb-md">
          <q-input
            outlined
            dense
            v-model="shift"
            label="Shift"
            readonly
            :rules="[required('Shift')]"
          />
        
          <div v-if="sterilisationDayDetails.length > 0 && sterilisationDayDetails[0].shift" class="text-orange">{{ this.sterilisationDayDetails[0].shift}}</div>
        <div v-if="sterilisationDayDetails.length > 1 && sterilisationDayDetails[1].shift" class="text-blue">{{ this.sterilisationDayDetails[1].shift}}</div>
      </div>
        </div>
        <div class="input-feilds">
          <span class="input-text">Sterilizer no : </span
          >
          <div style="width: 40%" class="q-mb-md">
          <q-select
            outlined
            dense
            v-model="sterilizerno"
            :options="SterOptions"
            label="Sterilizer no"
            :rules="[required('Sterilizer No')]"
          />
          <div v-if="sterilisationDayDetails.length > 0 && sterilisationDayDetails[0].sterilizer_no" class="text-orange">{{ this.sterilisationDayDetails[0].sterilizer_no}}</div>
          <div v-if="sterilisationDayDetails.length > 1 && sterilisationDayDetails[1].sterilizer_no" class="text-blue">{{ this.sterilisationDayDetails[1].sterilizer_no}}</div>
      </div>
        </div>
        <div class="input-feilds" style="width: 100%">
          <span class="input-text">1st peak :</span>
          <div style="width: 32%" class="q-mb-md">
          <q-input
            class="TwoTimeInpts"
            label="Time in"
            dense
            outlined
            v-model="firstpeaktimein"
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
                  <q-time v-model="firstpeaktimein">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template> </q-input
          >
          <div v-if="sterilisationDayDetails.length > 0 && sterilisationDayDetails[0].peak_1st_time_in" class="text-orange">{{ this.sterilisationDayDetails[0].peak_1st_time_in}}</div>
          <div v-if="sterilisationDayDetails.length > 1 && sterilisationDayDetails[1].peak_1st_time_in" class="text-blue">{{ this.sterilisationDayDetails[1].peak_1st_time_in}}</div>
        </div>
        <div style="margin-left: 10px; width: 32%" class="q-mb-md">
          <q-input
            class="TwoTimeInpts"
            label="Time out"
            dense
            outlined
            v-model="firstpeaktimeout"
            mask="time"
            :rules="[required('field')]"
            @click="showTimePicker2"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                ref="timePopup2"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="firstpeaktimeout">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template> </q-input
          >
          <div v-if="sterilisationDayDetails.length > 0 && sterilisationDayDetails[0].peak_1st_time_out" class="text-orange">{{ this.sterilisationDayDetails[0].peak_1st_time_out}}</div>
          <div v-if="sterilisationDayDetails.length > 1 && sterilisationDayDetails[1].peak_1st_time_out" class="text-blue">{{ this.sterilisationDayDetails[1].peak_1st_time_out}}</div>
        </div>
          <br />
        </div>
        <div class="input-feilds">
          <span class="input-text">2nd Peak : </span
          >
          <div style="width: 32%" class="q-mb-md">
          <q-input
            class="TwoTimeInpts"
            dense
            label="Time in"
            outlined
            v-model="secondpeaktimein"
            mask="time"
            :rules="[required('field')]"
            @click="showTimePicker3"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                ref="timePopup3"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="secondpeaktimein">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template> </q-input
          >
          <div v-if="sterilisationDayDetails.length > 0 && sterilisationDayDetails[0].peak_2nd_time_in" class="text-orange">{{ this.sterilisationDayDetails[0].peak_2nd_time_in}}</div>
          <div v-if="sterilisationDayDetails.length > 1 && sterilisationDayDetails[1].peak_2nd_time_in" class="text-blue">{{ this.sterilisationDayDetails[1].peak_2nd_time_in}}</div>
        </div>
        <div style="margin-left: 10px; width: 32%"
        class="q-mb-md">
          <q-input
            dense
            class="TwoTimeInpts"
            label="Time out"
            outlined
            v-model="secondpeaktimeout"
            mask="time"
            :rules="[required('field')]"
            @click="showTimePicker4"

          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                ref="timePopup4"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="secondpeaktimeout">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div v-if="sterilisationDayDetails.length > 0 && sterilisationDayDetails[0].peak_2nd_time_out" class="text-orange">{{ this.sterilisationDayDetails[0].peak_2nd_time_out}}</div>
          <div v-if="sterilisationDayDetails.length > 1 && sterilisationDayDetails[1].peak_2nd_time_out" class="text-blue">{{ this.sterilisationDayDetails[1].peak_2nd_time_out}}</div>
        </div>
        </div>
        <div class="input-feilds">
          <span class="input-text ThirdPeakTxt" style="margin-right: 74px"
            >3rd Peak : </span
          >
          <div style="width: 30%" class="q-mb-md">
          <q-input 
            class="ThirdPeakInpt"
            dense
            label="Time in"
            outlined
            v-model="thirdpeaktimein"
            mask="time"
            :rules="[required('field')]"
            @click="showTimePicker5"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                ref="timePopup5"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="thirdpeaktimein">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template> </q-input
          >
          <div v-if="sterilisationDayDetails.length > 0 && sterilisationDayDetails[0].peak_3rd_time_in" class="text-orange">{{ this.sterilisationDayDetails[0].peak_3rd_time_in}}</div>
          <div v-if="sterilisationDayDetails.length > 1 && sterilisationDayDetails[1].peak_3rd_time_in" class="text-blue">{{ this.sterilisationDayDetails[1].peak_3rd_time_in}}</div>
        </div>
        <div  style="margin-left: 8px; width: 30%" class="q-mb-md">
          <q-input
            class="ThirdPeakInpt"
            dense
            label="40 PSI"
            outlined
            v-model="FortyPsi"
            mask="time"
            :rules="[required('field')]"
            @click="showTimePicker6"

          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                ref="timePopup6"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="FortyPsi">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div v-if="sterilisationDayDetails.length > 0 && sterilisationDayDetails[0].peak_3rd_40psi_time" class="text-orange">{{ this.sterilisationDayDetails[0].peak_3rd_40psi_time}}</div>
          <div v-if="sterilisationDayDetails.length > 1 && sterilisationDayDetails[1].peak_3rd_40psi_time" class="text-blue">{{ this.sterilisationDayDetails[1].peak_3rd_40psi_time}}</div>
        </div>
        <div style="margin-left: 8px; width: 30%; margin-right: 6px" class="q-mb-md">
          <q-input
            class="ThirdPeakInpt"
            dense
            label="Time out"
            outlined
            v-model="thirdpeaktimeout"
            mask="time"
            :rules="[required('field')]"
            @click="showTimePicker7"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                ref="timePopup7"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="thirdpeaktimeout">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div v-if="sterilisationDayDetails.length > 0 && sterilisationDayDetails[0].peak_3rd_time_out" class="text-orange">{{ this.sterilisationDayDetails[0].peak_3rd_time_out}}</div>
          <div v-if="sterilisationDayDetails.length > 1 && sterilisationDayDetails[1].peak_3rd_time_out" class="text-blue">{{ this.sterilisationDayDetails[1].peak_3rd_time_out}}</div>
        </div>
        </div>
        <div class="input-feilds">
          <span class="input-text">No.of Cages : </span
          >
          <div style="width: 40%" class="q-mb-md">
          <q-select
            outlined
            dense
            v-model="NoOfCages"
            :options="NoOfCagesOptions"
            label="No of Cages"
            :rules="[required('No of Cages')]"
          />
          <div v-if="sterilisationDayDetails.length > 0 && sterilisationDayDetails[0].no_of_cages" class="text-orange">{{ this.sterilisationDayDetails[0].no_of_cages}}</div>
          <div v-if="sterilisationDayDetails.length > 1 && sterilisationDayDetails[1].no_of_cages" class="text-blue">{{ this.sterilisationDayDetails[1].no_of_cages}}</div>
        </div>
        </div>
        <div class="input-feilds">
          <span class="input-text">Remarks : </span
          >
          <div style="width: 70%; margin-left: 10px" class="q-mb-md">
          <q-input
            outlined
            dense
            v-model="remarks"
            type="textarea"
            float-label="Textarea"
            :max-height="10"
            :min-rows="2"
            class="remarks"
          />
          <div v-if="sterilisationDayDetails.length > 0 && sterilisationDayDetails[0].remarks" class="text-orange">{{ this.sterilisationDayDetails[0].remarks}}</div>
          <div v-if="sterilisationDayDetails.length > 1 && sterilisationDayDetails[1].remarks" class="text-blue">{{ this.sterilisationDayDetails[1].remarks}}</div>
        </div>
        </div>
        <div class="btns">
          <q-btn
            class="q-pa-sm q-ml-xl"
            color="primary"
            label="Submit"
            @click="FetchFormDetails"
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
</template>
<script>
import { date } from "quasar";
import validations from "../helpers/validations";
import { Notify } from "quasar";
import axios from "axios";
import ApiEndPoint from "src/boot/axios";
import { mapActions } from "vuex";

export default {
  name: "SterilisationStationLog",
  data() {
    return {
      ...validations,
      // shift: "",
      date:"",
      FromDate: date.formatDate(Date.now(), "YYYY/MM/DD"),
      BatchNo: "",
      sterilizerno: "",
      firstpeaktimein: "",
      firstpeaktimeout: "",
      secondpeaktimein: "",
      secondpeaktimeout: "",
      thirdpeaktimein: "",
      FortyPsi: "",
      thirdpeaktimeout: "",
      NoOfCages: "",
      remarks: "",
      NoOfCagesOption: "",
      options: ["Shift A", "Shift B", "Shift C"],
      SterOptions: ["Sterilizer 1", "Sterilizer 2", "Sterilizer 3"],
      NoOfCagesOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      UserInfo: {},
      sterilisationDayDetails:[],
    };
  },
  async created() {
    this.UserInfo = this.GetUserInfo();
    this.db = await this.initDB();
  },
  computed: {

    GetDate() {
      const timeStamp = Date.now();
      const formattedString = date.formatDate(timeStamp, "YYYY/MM/DD");
      return formattedString;
    },

    shift(){
      return this.options[this.sterilisationDayDetails.length]
    }
    // https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/sterilizationStationLogBulkEntry.php
  },
  mounted() {

     this.getTodayCompletedShiftDetails()
     
  },
  methods: {
    ...mapActions("indexedDb", ["initDB"]),
    ...mapActions("indexedDb", ["syncSterilisationDataForm"]),
    ...mapActions("indexedDb", ["clearSterFormIndexedDB"]),

    async getTodayCompletedShiftDetails(){
      
      console.log("389",this.FromDate)

      let user=JSON.parse(localStorage.getItem('userDetails'))

console.log("userData",user,`https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/sterilizationStationLogDataForTheDay.php?date=${this.FromDate}}&plant_code=${user.plant_code}&state_code=${user.state_code}`)

      let response= await fetch(`https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/sterilizationStationLogDataForTheDay.php?date=${this.FromDate}&plant_code=${user.plant_code}&state_code=${user.state_code}`,
        {
          method:"POST",
//           header:{
// "Content-Type":"application/json"
//           },
//           body:JSON.stringify('userData')

        }
      )

      const responseData= await response.json()
      console.log("410",responseData)
      this.sterilisationDayDetails=responseData

    },

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

    async syncSterilisationData() {
      if (!this.db) {
        console.error("Database not initialized");
        await this.initDB();
      }
      this.syncSterilisationDataForm();
    },

    async FetchFormDetails() {
      let userDetailsData = JSON.parse(localStorage.getItem("userDetails"));
      const Details = {
        BatchNo: this.BatchNo,
        formdate: this.FromDate,
        shift: this.shift,
        sterilizerno: this.sterilizerno,
        firstpeaktimein: this.firstpeaktimein,
        firstpeaktimeout: this.firstpeaktimeout,
        secondpeaktimein: this.secondpeaktimein,
        secondpeaktimeout: this.secondpeaktimeout,
        thirdpeaktimein: this.thirdpeaktimein,
        FortyPsi: this.FortyPsi,
        thirdpeaktimeout: this.thirdpeaktimeout,
        NoOfCages: this.NoOfCages,
        remarks: this.remarks,
      };

      const validate = await this.$refs.sterForm.validate();
      if (!validate) {
        Notify.create({
          message: "Please fill the form properly",
          color: "negative",
          timeout: 2000,
          position: "top",
        });
        return;
      }

      const SterFormDetails = { ...Details, ...userDetailsData };

      try {
        if (navigator.onLine) {
          const response = await fetch(
            "https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/sterilizationStationLogEntry.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(SterFormDetails),
            }
          );

          const result = await response.json();

          if (result.IsDataUploaded === true) {
            Notify.create({
              message: "✔ Log Submitted",
              color: "positive",
              position: "top",
              timeout: 2000,
              actions: [
                { label: "Dismiss", color: "white", handler: () => {} },
              ],
            });
            
            this.ResetForm();
            // this.$refs.sterForm.resetValidation();
            setTimeout(()=>{
              window.location.reload()
            },2000)
            // this.sterForm.value.reset()
          } else if (result.IsDataUploaded === false) {
            Notify.create({
              message: "❌ Log Submission Failed",
              color: "negative",
              position: "top",
              timeout: 2000,
              actions: [
                { label: "Dismiss", color: "white", handler: () => {} },
              ],
            });
            this.ResetForm();
          }
        } else {
          // Save to IndexedDB if offline
          this.sterDataSaveToIndexedDB(SterFormDetails);
        }
      } catch (error) {
        Notify.create({
          message: error.message || "Error while uploading",
          color: "negative",
          position: "top",
          timeout: 2000,
          actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
        });
        this.ResetForm();
      }
    },

    sterDataSaveToIndexedDB(data) {
      const sterTransaction = this.db.transaction(
        ["sterFormData"],
        "readwrite"
      );
      const objectStore = sterTransaction.objectStore("sterFormData");
      objectStore.add(data);

      sterTransaction.oncomplete = () => {
        Notify.create({
          message: "Data Synced Successfully",
          color: "positive",
          timeout: 2000,
          position: "top",
        });
      };

      sterTransaction.onerror = (event) => {
        Notify.create({
          message: "Data Synced Failed Please Try Again",
          color: "negative",
          timeout: 2000,
          position: "top",
        });
      };

      this.ResetForm();
    },
    ResetForm() {
      this.BatchNo = "";
      this.shift = "";
      this.sterilizerno = "";
      this.firstpeaktimein = "";
      this.firstpeaktimeout = "";
      this.secondpeaktimein = "";
      this.secondpeaktimeout = "";
      this.thirdpeaktimein = "";
      this.FortyPsi = "";
      this.thirdpeaktimeout = "";
      this.NoOfCages = "";
      this.remarks = "";
    },
  },
};
</script>
<style>
@media (max-width: 602px) {
  .remarks {
    width: 60% !important;
    margin-left: 0px !important;
  }
  .ThirdPeakInpt {
    width: 20% !important;
  }
  .ThirdPeakTxt {
    margin-right: 20px !important;
  }
  .TwoTimeInpts {
    width: 167px !important;
  }
  .ster-form {
    width: 550px !important;
  }
  .input-feilds {
    margin-top: -2px !important;
  }
  .btns {
    margin-top: 0px;
  }
  .container-sm {
    margin-top: 0px !important;
  }
}
</style>
