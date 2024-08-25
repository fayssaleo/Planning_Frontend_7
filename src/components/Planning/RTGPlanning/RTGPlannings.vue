<template>
  <v-row style="width: 100%; margin: 0 auto">
    <v-col cols="12">
      <h1>{{ getSelected_profile_group?.type.toUpperCase() }} Planning :</h1>
    </v-col>
    <v-col cols="1"></v-col>
    <v-col cols="6" class="ma-0 pa-0 pr-1">
      <vc-calendar
        style="width: 100%; height: 100%"
        is-expanded
        title-position="left"
        trim-weeks
        show-weeknumbers
        :attributes="attributes"
        v-model="selectedDate"
        multiple
        @dayclick="onDayClick"
      >
        <template #default="{ inputValue, inputEvents }">
          <input
            class="px-3 py-1 border rounded"
            :value="inputValue"
            v-on="inputEvents"
          />
        </template>
      </vc-calendar>
    </v-col>
    <v-col cols="4" style="width: 105% !important">
      <v-row>
        <v-col
          style="
            border: 1px solid #122278;
            color: #122278;
            margin: 1px;
            border-radius: 5px;
            opacity: 0.9;
            font-weight: bold;
          "
          cols="12"
          >SHIFTS :
        </v-col>
        <v-col
          class="shiftButtons"
          style="font-weight: bold"
          :style="{ color: 'white', backgroundColor: 'rgb(65 105 225 / 92%)' }"
          cols="12"
          @click="
            NotwaitLoading?getShifPlanningById(shifts[0].id) != null
              ? getThisPlanning(shifts[0].id,0)
              : setSelectedPlanning(
                  shifts[0],
                  getShifPlanningById(shifts[0].id),
                  selectedDate,
                  0
                ):''
          "
        >
          <v-icon style="margin-top: -3px;">mdi-weather-sunset</v-icon>
          Morning : {{ shifts[0].name }}
          <span style="text-align: left; float: right"
            >{{ getShifPlanningById(shifts[0].id) ? " View  " : " Create  " }}
            <v-icon
              v-if="getShifPlanningById(shifts[0].id)"
              style="margin-top: -3px;"
              >mdi-eye-arrow-right-outline</v-icon
            >
            <v-icon v-else style="margin-top: -3px">mdi-plus</v-icon>
          </span>
        </v-col>
        <v-col
          class="shiftButtons"
          style="font-weight: bold"
          :style="{ color: 'white', backgroundColor: '#FFAA5A' }"
          cols="12"
          @click="
            NotwaitLoading?getShifPlanningById(shifts[1].id) != null
              ? getThisPlanning(shifts[1].id,1)
              : setSelectedPlanning(
                  shifts[1],
                  getShifPlanningById(shifts[1].id),
                  selectedDate,
                  1
                ):''
          "
        >
          <v-icon style="margin-top: -3px">mdi-theme-light-dark</v-icon>
          Evening : {{ shifts[1].name }}
          <span style="text-align: left; float: right"
            >{{ getShifPlanningById(shifts[1].id) ? " View  " : " Create  " }}
            <v-icon
              v-if="getShifPlanningById(shifts[1].id)"
              style="margin-top: -3px"
              >mdi-eye-arrow-right-outline</v-icon
            >
            <v-icon v-else style="margin-top: -3px">mdi-plus</v-icon>
          </span>
        </v-col>
        <v-col
          class="shiftButtons"
          style="font-weight: bold"
          :style="{ color: 'white', backgroundColor: '#15263f' }"
          cols="12"
          @click="
            NotwaitLoading?getShifPlanningById(shifts[2].id) != null
              ? getThisPlanning(shifts[2].id,2)
              : setSelectedPlanning(
                  shifts[2],
                  getShifPlanningById(shifts[2].id),
                  selectedDate,
                  2
                ):''
          "
        >
          <v-icon style="margin-top: -3px">mdi-weather-night</v-icon>
          Night : {{ shifts[2].name }}
          <span style="text-align: left; float: right"
            >{{ getShifPlanningById(shifts[2].id) ? " View  " : " Create  " }}
            <v-icon
              v-if="getShifPlanningById(shifts[2].id)"
              style="margin-top: -3px"
              >mdi-eye-arrow-right-outline</v-icon
            >
            <v-icon v-else style="margin-top: -3px">mdi-plus</v-icon>
          </span>
        </v-col>
        <v-col
          class="shiftButtons2"
          style="font-weight: bold"
          :style="{ color: 'black' }"
          cols="12"
        >
          Day Off : {{ shifts[3].name }}
          <span style="text-align: left; float: right">
            <v-icon
              v-if="getShifPlanningById(shifts[3].id)"
              style="margin-top: -3px"
              >mdi-eye-arrow-right-outline</v-icon
            >
            <v-icon v-else style="margin-top: -3px">mdi-plus</v-icon>
          </span>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "RTG Select/Create Planning",
  data() {
    return {
      profileGroup: null,
      selectedDate: new Date(),
      shifts: [
        {
          id: 4,
          name: "D",
          backgroundColor: "#8B0000",
          color: "white", // Deep Red
        },
        {
          id: 1,
          name: "A",
          backgroundColor: "#4169E1",
          color: "white", // Royal Blue
        },
        {
          id: 2,
          name: "B",
          backgroundColor: "#50C878",
          color: "white", // Emerald Green
        },
        {
          id: 3,
          name: "C",
          backgroundColor: "#C0C0C0",
          color: "black", // Silver
        },
      ],
      selectedShift: "",

    };
  },
  computed: {
    ...mapGetters(["getPlannings", "getProfileGroups",'getSelected_profile_group',]),
    emits: ['showNotificationClassSuccess',
     'showNotificationClassFailed',
     'getCurrentPlanningAndBoxes',

    ],
    shiftAPlanning() {
      if(this.plannings.length==0){
        return null;
      }
      let data= this.plannings
        .filter((e) => {
          return e.shift_id == 1;
        })
        .filter((e) => {
          return e.profile_group_id == this.getSelected_profile_group.id;
        })
        .filter((e) => {
          return (
            new Date(e.planned_at.split(" ")[0]).getFullYear() ==
              this.selectedDate.getFullYear() &&
            new Date(e.planned_at.split(" ")[0]).getMonth() ==
              this.selectedDate.getMonth() &&
            new Date(e.planned_at.split(" ")[0]).getDate() ==
              this.selectedDate.getDate()
          );
        });
        return data.length>0?data[0]:null
    },
    shiftBPlanning() {
      if(this.plannings.length==0){
        return null;
      }
      let data= this.plannings
        .filter((e) => {
          return e.shift_id == 2;
        })
        .filter((e) => {
          return e.profile_group_id == this.getSelected_profile_group.id;
        })
        .filter((e) => {
          return (
            new Date(e.planned_at.split(" ")[0]).getFullYear() ==
              this.selectedDate.getFullYear() &&
            new Date(e.planned_at.split(" ")[0]).getMonth() ==
              this.selectedDate.getMonth() &&
            new Date(e.planned_at.split(" ")[0]).getDate() ==
              this.selectedDate.getDate()
          );
        });
        return data.length>0?data[0]:null;
    },
    shiftCPlanning() {
      if(this.plannings.length==0){
        return null;
      }
      let data= this.plannings
        .filter((e) => {
          return e.shift_id == 3;
        })
        .filter((e) => {
          return e.profile_group_id == this.getSelected_profile_group.id;
        })
        .filter((e) => {
          return (
            new Date(e.planned_at.split(" ")[0]).getFullYear() ==
              this.selectedDate.getFullYear() &&
            new Date(e.planned_at.split(" ")[0]).getMonth() ==
              this.selectedDate.getMonth() &&
            new Date(e.planned_at.split(" ")[0]).getDate() ==
              this.selectedDate.getDate()
          );
        });
        return data.length>0?data[0]:null;
    },
    shiftDPlanning() {
      if(this.plannings.length==0){
        return null;
      }
      let data= this.plannings
        .filter((e) => {
          return e.shift_id == 4;
        })
        .filter((e) => {
          return e.profile_group_id == this.getSelected_profile_group.id;
        })
        .filter((e) => {
          return (
            new Date(e.planned_at.split(" ")[0]).getFullYear() ==
              this.selectedDate.getFullYear() &&
            new Date(e.planned_at.split(" ")[0]).getMonth() ==
              this.selectedDate.getMonth() &&
            new Date(e.planned_at.split(" ")[0]).getDate() ==
              this.selectedDate.getDate()
          );
        });
        return data.length>0?data[0]:null;
    },
  },
  created() {
    this.setShifts(new Date());
  },
  mounted() {




  },
  methods: {
    ...mapActions([
      "setPlanningByRangeAction",
      "setProfileGroupsAction",
      "SetPlanningByIdAndBoxesAction",
      "setJustCreated",
    ]),
    getShifLetterById(shift_id) {
      if (shift_id == 1) return "A";
      if (shift_id == 2) return "B";
      if (shift_id == 3) return "C";
      if (shift_id == 4) return "D";
    },
    getShifPlanningById(shift_id) {
      if (shift_id == 1) return this.shiftAPlanning;
      if (shift_id == 2) return this.shiftBPlanning;
      if (shift_id == 3) return this.shiftCPlanning;
      if (shift_id == 4) return this.shiftDPlanning;
    },
    getThisPlanning(shift_id,shiftIndex__) {

      let pl = null;
      if (shift_id == 1) pl = this.shiftAPlanning;
      if (shift_id == 2) pl = this.shiftBPlanning;
      if (shift_id == 3) pl = this.shiftCPlanning;
      if (shift_id == 4) pl = this.shiftDPlanning;
      let actualShift = {
        id: shift_id,
        name: this.getShifLetterById(shift_id),
        backgroundColor: "",
        color: "",
      };
      this.setJustCreated(true);
      let selectedDate = new Date(this.selectedDate);
      let selectedPlanning = pl;
      let ShiftIndex = shiftIndex__;
      this.$emit(
        "getCurrentPlanningAndBoxes",
        pl.id,
        actualShift,
        selectedDate,
        selectedPlanning,
        ShiftIndex
      );
    },
    shiftArrays(array) {
      let c = "";
      c = array[3];
      array[3] = array[2];
      array[2] = array[1];
      array[1] = array[0];
      array[0] = c;

      return array;
    },
    setShifts(date) {
      let thisDate = new Date("2022-02-16T07:00:00");
      let thisShifts = [
        {
          id: 4,
          name: "D",
          backgroundColor: "#8B0000",
          color: "white", // Deep Red
        },
        {
          id: 1,
          name: "A",
          backgroundColor: "#4169E1",
          color: "white", // Royal Blue
        },
        {
          id: 2,
          name: "B",
          backgroundColor: "#50C878",
          color: "white", // Emerald Green
        },
        {
          id: 3,
          name: "C",
          backgroundColor: "#C0C0C0",
          color: "black", // Silver
        },
      ];
      let nowDate = new Date(date);
      console.log("ggg :",nowDate);
      let momentDate = moment(thisDate);
      while (momentDate.add(72, "hours").toDate() < nowDate) {
        thisShifts = this.shiftArrays(thisShifts);
      }
      this.shifts = [...thisShifts];
    },
    async onDayClick(test) {
      this.selectedDate = new Date(test.id);
      let attrs = [...this.attributes.filter((e) => e.key == "selected")];
      const hda=await this.$emit("sendNudes",attrs,test);
      return hda;
    },
  },
  props: {
    sendNudes: {
      type: Function,
      required: true,
    },
    setSelectedPlanning: {
      type: Function,
      required: true,
    },
    plannings: {
      type: Array,
      default: () => [] // Use a function to return the default value for array/object type props
    },
    NotwaitLoading: {
      type: Boolean,
      default: () => [] // Use a function to return the default value for array/object type props
    },
    attributes: {
      type: Array,
      default: () => [] // Use a function to return the default value for array/object type props
    }
  },
  watch: {
    // Watcher for the attributes array
    selectedDate: {
      deep: true, // Set deep watch if changes within the array should be detected
      handler(newVal, oldVal) {
        // Handler that runs every time attributes changes

          // Update selectedDate based on some condition
          this.setShifts(this.selectedDate);

      }
    }
  }
};
</script>

<style scoped>
h1 {
  color: #15263f;
}
.full-width {
  width: 100%;
}
.shiftButtons2 {
  margin: 1px;
  border-radius: 5px;
  opacity: 0.9;
  cursor: no-drop;
  position: relative !important;
}
.shiftButtons {
  margin: 1px;
  border-radius: 5px;
  opacity: 0.9;
  cursor: pointer;
  position: relative !important;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.shiftButtons:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}
.shiftButtons:active {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-4px);
}
.shiftButtonsAdd::after {
  content: "\F0415"; /* mdi-left-arrow icon */
  font-family: "Material Design Icons"; /* Ensure this matches your mdi font family */
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 25px; /* Adjust size as necessary */
  font-weight: 100 !important;
}
.shiftButtonsView::after {
  content: "\F13B4"; /* mdi-left-arrow icon */
  font-family: "Material Design Icons"; /* Ensure this matches your mdi font family */
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 25px; /* Adjust size as necessary */
  font-weight: 100 !important;
}
.shiftButtons2::after {
  content: "\F1B94"; /* mdi-left-arrow icon */
  font-family: "Material Design Icons"; /* Ensure this matches your mdi font family */
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 25px; /* Adjust size as necessary */
  font-weight: 100 !important;
}
</style>
