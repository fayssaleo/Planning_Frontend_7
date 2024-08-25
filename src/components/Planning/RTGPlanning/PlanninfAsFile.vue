<template>
  <div class="planningHeader">
    <span class="structureChoice">
      <span class="merged"
      :class="!splited?'mergedClicked':''"
      @click="splited=!splited"
      ></span>
      <span class="splited"
      :class="splited?'splitedClicked':''"
      @click="splited=!splited"
      ></span>

    </span>
    <span class="logoHeader">
      <img style="width: 116px;
    height: 50px;
    opacity: 0.6;
    margin-top: 8px;
    float: left;" src="../../../assets/logo-white.svg">
    </span>
    <div class="shiftHeader">

      SHIFT {{ actualShift.name ? actualShift.name : actualShift.category }} - RTG PLANNING
      <br /><span v-if="ShiftIndex == 0">
        Morning
        <v-icon style="margin-top: 0px">mdi-white-balance-sunny</v-icon></span>
      <span v-if="ShiftIndex == 1">
        Evening
        <v-icon style="margin-top: 0px">mdi-theme-light-dark</v-icon></span>
      <span v-if="ShiftIndex == 2">
        Night <v-icon style="margin-top: 0px">mdi-power-sleep</v-icon></span>



    </div>
    <span class="datePeriode">
      <span> Week {{ getWeekNumber(selectedDate) }} -
        {{ selectedDate.toLocaleDateString('en-US', {
          weekday: 'long', // "Monday"
          year: 'numeric', // "2024"
          month: 'long', // "August"
          day: 'numeric' // "9"
        }).split(",")[0] }}
        <br>{{ selectedDate.toLocaleDateString('en-US', {
          weekday: 'long', // "Monday"
          year: 'numeric', // "2024"
          month: 'long', // "August"
          day: 'numeric' // "9"
        }).split(",")[1] + selectedDate.toLocaleDateString('en-US', {
          weekday: 'long', // "Monday"
          year: 'numeric', // "2024"
          month: 'long', // "August"
          day: 'numeric' // "9"
        }).split(",")[2] }}
      </span>

    </span>

  </div>
  <table class="elevation-1 tableOfThePlanning tableOfThePlanningShow tableOfThePlanningShowInConfirm" style="width: 95%;margin: 0px auto;background-color: #ffffff73;border: 1px solid white;
    border-top: 1px solid #2291c4b3;">

    <thead>
      <tr>
        <th v-for="head in headers" :key="head.title">
          <span>
            {{ head.title }}
          </span>
        </th>
      </tr>
    </thead>


    <tbody>
      <tr class="rowToEdit" v-for="item in thisPlanningBoxes" v-key="item[0].id">
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
          <span class="wh">{{ Math.trunc(item[0]?.workingHours) }}</span>
        </td>
        <td v-for="(itemBox, indexx) in item.slice(1)" :key="itemBox"
          :style="{ display: ch7al3laLisr(itemBox, indexx, item.slice(1)) > 1 ? 'none' : '' }"
          :colspan="ch7al3laLimn(itemBox, indexx, item.slice(1), item[0].id)">
          <span v-if="itemBox == 'P'" class="pause">{{ itemBox }}</span>
          <span v-else-if="itemBox == 'DP'" class="doublePause">{{
            itemBox
          }}</span>
          <span v-else class="workBox">{{ itemBox?.matricule }}</span>
        </td>
      </tr>
    </tbody>

  </table>

</template>

