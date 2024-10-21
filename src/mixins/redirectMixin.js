import { mapState } from 'vuex'

export const redirectMixin = {
    created() {
      this.redirectUser();
    },
    computed:{
      ...mapState('milloperations', ['IsLoggedIn'])
    },
    methods: {
      redirectUser() {
        // const fromPath = this.$route.path;
        // const toPath = this.$route.path;
        console.log(this.IsLoggedIn)
        if (this.IsLoggedIn == true){
          this.$router.push("Dashboard")
        }
        else if (this.IsLoggedIn == false) {
          this.$router.push('login')
        }
        else {
          this.$router.push(toPath)
        }
      }
    }
  };