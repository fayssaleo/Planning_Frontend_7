<template v-slot:text>
  <v-row style="width: 100%;height: 79vh;" class="mt-0">
    <v-data-table :headers="headers" :items="thisPlanningBoxes"
      class="elevation-1 tableOfThePlanning tableOfThePlanningShow tableOfThePlanningShowInConfirm" hide-default-footer
      :items-per-page="thisPlanningBoxes.length" style="width: 95%; margin: 0 auto">
      <template v-slot:thead>
        <thead>
          <tr v-if="showOutToBeInserted" class="addDriverButtonClickableCase">
            <th class="py-0 px-0">
              <span class="addDriverButton fullname x" @click="openEditDriversEquipmentsDialog" style="
                  position: relative;
                  margin: 0;
                  padding: 0;
                  padding-top: 16px;
                ">
                <span style="display: none">EDIT:</span>
                <v-icon class="thisIcon" style="margin-left: 12px">mdi-account-group</v-icon>
                <v-icon class="thisIcon">mdi-slash-forward</v-icon>
                <v-icon class="thisIcon">mdi-gantry-crane</v-icon>
              </span>
            </th>
            <th style="
              background-color: rgb(0, 40, 85) !important;
              border-bottom: 1px solid #ffffff52;
              border-right: 1px solid #ffffff52;
              border-bottom: none !important;
              border-left: 1px solid #ffffff52;
              ">
            </th>
            <th v-for="(outs, index) in ThisOutToBeInserted" :key="index"
              style="position: relative; margin: 0; padding: 0;">
              <span class="selectEquipButton fullname" :class="[
                outs.list.length > 0 ? 'outEquipmentToBeInserted' : '',
                outs.checked ? 'selectEquipButtonSelected' : '',

              ]" style=" padding-top: 16px; " @click="outs.checked = !outs.checked"> OUT ({{ outs.list.length }})
                <span v-if="outs.list.length > 0" class="equipemntOuts">
                  <span v-for="(outItem, index2) in outs.list" :key="index + index2" class="equipmentOutOne">
                    {{ outItem.matricule }}
                  </span>
                </span>
              </span>
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:item="{ item }">
        <tr class="rowToEdit">
          <td width="15%">
            <span class="fullname" :class="item[0]?.shift_id != actualShift?.id ? 'otherShiftBox' : ''"
              style="position: relative">{{
                item[0]?.matricule +
                ": " +
                item[0]?.firstname[0].toUpperCase() +
                item[0]?.firstname.slice(1)
              }}<br />
              {{ item[0]?.lastname.toUpperCase() }}
              <span class="otherShift" v-if="item[0]?.shift_id != actualShift?.id">{{ getShiftByIndex(item[0]?.shift_id)
                }}</span>
            </span>
          </td>
          <td width="5%">
            <span class="wh">{{ item[0]?.workingHours }}</span>
          </td>
          <td v-for="itemBox in item.slice(1)" :key="itemBox">
            <span v-if="itemBox == 'P'" class="pause">{{ itemBox }}</span>
            <span v-else-if="itemBox == 'DP'" class="doublePause">{{
              itemBox
            }}</span>
            <span v-else class="workBox">{{ itemBox.matricule }}</span>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-row>
</template>

<script>
export default {
  name: "RTG Confirm Planning",
  props: [
    "actualShift",
    "selectedDate",
    "selectedPlanning",
    "planningBoxes",
    "ShiftIndex",
    "ifCheckEditedPlanning",
    "reloadPlanning",
    "checkEditedPlanning",
    "tempPlanning_forShow",
    "ThisOutToBeInserted",
    "getThisOutToBeInserted",
  ],
  data() {
    return {
      thisPlanningBoxes: [],
      headers: [],
    };
  },
  computed: {
    showOutToBeInserted() {
      return this.ThisOutToBeInserted.filter((e) => e.list.length > 0).length > 0;
    }
  },
  methods: {
    getShiftByIndex(index) {
      if (index == 1) return "A";
      if (index == 2) return "B";
      if (index == 3) return "C";
      if (index == 4) return "D";
    },
  },
  created() {
    // Add your created hook code here
  },
  mounted() {
    this.headers = [];
    this.headers.push({
      text: this.planningBoxes[0][0],
      sortable: false,
      key: "driver",
      align: "start",
      title: this.planningBoxes[0][0],
    });
    this.headers.push({
      text: "WH",
      sortable: true,
      key: "driver",
      align: "start",
      title: "WH",
      value: "workingHours",
    });
    if (this.ifCheckEditedPlanning) {
      if (this.reloadPlanning) {
        console.log("this.checkEditedPlanning :",this.checkEditedPlanning)
        this.thisPlanningBoxes = this.checkEditedPlanning.slice(1).map((e) => {
          e.workingHours = e[0].workingHours;
          return e;
        });
        for (let index = 1; index < this.checkEditedPlanning[0].length; index++) {
          this.headers.push({
            text: this.checkEditedPlanning[0][index].title!=null?this.checkEditedPlanning[0][index].title:this.checkEditedPlanning[0][index],
            sortable: false,
            key: index + this.checkEditedPlanning[0][index].title!=null?this.checkEditedPlanning[0][index].title:this.checkEditedPlanning[0][index],
            align: "start",
            title: this.checkEditedPlanning[0][index].title!=null?this.checkEditedPlanning[0][index].title:this.checkEditedPlanning[0][index],
          });
        }

      }
      else {
        this.thisPlanningBoxes = this.tempPlanning_forShow.map((e) => {
          e.workingHours = e[0].workingHours;
          return e;
        });
        for (let index = 1; index < this.planningBoxes[0].length; index++) {
          this.headers.push({
            text: this.planningBoxes[0][index].title!=null?this.planningBoxes[0][index].title:this.planningBoxes[0][index],
            sortable: false,
            key: index + this.planningBoxes[0][index].title!=null?this.planningBoxes[0][index].title:this.planningBoxes[0][index],
            align: "start",
            title: this.planningBoxes[0][index].title!=null?this.planningBoxes[0][index].title:this.planningBoxes[0][index],
          });
        }

      }
    }
    else {
      this.thisPlanningBoxes = this.planningBoxes.slice(1).map((e) => {
        e.workingHours = e[0].workingHours;
        return e;
      });
      for (let index = 1; index < this.planningBoxes[0].length; index++) {
        this.headers.push({
          text: this.planningBoxes[0][index].title!=null?this.planningBoxes[0][index].title:this.planningBoxes[0][index],
          sortable: false,
          key: index + this.planningBoxes[0][index].title!=null?this.planningBoxes[0][index].title:this.planningBoxes[0][index],
          align: "start",
          title: this.planningBoxes[0][index].title!=null?this.planningBoxes[0][index].title:this.planningBoxes[0][index],
        });
      }
    }


  },
  watch: {
    // Add your watchers here
  },
  components: {
    // Add your child components here
  },
};
</script>

