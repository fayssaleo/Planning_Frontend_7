<template>
  <div class="main">
    <div class="content">
      <!-- <v-btn @click="reset"> Reset </v-btn>  -->
      <span>sssssss</span>
      <RTGPlannings
        v-if="getPlanningWithTheBoxes == null"
        :ShiftIndex="ShiftIndex"
        :setSelectedPlanning="setSelectedPlanning"
        @getCurrentPlanningAndBoxes="getCurrentPlanningAndBoxes"
        @showNotificationClassSuccess="showNotificationClassSuccess"
        @showNotificationClassFailed="showNotificationClassFailed"
      />
      <RTGCreate
        v-if="
          this.role &&
          this.role.name !== 'driver' &&
          getPlanningWithTheBoxes &&
          getPlanningWithTheBoxes.planning &&
          getPlanningWithTheBoxes.planning_boxes == null
        "
        :actualShift="actualShift"
        :selectedDate="selectedDate"
        :selectedPlanning="selectedPlanning"
        :ShiftIndex="ShiftIndex"
        @createPlanning="createPlanning"
        @showNotificationClassSuccess="showNotificationClassSuccess"
        @showNotificationClassFailed="showNotificationClassFailed"
      />
      <RTGShow
        v-if="
          this.role &&
          this.role.name !== 'driver' &&
          getPlanningWithTheBoxes &&
          getPlanningWithTheBoxes.planning &&
          getPlanningWithTheBoxes.planning_boxes
        "
        :actualShift="actualShift"
        :selectedDate="selectedDate"
        :selectedPlanning="selectedPlanning"
        :ShiftIndex="ShiftIndex"
        :tableHeaders="tableHeaders"
        :ifCheckEditedPlanning="ifCheckEditedPlanning"
        :checkEditedPlanning="checkEditedPlanning"
        @CustomRtgPlanning="CustomRtgPlanning"
        @rtgFullPlanning="rtgFullPlanning"
        @showNotificationClassSuccess="showNotificationClassSuccess"
        @showNotificationClassFailed="showNotificationClassFailed"
        @setPlanningInMasterComp="setPlanningInMasterComp"
      />
    </div>
    <div id="appp">
      <div class="notification-container">
        <div
          :class="['notification', notificationClassSuccess]"
          @click="hideNotificationClassSuccess"
        >
          {{ notificationClassSuccessMsg }}
        </div>
      </div>
      <div class="notification-container">
        <div
          :class="['notification', notificationClassFailed]"
          @click="hideNotificationClassFailed"
        >
          {{ notificationClassFailedMsg }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import RTGCreate from "./RTGCreate.vue";
export default {
  data() {
    return {
      ifCheckEditedPlanning:false,
      checkEditedPlanning:[],
      plannings: null,
      PlanningsToSHow: true,
      selectedPlanning: null,
      role: null,
      actualShift: null,
      selectedDate: null,
      driversList: [],
      equipmentList: [],
      ShiftIndex: -1,
      tableHeaders: [],
      arrayToSave: [],
      notificationClassSuccess: "",
      notificationClassFailed: "",
      notificationClassSuccessMsg: "",
      notificationClassFailedMsg: "",
    };
  },
  computed: {
    ...mapGetters([
      "getPlannings",
      "getUserRole",
      "getPlanningWithTheBoxes",
      "getStorageData",
    ]),
    getShiftPeriode() {
      if (this.ShiftIndex == 0) return "Morning";
      if (this.ShiftIndex == 1) return "Evening";
      if (this.ShiftIndex == 2) return "Night";
    },
  },
  mounted() {
    console.log('ererere')
    this.getCurrentPlanningMethod();
  },
  methods: {
    ...mapActions([
      "clearPlannings",
      "createPlanningAction",
      "setLoadingValueAction",
      "setPlanningFromTheFrontend",
      "setBoxesFromTheFrontend",
      "setStorageData",
      "clearStorageData",
      "clearBoxes",
      "SetPlanningByIdAndBoxesAction",
      "setOutToBeInserted",
      "setThisOutToBeInserted",
    ]),
    setPlanningInMasterComp(planning){
      console.log("in setPlanningInMasterComp",this.selectedPlanning)
      console.log("in planning",this.planning)
      this.selectedPlanning={...planning};
    },
    getCurrentPlanningMethod() {
      this.plannings = this.getPlannings;
      this.role = this.getUserRole;
      if (this.getPlanningWithTheBoxes != null) {
        this.selectedPlanning = this.getStorageData.selectedPlanning;
        this.actualShift = this.getStorageData.actualShift;
        this.selectedDate = new Date(this.getStorageData.selectedDate);
        this.ShiftIndex = this.getStorageData.ShiftIndex;
        this.setStorageData({
          selectedPlanning: this.selectedPlanning,
          actualShift: this.actualShift,
          selectedDate: this.selectedDate,
          ShiftIndex: this.ShiftIndex,
        });
      } else {
      }
    },
    reset() {
      this.clearPlannings();
    },
    handleCreatePlanning(data) {
      this.createdPlanningData = data;
    },
    setSelectedPlanning(actualShift, planning, selectedDate, ShiftIndex) {
      console.log("setSelectedPlanning :")
      console.log("actualShift :",actualShift)
      console.log("planning :",planning)
      console.log("selectedDate :",selectedDate)
      console.log("ShiftIndex :",ShiftIndex)
      this.actualShift = actualShift;
      this.selectedDate = selectedDate;
      this.ShiftIndex = ShiftIndex;
      this.selectedPlanning = {
        id: null,
        shift_id: ctualShift.id,
        profile_group_id: 1,
        planned_at: selectedDate,
        shift_periode: this.getShiftPeriode,
      };

      this.setPlanningFromTheFrontend({...this.selectedPlanning});
      this.PlanningsToSHow = false;
      this.setStorageData({
        selectedPlanning: this.selectedPlanning,
        actualShift: this.actualShift,
        selectedDate: this.selectedDate,
        ShiftIndex: this.ShiftIndex,
      });
    },
    createPlanning(payload) {
      this.arrayToSave = [];
      this.tableHeaders = [];
      this.driversList = [...payload.driversList];
      this.equipmentList = [...payload.equipmentList];
      this.selectedDate = payload.selectedDate;

        //this.setLoadingValueAction(true);
        let year = this.selectedDate.getFullYear();
        let month = String(this.selectedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
        let day = String(this.selectedDate.getDate()).padStart(2, "0");

        let formattedDate = `${year}-${month}-${day}`;
        this.planning = {
          shift_id: this.actualShift.id,
          profile_group_id: 1,
          planned_at: formattedDate,
        };

        this.selectedPlanning = {
          shift_id: this.actualShift.id,
          profile_group_id: 1,
          planned_at: formattedDate,
          shift_periode: this.getShiftPeriode.toLowerCase(),
          id:null
        };
          if(this.driversList.length > this.equipmentList.length){
            this.setOutToBeInserted([]);
            this.rtgPlanning(
            true,
            this.driversList,
            this.equipmentList,
            this.ShiftIndex,
            this.selectedPlanning,
            this.tableHeaders
          );
        }
        else {
          let itemsPlanning=this.rtgFullPlanning2(this.driversList,this.equipmentList,this.ShiftIndex)
          let ThisOutToBeInserted = [];
          itemsPlanning[0].slice(1).map((e) => {
            ThisOutToBeInserted.push({
              list:[],
              checked:false
            })
            return e;
          });
          if(this.driversList.length < this.equipmentList.length){
            let outEquipments=this.equipmentList.slice(this.driversList.length,)
            console.log("outEquipments ",outEquipments);
            ThisOutToBeInserted = ThisOutToBeInserted.map((e) => {
              e.list= outEquipments;
              e.checked= false;
              return e;
          });
          } else {
            ThisOutToBeInserted = ThisOutToBeInserted.map((e) => {
              e.list= [];
              e.checked= false;
              return e;
          });
          }
          this.clearBoxes();
          this.setBoxesFromTheFrontend(itemsPlanning);
          this.setOutToBeInserted(ThisOutToBeInserted);
        }

    },
    CustomRtgPlanning(saveIt,
        driversList,
        equipmentList,
        ShiftIndex,
        selectedPlanning,
        tableHeaders) {
          this.arrayToSave = [];
      this.tableHeaders = [];
      return this.rtgPlanning(
        saveIt,
        driversList,
        equipmentList,
        ShiftIndex,
        selectedPlanning,
        tableHeaders
      );
    },
    rtgPlanning(
      saveIt,
      driversList,
      equipmentList,
      ShiftIndex,
      selectedPlanning,
      tableHeaders
    ) {
      let nbrDrivers = driversList.length;
      let nbrRtgs = equipmentList.length;
      let nbrSubs = nbrDrivers - nbrRtgs;
      let nbrCols = Math.ceil(nbrDrivers / nbrSubs);
      let colDuration = 480 / nbrCols;
      let divNbrDriverPerNbrSubs = nbrDrivers % nbrSubs;
      let nbrDoubleBreak =
        divNbrDriverPerNbrSubs != 0 ? nbrSubs - divNbrDriverPerNbrSubs : 0;
      driversList = driversList.sort(function (a, b) {
        return b.workingHours - a.workingHours;
      });
      let startTime = 0;
      switch (ShiftIndex) {
        case 0:
          startTime = 7;
          break;
        case 1:
          startTime = 15;
          break;
        case 2:
          startTime = 23;
          break;
        default:
          startTime = 0;
          break;
      }
      for (let i = 0; i < nbrCols; i++) {
        let hours = Math.floor(startTime); // Extract whole hours
        let minutes = Math.round((startTime - hours) * 60); // Extract remaining minutes and round
        // Adjust minutes if they exceed 60
        if (minutes >= 60) {
          hours += 1; // Increment hours
          minutes -= 60; // Subtract 60 from minutes
        }

        // Format startTime as "hh:mm"
        let startTimeFormatted =
          (hours < 10 ? "0" : "") +
          hours +
          ":" +
          (minutes < 10 ? "0" : "") +
          minutes;

        // Calculate endTime
        let endTime = startTime + colDuration / 60;
        if (endTime >= 24) {
          endTime -= 24; // Adjust for overflow past midnight
        }

        let endTimeHours = Math.floor(endTime); // Extract whole hours for end time
        let endTimeMinutes = Math.round((endTime - endTimeHours) * 60); // Extract remaining minutes and round

        // Adjust endTime if minutes exceed 60
        if (endTimeMinutes >= 60) {
          endTimeHours += 1; // Increment hours
          endTimeMinutes -= 60; // Subtract 60 from minutes
        }
        // Format endTime as "hh:mm"
        let endTimeFormatted =
          (endTimeHours < 10 ? "0" : "") +
          endTimeHours +
          ":" +
          (endTimeMinutes < 10 ? "0" : "") +
          endTimeMinutes;
        // Push start and end times to the tableHeaders array
        tableHeaders.push({
          title: startTimeFormatted + " - " + endTimeFormatted,
          sortable: false,
        });

        // Update startTime for the next iteration
        startTime = endTimeHours + endTimeMinutes / 60;
        if (startTime >= 24) {
          startTime -= 24; // Adjust for overflow past midnight
        }
      }
      const itemsPlanning = [];
      itemsPlanning.push(["Drivers | Time", ...tableHeaders]);
      for (let i = 0; i < nbrDrivers; i++) {
        itemsPlanning.push(Array(nbrCols + 1).fill(driversList[i]));
      }
      let k = 0;
      for (let i = 1; i < nbrDrivers + 1; i += nbrSubs) {
        k++;
        let maxJ = i + nbrSubs;
        if (maxJ > nbrDrivers) maxJ = maxJ - nbrDoubleBreak;
        for (let j = i; j < maxJ; j++) {
          itemsPlanning[j][k] = "P";
        }
      }
      let startDoubleBreak = itemsPlanning.length - nbrSubs;
      let rtgsIndex = 0;
      for (let j = 1; j < nbrCols + 1; j++) {
        rtgsIndex = 0;
        for (let i = 1; i < nbrDrivers + 1; i++) {
          if (itemsPlanning[i][j] != "P") {
            if (rtgsIndex < equipmentList.length) {
              // Check if rtgsIndex is within bounds
              itemsPlanning[i][j] = equipmentList[rtgsIndex];
              rtgsIndex++;
            } else {
              // Handle the case when rtgsIndex exceeds the length of rtgs array
              // For example, you can break the loop or handle it according to your logic.
              break;
            }
          }
        }
      }
      if (nbrDoubleBreak != 0) {
        for (
          let i = startDoubleBreak;
          i < startDoubleBreak + nbrDoubleBreak;
          i++
        ) {
          itemsPlanning[i][k] = "DP";
        }
        const doubleBreakDrivers = [];

        for (let i = 1; i < nbrDrivers + 1; i++) {
          if (itemsPlanning[i][nbrCols] == "DP") {
            doubleBreakDrivers.push({
              index: i,
              driver: itemsPlanning[i][0],
            });
          }
        }
        const firstValues = [];

        for (let i = 1; i < doubleBreakDrivers.length + 1; i++) {
          firstValues.push(itemsPlanning[i][0]);
        }
        const nonCommonValuesT1 = firstValues.filter(
          (obj1) =>
            !doubleBreakDrivers.some(
              (obj2) => obj1.matricule === obj2.driver.matricule
            )
        );
        const nonCommonValuesT2 = doubleBreakDrivers.filter(
          (obj1) =>
            !firstValues.some(
              (obj2) => obj2.matricule === obj1.driver.matricule
            )
        );
        for (let i = 1; i < nonCommonValuesT1.length + 1; i++) {
          let temp = nonCommonValuesT1[i - 1];
          let driver = driversList.find(
            (obj) => obj.matricule === nonCommonValuesT2[i - 1].driver.matricule
          );
          let index = driversList.indexOf(driver);
          itemsPlanning[i][0] = driver;
          itemsPlanning[index + 1][0] = temp;
        }
        const id = 1;
        let parts = [];
        for (let i = 1; i < nbrDrivers + 1; i++) {
          for (let j = 1; j < nbrCols + 1; j++) {
            const equipementId =
              itemsPlanning[i][j] == "P" || itemsPlanning[i][j] == "DP"
                ? null
                : equipmentList.find(
                    (rtg) => rtg.matricule === itemsPlanning[i][j].matricule
                  )?.id;
            parts = itemsPlanning[0][j].title.split("+")[0].split("-");

            const boxObject = {
              planning_id: selectedPlanning.id,
              user_id: itemsPlanning[i][0].id,
              equipement_id: equipementId,
              break:
                itemsPlanning[i][j] == "P" || itemsPlanning[i][j] == "DP"
                  ? true
                  : false,
              start_time: parts[0],
              ends_time: parts[1],
            };

            this.arrayToSave.push(boxObject);
          }
        }
      }

      if (saveIt) {
        this.clearBoxes();
        this.setBoxesFromTheFrontend(itemsPlanning);

      } else {
        console.log("itemsPlanning",itemsPlanning);
        this.checkEditedPlanning=itemsPlanning;
        let ThisOutToBeInserted = [];
        this.checkEditedPlanning[0].slice(1).map((e) => {
        ThisOutToBeInserted.push({
                  list: [],
                  checked: false,
                });
        });
        this.setThisOutToBeInserted(ThisOutToBeInserted);
      }
      this.arrayToSave = [];
      this.tableHeaders = [];
    },
    rtgFullPlanning(drivers,equipments,shiftIndex){
      let headers=[];
      let tempPlanning=[];
      if(shiftIndex==0){
        headers=[
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
      else if(shiftIndex==1){
        headers=[
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
      else if(shiftIndex==2){
        headers=[
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

      tempPlanning.push(["Drivers | Time", ...headers]);
      for (let index = 0; index < drivers.length; index++) {
        let planningRow=[drivers[index]];
        for (let i = 0; i < 8 ; i++) {
          planningRow.push(equipments[index])

        }
        tempPlanning.push(planningRow);
      }
      console.log("tempPlanning :",tempPlanning)
      console.log("this.checkEditedPlanning :",this.checkEditedPlanning)
      this.checkEditedPlanning=tempPlanning;
    },
    rtgFullPlanning2(drivers,equipments,shiftIndex){
      let headers=[];
      let tempPlanning=[];
      if(shiftIndex==0){
        headers=[
        {
          sortable:false,
          title:"07:00 - 09:00"
        },
        {
          sortable:false,
          title:"08:00-09:00"
        },
        {
          sortable:false,
          title:"09:00-10:00",
        },
        {
          sortable:false,
          title:"10:00-11:00",
        },
        {
          sortable:false,
          title:"11:00-12:00",
        },
        {
          sortable:false,
          title:"12:00-13:00",
        },
        {
          sortable:false,
          title:"13:00-14:00",
        },
        {
          sortable:false,
          title:"14:00-15:00",
        }
      ];
      }
      else if(shiftIndex==1){
        headers=[
        {
          sortable:false,
          title:"15:00-16:00",
        },
        {
          sortable:false,
          title:"16:00-17:00",
        },
        {
          sortable:false,
          title:"17:00-18:00",
        },
        {
          sortable:false,
          title:"18:00-19:00",
        },
        {
          sortable:false,
          title:"19:00-20:00",
        },
        {
          sortable:false,
          title:"20:00-21:00",
        },
        {
          sortable:false,
          title:"21:00-22:00",
        },
        {
          sortable:false,
          title:"22:00-23:00",
        }
      ];
      }
      else if(shiftIndex==2){
        headers=[
        {
          sortable:false,
          title:"23:00-00:00",
        },
        {
          sortable:false,
          title:"00:00-01:00",
        },
        {
          sortable:false,
          title:"01:00-02:00",
        },
        {
          sortable:false,
          title:"02:00-03:00",
        },
        {
          sortable:false,
          title:"03:00-04:00",
        },
        {
          sortable:false,
          title:"04:00-05:00",
        },
        {
          sortable:false,
          title:"05:00-06:00",
        },
        {
          sortable:false,
          title:"06:00-07:00",
        }
      ];
      }

      tempPlanning.push(["Drivers | Time", ...headers]);
      for (let index = 0; index < drivers.length; index++) {
        let planningRow=[drivers[index]];
        for (let i = 0; i < 8 ; i++) {
          planningRow.push(equipments[index])

        }
        tempPlanning.push(planningRow);
      }
      return tempPlanning;
    },
    showNotificationClassSuccess(msg) {
      this.notificationClassSuccessMsg = msg;
      // Show the notification
      setTimeout(() => {
        this.notificationClassSuccess = "show sucess";
      }, 500);

      // Hide the notification after 3 seconds
      setTimeout(() => {
        this.notificationClassSuccess = "hide sucess";
      }, 6000);
    },
    showNotificationClassFailed(msg) {
      this.notificationClassFailedMsg = msg;
      // Show the notification
      setTimeout(() => {
        this.notificationClassFailed = "show Failed";
      }, 500);

      setTimeout(() => {
        this.notificationClassFailed = "hide Failed";
      }, 6000);
    },
    hideNotificationClassSuccess() {
      this.notificationClassSuccess = "hide sucess";
    },
    hideNotificationClassFailed() {
      this.notificationClassFailed = "hide Failed";
    },
    getCurrentPlanningAndBoxes(
      id,
      actualShift,
      selectedDate,
      selectedPlanning,
      ShiftIndex
    ) {
      console.log("dkhlna hna : getThisPlanning");
      this.SetPlanningByIdAndBoxesAction({
        id: id,
      });
      this.SetPlanningNewAction(this.getPlanningWithTheBoxes.planning);

      this.actualShift = actualShift;
      this.selectedDate = selectedDate;
      this.selectedPlanning = selectedPlanning;
      this.ShiftIndex = ShiftIndex;
    },
  },
};
</script>
<style scoped>
.main {
  background-color: white;
  height: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.notification-container {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
  pointer-events: none; /* Prevents interaction with the container */
}
.notification {
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  transition: all 1s ease, opacity 2s ease;
  opacity: 0;
  pointer-events: auto;
  height: 10px;
  padding-top: 3px;
  padding-bottom: 30px;
  min-width: 40%;
  margin-top: 11px;
  font-size: 17px;
  position: relative;
}
.notification.show {
  opacity: 1;
}
.notification.hide {
  opacity: 0;
}
.notification.sucess {
  background-color: rgba(48, 205, 124, 0.79);
}
.notification.Failed {
  background-color: rgb(205 48 48 / 79%);
}
.notification.Failed::after {
  content: "\F0D59"; /* mdi-left-arrow icon */
  font-family: "Material Design Icons"; /* Ensure this matches your mdi font family */
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px; /* Adjust size as necessary */
  font-weight: 100 !important;
}
.notification.sucess::after {
  content: "\F0D59"; /* mdi-left-arrow icon */
  font-family: "Material Design Icons"; /* Ensure this matches your mdi font family */
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px; /* Adjust size as necessary */
  font-weight: 100 !important;
}
</style>
