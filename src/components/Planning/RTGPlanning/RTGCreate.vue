<template>
  <v-row style="width: 98%">
    <v-col class="header" cols="12" style="position: relative">
      <v-btn @click="goBackToSelectPlanning()" density="default" style="
          color: #000000cc;
          width: 60px;
          float: left;
          position: absolute;
          top: 13px;
          height: 43px;
          font-size: 31px;
          left: 0px;
        "><v-icon style="margin-top: -3px">mdi-arrow-left-circle</v-icon></v-btn>
      <h2>Selected Shift: {{ actualShift.name }}</h2>
      <h3>
        Selected Date:
        {{ selectedDate.toLocaleDateString() + " - " }}
        <span v-if="ShiftIndex == 0">
          Morning
          <v-icon style="margin-top: -3px">mdi-white-balance-sunny</v-icon></span>
        <span v-if="ShiftIndex == 1">
          Evening
          <v-icon style="margin-top: -3px">mdi-theme-light-dark</v-icon></span>
        <span v-if="ShiftIndex == 2">
          Night <v-icon style="margin-top: -3px">mdi-power-sleep</v-icon></span>
      </h3>
      <v-btn @click="openConfirmDialog" density="default" style="
          background-color: rgb(21, 38, 63);
          color: white;
          width: 120px;
          float: right;
          position: absolute;
          right: 0px;
          top: 2px;
          height: 62px;
          font-size: 18px;
        ">Create</v-btn>
    </v-col>
    <v-row class="mt-0">
      <v-col cols="6" class="block">
        <v-row>
          <v-col cols="12" class="ma-0 pa-0">
            <v-row class="tableHeader">
              <v-col class="driverListTitle">Driver list : </v-col>
              <v-col>
                <span class="selectAll" :class="driversList.filter((e) => e.selected).length ==
                  driversList.length
                  ? 'CheckedButtonSelected'
                  : 'CheckedButtonNotSelected'
                  " @click="selectAllClick">
                  Select All ({{
                    driversList.filter((e) => e.selected).length
                  }})
                </span>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" style="border-top: 1px solid #4f7cac">
            <v-row style="padding: 1px; overflow: hidden;" class="mt-2 driverLst">
              <v-col cols="1" md="3" sm="3" v-for="driver in driversList" :key="driver.id">
                <span class="CheckedButton" :class="driver.selected
                  ? 'CheckedButtonSelected'
                  : 'CheckedButtonNotSelected'
                  " @click="driver.selected = !driver.selected">{{
                    driver.firstname[0].toUpperCase() +
                    driver.firstname.slice(1)
                  }}<br />
                  {{ driver.lastname.toUpperCase() }} <br />
                  <span style="font-weight: bold; font-size: 14px">({{ Math.trunc(driver.workingHours) }}wh)</span></span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" class="block" v-if="getSelected_profile_group.id == 1">
        <v-row>
          <v-col cols="12" class="ma-0 pa-0">
            <v-row class="tableHeader">
              <v-col class="EquipmentListTitle">Equipment list : </v-col>
              <v-col>
                <span class="selectAll" :class="equipmentList.filter((e) => e.selected).length ==
                  equipmentList.length
                  ? 'CheckedButtonSelectedEquipment'
                  : 'CheckedButtonNotSelected'
                  " @click="selectAllClick2">
                  Select All ({{
                    equipmentList.filter((e) => e.selected).length
                  }})
                </span>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" style="border-top: 1px solid #4f7cac">
            <v-row style="padding: 1px; overflow: hidden;" class="mt-2 driverLst">
              <v-col cols="1" md="3" sm="3" v-for="equipment in equipmentList" :key="equipment.id">
                <span class="CheckedButton" :class="equipment.selected
                  ? 'CheckedButtonSelectedEquipment'
                  : 'CheckedButtonNotSelected'
                  " @click="equipment.selected = !equipment.selected">{{ equipment.matricule }}</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" class="block" v-if="getSelected_profile_group.id == 2">
        <v-row>
          <v-col cols="12" class="ma-0 pa-0">
            <v-row class="tableHeader">
              <v-col class="EquipmentListTitle">STS list : </v-col>
              <v-col>
                <span class="selectAll" :class="equipmentList.filter((e) => e.selected).length ==
                  equipmentList.length
                  ? 'CheckedButtonSelectedEquipment'
                  : 'CheckedButtonNotSelected'
                  " @click="selectAllClick2">
                  Select All ({{
                    equipmentList.filter((e) => e.selected).length
                  }})
                </span>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" style="border-top: 1px solid #4f7cac">
            <v-row style="padding: 1px;    overflow: hidden;" class="mt-2 driverLst">
              <table class="timesTable">
                <tbody>

                  <tr v-for="equipment in equipmentList" :key="equipment.id">

                    <td>
                      <span class="CheckedButton timeequipment" :class="equipment.selected
                        ? 'CheckedButtonSelectedEquipment'
                        : 'CheckedButtonNotSelected'
                        " @click="equipment.selected = !equipment.selected">{{ equipment.matricule }}</span>
                    </td>
                    <td><span class="timeClick" :class="equipment.equipmentTimesSelected[0] ? 'timeClickClicked' : ''"
                        @click="equipment.equipmentTimesSelected[0] = !equipment.equipmentTimesSelected[0]">{{ shift__times[0] }}</span></td>
                    <td><span class="timeClick" :class="equipment.equipmentTimesSelected[1] ? 'timeClickClicked' : ''"
                        @click="equipment.equipmentTimesSelected[1] = !equipment.equipmentTimesSelected[1]">{{ shift__times[1] }}</span></td>
                    <td><span class="timeClick" :class="equipment.equipmentTimesSelected[2] ? 'timeClickClicked' : ''"
                        @click="equipment.equipmentTimesSelected[2] = !equipment.equipmentTimesSelected[2]">{{ shift__times[2] }}</span></td>
                    <td><span class="timeClick" :class="equipment.equipmentTimesSelected[3] ? 'timeClickClicked' : ''"
                        @click="equipment.equipmentTimesSelected[3] = !equipment.equipmentTimesSelected[3]">{{ shift__times[3] }}</span></td>
                    <td><span class="timeClick" :class="equipment.equipmentTimesSelected[4] ? 'timeClickClicked' : ''"
                        @click="equipment.equipmentTimesSelected[4] = !equipment.equipmentTimesSelected[4]">{{ shift__times[4] }}</span></td>
                    <td><span class="timeClick" :class="equipment.equipmentTimesSelected[5] ? 'timeClickClicked' : ''"
                        @click="equipment.equipmentTimesSelected[5] = !equipment.equipmentTimesSelected[5]">{{ shift__times[5] }}</span></td>
                    <td><span class="timeClick" :class="equipment.equipmentTimesSelected[6] ? 'timeClickClicked' : ''"
                        @click="equipment.equipmentTimesSelected[6] = !equipment.equipmentTimesSelected[6]">{{ shift__times[6] }}</span></td>
                    <td><span class="timeClick" :class="equipment.equipmentTimesSelected[7] ? 'timeClickClicked' : ''"
                        @click="equipment.equipmentTimesSelected[7] = !equipment.equipmentTimesSelected[7]" style="border-radius: 0 10px 10px 0">{{ shift__times[7] }}</span></td>
                    <td v-if="false"><span class="timeClick" :class="equipment.equipmentTimesSelected[7] ? 'timeClickClicked' : ''"
                        @click="equipment.equipmentTimesSelected[7] = !equipment.equipmentTimesSelected[7]" style="    margin-top: 7px;"></span></td>
                  </tr>
                </tbody>
              </table>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <ConfirmDialog2 equipementType="RTG" v-model="showConfirmDialog"
      :driverCount="driversList.filter((e) => e.selected).length"
      :equipmentCount="equipmentList.filter((e) => e.selected).length"
      @removeDriver="removeDriver"
      @removeEquipement="removeEquipement"
      @validateSelections="validateSelections"
      :selectedDrivers="driversList"
      :equipmentList="equipmentList"
      :shift__times="shift__times"
      :selected_profile_group="getSelected_profile_group"
      @closeDialog="showConfirmDialog = false"
       />
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  name: "RTG Create Planning",
  emits: ['showNotificationClassSuccess', 'showNotificationClassFailed',"clearPlannings"],
  //props
  props: ["actualShift", "selectedDate", "ShiftIndex"],

  //data
  data() {
    return {
      showConfirmDialog: false,
      driversList: [],
      equipmentList: [],
      shift__times: [
      ],
    };
  },

  // computed
  computed: {
    ...mapGetters(["getDrivers", "getEquipements", "getSelected_profile_group"]),
    getShiftPeriode() {
      if (this.ShiftIndex == 0) return "Morning";
      if (this.ShiftIndex == 1) return "Evening";
      if (this.ShiftIndex == 2) return "Night";
    },
  },

  //mounted
  mounted() {

    this.shift__times=this.getShiftIntervals(this.ShiftIndex);
    this.setDrivers2Action({
      shift_id: this.actualShift.id,
      role_id: 2,
      profile_group: this.getSelected_profile_group.id,
    }).then((e) => {
      this.driversList = [...this.getDrivers];
      this.driversList = this.driversList.map((e) => {
        e.selected = true;
        return e;
      });
    });
    this.setEquipementsByProfileGroupAction({
      profile_group_id: this.getSelected_profile_group.id,
    }).then((e) => {
      this.equipmentList = [...this.getEquipements];
      this.equipmentList = this.equipmentList.map((e) => {
        e.selected = true;
        e.equipmentTimesSelected = [
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
        ];
        return e;
      });
    });
  },

  // methods
  methods: {
    ...mapActions(["setDrivers2Action", "setEquipementsByProfileGroupAction", "clearPlanning_new"]),
    getShiftIntervals(shiftIndex) {
      let headers = [];
      if (shiftIndex == 0) {
        headers = [
            "07:00-08:00",
            "08:00-09:00",
            "09:00-10:00",
            "10:00-11:00",
            "11:00-12:00",
            "12:00-13:00",
            "13:00-14:00",
            "14:00-15:00",
        ];
      }
      else if (shiftIndex == 1) {
        headers = [
          "15:00-16:00",
          "16:00-17:00",
          "17:00-18:00",
          "18:00-19:00",
          "19:00-20:00",
          "20:00-21:00",
          "21:00-22:00",
          "22:00-23:00",
        ];
      }
      else if (shiftIndex == 2) {
        headers = [
            "23:00-00:00",
            "00:00-01:00",
            "01:00-02:00",
            "02:00-03:00",
            "03:00-04:00",
            "04:00-05:00",
            "05:00-06:00",
            "06:00-07:00",
        ];
      }
      return headers;
    },
    selectAllClick() {
      if (
        this.driversList.filter((e) => e.selected).length <
        this.driversList.length
      ) {
        this.driversList = this.driversList.map((e) => {
          e.selected = true;
          return e;
        });
      } else {
        this.driversList = this.driversList.map((e) => {
          e.selected = false;
          return e;
        });
      }
    },
    selectAllClick2() {
      if (
        this.equipmentList.filter((e) => e.selected).length <
        this.equipmentList.length
      ) {
        this.equipmentList = this.equipmentList.map((e) => {
          e.selected = true;
          return e;
        });
      } else {
        this.equipmentList = this.equipmentList.map((e) => {
          e.selected = false;
          return e;
        });
      }
    },
    removeDriver(driver) {
      this.driversList = this.selectedDrivers.filter(
        (item) => item.id !== driver.id
      );
    },
    //remove rtg from confirm dialog
    removeEquipement(equ) {
      this.equipmentList = this.equipmentList.filter(
        (item) => item.id !== equ.id
      );
    },
    openConfirmDialog() {
      this.showConfirmDialog = true;
    },
    validateSelections() {
      console.log("mn vali,", this.equipmentList.filter((e) => e.selected))
      let payload = {
        driversList: this.driversList.filter((e) => e.selected),
        equipmentList: this.equipmentList.filter((e) => e.selected),
        selectedDate: this.selectedDate,
      };
      this.$emit("createPlanning", payload);
    },
    goBackToSelectPlanning() {
      this.$emit("clearPlannings");
      this.clearPlanning_new();

    }
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  background-color: #f5f5f5;
  /* Light gray background */
  border-bottom: 2px solid #4f7cac;
  /* Bottom border */
  padding: 5px 10px;
  /* Padding for spacing */
  text-align: center;
  /* Center align the text */
  font-size: 15px;
  /* Increase font size */
  font-weight: bold;
  /* Bold text */
  margin-bottom: 0.2rem;
  /* Space below the header */
}