<style lang="scss" scoped>
.tableOfThePlanning {
  background-color: #cccccc36;
}

.workBox {
  padding-top: 16px;
  color: white;
  background-color: #0353a4;
  font-family: sans-serif;
  font-size: 17px;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 100%;
}

.pause {
  padding-top: 16px;
  color: white;
  background-color: #7d8597;
  font-family: sans-serif;
  font-size: 17px;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 100%;
}

.doublePause {
  padding-top: 16px;
  color: white;
  background-color: #81a4b1;
  font-family: sans-serif;
  font-size: 17px;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 100%;
}

.wh {
  padding-top: 16px;
  color: white;
  background-color: #002855;
  font-family: sans-serif;
  font-size: 17px;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 100%;
  margin-left: 1px;
  margin-right: 1px;
}

.fullname {
  padding-top: 5px;
  color: white;
  background-color: #002855;
  font-family: sans-serif;
  font-size: 13px;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 100%;
}

.saveButtonBar {
  color: white;
  background-color: #bec2c5;
  font-family: sans-serif;
  font-size: 13px;
  user-select: none;
  font-weight: bold;
  width: 90%;
  margin: 0 auto;
}

.saveButton {
  background-color: #4f7cac;
  color: white;
  width: 168px;
  float: right;
  position: absolute;
  right: 7px;
  top: 4px;
  font-size: 18px;
}

td {
  padding: 0 !important;
  text-align: center;
}

.rowToEdit td:nth-child(2) span {
  width: 98%;
}

.header {
  color: white;
  background-color: gray;
  font-family: sans-serif;
  font-size: 13px;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 100%;
}

.addDriverButton {
  display: inline-block;
  width: 100%;
  text-align: center;
  padding-top: 19px;
  background-color: #000000eb !important;
  font-size: 15px !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;

  i {
    font-size: 18px;
    margin-left: 0px;
    padding-bottom: 5px;
  }
}



.selectEquipButton::after {
  content: "\F17A4" !important;
  /* mdi-left-arrow icon */
  font-family: "Material Design Icons" !important;
  /* Ensure this matches your mdi font family */
  position: absolute !important;
  right: 10% !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  font-size: 18px !important;
  /* Adjust size as necessary */
  font-weight: 700 !important;
}

.selectEquipButtonSelected::after {
  content: "\F17BF" !important;
  /* mdi-left-arrow icon */
  font-family: "Material Design Icons" !important;
  /* Ensure this matches your mdi font family */
  position: absolute !important;
  right: 10% !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  font-size: 18px !important;
  /* Adjust size as necessary */
  font-weight: 700 !important;
}

.outEquipmentToBeInserted {
  background-color: #852121 !important;
  border-bottom: none;
  border-right: 1px solid rgba(255, 255, 255, 0.32);
  border-left: 1px solid rgba(255, 255, 255, 0.32);
  transition: all 0.7s ease;
  position: relative;


  .equipemntOuts {
    display: inline-block;
    width: 100%;
    position: absolute;
    bottom: 0;
    display: inline-block;
    width: 100%;
    position: absolute;
    /* bottom: 0; */
    top: 100%;
    left: 0;
    z-index: 1000000000000;
    height: 0px;
    overflow: hidden;
    transition: all 0.7s ease;

    .equipmentOutOne {
      display: block;
      padding-top: 9px;
      color: white;
      font-family: sans-serif;
      font-size: 17px;
      text-align: center;
      user-select: none;
      position: relative;
      width: 100%;
      font-weight: bold;
      height: 0px;
      transition: all 0.7s ease;
      cursor: auto;
      border-bottom: 1px solid #ffffff54;
    }

  }

}

.selectEquipButtonSelected {
  .equipemntOuts {

    height: fit-content !important;
    background-color: #2a0d0bdb;

    .equipmentOutOne {
      height: 44px;


    }


  }
}

.outEquipmentToBeInserted:hover {
  background-color: #cb4646 !important;

  cursor: pointer;
}

.outEquipmentToBeInserted:active {
  background-color: #814444 !important;

}

.otherShiftBox {
  background-color: #6493cb !important;
}
.otherShiftBox {
  background-color: #6493cb !important;
}
.otherShift {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 17px;
  background-color: #002855;
  padding-left: 4px;
  padding-right: 5px;
  border-radius: 0 0 22px 0;
}
</style>
