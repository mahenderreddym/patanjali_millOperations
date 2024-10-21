import { mapState } from "vuex";

export const UserInfoMixin = {
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
  methods: {
    GetUserInfo() {
        return {
            "emp_code":this.emp_code,
            "emp_name":this.emp_name,
            "user_name":this.user_name,
            "app_type":this.app_type,
            "state_name":this.state_name,
            "state_code":this.state_code,
            "plant_code":this.plant_code,
            "plant_name":this.plant_name,
        }
    }
  },
};
