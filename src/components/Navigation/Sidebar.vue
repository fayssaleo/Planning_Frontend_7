<template>
  <div class="sidebar">
    <v-card>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = true">
        <!-- top items -->
        <div class="topitems">
          <v-list-item  @click.stop="rail = !rail" prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" :title="authUser ? authUser.firstname + ' ' + authUser.lastname : ''
            " style="color: #f9fbfc">
            <template v-slot:append>
              <v-btn icon  v-bind:class="{ closedrawer: true }">
                <v-icon size="small" style="color: white">
                  mdi-arrow-left
                </v-icon>
              </v-btn>
            </template>
          </v-list-item>

          <v-list-item prepend-icon="mdi-cube-scan" title="Dashbord" value="Planning_dashbord" :style="{
            color: '#F9FBFC',
            backgroundColor: items[0].value==$route.name
              ? 'rgba(217, 217, 217, 0.2)'
              : '',
          }" @click="
              selectItem(0)
              " nav>
          </v-list-item>
          <v-list-item prepend-icon="mdi-gantry-crane" title="RTG Planning" value="planning" :style="{
            color: '#F9FBFC',
            backgroundColor: 'rtg'==$route.name
              ? 'rgba(217, 217, 217, 0.2)'
              : '',
          }" @click="
              selectItem(1)
              " nav>
          </v-list-item>
          <v-list-item prepend-icon="mdi-crane" title="STS Planning" value="planning" :style="{
            color: '#F9FBFC',
            backgroundColor: 'sts'==$route.name
              ? 'rgba(217, 217, 217, 0.2)'
              : '',
          }" @click="
              selectItem(2)
              " nav>
          </v-list-item>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Planning" value="planning" :style="{
            color: '#F9FBFC',
            backgroundColor: items[3].value==$route.name
              ? 'rgba(217, 217, 217, 0.2)'
              : '',
          }" @click="
              selectItem(3)
              " nav></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="Users" :style="{
            color: '#F9FBFC',
            backgroundColor: items[4].value==$route.name
              ? 'rgba(217, 217, 217, 0.2)'
              : '',
          }" @click="
              selectItem(4)
              " nav></v-list-item>
          <v-list-item prepend-icon="mdi-crane" title="Equipments" value="Equipments" :style="{
            color: '#F9FBFC',
            backgroundColor: items[5].value==$route.name
              ? 'rgba(217, 217, 217, 0.2)'
              : '',
          }" @click="
              selectItem(5)
              " nav></v-list-item>
        </div>

        <!-- divider -->
        <v-divider></v-divider>

        <!-- bottom items -->
        <div class="bottomitems">
          <v-btn icon @click="logout">
            <v-icon size="small" style="color: white"> mdi-logout </v-icon>
          </v-btn>
        </div>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      drawer: true,
      rail: true,
      authUser: null,
      role: null,
      items: [
        {
          icon: "mdi-view-dashboard",
          title: "Planning Dashbord",
          value: "PlanningDashbord",
          selected: false,
        },
        {
          icon: "mdi-view-dashboard",
          title: "RTG Planning",
          value: "rtgPlanning",
          selected: false,
        },
        {
          icon: "mdi-view-dashboard",
          title: "STS Planning",
          value: "stsPlanning",
          selected: false,
        },
        {
          icon: "mdi-view-dashboard",
          title: "Planning",
          value: "dashboard",
          selected: false,
        },
        {
          icon: "mdi-account-group-outline",
          title: "Users",
          value: "users",
          selected: false,
        },
        {
          icon: "mdi-crane",
          title: "Equipments",
          value: "equipments",
          selected: false,
        },
      ],
    };
  },

  mounted() {
    this.getAuthUser();
  },

  computed: {
    ...mapGetters(["getMessages", "getUserActive", "getUserRole"]),
  },

  methods: {
    ...mapActions(["logoutAction", "clearPlannings"]),
    getAuthUser() {
      this.authUser = this.getUserActive;
    },

    logout() {
      this.logoutAction()
        .then(() => {
          console.log(this.getMessages.logout);
          // this.clearPlannings();
          this.redirectAfterLogout();
        })
        .catch((error) => {
          console.error("Logout error:", error);
        });
    },

    redirectAfterLogout() {
      this.$router.push("/");
      localStorage.clear();
    },

    selectItem(index) {
      this.items.forEach((item, i) => {
        item.selected = i === index;
      });
      switch (index) {
        case 0:
          for (let i = 0; i <= index; i++) {
            this.items[i].selected = false;
          }
          this.items[index].selected = true;
          this.$router.push("/PlanningDashbord");
          break;
        case 1:
        for (let i = 0; i <= index; i++) {
            this.items[i].selected = false;
          }
          this.items[index].selected = true;
          this.$router.push("/rtgPlanning");
          break;
        case 2:
        for (let i = 0; i <= index; i++) {
            this.items[i].selected = false;
          }
          this.items[index].selected = true;
          this.$router.push("/stsPlanning");
          break;
        case 3:
        for (let i = 0; i <= index; i++) {
            this.items[i].selected = false;
          }
          this.items[index].selected = true;
          this.$router.push("/dashboard");
          break;
        case 4:
        for (let i = 0; i <= index; i++) {
            this.items[i].selected = false;
          }
          this.items[index].selected = true;
          this.$router.push("/users");
          break;
        case 5:
        for (let i = 0; i <= index; i++) {
            this.items[i].selected = false;
          }
          this.items[index].selected = true;
          this.$router.push("/equipements");
          break;
      }
    },
    setItems() {
      this.items = [];
      this.role = this.getUserRole;
      // console.log(this.role.name)
      switch (this.role.name) {
        case "admin":
          this.items = [
            {
              icon: "mdi-view-dashboard",
              title: "RTG Planning",
              value: "planning",
              selected: true,
            },
            {
              icon: "mdi-view-dashboard",
              title: "Planning",
              value: "planning",
              selected: true,
            },
            {
              icon: "mdi-account-group-outline",
              title: "Users",
              value: "users",
              selected: false,
            },
            {
              icon: "mdi-crane",
              title: "Equipments",
              value: "equipments",
              selected: false,
            },
          ];
          break;
        case "driver":
          this.items = [
            {
              icon: "mdi-view-dashboard",
              title: "RTG Planning",
              value: "planning",
              selected: true,
            },
            {
              icon: "mdi-view-dashboard",
              title: "Planning",
              value: "planning",
              selected: true,
            },
          ];
          break;
        case "am":
          this.items = [
            {
              icon: "mdi-view-dashboard",
              title: "Planning",
              value: "planning",
              selected: true,
            },
          ];
          break;
        case "foreman":
          this.items = [
            {
              icon: "mdi-view-dashboard",
              title: "RTG Planning",
              value: "planning",
              selected: true,
            },
            {
              icon: "mdi-view-dashboard",
              title: "Planning",
              value: "planning",
              selected: true,
            },
          ];
          break;
      }
    },
  },
};
</script>

<style scoped>
.sidebar {
  z-index: 30;
  opacity: 1;
}

.v-navigation-drawer {
  height: 100vh;

  background-color: #15263f;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-shrink: 1;
}

.topitems {
  height: 80vh;
}

.bottomitems {
  width: 100%;
  display: flex;
  justify-content: center;
}

.v-btn {
  background-color: #15263f;
}

.v-list-item {
  margin: 1rem 0;
}
</style>