<script>
export default {
  name: "Planning as file",
  props: [
    "actualShift",
    "selectedDate",
    "selectedPlanning",
    "ShiftIndex",
    "headers",
    "thisPlanningBoxes",
  ],
  data() {
    return {
      splited:false,
    };
  },
  computed: {
  },
  methods: {
    ch7al3laLisr(item, indexx, list) {


      let count = 1;
      if(this.splited){
        return count;
      }
      if (indexx == list.length) {
        return count;
      }
      for (let index = indexx - 1; index >= 0; index--) {
        if ((item == 'P' || item == 'DP') && item == list[index]) {
          count++;
        }
        else if ((item != 'P' && item != 'DP') && item?.matricule == list[index]?.matricule) {
          count++;
        }
        else if (count > 0) {
          return count;
        }

      }
      return count;
    },
    ch7al3laLimn(item, indexx, list, driver_id) {

      let count = 1;
      if(this.splited){
        return count;
      }

      for (let index = indexx + 1; index < list.length; index++) {

        if ((item == 'P' || item == 'DP') && item == list[index]) {

          if (indexx == 0 && driver_id == 293) {
            console.log("item", item)
            console.log("indexx", indexx)
            console.log("list", list)
            console.log("list[index]", list[index])
            console.log("index", index)
            console.log("(item=='P' || item=='DP') && item==list[index]", (item == 'P' || item == 'DP') && item == list[index])
          }
          count++;
        }
        else if ((item != 'P' && item != 'DP') && item?.matricule == list[index]?.matricule) {
          count++;
        }
        else {
          return count;
        }


      }
      return count;
    },
    getShiftByIndex(index) {
      if (index == 1) return "A";
      if (index == 2) return "B";
      if (index == 3) return "C";
      if (index == 4) return "D";
    },
    getWeekNumber(d) {
      // Copy date so don't modify original
      d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      // Set to nearest Thursday: current date + 4 - current day number
      // Make Sunday's day number 7
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
      // Get first day of year
      var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      // Calculate full weeks to nearest Thursday
      var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
      return weekNo;
    }
  },
  created() {
    // Add your created hook code here
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.tableOfThePlanning {
  background-color: #cccccc36;
}

.workBox {
  color: white;
  background-color: #0353a4;
  font-family: sans-serif;
  font-size: 132%;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 40px;
  padding-top: 20px;
  border-bottom: 1px solid #ffffffc9;
}

.pause {
  color: white;
  background-color: #7d8597;
  font-family: sans-serif;
  font-size: 132%;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 40px;
  padding-top: 20px;
  border-bottom: 1px solid #ffffffc9;
}

.doublePause {
  color: white;
  background-color: #81a4b1;
  font-family: sans-serif;
  font-size: 132;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 40px;
  padding-top: 20px;
  border-bottom: 1px solid #ffffffc9;
}

.wh {

  color: white;
  background-color: #002855;
  font-family: sans-serif;
  font-size: 132%;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 100%;
  margin-left: 1px;
  margin-right: 1px;
  height: 40px;
  padding-top: 20px;
  border-bottom: 1px solid #ffffffc9;
}

.fullname {
  color: white;
  background-color: #002855;
  font-family: sans-serif;
  font-size: 86%;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 40px;
  padding-top: 4px;
  line-height: 1;
  border-bottom: 1px solid #ffffffc9;
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
  background-color: #35ba94 !important;
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
  left: -3px;
  top: 4px;
  font-size: 10px;
  background-color: #070707 !important;
  padding-left: 4px;
  padding-right: 5px;
  border-radius: 0 0 22px 0;
}

th {

  justify-content: center;
  padding-top: 5px !important;
  color: white !important;
  background-color: #3e92cc !important;
  font-family: sans-serif !important;
  font-size: 108% !important;
  text-align: center !important;
  user-select: none !important;
  font-weight: bold !important;
  height: 40px !important;
  ine-height: 1;


}

.planningHeader {
  width: 95%;
  margin: 0 auto;
  position: sticky;
  top: 0;
  z-index: 5;

  user-select: none;
  display: inline-block;

  height: 100%;
  background-color: #013967 !important;
  color: white;
  text-align: center;
  border: 1px solid white;
  border-bottom: none;
}

.datePeriode,
.shiftHeader,
.logoHeader {
  display: inline-block;
  font-size: 13px;
  font-family: sans-serif;
  font-weight: bold;
  height: 100%
}

.logoHeader {
  width: 20%;
  padding-left: 7px;
}

.datePeriode {
  width: 24%;
  color: rgba(255, 255, 255, 0.7294117647);
  margin-top: 6px;
  font-size: 128%;
  margin-bottom: 16px;
  padding-right: 4px;
}

.shiftHeader {
  width: 56%;
  font-size: 22px;
  padding-bottom: -1px;
  color: white;
}

td {
  height: 21px !important;
}

.tableOfThePlanning:not(.fullname) {
  line-height: 0 !important;
}

.displayNone {
  display: none;
}

.planningHeader {
  position: relative;

  .structureChoice {
    position: absolute;
    top: -2px;
    left: -35px;
    display: inline-block;
    /* width: 110px; */
    text-align: left;
    height: 72px;

    .merged,
    .splited {
      display: block;
      height: 35px;
      width: 35px;
      border: 1px solid white;
      position: relative;
      cursor: pointer;
      user-select: none;

    }
    .merged:hover,
    .splited:hover {
      color: #b0c4da;
    }
    .merged:active,
    .splited:active {
      opacity: 0.8;
    }
    .mergedClicked,
    .splitedClicked {
      color: #1584ff;

    }

    .merged::after {
      content: "\F1AB6" !important;
    font-family: "Material Design Icons" !important;
    position: absolute !important;
    right: 2% !important;
    top: 54% !important;
    transform: translateY(-50%) !important;
    font-size: 31px !important;
    font-weight: 100 !important;
    }

    .splited::after {
      content: "\F02C1" !important;
    font-family: "Material Design Icons" !important;
    position: absolute !important;
    right: 2% !important;
    top: 54% !important;
    transform: translateY(-50%) !important;
    font-size: 31px !important;
    font-weight: 100 !important;
    }
  }

}
</style>