.block {
  border: 1px solid #4f7cac;
  margin-top: 5px;
}

.selectAll {
  display: inline-block;
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  border-radius: 9px;
  cursor: pointer;
  user-select: none;
  max-height: 62px;
  /* position: relative; */
  float: right;
  margin-right: 40px;
  width: 200px;
  height: 29px;
  margin-top: 4px;
  margin-right: 5px;
  padding-top: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.selectAll:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.selectAll:active {
  transform: translateY(-6px);
}

.CheckedButton {
  padding-top: 3px;
  color: white;
  font-family: sans-serif;
  font-size: 17px;
  text-align: center;
  border-radius: 9px;
  cursor: pointer;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  margin-top: -12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.CheckedSelectButtonSelected {
  background-color: #4169e1;
}

.CheckedSelectButtonNotSelected {
  color: rgb(196 113 113);
  border: 1px solid rgb(196 113 113);
}

.CheckedButtonSelected {
  background-color: #4169e1;
}

.CheckedButtonSelectedEquipment {
  background-color: #52ad9c;
}

.CheckedButtonNotSelected {
  color: rgb(196 113 113);
  border: 2px solid rgb(196 113 113);
}

.CheckedButton:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.CheckedButton:active {
  transform: translateY(-6px);
}

.driverLst {
  padding: 1px;
  max-height: 727px;
  overflow: scroll;
}

.tableHeader {
  height: 60px;
}

.driverListTitle {
  font-size: 26px;
  color: #4f7cac;
  margin-left: 13px;
  font-weight: bold;
  position: relative;
}

.EquipmentListTitle {
  font-size: 26px;
  color: #4f7cac;
  margin-left: 13px;
  font-weight: bold;
  position: relative;
}

.driverListTitle::after {
  content: "\F05D2";
  /* mdi-left-arrow icon */
  font-family: "Material Design Icons";
  /* Ensure this matches your mdi font family */
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 25px;
  /* Adjust size as necessary */
  font-weight: 100 !important;
}

.EquipmentListTitle::after {
  content: "\F0DD1";
  /* mdi-left-arrow icon */
  font-family: "Material Design Icons";
  /* Ensure this matches your mdi font family */
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 25px;
  /* Adjust size as necessary */
  font-weight: 100 !important;
}

.timesTable {
  width: 100%;
  user-select: none;
  border: none;
  *{
    border: none;
  }
  th{
    background-color: #52ad9c;
    color: white;
    user-select: none;
  }
  td{
    height: 25px;
    width: 25px;
  }
  span{
    height: 100%;
    width: 100%;
    user-select: none;
  }
  .timeClick {
    background-color: #ad6a52;
        display: inline-block;
        height: 37px;
        padding-top: 12px;
        font-size: 11px;
        color: white;
        text-align: center;
        font-weight: 700;
        margin: 0;
        width: 100%;

  }

  .timeClickClicked {
    background-color: #52ad9c;
  }
  .CheckedButton {
    height: 37px;
    padding-top: 7px;
    margin-top: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

}
</style>
