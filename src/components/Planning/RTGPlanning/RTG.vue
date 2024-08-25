<template>
  <div class="main">
    <div class="content">
      <!-- <v-btn @click="reset"> Reset </v-btn>  -->
      <RTGPlannings v-if="getPlanningWithTheBoxes == null" :ShiftIndex="ShiftIndex" :NotwaitLoading="NotwaitLoading"
        :setSelectedPlanning="setSelectedPlanning" :plannings="plannings" :attributes="attributes"
        @getCurrentPlanningAndBoxes="getCurrentPlanningAndBoxes" @sendNudes="sendNudes"
        @showNotificationClassSuccess="showNotificationClassSuccess"
        @showNotificationClassFailed="showNotificationClassFailed" />
      <RTGCreate v-if="
        this.role &&
        this.role.name !== 'driver' &&
        getPlanningWithTheBoxes &&
        getPlanningWithTheBoxes?.planning &&
        getPlanningWithTheBoxes?.planning_boxes == null
      " :actualShift="actualShift" :selectedDate="selectedDate" :selectedPlanning="selectedPlanning"
        :ShiftIndex="ShiftIndex" @createPlanning="createPlanning" @clearPlannings="clearPlannings"
        @showNotificationClassSuccess="showNotificationClassSuccess"
        @showNotificationClassFailed="showNotificationClassFailed" />
      <RTGShow v-if="
        this.role &&
        this.role.name !== 'driver' &&
        getPlanningWithTheBoxes &&
        getPlanningWithTheBoxes?.planning &&
        getPlanningWithTheBoxes?.planning_boxes
      " :actualShift="actualShift" :selectedDate="selectedDate" :selectedPlanning="selectedPlanning"
        :ShiftIndex="ShiftIndex" :tableHeaders="tableHeaders" :checkEditedPlanning="checkEditedPlanning"
        @CustomRtgPlanning="CustomRtgPlanning" @rtgFullPlanning="rtgFullPlanning" @clearPlannings="clearPlannings"
        @showNotificationClassSuccess="showNotificationClassSuccess"
        @showNotificationClassFailed="showNotificationClassFailed"
         @setPlanningInMasterComp="setPlanningInMasterComp"
         @deleteFromPlanningInFirstPage="deleteFromPlanningInFirstPage"
          />
    </div>
    <div id="appp">
      <div class="notification-container">
        <div :class="['notification', notificationClassSuccess]" @click="hideNotificationClassSuccess">
          {{ notificationClassSuccessMsg }}
        </div>
      </div>
      <div class="notification-container">
        <div :class="['notification', notificationClassFailed]" @click="hideNotificationClassFailed">
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
      NotwaitLoading:false,
      selectedProfileGroup: null,
      checkEditedPlanning: [],
      plannings: [],
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
      attributes: [],
      shift_intervals: [],
    };
  },
  computed: {
    ...mapGetters([
      "getPlannings",
      "getUserRole",
      "getPlanningWithTheBoxes",
      "getStorageData",
      'getSelected_profile_group',
      'getProfileGroups',
    ]),
    getShiftPeriode() {
      if (this.ShiftIndex == 0) return "Morning";
      if (this.ShiftIndex == 1) return "Evening";
      if (this.ShiftIndex == 2) return "Night";
    },
  },
  watch: {
    '$route'(to, from) {
      // This function will trigger every time the route changes
      if (this.plannings.length == 0 || !this.getSelected_profile_group || to.name != this.getSelected_profile_group.type) {
        if (to.name === "rtg") {
          this.changeSelectedProfileGroupFrom_Watch(1);
          console.log("config from STS", to.name);
        }
        else if (to.name === "sts") {
          this.changeSelectedProfileGroupFrom_Watch(2);
          console.log("config from STS", to.name);
        }

        console.log("getSelected_profile_group from RTG", this.getSelected_profile_group);
      }
      else {
        this.getSelected_profile_group = { ...this.getSelected_profile_group };
      }
    }
  },
  created() {
    if ((this.plannings.length == 0 && this.getPlanningWithTheBoxes == null && this.getPlanningWithTheBoxes?.planning == null) || !this.getSelected_profile_group || this.$route.name != this.getSelected_profile_group?.type) {
      console.log("hhhh");
      if (this.$route.name === "rtg") {
        this.changeSelectedProfileGroupFrom_Watch(1);
        console.log("config from STS", this.$route.name);
      }
      else if (this.$route.name === "sts") {
        this.changeSelectedProfileGroupFrom_Watch(2);
        console.log("config from STS", this.$route.name);
      }

      console.log("getSelected_profile_group from RTG", this.getSelected_profile_group);
    }

  },
  mounted() {

    this.getCurrentPlanningMethod();
    this.shift_intervals = [
      "15:00-16:00",
      "16:00-17:00",
      "17:00-18:00",
      "18:00-19:00",
      "19:00-20:00",
      "20:00-21:00",
      "21:00-22:00",
      "22:00-23:00",
    ];
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
      "changeSelectedProfileGroup",
      "setPlanningByRangeAction",
    ]),
    getShiftByIndex(index) {
      if (index == 1) return "A";
      if (index == 2) return "B";
      if (index == 3) return "C";
      if (index == 4) return "D";
    },
    deleteFromPlanningInFirstPage(planning_id){
      this.plannings=[...this.plannings.filter((e)=>e.id!=planning_id)];
      if (this.$route.name === "rtg") {
        this.changeSelectedProfileGroupFrom_Watch(1);
        console.log("config from STS", this.$route.name);
      }
      else if (this.$route.name === "sts") {
        this.changeSelectedProfileGroupFrom_Watch(2);
        console.log("config from STS", this.$route.name);
      }
    },
    clearPlannings() {
      this.plannings = [];
      if (this.$route.name === "rtg") {
        this.changeSelectedProfileGroupFrom_Watch(1);
        console.log("config from STS", this.$route.name);
      }
      else if (this.$route.name === "sts") {
        this.changeSelectedProfileGroupFrom_Watch(2);
        console.log("config from STS", this.$route.name);
      }
    },
    sendNudes(attrs, test) {
      console.log("attrs", attrs);
      console.log("test", test);
      return new Promise((resolve, reject) => {
        if (attrs.length === 0) {
          this.attributes.push({
            key: "selected",
            highlight: "teal",
            dates: [new Date(test.id)],
          });

        } else {
          this.attributes = this.attributes.map((e) => {
            if (e.key === "selected") {
              e.dates = [new Date(test.id)];
            }
            return e;
          });
        }
      });
    },
    changeSelectedProfileGroupFrom_Watch(id) {
      this.NotwaitLoading=false;
      this.selectedProfileGroup = this.getProfileGroups.filter((e) => e.id == id)[0];
      this.changeSelectedProfileGroup({ ...this.selectedProfileGroup });
      this.setPlanningByRangeAction({
        profile_group_id: this.selectedProfileGroup?.id
      }).then((e) => {
        this.plannings = this.getPlannings;
        this.attributes = [];
        this.plannings.map((planning)=>{
          let color=(planning.shift_periode=='morning')?'blue'
                    :(planning.shift_periode=='evening'?'yellow':'gray');

            this.attributes.push({
              // An optional key can be used for retrieving this attribute later,
              // and will most likely be derived from your data object
              dot: color, // Boolean, String, Object
              popover: {
                label: "Shift "+this.getShiftByIndex(planning.shift_id)+" : "+(planning.shift_periode[0].toUpperCase()+planning.shift_periode.slice(1)),
                visibility: "hover",
                hideIndicator: false,
              },
              dates: [
               new Date(planning.planned_at.split(" ")[0]), // Jan 4th
              ],
            });

        })
        /*
        this.attributes.push({
          // An optional key can be used for retrieving this attribute later,
          // and will most likely be derived from your data object
          dot: "blue", // Boolean, String, Object
          popover: {
            label: "Shift A : PLANNED",
            visibility: "hover",
            hideIndicator: false,
          },
          dates: [
            ...this.plannings
              .filter((e) => e.shift_id == 1)
              .map((e) => new Date(e.planned_at.split(" ")[0])), // Jan 4th
          ],
        });
        this.attributes.push({
          // An optional key can be used for retrieving this attribute later,
          // and will most likely be derived from your data object
          dot: "green", // Boolean, String, Object
          popover: {
            label: "Shift B : PLANNED",
            visibility: "hover",
            hideIndicator: false,
          },
          dates: [
            ...this.plannings
              .filter((e) => e.shift_id == 2)
              .map((e) => new Date(e.planned_at.split(" ")[0])), // Jan 4th
          ],
        });
        this.attributes.push({
          // An optional key can be used for retrieving this attribute later,
          // and will most likely be derived from your data object
          key: "dot4",
          dot: "yellow",
          popover: {
            label: "Shift C : PLANNED",
            visibility: "hover",
            hideIndicator: false,
          },

          dates: [
            ...this.plannings
              .filter((e) => e.shift_id == 3)
              .map((e) => new Date(e.planned_at.split(" ")[0])), // Jan 4th
          ],
        });
        this.attributes.push({
          // An optional key can be used for retrieving this attribute later,
          // and will most likely be derived from your data object
          key: "dot5",
          dot: "red",
          popover: {
            label: "Shift D : PLANNED",
            visibility: "hover",
            hideIndicator: false,
          },
          dates: [
            ...this.plannings
              .filter((e) => e.shift_id == 4)
              .map((e) => new Date(e.planned_at.split(" ")[0])), // Jan 4th
          ],
        });*/
        this.attributes.push({
          // An optional key can be used for retrieving this attribute later,
          // and will most likely be derived from your data object
          key: "selected",
          highlight: "teal",
          dates: [new Date()],
        });
        this.NotwaitLoading=true;
      })
    },
    setPlanningInMasterComp(planning) {
      console.log("in setPlanningInMasterComp", this.selectedPlanning)
      console.log("in planning", this.planning)
      this.selectedPlanning = { ...planning };
      this.showNotificationClassSuccess("The planning has been created successfully");
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
      console.log("actualShift :", actualShift)
      console.log("planning :", planning)
      console.log("selectedDate :", selectedDate)
      console.log("ShiftIndex :", ShiftIndex)
      this.actualShift = actualShift;
      this.selectedDate = selectedDate;
      this.ShiftIndex = ShiftIndex;
      this.selectedPlanning = {
        id: null,
        shift_id: actualShift.id,
        profile_group_id: this.getSelected_profile_group?.id,
        planned_at: selectedDate,
        shift_periode: this.getShiftPeriode,
      };

      this.setPlanningFromTheFrontend({ ...this.selectedPlanning });
      this.PlanningsToSHow = false;
      this.setStorageData({
        selectedPlanning: this.selectedPlanning,
        actualShift: this.actualShift,
        selectedDate: this.selectedDate,
        ShiftIndex: this.ShiftIndex,
      });
    },
    createPlanning(payload) {
      console.log("paylod :", payload)
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
        profile_group_id: this.getSelected_profile_group?.id,
        planned_at: formattedDate,
      };

      this.selectedPlanning = {
        shift_id: this.actualShift.id,
        profile_group_id: this.getSelected_profile_group?.id,
        planned_at: formattedDate,
        shift_periode: this.getShiftPeriode.toLowerCase(),
        id: null
      };
      if (this.getSelected_profile_group.id == 1) {
        if (this.driversList.length > this.equipmentList.length) {
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
          let itemsPlanning = this.rtgFullPlanning2(this.driversList, this.equipmentList, this.ShiftIndex)
          let ThisOutToBeInserted = [];
          itemsPlanning[0].slice(1).map((e) => {
            ThisOutToBeInserted.push({
              list: [],
              checked: false
            })
            return e;
          });
          if (this.driversList.length < this.equipmentList.length) {
            let outEquipments = this.equipmentList.slice(this.driversList.length,)
            console.log("outEquipments ", outEquipments);
            ThisOutToBeInserted = ThisOutToBeInserted.map((e) => {
              e.list = outEquipments;
              e.checked = false;
              return e;
            });
          } else {
            ThisOutToBeInserted = ThisOutToBeInserted.map((e) => {
              e.list = [];
              e.checked = false;
              return e;
            });
          }
          this.clearBoxes();
          this.setBoxesFromTheFrontend(itemsPlanning);
          this.setOutToBeInserted(ThisOutToBeInserted);
        }
      }
      else if (this.getSelected_profile_group.id == 2) {
        this.setOutToBeInserted([]);
        this.clearBoxes();
        this.shift_intervals = this.getShiftIntervals(this.ShiftIndex);
        let rows__ = this.driversList.length;
        let columns__ = 8;
        let stsList__ = [];
        stsList__ = this.equipmentList.filter((e) => e.equipmentTimesSelected.filter((c) => c).length != 0);
        stsList__ = stsList__.map((e) => {
          let sts = {
            matricule: e.matricule,
            intervals: [],
          };
          for (let i = 0; i < 8; i++) {
            if (e.equipmentTimesSelected[i]) {
              sts.intervals.push(this.shift_intervals[i]);
            }
          }
          return sts;
        });
        let shift__ = [...this.shift_intervals];
        this.driversList = this.driversList.sort((a, b) => b.workingHours - a.workingHours);
        stsList__ = stsList__.sort((a, b) => a.intervals.length - b.intervals.length);
        let rst = this.createSTSPlanning(rows__, columns__, stsList__, shift__);
        let itemsPlanning_temp = rst.thePlanning;
        console.log("isssssssssssssssssssssssssssssitemsPlanning_temp1: ",JSON.parse(JSON.stringify(itemsPlanning_temp)))
        let itemsPlanning = [];
        let header = [];
        let equipmentTimesChecked = this.equipmentList.filter((e) => e.equipmentTimesSelected.filter((c) => c).length != 0);
        header.push({
          text: "Drivers | Time",
          sortable: false,
          key: "Drivers | Time",
          align: "Drivers | Time",
          title: "Drivers | Time",
          value: "Drivers | Time",
        });
        for (let index = 0; index < itemsPlanning_temp[0].length; index++) {
          header.push({
            text: itemsPlanning_temp[0][index],
            sortable: false,
            key: "driver",
            align: "start",
            title: itemsPlanning_temp[0][index],
            value: itemsPlanning_temp[0][index],
          });
        }
        itemsPlanning.push(header);
        console.log("itemsPlanning_tempitemsPlanning_tempitemsPlanning_temp: ",itemsPlanning_temp)
        for (let index = 1; index < itemsPlanning_temp.length; index++) {
          let row = [];

          row.push(this.driversList[index - 1]);
          for (let i = 0; i < itemsPlanning_temp[0].length; i++) {


            if (itemsPlanning_temp[index][i] != "-") {
              let thisEquipment = equipmentTimesChecked.filter((e) => e.matricule == itemsPlanning_temp[index][i])[0];
              row.push(thisEquipment);
            }
            else {
              row.push("P");
            }
          }
          itemsPlanning.push(row);
        }
        this.setBoxesFromTheFrontend(itemsPlanning);

        let ThisOutToBeInserted = itemsPlanning[0].slice(1).map((e) => {
          return {
            list: [],
            checked: false
          }

        });
        for (let index = 0; index < ThisOutToBeInserted.length; index++) {
          let thisLeftSts = rst.stsListtoBegin
            .filter((e) => {
              return e.intervals.filter((i) => {
                return i == this.shift_intervals[index];
              }).length > 0
            })
            .map((e) => {
              let thisOut = equipmentTimesChecked.filter((c) => {
                return c.matricule == e.matricule;
              });
              thisOut.map((out) => {
                ThisOutToBeInserted[index].list.push(out);
              })
            });
        }
        this.setOutToBeInserted(ThisOutToBeInserted);
      }

    },
    getShiftIntervals(shiftIndex) {
      let headers = [];
      let tempPlanning = [];
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
    CustomRtgPlanning(saveIt, driversList, equipmentList, ShiftIndex, selectedPlanning, tableHeaders) {
      return new Promise((resolve, reject) => {
        this.arrayToSave = [];
        this.tableHeaders = [];

        // Assuming rtgPlanning returns a Promise or needs to be handled as async
        this.rtgPlanning(
          saveIt,
          driversList,
          equipmentList,
          ShiftIndex,
          selectedPlanning,
          tableHeaders
        )
      });
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
          title: startTimeFormatted + "-" + endTimeFormatted,
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
        let ThisOutToBeInserted = itemsPlanning[0].slice(1).map((e) => {
          e.list = [];
          e.checked = false;
          return e;
        });
        this.setOutToBeInserted(ThisOutToBeInserted);
      } else {
        console.log("itemsPlanning", itemsPlanning);
        this.checkEditedPlanning = itemsPlanning;
      }
      this.arrayToSave = [];
      this.tableHeaders = [];
    },
    rtgFullPlanning(drivers, equipments, shiftIndex) {
      return new Promise((resolve, reject) => {
        let headers = [];
        let tempPlanning = [];
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
        } else if (shiftIndex == 1) {
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
        } else if (shiftIndex == 2) {
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
        console.log("tempPlanning--", tempPlanning)
        tempPlanning.push(["Drivers | Time", ...headers]);
        console.log("tempPlanning--", tempPlanning)
        for (let index = 0; index < drivers.length; index++) {
          let planningRow = [drivers[index]];
          for (let i = 0; i < 8; i++) {
            planningRow.push(equipments[index])
            console.log("tempPlanning--", tempPlanning)
          }
          tempPlanning.push(planningRow);
          console.log("tempPlanning--", tempPlanning)
        }

        console.log("tempPlanning--", tempPlanning)
        this.checkEditedPlanning = tempPlanning;

        // Resolve the promise with the planning data
        resolve(tempPlanning);
      });
    }
    ,
    rtgFullPlanning2(drivers, equipments, shiftIndex) {
      let headers = [];
      let tempPlanning = [];
      if (shiftIndex == 0) {
        headers = [
          {
            sortable: false,
            title: "07:00-08:00"
          },
          {
            sortable: false,
            title: "08:00-09:00"
          },
          {
            sortable: false,
            title: "09:00-10:00",
          },
          {
            sortable: false,
            title: "10:00-11:00",
          },
          {
            sortable: false,
            title: "11:00-12:00",
          },
          {
            sortable: false,
            title: "12:00-13:00",
          },
          {
            sortable: false,
            title: "13:00-14:00",
          },
          {
            sortable: false,
            title: "14:00-15:00",
          }
        ];
      }
      else if (shiftIndex == 1) {
        headers = [
          {
            sortable: false,
            title: "15:00-16:00",
          },
          {
            sortable: false,
            title: "16:00-17:00",
          },
          {
            sortable: false,
            title: "17:00-18:00",
          },
          {
            sortable: false,
            title: "18:00-19:00",
          },
          {
            sortable: false,
            title: "19:00-20:00",
          },
          {
            sortable: false,
            title: "20:00-21:00",
          },
          {
            sortable: false,
            title: "21:00-22:00",
          },
          {
            sortable: false,
            title: "22:00-23:00",
          }
        ];
      }
      else if (shiftIndex == 2) {
        headers = [
          {
            sortable: false,
            title: "23:00-00:00",
          },
          {
            sortable: false,
            title: "00:00-01:00",
          },
          {
            sortable: false,
            title: "01:00-02:00",
          },
          {
            sortable: false,
            title: "02:00-03:00",
          },
          {
            sortable: false,
            title: "03:00-04:00",
          },
          {
            sortable: false,
            title: "04:00-05:00",
          },
          {
            sortable: false,
            title: "05:00-06:00",
          },
          {
            sortable: false,
            title: "06:00-07:00",
          }
        ];
      }

      tempPlanning.push(["Drivers | Time", ...headers]);
      for (let index = 0; index < drivers.length; index++) {
        let planningRow = [drivers[index]];
        for (let i = 0; i < 8; i++) {
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
      this.SetPlanningByIdAndBoxesAction({
        id: id,
      });

      this.actualShift = actualShift;
      this.selectedDate = selectedDate;
      this.selectedPlanning = selectedPlanning;
      this.ShiftIndex = ShiftIndex;
    },
    createSTSPlanning(rows, columns, stsList, shift) {
      console.log("hahya hna : ", JSON.parse(JSON.stringify(stsList)));
      let saveStsList = [...stsList];
      console.log("from createSTSPlanning : ", shift);
      const totalHours = stsList.reduce((total, sts) => {
        return (total += sts.intervals.length);
      }, 0);
      const T = rows * columns - totalHours;
      const numberOfBreaks = Math.floor(T / rows);
      const numberOfDoubleBreaks = (numberOfBreaks * rows - T) * -1;
      console.log("totalHours : ", totalHours);
      console.log("Drivers : ", rows);
      console.log("numberOfBreaks : ", numberOfBreaks);
      console.log("number driver with DoubleBreaks : ", numberOfDoubleBreaks);
      stsList.forEach((sts) => {
        let oneSTSplanning = [];
        shift.forEach((planningInterval) => {
          let hour = "-----------";
          sts.intervals.forEach((stsInterval) => {
            if (planningInterval == stsInterval) hour = stsInterval;
          });
          oneSTSplanning.push(hour);
        });
        //console.table(sts.matricule, oneSTSplanning);
      });
      //generatePlanning(rows, columns, stsList);
      function getDriverinalWOrkingHours(driver) {
        return columns - (numberOfBreaks) - (driver <= numberOfDoubleBreaks ? 1 : 0);
      }
      function moveToFirstByMatricule(arr, matricule) {
        // Find the index of the object with the specified matricule
        const index = arr.findIndex((item) => item.matricule === matricule);

        // If the object is found and it's not already the first element
        if (index > -1 && index !== 0) {
          // Remove the object from its current position
          const [item] = arr.splice(index, 1);
          // Insert the object at the beginning of the array
          arr.unshift(item);
        }

        return arr;
      }
      function checkIntervalForSts(stsList, matricule, interval) {
        const sts = stsList.find((sts) => sts.matricule == matricule);
        if (interval == "16:00-17:00" && matricule == "STS4") {
        }
        if (sts) {
          return sts.intervals.includes(interval);
        }

        return false;
      }
      function IntervalIsExistedInTheSTSList(stsPlanning, interval) {
        for (let sts of stsPlanning) {
          if (sts.intervals.includes(interval)) {
            return true;
          }
        }
        return false;
      }
      function ItsABreak(
        stsPlanning,
        oneDriverPlanning,
        oneDriverPlanningHourex,
        driverIndex
      ) {
        let countWorkingHours = oneDriverPlanning.filter((value) =>
          value.startsWith("STS")
        ).length;

        if (getDriverinalWOrkingHours(driverIndex) <= countWorkingHours)
          return true;

        if (
          oneDriverPlanningHourex == 0 ||
          oneDriverPlanning[oneDriverPlanningHourex - 1] == "-"
        ) {
          return !IntervalIsExistedInTheSTSList(
            stsPlanning,
            shift[oneDriverPlanningHourex]
          );
        } else {
          if (
            IntervalIsExistedInTheSTSList(
              stsPlanning,
              shift[oneDriverPlanningHourex]
            )
          ) {
            let occurence = oneDriverPlanning.filter(
              (item) => item === oneDriverPlanning[oneDriverPlanningHourex - 1]
            ).length;

            if (occurence > 2) {
              return true;
            } else {
              return !checkIntervalForSts(
                stsPlanning,
                oneDriverPlanning[oneDriverPlanningHourex - 1],
                shift[oneDriverPlanningHourex]
              );
            }
          } else {
            return true;
          }
        }
      }
      function setOneDriverPlanning(stsListtoBegin, driverIndex) {
        let stsPlanning = [...stsListtoBegin];
        let oneDriverPlanning = [...shift];

        let countDouble = 0;
        let tooked = false;
        /* matricule: "STS4",

            intervals: [
                */

        oneDriverPlanning.forEach(
          (oneDriverPlanningHour, oneDriverPlanningHourex) => {

            if (oneDriverPlanningHourex > 0) {
              stsPlanning = moveToFirstByMatricule(
                stsPlanning,
                oneDriverPlanning[oneDriverPlanningHourex - 1]
              );
            }
            let stsCountOccurence = stsPlanning.filter((e) => {
              return e.intervals.filter((c) => {
                return c == oneDriverPlanning[oneDriverPlanningHourex]
              }).length > 0
            })
            if (
              !ItsABreak(
                stsPlanning,
                oneDriverPlanning,
                oneDriverPlanningHourex,
                driverIndex
              )
            ) {
              stsPlanning.forEach((sts, index) => {
                countDouble = 0;
                tooked = false;
                sts.intervals.forEach((stsInterval, index) => {
                  let occurence = oneDriverPlanning.filter(
                    (item) => item === sts.matricule
                  ).length;
                  if (occurence < 3)
                    if (
                      oneDriverPlanning[oneDriverPlanningHourex][0] != "S" &&
                      oneDriverPlanningHour == stsInterval
                    ) {
                      if (
                        oneDriverPlanningHourex == 0 ||
                        occurence == 0 ||
                        (oneDriverPlanningHourex > 0 &&
                          oneDriverPlanning[oneDriverPlanningHourex - 1] ==
                          sts.matricule)
                      ) {

                        oneDriverPlanning[oneDriverPlanningHourex] = sts.matricule;
                        let stsCopy = stsPlanning.find(
                          (sts1) => sts1.matricule === sts.matricule
                        );
                        stsCopy.intervals = [
                          ...stsCopy.intervals.filter(
                            (interval) => interval != stsInterval
                          ),
                        ];
                        stsPlanning[
                          stsPlanning.findIndex(
                            (sts1) => sts1.matricule === stsCopy.matricule
                          )
                        ].intervals = [...stsCopy.intervals];
                      }

                    }
                });

              });
            } else {
              oneDriverPlanning[oneDriverPlanningHourex] = "-";
            }
            if (oneDriverPlanning[oneDriverPlanningHourex] != '-' && oneDriverPlanning[oneDriverPlanningHourex][0] != "S") {
              oneDriverPlanning[oneDriverPlanningHourex] = "-";
            }
          }
        );

        return {
          oneDriverPlanning: oneDriverPlanning,
          stsPlanning: stsPlanning,
        };
      }
      //condition :
      //1 - if he has space
      //2 - if he has the same sts but not 3 hours
      //3 - if he can change the requested hour

      //when to change :
      //1- if he has empty place and minced hours
      function canBeInserted(oneDriverPlanning, sts, columnIndex) {
        if (oneDriverPlanning[columnIndex] != "-") return false;
        let occurence = oneDriverPlanning.filter((item) => item === sts).length;

        if (occurence > 0) {
          if (occurence > 2) {
            return false;
          } else if (columnIndex == oneDriverPlanning.length - 1) {
            if (oneDriverPlanning[columnIndex - 1] != sts) {
              return false;
            }
          } else if (columnIndex == 0) {
            if (oneDriverPlanning[columnIndex + 1] != sts) {
              return false;
            }
          } else {
            if (
              oneDriverPlanning[columnIndex - 1] != sts &&
              oneDriverPlanning[columnIndex + 1] != sts
            ) {
              return false;
            }
            if (
              oneDriverPlanning[columnIndex - 1] == sts &&
              oneDriverPlanning[columnIndex + 1] != "-"
            ) {
              return false;
            }
            if (
              oneDriverPlanning[columnIndex + 1] == sts &&
              oneDriverPlanning[columnIndex - 1] != "-"
            ) {
              return false;
            }
          }
        } else {
          if (columnIndex == oneDriverPlanning.length - 1) {
            if (oneDriverPlanning[columnIndex - 1] != "-") return false;
          } else if (columnIndex == 0) {
            if (oneDriverPlanning[columnIndex + 1] != "-") return false;
          }
          if (
            oneDriverPlanning[columnIndex - 1] != "-" ||
            oneDriverPlanning[columnIndex + 1] != "-"
          )
            return false;
        }
        return true;
      }
      function canBeInsertedForcely(oneDriverPlanning, sts, columnIndex) {
        if (oneDriverPlanning[columnIndex] != "-") return false;
        let occurence = oneDriverPlanning.filter((item) => item === sts).length;

        if (occurence > 0) {
          if (occurence > 2) {
            return false;
          } else if (columnIndex == oneDriverPlanning.length - 1) {
            if (oneDriverPlanning[columnIndex - 1] != sts) {
              return false;
            }
          } else if (columnIndex == 0) {
            if (oneDriverPlanning[columnIndex + 1] != sts) {
              return false;
            }
          } else {
            if (
              oneDriverPlanning[columnIndex - 1] != sts &&
              oneDriverPlanning[columnIndex + 1] != sts
            ) {
              return false;
            }
            if (
              oneDriverPlanning[columnIndex - 1] == sts &&
              oneDriverPlanning[columnIndex + 1] != "-"
            ) {
              return false;
            }
            if (
              oneDriverPlanning[columnIndex + 1] == sts &&
              oneDriverPlanning[columnIndex - 1] != "-"
            ) {
              return false;
            }
          }
        } else {
          if (columnIndex == oneDriverPlanning.length - 1) {
            if (oneDriverPlanning[columnIndex - 1] != "-") return false;
          } else if (columnIndex == 0) {
            if (oneDriverPlanning[columnIndex + 1] != "-") return false;
          }
          if (
            oneDriverPlanning[columnIndex - 1] != "-" ||
            oneDriverPlanning[columnIndex + 1] != "-"
          )
            return false;
        }
        return true;
      }
      function countWH(row) {
        return row.filter((e) => e != "-").length;
      }
      function TryToMinceAnHour(
        thePlanning,
        columnOfTheMissingOne,
        indexOfTheMissingOne
      ) {
        let minced = false;
        let thePlanningToReduce = [...thePlanning];

        for (
          let columnIndex = 0;
          columnIndex < thePlanningToReduce[indexOfTheMissingOne].length;
          columnIndex++
        ) {
          let occurence = thePlanningToReduce[indexOfTheMissingOne].filter(
            (item) =>
              item === thePlanningToReduce[indexOfTheMissingOne][columnIndex]
          ).length;
          if (
            occurence == 3 &&
            columnIndex != 0 &&
            columnIndex != thePlanningToReduce[indexOfTheMissingOne].length - 1 &&
            thePlanningToReduce[indexOfTheMissingOne][columnIndex - 1] ==
            thePlanningToReduce[indexOfTheMissingOne][columnIndex] &&
            thePlanningToReduce[indexOfTheMissingOne][columnIndex + 1] ==
            thePlanningToReduce[indexOfTheMissingOne][columnIndex]
          ) {
          } else {
            if (
              columnOfTheMissingOne != columnIndex &&
              !minced &&
              thePlanningToReduce[indexOfTheMissingOne][columnIndex] != "-"
            )
              for (let rowIndex = rows - 1; rowIndex >= 0; rowIndex--) {
                if (indexOfTheMissingOne != rowIndex && !minced) {
                  if (
                    countWH(thePlanningToReduce[rowIndex]) <
                    getDriverinalWOrkingHours(rowIndex) &&
                    canBeInserted(
                      thePlanningToReduce[rowIndex],
                      thePlanningToReduce[indexOfTheMissingOne][columnIndex],
                      columnIndex
                    )
                  ) {
                    thePlanningToReduce[rowIndex][columnIndex] =
                      thePlanningToReduce[indexOfTheMissingOne][columnIndex];
                    thePlanningToReduce[indexOfTheMissingOne][columnIndex] = "-";
                    minced = true;
                  }
                }
              }
          }
        }
        return {
          minced: minced,
          thePlanningToReduce: thePlanningToReduce,
        };
      }
      function insertSTSHour(thePlanning, sts, hour) {
        let inserted = false;
        let thePlanningToReduce = [...thePlanning];
        let columnIndex = -1;
        for (let index = 0; index < shift.length; index++) {
          if (shift[index] == hour) {
            columnIndex = index;
          }
        }

        if (columnIndex != -1)
          for (let index = 0; index < rows; index++) {
            if (
              countWH(thePlanningToReduce[index]) <
              getDriverinalWOrkingHours(index) &&
              canBeInserted(thePlanningToReduce[index], sts, columnIndex)
            ) {
              thePlanningToReduce[index][columnIndex] = sts;
              inserted = true;
              break;
            }
          }

        //safi hna maymknch dkhl 3adi donc db an9ss mn chi row bach ndkhlha
        if (!inserted)
          for (let index = 0; index < rows; index++) {
            if (canBeInserted(thePlanningToReduce[index], sts, columnIndex)) {
              if (
                countWH(thePlanningToReduce[index]) <
                getDriverinalWOrkingHours(index)
              ) {
                thePlanningToReduce[index][columnIndex] = sts;
                inserted = true;
              } else {
                //hna khasni n9ss sa3a mn had row : thePlanningToReduce[index]

                let rst = TryToMinceAnHour(thePlanning, columnIndex, index);
                if (rst.minced) {
                  thePlanningToReduce = [...rst.thePlanningToReduce];
                  thePlanningToReduce[index][columnIndex] = sts;

                  inserted = true;
                  break;
                }
              }
            }
          }

        return {
          inserted: inserted,
          thePlanningToReduce2: thePlanningToReduce,
        };
      }
      function bestEnhancement(thePlanning, stsListtoBegin) {
        let stsListToReduce = [
          ...stsListtoBegin.filter((e) => e.intervals.length > 0),
        ];
        let thePlanningToReduce = [...thePlanning];
        let count = 0;
        while (count < 20) {
          if (stsListToReduce.length > 0) {
            for (let stsIndex = 0; stsIndex < stsListToReduce.length; stsIndex++) {
              const MissingStsIntervals = stsListToReduce[stsIndex];
              for (
                let MissingStsIntervalsIndex = 0;
                MissingStsIntervalsIndex < MissingStsIntervals.intervals.length;
                MissingStsIntervalsIndex++
              ) {
                const stsInterval =
                  MissingStsIntervals.intervals[MissingStsIntervalsIndex];

                let rst = insertSTSHour(
                  thePlanningToReduce,
                  MissingStsIntervals.matricule,
                  stsInterval
                );
                if (rst.inserted) {
                  thePlanningToReduce = [...rst.thePlanningToReduce2];
                  let stsCopy = stsListToReduce.find(
                    (sts1) => sts1.matricule === MissingStsIntervals.matricule
                  );
                  stsCopy.intervals = [
                    ...stsCopy.intervals.filter(
                      (interval) => interval != stsInterval
                    ),
                  ];
                  stsListToReduce[
                    stsListToReduce.findIndex(
                      (sts1) => sts1.matricule === MissingStsIntervals.matricule
                    )
                  ].intervals = [...stsCopy.intervals];
                }
              }
            }
          }
          count++;
        }
        return {
          thePlanningToReduce: thePlanningToReduce,
          stsListToReduce: stsListToReduce,
        };
      }
      function switchThisHours(stsListtoBegin, STSToRemove, STSToAdd, columnIndex) {
        let stsListToBeSwitched = [...stsListtoBegin];
        if (STSToAdd != "-")
          stsListToBeSwitched = [
            ...stsListToBeSwitched.map((e) => {
              if (e.matricule == STSToRemove) {
                e.intervals = [
                  ...e.intervals.filter(
                    (interval) => interval != shift[columnIndex]
                  ),
                ];
              }
              if (e.matricule == STSToAdd) {
                e.intervals.push(shift[columnIndex]);
                return e;
              }
              return e;
            }),
          ];
        if (
          STSToAdd != "-" &&
          stsListToBeSwitched.filter((e) => e.matricule == STSToAdd).length == 0
        ) {
          stsListToBeSwitched.push({
            matricule: STSToAdd,
            intervals: [shift[columnIndex]],
          });
        }
        stsListToBeSwitched = stsListToBeSwitched.filter(
          (e) => e.intervals.length > 0
        );
        return stsListToBeSwitched;
      }

      function forceInsertion2(thePlanning, stsListtoBegin) {
        let inserted = false;

        let stsListtoReduce = [
          ...stsListtoBegin.filter((e) => e.intervals.length > 0),
        ];
        let thePlanningToReduce = [...thePlanning.map((e) => e)];
        for (let STSIndex = 0; STSIndex < stsListtoReduce.length; STSIndex++) {
          for (
            let intervalndex = 0;
            intervalndex < stsListtoReduce[STSIndex].intervals.length;
            intervalndex++
          ) {
            let columnIndex = -1;
            for (let index = 0; index < shift.length; index++) {
              if (
                shift[index] == stsListtoReduce[STSIndex].intervals[intervalndex]
              ) {
                columnIndex = index;
              }
            }
            if (columnIndex != -1) {
              for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
                let stsOldOne = thePlanningToReduce[rowIndex][columnIndex] + "";
                let thePlanningtoReduceCopy = [...thePlanningToReduce];
                if (
                  !inserted &&
                  canBeInserted(
                    thePlanningtoReduceCopy[rowIndex],
                    stsListtoReduce[STSIndex].matricule,
                    columnIndex
                  )
                ) {
                  thePlanningtoReduceCopy[rowIndex][columnIndex] =
                    stsListtoReduce[STSIndex].matricule;
                  let stsListtoReduceCopy = [...stsListtoReduce];
                  stsListtoReduceCopy = switchThisHours(
                    stsListtoReduce,
                    stsListtoReduce[STSIndex].matricule,
                    stsOldOne,
                    columnIndex
                  );
                  stsListtoReduce = [...stsListtoReduceCopy];
                  thePlanningToReduce[rowIndex][columnIndex] = stsListtoReduce[STSIndex].matricule;
                  inserted = true;

                  break;
                }
              }
            }
          }
        }
        return {
          inserted: inserted,
          thePlanning: thePlanningToReduce,
          stsListtoBegin: stsListtoReduce,
        };
      }

      function forceInsertion(thePlanning, stsListtoBegin) {
        let inserted = false;

        let stsListtoReduce = [
          ...stsListtoBegin.filter((e) => e.intervals.length > 0),
        ];
        let stsListtoReduceToPass = [
          ...stsListtoBegin.filter((e) => e.intervals.length > 0),
        ];

        let thePlanningToReduce = [...thePlanning.map((e) => e)];
        let thePlanningToReduce2 = [...thePlanning.map((e) => e)];
        for (let STSIndex = 0; STSIndex < stsListtoReduce.length; STSIndex++) {
          for (
            let intervalndex = 0;
            intervalndex < stsListtoReduce[STSIndex].intervals.length;
            intervalndex++
          ) {
            let columnIndex = -1;
            for (let index = 0; index < shift.length; index++) {
              if (
                shift[index] == stsListtoReduce[STSIndex].intervals[intervalndex]
              ) {
                columnIndex = index;
              }
            }
            if (columnIndex != -1) {
              for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
                let stsOldOne = thePlanningToReduce[rowIndex][columnIndex] + "";
                let thePlanningtoReduceCopy = [...thePlanningToReduce];
                if (
                  !inserted &&
                  canBeInserted(
                    thePlanningtoReduceCopy[rowIndex],
                    stsListtoReduce[STSIndex].matricule,
                    columnIndex
                  )
                ) {
                  thePlanningtoReduceCopy[rowIndex][columnIndex] =
                    stsListtoReduce[STSIndex].matricule;
                  let stsListtoReduceCopy = [...stsListtoReduce];
                  stsListtoReduceCopy = switchThisHours(
                    stsListtoReduce,
                    stsListtoReduce[STSIndex].matricule,
                    stsOldOne,
                    columnIndex
                  );
                  stsListtoReduceToPass = [...stsListtoReduceCopy];
                  thePlanningToReduce[rowIndex][columnIndex] = stsListtoReduce[STSIndex].matricule;
                  inserted = true;
                  break;
                }
              }
            }
          }
        }
        return {
          inserted: inserted,
          thePlanningToReduce2: thePlanningToReduce2,
          stsListtoReduceToPass: stsListtoReduceToPass,
        };
      }
      function findMissingHours3(stsList, driversPlanning) {
        const intervalIndices = driversPlanning[0].reduce(
          (acc, interval, index) => {
            acc[interval] = index;
            return acc;
          },
          {}
        );

        const planningMap = driversPlanning.slice(1).reduce((acc, row) => {
          row.forEach((sts, index) => {
            if (sts !== "-") {
              if (!acc[sts]) {
                acc[sts] = new Set();
              }
              acc[sts].add(driversPlanning[0][index]);
            }
          });
          return acc;
        }, {});

        return stsList.map((sts) => {
          const assignedIntervals = planningMap[sts.matricule] || new Set();
          const intervals = sts.intervals.filter(
            (interval) => !assignedIntervals.has(interval)
          );
          return { matricule: sts.matricule, intervals };
        })
          .filter((e) => e.intervals.length > 0);
      }
      function findMissingHours2(stsList, driversPlanning) {
        const intervalIndices = driversPlanning[0].reduce(
          (acc, interval, index) => {
            acc[interval] = index;
            return acc;
          },
          {}
        );

        const planningMap = driversPlanning.slice(1).reduce((acc, row) => {
          row.forEach((sts, index) => {
            if (sts !== "-") {
              if (!acc[sts]) {
                acc[sts] = new Set();
              }
              acc[sts].add(driversPlanning[0][index]);
            }
          });
          return acc;
        }, {});

        return stsList.map((sts) => {
          const assignedIntervals = planningMap[sts.matricule] || new Set();
          const intervals = sts.intervals.filter(
            (interval) => !assignedIntervals.has(interval)
          );
          return { matricule: sts.matricule, intervals };
        });
      }
      function setAllDriversPlanning() {
        let thePlanning = [];
        let stsListtoBegin = [...stsList];

        for (let driverIndex = 0; driverIndex < rows; driverIndex++) {
          let res = setOneDriverPlanning(stsListtoBegin, driverIndex);
          thePlanning.push(res.oneDriverPlanning);
          stsListtoBegin = [...res.stsPlanning];
        }

        let rst = bestEnhancement([...thePlanning], [...stsListtoBegin]);
        thePlanning = [...rst.thePlanningToReduce];
        stsListtoBegin = [...rst.stsListToReduce];
        rst.thePlanningToReduce = rst.thePlanningToReduce.sort((a, b) => {
          return (
            b.filter((e) => e == "-").length - a.filter((e) => e == "-").length
          );
        });

        for (let index = 0; index < 10; index++) {

          thePlanning = thePlanning.sort((a, b) => {
            return (
              b.filter((e) => e == "-").length - a.filter((e) => e == "-").length
            );
          });
          let rsssst = bestEnhancement([...thePlanning], [...stsListtoBegin]);
          thePlanning = [...rsssst.thePlanningToReduce];
          stsListtoBegin = [...rsssst.stsListToReduce];
        }


        let rst2 = forceInsertion2([...thePlanning], [...stsListtoBegin]);
        rst2.thePlanning = rst2.thePlanning.sort((a, b) => {
          return (
            b.filter((e) => e == "-")
              .length -
            a.filter((e) => e == "-")
              .length
          )
        });
        thePlanning = [...rst2.thePlanning];
        stsListtoBegin = [...rst2.stsListtoBegin];

        thePlanning.unshift(shift);


        stsListtoBegin = findMissingHours3(stsListtoBegin, thePlanning);
        console.log("stsListtoInsert :", JSON.parse(JSON.stringify(stsListtoBegin)))
        console.table(JSON.parse(JSON.stringify(thePlanning)))

        return {
          thePlanning: thePlanning,
          stsListtoBegin: stsListtoBegin,
        };
      }
      let output = setAllDriversPlanning();
      //let output=[setOneDriverPlanning(stsList,0).oneDriverPlanning]
      //output.thePlanning.unshift(shift);
      //console.table(output.thePlanning);
      return output;
    }
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
  pointer-events: none;
  /* Prevents interaction with the container */
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
  content: "\F0D59";
  /* mdi-left-arrow icon */
  font-family: "Material Design Icons";
  /* Ensure this matches your mdi font family */
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  /* Adjust size as necessary */
  font-weight: 100 !important;
}

.notification.sucess::after {
  content: "\F0D59";
  /* mdi-left-arrow icon */
  font-family: "Material Design Icons";
  /* Ensure this matches your mdi font family */
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  /* Adjust size as necessary */
  font-weight: 100 !important;
}
</style>
