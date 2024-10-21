<template>
    <q-page style="min-height: 948px;">
      <div class="container">
        <div class="userInfo">
          <div class="UserInfoItem" style="margin-top:0px;background-color:#2D3E40;color:#F2E7DC">
            About App
          </div>
          <div class="UserInfoItem">
            <span class="QItem">Employee Name</span><span>:</span><span class="AItem">{{ userDetails.emp_name || 'N/A' }}</span>
          </div>
          <div class="UserInfoItem">
            <span class="QItem">Employee Code</span><span>:</span><span class="AItem">{{ userDetails.emp_code || 'N/A' }}</span>
          </div>
          <div class="UserInfoItem">
            <span class="QItem">Username</span><span>:</span><span class="AItem">{{ userDetails.user_name || 'N/A' }}</span>
          </div>
          <div class="UserInfoItem">
            <span class="QItem">App Type</span><span>:</span><span class="AItem">{{ userDetails.app_type || 'N/A' }}</span>
          </div>
          <div class="UserInfoItem">
            <span class="QItem">State Name</span><span>:</span><span class="AItem">{{ userDetails.state_name || 'N/A' }}</span>
          </div>
          <div class="UserInfoItem">
            <span class="QItem">State Code</span><span>:</span><span class="AItem">{{ userDetails.state_code || 'N/A' }}</span>
          </div>
          <div class="UserInfoItem">
            <span class="QItem">Plant Name</span><span>:</span><span class="AItem">{{ userDetails.plant_name || 'N/A' }}</span>
          </div>
          <div class="UserInfoItem">
            <span class="QItem">Plant Code</span><span>:</span><span class="AItem">{{ userDetails.plant_code || 'N/A' }}</span>
          </div>
          <div class="UserInfoItem">
            <span class="QItem">Cluster Name</span><span>:</span><span class="AItem">{{ userDetails.cluster_name || 'N/A' }}</span>
          </div>
          <div class="UserInfoItem">
            <span class="QItem">Cluster Code</span><span>:</span><span class="AItem">{{ userDetails.cluster_code || 'N/A' }}</span>
          </div>
        </div>
      </div>
    </q-page>
  </template>
  
  <script>
  import { mapState } from "vuex";
  
  export default {
    name: "AboutApp",
    data() {
      return {
        userDetails: {},
      };
    },
    computed: {
      ...mapState("milloperations", [
        "IsLoggedIn",
        "emp_code",
        "emp_name",
        "user_name",
        "app_type",
        "state_name",
        "state_code",
        "plant_code",
        "plant_name",
        "cluster_code",
        "cluster_name",
      ]),
    },
    mounted() {
      const storedDetails = localStorage.getItem('userDetails');
      if (storedDetails) {
        this.userDetails = JSON.parse(storedDetails);
      }
    },
  };
  </script>
  
  <style>
  .userInfo {
    background-color: #E4F2E7;
    margin: 14px;
    padding: 18px 20px 18px 20px;
    border-radius: 10px;
    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  }
  .UserInfoItem {
    display: flex;
    justify-content: space-around;
    background-color: #93BFB7;
    padding: 15px;
    border-radius: 10px;
    margin-top: 15px;
    font-size: 18px;
    color: #2D3E40;
    font-weight: 600;
  }
  .QItem {
    width: 348px;
  }
  .AItem {
    width: 348px;
    padding-left: 100px;
  }
  </style>
  