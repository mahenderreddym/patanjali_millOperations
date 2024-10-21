<template>
    <q-page>
      <div class="q-pa-md">
        <div class="text-h4 text-center text-green text-bold">Sync Data View</div>
        <div class="q-mt-md">
          <q-markup-table class="no-border" flat style="table-layout: fixed">
            <thead>
              <tr>
                <th class=" text-left text-primary text-weight-bold" style="width:33.33%">
                  Report Type
                </th>
                <th class="text-center text-primary text-bold" style="width:33.33%">
                  Flush Records Count
                </th>
                <th class=" text-center text-primary text-bold" style="width:33.33%">Sync</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-left">Sterilisation Station Report</td>
                <td class="text-center text-red text-bold">{{ sterFormData.length }}</td>
                <td class="text-center ">  <q-icon
        name="sync"
        size="md"
        style="border:1px solid green;background-color:#DAFDBA;"
        @click="syncSterilisationData()"
        class="cursor-pointer	"
      /></td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-page>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  
  export default {
    name: "Sync",
    data() {
      return {
        db: null,
        records: [],
        combinedData:[],
        sterFormData:[],
        turbineFormData:[],
        boilerFormData:[],
        shiftFormData:[],
      };
    },
  
    async created() {
    try {
      this.initDB().then(async (db) => {
        this.db = db;
        
        if (this.db) {
          const data = await this.fetchDataFromIndexedDB(this.db);
          this.sterFormData=data.sterFormData.filter((each)=>{
            if (each.plant_code === this.userDetails.plant_code && each.state_code === this.userDetails.state_code){
              return each
            }
            });
  
          this.turbineFormData=data.turbineFormData.filter((each)=>{
            if (each.plant_code === this.userDetails.plant_code && each.state_code === this.userDetails.state_code){
              return each
            }
          });
          this.boilerFormData=data.boilerFormData.filter((each)=>{  
            if (each.plant_code === this.userDetails.plant_code && each.state_code === this.userDetails.state_code){
              return each
            }
          });
  
          this.shiftFormData=data.shiftFormData.filter((each)=>{
            if (each.plant_code === this.userDetails.plant_code && each.state_code === this.userDetails.state_code){
              return each
            }
          });
        } else {
          console.error("Database initialization failed");
        }
      }).catch((error) => {
        console.error("Error initializing database:", error);
      });
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  },
  computed:{
    userDetails() {
        let user = JSON.parse(localStorage.getItem("userDetails")) || {};
        return user;
      },},
    mounted() {},
    methods: {
      ...mapActions("indexedDb", ["initDB"]),
      ...mapActions("indexedDb",["syncSterilisationDataForm"]),
      ...mapActions("indexedDb",["syncTurbineFormData"]),
      ...mapActions("indexedDb",["syncBoilerFormData"]),
      ...mapActions("indexedDb",["syncShiftFormData"]),
  
  
      fetchDataFromIndexedDB(db) {
    const objectStores = ["sterFormData", "turbineFormData", "boilerFormData", "shiftFormData"];
  
    const promises = objectStores.map((storeName) => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], "readonly");
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.getAll();
  
        request.onsuccess = (event) => {
          resolve({ storeName, data: event.target.result }); // Return an object with storeName and data
        };
        request.onerror = (event) => {
          console.error(
            "Error fetching data from IndexedDB:",
            event.target.error
          );
          reject(event.target.error);
        };
      });
    });
  
    return Promise.all(promises)
      .then((results) => {
        // Combine the results into a single object
        const combinedData = {};
        results.forEach(({ storeName, data }) => {
          combinedData[storeName] = data;
        });
        return combinedData;
      })
      .catch((error) => {
        console.error("Error fetching data from IndexedDB:", error);
        throw error;
      });
  },
  
  async syncSterilisationData(){
        if (!this.db) {
        console.error("Database not initialized");
        await this.initDB();
      };
        this.syncSterilisationDataForm();
      },
  
      async syncTurbineData(){
        if (!this.db) {
        console.error("Database not initialized");
        await this.initDB();
      };
        this.syncTurbineFormData();
      },
  
      async syncBoilerData(){
        if (!this.db) {
        console.error("Database not initialized");
        await this.initDB();
      };
        this.syncBoilerFormData();
      },
  
      async syncShiftData(){
        if (!this.db) {
        console.error("Database not initialized");
        await this.initDB();
      };
        this.syncShiftFormData();
      },
    },
  };
  </script>
  
  <style scoped >
  no-border,q-markup-table,q-table {
    border: none !important;
    border:0px solid transparent !important;
  }
  
  
  
  th {
    font-size: 25px;
    font-weight:bold;
  
  }
  tr,td{
    font-size: 20px !important;
  }
  
  q-markup-table,td,th,tbody{
    border:none;
  }
  
  td{
    border-bottom:1px solid blue;
  }
  
  th{
    border-bottom:1px solid blue;
  
  }
  
  
  </style>
  