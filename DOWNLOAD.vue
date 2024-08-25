<template>
  <div class="planningHeader"
  style="    width: 99%;
    margin: 0 auto;
    margin-top: 3px;"
  >
  <span class="structureChoice">
      <span class="merged"
      :class="!splited?'mergedClicked':''"
      @click="splitClicked"
      ></span>
      <span class="splited"
      :class="splited?'splitedClicked':''"
      @click="splitClicked"
      ></span>

    </span>
    <span class="logoHeader">
      <svg data-v-3b40f5cf="" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 105 50" xml:space="preserve"
        style="height: 36px;float: left;fill: #ffffffc7 !important;">
        <g data-v-3b40f5cf="">
          <path class="st0" d="M3.5,0.7c0,0,1,2.3,2.2,5L8,10.7l-4,0c-2.2,0-4,0.1-4,0.1c0,0.1,0.7,1.3,1.5,2.7L3,16.1l3.8,0h3.8l0.2,0.3
		c0.1,0.2,3.3,7.5,7.2,16.3s7.1,16.1,7.2,16.3l0.1,0.3l7.2,0l7.2,0l5.8-12.7c3.2-7,5.8-12.7,5.8-12.7c0.1,0,4.4,9.7,4.4,9.9
		c0,0-1.8,0.1-4,0.1c-2.3,0-4,0-4,0.1c0,0.1,0.7,1.6,1.6,3.4l1.6,3.3l1.4,0c0.8,0,2.7,0,4.2,0.1l2.8,0.1l1.8,4.3l1.8,4.3l3.7,0
		c2,0,3.7,0,3.7-0.1c0-0.1-3.1-7-6.9-15.5l-6.9-15.4l-5.4,0l-5.4,0L39,33.6C35.4,42.1,32.4,49,32.3,49C32.3,49,17.7,16,17.7,15.8
		c0-0.1,16.6-0.1,36.8-0.1l36.8,0l-1.1-2.6l-1.1-2.6L87,10.4c-1.3,0-10.4-0.1-20.4-0.1c-10,0-25.6-0.1-34.8-0.1L15,10.2l-2.2-4.8
		l-2.2-4.8l-3.6,0C5.1,0.6,3.5,0.7,3.5,0.7z" data-v-3b40f5cf=""></path>
          <path class="st0" d="M61.8,18.4c0,0.1,1.7,3.8,3.6,8.2l3.6,8h3.7c3.5,0,3.7,0,3.6-0.2c0-0.1-1.7-3.8-3.7-8.2l-3.6-8h-3.6
		C62.2,18.3,61.8,18.3,61.8,18.4z" data-v-3b40f5cf=""></path>
          <path class="st0"
            d="M77.1,26.4l3.6,8.2l3.7,0c2,0,3.7,0,3.7,0s-1.6-3.7-3.6-8.2l-3.6-8.1l-3.6,0l-3.6,0L77.1,26.4z"
            data-v-3b40f5cf=""></path>
          <path class="st0"
            d="M88.4,26.4l3.6,8.2l3.7,0c2,0,3.7,0,3.7,0s-1.6-3.7-3.6-8.2l-3.6-8.1l-3.6,0l-3.6,0L88.4,26.4z"
            data-v-3b40f5cf=""></path>
          <path class="st0" d="M73.7,39.1c0,0.3,0,0.4-0.4,0.4c-0.3,0-0.4,0-0.4,0.2s0.1,0.2,0.4,0.2h0.4V41c0,1.4,0.1,1.5,1.3,1.5
		c0.9,0,1.1-0.2,1.2-0.8c0.1-0.4,0-0.5-0.2-0.4c-0.1,0-0.2,0.1-0.3,0.3s-0.1,0.3-0.2,0.4c-0.2,0.2-1.1,0.2-1.3,0
		c-0.1-0.1-0.1-0.5-0.1-1.1v-0.9h1c0.9,0,1,0,1-0.2s-0.1-0.2-1-0.2h-1v-0.4c0-0.3,0-0.4-0.2-0.4S73.7,38.8,73.7,39.1z"
            data-v-3b40f5cf=""></path>
          <path class="st0" d="M77.7,39.4c-0.3,0.1-0.7,0.4-0.7,0.6c0,0.2,0.6,0.1,0.7-0.1c0-0.1,0.3-0.2,1-0.2c1,0,1.2,0.1,1.4,0.8
		C80,41,80,41,79.7,40.9c-0.2,0-0.8-0.1-1.3-0.1c-1.2,0-1.5,0.2-1.5,0.9c0,0.6,0.3,0.8,1.4,0.9c0.7,0,0.9,0,1.3-0.1
		c0.3-0.1,0.4-0.2,0.5-0.1c0,0.1,0.1,0.1,0.3,0.1c0.2,0,0.2-0.1,0.2-1c0-1.1-0.2-1.7-0.5-2C79.7,39.4,78.1,39.3,77.7,39.4z
		 M79.8,41.5l0.3,0.2L79.8,42c-0.2,0.2-0.5,0.2-1.1,0.2c-0.9,0-1.3-0.1-1.3-0.5c0-0.4,0.3-0.5,1.2-0.5
		C79.3,41.2,79.6,41.3,79.8,41.5z" data-v-3b40f5cf=""></path>
          <path class="st0" d="M82.4,39.4c-0.2,0-0.4,0.2-0.6,0.2c-0.2,0.1-0.3,0.1-0.3,0c0-0.1-0.1-0.2-0.2-0.2c-0.2,0-0.2,0.1-0.2,1.6
		c0,1.5,0,1.6,0.2,1.6s0.2-0.1,0.2-1.1c0-1,0-1.1,0.3-1.4c0.3-0.3,0.4-0.3,1.1-0.3c0.7,0,0.8,0,1,0.3c0.2,0.3,0.3,0.5,0.3,1.4
		c0,1,0,1.1,0.2,1.1c0.2,0,0.2-0.1,0.2-1.3c0-1.1,0-1.3-0.3-1.6c-0.2-0.3-0.4-0.3-1-0.4C83.1,39.3,82.6,39.3,82.4,39.4z"
            data-v-3b40f5cf=""></path>
          <path class="st0" d="M86.4,39.4c-0.5,0.1-0.7,0.2-0.9,0.7c-0.3,0.8-0.1,2,0.4,2.3c0.4,0.3,1.8,0.4,2.3,0.1c0.4-0.2,0.5-0.2,0.5,0
		c0,0.4-0.5,0.6-1.5,0.6c-0.5,0-1-0.1-1-0.1c-0.1-0.2-0.6-0.1-0.5,0.1c0.1,0.3,0.9,0.6,1.9,0.5c1.6-0.1,1.7-0.4,1.7-2.7
		c0-1.4,0-1.5-0.2-1.5c-0.1,0-0.2,0-0.2,0.1c0,0.1-0.2,0-0.5-0.1C87.8,39.3,87,39.3,86.4,39.4z M88.4,40c0.2,0.2,0.3,0.3,0.3,1
		c0,1-0.2,1.2-1.4,1.2S85.9,42,85.9,41c0-0.6,0-0.8,0.3-1C86.6,39.7,88,39.7,88.4,40z" data-v-3b40f5cf=""></path>
          <path class="st0"
            d="M90.9,39.4c-0.5,0.1-0.8,0.5-0.9,1.2c-0.2,1.3,0.2,1.9,1.3,2.1c1.2,0.2,2.3-0.1,2.3-0.6c0-0.2-0.3-0.2-0.6,0
		c-0.1,0.1-0.5,0.2-1.1,0.2c-1,0-1.3-0.2-1.4-0.8l-0.1-0.3h1.6h1.6v-0.5C93.5,39.6,92.4,39.1,90.9,39.4z M92.8,40
		c0.1,0.1,0.2,0.4,0.2,0.5c0,0.2-0.1,0.2-1.4,0.2c-1.3,0-1.3,0-1.3-0.3c0.1-0.5,0.5-0.7,1.4-0.7C92.4,39.8,92.6,39.8,92.8,40z"
            data-v-3b40f5cf=""></path>
          <path class="st0" d="M95.2,39.5c-0.4,0.2-0.5,0.2-0.5,0.1c0-0.1-0.1-0.2-0.2-0.2c-0.2,0-0.2,0.1-0.2,1.6c0,1.5,0,1.6,0.2,1.6
		s0.2-0.1,0.2-1.2c0-1.5,0.1-1.7,1.3-1.6c0.6,0,0.8,0.1,0.9,0.3c0.1,0.2,0.2,0.3,0.3,0.3c0.3,0,0.3,0,0.1-0.5
		C97.1,39.3,96,39.1,95.2,39.5z" data-v-3b40f5cf=""></path>
          <path class="st0" d="M83.8,47.1v2.1h0.3h0.3v-2.1V45h-0.3h-0.3V47.1z" data-v-3b40f5cf=""></path>
          <path class="st0" d="M85.4,47.1v2.1h0.3H86v-2.1V45h-0.3h-0.3V47.1z" data-v-3b40f5cf=""></path>
          <path class="st0"
            d="M87,45.3c0,0.2,0.1,0.2,0.3,0.2c0.2,0,0.3-0.1,0.3-0.2S87.5,45,87.3,45C87,45,87,45.1,87,45.3z"
            data-v-3b40f5cf=""></path>
          <path class="st0" d="M80.1,46.1c-0.3,0.1-0.7,0.4-0.7,0.6c0,0.2,0.6,0.1,0.7-0.1c0-0.1,0.3-0.2,1-0.2c1,0,1.2,0.1,1.4,0.8
		c0.1,0.4,0.1,0.4-0.3,0.3c-0.2,0-0.8-0.1-1.3-0.1c-1.2,0-1.5,0.2-1.5,0.9c0,0.6,0.3,0.8,1.4,0.9c0.7,0,0.9,0,1.3-0.1
		c0.3-0.1,0.4-0.2,0.5-0.1c0,0.1,0.1,0.1,0.3,0.1c0.2,0,0.2-0.1,0.2-1c0-1.1-0.2-1.7-0.5-2C82.2,46.1,80.6,46,80.1,46.1z M82.2,48.2
		l0.3,0.2l-0.3,0.2c-0.2,0.2-0.5,0.2-1.1,0.2c-0.9,0-1.3-0.1-1.3-0.5c0-0.4,0.3-0.5,1.2-0.5C81.8,47.9,82,48,82.2,48.2z"
            data-v-3b40f5cf=""></path>
          <path class="st0" d="M89.2,46.1c-0.3,0.1-0.7,0.4-0.7,0.6c0,0.2,0.6,0.1,0.7-0.1c0-0.1,0.3-0.2,1-0.2c1,0,1.2,0.1,1.4,0.8
		c0.1,0.4,0.1,0.4-0.3,0.3c-0.2,0-0.8-0.1-1.3-0.1c-1.2,0-1.5,0.2-1.5,0.9c0,0.6,0.3,0.8,1.4,0.9c0.7,0,0.9,0,1.3-0.1
		c0.3-0.1,0.4-0.2,0.5-0.1c0,0.1,0.1,0.1,0.3,0.1c0.2,0,0.2-0.1,0.2-1c0-1.1-0.2-1.7-0.5-2C91.3,46.1,89.7,46,89.2,46.1z M91.3,48.2
		l0.3,0.2l-0.3,0.2c-0.2,0.2-0.5,0.2-1.1,0.2c-0.9,0-1.3-0.1-1.3-0.5c0-0.4,0.3-0.5,1.2-0.5C90.9,47.9,91.1,48,91.3,48.2z"
            data-v-3b40f5cf=""></path>
          <path class="st0" d="M94,46.1c-0.2,0-0.4,0.2-0.6,0.2c-0.2,0.1-0.3,0.1-0.3,0c0-0.1-0.1-0.2-0.2-0.2c-0.2,0-0.2,0.1-0.2,1.6
		c0,1.5,0,1.6,0.2,1.6s0.2-0.1,0.2-1.1c0-1,0-1.1,0.3-1.4c0.3-0.3,0.4-0.3,1.1-0.3c0.7,0,0.8,0,1,0.3c0.2,0.3,0.3,0.5,0.3,1.4
		c0,1,0,1.1,0.2,1.1c0.2,0,0.2-0.1,0.2-1.3c0-1.1,0-1.3-0.3-1.6c-0.2-0.3-0.4-0.3-1-0.4C94.6,46,94.2,46,94,46.1z"
            data-v-3b40f5cf=""></path>
          <path class="st0" d="M97.8,46.1c-0.6,0.2-0.8,0.5-0.9,1.2c-0.1,0.8,0.1,1.4,0.5,1.7c0.6,0.5,2.5,0.4,2.9,0c0.3-0.3,0.3-0.7,0-0.7
		c-0.1,0-0.2,0.1-0.2,0.2c0,0.3-0.4,0.4-1.3,0.4c-1.1,0-1.4-0.2-1.4-1.2c0-1,0.2-1.2,1.5-1.2c0.8,0,0.9,0,1,0.2
		c0.2,0.3,0.6,0.3,0.6,0c0-0.5-0.4-0.7-1.4-0.7C98.6,46,98,46.1,97.8,46.1z" data-v-3b40f5cf=""></path>
          <path class="st0"
            d="M102.2,46.1c-0.5,0.1-0.8,0.5-0.9,1.2c-0.2,1.3,0.2,1.9,1.3,2.1c1.2,0.2,2.3-0.1,2.3-0.6c0-0.2-0.3-0.2-0.6,0
		c-0.1,0.1-0.5,0.2-1.1,0.2c-1,0-1.3-0.2-1.4-0.8l-0.1-0.3h1.6h1.6v-0.5C104.8,46.3,103.7,45.7,102.2,46.1z M104.1,46.7
		c0.1,0.1,0.2,0.4,0.2,0.5c0,0.2-0.1,0.2-1.4,0.2c-1.3,0-1.3,0-1.3-0.3c0.1-0.5,0.5-0.7,1.4-0.7C103.7,46.5,103.9,46.5,104.1,46.7z"
            data-v-3b40f5cf=""></path>
          <path class="st0" d="M87,47.7v1.6h0.3h0.3v-1.6v-1.6h-0.3H87V47.7z" data-v-3b40f5cf=""></path>
        </g>
      </svg>
    </span>
    <div class="shiftHeader">

      SHIFT {{ actualShift.name ? actualShift.name : actualShift.category }}:  RTG PLANNING
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
  <table
  style="    width: 99%;
    margin: 0 auto;
    margin-bottom: 10px;
    background-color: #ffffff73;border: 1px solid white;
    border-top: 1px solid #2291c4b3;
    "
  class="elevation-1 tableOfThePlanning tableOfThePlanningShow tableOfThePlanningShowInConfirm">
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
          <span class="wh">{{ item[0]?.workingHours }}</span>
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
  emits:["splitClicked"],
  props: [
    "actualShift",
    "selectedDate",
    "selectedPlanning",
    "ShiftIndex",
    "headers",
    "thisPlanningBoxes",
    "splited",
  ],
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    splitClicked(){
      this.$emit("splitClicked");
    },
    ch7al3laLisr(item, indexx, list) {


      let count = 1;
      if (this.splited) {
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
      if (this.splited) {
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
  height: 34px;
      padding-top: 17px;
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
  height: 34px;
      padding-top: 17px;
  border-bottom: 1px solid #ffffffc9;
}

.doublePause {
  color: white;
  background-color: #81a4b1;
  font-family: sans-serif;
  font-size: 132%;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 34px;
      padding-top: 17px;
  border-bottom: 1px solid #ffffffc9;
}

.wh {

  color: white;
  background-color: #002855;
  font-family: sans-serif;
  font-size: 12px;
  text-align: center;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 100%;
  margin-left: 1px;
  margin-right: 1px;
  height: 34px;
      padding-top: 17px;
  border-bottom: 1px solid #ffffffc9;
}

.fullname {
  color: white;
    background-color: #002855;
    font-family: sans-serif;
    font-size: 10px;
    text-align: center;
    user-select: none;
    position: relative;
    display: inline-block;
    width: 100%;
    font-weight: bold;
    height: 34px;
    padding-top: 2px;
    line-height: 1.5;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7882352941);
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

  padding-top: 0 !important;
    color: white !important;
    background-color: #195783 !important;
    font-family: sans-serif !important;
    font-size: 13px !important;
    text-align: center !important;
    user-select: none !important;
    font-weight: bold !important;
    height: 29px !important;



}

.planningHeader {
  width: 100%;
  margin: 0 auto;


  z-index: 5;

  user-select: none;
  display: block;

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
  padding-left: 11px;

  img {
    height: 35px !important;
    opacity: 0.8;
    margin-top: 8px;
    float: left;
  }
}

.datePeriode {
  width: 24%;
  color: rgba(255, 255, 255, 0.7294117647);
  margin-top: 0;
  font-size: 15px;
  /* margin-bottom: 3px; */
  padding-right: 4px;
}

.shiftHeader {
  width: 56%;
  font-size: 16px;
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
