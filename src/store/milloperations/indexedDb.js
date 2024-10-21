import { Notify } from 'quasar';
import axios from 'axios';
import ApiEndPoint from 'src/boot/axios';

const actions={
initDB() {
  console.log("60000")
    return new Promise((resolve, reject) => {

    const request = indexedDB.open("millOperationsFormDataDB", 2);
    request.onupgradeneeded = (event) => {
      console.log("event",event)
      const db = event.target.result;

      if (!db.objectStoreNames.contains("sterFormData",2)) {
        db.createObjectStore("sterFormData", {
          keyPath: "id",
          autoIncrement: true,
        });
      }

      if (!db.objectStoreNames.contains("boilerFormData")){
        db.createObjectStore("boilerFormData",{
          keyPath:"id",
          autoIncrement: true,
        })
            }

            if (!db.objectStoreNames.contains("turbineFormData")) {
                db.createObjectStore("turbineFormData", {
                  keyPath: "id",
                  autoIncrement: true,
                });
              }


              if (!db.objectStoreNames.contains("shiftFormData",2)) {
                db.createObjectStore("shiftFormData", {
                  keyPath: "id",
                  autoIncrement: true,
                });
              }


    };

    request.onsuccess = (event) => {
       resolve(event.target.result);
      // console.log("db",db)

    };

    request.onerror = (event) => {
      console.error("IndexedDB error:", event.target.error);
      reject(event.target.error)
    };
  })
  },

    // sync the data

   async  syncSterilisationDataForm({dispatch}) {
      const db=await dispatch('initDB');

      console.log("reddy",db,"mmreddy",db)
      if (navigator.onLine) {
        const sterTransaction = db.transaction(["sterFormData"], "readonly");
        const objectStore = sterTransaction.objectStore("sterFormData");
        const request = objectStore.getAll();

        request.onsuccess = async(event) => {
          const allData = event.target.result;

          let user=JSON.parse(localStorage.getItem('userDetails'))
          console.log("user",user)

          let indexedSterilistaionData = allData.filter((item)=>{
            if(item.plant_code === user.plant_code && item.state_code === user.state_code){
              return item
            }
          })

          console.log("92",indexedSterilistaionData);

          if (indexedSterilistaionData.length > 0) {
            try {
                const response = await fetch(
                  "https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/sterilizationStationLogBulkEntry.php",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(indexedSterilistaionData),
                  }
                );
          
                // Manually parse the response as JSON
                console.log("Reddy",await response)
                const result = await response.json();
                console.log("Result",result)
                if (result.IsDataUploaded === true){
                  Notify.create({
                    message: "Synced Data saved to the Database Successfully",
                    color: "positive",
                    timeout: 2000,
                    position: "top",
                    actions: [
                      { label: "Dismiss", color: "white", handler: () => {} },
                    ],
                  });

                 await dispatch('clearSterIndexedDB',{db,filteredData:indexedSterilistaionData})
                }
                else if (result.IsDataUploaded === false) {
                  Notify.create({
                    message: "❌ Log Submission Failed",
                    color: "negative",
                    position: "top",
                    timeout: 2000,
                    actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
                  });
                }
            } catch (error) {
              Notify.create({
                message: error.message || "Error while uploading",
                color: "negative",
                position: "top",
                timeout: 2000,
                actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
              });
            }
          } else {
            // alert("No data to sync.");
            Notify.create({
              message: "There is No data to sync",
              color: "warning",
              timeout: 2000,
              position: "top",
            });
          }
        };
        request.onerror = (event) => {
          console.error(
            "Error occurred while fetching data from IndexedDB:",
            event.target.error
          );
        };
      } else {
        Notify.create({
          message: "Sync when network is available",
          color: "warning",
          timeout: 2000,
          position: "top",
          actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
        });
      }
    },

    // clear indexedDB data
    async clearSterIndexedDB({commit},{db,filteredData}) {

      try {    
            const sterTransaction = db.transaction(["sterFormData"], "readwrite");
        const objectStore = sterTransaction.objectStore("sterFormData");
    
        for (let item of filteredData){
        const deleteRequest = objectStore.delete(item.id);
    
        deleteRequest.onsuccess = () => {
          console.log("Clear operation successful");
        };
    
        deleteRequest.onerror = (event) => {
          console.error("Clear operation error:", event.target.error);
        };
      }
      } catch (error) {
        console.error("Error initializing DB or clearing data:", error);
      }
    },
    

    async syncTurbineFormData({dispatch}) {
       const db= await dispatch('initDB');
      if (navigator.onLine) {
        const transactionTurbine = db.transaction(
          ["turbineFormData"],
          "readonly"
        );
        const objectStore =
          transactionTurbine.objectStore("turbineFormData");
        const request = objectStore.getAll();

        request.onsuccess = (async(event) => {
          const allData = event.target.result;

          let user=JSON.parse(localStorage.getItem('userDetails'))
          console.log("user",user)

          let turbineData = allData.filter((item)=>{
            if(item.plant_code === user.plant_code && item.state_code === user.state_code){
              return item
            }
          })

          if (turbineData.length > 0) {
            console.log("turbine",turbineData)
            
              try {
                const response = await fetch(
                  "https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/turbineLogBulkEntry.php",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(turbineData),
                  }
                );
          
                // Manually parse the response as JSON
                console.log("Reddy",await response)
                const result = await response.json();
                console.log("Result",result)
                if (result.IsDataUploaded === true){
                  Notify.create({
                    message: "Synced Data saved to the Database Successfully",
                    color: "positive",
                    timeout: 2000,
                    position: "top",
                    actions: [
                      { label: "Dismiss", color: "white", handler: () => {} },
                    ],
                  });

                  await dispatch('clearTurbineIndexedDB',{db,filteredData:turbineData});
                }
                else if (result.IsDataUploaded === false) {
                  Notify.create({
                    message: "Error while syncing the data to database",
                    color: "negative",
                    position: "top",
                    timeout: 2000,
                    actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
                  });
                }
            } 
          
              catch(error) {
                Notify.create({
                  message: "Error occurred while syncing data",
                  color: "negative",
                  timeout: 2000,
                  position: "top",
                  actions: [
                    { label: "Dismiss", color: "white", handler: () => {} },
                  ],
                });
              };
          } else {
            // alert("No data to sync.");
            Notify.create({
              message: "There is No data to sync",
              color: "warning",
              timeout: 2000,
              position: "top",
            });
          }
        });
        request.onerror = (event) => {
          console.error(
            "Error occurred while fetching data from IndexedDB:",
            event.target.error
          );
        };
      } else {
        Notify.create({
          message: "Sync when network is available",
          color: "warning",
          timeout: 2000,
          position: "top",
          actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
        });
      }
    },

    async clearTurbineIndexedDB({dispatch},{db,filteredData}) {

      try{
      const transactionTurbine = db.transaction(
        ["turbineFormData"],
        "readwrite"
      );
      const objectStore =
        transactionTurbine.objectStore("turbineFormData");
        for (let item of filteredData){
          const deleteRequest = objectStore.delete(item.id);
      
          deleteRequest.onsuccess = () => {
            console.log("Clear operation successful");
          };
      
          deleteRequest.onerror = (event) => {
            console.error("Clear operation error:", event.target.error);
          };
        }
    }

    catch (error) {
      console.error("Error initializing DB or clearing data:", error);
    }
    },

    async syncBoilerFormData({dispatch}) {
      const db= await dispatch("initDB")
      if (navigator.onLine) {
        const transactionBoiler = db.transaction(["boilerFormData"], "readonly");
        const objectStore = transactionBoiler.objectStore("boilerFormData");
        const request = objectStore.getAll();

        request.onsuccess = async(event) => {
          const allData = event.target.result;

          let user = JSON.parse(localStorage.getItem('userDetails'))

          let indexedBoilerData = allData.filter((item)=>{
            if (item.plant_code === user.plant_code && item.state_code === user.state_code){
              return item
            }
          })

          if (indexedBoilerData.length > 0) {
            try {
              const response = await fetch(
                "https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/boilerLogBulkEntry.php",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(indexedBoilerData),
                }
              );
        
              // Manually parse the response as JSON
              console.log("Reddy",await response)
              const result = await response.json();
              console.log("Result",result)
              if (result.IsDataUploaded === true){
                Notify.create({
                  message: "Synced Data saved to the Database Successfully",
                  color: "positive",
                  timeout: 2000,
                  position: "top",
                  actions: [
                    { label: "Dismiss", color: "white", handler: () => {} },
                  ],
                });

            await dispatch('clearBoilerIndexedDB',{db,filteredData:indexedBoilerData});
          }
              else if (result.IsDataUploaded === false) {
                Notify.create({
                  message: "Error while syncing the data to database",
                  color: "negative",
                  position: "top",
                  timeout: 2000,
                  actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
                });
              }
          } 


              catch(error){
                Notify.create({
                  message: "Error occurred while syncing data",
                  color: "negative",
                  timeout: 2000,
                  position: "top",
                  actions: [
                    { label: "Dismiss", color: "white", handler: () => {} },
                  ],
                });
              };
          } else {
            // alert("No data to sync.");
            Notify.create({
              message: "There is No data to sync",
              color: "warning",
              timeout: 2000,
              position: "top",
              // actions: [{ label: 'Dismiss', color: 'white', handler: () => {} }]
            });
          }
        };
        request.onerror = (event) => {
          console.error(
            "Error occurred while fetching data from IndexedDB:",
            event.target.error
          );
        };
      } else {
        Notify.create({
          message: "Sync when network is available",
          color: "warning",
          timeout: 2000,
          position: "top",
          actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
        });
      }
    },

    
    async clearBoilerIndexedDB({dispatch},{db,filteredData}) {

      const transactionBoiler = db.transaction(["boilerFormData"], "readwrite");
      const objectStore = transactionBoiler.objectStore("boilerFormData");
      for (let item of filteredData){
        const deleteRequest = objectStore.delete(item.id);
    
        deleteRequest.onsuccess = () => {
          console.log("Clear operation successful");
        };
    
        deleteRequest.onerror = (event) => {
          console.error("Clear operation error:", event.target.error);
        };
      }
    },



    async syncShiftFormData({dispatch}) {
      const db = await dispatch("initDB")
        if (navigator.onLine) {
          const transactionShift = db.transaction(
            ["shiftFormData"],
            "readonly"
          );
          const objectStore = transactionShift.objectStore("shiftFormData");
          const request = objectStore.getAll();
  
          request.onsuccess = async(event) => {
            const allData = event.target.result;

            let user= JSON.parse(localStorage.getItem('userDetails'))

            let indexedShiftData= allData.filter((item)=>{
 if (item.plant_code === user.plant_code && item.state_code === user.state_code){
  return item
 }
            })
  console.log("292",indexedShiftData)
            if (indexedShiftData.length > 0) {
              try {
                const response = await fetch(
                  "https://sedotsgroup.com/pflipalmdev/web-services/MillOperations/shiftLogBulkEntry.php",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(indexedShiftData),
                  }
                );
          
                // Manually parse the response as JSON
                console.log("Reddy",await response)
                const result = await response.json();
                console.log("Result",result)
                if (result.IsDataUploaded === true){
                  Notify.create({
                    message: "Synced Data saved to the Database Successfully",
                    color: "positive",
                    timeout: 2000,
                    position: "top",
                    actions: [
                      { label: "Dismiss", color: "white", handler: () => {} },
                    ],
                  });
                                      await dispatch('clearShiftIndexedDB',{db,filteredData:indexedShiftData});

  
            }
                else if (result.IsDataUploaded === false) {
                  Notify.create({
                    message: "Error while syncing the data to database",
                    color: "negative",
                    position: "top",
                    timeout: 2000,
                    actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
                  });
                }
            } 
  


                catch(error)  {
                  Notify.create({
                    message: "Error occurred while syncing data",
                    color: "negative",
                    timeout: 2000,
                    position: "top",
                    actions: [
                      { label: "Dismiss", color: "white", handler: () => {} },
                    ],
                  });
                };
            } else {
              // alert("No data to sync.");
              Notify.create({
                message: "There is No data to sync",
                color: "warning",
                timeout: 2000,
                position: "top",
              });
            }
          };
          request.onerror = (event) => {
            console.error(
              "Error occurred while fetching data from IndexedDB:",
              event.target.error
            );
          };
        } else {
          Notify.create({
            message: "Sync when network is available",
            color: "warning",
            timeout: 2000,
            position: "top",
            actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
          });
        }
      },
  
     async clearShiftIndexedDB({dispatch},{db,filteredData}) {


      console.log("454",db,filteredData)
        const transactionShift = db.transaction(
          ["shiftFormData"],
          "readwrite"
        );
        const objectStore = transactionShift.objectStore("shiftFormData");
        for (let item of filteredData){
          const deleteRequest = objectStore.delete(item.id);
      
          deleteRequest.onsuccess = () => {
            console.log("Clear operation successful");
          };
      
          deleteRequest.onerror = (event) => {
            console.error("Clear operation error:", event.target.error);
          };
        }
      },
}

  export const indexedDb = {
    namespaced: true,
    actions,
  };
  