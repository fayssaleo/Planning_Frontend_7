<template>
  <v-row class="saveButtonBar" style="height: 44px !important; color: black" v-if="!editMode && (getJustCreated == false || justEdited==true)">
    <v-col cols="8" style="position: relative">
      <span v-if="!getJustCreated">Click on <span class="confirmIconText">CONFIRM</span> button to confirm
        this planning!
      </span>
      <span v-else>Click on <span class="confirmIconText">UPDATE</span> button to confirm
        your last changes!
      </span>
    </v-col>
    <v-col cols="4" style="position: relative">
      <v-btn density="default" class="saveButton3" @click="!getJustCreated?openCancelMDialog():opencancelUPDATEDialog()">CANCEL</v-btn>
      <v-btn density="default" class="saveButton" @click="!getJustCreated?openSaveDialog():setUpdateModeAndOpenSave()">{{ !getJustCreated?'CONFIRM':'UPDATE' }}</v-btn>
    </v-col>
  </v-row>
  <v-row style="width: 90%; margin: 0 auto">
    <v-col class="header" cols="12" style="position: relative">
      <div class="buttonsHolder">
        <div class="button" :class="editMode ? 'buttonOn2' : ''" @click="editMode?confirmChanges():closePlanning()">
          <span class="buttonText">{{ editMode ? "SAVE" : "CLOSE" }}</span>
          <span class="buttonIcon buttonIcon1"></span>
        </div>
        <div class="button" :class="editMode ? 'displayNone' : ''" @click="OpenPlanningAsFileShow">
          <span class="buttonText">AS PDF</span>
          <span class="buttonIcon buttonIcon2"></span>
        </div>
        <div class="button" :class="editMode ? 'displayNone' : ''">
          <span class="buttonText">DELETE</span>
          <span class="buttonIcon buttonIcon3"></span>
        </div>
        <div class="redoUndoBlock" :class="!editMode ? 'displayNone' : ''">
          <span class="undo on" :class="[
            planningActionHistory_index < planningActionHistory.length - 1 ? 'undoDisabled' : ''
          ]" @click="planningActionHistory_index > 0 ? UndoPlanning() : ''">UNDO</span>
          <span class="actionNumber">
            {{ planningActionHistory_index }}
          </span>
          <span class="redo on" :class="[
            planningActionHistory_index < planningActionHistory.length - 1 ? 'redoDisabled' : ''
          ]" @click=" planningActionHistory_index < planningActionHistory.length - 1 ? RedoPlanning() : ''">REDO</span>
        </div>
      </div>
      <div class="buttonsHolder2">
        <div class="button" :class="editMode ? 'buttonOn' : ''" @click="toggleEditMode">
          <span class="buttonText">{{ editMode ? "CANCEL" : "EDIT" }}</span>
          <span class="buttonIcon buttonIcon1"></span>
        </div>
        <div class="button" :class="editMode ? 'displayNone' : ''">
          <span class="buttonText">FILTER</span>
          <span class="buttonIcon buttonIcon2"></span>
        </div>
        <div class="button" :class="editMode ? 'displayNone' : ''">
          <span class="buttonText">SET WH</span>
          <span class="buttonIcon buttonIcon3"></span>
        </div>
        <div

        v-if="planningWorkBoxChecked" class="switchBlock" :class="[
          !editMode ? 'displayNone' : '',
          isHighlighted?'switchBlockHighlighted':''
          ]">
          <span class="change1" @click="clearLeaftSwitchSuggesst" :class="[
            (planningWorkBoxChecked && planningWorkBoxChecked_ID == null) ? 'change1_equip' : '',
            (planningWorkBoxChecked == 'P' || planningWorkBoxChecked == 'DP') ? 'pauseChange' : '',
            (planningWorkBoxChecked == 'DP') ? 'dpChange' : '',
            workBoxLeftFromOuts ? 'workBoxLeftFromOuts' : '',
          ]">{{ (planningWorkBoxChecked_ID == null) ? planningWorkBoxChecked?.matricule : planningWorkBoxChecked
            }}</span>
          <span v-if="planningWorkBoxChecked && planningWorkBoxChecked_With" class="with"

          @mouseover="addClass" @mouseleave="removeClass"
          @click="doBoxSwitching">
            <svg data-v-02c85341="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1" id="Capa_1" x="0px" y="0px" width="984.85px" height="984.85px" viewBox="0 0 984.85 984.85"
              xml:space="preserve" >
              <g data-v-02c85341="">
                <path data-v-02c85341=""
                  d="M652.075,954.791c12.101,12,28.7,20.1,45.7,21.5c17.2,1.399,34.9-2.8,49.2-12.5c3.9-2.601,7.6-5.7,10.9-9l0.1-0.101   l204.9-204.899c29.3-29.3,29.3-76.8,0-106.101c-29.301-29.3-76.801-29.3-106.101,0l-76.899,76.9v-637c0-41.4-33.601-75-75-75   c-41.4,0-75,33.6-75,75v637l-78.9-78.9c-29.3-29.3-76.8-29.3-106.1,0c-29.301,29.301-29.301,76.801,0,106.101l207,207   C651.975,954.69,651.975,954.791,652.075,954.791z"
                  style="fill: rgba(251, 0, 0, 0.77)"
                  class="firstPath"
                  :class="[
                    planningWorkBoxChecked_With=='P'?'isswitchBlockPause':'',
                    planningWorkBoxChecked_With=='DP'?'isswitchBlockDoublePause':'',
                  ]"
                  ></path>
                <path data-v-02c85341=""
                  d="M74.975,365.491c19.2,0,38.4-7.3,53-22l78.9-78.9v637c0,41.4,33.6,75,75,75s75-33.6,75-75v-637l76.899,76.9   c14.601,14.6,33.8,22,53,22s38.4-7.3,53-22c29.3-29.3,29.3-76.8,0-106.1c-5.399-5.4-10.899-10.9-16.3-16.3   c-13.3-13.3-26.5-26.7-39.9-39.9c-17.199-17.1-34.3-34.2-51.399-51.4c-16.8-17-34.2-33.5-50.9-50.7   c-16.2-16.6-32.6-32.9-49.899-48.5c-18-16.2-41.5-24.2-65.7-18.5c-6.2,1.4-12.8,3.8-18.4,6.9c-16.7,9.4-30,24.9-43.5,38.3   c-16.5,16.3-32.7,32.9-49.1,49.4c-19.5,19.6-39.2,39.1-58.8,58.6c-16.4,16.6-33,33.2-49.5,49.8c-8,8-16,15.9-24,23.9   c-0.1,0.1-0.3,0.3-0.4,0.4c-29.3,29.3-29.3,76.8,0,106.1C36.575,358.191,55.775,365.491,74.975,365.491z"
                  style="fill: #5c95ff"
                  class="secondPath"
                  :class="[
                    planningWorkBoxChecked=='P'?'isswitchBlockPause':'',
                    planningWorkBoxChecked=='DP'?'isswitchBlockDoublePause':'',
                    workBoxLeftFromOuts?'isswitchBlockOut':'',
                  ]"
                  ></path>
              </g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
            </svg>
          </span>
          <span @click="clearRightSwitchSuggesst" v-if="planningWorkBoxChecked_With" class="change2" :class="[
            (planningWorkBoxChecked_With && planningWorkBoxChecked_ID_With == null) ? 'change2_equip' : '',
            (planningWorkBoxChecked_With == 'P' || planningWorkBoxChecked_With == 'DP') ? 'pauseChange' : '',
            (planningWorkBoxChecked_With == 'DP') ? 'dpChange' : '',
          ]">{{
            (planningWorkBoxChecked_ID_With == null) ? planningWorkBoxChecked_With?.matricule
              : planningWorkBoxChecked_With
          }}</span>
        </div>
        <div v-if="planningWorkDriver_Checked" class="switchBlock" :class="[
          !editMode ? 'displayNone' : '',
          isHighlighted?'switchBlockHighlighted':''
          ]">
          <span class="change1"

          @click="clearLeaftSwitchSuggesst_driver" :class="[
            planningWorkDriver_Checked ? 'change1_equip' : '',
            workBoxLeftFromOuts ? 'workBoxLeftFromOuts' : '',
          ]">{{ (planningWorkDriver_Checked_ID == null) ? planningWorkDriver_Checked?.matricule :
            planningWorkDriver_Checked
            }}</span>
          <span v-if="planningWorkDriver_Checked && planningWorkDriver_Checked_With" class="with"
            @click="doBoxSwitchingDrivers"

            >
            <svg data-v-02c85341="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1" id="Capa_1" x="0px" y="0px" width="984.85px" height="984.85px" viewBox="0 0 984.85 984.85"
              xml:space="preserve" >
              <g data-v-02c85341="">
                <path data-v-02c85341=""
                  d="M652.075,954.791c12.101,12,28.7,20.1,45.7,21.5c17.2,1.399,34.9-2.8,49.2-12.5c3.9-2.601,7.6-5.7,10.9-9l0.1-0.101   l204.9-204.899c29.3-29.3,29.3-76.8,0-106.101c-29.301-29.3-76.801-29.3-106.101,0l-76.899,76.9v-637c0-41.4-33.601-75-75-75   c-41.4,0-75,33.6-75,75v637l-78.9-78.9c-29.3-29.3-76.8-29.3-106.1,0c-29.301,29.301-29.301,76.801,0,106.101l207,207   C651.975,954.69,651.975,954.791,652.075,954.791z"
                  style="fill: rgba(251, 0, 0, 0.77)"></path>
                <path data-v-02c85341=""
                  d="M74.975,365.491c19.2,0,38.4-7.3,53-22l78.9-78.9v637c0,41.4,33.6,75,75,75s75-33.6,75-75v-637l76.899,76.9   c14.601,14.6,33.8,22,53,22s38.4-7.3,53-22c29.3-29.3,29.3-76.8,0-106.1c-5.399-5.4-10.899-10.9-16.3-16.3   c-13.3-13.3-26.5-26.7-39.9-39.9c-17.199-17.1-34.3-34.2-51.399-51.4c-16.8-17-34.2-33.5-50.9-50.7   c-16.2-16.6-32.6-32.9-49.899-48.5c-18-16.2-41.5-24.2-65.7-18.5c-6.2,1.4-12.8,3.8-18.4,6.9c-16.7,9.4-30,24.9-43.5,38.3   c-16.5,16.3-32.7,32.9-49.1,49.4c-19.5,19.6-39.2,39.1-58.8,58.6c-16.4,16.6-33,33.2-49.5,49.8c-8,8-16,15.9-24,23.9   c-0.1,0.1-0.3,0.3-0.4,0.4c-29.3,29.3-29.3,76.8,0,106.1C36.575,358.191,55.775,365.491,74.975,365.491z"
                  style="fill: #5c95ff"></path>
              </g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
              <g data-v-02c85341=""></g>
            </svg>
          </span>
          <span @click="clearRightSwitchSuggesst_driver" v-if="planningWorkDriver_Checked_With" class="change2" :class="[
            (planningWorkDriver_Checked_With == null) ? 'change2_equip' : '',
          ]">{{
            planningWorkDriver_Checked_With?.matricule
          }}</span>
        </div>
      </div>
      <h1>
        Shift: {{ actualShift.name ? actualShift.name : actualShift.category }}
      </h1>
      <h2>
        Date:
        {{ selectedDate.toLocaleDateString() + " - " }}
        <span v-if="ShiftIndex == 0">
          Morning
          <v-icon style="margin-top: 0px">mdi-white-balance-sunny</v-icon></span>
        <span v-if="ShiftIndex == 1">
          Evening
          <v-icon style="margin-top: 0px">mdi-theme-light-dark</v-icon></span>
        <span v-if="ShiftIndex == 2">
          Night <v-icon style="margin-top: 0px">mdi-power-sleep</v-icon></span>
      </h2>
    </v-col>
  </v-row>
  <v-row style="width: 100%; margin-bottom: 51px;    height: 79vh;background-color: white !important" class="mt-0">
    <v-data-table :headers="headers" :items="thisPlanningBoxes"
      class="elevation-1 tableOfThePlanning tableOfThePlanningShow custom-scrollbar" hide-default-footer
      :items-per-page="thisPlanningBoxes.length" style="width: 90%; margin: 0 auto">
      <template v-slot:thead="{ ssss, rowIndex }">
        <thead>
          <tr v-if="editMode" class="addDriverButtonClickableCase">
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
                color:white
              "
              class="pDpButtons"
              >
              <span
              class="pButton"
              :class="pauseButtonClickedOn?'pauseButtonClickedOn':''"
              @click="planningWorkBoxChecked?clickOnPauseButton():''">
                P
              </span>
              <span
              class="dpButton"
              :class="doublePauseButtonClickedOn?'doublePauseButtonClickedOn':''"
              @click="planningWorkBoxChecked?clickOnDoublePauseButton():''">
                DP
              </span>
            </th>
            <th v-for="(outs, index) in OutToBeInserted" :key="index" style="position: relative; margin: 0; padding: 0">
              <span class="selectEquipButton fullname" :class="[
                outs.list.length > 0 ? 'outEquipmentToBeInserted' : '',
                outs.checked ? 'selectEquipButtonSelected' : '',
                planningWorkBoxChecked_Index == (index + 2) && isOneIn(outs.list)!=null ? 'selectedOut' : '',
              ]" style="padding-top: 16px; z-index: 1" @click="outs.list.length > 0?outs.checked = !outs.checked:''">
               {{ planningWorkBoxChecked_Index == (index + 2) && isOneIn(outs.list)!=null? isOneIn(outs.list).matricule :('OUT ('+outs.list.length+')')}}
                <span v-if="outs.list.length > 0" class="equipemntOuts">
                  <span v-for="(outItem, index2) in outs.list" :key="index + index2"
                    @click="outItem = clickOnThePlanningWorkBox(outItem, index + 2, rowIndex, true);"
                    class="equipmentOutOne" :class="[
                      planningWorkBoxChecked_Index == (index + 2) && planningWorkBoxChecked?.matricule == outItem?.matricule ? 'outLeftToBeInserted' : '',
                      planningWorkBoxChecked_Index == (index + 2) && planningWorkBoxChecked_With?.matricule == outItem?.matricule ? 'outLeftToBeInserted_With' : '',
                    ]">
                    {{ outItem.matricule }}</span>
                </span>
              </span>
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:item="{ item, rowIndex }">
        <tr class="rowToEdit" :class="editMode ? 'clickableCase' : ''">
          <td width="15%" @click="editMode?item[0] = clickOnThePlanningWorkDriver(item[0], rowIndex, false):''" :class="[
            (planningWorkDriver_Checked && planningWorkDriver_Checked_Index == 0) ? 'planningWorkDriverColumChecked' : ((planningWorkDriver_Checked_Index != -1) ? 'planningWorkDriver_Checked_Not_Checked' : ''),
            (planningWorkDriver_Checked_Index == 0 && ((planningWorkDriver_Checked?.matricule) == item[0].matricule)) ? 'planningWorkDriver_Checked' : '',
            (planningWorkDriver_Checked_Index == 0 && ((planningWorkDriver_Checked_With?.matricule) == item[0].matricule)) ? 'planningWorkDriver_Checked_With' : '',
          ]">
            <span class="fullname" :class="item[0].shift_id != actualShift.id ? 'otherShiftBox' : ''"
              style="position: relative">{{
                item[0].matricule +
                ": " +
                item[0].firstname[0].toUpperCase() +
                item[0].firstname.slice(1)
              }}<br />
              {{ item[0].lastname.toUpperCase() }}
              <span class="otherShift" v-if="item[0].shift_id != actualShift.id">{{ getShiftByIndex(item[0].shift_id)
                }}</span>
            </span>
          </td>
          <td width="5%">
            <span class="wh workingHours">{{ item[0].workingHours }}</span>
          </td>
          <td v-for="(itemBox, index) in item.slice(1)" :key="itemBox+index"
            @click="editMode?itemBox = clickOnThePlanningWorkBox(itemBox, index + 2, rowIndex, false, (itemBox == 'P' || itemBox == 'DP') ? item[0].id : null):''"
            :class="[
              planningWorkBoxChecked && planningWorkBoxChecked_Index == (index + 2) ? 'planningWorkBoxColumChecked' : ((planningWorkBoxChecked_Index != -1) ? 'planningWorkBoxColum_Not_Checked' : ''),
              ifItsShouldbeSHown((index + 2), itemBox, item[0].id) ? 'planningWorkBoxChecked' : '',
              ((ifItsShouldbeSHown_With((index + 2), itemBox, item[0].id) && workBoxLeftFromOuts) || ifItsShouldbeSHown_With((index + 2), itemBox, item[0].id)) ? 'planningWorkBoxChecked_With' : '',

            ]">
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
  <template>
    <div class="pa-4 text-center">
      <v-dialog max-width="100%" v-model="saveDialogShow">
        <template v-slot:default="{ isActive }">
          <v-card class="dialogHeader">
            <div class="sticky-header">
              <v-toolbar flat>
                <v-toolbar-title>
                 {{ !getJustCreated?'CREATE ':'UPDATE ' }} RTG SHIFT PLANNING - {{ actualShift.name }} (Date:
                  {{ selectedDate.toLocaleDateString() }} -
                  {{ getShiftPeriode }}):
                </v-toolbar-title>
                <v-btn class="cancelButton" text="CANCEL" @click="isActive.value = false"></v-btn>
                <v-btn density="default" class="saveButton2"
                  @click="updateShowMode?openUpdateDialog():ifCheckEditedPlanning ? openClickApply() : openSaveCONFIRMDialog()">APPLY</v-btn>
              </v-toolbar>
            </div>
            <ConfirmPlanning :actualShift="actualShift" :selectedDate="selectedDate"
              :selectedPlanning="selectedPlanning" :ShiftIndex="ShiftIndex"
              :planningBoxes="getPlanningWithTheBoxes.planning_boxes" :ifCheckEditedPlanning="ifCheckEditedPlanning"
              :reloadPlanning="reloadPlanning" :checkEditedPlanning="checkEditedPlanning"
              :tempPlanning_forShow="tempPlanning_forShow" :ThisOutToBeInserted="ThisOutToBeInserted" />
            <v-card-actions class="mt-5"> </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </template>
  <template>
    <div class="text-center pa-4">
      <v-dialog v-model="updateShowDialog" max-width="500" persistent>
        <v-card class="confirmDialogInterface" prepend-icon="mdi-chat"
          text="Are you sure you want to apply this updates?" title="UPDATE PLANNING">
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn style="
                background-color: #f5f5f5bf;
                font-size: 13px;
                font-weight: bold;
                color: #00000094;
              " @click="updateShowDialog = false">
              No
            </v-btn>

            <v-btn style="
                background-color: green;
                font-size: 13px;
                font-weight: bold;
              " @click="updatePlanning">
              YES
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <template>
    <div class="text-center pa-4">
      <v-dialog v-model="applyDialogShow" max-width="500" persistent>
        <v-card class="confirmDialogInterface" prepend-icon="mdi-chat"
          text="Are you sure you want to apply this changes?" title="APPLY CHANGES">
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn style="
                background-color: #f5f5f5bf;
                font-size: 13px;
                font-weight: bold;
                color: #00000094;
              " @click="applyDialogShow = false">
              No
            </v-btn>

            <v-btn style="
                background-color: green;
                font-size: 13px;
                font-weight: bold;
              " @click="clickApply">
              YES
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <template>
    <div class="text-center pa-4">
      <v-dialog v-model="cancelOfChangesOfThePlanningShow" max-width="500" persistent>
        <v-card class="confirmDialogInterface" prepend-icon="mdi-chat"
          text="Are you sure you want to cancel this changes?" title="CONFIRM CHANGES">
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn style="
                background-color: #f5f5f5bf;
                font-size: 13px;
                font-weight: bold;
                color: #00000094;
              " @click="cancelOfChangesOfThePlanningShow = false">
              No
            </v-btn>

            <v-btn style="
                background-color:#ff0000ab;
                font-size: 13px;
                font-weight: bold;
              " @click="cancelOfChangesOfThePlanning_click">
              Yes
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <template>
    <div class="text-center pa-4">
      <v-dialog v-model="confirmChangesOfThePlanningShow" max-width="500" persistent>
        <v-card class="confirmDialogInterface" prepend-icon="mdi-chat"
          text="Are you sure you want to confirm this changes?" title="CONFIRM CHANGES">
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn style="
                background-color: #f5f5f5bf;
                font-size: 13px;
                font-weight: bold;
                color: #00000094;
              " @click="confirmChangesOfThePlanningShow = false">
              No
            </v-btn>

            <v-btn style="
                background-color:rgb(70 94 208);
                font-size: 13px;
                font-weight: bold;
              " @click="confirmChangesOfThePlanning_click">
              Yes
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <template>
    <div class="text-center pa-4">
      <v-dialog v-model="equipmentSwitch_delete_Dialog" max-width="500" persistent>
        <v-card class="confirmDialogInterface" prepend-icon="mdi-chat"
          text="Are you sure you want to delete this equipment?" title="DELETE EQUIPMENT">
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn style="
                background-color: #f5f5f5bf;
                font-size: 13px;
                font-weight: bold;
                color: #00000094;
              " @click="equipmentSwitch_delete_Dialog = false">
              No
            </v-btn>

            <v-btn style="
                background-color: #ff0000ab;
                font-size: 13px;
                font-weight: bold;
              " @click="equipmentEditClickDelete">
              Go back
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <template>
    <div class="text-center pa-4">
      <v-dialog v-model="equipmentSwitch_back_Dialog" max-width="500" persistent>
        <v-card class="confirmDialogInterface" prepend-icon="mdi-chat" :text="equipmentEditActions.length +
          ' change(s) have been made. Are you sure you want to revert them?'
          " title="CANCEL SWITCH">
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn style="
                background-color: #f5f5f5bf;
                font-size: 13px;
                font-weight: bold;
                color: #00000094;
              " @click="equipmentSwitch_back_Dialog = false">
              No
            </v-btn>

            <v-btn style="
                background-color: #ff0000ab;
                font-size: 13px;
                font-weight: bold;
              " @click="equipmentEditClickBack">
              Go back
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <template>
    <div class="text-center pa-4">
      <v-dialog v-model="equipmentSwitchDialog" max-width="500" persistent>
        <v-card class="confirmDialogInterface" prepend-icon="mdi-chat"
          text="Are you sure you want to swicth this equipment?" title="CONFIRM SWITCH">
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn style="
                background-color: #f5f5f5bf;
                font-size: 13px;
                font-weight: bold;
                color: #00000094;
              " @click="equipmentSwitchDialog = false">
              No
            </v-btn>

            <v-btn style="
                background-color: rgb(102 81 208);
                font-size: 13px;
                font-weight: bold;
              " @click="equipmentEditClickConfirm">
              Yes
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <template>
    <div class="text-center pa-4">
      <v-dialog v-model="addDialog" max-width="500" persistent>
        <v-card class="confirmDialogInterface" prepend-icon="mdi-chat"
          text="Are you sure you want to add this driver(s)?" title="CONFIRM ADD">
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn style="
                background-color: #f5f5f5bf;
                font-size: 13px;
                font-weight: bold;
                color: #00000094;
              " @click="addDialog = false">
              No
            </v-btn>

            <v-btn style="
                background-color: rgb(67 129 200);
                font-size: 13px;
                font-weight: bold;
              " @click="confirmAddDrivers">
              Yes
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <template>
    <div class="text-center pa-4">
      <v-dialog v-model="switchDialog" max-width="500" persistent>
        <v-card class="confirmDialogInterface" prepend-icon="mdi-chat"
          text="Are you sure you want to switch this driver(s)?" title="CONFIRM SWITCH">
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn style="
                background-color: #f5f5f5bf;
                font-size: 13px;
                font-weight: bold;
                color: #00000094;
              " @click="switchDialog = false">
              No
            </v-btn>

            <v-btn style="
                background-color: rgb(53, 113, 38);
                font-size: 13px;
                font-weight: bold;
              " @click="switchConfirm">
              Yes
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <template>
    <div class="text-center pa-4">
      <v-dialog v-model="deleteDialog" max-width="500" persistent>
        <v-card class="confirmDialogInterface" prepend-icon="mdi-chat"
          text="Are you sure you want to delete this driver(s)?" title="CONFIRM DELETE">
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn style="
                background-color: #f5f5f5bf;
                font-size: 13px;
                font-weight: bold;
                color: #00000094;
              " @click="deleteDialog = false">
              No
            </v-btn>

            <v-btn style="
                background-color: #ff0000ab;
                font-size: 13px;
                font-weight: bold;
              " @click="deletFromDriversInPlanningWithChecked">
              Yes
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <template>
    <div class="text-center pa-4">
      <v-dialog v-model="confirmDialog" max-width="500" persistent>
        <v-card class="confirmDialogInterface" prepend-icon="mdi-chat-alert"
          text="Are you sure you want to save this planning?" title="CONFIRM SAVE">
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn style="
                background-color: #f5f5f5bf;
                font-size: 13px;
                font-weight: bold;
                color: #00000094;
              " @click="confirmDialog = false">
              No
            </v-btn>

            <v-btn style="
                background-color: rgb(67 129 200);
                font-size: 13px;
                font-weight: bold;
              " @click="savePlanning">
              Yes
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <template>
    <div class="text-center pa-4">
      <v-dialog v-model="cancelDialog" max-width="500" persistent>
        <v-card class="confirmDialogInterface" prepend-icon="mdi-trash-can-outline"
          text="Are you sure you want to cancel this planning?" title="CANCEL CREATE">
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn @click="cancelDialog = false"> No </v-btn>

            <v-btn @click="backToCreate"> Yes </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <template>
    <div class="text-center pa-4">
      <v-dialog v-model="cancelUPDATEDialog" max-width="500" persistent>
        <v-card class="confirmDialogInterface" prepend-icon="mdi-trash-can-outline"
          text="Are you sure you want to cancel this changes?" title="CANCEL UPDATE">
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn @click="cancelUPDATEDialog = false"> No </v-btn>

            <v-btn @click="DocancelUPDATEDialog"> Yes </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <template>
    <div class="text-center pa-4">
      <v-dialog v-model="editDriversEquipmentsDialog" max-width="80%" persistent>
        <v-card class="confirmDialogInterface driversInPlanningWithCheckCard">
          <v-row class="confirmDialogInterfaceHeader">
            <v-col cols="6" class="children" :class="selectedChangeEDSow == 0 ? 'selectedChangeEDSow' : ''"
              @click="tabDriversSelect"><v-icon class="thisIcon">mdi-account-group</v-icon>
              DRIVERS ({{ this.driversInPlanningWithCheck.length }})</v-col>
            <v-col cols="6" class="children" :class="selectedChangeEDSow == 1 ? 'selectedChangeEDSow' : ''"
              @click="tabEqipmentSelect"><v-icon class="thisIcon">mdi-gantry-crane</v-icon>
              EQUIPMENT ({{ this.equipmentsInPlanningWithCheck.length }})</v-col>
          </v-row>
          <v-row v-if="selectedChangeEDSow == 0">
            <v-col cols="11" style="margin: 0 auto">
              <v-row>
                <v-col v-if="false" cols="5" style="margin-bottom: 12px; padding: 0; min-height: 31px"
                  @click="allBothAddButton_hold = !allBothAddButton_hold">
                  <div class="allBothAddButton holdD" :class="allBothAddButton_hold ? 'holdDChecked cancelX' : ''">
                    <span> </span>
                    <hr width="100%" />
                  </div>
                </v-col>
                <v-col cols="5" style="
                    margin-bottom: 12px;
                    padding: 0;
                    min-height: 31px;
                    color: #ffffffcf;
                  " @click="allBothAddButton_hold = !allBothAddButton_hold">
                  <span style="font-size: 16px; font-weight: bolder">SHIFT {{ actualShift.name }} :
                    {{ selectedDate.toLocaleDateString() + " - " }}
                    <span v-if="ShiftIndex == 0"> MORNING</span>
                    <span v-if="ShiftIndex == 1"> EVENING</span>
                    <span v-if="ShiftIndex == 2"> NIGHT</span></span>
                </v-col>

                <v-col cols="2"></v-col>

                <v-col cols="5" v-if="
                  !allBothNextDrivers &&
                  !allBothAddButton_delete &&
                  !allBothAddButton_switch
                " style="margin-bottom: 12px; padding: 0" class="allBothAddButton addD"
                  @click="openChangeDriverDialog">
                  <div>
                    ADD DRIVERS
                    <span> </span>
                  </div>
                  <hr width="100%" />
                </v-col>

                <v-col cols="5" v-if="allBothAddButton_switch || allBothAddButton_delete"
                  style="margin-bottom: 12px; padding: 0" class="selectAllD" :class="driversInPlanningWithCheck.length ==
                    driversInPlanningWithChecked.length
                    ? 'selectAllDChecked'
                    : ''
                    " @click="setSelectAllDrivers">
                  <div>
                    SELECT ALL ({{ driversInPlanningWithChecked.length }})
                    <span> </span>
                    <hr width="100%" />
                  </div>
                </v-col>

                <v-col cols="12" class="ma-0 pa-0" style="margin: 0 auto">
                  <v-data-table :headers="driverSelectionHeaderWithShift" :items="driversInPlanningWithCheck"
                    class="elevation-1 tableOfAllDrivers tableOfAllDrivers custom-scrollbar" hide-default-footer
                    :items-per-page="driversInPlanningWithCheck.length" style="
                      width: 100%;
                      margin: 0 auto;
                      margin-bottom: 27px !important;
                    ">
                    <template v-slot:item="{ item }">
                      <tr :class="[
                        showSelect ? 'actionHolder' : '',
                        item.checked && allBothAddButton_delete
                          ? 'actionHolderDelete'
                          : '',
                        item.checked && allBothAddButton_switch
                          ? 'actionHolderSwitch'
                          : '',
                        item.shift_id != actualShift.id
                          ? 'notFromThisShift'
                          : '',
                      ]" @click="
                        showSelect ? (item.checked = !item.checked) : ''
                        " :disabled="true">
                        <td>
                          <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{ item.matricule }}
                          </span>
                        </td>

                        <td>
                          <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{
                            item.firstname[0].toUpperCase() +
                            item.firstname.slice(1)
                          }}
                          </span>
                        </td>

                        <td>
                          <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{
                            item.lastname.toUpperCase() }}</span>
                        </td>

                        <td>
                          <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{
                            getShiftByIndex(item.shift_id) }}</span>
                        </td>

                        <td>
                          <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{ item.workingHours
                            }}</span>
                        </td>

                        <td v-if="
                          !allBothNextDrivers &&
                          (allBothAddButton_delete || allBothAddButton_switch)
                        ">
                          <span class="fullname action" :class="item.checked ? 'checkedAction' : 'uncheckedAction'
                            "></span>
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-col>

                <v-col cols="5" style="margin-bottom: 12px; padding: 0"
                  @click="allBothAddButton_delete = !allBothAddButton_delete">
                  <div v-if="!allBothNextDrivers && !allBothAddButton_switch" class="allBothAddButton deleteD" :class="allBothAddButton_delete ? 'deleteDChecked cancelX' : ''
                    ">
                    {{ allBothAddButton_delete ? "CANCEL" : "DELETE DRIVERS" }}
                    <span> </span>
                    <hr width="100%" />
                  </div>
                </v-col>

                <v-col cols="2"></v-col>

                <v-col cols="5" style="margin-bottom: 12px; padding: 0; min-height: 31px"
                  @click="allBothAddButton_switch = !allBothAddButton_switch">
                  <div class="allBothAddButton switchD" :class="allBothAddButton_switch ? 'switchDChecked cancelX' : ''
                    " v-if="!allBothNextDrivers && !allBothAddButton_delete">
                    {{ allBothAddButton_switch ? "CANCEL" : "SWITCH DRIVERS" }}

                    <span @click="setSelectAllDrivers"> </span>
                    <hr width="100%" />
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row v-if="selectedChangeEDSow == 1" class="equipmentEditMaster">
            <v-col cols="11" :class="allBothAddButton_switch ? 'speadForEdit' : ''" style="margin: 0 auto">
              <v-row>
                <v-col cols="5" style="
                    margin-bottom: 12px;
                    padding: 0;
                    min-height: 31px;
                    color: #ffffffcf;
                  " @click="allBothAddButton_hold = !allBothAddButton_hold">
                  <span style="font-size: 16px; font-weight: bolder">SHIFT {{ actualShift.name }} :
                    {{ selectedDate.toLocaleDateString() + " - " }}
                    <span v-if="ShiftIndex == 0"> MORNING</span>
                    <span v-if="ShiftIndex == 1"> EVENING</span>
                    <span v-if="ShiftIndex == 2"> NIGHT</span></span>
                </v-col>

                <v-col v-if="!allBothAddButton_switch" cols="2"></v-col>
                <v-col v-else cols="2"></v-col>

                <v-col cols="5" style="margin-bottom: 12px; padding: 0; min-height: 31px"
                  @click="allBothAddButton_switch = !allBothAddButton_switch" v-if="!allBothAddButton_switch">
                  <div class="allBothAddButton addD" :class="allBothAddButton_switch ? 'addDChecked cancelX' : ''
                    " v-if="!allBothNextDrivers && !allBothAddButton_delete" @click="openAddEquipment">
                    SWITCH RTG(s)
                    <span> </span>
                    <hr width="100%" />
                  </div>
                </v-col>

                <v-col cols="2" style="margin-bottom: 12px; padding: 0; min-height: 31px" @click="clear"
                  v-if="allBothAddButton_switch">
                  <div class="cancelEquipment" :class="[
                    allBothAddButton_switch ? ' cancelX' : '',
                    equipmentEditCheckedForSwitch ||
                      equipmentEditCheckedForSwitchWith ||
                      equipmentEditAddOn
                      ? 'selectebale'
                      : '',
                  ]" v-if="!allBothNextDrivers && !allBothAddButton_delete">
                    CLEAR
                    <span @click="setSelectAllDrivers"> </span>
                    <hr width="100%" />
                  </div>
                </v-col>

                <v-col cols="3" style="margin-bottom: 12px; padding: 0; min-height: 31px" @click="
                  equipmentEditCheckedForSwitch &&
                    equipmentEditCheckedForSwitchWith
                    ? switchBetweenEquipments()
                    : itsAdd
                      ? addEquipment()
                      : ''
                  " v-if="allBothAddButton_switch">
                  <div class="switchEquipment" :class="(equipmentEditCheckedForSwitch &&
                    equipmentEditCheckedForSwitchWith) ||
                    itsAdd
                    ? 'selectebale'
                    : ''
                    " v-if="!allBothNextDrivers && !allBothAddButton_delete">
                    {{ itsAdd ? "ADD" : "SWITCH" }}
                    <span v-if="itsAdd">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="800px"
                        width="800px" version="1.1" id="Capa_1" viewBox="0 0 309.059 309.059" xml:space="preserve"
                        style="height: 25px; width: 50px">
                        <g>
                          <g>
                            <path style="fill: #2196f3"
                              d="M280.71,126.181h-97.822V28.338C182.889,12.711,170.172,0,154.529,0S126.17,12.711,126.17,28.338    v97.843H28.359C12.722,126.181,0,138.903,0,154.529c0,15.621,12.717,28.338,28.359,28.338h97.811v97.843    c0,15.632,12.711,28.348,28.359,28.348c15.643,0,28.359-12.717,28.359-28.348v-97.843h97.822    c15.632,0,28.348-12.717,28.348-28.338C309.059,138.903,296.342,126.181,280.71,126.181z" />
                          </g>
                        </g>
                      </svg>
                    </span>
                    <span v-else-if="checkIfEquipmentIsGoingToBrDeleted">
                      <svg data-v-02c85341="" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                        width="984.85px" height="984.85px" viewBox="0 0 984.85 984.85" xml:space="preserve"
                        style="height: 25px; width: 50px">
                        <g data-v-02c85341="">
                          <path data-v-02c85341=""
                            d="M652.075,954.791c12.101,12,28.7,20.1,45.7,21.5c17.2,1.399,34.9-2.8,49.2-12.5c3.9-2.601,7.6-5.7,10.9-9l0.1-0.101   l204.9-204.899c29.3-29.3,29.3-76.8,0-106.101c-29.301-29.3-76.801-29.3-106.101,0l-76.899,76.9v-637c0-41.4-33.601-75-75-75   c-41.4,0-75,33.6-75,75v637l-78.9-78.9c-29.3-29.3-76.8-29.3-106.1,0c-29.301,29.301-29.301,76.801,0,106.101l207,207   C651.975,954.69,651.975,954.791,652.075,954.791z"
                            style="fill: rgba(251, 0, 0, 0.77)"></path>
                          <path data-v-02c85341=""
                            d="M74.975,365.491c19.2,0,38.4-7.3,53-22l78.9-78.9v637c0,41.4,33.6,75,75,75s75-33.6,75-75v-637l76.899,76.9   c14.601,14.6,33.8,22,53,22s38.4-7.3,53-22c29.3-29.3,29.3-76.8,0-106.1c-5.399-5.4-10.899-10.9-16.3-16.3   c-13.3-13.3-26.5-26.7-39.9-39.9c-17.199-17.1-34.3-34.2-51.399-51.4c-16.8-17-34.2-33.5-50.9-50.7   c-16.2-16.6-32.6-32.9-49.899-48.5c-18-16.2-41.5-24.2-65.7-18.5c-6.2,1.4-12.8,3.8-18.4,6.9c-16.7,9.4-30,24.9-43.5,38.3   c-16.5,16.3-32.7,32.9-49.1,49.4c-19.5,19.6-39.2,39.1-58.8,58.6c-16.4,16.6-33,33.2-49.5,49.8c-8,8-16,15.9-24,23.9   c-0.1,0.1-0.3,0.3-0.4,0.4c-29.3,29.3-29.3,76.8,0,106.1C36.575,358.191,55.775,365.491,74.975,365.491z"
                            style="fill: rgb(92, 149, 255)"></path>
                        </g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                      </svg></span>
                    <span v-else>
                      <svg data-v-02c85341="" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                        width="984.85px" height="984.85px" viewBox="0 0 984.85 984.85" xml:space="preserve" style="
                          height: 25px;
                          width: 50px;
                          transform: rotateZ(90deg);
                        ">
                        <g data-v-02c85341="">
                          <path data-v-02c85341=""
                            d="M652.075,954.791c12.101,12,28.7,20.1,45.7,21.5c17.2,1.399,34.9-2.8,49.2-12.5c3.9-2.601,7.6-5.7,10.9-9l0.1-0.101   l204.9-204.899c29.3-29.3,29.3-76.8,0-106.101c-29.301-29.3-76.801-29.3-106.101,0l-76.899,76.9v-637c0-41.4-33.601-75-75-75   c-41.4,0-75,33.6-75,75v637l-78.9-78.9c-29.3-29.3-76.8-29.3-106.1,0c-29.301,29.301-29.301,76.801,0,106.101l207,207   C651.975,954.69,651.975,954.791,652.075,954.791z"
                            style="fill: rgba(0, 166, 251, 0.77)"></path>
                          <path data-v-02c85341=""
                            d="M74.975,365.491c19.2,0,38.4-7.3,53-22l78.9-78.9v637c0,41.4,33.6,75,75,75s75-33.6,75-75v-637l76.899,76.9   c14.601,14.6,33.8,22,53,22s38.4-7.3,53-22c29.3-29.3,29.3-76.8,0-106.1c-5.399-5.4-10.899-10.9-16.3-16.3   c-13.3-13.3-26.5-26.7-39.9-39.9c-17.199-17.1-34.3-34.2-51.399-51.4c-16.8-17-34.2-33.5-50.9-50.7   c-16.2-16.6-32.6-32.9-49.899-48.5c-18-16.2-41.5-24.2-65.7-18.5c-6.2,1.4-12.8,3.8-18.4,6.9c-16.7,9.4-30,24.9-43.5,38.3   c-16.5,16.3-32.7,32.9-49.1,49.4c-19.5,19.6-39.2,39.1-58.8,58.6c-16.4,16.6-33,33.2-49.5,49.8c-8,8-16,15.9-24,23.9   c-0.1,0.1-0.3,0.3-0.4,0.4c-29.3,29.3-29.3,76.8,0,106.1C36.575,358.191,55.775,365.491,74.975,365.491z"
                            style="fill: rgb(0, 40, 85)"></path>
                        </g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                        <g data-v-02c85341=""></g>
                      </svg></span>
                    <hr width="100%" />
                  </div>
                </v-col>

                <v-col cols="5" v-if="allBothAddButton_switch || allBothAddButton_delete"
                  style="margin-bottom: 12px; padding: 0" class="selectAllD" :class="driversInPlanningWithCheck.length ==
                    driversInPlanningWithChecked.length
                    ? 'selectAllDChecked'
                    : ''
                    " @click="setSelectAllDrivers">
                </v-col>
                <v-col cols="11" class="pa-0" style="margin: 0 auto">
                  <v-row style="padding: 0 !important" class="equipmentInRow">
                    <v-col cols="12" :style="{
                      padding: allBothAddButton_switch ? '0 !important' : '',
                      overflow: hidden,
                    }">
                      <span v-if="allBothAddButton_switch" class="switchEquipmentIn" :class="checkIfEquipmentIsGoingToBrDeleted
                        ? 'switchEquipmentInCheckTag'
                        : ''
                        ">
                        IN
                      </span>
                      <span v-if="
                        allBothAddButton_switch &&
                        equipmentEditActions.length > 0
                      " class="equipmentActionController">
                        <span class="undo" @click="canDoAction ? equipmentUndo() : ''"
                          :class="actionIndex == -1 ? 'whenZero' : ''">
                          UNDO
                          <span class="undoLogo" v-if="
                            equipmentEditActions[actionIndex]?.action == 'add'
                          ">
                            <svg data-v-02c85341="" xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink" height="800px" width="800px" version="1.1"
                              id="Capa_1" viewBox="0 0 309.059 309.059" xml:space="preserve" style="
                                height: 18px;
                                width: 18px;
                                margin-top: 1px !important;
                              ">
                              <g data-v-02c85341="">
                                <g data-v-02c85341="">
                                  <path data-v-02c85341=""
                                    d="M280.71,126.181h-97.822V28.338C182.889,12.711,170.172,0,154.529,0S126.17,12.711,126.17,28.338    v97.843H28.359C12.722,126.181,0,138.903,0,154.529c0,15.621,12.717,28.338,28.359,28.338h97.811v97.843    c0,15.632,12.711,28.348,28.359,28.348c15.643,0,28.359-12.717,28.359-28.348v-97.843h97.822    c15.632,0,28.348-12.717,28.348-28.338C309.059,138.903,296.342,126.181,280.71,126.181z"
                                    style="fill: rgb(33, 150, 243)"></path>
                                </g>
                              </g>
                            </svg>
                          </span>
                          <span class="undoLogo" v-if="
                            equipmentEditActions[actionIndex]?.action ==
                            'switchV'
                          ">
                            <svg data-v-02c85341="" xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                              width="984.85px" height="984.85px" viewBox="0 0 984.85 984.85" xml:space="preserve"
                              style="height: 19px; width: 19px">
                              <g data-v-02c85341="">
                                <path data-v-02c85341=""
                                  d="M652.075,954.791c12.101,12,28.7,20.1,45.7,21.5c17.2,1.399,34.9-2.8,49.2-12.5c3.9-2.601,7.6-5.7,10.9-9l0.1-0.101   l204.9-204.899c29.3-29.3,29.3-76.8,0-106.101c-29.301-29.3-76.801-29.3-106.101,0l-76.899,76.9v-637c0-41.4-33.601-75-75-75   c-41.4,0-75,33.6-75,75v637l-78.9-78.9c-29.3-29.3-76.8-29.3-106.1,0c-29.301,29.301-29.301,76.801,0,106.101l207,207   C651.975,954.69,651.975,954.791,652.075,954.791z"
                                  style="fill: rgba(0, 166, 251, 0.77)"></path>
                                <path data-v-02c85341=""
                                  d="M74.975,365.491c19.2,0,38.4-7.3,53-22l78.9-78.9v637c0,41.4,33.6,75,75,75s75-33.6,75-75v-637l76.899,76.9   c14.601,14.6,33.8,22,53,22s38.4-7.3,53-22c29.3-29.3,29.3-76.8,0-106.1c-5.399-5.4-10.899-10.9-16.3-16.3   c-13.3-13.3-26.5-26.7-39.9-39.9c-17.199-17.1-34.3-34.2-51.399-51.4c-16.8-17-34.2-33.5-50.9-50.7   c-16.2-16.6-32.6-32.9-49.899-48.5c-18-16.2-41.5-24.2-65.7-18.5c-6.2,1.4-12.8,3.8-18.4,6.9c-16.7,9.4-30,24.9-43.5,38.3   c-16.5,16.3-32.7,32.9-49.1,49.4c-19.5,19.6-39.2,39.1-58.8,58.6c-16.4,16.6-33,33.2-49.5,49.8c-8,8-16,15.9-24,23.9   c-0.1,0.1-0.3,0.3-0.4,0.4c-29.3,29.3-29.3,76.8,0,106.1C36.575,358.191,55.775,365.491,74.975,365.491z"
                                  style="fill: rgb(0, 40, 85)"></path>
                              </g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                            </svg>
                          </span>
                          <span class="undoLogo" v-if="
                            equipmentEditActions[actionIndex]?.action ==
                            'switchH'
                          ">
                            <svg data-v-02c85341="" xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                              width="984.85px" height="984.85px" viewBox="0 0 984.85 984.85" xml:space="preserve" style="
                                height: 18px;
                                width: 18px;
                                transform: rotateZ(90deg);
                              ">
                              <g data-v-02c85341="">
                                <path data-v-02c85341=""
                                  d="M652.075,954.791c12.101,12,28.7,20.1,45.7,21.5c17.2,1.399,34.9-2.8,49.2-12.5c3.9-2.601,7.6-5.7,10.9-9l0.1-0.101   l204.9-204.899c29.3-29.3,29.3-76.8,0-106.101c-29.301-29.3-76.801-29.3-106.101,0l-76.899,76.9v-637c0-41.4-33.601-75-75-75   c-41.4,0-75,33.6-75,75v637l-78.9-78.9c-29.3-29.3-76.8-29.3-106.1,0c-29.301,29.301-29.301,76.801,0,106.101l207,207   C651.975,954.69,651.975,954.791,652.075,954.791z"
                                  style="fill: rgba(0, 166, 251, 0.77)"></path>
                                <path data-v-02c85341=""
                                  d="M74.975,365.491c19.2,0,38.4-7.3,53-22l78.9-78.9v637c0,41.4,33.6,75,75,75s75-33.6,75-75v-637l76.899,76.9   c14.601,14.6,33.8,22,53,22s38.4-7.3,53-22c29.3-29.3,29.3-76.8,0-106.1c-5.399-5.4-10.899-10.9-16.3-16.3   c-13.3-13.3-26.5-26.7-39.9-39.9c-17.199-17.1-34.3-34.2-51.399-51.4c-16.8-17-34.2-33.5-50.9-50.7   c-16.2-16.6-32.6-32.9-49.899-48.5c-18-16.2-41.5-24.2-65.7-18.5c-6.2,1.4-12.8,3.8-18.4,6.9c-16.7,9.4-30,24.9-43.5,38.3   c-16.5,16.3-32.7,32.9-49.1,49.4c-19.5,19.6-39.2,39.1-58.8,58.6c-16.4,16.6-33,33.2-49.5,49.8c-8,8-16,15.9-24,23.9   c-0.1,0.1-0.3,0.3-0.4,0.4c-29.3,29.3-29.3,76.8,0,106.1C36.575,358.191,55.775,365.491,74.975,365.491z"
                                  style="fill: rgb(0, 40, 85)"></path>
                              </g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                            </svg>
                          </span>
                        </span>
                        <span class="val">{{ actionIndex + 1 }}</span>
                        <span class="do" @click="canDoAction ? equipmentRedo() : ''" :class="actionIndex == equipmentEditActions.length - 1
                          ? 'whenZero'
                          : ''
                          ">
                          REDO
                          <span class="undoLogo" v-if="
                            equipmentEditActions[actionIndex + 1]?.action ==
                            'add'
                          ">
                            <svg data-v-02c85341="" xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink" height="800px" width="800px" version="1.1"
                              id="Capa_1" viewBox="0 0 309.059 309.059" xml:space="preserve" style="
                                height: 15px;
                                width: 15px;
                                margin-top: 1px !important;
                              ">
                              <g data-v-02c85341="">
                                <g data-v-02c85341="">
                                  <path data-v-02c85341=""
                                    d="M280.71,126.181h-97.822V28.338C182.889,12.711,170.172,0,154.529,0S126.17,12.711,126.17,28.338    v97.843H28.359C12.722,126.181,0,138.903,0,154.529c0,15.621,12.717,28.338,28.359,28.338h97.811v97.843    c0,15.632,12.711,28.348,28.359,28.348c15.643,0,28.359-12.717,28.359-28.348v-97.843h97.822    c15.632,0,28.348-12.717,28.348-28.338C309.059,138.903,296.342,126.181,280.71,126.181z"
                                    style="fill: rgb(33, 150, 243)"></path>
                                </g>
                              </g>
                            </svg>
                          </span>
                          <span class="undoLogo" v-if="
                            equipmentEditActions[actionIndex + 1]?.action ==
                            'switchV'
                          ">
                            <svg data-v-02c85341="" xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                              width="984.85px" height="984.85px" viewBox="0 0 984.85 984.85" xml:space="preserve"
                              style="height: 19px; width: 19px">
                              <g data-v-02c85341="">
                                <path data-v-02c85341=""
                                  d="M652.075,954.791c12.101,12,28.7,20.1,45.7,21.5c17.2,1.399,34.9-2.8,49.2-12.5c3.9-2.601,7.6-5.7,10.9-9l0.1-0.101   l204.9-204.899c29.3-29.3,29.3-76.8,0-106.101c-29.301-29.3-76.801-29.3-106.101,0l-76.899,76.9v-637c0-41.4-33.601-75-75-75   c-41.4,0-75,33.6-75,75v637l-78.9-78.9c-29.3-29.3-76.8-29.3-106.1,0c-29.301,29.301-29.301,76.801,0,106.101l207,207   C651.975,954.69,651.975,954.791,652.075,954.791z"
                                  style="fill: rgba(0, 166, 251, 0.77)"></path>
                                <path data-v-02c85341=""
                                  d="M74.975,365.491c19.2,0,38.4-7.3,53-22l78.9-78.9v637c0,41.4,33.6,75,75,75s75-33.6,75-75v-637l76.899,76.9   c14.601,14.6,33.8,22,53,22s38.4-7.3,53-22c29.3-29.3,29.3-76.8,0-106.1c-5.399-5.4-10.899-10.9-16.3-16.3   c-13.3-13.3-26.5-26.7-39.9-39.9c-17.199-17.1-34.3-34.2-51.399-51.4c-16.8-17-34.2-33.5-50.9-50.7   c-16.2-16.6-32.6-32.9-49.899-48.5c-18-16.2-41.5-24.2-65.7-18.5c-6.2,1.4-12.8,3.8-18.4,6.9c-16.7,9.4-30,24.9-43.5,38.3   c-16.5,16.3-32.7,32.9-49.1,49.4c-19.5,19.6-39.2,39.1-58.8,58.6c-16.4,16.6-33,33.2-49.5,49.8c-8,8-16,15.9-24,23.9   c-0.1,0.1-0.3,0.3-0.4,0.4c-29.3,29.3-29.3,76.8,0,106.1C36.575,358.191,55.775,365.491,74.975,365.491z"
                                  style="fill: rgb(0, 40, 85)"></path>
                              </g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                            </svg>
                          </span>
                          <span class="undoLogo" v-if="
                            equipmentEditActions[actionIndex + 1]?.action ==
                            'switchH'
                          ">
                            <svg data-v-02c85341="" xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                              width="984.85px" height="984.85px" viewBox="0 0 984.85 984.85" xml:space="preserve" style="
                                height: 18px;
                                width: 18px;
                                transform: rotateZ(90deg);
                              ">
                              <g data-v-02c85341="">
                                <path data-v-02c85341=""
                                  d="M652.075,954.791c12.101,12,28.7,20.1,45.7,21.5c17.2,1.399,34.9-2.8,49.2-12.5c3.9-2.601,7.6-5.7,10.9-9l0.1-0.101   l204.9-204.899c29.3-29.3,29.3-76.8,0-106.101c-29.301-29.3-76.801-29.3-106.101,0l-76.899,76.9v-637c0-41.4-33.601-75-75-75   c-41.4,0-75,33.6-75,75v637l-78.9-78.9c-29.3-29.3-76.8-29.3-106.1,0c-29.301,29.301-29.301,76.801,0,106.101l207,207   C651.975,954.69,651.975,954.791,652.075,954.791z"
                                  style="fill: rgba(0, 166, 251, 0.77)"></path>
                                <path data-v-02c85341=""
                                  d="M74.975,365.491c19.2,0,38.4-7.3,53-22l78.9-78.9v637c0,41.4,33.6,75,75,75s75-33.6,75-75v-637l76.899,76.9   c14.601,14.6,33.8,22,53,22s38.4-7.3,53-22c29.3-29.3,29.3-76.8,0-106.1c-5.399-5.4-10.899-10.9-16.3-16.3   c-13.3-13.3-26.5-26.7-39.9-39.9c-17.199-17.1-34.3-34.2-51.399-51.4c-16.8-17-34.2-33.5-50.9-50.7   c-16.2-16.6-32.6-32.9-49.899-48.5c-18-16.2-41.5-24.2-65.7-18.5c-6.2,1.4-12.8,3.8-18.4,6.9c-16.7,9.4-30,24.9-43.5,38.3   c-16.5,16.3-32.7,32.9-49.1,49.4c-19.5,19.6-39.2,39.1-58.8,58.6c-16.4,16.6-33,33.2-49.5,49.8c-8,8-16,15.9-24,23.9   c-0.1,0.1-0.3,0.3-0.4,0.4c-29.3,29.3-29.3,76.8,0,106.1C36.575,358.191,55.775,365.491,74.975,365.491z"
                                  style="fill: rgb(0, 40, 85)"></path>
                              </g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                            </svg>
                          </span>
                        </span>
                      </span>
                      <v-row class="custom-scrollbar equipmentEdit" style="
                          width: 100%;
                          display: flex;
                          flex-wrap: wrap;
                          align-content: flex-start;
                          margin-top: 1px;
                          overflow: overlay;
                          overflow-x: hidden !important;
                        " :class="allBothAddButton_switch && !allBothAddButton_delete
                          ? 'toAddOrSwitchEqp'
                          : ''
                          ">
                        <v-col cols="3" v-for="item in equipmentsInPlanningWithCheck" :class="[
                          showSelect ? 'actionHolder' : '',
                          item?.checked && allBothAddButton_delete
                            ? 'actionHolderDelete'
                            : '',
                          item?.checked &&
                            !allBothAddButton_delete &&
                            allBothAddButton_switch
                            ? 'actionHolderSwit'
                            : '',
                        ]" @click="
                          showSelect
                            ? allBothAddButton_delete
                              ? (item.checked = !item.checked)
                              : (item =
                                setEquipmentEditCheckedForSwitchWith(item))
                            : ''
                          " :disabled="true" style="
                            padding: 0;
                            margin: 0;
                            width: 100%;
                            min-height: 100px !important;
                          ">
                          <span :class="equipmentCheckedForSwitch(item) &&
                            !allBothAddButton_delete
                            ? 'checkForSwitchWith'
                            : ''
                            " class="checkForSwitchThisHide">{{
                              toBeOProposedOutOutCmp(item) &&
                                !allBothAddButton_delete
                                ? equipmentEditCheckedForSwitchWith?.matricule
                                : equipmentEditCheckedForSwitch?.id ==
                                  item?.id || toBeOProposedInInCmp(item)
                                  ? item?.matricule
                                  : ""
                            }}
                          </span>
                          <span class="fullname" :class="[
                            equipmentCheckedForSwitch(item) &&
                              checkIfEquipmentIsGoingToBrDeleted &&
                              !allBothAddButton_delete
                              ? 'EquipmentIfGonnaBeDeleted'
                              : '',
                            item?.checked ? '' : '',
                            equipmentCheckedForSwitch(item) &&
                              !allBothAddButton_delete
                              ? 'checkForSwitchThis'
                              : '',
                            toBeOutAndInCmp(item) && !allBothAddButton_delete
                              ? 'checkForSwitch'
                              : '',
                          ]">{{
                            equipmentCheckedForSwitch(item) &&
                              !allBothAddButton_delete
                              ? InSwitch(item)
                                ? equipmentEditCheckedForSwitchWith?.matricule
                                : equipmentEditCheckedForSwitch?.matricule
                              : item.matricule
                          }}
                          </span>
                        </v-col>

                        <v-col v-if="allBothAddButton_switch" cols="3" :class="[
                          showSelect ? 'actionHolder' : '',
                          equipmentEditCheckedForAdd?.checked &&
                            allBothAddButton_switch
                            ? ''
                            : '',
                        ]" :disabled="true" style="
                            padding: 0;
                            margin: 0;
                            width: 100%;
                            min-height: 100px !important;
                            background-color: #002855 !important;
                          " class="equipmentForAdd" @click="setEquipmentAdd(null)">
                          <span :class="equipmentEditAddOn ? 'checkForSwitchWith' : ''
                            ">
                            {{ equipmentEditAddOn ? "ADD" : "" }}
                          </span>
                          <span class="fullname" :class="equipmentEditAddOn ? 'checkForSwitchThis' : ''
                            ">
                            <v-icon v-if="!equipmentEditAddOn" class="thisIcon">mdi-plus</v-icon>
                            {{
                              equipmentEditAddOn
                                ? equipmentEditCheckedForAdd.matricule
                                : ""
                            }}
                          </span>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row style="margin-right: 16px">
                    <v-col cols="12" style="
                        max-height: 83px;
                        min-height: 83px;
                        padding-top: 32px !important;
                        user-select: none;
                      "><v-row v-if="
                        allBothAddButton_switch &&
                        equipmentEditCheckedForSwitch != null &&
                        equipmentEditCheckedForSwitch?.matricule !=
                        equipmentEditCheckedForSwitchWith?.matricule
                      " class="ma-0 pa-0" style="margin-top: -17px !important">
                        <v-col style="align-content: center !important" cols="5" class="ma-0 pa-0">
                          <span class="EquipmentSwitch secondSelect" :class="checkIfEquipmentIsGoingToBrDeleted ? 'delete' : ''
                            ">{{
                              equipmentEditCheckedForSwitch &&
                                equipmentEditCheckedForSwitchWith
                                ? checkIfEquipmentIsGoingToBrDeleted
                                  ? getTheDelete?.matricule
                                  : equipmentEditCheckedForSwitchWith?.matricule
                                : itsAdd
                                  ? equipmentEditCheckedForSwitch?.matricule
                                  : ""
                            }}</span>
                        </v-col>
                        <v-col style="text-align: center !important" cols="2" class="ma-0 pa-0">
                          <span v-if="itsAdd">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                              height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 309.059 309.059"
                              xml:space="preserve" style="height: 50px; width: 50px">
                              <g>
                                <g>
                                  <path style="fill: #2196f3"
                                    d="M280.71,126.181h-97.822V28.338C182.889,12.711,170.172,0,154.529,0S126.17,12.711,126.17,28.338    v97.843H28.359C12.722,126.181,0,138.903,0,154.529c0,15.621,12.717,28.338,28.359,28.338h97.811v97.843    c0,15.632,12.711,28.348,28.359,28.348c15.643,0,28.359-12.717,28.359-28.348v-97.843h97.822    c15.632,0,28.348-12.717,28.348-28.338C309.059,138.903,296.342,126.181,280.71,126.181z" />
                                </g>
                              </g>
                            </svg>
                          </span>
                          <span v-else-if="checkIfEquipmentIsGoingToBrDeleted">
                            <svg data-v-02c85341="" xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                              width="984.85px" height="984.85px" viewBox="0 0 984.85 984.85" xml:space="preserve"
                              style="height: 50px; width: 50px">
                              <g data-v-02c85341="">
                                <path data-v-02c85341=""
                                  d="M652.075,954.791c12.101,12,28.7,20.1,45.7,21.5c17.2,1.399,34.9-2.8,49.2-12.5c3.9-2.601,7.6-5.7,10.9-9l0.1-0.101   l204.9-204.899c29.3-29.3,29.3-76.8,0-106.101c-29.301-29.3-76.801-29.3-106.101,0l-76.899,76.9v-637c0-41.4-33.601-75-75-75   c-41.4,0-75,33.6-75,75v637l-78.9-78.9c-29.3-29.3-76.8-29.3-106.1,0c-29.301,29.301-29.301,76.801,0,106.101l207,207   C651.975,954.69,651.975,954.791,652.075,954.791z"
                                  style="fill: rgba(251, 0, 0, 0.77)"></path>
                                <path data-v-02c85341=""
                                  d="M74.975,365.491c19.2,0,38.4-7.3,53-22l78.9-78.9v637c0,41.4,33.6,75,75,75s75-33.6,75-75v-637l76.899,76.9   c14.601,14.6,33.8,22,53,22s38.4-7.3,53-22c29.3-29.3,29.3-76.8,0-106.1c-5.399-5.4-10.899-10.9-16.3-16.3   c-13.3-13.3-26.5-26.7-39.9-39.9c-17.199-17.1-34.3-34.2-51.399-51.4c-16.8-17-34.2-33.5-50.9-50.7   c-16.2-16.6-32.6-32.9-49.899-48.5c-18-16.2-41.5-24.2-65.7-18.5c-6.2,1.4-12.8,3.8-18.4,6.9c-16.7,9.4-30,24.9-43.5,38.3   c-16.5,16.3-32.7,32.9-49.1,49.4c-19.5,19.6-39.2,39.1-58.8,58.6c-16.4,16.6-33,33.2-49.5,49.8c-8,8-16,15.9-24,23.9   c-0.1,0.1-0.3,0.3-0.4,0.4c-29.3,29.3-29.3,76.8,0,106.1C36.575,358.191,55.775,365.491,74.975,365.491z"
                                  style="fill: #5c95ff"></path>
                              </g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                            </svg>
                          </span>
                          <span v-else-if="checkIfEquipmentIsGoingToBrChanged">
                            <svg data-v-02c85341="" xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                              width="984.85px" height="984.85px" viewBox="0 0 984.85 984.85" xml:space="preserve" style="
                                height: 50px;
                                width: 50px;
                                transform: rotateZ(90deg);
                              ">
                              <g data-v-02c85341="">
                                <path data-v-02c85341=""
                                  d="M652.075,954.791c12.101,12,28.7,20.1,45.7,21.5c17.2,1.399,34.9-2.8,49.2-12.5c3.9-2.601,7.6-5.7,10.9-9l0.1-0.101   l204.9-204.899c29.3-29.3,29.3-76.8,0-106.101c-29.301-29.3-76.801-29.3-106.101,0l-76.899,76.9v-637c0-41.4-33.601-75-75-75   c-41.4,0-75,33.6-75,75v637l-78.9-78.9c-29.3-29.3-76.8-29.3-106.1,0c-29.301,29.301-29.301,76.801,0,106.101l207,207   C651.975,954.69,651.975,954.791,652.075,954.791z"
                                  style="fill: rgba(0, 166, 251, 0.768627451)"></path>
                                <path data-v-02c85341=""
                                  d="M74.975,365.491c19.2,0,38.4-7.3,53-22l78.9-78.9v637c0,41.4,33.6,75,75,75s75-33.6,75-75v-637l76.899,76.9   c14.601,14.6,33.8,22,53,22s38.4-7.3,53-22c29.3-29.3,29.3-76.8,0-106.1c-5.399-5.4-10.899-10.9-16.3-16.3   c-13.3-13.3-26.5-26.7-39.9-39.9c-17.199-17.1-34.3-34.2-51.399-51.4c-16.8-17-34.2-33.5-50.9-50.7   c-16.2-16.6-32.6-32.9-49.899-48.5c-18-16.2-41.5-24.2-65.7-18.5c-6.2,1.4-12.8,3.8-18.4,6.9c-16.7,9.4-30,24.9-43.5,38.3   c-16.5,16.3-32.7,32.9-49.1,49.4c-19.5,19.6-39.2,39.1-58.8,58.6c-16.4,16.6-33,33.2-49.5,49.8c-8,8-16,15.9-24,23.9   c-0.1,0.1-0.3,0.3-0.4,0.4c-29.3,29.3-29.3,76.8,0,106.1C36.575,358.191,55.775,365.491,74.975,365.491z"
                                  style="fill: rgb(0, 40, 85)"></path>
                              </g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                              <g data-v-02c85341=""></g>
                            </svg>
                          </span>
                        </v-col>
                        <v-col style="align-content: center !important" cols="5" class="ma-0 pa-0">
                          <span class="EquipmentSwitch firstSelect">{{
                            equipmentEditCheckedForSwitch &&
                              equipmentEditCheckedForSwitchWith
                              ? checkIfEquipmentIsGoingToBrDeleted
                                ? getTheDeleted?.matricule
                                : equipmentEditCheckedForSwitch.matricule
                              : ""
                          }}</span>
                        </v-col>
                      </v-row></v-col>
                  </v-row>
                  <v-row class="equipmentOutRow">
                    <v-col :cols="12" :style="{
                      padding: allBothAddButton_switch ? '0 !important' : '',
                      overflow: hidden,
                    }">
                      <span v-if="allBothAddButton_switch" class="switchEquipmentIn" :class="checkIfEquipmentIsGoingToBrDeleted
                        ? 'switchEquipmentInCheckTag'
                        : ''
                        ">
                        OUT
                      </span>
                      <v-row v-if="allBothAddButton_switch" class="custom-scrollbar equipmentEdit toAddOrSwitchEqp"
                        style="
                          width: 100%;
                          display: flex;
                          flex-wrap: wrap;
                          align-content: flex-start;
                          margin-top: 1px;
                          overflow: overlay;
                          overflow-x: hidden !important;
                        ">
                        <v-col cols="3" v-for="item in equipmentsNotInPlanningWithCheck" :class="[
                          showSelect ? 'actionHolder' : '',
                          item.checked && allBothAddButton_delete
                            ? 'actionHolderDelete'
                            : '',
                          item.checked && allBothAddButton_switch
                            ? 'actionHolderSwit'
                            : '',
                        ]" @click="
                          showSelect
                            ? (item =
                              setEquipmentEditCheckedForSwitchWith(item))
                            : ''
                          " :disabled="true" style="
                            padding: 0;
                            margin: 0;
                            width: 100%;
                            min-height: 100px !important;
                          ">
                          <span :class="equipmentCheckedForSwitch(item)
                            ? 'checkForSwitchWith'
                            : ''
                            " class="checkForSwitchThisHide">{{
                              toBeOProposedOutOutCmp(item)
                                ? equipmentEditCheckedForSwitchWith?.matricule
                                : equipmentEditCheckedForSwitch?.id ==
                                  item.id || toBeOProposedInInCmp(item)
                                  ? item.matricule
                                  : ""
                            }}
                          </span>
                          <span class="fullname" :class="[
                            equipmentCheckedForSwitch(item) &&
                              checkIfEquipmentIsGoingToBrDeleted
                              ? 'EquipmentIfGonnaBeDeleted'
                              : '',
                            item.checked ? '' : '',
                            equipmentCheckedForSwitch(item)
                              ? 'checkForSwitchThis'
                              : '',
                            toBeOutAndInCmp(item) ? 'checkForSwitch' : '',
                          ]">{{
                            equipmentCheckedForSwitch(item)
                              ? InSwitch(item)
                                ? equipmentEditCheckedForSwitchWith?.matricule
                                : equipmentEditCheckedForSwitch?.matricule
                              : item.matricule
                          }}
                          </span>
                        </v-col>
                      </v-row></v-col>
                  </v-row>
                </v-col>

                <v-col cols="5" style="margin-bottom: 12px; padding: 0"
                  @click="allBothAddButton_delete = !allBothAddButton_delete">
                  <div v-if="!allBothNextDrivers && !allBothAddButton_switch" class="allBothAddButton deleteD" :class="allBothAddButton_delete ? 'deleteDChecked cancelX' : ''
                    ">
                    {{ allBothAddButton_delete ? "CANCEL" : "DELETE RTG(s)" }}
                    <span> </span>
                    <hr width="100%" />
                  </div>
                </v-col>

                <v-col cols="2"></v-col>
              </v-row>
            </v-col>
          </v-row>
          <template v-slot:actions style="width: 100%; /* padding: 0; */ margin-top: 34px">
            <v-switch v-model="reloadPlanning" :label="'Reload The Planning.'" hide-details inset
              :color="reloadPlanning ? 'primary' : 'blue'" style="margin-left: 20px; font-size: 20px"></v-switch>
            <v-spacer></v-spacer>
            <v-btn density="default" class="backButton_all" :disabled="showSelect"
              v-if="!allBothAddButton_switch && !allBothAddButton_delete"
              @click="cancelDriversInPlanningWithCheck">CANCEL</v-btn>
            <v-btn density="default" class="nextButton_all" @click="clickFinish" v-if="
              !allBothNextDrivers &&
              !allBothAddButton_delete &&
              !allBothAddButton_switch
            " :disabled="!commitedChange">FINISH</v-btn>
            <v-btn density="default" class="nextButton_all" style="background-color: rgb(220 47 2 / 74%)"
              @click="openDeleteDialog" v-if="selectedChangeEDSow == 0 && allBothAddButton_delete">DELETE</v-btn>
            <v-btn density="default" class="nextButton_all" style="background-color: rgb(71 149 52)"
              @click="openAddDriversForSwitch" v-if="selectedChangeEDSow == 0 && allBothAddButton_switch">NEXT</v-btn>
            <v-btn density="default" class="nextButton_all" style="background-color: rgb(220 47 2 / 74%)"
              @click="openequipmentDeleteDialog"
              v-if="selectedChangeEDSow == 1 && allBothAddButton_delete">DELETE</v-btn>
            <v-btn density="default" class="backButton_all" v-if="selectedChangeEDSow == 1 && allBothAddButton_switch"
              :disabled="equipmentEditCheckedForSwitch ||
                equipmentEditCheckedForSwitchWith
                " @click="
                  equipmentEditActions.length > 0
                    ? openequipmentBackDialog()
                    : (allBothAddButton_switch = false)
                  ">BACK</v-btn>
            <v-btn density="default" class="nextButton_all" style="background-color: rgb(102 81 208)"
              @click="openequipmentSwitchDialog" v-if="selectedChangeEDSow == 1 && allBothAddButton_switch" :disabled="equipmentEditCheckedForSwitch ||
                equipmentEditCheckedForSwitchWith
                ">CONFIRM</v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <template>
    <div class="text-center pa-4">
      <v-dialog v-model="changeDriver" max-width="70%" persistent>
        <v-card class="confirmDialogInterface">
          <v-row class="confirmDialogInterfaceHeader">
            <v-col cols="12" class="children" :class="selectedChangeEDSow == 0 ? 'selectedChangeEDSow' : ''"
              v-if="selectedChangeEDSow == 0"><v-icon class="thisIcon">mdi-account-group</v-icon> ADD
              DRIVERS</v-col>
            <v-col cols="12" class="children" :class="selectedChangeEDSow == 1 ? 'selectedChangeEDSow' : ''"
              v-else><v-icon class="thisIcon">mdi-gantry-crane</v-icon> ADD
              EQUIPMENT</v-col>
          </v-row>
          <v-row v-if="selectedChangeEDSow == 0">
            <v-col cols="11" style="margin: 0 auto">
              <v-row>
                <v-col cols="12" v-if="!allDriverNext">
                  <div v-if="!addDriversForSwitch">
                    Here you can add drivers from this shift and from the other
                    shifts.
                    <span class="selectAll" @click="setSelectAll" :class="allDriverFiltered.length > 0 &&
                      allDriverFilteredChecked.length ==
                      allDriverFiltered.length
                      ? 'selectAllChecked'
                      : ''
                      ">
                      SELECT ALL({{ allDriverFilteredChecked.length }})
                    </span>
                  </div>
                  <hr width="100%" />
                  <v-radio-group v-model="selectedAlldriversShift" inline>
                    <div class="radioButtonText">
                      <span class="thisSpan">Drivers from shift: </span>
                      <span v-for="(shift, index) in ['A', 'B', 'C', 'D']" :key="shift">
                        <v-radio v-if="shift != actualShift.name" :label="shift" :value="index + 1"
                          :class="existedIn(index + 1) ? 'isExisted' : ''"></v-radio>
                        <v-radio v-else :label="actualShift.name + ' (This Shift)'" :value="index + 1"
                          :class="existedIn(index + 1) ? 'isExisted' : ''"></v-radio>
                      </span>
                    </div>
                    <v-col cols="12" class="ma-0 pa-0" style="margin: 0 auto">
                      <v-data-table :headers="driverSelectionHeader" :items="allDriverFiltered"
                        class="elevation-1 tableOfAllDrivers custom-scrollbar" hide-default-footer
                        :items-per-page="thisPlanningBoxes.length" style="width: 100%; margin: 0 auto">
                        <template v-slot:item="{ item }">
                          <tr class="actionHolder" :class="item.checked && addDriversForSwitch
                            ? 'actionHolderSwitch'
                            : ''
                            " @click="
                              item.checked = setCheckedIfSwitchOrAdd(item)
                              ">
                            <td>
                              <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{ item.matricule
                                }}
                              </span>
                            </td>

                            <td>
                              <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{
                                item.firstname[0].toUpperCase() +
                                item.firstname.slice(1)
                              }}
                              </span>
                            </td>

                            <td>
                              <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{
                                item.lastname.toUpperCase() }}</span>
                            </td>

                            <td>
                              <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{
                                item.workingHours }}</span>
                            </td>
                            <td>
                              <span class="fullname action" :class="item.checked
                                ? 'checkedAction'
                                : 'uncheckedAction'
                                "></span>
                            </td>
                          </tr>
                        </template>
                      </v-data-table>
                    </v-col>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" v-else class="mb-0 pb-0">
                  <div class="selectedDriversNext_all">Selected drivers:</div>
                  <span v-if="!addDriversForSwitch" v-for="shiftDrivers in selectedDriversRxistedAll"
                    :key="shiftDrivers.shift">
                    <div class="fromSHiftNext_all" v-if="shiftDrivers.drivers.length > 0">
                      From shift {{ shiftDrivers.shift }}: ({{
                        shiftDrivers.drivers.length
                      }})
                    </div>
                    <v-data-table :headers="[...driverSelectionHeader]" :items="shiftDrivers.drivers"
                      class="elevation-1 tableOfAllDrivers custom-scrollbar tableOfAllDrivers2 forSwitchTableHeights"
                      hide-default-footer :items-per-page="thisPlanningBoxes.length" style="width: 100%; margin: 0 auto"
                      v-if="shiftDrivers.drivers.length > 0">
                      <template v-slot:item="{ item }">
                        <tr class="actionHolder actionHolder2" :class="item.checked && addDriversForSwitch
                          ? 'actionHolderSwitch'
                          : ''
                          " @click="
                            allDriverFilteredCheckedAllShifts.length == 1
                              ? (allDriverNext = false)
                              : '';
                          item.checked = !item.checked;
                          ">
                          <td>
                            <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{ item.matricule
                              }}x
                            </span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{
                              item.firstname[0].toUpperCase() +
                              item.firstname.slice(1)
                            }}
                            </span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{
                              item.lastname.toUpperCase() }}</span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{ item.workingHours
                              }}</span>
                          </td>
                          <td>
                            <span class="fullname action" :class="item.checked
                              ? 'checkedAction'
                              : 'uncheckedAction'
                              "></span>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </span>

                  <span v-for="shiftDrivers in [3]" :key="shiftDrivers" v-if="addDriversForSwitch">
                    <div class="selectedDriversNext_all" style="color: green">
                      DRIVERS IN:
                    </div>
                    <v-data-table :headers="[...driverSelectionHeaderWithShift]" :items="addDriversForSwitchDriversIn"
                      class="elevation-1 tableOfAllDrivers custom-scrollbar tableOfAllDrivers2 forSwitchTableHeights"
                      hide-default-footer :items-per-page="thisPlanningBoxes.length" style="width: 100%; margin: 0 auto"
                      ref="tableInRef">
                      <template v-slot:item="{ item }">
                        <tr :ref="'drivers_' + item.index" @mouseover="showPair(item.index)"
                          @mouseleave="hidePair(item.index)" class="actionHolder actionHolder2SwitchNextInTable" :class="item.toSwitch && addDriversForSwitch
                            ? 'actionHolderSwitch'
                            : ''
                            " @click="switchPairIn(item.index)">
                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{ item.matricule
                              }}
                            </span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{
                              item.firstname[0].toUpperCase() +
                              item.firstname.slice(1)
                            }}
                            </span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{
                              item.lastname.toUpperCase() }}</span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{
                              getShiftByIndex(item.shift_id) }}</span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{
                              item.workingHours }}</span>
                          </td>
                          <td>
                            <span class="fullname action" :class="item.toSwitch
                              ? 'switchPairSelected'
                              : 'uncheckedAction'
                              "></span>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </span>

                  <span v-for="shiftDrivers in [3]" :key="shiftDrivers" v-if="addDriversForSwitch">
                    <div class="selectedDriversNext_all" style="color: rgb(205 48 48 / 93%)">
                      DRIVERS OUT:
                    </div>
                    <v-data-table :headers="[...driverSelectionHeaderWithShift]" :items="addDriversForSwitchDriversOut"
                      class="elevation-1 tableOfAllDrivers custom-scrollbar tableOfAllDrivers2 forSwitchTableHeights"
                      hide-default-footer :items-per-page="thisPlanningBoxes.length"
                      style="width: 100%; margin: 0 auto">
                      <template v-slot:item="{ item }">
                        <tr :ref="'drivers_' + item.index" @mouseover="showPair(item.index)"
                          @mouseleave="hidePair(item.index)" class="actionHolder actionHolder2SwitchNextOutTable"
                          :class="item.toSwitch && addDriversForSwitch
                            ? 'actionHolderSwitch'
                            : ''
                            " @click="switchPairOut(item.index)">
                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{ item.matricule
                              }}
                            </span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{
                              item.firstname[0].toUpperCase() +
                              item.firstname.slice(1)
                            }}
                            </span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{
                              item.lastname.toUpperCase() }}</span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{
                              getShiftByIndex(item.shift_id) }}</span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{
                              item.workingHours }}</span>
                          </td>
                          <td>
                            <span class="fullname action" :class="item.toSwitch
                              ? 'switchPairSelected'
                              : 'uncheckedAction'
                              "></span>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="11" style="margin: 0 auto">
              <v-row>
                <v-col cols="12" v-if="!allDriverNext">
                  <div v-if="!addDriversForSwitch">
                    Here you can add RTGs.
                    <span class="selectAll" @click="setSelectAll" :class="allDriverFiltered.length > 0 &&
                      allDriverFilteredChecked.length ==
                      allDriverFiltered.length
                      ? 'selectAllChecked'
                      : ''
                      ">
                      SELECT ALL({{ allDriverFilteredChecked.length }})
                    </span>
                  </div>
                  <hr width="100%" />
                  <v-radio-group v-model="selectedAlldriversShift" inline>
                    <div class="radioButtonText">
                      <span class="thisSpan">Drivers from shift: </span>
                      <span v-for="(shift, index) in ['A', 'B', 'C', 'D']" :key="shift">
                        <v-radio v-if="shift != actualShift.name" :label="shift" :value="index + 1"
                          :class="existedIn(index + 1) ? 'isExisted' : ''"></v-radio>
                        <v-radio v-else :label="actualShift.name + ' (This Shift)'" :value="index + 1"
                          :class="existedIn(index + 1) ? 'isExisted' : ''"></v-radio>
                      </span>
                    </div>
                    <v-col cols="12" class="ma-0 pa-0" style="margin: 0 auto">
                      <v-data-table :headers="driverSelectionHeader" :items="allDriverFiltered"
                        class="elevation-1 tableOfAllDrivers custom-scrollbar" hide-default-footer
                        :items-per-page="thisPlanningBoxes.length" style="width: 100%; margin: 0 auto">
                        <template v-slot:item="{ item }">
                          <tr class="actionHolder" :class="item.checked && addDriversForSwitch
                            ? 'actionHolderSwitch'
                            : ''
                            " @click="
                              item.checked = setCheckedIfSwitchOrAdd(item)
                              ">
                            <td>
                              <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{ item.matricule
                                }}
                              </span>
                            </td>

                            <td>
                              <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{
                                item.firstname[0].toUpperCase() +
                                item.firstname.slice(1)
                              }}
                              </span>
                            </td>

                            <td>
                              <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{
                                item.lastname.toUpperCase() }}</span>
                            </td>

                            <td>
                              <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{
                                item.workingHours }}</span>
                            </td>
                            <td>
                              <span class="fullname action" :class="item.checked
                                ? 'checkedAction'
                                : 'uncheckedAction'
                                "></span>
                            </td>
                          </tr>
                        </template>
                      </v-data-table>
                    </v-col>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" v-else class="mb-0 pb-0">
                  <div class="selectedDriversNext_all">Selected drivers:</div>
                  <span v-if="!addDriversForSwitch" v-for="shiftDrivers in selectedDriversRxistedAll"
                    :key="shiftDrivers.shift">
                    <div class="fromSHiftNext_all" v-if="shiftDrivers.drivers.length > 0">
                      From shift {{ shiftDrivers.shift }}: ({{
                        shiftDrivers.drivers.length
                      }})
                    </div>
                    <v-data-table :headers="[...driverSelectionHeader]" :items="shiftDrivers.drivers"
                      class="elevation-1 tableOfAllDrivers custom-scrollbar tableOfAllDrivers2 forSwitchTableHeights"
                      hide-default-footer :items-per-page="thisPlanningBoxes.length" style="width: 100%; margin: 0 auto"
                      v-if="shiftDrivers.drivers.length > 0">
                      <template v-slot:item="{ item }">
                        <tr class="actionHolder actionHolder2" :class="item.checked && addDriversForSwitch
                          ? 'actionHolderSwitch'
                          : ''
                          " @click="
                            allDriverFilteredCheckedAllShifts.length == 1
                              ? (allDriverNext = false)
                              : '';
                          item.checked = !item.checked;
                          ">
                          <td>
                            <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{ item.matricule
                              }}x
                            </span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{
                              item.firstname[0].toUpperCase() +
                              item.firstname.slice(1)
                            }}
                            </span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{
                              item.lastname.toUpperCase() }}</span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.checked ? 'checkedDriverText' : ''">{{ item.workingHours
                              }}</span>
                          </td>
                          <td>
                            <span class="fullname action" :class="item.checked
                              ? 'checkedAction'
                              : 'uncheckedAction'
                              "></span>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </span>

                  <span v-for="shiftDrivers in [3]" :key="shiftDrivers" v-if="addDriversForSwitch">
                    <div class="selectedDriversNext_all" style="color: green">
                      DRIVERS IN:
                    </div>
                    <v-data-table :headers="[...driverSelectionHeaderWithShift]" :items="addDriversForSwitchDriversIn"
                      class="elevation-1 tableOfAllDrivers custom-scrollbar tableOfAllDrivers2 forSwitchTableHeights"
                      hide-default-footer :items-per-page="thisPlanningBoxes.length" style="width: 100%; margin: 0 auto"
                      ref="tableInRef">
                      <template v-slot:item="{ item }">
                        <tr :ref="'drivers_' + item.index" @mouseover="showPair(item.index)"
                          @mouseleave="hidePair(item.index)" class="actionHolder actionHolder2SwitchNextInTable" :class="item.toSwitch && addDriversForSwitch
                            ? 'actionHolderSwitch'
                            : ''
                            " @click="switchPairIn(item.index)">
                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{ item.matricule
                              }}
                            </span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{
                              item.firstname[0].toUpperCase() +
                              item.firstname.slice(1)
                            }}
                            </span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{
                              item.lastname.toUpperCase() }}</span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{
                              getShiftByIndex(item.shift_id) }}</span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{
                              item.workingHours }}</span>
                          </td>
                          <td>
                            <span class="fullname action" :class="item.toSwitch
                              ? 'switchPairSelected'
                              : 'uncheckedAction'
                              "></span>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </span>

                  <span v-for="shiftDrivers in [3]" :key="shiftDrivers" v-if="addDriversForSwitch">
                    <div class="selectedDriversNext_all" style="color: rgb(205 48 48 / 93%)">
                      DRIVERS OUT:
                    </div>
                    <v-data-table :headers="[...driverSelectionHeaderWithShift]" :items="addDriversForSwitchDriversOut"
                      class="elevation-1 tableOfAllDrivers custom-scrollbar tableOfAllDrivers2 forSwitchTableHeights"
                      hide-default-footer :items-per-page="thisPlanningBoxes.length"
                      style="width: 100%; margin: 0 auto">
                      <template v-slot:item="{ item }">
                        <tr :ref="'drivers_' + item.index" @mouseover="showPair(item.index)"
                          @mouseleave="hidePair(item.index)" class="actionHolder actionHolder2SwitchNextOutTable"
                          :class="item.toSwitch && addDriversForSwitch
                            ? 'actionHolderSwitch'
                            : ''
                            " @click="switchPairOut(item.index)">
                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{ item.matricule
                              }}
                            </span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{
                              item.firstname[0].toUpperCase() +
                              item.firstname.slice(1)
                            }}
                            </span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{
                              item.lastname.toUpperCase() }}</span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{
                              getShiftByIndex(item.shift_id) }}</span>
                          </td>

                          <td>
                            <span class="fullname" :class="item.toSwitch ? 'switchPairSelected' : ''">{{
                              item.workingHours }}</span>
                          </td>
                          <td>
                            <span class="fullname action" :class="item.toSwitch
                              ? 'switchPairSelected'
                              : 'uncheckedAction'
                              "></span>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <template v-slot:actions>
            <span v-if="!allDriverNext" class="total" :class="allDrivers.filter((e) => e.checked).length > 0
              ? 'itsTheTotal'
              : ''
              " :style="{
                color:
                  addDriversForSwitch &&
                  (allDrivers.filter((e) => e.checked).length <
                    addDriversForSwitch_number
                    ? 'red'
                    : 'green'),
              }">
              TOTAL: ({{ allDrivers.filter((e) => e.checked).length
              }}{{
                addDriversForSwitch ? "/" + addDriversForSwitch_number : ""
              }})
            </span>
            <v-spacer></v-spacer>
            <v-btn density="default" class="backButton_all" @click="
              allDriverNext
                ? addDriversForSwitch
                  ? backWhenSwitch()
                  : (allDriverNext = false)
                : (changeDriver = false)
              ">{{ allDriverNext ? "BACK" : "CANCEL" }}</v-btn>
            <v-btn :style="{
              backgroundColor: addDriversForSwitch ? 'green' : '',
            }" density="default" class="nextButton_all" :disabled="allBothAddButton_switch
              ? allDriverFilteredCheckedAllShifts.filter((e) => e.checked)
                .length == 0
              : allDriverFilteredChecked.filter((e) => e.checked).length ==
              0
              " @click="
                allDriverNext
                  ? addDriversForSwitch
                    ? openSwitchMDialog()
                    : openAddDialog()
                  : addDriversForSwitch
                    ? switchNextInterface()
                    : (allDriverNext = true)
                ">{{
                  allDriverNext
                    ? addDriversForSwitch
                      ? "SWITCH"
                      : "ADD"
                    : "NEXT"
                }}</v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <template>
    <div class="pa-4 text-center">
      <v-dialog max-width="100%" v-model="planningAsFileShow">
        <template v-slot:default="{ isActive }">
          <v-card class="dialogHeader pa-2">
            <div class="sticky-header">
              <v-toolbar flat>
                <v-toolbar-title>
                 DOWNLOAD RTG SHIFT PLANNING - {{ actualShift.name }} (Date:
                  {{ selectedDate.toLocaleDateString() }} -
                  {{ getShiftPeriode }}):
                </v-toolbar-title>
                <v-btn class="cancelButton" text="CANCEL" @click="isActive.value = false" style="font-weight: bold;"></v-btn>
                <v-btn append-icon="mdi-download" density="default" class="saveButton2" style="background-color: #35ba94 !important;font-weight: bold;"
                  @click="generateReport">DOWNLOAD</v-btn>
              </v-toolbar>
            </div>
            <div style="padding: 0 5%;">
              <PlanninfAsFileForDownload :actualShift="actualShift" :selectedDate="selectedDate"
              :selectedPlanning="selectedPlanning" :ShiftIndex="ShiftIndex"
              :thisPlanningBoxes="thisPlanningBoxes" :headers="headers" :splited="splited"
              @splitClicked="splitClicked"
              />
            </div>
            <v-card-actions class="mt-5"> </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </template>
<template>
  <div>
  <vue3-html2pdf
  :show-layout="false"
      :enable-download="true"
      :preview-modal="true"
      :filename="'ee'"
      :pdf-quality="2"
      :manual-pagination="true"
      ref="html2Pdf"
      pdf-format="a4"
      pdf-content-width="100%"
      >
        <template  v-slot:pdf-content>
        <PlanninfAsFileForDownload :actualShift="actualShift" :selectedDate="selectedDate"
              :selectedPlanning="selectedPlanning" :ShiftIndex="ShiftIndex"
              :thisPlanningBoxes="thisPlanningBoxes" :headers="headers" :splited="splited"
              @splitClicked="splitClicked"
              />
        </template>
  </vue3-html2pdf>
</div>
</template>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Vue3Html2pdf from 'vue3-html2pdf'
export default {
  name: "RTG Show Planning",
  emits: [
    "showNotificationClassSuccess",
    "showNotificationClassFailed",
    "CustomRtgPlanning",
    "rtgFullPlanning",
  ],
  components: {
    Vue3Html2pdf
  },
  props: [
    "actualShift",
    "selectedDate",
    "selectedPlanning",
    "ShiftIndex",
    "tableHeaders",
    "checkEditedPlanning",
  ],
  data() {
    return {
      splited:false,
      planningAsFileShow:false,
      updateShowMode:false,
      updateShowDialog:false,
      isHighlighted: false,
      cancelUPDATEDialog:false,
      justEdited:false,
      cancelOfChangesOfThePlanningShow:false,
      confirmChangesOfThePlanningShow:false,
      pauseButtonClickedOn:false,
      doublePauseButtonClickedOn:false,
      planningActionHistory_index: -1,
      planningActionHistory: [],
      planningWorkDriver_Checked_Index: -1,
      planningWorkDriver_Checked_With: null,
      planningWorkDriver_Checked: null,
      planningWorkBoxChecked_LEFT_OUT_REMOVED_AT: null,
      planningWorkBoxChecked_ID: null,
      planningWorkBoxChecked_ID_With: null,
      planningWorkBoxChecked_Index: -1,
      planningWorkBoxChecked_With: null,
      planningWorkBoxChecked: null,
      tempPlanning_forShow: [],
      commitedChange: false,
      reloadPlanning: false,
      ifCheckEditedPlanning: false,
      equipmentSwitch_delete_Dialog: false,
      equipmentSwitch_back_Dialog: false,
      equipmentSwitchDialog: false,
      canDoAction: true,
      actionIndex: -1,
      equipmentEditActions: [],
      equipmentEditAddOn: false,
      equipmentEditCheckedForAdd: {
        id: null,
        matricule: null,
        status: null,
        profile_group_id: null,
        created_at: null,
        updated_at: null,
        profileGroup: {
          id: null,
          type: "rtg",
          created_at: null,
          updated_at: null,
        },
        profile_group: {
          id: null,
          type: null,
          created_at: null,
          updated_at: null,
        },
        checked: false,
      },
      equipmentEditCheckedForSwitchWith: null,
      equipmentEditCheckedForSwitch: null,
      selectedAlldriversShift: 0,
      thisPlanningBoxes: [],
      headers: [],
      applyDialogShow: false,
      saveDialogShow: false,
      confirmDialog: false,
      deleteDialog: false,
      switchDialog: false,
      addDialog: false,
      cancelDialog: false,
      editDriversEquipmentsDialog: false,
      changeDriver: false,
      editMode: false,
      OutToBeInserted: [],
      ThisOutToBeInserted: [],
      elementsWidth: [],
      allDrivers: [],
      allEquipments: [],
      driverSelectionHeader: [
        {
          text: "Mat",
          sortable: true,
          key: "Mat",
          align: "start",
          title: "Mat",
          value: "Mat",
        },
        {
          text: "Firstname",
          sortable: true,
          key: "Firstname",
          align: "start",
          title: "Firstname",
          value: "Firstname",
        },
        {
          text: "Lastname",
          sortable: true,
          key: "Lastname",
          align: "start",
          title: "Lastname",
          value: "Lastname",
        },
        {
          text: "WH",
          sortable: true,
          key: "WH",
          align: "start",
          title: "WH",
          value: "WH",
        },
        {
          text: "Select",
          sortable: true,
          key: "Select",
          align: "start",
          title: "Select",
          value: "Select",
        },
      ],
      driverSelectionHeaderWithShift: [],
      equipmentSelectionHeader: [],
      driversAllByShift: [],
      allBothNextDrivers: false,
      allDriverNext: false,
      selectedChangeEDSow: 0,
      driversInPlanningWithCheck: [],
      equipmentsInPlanningWithCheck: [],
      equipmentsInPlanningWithCheck_backup: [],
      equipmentsNotInPlanningWithCheck: [],
      equipmentsNotInPlanningWithCheck_backup: [],
      allBothAddButton_switch: false,
      allBothAddButton_delete: false,
      allBothAddButton_add: false,
      allBothAddButton_hold: false,
      addDriversForSwitch: false,
      addDriversForSwitch_number: 0,
      addDriversForSwitchDriversIn: [],
      addDriversForSwitchDriversOut: [],
    };
  },
  computed: {
    ...mapGetters([
      "getPlanningWithTheBoxes",
      "getJustCreated",
      "getDriversAll",
      "getEquipements",
      "getOutToBeInserted",
      "getThisOutToBeInserted",
      "getActonHistory_index",
      "getActonHistory",
    ]),
    workBoxLeftFromOuts() {
      if (
        !this.planningWorkBoxChecked ||
        this.planningWorkBoxChecked_Index <= 0 ||
        this.planningWorkBoxChecked_ID != null ||
        this.OutToBeInserted.length == 0
      )
        return false;
      let isFrom = false;
      for (let index = 0; index < this.OutToBeInserted[this.planningWorkBoxChecked_Index - 2].list.length; index++) {
        let element = this.OutToBeInserted[this.planningWorkBoxChecked_Index - 2].list[index];
        if (element.matricule == this.planningWorkBoxChecked.matricule) {
          isFrom = true;
        }
      }
      return isFrom;
    },
    workBoxRighttFromOuts() {
      if (
        !this.planningWorkBoxChecked_With ||
        this.planningWorkBoxChecked_Index <= 0 ||
        this.planningWorkBoxChecked_ID != null ||
        this.OutToBeInserted.length == 0
      )
        return false;
      let isFrom = false;
      for (let index = 0; index < this.OutToBeInserted[this.planningWorkBoxChecked_Index - 2].list.length; index++) {
        let element = this.OutToBeInserted[this.planningWorkBoxChecked_Index - 2].list[index];
        if (element.matricule == this.planningWorkBoxChecked_With.matricule) {
          isFrom = true;
        }
      }
      return isFrom;
    },
    itsAdd() {
      return this.equipmentEditAddOn && this.getFromOut;
    },
    getFromOut() {
      return this.equipmentsNotInPlanningWithCheck.filter(
        (e) =>
          e?.id == this.equipmentEditCheckedForSwitch?.id ||
          e?.id == this.equipmentEditCheckedForSwitchWith?.id
      )[0];
    },
    getFromIn() {
      return this.equipmentsInPlanningWithCheck.filter(
        (e) =>
          e?.id == this.equipmentEditCheckedForSwitch?.id ||
          e?.id == this.equipmentEditCheckedForSwitchWith?.id
      );
    },
    getTheDeleted() {
      if (this.checkSwitchEquipmentSide == "IN") {
        return this.equipmentEditCheckedForSwitch;
      } else return this.equipmentEditCheckedForSwitchWith;
    },
    getTheDelete() {
      if (this.checkSwitchEquipmentSide == "OUT") {
        return this.equipmentEditCheckedForSwitch;
      } else return this.equipmentEditCheckedForSwitchWith;
    },
    checkIfEquipmentIsGoingToBrChanged() {
      return (
        this.checkSwitchEquipmentSide == "OUT" &&
        this.checkWithEquipmentSide == "OUT"
      );
    },
    checkIfEquipmentIsGoingToBrChanged() {
      return (
        this.checkSwitchEquipmentSide == "IN" &&
        this.checkWithEquipmentSide == "IN"
      );
    },
    checkIfEquipmentIsGoingToBrDeleted() {
      return (
        (this.checkSwitchEquipmentSide == "OUT" &&
          this.checkWithEquipmentSide == "IN") ||
        (this.checkWithEquipmentSide == "OUT" &&
          this.checkSwitchEquipmentSide == "IN")
      );
    },
    checkSwitchEquipmentSide() {
      if (this.equipmentEditCheckedForSwitch != null) {
        if (
          this.equipmentsInPlanningWithCheck.filter((e) => {
            return e.id == this.equipmentEditCheckedForSwitch?.id;
          }).length > 0
        )
          return "IN";
        else {
          if (
            this.equipmentsNotInPlanningWithCheck.filter((e) => {
              return e.id == this.equipmentEditCheckedForSwitch?.id;
            }).length > 0
          )
            return "OUT";
        }
      } else return null;
    },
    checkWithEquipmentSide() {
      if (this.equipmentEditCheckedForSwitch != null) {
        if (
          this.equipmentsInPlanningWithCheck.filter((e) => {
            return e.id == this.equipmentEditCheckedForSwitchWith?.id;
          }).length > 0
        )
          return "IN";
        else {
          if (
            this.equipmentsNotInPlanningWithCheck.filter((e) => {
              return e.id == this.equipmentEditCheckedForSwitchWith?.id;
            }).length > 0
          )
            return "OUT";
        }
      } else return null;
    },
    getShiftPeriode() {
      if (this.ShiftIndex == 0) return "Morning";
      if (this.ShiftIndex == 1) return "Evening";
      if (this.ShiftIndex == 2) return "Night";
    },
    driversInThePlanning() {
      return this.thisPlanningBoxes.map((e) => e[0]);
    },
    driversInPlanningWithChecked() {
      return this.driversInPlanningWithCheck.filter((e) => e.checked);
    },
    allDriverFiltered() {
      return this.allDrivers.filter(
        (e) => e.shift_id == this.selectedAlldriversShift
      );
    },
    allDriverFiltered() {
      return this.allDrivers.filter(
        (e) => e.shift_id == this.selectedAlldriversShift
      );
    },
    allDriverFilteredChecked() {
      return this.allDrivers.filter(
        (e) => e.shift_id == this.selectedAlldriversShift && e.checked
      );
    },
    allDriverFilteredCheckedAllShifts() {
      return this.allDrivers.filter((e) => e.checked);
    },
    selectedDriversExistedInA() {
      return this.allDrivers.filter((e) => e.checked && e.shift_id == 1);
    },
    selectedDriversExistedInB() {
      return this.allDrivers.filter((e) => e.checked && e.shift_id == 2);
    },
    selectedDriversExistedInC() {
      return this.allDrivers.filter((e) => e.checked && e.shift_id == 3);
    },
    selectedDriversExistedInD() {
      return this.allDrivers.filter((e) => e.checked && e.shift_id == 4);
    },
    selectedDriversRxistedAll() {
      let rst = [];
      if (this.selectedDriversExistedInA.length > 0) {
        rst.push({
          shift: "A",
          drivers: this.selectedDriversExistedInA,
        });
      }
      if (this.selectedDriversExistedInB.length > 0) {
        rst.push({
          shift: "B",
          drivers: this.selectedDriversExistedInB,
        });
      }
      if (this.selectedDriversExistedInC.length > 0) {
        rst.push({
          shift: "C",
          drivers: this.selectedDriversExistedInC,
        });
      }
      if (this.selectedDriversExistedInD.length > 0) {
        rst.push({
          shift: "D",
          drivers: this.selectedDriversExistedInD,
        });
      }
      return rst;
    },
    showSelect() {
      return this.allBothAddButton_delete || this.allBothAddButton_switch;
    },
    isPair() {
      return (
        this.addDriversForSwitchDriversOut.filter((e) => e.toSwitch).length ==
        1 &&
        this.addDriversForSwitchDriversIn.filter((e) => e.toSwitch).length == 1
      );
    },
    isPairIn() {
      return this.addDriversForSwitchDriversIn.filter((e) => e.toSwitch)[0];
    },
    isPairOut() {
      return this.addDriversForSwitchDriversOut.filter((e) => e.toSwitch)[0];
    },
    isPairInCount() {
      return this.addDriversForSwitchDriversIn.filter((e) => e.toSwitch).length;
    },
    isPairOutCount() {
      return this.addDriversForSwitchDriversOut.filter((e) => e.toSwitch)
        .length;
    },
  },
  methods: {
    ...mapActions([
      "CreatePlanningWitchTheBoxes",
      "clearBoxes",
      "setJustCreated",
      "setDriversActiveList_allAction",
      "clearPlanning_new",
      "CustomRtgPlanning",
      "setBoxesFromTheFrontend",
      "setOutToBeInserted",
      "setAllFromEdit",
      "setActionHistory",
      "UpdatePlanningAndBoxes",

    ]),
    splitClicked(){
      this.splited=!this.splited;
    },
    generateReport() {
      console.log("ss",this.$refs.html2Pdf)
      this.$refs.html2Pdf.generatePdf();
    },
    OpenPlanningAsFileShow(){
      this.planningAsFileShow=true;
    },
    clickUpdate(){
      console.log("hii");
    },
    openUpdateDialog(){
      this.updateShowDialog=true;
    },
    setUpdateModeAndOpenSave(){
      this.updateShowMode=true;
      this.saveDialogShow=true;
    },
    isOneIn(list){
      console.log('liist ',list)
      let rs=list.filter((e)=>e.matricule==this.planningWorkBoxChecked?.matricule);
      if(list.length>0 && rs.length>0 ){
        return rs[0];
      }
      else
        return null;
    },
    addClass() {
      this.isHighlighted = true;
    },
    removeClass() {
      this.isHighlighted = false;
    },
    opencancelUPDATEDialog(){
      this.cancelUPDATEDialog=true;
    },
    DocancelUPDATEDialog(){
      this.cancelOfChangesOfThePlanning_click();
      this.cancelUPDATEDialog=false;
      this.justEdited=false;

    },
    cancelOfChangesOfThePlanning_click(){
      this.planningActionHistory_index=1;
      this.UndoPlanning();
      this.cancelOfChangesOfThePlanningShow=false;
      this.editMode = false;
      this.planningActionHistory= [];
          this.setActionHistory({
            planningActionHistory_index:-1,
            planningActionHistory:[]
          });
    },
    confirmChangesOfThePlanning_click(){
      this.editMode=false;
      this.confirmChangesOfThePlanningShow=false;
      this.justEdited=true;
    },
    confirmChanges(){
      console.log("dkhlna : ")
      this.confirmChangesOfThePlanningShow=true;
    },
    clearPauseButtons(){
      if(this.pauseButtonClickedOn || this.doublePauseButtonClickedOn){
        this.planningWorkBoxChecked_With=null;
      this.planningWorkBoxChecked_ID_With=null;
      this.pauseButtonClickedOn=false;
      this.doublePauseButtonClickedOn=false;
      }


    },
    clickOnPauseButton(){
      if(this.pauseButtonClickedOn){
        this.pauseButtonClickedOn=false;
        this.planningWorkBoxChecked_With=null;
      this.planningWorkBoxChecked_ID_With=null;
      }
      else if(this.planningWorkBoxChecked!='P'){
      this.pauseButtonClickedOn=true;
      this.doublePauseButtonClickedOn=false;
      this.planningWorkBoxChecked_With="P";
      this.planningWorkBoxChecked_ID_With=-1;
      }
    },
    clickOnDoublePauseButton(){
      if(this.doublePauseButtonClickedOn){
        this.doublePauseButtonClickedOn=false;
        this.planningWorkBoxChecked_With=null;
      this.planningWorkBoxChecked_ID_With=null;
      }
      else if(this.planningWorkBoxChecked!='DP'){
      this.doublePauseButtonClickedOn=true;
      this.pauseButtonClickedOn=false;
      this.planningWorkBoxChecked_With="DP";
      this.planningWorkBoxChecked_ID_With=-1;
      }
    },
    UndoPlanning() {
      console.log("this.UndoPlanning bef", JSON.parse(JSON.stringify(this.planningActionHistory)));

      this.planningWorkBoxChecked = this.planningActionHistory[this.planningActionHistory_index].planningWorkBoxChecked;
      this.planningWorkBoxChecked_ID = this.planningActionHistory[this.planningActionHistory_index].planningWorkBoxChecked_ID;
      this.planningWorkBoxChecked_With = this.planningActionHistory[this.planningActionHistory_index].planningWorkBoxChecked_With;
      this.planningWorkBoxChecked_ID_With = this.planningActionHistory[this.planningActionHistory_index].planningWorkBoxChecked_ID_With;
      this.planningWorkBoxChecked_Index = this.planningActionHistory[this.planningActionHistory_index].planningWorkBoxChecked_Index;
      this.planningWorkBoxChecked_LEFT_OUT_REMOVED_AT = this.planningActionHistory[this.planningActionHistory_index].planningWorkBoxChecked_LEFT_OUT_REMOVED_AT;
      this.planningWorkDriver_Checked = this.planningActionHistory[this.planningActionHistory_index].planningWorkDriver_Checked;
      this.planningWorkDriver_Checked_With = this.planningActionHistory[this.planningActionHistory_index].planningWorkDriver_Checked_With;
      this.planningWorkDriver_Checked_Index = this.planningActionHistory[this.planningActionHistory_index].planningWorkDriver_Checked_Index;
      this.pauseButtonClickedOn = this.planningActionHistory[this.planningActionHistory_index].pauseButtonClickedOn;
      this.doublePauseButtonClickedOn = this.planningActionHistory[this.planningActionHistory_index].doublePauseButtonClickedOn;

      this.setAllFromEdit({
        planningWithTheBoxes: {
          planning_boxes: [...this.planningActionHistory[this.planningActionHistory_index-1].getPlanningWithTheBoxes.planning_boxes],
          planning: this.planningActionHistory[this.planningActionHistory_index-1].getPlanningWithTheBoxes.planning,
        },
        OutToBeInserted: [...JSON.parse(JSON.stringify(this.planningActionHistory[this.planningActionHistory_index-1].getOutToBeInserted))],
      });
      this.thisPlanningBoxes=[];
      this.thisPlanningBoxes = [
        ...this.planningActionHistory[this.planningActionHistory_index-1].getPlanningWithTheBoxes.planning_boxes.slice(1).map((e) => {
          e = e.map((l) => {
            if (l != 'P' && l != 'DP') {
              l.checkedInBiggPlanning = false;
            }
            return l;
          })
          e.workingHours = e[0].workingHours;

          return e;
        }),
      ];
      this.headers = [];
      this.headers.push({
        text: "Drivers | Time",
        sortable: false,
        key: "driver",
        align: "start",
        title: "Drivers | Time",
        value: "Drivers | Time",
      });
      this.headers.push({
        text: "WH",
        sortable: true,
        key: "driver",
        align: "start",
        title: "WH",
        value: "workingHours",
      });
      for (
        let index = 1;
        index < this.getPlanningWithTheBoxes.planning_boxes[0].length;
        index++
      ) {
        this.headers.push({
          text: this.getPlanningWithTheBoxes.planning_boxes[0][index].title,
          sortable: false,
          key:
            index + this.getPlanningWithTheBoxes.planning_boxes[0][index].title,
          align: "start",
          title: this.getPlanningWithTheBoxes.planning_boxes[0][index].title,
        });
      }

      this.OutToBeInserted=[...JSON.parse(JSON.stringify(this.planningActionHistory[this.planningActionHistory_index-1].getOutToBeInserted))],
      setTimeout(() => {
        this.planningWorkBoxChecked = null;
        this.planningWorkBoxChecked_ID = null;
        this.planningWorkBoxChecked_With = null;
        this.planningWorkBoxChecked_ID_With = null;
        this.planningWorkBoxChecked_Index = null;
        this.planningWorkBoxChecked_LEFT_OUT_REMOVED_AT = null;
        this.planningWorkDriver_Checked = null;
        this.planningWorkDriver_Checked_With = null;
        this.planningWorkDriver_Checked_Index = null;
        this.pauseButtonClickedOn = null;
        this.doublePauseButtonClickedOn = null;
      }, 300);
      this.planningActionHistory_index--;
      let actionHsitoryObject={
        planningActionHistory:[...JSON.parse(JSON.stringify(this.planningActionHistory))],
        planningActionHistory_index:this.planningActionHistory_index
      }
      this.setActionHistory(actionHsitoryObject);
    },
    RedoPlanning() {

      this.planningWorkBoxChecked = this.planningActionHistory[this.planningActionHistory_index + 1].planningWorkBoxChecked;
      this.planningWorkBoxChecked_ID = this.planningActionHistory[this.planningActionHistory_index + 1].planningWorkBoxChecked_ID;
      this.planningWorkBoxChecked_With = this.planningActionHistory[this.planningActionHistory_index + 1].planningWorkBoxChecked_With;
      this.planningWorkBoxChecked_ID_With = this.planningActionHistory[this.planningActionHistory_index + 1].planningWorkBoxChecked_ID_With;
      this.planningWorkBoxChecked_Index = this.planningActionHistory[this.planningActionHistory_index + 1].planningWorkBoxChecked_Index;
      this.planningWorkBoxChecked_LEFT_OUT_REMOVED_AT = this.planningActionHistory[this.planningActionHistory_index + 1].planningWorkBoxChecked_LEFT_OUT_REMOVED_AT;
      this.planningWorkDriver_Checked = this.planningActionHistory[this.planningActionHistory_index + 1].planningWorkDriver_Checked;
      this.planningWorkDriver_Checked_With = this.planningActionHistory[this.planningActionHistory_index + 1].planningWorkDriver_Checked_With;
      this.planningWorkDriver_Checked_Index = this.planningActionHistory[this.planningActionHistory_index + 1].planningWorkDriver_Checked_Index;
      this.pauseButtonClickedOn = this.planningActionHistory[this.planningActionHistory_index].pauseButtonClickedOn;
      this.doublePauseButtonClickedOn = this.planningActionHistory[this.planningActionHistory_index].doublePauseButtonClickedOn;
      this.setAllFromEdit({
        planningWithTheBoxes: {
          planning_boxes: [...this.planningActionHistory[this.planningActionHistory_index+1].getPlanningWithTheBoxes.planning_boxes],
          planning: this.planningActionHistory[this.planningActionHistory_index+1].getPlanningWithTheBoxes.planning,
        },
        OutToBeInserted: [...JSON.parse(JSON.stringify(this.OutToBeInserted))],
      });
      /*
      getPlanningWithTheBoxes:{
        planning_boxes: [...this.planningActionHistory[this.planningActionHistory_index+1].getPlanningWithTheBoxes.planning_boxes],
        planning: this.planningActionHistory[this.planningActionHistory_index+1].getPlanningWithTheBoxes.planning,
       },
       getOutToBeInserted:[...this.getOutToBeInserted],
      */


      this.thisPlanningBoxes = [
        ...this.getPlanningWithTheBoxes.planning_boxes.slice(1).map((e) => {
          e = e.map((l) => {
            if (l != 'P' && l != 'DP') {
              l.checkedInBiggPlanning = false;
            }
            return l;
          })
          e.workingHours = e[0].workingHours;

          return e;
        }),
      ];
      this.headers = [];
      this.headers.push({
        text: "Drivers | Time",
        sortable: false,
        key: "driver",
        align: "start",
        title: "Drivers | Time",
        value: "Drivers | Time",
      });
      this.headers.push({
        text: "WH",
        sortable: true,
        key: "driver",
        align: "start",
        title: "WH",
        value: "workingHours",
      });
      for (
        let index = 1;
        index < this.getPlanningWithTheBoxes.planning_boxes[0].length;
        index++
      ) {
        this.headers.push({
          text: this.getPlanningWithTheBoxes.planning_boxes[0][index].title,
          sortable: false,
          key:
            index + this.getPlanningWithTheBoxes.planning_boxes[0][index].title,
          align: "start",
          title: this.getPlanningWithTheBoxes.planning_boxes[0][index].title,
        });
      }
      this.OutToBeInserted = [...JSON.parse(JSON.stringify(this.planningActionHistory[this.planningActionHistory_index+1].getOutToBeInserted))],
      setTimeout(() => {
        this.planningWorkBoxChecked = null;
        this.planningWorkBoxChecked_ID = null;
        this.planningWorkBoxChecked_With = null;
        this.planningWorkBoxChecked_ID_With = null;
        this.planningWorkBoxChecked_Index = null;
        this.planningWorkBoxChecked_LEFT_OUT_REMOVED_AT = null;
        this.planningWorkDriver_Checked = null;
        this.planningWorkDriver_Checked_With = null;
        this.planningWorkDriver_Checked_Index = null;
        this.pauseButtonClickedOn = null;
        this.doublePauseButtonClickedOn = null;
      }, 300);

      for (let kk = 0; kk < this.planningActionHistory.length; kk++) {
        const element = this.planningActionHistory[this.planningActionHistory_index]
          .getPlanningWithTheBoxes.planning_boxes[1][1];



      }

      this.planningActionHistory_index++;
      let actionHsitoryObject={
        planningActionHistory:[...JSON.parse(JSON.stringify(this.planningActionHistory))],
        planningActionHistory_index:this.planningActionHistory_index
      }
      this.setActionHistory(actionHsitoryObject);
    },
    doBoxSwitchingDrivers() {



      for (let index = 0; index < this.thisPlanningBoxes.length; index++) {
        const element = this.thisPlanningBoxes[index][0];
        if (element.id == this.planningWorkDriver_Checked.id) {
          this.thisPlanningBoxes[index][0] = this.planningWorkDriver_Checked_With;
        }
        else if (element.id == this.planningWorkDriver_Checked_With.id) {
          this.thisPlanningBoxes[index][0] = this.planningWorkDriver_Checked;
        }
      }


      let tempHeader = [...this.headers];
      tempHeader.splice(1, 1);
      let itemsPlanning = [...this.thisPlanningBoxes];
      itemsPlanning.unshift(tempHeader);
      let actionDetails = {
        actionType:"drivers",
        getPlanningWithTheBoxes: {
          planning_boxes: [...itemsPlanning],
          planning: this.getPlanningWithTheBoxes.planning,
        },
        getOutToBeInserted: [...this.getOutToBeInserted],
        planningWorkBoxChecked: this.planningWorkBoxChecked,
        planningWorkBoxChecked_ID: this.planningWorkBoxChecked_ID,
        planningWorkBoxChecked_With: this.planningWorkBoxChecked_With,
        planningWorkBoxChecked_ID_With: this.planningWorkBoxChecked_ID_With,
        planningWorkBoxChecked_Index: this.planningWorkBoxChecked_Index,
        planningWorkBoxChecked_LEFT_OUT_REMOVED_AT: this.planningWorkBoxChecked_LEFT_OUT_REMOVED_AT,
        planningWorkDriver_Checked: this.planningWorkDriver_Checked,
        planningWorkDriver_Checked_With: this.planningWorkDriver_Checked_With,
        planningWorkDriver_Checked_Index: this.planningWorkDriver_Checked_Index,
        pauseButtonClickedOn: this.pauseButtonClickedOn,
        doublePauseButtonClickedOn: this.doublePauseButtonClickedOn,
      }
      this.setAllFromEdit({
        planningWithTheBoxes: {
          planning_boxes: [...itemsPlanning],
          planning: this.getPlanningWithTheBoxes.planning,
        },
        OutToBeInserted: [...this.OutToBeInserted]
      });
      let historyCopy=[];
      for (let index = 0; index <= this.planningActionHistory_index + 1; index++) {
        if(index==(this.planningActionHistory_index + 1)){
          historyCopy.push(JSON.parse(JSON.stringify(actionDetails)));
        }
        else{
          historyCopy.push(JSON.parse(JSON.stringify(this.planningActionHistory[index])));
        }

      }
      this.planningActionHistory=[...historyCopy];
      this.planningActionHistory_index++;
      let actionHsitoryObject={
        planningActionHistory:[...JSON.parse(JSON.stringify(this.planningActionHistory))],
        planningActionHistory_index:this.planningActionHistory_index
      }
      this.setActionHistory(actionHsitoryObject);
      this.clearRightSwitchSuggesst_driver();
      this.clearLeaftSwitchSuggesst_driver();

    },
    doBoxSwitching() {

      for (let kk = 0; kk < this.planningActionHistory.length; kk++) {
        const element = this.planningActionHistory[this.planningActionHistory_index]
          .getPlanningWithTheBoxes.planning_boxes[1][1];



      }

      if (this.workBoxLeftFromOuts) {
        for (let index = 0; index < this.thisPlanningBoxes.length; index++) {
          const element = this.thisPlanningBoxes[index][this.planningWorkBoxChecked_Index - 1];
          if ((element == 'P' || element == 'DP') && this.planningWorkBoxChecked_ID_With == this.thisPlanningBoxes[index][0].id) {
            this.thisPlanningBoxes[index][this.planningWorkBoxChecked_Index - 1] = this.planningWorkBoxChecked;
            this.OutToBeInserted[this.planningWorkBoxChecked_Index - 2].list =
              this.OutToBeInserted[this.planningWorkBoxChecked_Index - 2].list.filter((e, index) => {
                if (e.matricule == this.planningWorkBoxChecked.matricule) {
                  this.planningWorkBoxChecked_LEFT_OUT_REMOVED_AT = index;
                  return false;
                }


                return true;
              });
          }
          else if (!this.planningWorkBoxChecked_ID_With && element.matricule == this.planningWorkBoxChecked_With.matricule) {
            this.thisPlanningBoxes[index][this.planningWorkBoxChecked_Index - 1] = this.planningWorkBoxChecked;
            this.OutToBeInserted[this.planningWorkBoxChecked_Index - 2].list =
              this.OutToBeInserted[this.planningWorkBoxChecked_Index - 2].list.map((e, index) => {
                if (e.matricule == this.planningWorkBoxChecked.matricule) {
                  e = this.planningWorkBoxChecked_With;

                }


                return e;
              });

          }
        }

      }
      else if(this.doublePauseButtonClickedOn || this.pauseButtonClickedOn){
        for (let index = 0; index < this.thisPlanningBoxes.length; index++) {
          const element = this.thisPlanningBoxes[index][this.planningWorkBoxChecked_Index - 1];
          if ( ((element != 'P' && element != 'DP') && element.matricule == this.planningWorkBoxChecked.matricule) || this.planningWorkBoxChecked_ID==this.thisPlanningBoxes[index][0].id) {
            if(element != 'P' && element != 'DP'){

              this.OutToBeInserted[this.planningWorkBoxChecked_Index - 2].list.push(JSON.parse(JSON.stringify(element)));
            }

            this.thisPlanningBoxes[index][this.planningWorkBoxChecked_Index - 1] = this.planningWorkBoxChecked_With;
            console.log("bef : last",JSON.parse(JSON.stringify(this.planningActionHistory)))
          }
        }
      }
      else {
        for (let index = 0; index < this.thisPlanningBoxes.length; index++) {
          const element = this.thisPlanningBoxes[index][this.planningWorkBoxChecked_Index - 1];
          if ((element == 'P' || element == 'DP') && this.planningWorkBoxChecked_ID_With == this.thisPlanningBoxes[index][0].id) {
            this.thisPlanningBoxes[index][this.planningWorkBoxChecked_Index - 1] = this.planningWorkBoxChecked;
          }
          else if ((element == 'P' || element == 'DP') && this.planningWorkBoxChecked_ID == this.thisPlanningBoxes[index][0].id) {
            this.thisPlanningBoxes[index][this.planningWorkBoxChecked_Index - 1] = this.planningWorkBoxChecked_With;
          }
          else if ((element != 'P' && element != 'DP') && element.matricule == this.planningWorkBoxChecked_With.matricule) {
            this.thisPlanningBoxes[index][this.planningWorkBoxChecked_Index - 1] = this.planningWorkBoxChecked;
          }
          else if ((element != 'P' && element != 'DP') && element.matricule == this.planningWorkBoxChecked.matricule) {
            this.thisPlanningBoxes[index][this.planningWorkBoxChecked_Index - 1] = this.planningWorkBoxChecked_With;
          }
        }
      }


      let tempHeader = [...this.headers];
      tempHeader.splice(1, 1);
      let itemsPlanning = [...this.thisPlanningBoxes];
      itemsPlanning.unshift(tempHeader);
      let actionDetails = {
        actionType: this.workBoxLeftFromOuts ? "fromOuts" : "fromInP",
        getPlanningWithTheBoxes: {
          planning_boxes: [...itemsPlanning],
          planning: this.getPlanningWithTheBoxes.planning,
        },
        getOutToBeInserted: [...JSON.parse(JSON.stringify(this.OutToBeInserted))],
        planningWorkBoxChecked: this.planningWorkBoxChecked,
        planningWorkBoxChecked_ID: this.planningWorkBoxChecked_ID,
        planningWorkBoxChecked_With: this.planningWorkBoxChecked_With,
        planningWorkBoxChecked_ID_With: this.planningWorkBoxChecked_ID_With,
        planningWorkBoxChecked_Index: this.planningWorkBoxChecked_Index,
        planningWorkBoxChecked_LEFT_OUT_REMOVED_AT: this.planningWorkBoxChecked_LEFT_OUT_REMOVED_AT,
        planningWorkDriver_Checked: this.planningWorkDriver_Checked,
        planningWorkDriver_Checked_With: this.planningWorkDriver_Checked_With,
        planningWorkDriver_Checked_Index: this.planningWorkDriver_Checked_Index,
        pauseButtonClickedOn: this.pauseButtonClickedOn,
        doublePauseButtonClickedOn: this.doublePauseButtonClickedOn,
      }

      this.setAllFromEdit({
        planningWithTheBoxes: {
          planning_boxes: [...itemsPlanning],
          planning: this.getPlanningWithTheBoxes.planning,
        },
        OutToBeInserted: [...JSON.parse(JSON.stringify(this.OutToBeInserted))],
      });
      let historyCopy=[];
      for (let index = 0; index <= this.planningActionHistory_index + 1; index++) {
        if(index==(this.planningActionHistory_index + 1)){
          historyCopy.push(JSON.parse(JSON.stringify(actionDetails)));
        }
        else{
          historyCopy.push(JSON.parse(JSON.stringify(this.planningActionHistory[index])));
        }

      }
      this.planningActionHistory=[...historyCopy];
      console.log("aft : last",JSON.parse(JSON.stringify(this.planningActionHistory)))
      this.planningActionHistory_index++;
      this.pauseButtonClickedOn=false;
      this.doublePauseButtonClickedOn=false;
      let actionHsitoryObject={
        planningActionHistory:[...JSON.parse(JSON.stringify(this.planningActionHistory))],
        planningActionHistory_index:this.planningActionHistory_index
      }
      this.setActionHistory(actionHsitoryObject);
      this.clearRightSwitchSuggesst();
      this.clearLeaftSwitchSuggesst();
    },
    clearRightSwitchSuggesst_driver() {

      this.planningWorkDriver_Checked_With = null;

    },
    clearLeaftSwitchSuggesst_driver() {
      if (this.planningWorkDriver_Checked_With) {
        this.planningWorkDriver_Checked = this.planningWorkDriver_Checked_With;
        this.planningWorkDriver_Checked_With = null;
      }
      else {
        this.planningWorkDriver_Checked = null;
      }
    },
    clearRightSwitchSuggesst() {

      this.planningWorkBoxChecked_With = null;
      this.planningWorkBoxChecked_ID_With = null;

    },
    clearLeaftSwitchSuggesst() {
      if (this.planningWorkBoxChecked_With) {
        this.planningWorkBoxChecked = this.planningWorkBoxChecked_With;
        this.planningWorkBoxChecked_ID = this.planningWorkBoxChecked_ID_With;
        this.planningWorkBoxChecked_With = null;
        this.planningWorkBoxChecked_ID_With = null;
      }
      else {
        this.planningWorkBoxChecked = null;
        this.planningWorkBoxChecked_ID = null;
      }
    },
    ifItsShouldbeSHown(index, itemBox, driver_id) {
      if (this.planningWorkBoxChecked_Index == index) {
        if (itemBox == 'P' || itemBox == 'DP') {
          return this.planningWorkBoxChecked_ID == driver_id
        }
        else {
          return this.planningWorkBoxChecked?.matricule == itemBox.matricule
        }
      }
      else {
        return false;
      }
    },
    ifItsShouldbeSHown_With(index, itemBox, driver_id) {
      if (this.planningWorkBoxChecked_Index == index) {
        if (itemBox == 'P' || itemBox == 'DP') {
          return this.planningWorkBoxChecked_ID_With == driver_id
        }
        else {
          return this.planningWorkBoxChecked_With?.matricule == itemBox.matricule
        }
      }
      else {
        return false;
      }
    },
    clickOnThePlanningWorkDriver(driver, rowIndex) {
      this.clearPauseButtons();
      this.planningWorkDriver_Checked_Index = 0;
      this.planningWorkBoxChecked_Index = -1;
      this.planningWorkBoxChecked = null;
      this.planningWorkBoxChecked_With = null;
      if (!this.planningWorkDriver_Checked) {
        this.planningWorkDriver_Checked = driver;
        driver.checkedInBiggPlanning = true;
      } else if (!this.planningWorkDriver_Checked_With) {
        if (
          this.planningWorkDriver_Checked?.matricule == driver.matricule
        ) {
          this.planningWorkDriver_Checked = null;
          driver.checkedInBiggPlanning = false;
          this.planningWorkDriver_Checked_Index = -1;
        } else {
          this.planningWorkDriver_Checked_With = driver;
          driver.checkedInBiggPlanning = true;
        }
      } else if (
        this.planningWorkDriver_Checked?.matricule == driver.matricule
      ) {
        this.planningWorkDriver_Checked =
          this.planningWorkDriver_Checked_With;
        this.planningWorkDriver_Checked_With = null;
        driver.checkedInBiggPlanning = false;
      } else if (
        this.planningWorkDriver_Checked_With?.matricule == driver.matricule
      ) {
        this.planningWorkDriver_Checked_With = null;
        driver.checkedInBiggPlanning = false;
      } else if (
        this.planningWorkDriver_Checked?.matricule != driver.matricule &&
        this.planningWorkDriver_Checked_With?.matricule != driver.matricule
      ) {

        this.planningWorkDriver_Checked_With = driver;
        driver.checkedInBiggPlanning = true;
      }




      return driver;
    },
    clickOnThePlanningWorkBox(itemBox, index, rowIndex, fromInserted, driver_id) {
      this.clearPauseButtons();
      this.planningWorkDriver_Checked_Index = -1;
      this.planningWorkDriver_Checked = null;
      this.planningWorkDriver_Checked_With = null;

      if (driver_id != null) {



        if (this.planningWorkBoxChecked_Index == -1 || this.planningWorkBoxChecked_Index == index) {
          this.planningWorkBoxChecked_Index = index;
          if (!this.planningWorkBoxChecked) {
            this.planningWorkBoxChecked = itemBox;
            this.planningWorkBoxChecked_ID = driver_id;
          }
          else if (!this.planningWorkBoxChecked_With) {
            if (
              this.planningWorkBoxChecked_ID == driver_id
            ) {
              this.planningWorkBoxChecked = null;
              this.planningWorkBoxChecked_ID = null;
              this.planningWorkBoxChecked_Index = -1;
            } else {
              this.planningWorkBoxChecked_With = itemBox;
              this.planningWorkBoxChecked_ID_With = driver_id;
            }
          } else if (
            this.planningWorkBoxChecked_ID == driver_id
          ) {
            this.planningWorkBoxChecked =
              this.planningWorkBoxChecked_With;
            this.planningWorkBoxChecked_ID = this.planningWorkBoxChecked_ID_With;
            this.planningWorkBoxChecked_With = null;
            this.planningWorkBoxChecked_ID_With = null;
          } else if (
            this.planningWorkBoxChecked_ID_With == driver_id
          ) {
            this.planningWorkBoxChecked_With = null;
            this.planningWorkBoxChecked_ID_With = null;
          } else if (
            this.planningWorkBoxChecked_ID != driver_id &&
            this.planningWorkBoxChecked_ID_With != driver_id
          ) {
            this.planningWorkBoxChecked_With = itemBox;
            this.planningWorkBoxChecked_ID_With = driver_id;
          }
          if (this.planningWorkBoxChecked_With) {
            if (this.planningWorkBoxChecked_With == this.planningWorkBoxChecked) {
              this.clearLeaftSwitchSuggesst();
            }
          }
        }
        else {
          this.planningWorkBoxChecked_Index = index;
          this.planningWorkBoxChecked = itemBox;
          this.planningWorkBoxChecked_ID = driver_id;
          this.planningWorkBoxChecked_With = null;
          this.planningWorkBoxChecked_ID_With = null;
        }




      }
      else {

        if (this.planningWorkBoxChecked_Index == -1 || this.planningWorkBoxChecked_Index == index) {
          this.planningWorkBoxChecked_Index = index;
          itemBox.checkedInBiggPlanning = true;
          if (!this.planningWorkBoxChecked) {
            this.planningWorkBoxChecked = itemBox;
            itemBox.checkedInBiggPlanning = true;
            this.planningWorkBoxChecked_ID = null;
          } else if (!this.planningWorkBoxChecked_With) {

            if (
              this.planningWorkBoxChecked?.matricule == itemBox.matricule
            ) {
              this.planningWorkBoxChecked = null;
              itemBox.checkedInBiggPlanning = false;
              this.planningWorkBoxChecked_Index = -1;
            } else {
              this.planningWorkBoxChecked_With = itemBox;
              itemBox.checkedInBiggPlanning = true;
              this.planningWorkBoxChecked_ID_With = null;
            }
          } else if (
            this.planningWorkBoxChecked?.matricule == itemBox.matricule
          ) {
            this.planningWorkBoxChecked =
              this.planningWorkBoxChecked_With;
            this.planningWorkBoxChecked_ID = this.planningWorkBoxChecked_ID_With;
            this.planningWorkBoxChecked_With = null;
            this.planningWorkBoxChecked_ID_With = null;
            itemBox.checkedInBiggPlanning = false;
          } else if (
            this.planningWorkBoxChecked_With?.matricule == itemBox.matricule
          ) {
            console.log("clicka 3liha")
            this.planningWorkBoxChecked_With = null;
            itemBox.checkedInBiggPlanning = false;
          }
          else if (
            this.planningWorkBoxChecked?.matricule != itemBox.matricule &&
            this.planningWorkBoxChecked_With?.matricule != itemBox.matricule
          ) {
            console.log("clickasss 3liha")
            this.planningWorkBoxChecked_With = itemBox;
            itemBox.checkedInBiggPlanning = true;
            this.planningWorkBoxChecked_ID_With = null;
          }
          if (this.planningWorkBoxChecked_With) {
            if (this.OutToBeInserted[index - 2].list.filter((e) => e?.matricule == this.planningWorkBoxChecked_With?.matricule).length > 0) {
              let perm = this.planningWorkBoxChecked_With;
              this.planningWorkBoxChecked_With = this.planningWorkBoxChecked;
              this.planningWorkBoxChecked = perm;


              let perm2 = this.planningWorkBoxChecked_ID;
              this.planningWorkBoxChecked_ID = this.planningWorkBoxChecked_ID_With;
              this.planningWorkBoxChecked_ID_With = perm2;
            }
            if (this.OutToBeInserted[index - 2].list.filter((e) => e?.matricule == this.planningWorkBoxChecked_With?.matricule).length > 0) {
              this.planningWorkBoxChecked_With = null;
            }
          }
          if (this.planningWorkBoxChecked_With) {
            if (this.planningWorkBoxChecked_With == this.planningWorkBoxChecked) {
              this.clearLeaftSwitchSuggesst();
            }
          }

        }
        else {

          for (let i = 0; i < this.thisPlanningBoxes.length; i++) {
            for (let k = 0; k < this.thisPlanningBoxes[i].length; k++) {
              if (this.thisPlanningBoxes[i][k] != 'P' && this.thisPlanningBoxes[i][k] != 'DP') {
                this.thisPlanningBoxes[i][k].checkedInBiggPlanning = false;
              }

            }

          }
          this.planningWorkBoxChecked_Index = index;
          itemBox.checkedInBiggPlanning = true;
          this.planningWorkBoxChecked = itemBox;
          this.planningWorkBoxChecked_With = null;
          this.planningWorkBoxChecked_ID = null;
          this.planningWorkBoxChecked_ID_With = null;
        }
      }

      return itemBox;
    },
    openClickApply() {
      this.applyDialogShow = true;
    },
    clickApply() {

      if (this.reloadPlanning) {
        this.setBoxesFromTheFrontend(this.checkEditedPlanning);
        this.thisPlanningBoxes = this.checkEditedPlanning.slice(1);
        this.headers = [];
        this.headers.push({
          text: this.getPlanningWithTheBoxes.planning_boxes[0][0],
          sortable: false,
          key: "driver",
          align: "start",
          title: this.getPlanningWithTheBoxes.planning_boxes[0][0],
        });
        this.headers.push({
          text: "WH",
          sortable: true,
          key: "driver",
          align: "start",
          title: "WH",
          value: "workingHours",
        });

        for (
          let index = 1;
          index < this.getPlanningWithTheBoxes.planning_boxes[0].length;
          index++
        ) {
          this.headers.push({
            text: this.getPlanningWithTheBoxes.planning_boxes[0][index].title != null ? this.getPlanningWithTheBoxes.planning_boxes[0][index].title : this.checkEditedPlanning[0][index],
            sortable: false,
            key:
              index + this.getPlanningWithTheBoxes.planning_boxes[0][index].title != null ? this.getPlanningWithTheBoxes.planning_boxes[0][index].title : this.checkEditedPlanning[0][index],
            align: "start",
            title: this.getPlanningWithTheBoxes.planning_boxes[0][index].title != null ? this.getPlanningWithTheBoxes.planning_boxes[0][index].title : this.checkEditedPlanning[0][index],
          });
        }
        this.OutToBeInserted = this.ThisOutToBeInserted;
        if (this.OutToBeInserted.length == 0) {
          this.checkEditedPlanning[0].slice(1).map((e) => {
            this.OutToBeInserted.push({
              list: [],
              checked: false,
            });
          })
        }
      }
      else {
        let paylodPlanning = this.tempPlanning_forShow;
        paylodPlanning.unshift(this.getPlanningWithTheBoxes.planning_boxes[0]);
        this.setBoxesFromTheFrontend(paylodPlanning);
        this.thisPlanningBoxes = paylodPlanning.slice(1);
        this.OutToBeInserted = this.ThisOutToBeInserted;
        if (this.OutToBeInserted.length == 0) {
          this.thisPlanningBoxes[0].slice(1).map((e) => {
            this.OutToBeInserted.push({
              list: [],
              checked: false,
            });
          })
        }

      }
      this.ifCheckEditedPlanning = false;
      this.setOutToBeInserted(this.OutToBeInserted);
      this.applyDialogShow = false;
      this.saveDialogShow = false;
      this.editDriversEquipmentsDialog = false;


      let tempHeader = [...this.headers];
      tempHeader.splice(1, 1);
      let itemsPlanning = [...this.thisPlanningBoxes];
      itemsPlanning.unshift(tempHeader);
      let actionDetails = {
        actionType: "editBoth",
        getPlanningWithTheBoxes: {
          planning_boxes: [...itemsPlanning],
          planning: this.getPlanningWithTheBoxes.planning,
        },
        getOutToBeInserted: [...this.getOutToBeInserted],
        planningWorkBoxChecked: this.planningWorkBoxChecked,
        planningWorkBoxChecked_ID: this.planningWorkBoxChecked_ID,
        planningWorkBoxChecked_With: this.planningWorkBoxChecked_With,
        planningWorkBoxChecked_ID_With: this.planningWorkBoxChecked_ID_With,
        planningWorkBoxChecked_Index: this.planningWorkBoxChecked_Index,
        planningWorkBoxChecked_LEFT_OUT_REMOVED_AT: this.planningWorkBoxChecked_LEFT_OUT_REMOVED_AT,
        planningWorkDriver_Checked: this.planningWorkDriver_Checked,
        planningWorkDriver_Checked_With: this.planningWorkDriver_Checked_With,
        planningWorkDriver_Checked_Index: this.planningWorkDriver_Checked_Index,
        pauseButtonClickedOn: this.pauseButtonClickedOn,
        doublePauseButtonClickedOn: this.doublePauseButtonClickedOn,
      }
      this.setAllFromEdit({
        planningWithTheBoxes: {
          planning_boxes: [...itemsPlanning],
          planning: this.getPlanningWithTheBoxes.planning,
        },
        OutToBeInserted: JSON.parse(JSON.stringify(this.OutToBeInserted))
      });
      let historyCopy=[];
      for (let index = 0; index <= this.planningActionHistory_index + 1; index++) {
        if(index==(this.planningActionHistory_index + 1)){
          historyCopy.push(JSON.parse(JSON.stringify(actionDetails)));
        }
        else{
          historyCopy.push(JSON.parse(JSON.stringify(this.planningActionHistory[index])));
        }

      }
      this.planningActionHistory=[...historyCopy];
      this.planningActionHistory_index++;
      let actionHsitoryObject={
        planningActionHistory:[...JSON.parse(JSON.stringify(this.planningActionHistory))],
        planningActionHistory_index:this.planningActionHistory_index
      }
      this.setActionHistory(actionHsitoryObject);
      this.clearRightSwitchSuggesst_driver();
      this.clearLeaftSwitchSuggesst_driver();


    },
    clickFinish() {
      this.ifCheckEditedPlanning = true;
      if (this.reloadPlanning) {

        if (this.driversInPlanningWithCheck.length > this.equipmentsInPlanningWithCheck.length) {

          this.$emit(
            "CustomRtgPlanning",
            false,
            this.driversInPlanningWithCheck,
            this.equipmentsInPlanningWithCheck,
            this.ShiftIndex,
            this.selectedPlanning,
            []
          );
          this.ThisOutToBeInserted = [];




          this.saveDialogShow = true;
        }
        else {

          this.ThisOutToBeInserted = [];
          for (let index = 0; index < 8; index++) {
            this.ThisOutToBeInserted.push({
              list: [],
              checked: false,
            });
          }
          this.$emit(
            "rtgFullPlanning",
            this.driversInPlanningWithCheck,
            this.equipmentsInPlanningWithCheck,
            this.ShiftIndex,
          );
          if (this.driversInPlanningWithCheck.length < this.equipmentsInPlanningWithCheck.length) {
            let outEquipments = this.equipmentsInPlanningWithCheck.slice(this.driversInPlanningWithCheck.length,)
            this.ThisOutToBeInserted = this.ThisOutToBeInserted.map((e) => {
              e.list = [...outEquipments];
              e.checked = false;
              return e;
            });
          } else {
            this.ThisOutToBeInserted = this.ThisOutToBeInserted.map((e) => {
              e.list = [];
              e.checked = false;
              return e;
            });
          }

          this.saveDialogShow = true;
          this.ifCheckEditedPlanning = true;
        }



      } else {
        this.ThisOutToBeInserted = [];
        let tempPlanning = [
          ...this.thisPlanningBoxes.map((arr) => arr.slice()),
        ];
        let tempPlanning_2 = [];
        for (let i = 0; i < tempPlanning.length; i++) {
          let row = [];
          row.push(tempPlanning[i][0]);
          for (let k = 1; k < tempPlanning[i].length; k++) {


            if (tempPlanning[i][k] == "P" || tempPlanning[i][k] == "DP") {
              row.push(tempPlanning[i][k]);
            }
            else {
              row.push(null);
            }
          }
          tempPlanning_2.push([...row])
        }
        this.getOutToBeInserted.map((e) => {
          this.ThisOutToBeInserted.push({
            list: [],
            checked: false,
          });
        });
        let equipmentInPlanning_now = this.equipmentsInThePlanning();
        let tepEquipmentInThePlanning = [...this.equipmentsInPlanningWithCheck];
        tepEquipmentInThePlanning = tepEquipmentInThePlanning.map((e) => {
          e.checked = false;
          return e;
        });
        for (
          let index = 0;
          index < tepEquipmentInThePlanning.length;
          index++
        ) {
          if (index < equipmentInPlanning_now.length) {
            tempPlanning_2 = this.switchEquipmentFromRealPlanning(
              tempPlanning,
              tempPlanning_2,
              equipmentInPlanning_now[index],
              tepEquipmentInThePlanning[index]
            );
          } else {
            for (let i = 0; i < this.ThisOutToBeInserted.length; i++) {
              this.ThisOutToBeInserted[i].list.push(
                this.equipmentsInPlanningWithCheck[index]
              );
            }
          }
        }

        tempPlanning = tempPlanning_2;

        tempPlanning = this.deleteEquipmentNotSelectedInPlanning(tempPlanning, this.equipmentsInPlanningWithCheck)
        tempPlanning = this.switchDriversFromRealPlanning(
          tempPlanning,
          this.driversInPlanningWithCheck
        );

        this.tempPlanning_forShow = tempPlanning;
        this.saveDialogShow = true;
      }
    },

    switchDriversFromRealPlanning(tempPlanning, newDrivers) {
      for (let index = 0; index < newDrivers.length; index++) {
        if (index < tempPlanning.length) {
          tempPlanning[index][0] = newDrivers[index];
        } else {
          tempPlanning.push([
            newDrivers[index],
            ...Array(this.headers.length - 2).fill("P"),
          ]);
        }
      }
      if (tempPlanning.length > newDrivers.length) {
        for (let i = newDrivers.length; i < tempPlanning.length; i++) {
          for (let j = 0; j < this.ThisOutToBeInserted.length; j++) {
            if (
              tempPlanning[i][j + 1] != "P" &&
              tempPlanning[i][j + 1] != "DP"
            ) {
              this.ThisOutToBeInserted[j].list.push(tempPlanning[i][j + 1]);
            }
          }
        }
      }
      tempPlanning = tempPlanning.slice(
        0,
        newDrivers.length
      );
      return tempPlanning;
    },
    deleteEquipmentNotSelectedInPlanning(tempPlanning, equipmentsInPlanningWithCheck) {
      for (let i1 = 0; i1 < tempPlanning.length; i1++) {
        for (let i2 = 1; i2 < tempPlanning[i1].length; i2++) {
          if (tempPlanning[i1][i2] != "P" && tempPlanning[i1][i2] != "DP") {
            if (equipmentsInPlanningWithCheck.filter((e) => { return e.matricule == tempPlanning[i1][i2]?.matricule }).length == 0) {
              tempPlanning[i1][i2] = "P"
            }


          }
        }
      }
      return tempPlanning;
    },
    switchEquipmentFromRealPlanning(tempPlanning, tempPlanning_2, equipmentOld, equipmentNew) {
      let tempPlanning2 = [...tempPlanning_2];

      for (let i1 = 0; i1 < tempPlanning.length; i1++) {
        for (let i2 = 1; i2 < tempPlanning[i1].length; i2++) {
          if (equipmentOld.matricule == tempPlanning[i1][i2].matricule) {
            tempPlanning2[i1][i2] = { ...equipmentNew };

          }


        }
      }

      return tempPlanning2;
    },
    tabDriversSelect() {
      this.selectedChangeEDSow = 0;
      this.allBothAddButton_switch = false;
      this.allBothAddButton_delete = false;
      this.allBothAddButton_hold = false;
      this.allBothAddButton_add = false;
      this.clear();
    },
    tabEqipmentSelect() {
      this.selectedChangeEDSow = 1;
      this.allBothAddButton_switch = false;
      this.allBothAddButton_delete = false;
      this.allBothAddButton_hold = false;
      this.allBothAddButton_add = false;
      this.clear();
    },
    equipmentEditClickBack() {
      this.equipmentsInPlanningWithCheck = [
        ...this.equipmentsInPlanningWithCheck_backup,
      ];
      this.equipmentsNotInPlanningWithCheck = [
        ...this.equipmentsNotInPlanningWithCheck_backup,
      ];
      this.allBothAddButton_switch = false;
      this.actionIndex = -1;
      this.equipmentEditActions = [];
      this.equipmentEditCheckedForSwitch = null;
      this.equipmentEditCheckedForSwitchWith = null;
      this.equipmentSwitch_back_Dialog = false;
    },
    equipmentEditClickDelete() {
      this.equipmentsInPlanningWithCheck =
        this.equipmentsInPlanningWithCheck.filter((e) => !e.checked);
      this.allBothAddButton_delete = false;
      this.equipmentSwitch_delete_Dialog = false;
      this.commitedChange = true;
    },
    equipmentEditClickConfirm() {
      this.allBothAddButton_switch = false;
      this.actionIndex = -1;
      this.equipmentEditActions = [];
      this.equipmentEditCheckedForSwitch = null;
      this.equipmentEditCheckedForSwitchWith = null;
      this.equipmentSwitchDialog = false;
      this.commitedChange = true;
    },
    clear() {
      this.equipmentEditAddOn = false;
      this.equipmentEditCheckedForAdd = {
        id: null,
        matricule: null,
        status: null,
        profile_group_id: null,
        created_at: null,
        updated_at: null,
        profileGroup: {
          id: null,
          type: "rtg",
          created_at: null,
          updated_at: null,
        },
        profile_group: {
          id: null,
          type: null,
          created_at: null,
          updated_at: null,
        },
        checked: false,
      };
      this.equipmentEditCheckedForSwitch = null;
      this.equipmentEditCheckedForSwitchWith = null;
    },
    equipmentUndo() {
      if (this.canDoAction && this.actionIndex > -1) {
        this.canDoAction = false;
        if (this.equipmentEditActions[this.actionIndex].action == "switchH") {
          this.equipmentEditCheckedForSwitch =
            this.equipmentEditActions[
              this.actionIndex
            ].equipmentEditCheckedForSwitchWith;
          this.equipmentEditCheckedForSwitchWith =
            this.equipmentEditActions[
              this.actionIndex
            ].equipmentEditCheckedForSwitch;
          this.equipmentsInPlanningWithCheck =
            this.equipmentsInPlanningWithCheck.map((e) => {
              if (e.id == this.equipmentEditCheckedForSwitchWith?.id) {
                e = this.equipmentEditCheckedForSwitch;
                return e;
              } else if (e.id == this.equipmentEditCheckedForSwitch?.id) {
                e = this.equipmentEditCheckedForSwitchWith;
                return e;
              }
              return e;
            });
          this.actionIndex--;
          setTimeout(() => {
            this.equipmentEditCheckedForSwitch = null;
            this.equipmentEditCheckedForSwitchWith = null;
            this.canDoAction = true;
          }, 200);
        } else if (
          this.equipmentEditActions[this.actionIndex].action == "switchV"
        ) {
          this.equipmentEditCheckedForSwitch =
            this.equipmentEditActions[
              this.actionIndex
            ].equipmentEditCheckedForSwitch;
          this.equipmentEditCheckedForSwitchWith =
            this.equipmentEditActions[
              this.actionIndex
            ].equipmentEditCheckedForSwitchWith;
          if (
            this.equipmentsInPlanningWithCheck.filter(
              (e) => e.id == this.equipmentEditCheckedForSwitch.id
            ).length > 0
          ) {
            this.equipmentsInPlanningWithCheck =
              this.equipmentsInPlanningWithCheck.map((e) => {
                if (e.id == this.equipmentEditCheckedForSwitch?.id) {
                  e = this.equipmentEditCheckedForSwitchWith;
                  return e;
                }
                return e;
              });
            this.equipmentsNotInPlanningWithCheck =
              this.equipmentsNotInPlanningWithCheck.map((e) => {
                if (e.id == this.equipmentEditCheckedForSwitchWith?.id) {
                  e = this.equipmentEditCheckedForSwitch;
                  return e;
                }
                return e;
              });
          } else {
            this.equipmentsInPlanningWithCheck =
              this.equipmentsInPlanningWithCheck.map((e) => {
                if (e.id == this.equipmentEditCheckedForSwitchWith?.id) {
                  e = this.equipmentEditCheckedForSwitch;
                  return e;
                }
                return e;
              });
            this.equipmentsNotInPlanningWithCheck =
              this.equipmentsNotInPlanningWithCheck.map((e) => {
                if (e.id == this.equipmentEditCheckedForSwitch?.id) {
                  e = this.equipmentEditCheckedForSwitchWith;
                  return e;
                }
                return e;
              });
          }

          this.actionIndex--;
          setTimeout(() => {
            this.equipmentEditCheckedForSwitch = null;
            this.equipmentEditCheckedForSwitchWith = null;
            this.canDoAction = true;
          }, 200);
        } else if (
          this.equipmentEditActions[this.actionIndex].action == "add"
        ) {
          this.equipmentEditCheckedForSwitch =
            this.equipmentEditActions[
              this.actionIndex
            ].equipmentEditCheckedForSwitch;
          let index = this.equipmentEditActions[this.actionIndex].index;
          this.equipmentsNotInPlanningWithCheck.splice(
            index,
            0,
            this.equipmentEditCheckedForSwitch
          );
          this.equipmentsInPlanningWithCheck =
            this.equipmentsInPlanningWithCheck.filter((e) => {
              return e.id != this.equipmentEditCheckedForSwitch.id;
            });
          setTimeout(() => {
            this.equipmentEditCheckedForSwitch = null;
            this.equipmentEditCheckedForSwitchWith = null;
            this.canDoAction = true;
          }, 200);
          this.actionIndex--;
        }
      }
    },
    equipmentRedo() {
      if (
        this.canDoAction &&
        this.equipmentEditActions.length > this.actionIndex + 1
      ) {
        this.canDoAction = false;
        if (
          this.equipmentEditActions[this.actionIndex + 1].action == "switchH"
        ) {
          this.equipmentEditCheckedForSwitchWith =
            this.equipmentEditActions[
              this.actionIndex + 1
            ].equipmentEditCheckedForSwitchWith;
          this.equipmentEditCheckedForSwitch =
            this.equipmentEditActions[
              this.actionIndex + 1
            ].equipmentEditCheckedForSwitch;
          this.equipmentsInPlanningWithCheck =
            this.equipmentsInPlanningWithCheck.map((e) => {
              if (e.id == this.equipmentEditCheckedForSwitchWith?.id) {
                e = this.equipmentEditCheckedForSwitch;
                return e;
              } else if (e.id == this.equipmentEditCheckedForSwitch?.id) {
                e = this.equipmentEditCheckedForSwitchWith;
                return e;
              }
              return e;
            });
          this.actionIndex++;
          setTimeout(() => {
            this.equipmentEditCheckedForSwitch = null;
            this.equipmentEditCheckedForSwitchWith = null;
            this.canDoAction = true;
          }, 200);
        } else if (
          this.equipmentEditActions[this.actionIndex + 1].action == "switchV"
        ) {
          this.equipmentEditCheckedForSwitchWith =
            this.equipmentEditActions[
              this.actionIndex + 1
            ].equipmentEditCheckedForSwitchWith;
          this.equipmentEditCheckedForSwitch =
            this.equipmentEditActions[
              this.actionIndex + 1
            ].equipmentEditCheckedForSwitch;
          if (
            this.equipmentsInPlanningWithCheck.filter(
              (e) => e.id == this.equipmentEditCheckedForSwitch.id
            ).length > 0
          ) {
            this.equipmentsInPlanningWithCheck =
              this.equipmentsInPlanningWithCheck.map((e) => {
                if (e.id == this.equipmentEditCheckedForSwitch?.id) {
                  e = this.equipmentEditCheckedForSwitchWith;
                  return e;
                }
                return e;
              });
            this.equipmentsNotInPlanningWithCheck =
              this.equipmentsNotInPlanningWithCheck.map((e) => {
                if (e.id == this.equipmentEditCheckedForSwitchWith?.id) {
                  e = this.equipmentEditCheckedForSwitch;
                  return e;
                }
                return e;
              });
          } else {
            this.equipmentsInPlanningWithCheck =
              this.equipmentsInPlanningWithCheck.map((e) => {
                if (e.id == this.equipmentEditCheckedForSwitchWith?.id) {
                  e = this.equipmentEditCheckedForSwitch;
                  return e;
                }
                return e;
              });
            this.equipmentsNotInPlanningWithCheck =
              this.equipmentsNotInPlanningWithCheck.map((e) => {
                if (e.id == this.equipmentEditCheckedForSwitch?.id) {
                  e = this.equipmentEditCheckedForSwitchWith;
                  return e;
                }
                return e;
              });
          }
          this.actionIndex++;
          setTimeout(() => {
            this.equipmentEditCheckedForSwitch = null;
            this.equipmentEditCheckedForSwitchWith = null;
            this.canDoAction = true;
          }, 200);
        } else if (
          this.equipmentEditActions[this.actionIndex + 1].action == "add"
        ) {
          this.equipmentEditCheckedForSwitch =
            this.equipmentEditActions[
              this.actionIndex + 1
            ].equipmentEditCheckedForSwitch;
          this.equipmentEditCheckedForAdd =
            this.equipmentEditActions[
              this.actionIndex + 1
            ].equipmentEditCheckedForSwitch;
          let index = this.equipmentEditActions[this.actionIndex + 1].index;
          this.equipmentsInPlanningWithCheck.push(
            this.equipmentEditCheckedForSwitch
          );
          this.equipmentsNotInPlanningWithCheck =
            this.equipmentsNotInPlanningWithCheck.filter((e) => {
              return e.id != this.equipmentEditCheckedForSwitch.id;
            });
          setTimeout(() => {
            this.equipmentEditCheckedForSwitch = null;
            this.equipmentEditCheckedForSwitchWith = null;
            this.equipmentEditCheckedForAdd = {
              id: null,
              matricule: null,
              status: null,
              profile_group_id: null,
              created_at: null,
              updated_at: null,
              profileGroup: {
                id: null,
                type: "rtg",
                created_at: null,
                updated_at: null,
              },
              profile_group: {
                id: null,
                type: null,
                created_at: null,
                updated_at: null,
              },
              checked: false,
            };
            this.canDoAction = true;
          }, 200);
          this.actionIndex++;
        }
      }
    },
    addEquipment() {
      this.equipmentsInPlanningWithCheck.push(this.equipmentEditCheckedForAdd);
      let indexTemp = this.equipmentsNotInPlanningWithCheck.indexOf(
        this.equipmentEditCheckedForSwitch
      );
      this.equipmentsNotInPlanningWithCheck =
        this.equipmentsNotInPlanningWithCheck.filter(
          (e) => e.id != this.equipmentEditCheckedForAdd.id
        );
      this.equipmentEditAddOn = false;
      this.equipmentEditCheckedForAdd = {
        id: null,
        matricule: null,
        status: null,
        profile_group_id: null,
        created_at: null,
        updated_at: null,
        profileGroup: {
          id: null,
          type: "rtg",
          created_at: null,
          updated_at: null,
        },
        profile_group: {
          id: null,
          type: null,
          created_at: null,
          updated_at: null,
        },
        checked: false,
      };

      this.actionIndex++;
      this.equipmentEditActions = this.equipmentEditActions.slice(
        0,
        this.actionIndex
      );
      this.equipmentEditActions.push({
        action: "add",
        equipmentEditCheckedForSwitch: this.equipmentEditCheckedForSwitch,
        equipmentEditCheckedForSwitchWith: null,
        index: indexTemp,
      });
      this.equipmentEditCheckedForSwitch = null;
      this.equipmentEditCheckedForSwitchWith = null;
    },
    setEquipmentAdd(item) {
      if (!this.equipmentEditAddOn) {
        this.equipmentEditCheckedForAdd = {
          id: null,
          matricule: null,
          status: null,
          profile_group_id: null,
          created_at: null,
          updated_at: null,
          profileGroup: {
            id: null,
            type: "rtg",
            created_at: null,
            updated_at: null,
          },
          profile_group: {
            id: null,
            type: null,
            created_at: null,
            updated_at: null,
          },
          checked: false,
        };
        if (this.getFromOut) {
          this.equipmentEditCheckedForAdd = this.getFromOut;
          if (this.InWith(this.getFromOut)) {
            this.equipmentEditCheckedForSwitch = this.getFromOut;
            this.equipmentEditCheckedForSwitchWith = null;
          } else {
            this.equipmentEditCheckedForSwitchWith = null;
          }
        } else {
          this.equipmentEditCheckedForSwitch = null;
          this.equipmentEditCheckedForSwitchWith = null;
        }
      } else {
        if (this.getFromIn.length > 0) {
          this.equipmentEditAddOn = false;
          this.equipmentEditCheckedForAdd.checked = false;
          this.equipmentEditCheckedForAdd = {
            id: null,
            matricule: null,
            status: null,
            profile_group_id: null,
            created_at: null,
            updated_at: null,
            profileGroup: {
              id: null,
              type: "",
              created_at: null,
              updated_at: null,
            },
            profile_group: {
              id: null,
              type: null,
              created_at: null,
              updated_at: null,
            },
            checked: false,
          };
        } else if (this.getFromOut) {
          this.equipmentEditCheckedForAdd = this.getFromOut;
          if (this.InWith(this.getFromOut)) {
            this.equipmentEditCheckedForSwitch = this.getFromOut;
            this.equipmentEditCheckedForSwitchWith = null;
          } else {
            this.equipmentEditCheckedForSwitchWith = null;
          }
        }
      }

      if (item == null) {
        this.equipmentEditAddOn = !this.equipmentEditAddOn;
        this.equipmentEditCheckedForAdd.checked =
          !this.equipmentEditCheckedForAdd.checked;
        if (!this.equipmentEditAddOn) {
          this.equipmentEditCheckedForAdd = {
            id: null,
            matricule: null,
            status: null,
            profile_group_id: null,
            created_at: null,
            updated_at: null,
            profileGroup: {
              id: null,
              type: "",
              created_at: null,
              updated_at: null,
            },
            profile_group: {
              id: null,
              type: null,
              created_at: null,
              updated_at: null,
            },
            checked: false,
          };
        }
      }
      if (!this.getFromOut) {
        this.equipmentEditCheckedForAdd = {
          id: null,
          matricule: null,
          status: null,
          profile_group_id: null,
          created_at: null,
          updated_at: null,
          profileGroup: {
            id: null,
            type: "",
            created_at: null,
            updated_at: null,
          },
          profile_group: {
            id: null,
            type: null,
            created_at: null,
            updated_at: null,
          },
          checked: false,
        };
      }
    },
    switchBetweenEquipments() {
      let thisAction = null;
      let tempIn = this.getFromIn[0];
      let tempIn2 = null;
      if (this.getFromIn.length > 0) tempIn2 = this.getFromIn[1];
      let tempOut = this.getFromOut;
      if (tempOut) {
        thisAction = {
          action: "switchV",
          equipmentEditCheckedForSwitch: this.equipmentEditCheckedForSwitch,
          equipmentEditCheckedForSwitchWith:
            this.equipmentEditCheckedForSwitchWith,
        };
        this.equipmentsInPlanningWithCheck =
          this.equipmentsInPlanningWithCheck.map((e) => {
            if (e.id == tempIn?.id) {
              e = tempOut;
              return e;
            }
            return e;
          });
        this.equipmentsNotInPlanningWithCheck =
          this.equipmentsNotInPlanningWithCheck.map((e) => {
            if (e.id == tempOut?.id) {
              e = tempIn;
              return e;
            }
            return e;
          });
      } else {
        thisAction = {
          action: "switchH",
          equipmentEditCheckedForSwitch: this.equipmentEditCheckedForSwitch,
          equipmentEditCheckedForSwitchWith:
            this.equipmentEditCheckedForSwitchWith,
        };
        this.equipmentsInPlanningWithCheck =
          this.equipmentsInPlanningWithCheck.map((e) => {
            if (e.id == tempIn?.id) {
              e = tempIn2;
              return e;
            } else if (e.id == tempIn2?.id) {
              e = tempIn;
              return e;
            }
            return e;
          });
      }
      this.equipmentEditCheckedForSwitch = null;
      this.equipmentEditCheckedForSwitchWith = null;
      this.actionIndex++;
      this.equipmentEditActions = this.equipmentEditActions.slice(
        0,
        this.actionIndex
      );
      this.equipmentEditActions.push(thisAction);
    },
    equipmentCheckedForSwitch(item) {
      return this.InWith(item) || this.InSwitch(item);
    },
    InWith(item) {
      return (
        this.equipmentEditCheckedForSwitch != null &&
        item.id != this.equipmentEditCheckedForSwitch?.id &&
        this.equipmentEditCheckedForSwitchWith?.id == item.id
      );
    },
    InSwitch(item) {
      return (
        this.equipmentEditCheckedForSwitch != null &&
        item.id == this.equipmentEditCheckedForSwitch?.id &&
        this.equipmentEditCheckedForSwitchWith?.id != item.id
      );
    },
    setEquipmentEditCheckedForSwitchWith(item) {
      if (!this.equipmentEditCheckedForSwitch) {
        this.equipmentEditCheckedForSwitch = item;
        item.checked = true;
      } else if (!this.equipmentEditCheckedForSwitchWith) {
        if (
          this.checkSwitchEquipmentSide == "OUT" &&
          this.equipmentsNotInPlanningWithCheck.filter((e) => e.id == item.id)
            .length > 0
        ) {
          if (this.equipmentEditCheckedForSwitch.id != item.id) {
            this.equipmentEditCheckedForSwitch = item;
            item.checked = true;
          } else {
            this.equipmentEditCheckedForSwitch = null;
            item.checked = false;
          }
        } else if (
          this.equipmentEditCheckedForSwitch?.matricule == item.matricule
        ) {
          this.equipmentEditCheckedForSwitch = null;
          item.checked = false;
        } else {
          this.equipmentEditCheckedForSwitchWith = item;
          item.checked = true;
        }
      } else if (
        this.equipmentEditCheckedForSwitch?.matricule == item.matricule
      ) {
        this.equipmentEditCheckedForSwitch =
          this.equipmentEditCheckedForSwitchWith;
        this.equipmentEditCheckedForSwitchWith = null;
        item.checked = false;
      } else if (
        this.equipmentEditCheckedForSwitchWith?.matricule == item.matricule
      ) {
        this.equipmentEditCheckedForSwitchWith = null;
        item.checked = false;
      } else if (
        this.equipmentEditCheckedForSwitch?.matricule != item.matricule &&
        this.equipmentEditCheckedForSwitchWith?.matricule != item.matricule
      ) {
        if (this.checkIfEquipmentIsGoingToBrDeleted) {
          if (
            this.equipmentsNotInPlanningWithCheck.filter((e) => e.id == item.id)
              .length > 0
          ) {
            if (this.checkSwitchEquipmentSide == "OUT") {
              if (this.equipmentEditCheckedForSwitch.id != item.id) {
                this.equipmentEditCheckedForSwitch =
                  this.equipmentEditCheckedForSwitchWith;
                this.equipmentEditCheckedForSwitchWith = item;
              } else {
                this.equipmentEditCheckedForSwitch = null;
                item.checked = false;
              }
            }
          }
          if (
            this.equipmentsInPlanningWithCheck.filter((e) => e.id == item.id)
              .length > 0
          ) {
            if (this.checkSwitchEquipmentSide == "IN") {
              if (this.equipmentEditCheckedForSwitch.id != item.id) {
                this.equipmentEditCheckedForSwitch =
                  this.equipmentEditCheckedForSwitchWith;
                this.equipmentEditCheckedForSwitchWith = item;
              } else {
                this.equipmentEditCheckedForSwitch = null;
                item.checked = false;
              }
            }
          }
        }

        this.equipmentEditCheckedForSwitchWith = item;
        item.checked = true;
      }
      if (this.equipmentEditAddOn) this.setEquipmentAdd(item);
      return item;
    },
    removeEquipmentEditCheckedForSwitchWith() {
      if (this.equipmentEditCheckedForSwitchWith != null)
        this.equipmentEditCheckedForSwitchWith = null;
    },
    setEquipmentEditCheckedForSwitch(item) {
      if (this.equipmentEditCheckedForSwitch) {
        this.equipmentEditCheckedForSwitch = null;
      } else {
        this.equipmentEditCheckedForSwitch = item;
      }

      item.checked = !item.checked;
      return item;
    },
    removeEquipmentEditCheckedForSwitch(item) {
      this.equipmentEditCheckedForSwitch = null;
      item.checked = !item.checked;
      return item;
    },
    tobeOutWithANotherOut(item) {
      (this.toBeInCmp(item) || this.toBeOProposedInInCmp(item)) &&
        this.checkIfEquipmentIsGoingToBrChanged;
    },
    toBeInCmp(item) {
      return (
        this.equipmentEditCheckedForSwitch != null &&
        item.id != this.equipmentEditCheckedForSwitch?.id &&
        this.equipmentEditCheckedForSwitchWith?.id == item.id
      );
    },
    toBeOutCmp(item) {
      return (
        this.equipmentEditCheckedForSwitch &&
        this.equipmentEditCheckedForSwitchWith &&
        item.id != this.equipmentEditCheckedForSwitch?.id &&
        this.equipmentEditCheckedForSwitchWith?.id == item.id
      );
    },
    toBeOutAndInCmp(item) {
      return (
        this.equipmentEditCheckedForSwitch &&
        this.equipmentEditCheckedForSwitchWith &&
        item.id == this.equipmentEditCheckedForSwitch?.id &&
        this.equipmentEditCheckedForSwitchWith?.id == item.id
      );
    },
    toBeOProposedInInCmp(item) {
      return (
        this.equipmentEditCheckedForSwitch &&
        this.equipmentEditCheckedForSwitchWith &&
        item.id == this.equipmentEditCheckedForSwitch?.id &&
        this.equipmentEditCheckedForSwitchWith?.id != item.id
      );
    },
    toBeOProposedOutOutCmp(item) {
      return (
        this.equipmentEditCheckedForSwitch &&
        this.equipmentEditCheckedForSwitchWith &&
        item.id != this.equipmentEditCheckedForSwitch?.id &&
        this.equipmentEditCheckedForSwitchWith?.id == item.id
      );
    },
    allReset() {
      this.allBothAddButton_switch = false;
      this.allBothAddButton_delete = false;
      this.allBothAddButton_add = false;
      this.allBothAddButton_hold = false;
      this.addDriversForSwitch = false;
      this.addDriversForSwitch_number = 0;
      this.addDriversForSwitchDriversIn = [];
      this.addDriversForSwitchDriversOut = [];
      this.allBothNextDrivers = false;
      this.allDriverNext = false;
    },
    openAddEquipment() {
      this.equipmentsNotInPlanningWithCheck = this.getEquipements.filter(
        (e) => {
          return (
            this.equipmentsInPlanningWithCheck.filter((c) => {
              return c.matricule == e.matricule;
            }).length == 0
          );
        }
      );
      this.equipmentsNotInPlanningWithCheck =
        this.equipmentsNotInPlanningWithCheck.map((e) => {
          e.checked = false;
          return e;
        });
      this.equipmentsInPlanningWithCheck_backup = [
        ...this.equipmentsInPlanningWithCheck,
      ];
      this.equipmentsNotInPlanningWithCheck_backup = [
        ...this.equipmentsNotInPlanningWithCheck,
      ];
    },
    backWhenSwitch() {
      this.addDriversForSwitchDriversOut = [];
      this.addDriversForSwitchDriversIn = [];
      this.allDriverNext = false;
    },
    clairChecked() {
      this.driversInPlanningWithCheck = this.driversInPlanningWithCheck.map(
        (e) => {
          e.checked = false;

          return e;
        }
      );
    },
    clairPair() {
      this.addDriversForSwitchDriversOut =
        this.addDriversForSwitchDriversOut.map((e) => {
          e.toSwitch = false;
          return e;
        });
      this.addDriversForSwitchDriversIn = this.addDriversForSwitchDriversIn.map(
        (e) => {
          e.toSwitch = false;
          return e;
        }
      );
    },
    switchPairIn(index) {
      this.addDriversForSwitchDriversIn = this.addDriversForSwitchDriversIn.map(
        (e) => {
          if (e.index != index) e.toSwitch = false;
          else e.toSwitch = !e.toSwitch;
          return e;
        }
      );
      if (this.addDriversForSwitchDriversIn[index].toSwitch)
        this.$refs["drivers_" + index][0]?.classList.add("switchPairSelected");
      else
        this.$refs["drivers_" + index][0]?.classList.remove(
          "switchPairSelected"
        );
      if (this.isPair) {
        let a = this.addDriversForSwitchDriversIn[this.isPairOut.index];
        this.addDriversForSwitchDriversIn[this.isPairOut.index] =
          this.addDriversForSwitchDriversIn[this.isPairIn.index];
        this.addDriversForSwitchDriversIn[this.isPairIn.index] = a;

        this.addDriversForSwitchDriversIn[this.isPairOut.index].index =
          this.isPairOut.index;
        this.addDriversForSwitchDriversIn[index].index = index;
        this.$refs["drivers_" + this.isPairOut.index][0]?.classList.add(
          "actionHolder2SwitchNextRowPair"
        );

        this.$refs["drivers_" + this.isPairIn.index][0]?.classList.remove(
          "switchPairSelected"
        );
        this.$refs["drivers_" + this.isPairOut.index][1]?.classList.remove(
          "switchPairSelected"
        );
        this.clairPair();
      } else {
      }
    },
    switchPairOut(index) {
      this.addDriversForSwitchDriversOut =
        this.addDriversForSwitchDriversOut.map((e) => {
          if (e.index != index) e.toSwitch = false;
          else e.toSwitch = !e.toSwitch;
          return e;
        });
      if (this.addDriversForSwitchDriversOut[index].toSwitch)
        this.$refs["drivers_" + index][1]?.classList.add("switchPairSelected");
      else
        this.$refs["drivers_" + index][1]?.classList.remove(
          "switchPairSelected"
        );
      if (this.isPair) {
        let a = this.addDriversForSwitchDriversOut[this.isPairIn.index];
        this.addDriversForSwitchDriversOut[this.isPairIn.index] =
          this.addDriversForSwitchDriversOut[this.isPairOut.index];
        this.addDriversForSwitchDriversOut[this.isPairOut.index] = a;

        this.addDriversForSwitchDriversOut[this.isPairIn.index].index =
          this.isPairIn.index;
        this.addDriversForSwitchDriversOut[index].index = index;
        this.$refs["drivers_" + this.isPairIn.index][1]?.classList.add(
          "actionHolder2SwitchNextRowPair"
        );

        this.$refs["drivers_" + this.isPairIn.index][1]?.classList.add(
          "actionHolder2SwitchNextRowPair"
        );

        this.$refs["drivers_" + this.isPairIn.index][0]?.classList.remove(
          "switchPairSelected"
        );
        this.$refs["drivers_" + this.isPairOut.index][1]?.classList.remove(
          "switchPairSelected"
        );
        this.clairPair();
      } else {
      }
    },
    hidePair(index) {
      for (let i = 0; i < this.$refs["drivers_" + index].length; i++) {
        this.$refs["drivers_" + index][i]?.classList.remove(
          "actionHolder2SwitchNextRowPair"
        );
      }
    },
    showPair(index) {
      if (this.isPairOutCount == 0)
        this.$refs["drivers_" + index][1]?.classList.add(
          "actionHolder2SwitchNextRowPair"
        );
      if (this.isPairInCount == 0)
        this.$refs["drivers_" + index][0]?.classList.add(
          "actionHolder2SwitchNextRowPair"
        );
    },
    returnDriverByIndex(list, index) {
      let rs = list.filter((e) => e.index == index);
      if (rs.length > 0) return rs[0];
      else return null;
    },
    returnDriverById(list, id) {
      let rs = list.filter((e) => e.id == id);
      if (rs.length > 0) return rs[0];
      else return null;
    },
    switchConfirm() {
      this.clairChecked();
      this.driversInPlanningWithCheck = this.driversInPlanningWithCheck.map(
        (e) => {
          let fromPlanning = this.returnDriverById(
            this.addDriversForSwitchDriversOut,
            e.id
          );
          if (fromPlanning) {
            e = this.returnDriverByIndex(
              this.addDriversForSwitchDriversIn,
              fromPlanning.index
            );
          }
          return e;
        }
      );

      this.addDriversForSwitchDriversOut = [];
      this.addDriversForSwitchDriversIn = [];
      this.allDriverNext = false;
      this.changeDriver = false;
      this.allBothAddButton_switch = false;
      this.switchDialog = false;
      this.commitedChange = true;
    },
    switchNextInterface() {
      for (
        let index = 0;
        index < this.allDriverFilteredCheckedAllShifts.length;
        index++
      ) {
        const elementIn = this.allDriverFilteredCheckedAllShifts[index];
        elementIn.index = index;
        elementIn.toSwitch = false;
        const elementOut = this.driversInPlanningWithChecked[index];
        elementOut.index = index;
        elementOut.toSwitch = false;
        this.addDriversForSwitchDriversIn.push(elementIn);
        this.addDriversForSwitchDriversOut.push(elementOut);
      }

      this.allDriverNext = true;
    },
    setSelectAllDrivers() {
      if (
        this.driversInPlanningWithCheck.length ==
        this.driversInPlanningWithChecked.length
      ) {
        this.driversInPlanningWithCheck = this.driversInPlanningWithCheck.map(
          (e) => {
            e.checked = false;
            return e;
          }
        );
      } else {
        this.driversInPlanningWithCheck = this.driversInPlanningWithCheck.map(
          (e) => {
            e.checked = true;
            return e;
          }
        );
      }
    },
    setSelectAll() {
      if (
        this.allDriverFiltered.length == this.allDriverFilteredChecked.length
      ) {
        this.allDrivers = this.allDrivers.map((e) => {
          if (e.shift_id == this.selectedAlldriversShift) e.checked = false;
          return e;
        });
      } else {
        this.allDrivers = this.allDrivers.map((e) => {
          if (e.shift_id == this.selectedAlldriversShift) e.checked = true;
          return e;
        });
      }
    },
    toggleEditMode() {
      console.log("bdina getActonHistory_index",this.getActonHistory_index);
      console.log("planningActionHistory",this.planningActionHistory);
      console.log("planningActionHistory_index",this.planningActionHistory_index);
      if (!this.editMode) {
        if(this.planningActionHistory.length==0){

        this.planningActionHistory_index=-1;
        this.planningActionHistory= [];
        let actionDetails = {
          actionType: "edit",
          getPlanningWithTheBoxes: {
            planning_boxes: [...this.getPlanningWithTheBoxes.planning_boxes],
            planning: this.getPlanningWithTheBoxes.planning,
          },
          getOutToBeInserted: [...JSON.parse(JSON.stringify(this.getOutToBeInserted))],
          planningWorkBoxChecked: this.planningWorkBoxChecked,
          planningWorkBoxChecked_ID: this.planningWorkBoxChecked_ID,
          planningWorkBoxChecked_With: this.planningWorkBoxChecked_With,
          planningWorkBoxChecked_ID_With: this.planningWorkBoxChecked_ID_With,
          planningWorkBoxChecked_Index: this.planningWorkBoxChecked_Index,
          planningWorkBoxChecked_LEFT_OUT_REMOVED_AT: this.planningWorkBoxChecked_LEFT_OUT_REMOVED_AT,
          planningWorkDriver_Checked: this.planningWorkDriver_Checked,
          planningWorkDriver_Checked_With: this.planningWorkDriver_Checked_With,
          planningWorkDriver_Checked_Index: this.planningWorkDriver_Checked_Index,
        }
        this.planningActionHistory.push(actionDetails);
        this.planningActionHistory_index++;
        let actionHsitoryObject={
          planningActionHistory:[...JSON.parse(JSON.stringify(this.planningActionHistory))],
          planningActionHistory_index:this.planningActionHistory_index
        }
        this.setActionHistory(actionHsitoryObject);
      }


        this.editMode = !this.editMode;
      }
      else {
        if(this.planningActionHistory.length>1){
          this.cancelOfChangesOfThePlanningShow=true;

        }
        else {
          this.editMode = !this.editMode;
          this.planningActionHistory_index=-1;
          this.planningActionHistory= [];
          this.setActionHistory({
            planningActionHistory_index:-1,
            planningActionHistory:[]
          });
        }
      }

    },
    openEditDriversEquipmentsDialog() {
      this.driverSelectionHeaderWithShift = [];
      this.equipmentSelectionHeader = [];
      this.equipmentsInPlanningWithCheck = [];
      this.driversInPlanningWithCheck = [];
      this.driverSelectionHeaderWithShift = [
        {
          text: "Mat",
          sortable: true,
          key: "Mat",
          align: "start",
          title: "Mat",
          value: "matricule",
        },
        {
          text: "Firstname",
          sortable: true,
          key: "Firstname",
          align: "start",
          title: "Firstname",
          value: "firstname",
        },
        {
          text: "Lastname",
          sortable: true,
          key: "Lastname",
          align: "start",
          title: "Lastname",
          value: "lastname",
        },
        {
          text: "Shift",
          sortable: true,
          key: "Shift",
          align: "start",
          title: "Shift",
          value: "shift_id",
        },
        {
          text: "WH",
          sortable: true,
          key: "WH",
          align: "start",
          title: "WH",
          value: "workingHours",
        },
      ];
      this.equipmentSelectionHeader = [
        {
          text: "Matricule",
          sortable: true,
          key: "Matricule",
          align: "start",
          title: "Matricule",
          value: "matricule",
        },
      ];
      if (this.showSelect) {
        this.driverSelectionHeaderWithShift.push({
          text: "Select",
          sortable: true,
          key: "Select",
          align: "start",
          title: "Select",
          value: "Select",
        });
        this.equipmentSelectionHeader.push({
          text: "Select",
          sortable: true,
          key: "Select",
          align: "start",
          title: "Select",
          value: "Select",
        });
      }
      this.driversInPlanningWithCheck = this.driversInThePlanning.map((e) => {
        e.checked = false;
        return e;
      });
      this.equipmentsInPlanningWithCheck = this.equipmentsInThePlanning().map(
        (e) => {
          e.checked = false;
          return e;
        }
      );
      for (let index = 0; index < this.getOutToBeInserted.length; index++) {
        for (let i = 0; i < this.getOutToBeInserted[index]?.list.length; i++) {
          const element = this.getOutToBeInserted[index].list[i];
          if (
            this.equipmentsInPlanningWithCheck.filter((p) => p.matricule == element.matricule)
              .length == 0
          )
            this.equipmentsInPlanningWithCheck.push(element);

        }
      }
      this.editDriversEquipmentsDialog = true;
      this.commitedChange = false;
    },
    openAddDriversForSwitch() {
      if (this.getDriversAll.length == 0) {
        this.setDriversActiveList_allAction({
          profile_group_id: 1,
          role_id: 2,
        }).then((e) => {
          this.allDrivers = this.getDriversAll.filter((e) => {
            return (
              this.driversInPlanningWithCheck.filter((l) => {
                return e.id == l.id;
              }).length == 0
            );
          });
          this.allDrivers = this.allDrivers.map((e) => {
            e.checked = false;
            e.checked2 = false;
            e.checked3 = false;
            return e;
          });
          this.addDriversForSwitch_number =
            this.driversInPlanningWithChecked.length;
          this.addDriversForSwitch = true;
          this.changeDriver = true;
        });
      } else {
        this.allDrivers = this.getDriversAll.filter((e) => {
          return (
            this.driversInPlanningWithCheck.filter((l) => {
              return e.id == l.id;
            }).length == 0
          );
        });
        this.allDrivers = this.allDrivers.map((e) => {
          e.checked = false;
          e.checked2 = false;
          e.checked3 = false;
          return e;
        });
        this.addDriversForSwitch_number =
          this.driversInPlanningWithChecked.length;
        this.addDriversForSwitch = true;
        this.changeDriver = true;
      }
    },
    openChangeDriverDialog() {
      this.allReset();
      if (this.getDriversAll.length == 0) {
        this.setDriversActiveList_allAction({
          profile_group_id: 1,
          role_id: 2,
        }).then((e) => {
          this.allDrivers = this.getDriversAll.filter((e) => {
            return (
              this.driversInPlanningWithCheck.filter((l) => {
                return e.id == l.id;
              }).length == 0
            );
          });
          this.allDrivers = this.allDrivers.map((e) => {
            e.checked = false;
            e.checked2 = false;
            e.checked3 = false;
            return e;
          });
          this.allEquipments = this.getEquipements;
          this.changeDriver = true;
        });
      } else {
        this.allDrivers = this.getDriversAll.filter((e) => {
          return (
            this.driversInPlanningWithCheck.filter((l) => {
              return e.id == l.id;
            }).length == 0
          );
        });
        this.allDrivers = this.allDrivers.map((e) => {
          e.checked = false;
          e.checked2 = false;
          e.checked3 = false;
          return e;
        });

        this.changeDriver = true;
      }
    },
    equipmentsInThePlanning() {
      let equipmentsInThePlanning = [];
      this.thisPlanningBoxes.map((e) => {
        e.slice(1).map((c) => {
          if (c != "P" && c != "DP") {
            if (
              equipmentsInThePlanning.filter((p) => p.matricule == c.matricule)
                .length == 0
            )
              equipmentsInThePlanning.push(c);
          }
        });
      });

      return equipmentsInThePlanning;
    },
    openCancelMDialog() {
      this.cancelDialog = true;
    },
    openSaveCONFIRMDialog() {
      this.confirmDialog = true;
    },
    openDeleteDialog() {
      this.deleteDialog = true;
    },
    openSwitchMDialog() {
      this.switchDialog = true;
    },
    openequipmentBackDialog() {
      this.equipmentSwitch_back_Dialog = true;
    },
    openequipmentDeleteDialog() {
      this.equipmentSwitch_delete_Dialog = true;
    },
    openequipmentSwitchDialog() {
      this.equipmentSwitchDialog = true;
    },
    openAddDialog() {
      this.addDialog = true;
    },
    openSaveDialog() {
      this.saveDialogShow = true;
    },
    savePlanning() {
      let planning_header = this.headers
        .slice(2)
        .map((e) => e.title)
        .join(".");
      this.CreatePlanningWitchTheBoxes({
        planning: this.selectedPlanning,
        planning_boxes: this.getPlanningWithTheBoxes.planning_boxes,
        planning_header: planning_header,
      }).then((response) => {
        this.saveDialogShow = false;
        this.setJustCreated(true);
        this.confirmDialog = false;
        this.$emit(
          "showNotificationClassSuccess",
          "The planning has been created successfully"
        );
      });
    },
    updatePlanning() {
      let planning_header = this.headers
        .slice(2)
        .map((e) => e.title)
        .join(".");
      this.UpdatePlanningAndBoxes({
        planning: this.selectedPlanning,
        planning_boxes: this.getPlanningWithTheBoxes.planning_boxes,
        planning_header: planning_header,
      }).then((response) => {
        this.saveDialogShow = false;
        this.setJustCreated(true);
        this.confirmDialog = false;
        this.updateShowDialog=false;
        this.updateShowMode=false;
        this.justEdited=false;
        this.planningActionHistory_index=-1;
        this.planningActionHistory= [];
        this.setActionHistory({
          planningActionHistory_index:-1,
          planningActionHistory:[]
        });


        this.$emit(
          "showNotificationClassSuccess",
          "The planning has been updated successfully"
        );
      });
    },
    backToCreate() {
      this.setJustCreated(false);
      this.clearBoxes();
    },
    existedIn(index) {
      if (index == 1 && this.selectedDriversExistedInA.length > 0) return true;
      else if (index == 2 && this.selectedDriversExistedInB.length > 0)
        return true;
      else if (index == 3 && this.selectedDriversExistedInC.length > 0)
        return true;
      else if (index == 4 && this.selectedDriversExistedInD.length > 0)
        return true;
      else return false;
    },
    confirmAddDrivers() {
      let all = [...this.allDrivers.filter((e) => e.checked)];
      all = all.map((e) => {
        e.checked = false;
        e.checked2 = true;
        e.checked3 = false;
        return e;
      });
      for (let index = 0; index < all.length; index++) {
        const element = all[index];
        this.driversInPlanningWithCheck.push(element);
      }

      this.changeDriver = false;
      this.allDriverNext = false;
      this.addDriversForSwitch = false;
      this.addDialog = false;
      this.commitedChange = true;
    },
    confirmAddDriverswithPauses_not_yet_used() {
      for (
        let index = 0;
        index < this.allDriverFilteredCheckedAllShifts.length;
        index++
      ) {
        const element = this.allDriverFilteredCheckedAllShifts[index];
        this.thisPlanningBoxes.push([
          element,
          ...Array(this.headers.length - 2).fill("P"),
        ]);
      }
      this.changeDriver = false;
      this.allDriverNext = false;
    },
    getShiftByIndex(index) {
      if (index == 1) return "A";
      if (index == 2) return "B";
      if (index == 3) return "C";
      if (index == 4) return "D";
    },
    closePlanning() {
      this.clearPlanning_new();
      this.setJustCreated(false);
      this.setOutToBeInserted([]);
      this.ThisOutToBeInserted=[];
      this.OutToBeInserted=[];
      this.justEdited=false;
        this.planningActionHistory_index=-1;
        this.planningActionHistory= [];
        this.setActionHistory({
          planningActionHistory_index:-1,
          planningActionHistory:[]
        });

    },
    regenerateThePlanning() {
      console.log(
        "regenerate thie plannig :",
        this.$emit(
          "CustomRtgPlanning",
          false,
          this.driversInThePlanning,
          this.equipmentsInThePlanning
        )
      );
    },
    cancelDriversInPlanningWithCheck() {
      this.editDriversEquipmentsDialog = false;
      this.allBothAddButton_hold = false;
      this.allBothAddButton_add = false;
      this.allBothAddButton_delete = false;
      this.allBothAddButton_switch = false;
    },
    deletFromDriversInPlanningWithChecked() {
      this.driversInPlanningWithCheck = this.driversInPlanningWithCheck.filter(
        (e) => !e.checked
      );
      this.allBothAddButton_delete = false;
      this.deleteDialog = false;
      this.commitedChange = true;

    },
    setCheckedIfSwitchOrAdd(item) {
      if (this.addDriversForSwitch) {
        if (!item.checked) {
          if (
            this.allDriverFilteredCheckedAllShifts.length <
            this.addDriversForSwitch_number
          ) {
            return true;
          }
        }
        return false;
      } else {
        return !item.checked;
      }
    },
  },
  created() {
    // Add your created hook code here
  },
  mounted() {
    this.headers = [];
    this.thisPlanningBoxes = [
      ...this.getPlanningWithTheBoxes.planning_boxes.slice(1).map((e) => {
        e = e.map((l) => {
          if (l != 'P' && l != 'DP') {
            l.checkedInBiggPlanning = false;
          }
          return l;
        })
        e.workingHours = e[0].workingHours;

        return e;
      }),
    ];
    this.headers.push({
      text: (this.getPlanningWithTheBoxes.planning_boxes[0][0].title)?this.getPlanningWithTheBoxes.planning_boxes[0][0].title:this.getPlanningWithTheBoxes.planning_boxes[0][0],
      sortable: false,
      key: "driver",
      align: "start",
      title: (this.getPlanningWithTheBoxes.planning_boxes[0][0].title)?this.getPlanningWithTheBoxes.planning_boxes[0][0].title:this.getPlanningWithTheBoxes.planning_boxes[0][0],
    });
    this.headers.push({
      text: "WH",
      sortable: true,
      key: "driver",
      align: "start",
      title: "WH",
      value: "workingHours",
    });
    for (
      let index = 1;
      index < this.getPlanningWithTheBoxes.planning_boxes[0].length;
      index++
    ) {
      this.headers.push({
        text: this.getPlanningWithTheBoxes.planning_boxes[0][index].title,
        sortable: false,
        key:
          index + this.getPlanningWithTheBoxes.planning_boxes[0][index].title,
        align: "start",
        title: this.getPlanningWithTheBoxes.planning_boxes[0][index].title,
      });
    }
    if (this.getOutToBeInserted.length > 0) {
      this.OutToBeInserted = this.getOutToBeInserted;
    }
    else {
      this.OutToBeInserted = [];
      this.ThisOutToBeInserted = [];
      this.getPlanningWithTheBoxes.planning_boxes[0].slice(1).map((e) => {
        this.OutToBeInserted.push({
          list: [],
          checked: false,
        });
      });
    }
    this.getPlanningWithTheBoxes.planning_boxes[0].slice(1).map((e) => {
      this.ThisOutToBeInserted.push({
        list: [],
        checked: false,
      });
    });
    this.selectedAlldriversShift = this.actualShift.id;
    this.planningActionHistory=[...JSON.parse(JSON.stringify(this.getActonHistory))];
    this.planningActionHistory_index=this.getActonHistory_index;
    if(this.planningActionHistory.length>0){
      this.editMode=true;
    }
  },
  watch: {
    showSelect(oldVal, newVal) {
      if (newVal) {
        this.driverSelectionHeaderWithShift = [];
        this.equipmentSelectionHeader = [];
        this.driverSelectionHeaderWithShift = [
          {
            text: "Mat",
            sortable: true,
            key: "Mat",
            align: "start",
            title: "Mat",
            value: "matricule",
          },
          {
            text: "Firstname",
            sortable: true,
            key: "Firstname",
            align: "start",
            title: "Firstname",
            value: "firstname",
          },
          {
            text: "Lastname",
            sortable: true,
            key: "Lastname",
            align: "start",
            title: "Lastname",
            value: "lastname",
          },
          {
            text: "Shift",
            sortable: true,
            key: "Shift",
            align: "start",
            title: "Shift",
            value: "shift_id",
          },
          {
            text: "WH",
            sortable: true,
            key: "WH",
            align: "start",
            title: "WH",
            value: "workingHours",
          },
        ];
        this.equipmentSelectionHeader = [
          {
            text: "Matricule",
            sortable: true,
            key: "Matricule",
            align: "start",
            title: "Matricule",
            value: "matricule",
          },
        ];
        this.driversInPlanningWithCheck = this.driversInPlanningWithCheck.map(
          (e) => {
            e.checked = false;
            return e;
          }
        );
        this.equipmentsInPlanningWithCheck =
          this.equipmentsInPlanningWithCheck.map((e) => {
            e.checked = false;
            return e;
          });
      } else {
        this.driverSelectionHeaderWithShift = [];
        this.equipmentSelectionHeader = [];
        this.driverSelectionHeaderWithShift = [
          {
            text: "Mat",
            sortable: true,
            key: "Mat",
            align: "start",
            title: "Mat",
            value: "matricule",
          },
          {
            text: "Firstname",
            sortable: true,
            key: "Firstname",
            align: "start",
            title: "Firstname",
            value: "firstname",
          },
          {
            text: "Lastname",
            sortable: true,
            key: "Lastname",
            align: "start",
            title: "Lastname",
            value: "lastname",
          },
          {
            text: "Shift",
            sortable: true,
            key: "Shift",
            align: "start",
            title: "Shift",
            value: "shift_id",
          },
          {
            text: "WH",
            sortable: true,
            key: "WH",
            align: "start",
            title: "WH",
            value: "workingHours",
          },
          {
            text: "Select",
            sortable: true,
            key: "Select",
            align: "start",
            title: "Select",
            value: "Select",
          },
        ];
        this.equipmentSelectionHeader = [
          {
            text: "Matricule",
            sortable: true,
            key: "Matricule",
            align: "start",
            title: "Matricule",
            value: "matricule",
          },
          {
            text: "Select",
            sortable: true,
            key: "Select",
            align: "start",
            title: "Select",
            value: "Select",
          },
        ];
      }
    },
  },

};
</script>

<style scoped lang="scss">
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
  height: 200px;
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

.saveButton3 {
  background-color: #dddddd75;
  color: #000000a1;
  width: 168px;
  float: right;
  position: absolute;
  right: 183px;
  top: 4px;
  font-size: 18px;
}

.saveButton2 {
  background-color: #4f7cac;
  color: white;
  width: 168px;
  margin-left: 10px;
  font-size: 18px;
}

.cancelButton {
  background-color: white;
  color: black;
  width: 168px;

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

.dialogHeader {
  color: white;
  background-color: #283845;
  font-family: sans-serif;
  font-size: 13px;
  user-select: none;
  position: relative;
  display: inline-block;
  width: 100%;
  font-weight: bold;
  height: 100%;
}

.confirmDialogInterface {
  background-color: #283845;
  color: white;
}

.buttonsHolder {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;

  .button {
    width: 150px;
    height: 33%;

    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;

    span {
      display: inline-block;
      height: 100%;
      width: 60px;
      color: white;
      font-family: sans-serif;
      font-size: 13px;
      text-align: center;
      user-select: none;
      position: relative;
      font-weight: bold;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .buttonIcon {
      border: 1px solid rgba(255, 255, 255, 0.521);
      height: 75%;
      width: 60px;
      float: right;
      border-radius: 0 25px 25px 25px;
      margin-top: 4px;
    }

    .buttonText {
      padding-top: 6px;
    }

    .buttonIcon1::after {
      content: "\F0157";
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

    .buttonIcon2::after {
      content: "\F0226";
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

    .buttonIcon3::after {
      content: "\F01B4";
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

    span:first-child {
      opacity: 0.5;
      transition: all 0.4s ease;
    }

    &:hover {
      background-color: #0353a4;
      padding-top: 2px;

      .buttonIcon1::after {
        content: "\F0C5D";
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

      .buttonIcon3::after {
        content: "\F06CC";
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

      span:first-child,
      span:last-child {
        opacity: 1;
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
        box-shadow: none;
        width: 80px;
        background-color: #0353a4;
      }

      span:first-child {
        border-left: 1px solid white;
        border-bottom: 1px solid white;
        border-radius: 0 74px 0 25px;
        margin-left: -40px;
        padding-left: 8px;
        height: 31px;
      }

      span:last-child {
        border-left: none;
        border-bottom: 1px none;
        margin-top: 1px;
        font-size: 20px;
        padding-top: 10px;
      }
    }
  }

  .button:active {
    opacity: 0.3;
  }
}

.buttonsHolder2 {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;

  .button {
    width: 150px;
    height: 33%;

    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;

    span {
      display: inline-block;
      height: 100%;
      width: 60px;
      color: white;
      font-family: sans-serif;
      font-size: 13px;
      text-align: center;
      user-select: none;
      position: relative;
      font-weight: bold;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .buttonIcon {
      border: 1px solid rgba(255, 255, 255, 0.521);
      height: 75%;
      width: 60px;
      float: left;
      border-radius: 25px 0 25px 25px;
      margin-top: 4px;
      text-align: left;
    }

    .buttonText {
      padding-top: 6px;
    }

    .buttonIcon1::after {
      content: "\F090C";
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

    .buttonIcon2::after {
      content: "\F10E6";
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

    .buttonIcon3::after {
      content: "\F1862";
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

    span:first-child {
      opacity: 0.5;
      transition: all 0.4s ease;
    }

    &:hover {
      background-color: #0353a4;
      padding-top: 2px;

      .buttonIcon1::after {
        content: "\F03EB";
        /* mdi-left-arrow icon */
        font-family: "Material Design Icons";
        /* Ensure this matches your mdi font family */
        position: absolute;
        left: 18px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
        /* Adjust size as necessary */
        font-weight: 100 !important;
      }

      .buttonIcon2::after {
        content: "\F1A3F";
        /* mdi-left-arrow icon */
        font-family: "Material Design Icons";
        /* Ensure this matches your mdi font family */
        position: absolute;
        left: 18px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
        /* Adjust size as necessary */
        font-weight: 100 !important;
      }

      .buttonIcon3::after {
        content: "\F1861";
        /* mdi-left-arrow icon */
        font-family: "Material Design Icons";
        /* Ensure this matches your mdi font family */
        position: absolute;
        left: 18px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
        /* Adjust size as necessary */
        font-weight: 100 !important;
      }

      span:first-child,
      span:last-child {
        opacity: 1;
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
        box-shadow: none;
        background-color: #0353a4;
        width: 80px;
      }

      span:first-child {
        border-right: 1px solid white;
        border-bottom: 1px solid white;
        border-radius: 74px 0 25px 0;
        margin-right: -40px;
        padding-right: 8px;
        height: 31px;
      }

      span:last-child {
        border-right: none;
        border-bottom: 1px none;
        margin-top: 1px;
        font-size: 20px;
        padding-top: 10px;
      }
    }
  }

  .button:active {
    opacity: 0.3;
  }
}

.buttonOn2 {
  width: 234px !important;
  background-color: #758694 !important;
  padding-top: 2px !important;

  .buttonIcon1::after {
    content: "\F0193" !important;
    /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important;
    /* Ensure this matches your mdi font family */
    position: absolute !important;
    right: 18px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 20px !important;
    /* Adjust size as necessary */
    font-weight: 100 !important;
  }

  .buttonIcon3::after {
    content: "\F06CC" !important;
    /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important;
    /* Ensure this matches your mdi font family */
    position: absolute !important;
    right: 18px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 20px !important;
    /* Adjust size as necessary */
    font-weight: 100 !important;
  }

  span:first-child,
  span:last-child {
    opacity: 1 !important;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2) !important;
    transform: translateY(-2px) !important;
    box-shadow: none !important;
    width: 121px !important;
    background-color: #758694 !important;
  }

  span:first-child {
    border-left: 1px solid white !important;
    border-bottom: 1px solid white !important;
    border-radius: 0 74px 0 25px !important;
    margin-left: -40px !important;
    padding-left: 8px !important;
    height: 31px !important;
    letter-spacing: 10px;
  }

  span:last-child {
    border-left: none !important;
    border-bottom: 1px none !important;
    margin-top: 1px !important;
    font-size: 20px !important;
    padding-top: 10px !important;
  }
}

.buttonOn {
  width: 234px !important;
  background-color: #ff6969 !important;
  padding-top: 2px !important;

  * {}

  .buttonIcon1::after {
    content: "\F0156" !important;
    /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important;
    /* Ensure this matches your mdi font family */
    position: absolute !important;
    left: 18px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 20px !important;
    /* Adjust size as necessary */
    font-weight: 100 !important;
  }

  .buttonIcon2::after {
    content: "\F1A3F" !important;
    /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important;
    /* Ensure this matches your mdi font family */
    position: absolute !important;
    left: 18px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 20px !important;
    /* Adjust size as necessary */
    font-weight: 100 !important;
  }

  .buttonIcon3::after {
    content: "\F1861" !important;
    /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important;
    /* Ensure this matches your mdi font family */
    position: absolute !important;
    left: 18px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 20px !important;
    /* Adjust size as necessary */
    font-weight: 100 !important;
  }

  span:first-child,
  span:last-child {
    opacity: 1 !important;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2) !important;
    transform: translateY(-2px) !important;
    box-shadow: none !important;
    background-color: #ff6969 !important;
    width: 121px !important;
  }

  span:first-child {
    border-right: 1px solid white !important;
    border-bottom: 1px solid white !important;
    border-radius: 74px 0 25px 0 !important;
    margin-right: -40px !important;
    padding-right: 8px !important;
    height: 31px !important;
    letter-spacing: 10px;
  }

  span:last-child {
    border-right: none !important;
    border-bottom: 1px none !important;
    margin-top: 1px !important;
    font-size: 20px !important;
    padding-top: 10px !important;
  }
}

.displayNone {
  display: none;
}

.clickableCase:not(.otherShiftBox) {
  span {
    border-left: 1px solid white !important;
    border-right: 1px solid white !important;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }



  span:not(.workingHours):not(.otherShift):not(.selectEquipButtonSelected):hover {
    opacity: 0.8;
    transform: translateY(-5%);
  }

  span:not(.workingHours):not(.otherShift):active {
    opacity: 0.5;
    transform: translateY(-12%);
  }

  .workingHours {
    cursor: no-drop;
  }
}

.addDriverButtonClickableCase {
  transition: all 0.3s ease;

  .addDriverButton {
    border-left: 1px solid white !important;
    border-right: 1px solid white !important;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(196, 175, 175, 0.1);
  }

  .addDriverButton:not(.workingHours):not(.selectEquipButtonSelected):hover {
    opacity: 0.8;
    transform: translateY(-5%);
  }

  .addDriverButton:not(.workingHours):not(.selectEquipButtonSelected):active {
    opacity: 0.5;
    transform: translateY(-12%);
  }

  .selectEquipButton {
    border-left: 1px solid white !important;
    border-right: 1px solid white !important;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(196, 175, 175, 0.1);
  }

  .selectEquipButton:not(.workingHours):not(.selectEquipButtonSelected):hover {
    opacity: 0.8;
    transform: translateY(-5%);
  }

  .selectEquipButton:not(.workingHours):not(.selectEquipButtonSelected):active {
    opacity: 0.5;
    transform: translateY(-12%);
  }
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

//.addDriverButton::after {
//  content: "\F0800" !important; /* mdi-left-arrow icon */
//  font-family: "Material Design Icons" !important; /* Ensure this matches your mdi font family */
//  position: absolute !important;
//  right: 5% !important;
//  top: 50% !important;
//  transform: translateY(-50%) !important;
//  font-size: 15px !important; /* Adjust size as necessary */
//  font-weight: 100 !important;
//}

.selectEquipButton {
  display: inline-block;
  width: 100%;
  text-align: center;
  padding-top: 19px;
  background-color: #003049 !important;
  font-size: 14px !important;
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
  font-size: 15px !important;
  /* Adjust size as necessary */
  font-weight: 100 !important;
}

.radioButtonText {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  .thisSpan {
    padding-top: 8px;
    margin-right: 42px;
  }

  i {
    color: #1867c0 !important;
  }
}

.tabelHeader {
  background-color: #3e92cc;
  text-align: center;

  span {
    display: inline-block;

    width: 90%;
  }
}

.actionHolder {
  span {
    border-left: 1px solid white !important;
    border-right: 1px solid white !important;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .checkedAction::after {
    content: "\F05E1" !important;
    /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important;
    /* Ensure this matches your mdi font family */
    position: absolute !important;
    right: 39% !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 42px !important;
    font-weight: 100 !important;
    color: #ffffff;
  }

  .uncheckedAction::after {
    content: "\F043D" !important;
    /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important;
    /* Ensure this matches your mdi font family */
    position: absolute !important;
    right: 39% !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 42px !important;
    font-weight: 100 !important;
    color: #6493cb;
  }
}

.actionHolder:hover {
  opacity: 0.8;
  transform: translateY(-2px);
}

.actionHolder:active {
  opacity: 0.5;
  transform: translateY(-2px);
}

.action {
  margin-top: 6px;
}

.selectDriversToSwitchWithExisting {
  span {
    border-left: 1px solid white !important;
    border-right: 1px solid white !important;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .checkedAction::after {
    content: "\F05E1" !important;
    /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important;
    /* Ensure this matches your mdi font family */
    position: absolute !important;
    right: 39% !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 42px !important;
    font-weight: 100 !important;
    color: #ffffff;
  }

  .uncheckedAction::after {
    content: "\F043D" !important;
    /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important;
    /* Ensure this matches your mdi font family */
    position: absolute !important;
    right: 39% !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 42px !important;
    font-weight: 100 !important;
    color: #6493cb;
  }
}

.selectDriversToSwitchWithExisting:hover {
  opacity: 0.8;
  transform: translateY(-2px);
}

.selectDriversToSwitchWithExisting:active {
  opacity: 0.5;
  transform: translateY(-2px);
}

.action {
  margin-top: 6px;
}

.checkedDriverText {
  color: #fff;
  text-shadow: 0px 0px 12px #f5f5f5;
  color: rgba(241, 241, 241, 0.9803921569);
  background-color: #003f8a;
}

.checkedAction {
  background-color: #003f8a;
}

.selectAll {
  float: right;
  cursor: pointer;
  user-select: none;
  display: inline-block;
  width: 137px;
  height: 30px;
  text-align: center;
  border: 1px solid #6493cb;
  margin-top: -8px;
  padding-top: 2px;
  border-radius: 14px;
  color: #6493cb;
  font-weight: bolder;
}

.selectAll:hover {
  float: right;
  color: #fff;
  text-shadow: 0px 0px 12px #f5f5f5;
  color: rgba(241, 241, 241, 0.9803921569);
}

.selectAll:active {
  opacity: 0.5;
}

.selectAllChecked {
  background-color: #6493cb;
  color: white;
}

.total {
  user-select: none;
  display: inline-block;
  color: rgba(249, 249, 249, 0.4117647059);
  font-size: 20px;
  padding-left: 27px;
  margin-top: -55px;
}

.itsTheTotal {
  color: white;
  font-weight: bolder;
}

.nextButton_all,
.backButton_all {
  transition: all 0.5ms ease;
}

.nextButton_all {
  background-color: #4f7cac;
  color: white;
  width: 168px;
  font-size: 18px;
  transition: all 0.5ms ease;
}

.nextButton_all:hover {
  background-color: #4f7caca2;
}

.backButton_all {
  background-color: #ddddddc0;
  color: #000000a1;
  width: 168px;
  font-size: 18px;
}

.backButton_all:hover {
  background-color: #ddddddf7;
}

.selectedDriversNext_all {
  font-size: 25px;
  width: fit-content;
  border-bottom: 1px solid white;
  margin-bottom: 30px;
  font-weight: bolder;
}

.hrNext_all {
  margin-bottom: 30px;
}

.fromSHiftNext_all {
  font-size: 25px;
  width: fit-content;
  border-bottom: 1px solid white;
  margin-bottom: 30px;
}

.otherShiftBox {}

.otherShift {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 17px;
  background-color: #0074fd !important;
  padding-left: 4px;
  padding-right: 12px;
  border-radius: 0 0 22px 0;
  width: 33px;
}

.confirmIconText {
  color: #4f7cac;
}

.actionHolder2:hover {
  span {
    background-color: rgba(255, 0, 0, 0.384) !important;
  }

  .action::after {
    content: "\F0156" !important;
    /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important;
    /* Ensure this matches your mdi font family */
    position: absolute !important;
    right: 39% !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 38px !important;
    font-weight: 100 !important;
  }
}

.actionHolderDelete {
  span {
    background-color: rgba(255, 0, 0, 0.384) !important;
  }

  .action::after {
    content: "\F0156" !important;
    /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important;
    /* Ensure this matches your mdi font family */
    position: absolute !important;
    right: 39% !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 38px !important;
    font-weight: 100 !important;
  }
}

.actionHolderSwitch {
  span {
    background-color: rgb(53, 113, 38) !important;
  }

  .action::after {
    content: "\F04E1" !important;
    /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important;
    /* Ensure this matches your mdi font family */
    position: absolute !important;
    right: 39% !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 38px !important;
    font-weight: 100 !important;
  }
}

.confirmDialogInterfaceHeader {
  .children {
    flex: none;
    font-size: 22px;
    font-weight: 500;
    hyphens: auto;
    letter-spacing: 0.0125em;
    min-width: 0;
    overflow-wrap: normal;
    overflow: hidden;
    padding: 0.5rem 1rem;
    text-overflow: ellipsis;
    text-transform: none;
    white-space: nowrap;
    word-break: normal;
    word-wrap: break-word;
    padding: 23px 0 15px 26px;
    margin-bottom: 18px;
    border: 1px solid white;
    box-shadow: -2px -2px 3px 1px #ffffff3b;
    cursor: pointer;

    .thisIcon {
      font-size: 30px;
      margin-right: 7px;
      padding-bottom: 7px;
    }
  }
}

.children:hover {
  text-shadow: 0px 0px 12px #f5f5f5;
}

.selectedChangeEDSow {
  border-bottom: none !important;
  box-shadow: none;
}

.allBothAddButton {
  display: inline-block;
  width: 100%;
  position: relative;
  font-size: 19px;
  transition: all 0.3s ease;
  cursor: pointer;
  user-select: none;
}

.addD:hover {
  color: #00a6fb;
  text-shadow: 0px 0px 1px #f5f5f5;
  transform: translateY(-5%);

  hr {
    border-color: #00a6fb;
  }
}

.addD:active {
  transform: translateY(10%);
  opacity: 0.4;
}

.addD::after {
  content: "\F0415" !important;
  font-family: "Material Design Icons" !important;
  position: absolute !important;
  right: 1% !important;
  top: 41% !important;
  transform: translateY(-50%) !important;
  font-size: 38px !important;
  font-weight: 100 !important;
}

.addDChecked {
  color: #00a6fb;
  text-shadow: 0px 0px 1px #f5f5f5;
  transform: translateY(-5%);

  hr {
    border-color: #00a6fb;
  }
}

.deleteDChecked {
  color: #dc2f02;
  text-shadow: 0px 0px 1px #f5f5f5;
  transform: translateY(-5%);

  hr {
    border-color: #dc2f02;
  }
}

.deleteD:hover {
  color: #dc2f02;
  text-shadow: 0px 0px 1px #f5f5f5;
  transform: translateY(-5%);

  hr {
    border-color: #dc2f02;
  }
}

.deleteD:active {
  transform: translateY(10%);
  opacity: 0.4;
}

.deleteD::after {
  content: "\F0BE5" !important;
  font-family: "Material Design Icons" !important;
  position: absolute !important;
  right: 1% !important;
  top: 41% !important;
  transform: translateY(-50%) !important;
  font-size: 38px !important;
  font-weight: 100 !important;
}

.holdDChecked {
  color: #9a99f2;
  text-shadow: 0px 0px 1px #f5f5f5;
  transform: translateY(-5%);

  hr {
    border-color: #9a99f2;
  }
}

.holdD:hover {
  color: #9a99f2;
  text-shadow: 0px 0px 1px #f5f5f5;
  transform: translateY(-5%);

  hr {
    border-color: #9a99f2;
  }
}

.holdD:active {
  transform: translateY(10%);
  opacity: 0.4;
}

.holdD::after {
  content: "\F0349" !important;
  font-family: "Material Design Icons" !important;
  position: absolute !important;
  right: 1% !important;
  top: 41% !important;
  transform: translateY(-50%) !important;
  font-size: 38px !important;
  font-weight: 100 !important;
}

.switchDChecked {
  color: #7ddf64;
  text-shadow: 0px 0px 1px #f5f5f5;
  transform: translateY(-5%);

  hr {
    border-color: #7ddf64;
  }
}

.switchD:hover {
  color: #7ddf64;
  text-shadow: 0px 0px 1px #f5f5f5;
  transform: translateY(-5%);

  hr {
    border-color: #7ddf64;
  }
}

.switchD:active {
  transform: translateY(10%);
  opacity: 0.4;
}

.switchD::after {
  content: "\F04E1" !important;
  font-family: "Material Design Icons" !important;
  position: absolute !important;
  right: 1% !important;
  top: 41% !important;
  transform: translateY(-50%) !important;
  font-size: 38px !important;
  font-weight: 100 !important;
}

.selectAllD {
  display: inline-block;

  position: relative;
  font-size: 19px;
  transition: all 0.3s ease;
  cursor: pointer;
  user-select: none;

  div {
    width: 200px;
    float: right;
  }

  div::after {
    content: "\F0B58" !important;
    font-family: "Material Design Icons" !important;
    position: absolute !important;
    right: 1% !important;
    top: 41% !important;
    transform: translateY(-50%) !important;
    font-size: 38px !important;
    font-weight: 100 !important;
  }
}

.selectAllDChecked {
  color: #4cc9f0;
  text-shadow: 0px 0px 1px #f5f5f5;
  transform: translateY(-5%);

  hr {
    border-color: #4cc9f0;
  }

  div::after {
    content: "\F0849" !important;
    font-family: "Material Design Icons" !important;
    position: absolute !important;
    right: 1% !important;
    top: 41% !important;
    transform: translateY(-50%) !important;
    font-size: 38px !important;
    font-weight: 100 !important;
  }
}

.selectAllD:hover {
  transform: translateY(-5%);
}

.selectAllD:active {
  transform: translateY(10%);
  opacity: 0.4;
}

.cancelX {}

.cancelX:hover {}

.cancelX:after {
  content: "\F0156" !important;
  font-family: "Material Design Icons" !important;
  position: absolute !important;
  right: 1% !important;
  top: 41% !important;
  transform: translateY(-50%) !important;
  font-size: 38px !important;
  font-weight: 100 !important;
}

.notFromThisShift {
  span {
    background-color: #5d7bd5;
  }
}

.actionHolder2SwitchNextOutTable {
  span {
    background-color: #b54545 !important;
  }
}

.actionHolder2SwitchNextInTable,
.actionHolder2SwitchNextOutTable {
  span {
    background-color: #002855 !important;
    opacity: 1 !important;
    text-shadow: none;
  }
}

.actionHolder2SwitchNextInTable:hover,
.actionHolder2SwitchNextOutTable:hover {
  .action::after {
    content: "\F04E1" !important;
    /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important;
    /* Ensure this matches your mdi font family */
    position: absolute !important;
    right: 39% !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 38px !important;
    font-weight: 100 !important;
  }
}

.actionHolder2SwitchNextOutTable:hover,
.actionHolder2SwitchNextInTable:hover {
  span {
    background-color: none !important;
  }
}

.actionHolder2SwitchNextOutTable.actionHolder2SwitchNextRowPair {
  span {
    background-color: #b54545 !important;
  }
}

.actionHolder2SwitchNextInTable.actionHolder2SwitchNextRowPair {
  span {
    background-color: rgb(53, 113, 38) !important;
  }
}

.actionHolder2SwitchNextOutTable .switchPairSelected {
  background-color: #b54545 !important;
}

.actionHolder2SwitchNextInTable .switchPairSelected {
  background-color: rgb(53, 113, 38) !important;
}

.equipmentEdit {
  max-height: 45vh !important;
  min-height: 45vh !important;
  margin-bottom: 27px !important;
  background-color: #0414294a;

  .fullname:not(.checkForSwitchThis):not(.checkForSwitchWith) {
    border-right: 2px solid #0c243f;
    border-bottom: 2px solid #0c243f;
    padding-top: 34px !important;
    font-size: 24px;
    height: 100px !important;
  }

  .actionHolder span {
    border: 1px solid #ffffff33 !important;
  }

  .actionHolder span:hover {
    border: 1px solid white !important;
  }

  .actionHolder span:hover {
    border: 1px solid white !important;
  }

  .actionHolder span:active {
    transform: translateY(-10%);
  }
}

.toAddOrSwitchEqp {
  max-height: 40vh !important;
  min-height: 17vh !important;
  margin-bottom: 0 !important;

  .fullname {
    border-right: 2px solid #0c243f;
    border-bottom: 2px solid #0c243f;
    padding-top: 34px !important;
    font-size: 24px;
    height: 100px !important;
  }

  .actionHolder span {
    border: 1px solid #ffffff33 !important;
  }

  .actionHolder span:hover {
    border: 1px solid white !important;
  }

  .actionHolder span:hover {
    border: 1px solid white !important;
  }

  .actionHolder span:active {
    transform: translateY(-10%);
  }
}

.downSpan,
.switchSpan {
  display: inline-block;
  width: 100%;
  height: 80px;
  position: relative;
}

.downSpan:after {
  content: "\F0BCE" !important;
  font-family: "Material Design Icons" !important;
  position: absolute !important;
  right: 50% !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  font-size: 56px !important;
  font-weight: 100 !important;
}

.switchSpan:after {
  content: "\F04E1" !important;
  font-family: "Material Design Icons" !important;
  position: absolute !important;
  right: 50% !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  font-size: 56px !important;
  font-weight: 100 !important;
}

.equipmentEditMaster {
  .speadForEdit {
    margin: 0px auto !important;
    min-width: 90%;
  }

  .switchEquipment,
  .cancelEquipment {
    width: 82% !important;
    display: inline-block;
    position: relative;
    font-size: 19px;
    transition: all 0.3s ease;
    user-select: none;
    opacity: 0.3 !important;
  }

  .switchEquipment.selectebale,
  .cancelEquipment.selectebale {
    cursor: pointer;
    opacity: 1 !important;
  }

  .cancelEquipment {
    color: #ffffff !important;

    hr {
      border-color: #ffffff4f !important;
    }
  }

  .switchEquipment {
    svg {
      float: right;
    }

    color: white;

    hr {
      border-color: white;
    }
  }

  .switchEquipment.selectebale:hover {
    color: #00a6fb;
    text-shadow: 0px 0px 1px #f5f5f5;
    transform: translateY(-5%);

    hr {
      border-color: #00a6fb;
    }
  }

  .switchEquipment.selectebale:active {
    transform: translateY(10%);
    opacity: 0.4;
  }

  .cancelEquipment.selectebale:hover {
    color: white;
    text-shadow: 0px 0px 1px #f5f5f5;
    transform: translateY(-5%);

    hr {
      border-color: white;
    }
  }

  .cancelEquipment.selectebale:active {
    transform: translateY(10%);
    opacity: 0.4;
  }

  .switchEquipmentInContainer {
    background-color: #0c243f;
    padding: 0 !important;
  }

  .equipmentInRow {
    .equipmentActionController {
      position: absolute;
      right: 12px;
      bottom: -25px;
      width: 300px;
      height: 25px;

      span:not(.val):not(.undoLogo) {
        width: 130px;
        height: 22px;
        display: inline-block;
        position: relative;
        user-select: none;
        text-align: center;
        background-color: rgba(128, 128, 128, 0.445);
        font-size: 14px;
      }

      .undo {
        float: left;
        border-radius: 0 0 0 30px;
        text-align: right;
        cursor: pointer;
        padding-top: 1px;
        padding-left: 22px;
        padding-right: 8px;

        svg {
          float: right;
          margin: 2px;
          margin-top: 0px;
        }
      }

      .undo:hover {
        background-color: rgba(126, 83, 83, 0.404) !important;
        border-bottom: 1px solid white;
      }

      .undo:active {
        background-color: rgba(71, 47, 47, 0.404) !important;
        border-bottom: 1px solid white;
        transform: translateX(-5%) !important;
      }

      .undo::after {
        content: "\f054c" !important;
        font-family: "Material Design Icons" !important;
        position: absolute !important;
        left: 10% !important;
        top: 48% !important;
        transform: translateY(-50%) !important;
        font-size: 25px !important;
        color: white;
      }

      .val {
        display: inline-block;
        height: 22px;
        width: 40px;
        position: relative;
        user-select: none;
        text-align: left;
        font-size: 15px;
        padding-left: 8px;
        padding-bottom: 8px;
        margin-top: -20px;
        font-weight: bolder;
      }

      .val::after {
        content: "\F140B" !important;
        font-family: "Material Design Icons" !important;
        position: absolute !important;
        right: 10% !important;
        top: 51% !important;
        transform: translateY(-50%) !important;
        font-size: 17px !important;
        color: #86ace6;
      }

      .do {
        float: right;
        border-radius: 0 0 30px 0;
        text-align: left;
        cursor: pointer;
        padding-top: 1px;
        padding-right: 22px;
        padding-left: 8px;

        svg {
          float: left;
          margin: 2px;
          margin-top: 0px;
        }

        .undoLogo {}
      }

      .do:hover {
        background-color: #325072 !important;
        border-bottom: 1px solid white;
      }

      .do:active {
        background-color: #637992 !important;
        border-bottom: 1px solid white;
        transform: translateX(5%) !important;
      }

      .do::after {
        content: "\F044E" !important;
        font-family: "Material Design Icons" !important;
        position: absolute !important;
        right: 10px !important;
        top: 48% !important;
        transform: translateY(-50%) !important;
        font-size: 25px !important;
        color: white;
      }

      .whenZero {
        user-select: none;
        cursor: auto;
        opacity: 0.4;
      }
    }

    .actionHolderSwitch span:not(.EquipmentIfGonnaBeDeleted) {
      background-color: #00a6fbc4 !important;
    }

    span {
      transition: all 0.3s ease !important;
    }

    span:hover {
      transform: translateY(0%) !important;
    }

    div {
      transform: translateY(0%) !important;
    }

    div:hover {
      transform: translateY(0%) !important;
    }

    .switchEquipmentInContainer {
      padding-top: 99px !important;
    }

    span:not(.val):not(.equipmentActionController):not(.do):not(.undo):not(.switchEquipmentIn):not(.checkForSwitchThis):not(.checkForSwitchWith) {
      transition: all 0.8s ease !important;

      padding-top: 16px !important;
    }

    .checkForSwitchThisHide {
      height: 0% !important;
      opacity: 0;
      padding: 0 !important;
    }

    .checkForSwitchThis {
      background-color: #00a6fbc4 !important;
      transform: translateY(-5%);
      padding-top: 0px !important;
      height: 35% !important;
      opacity: 1 !important;
      position: relative;
      text-align: right !important;
      padding-right: 9px !important;
      color: rgb(204, 204, 204) !important;
      border-bottom: none !important;
      font-size: 22px !important;
    }

    .checkForSwitchThis::after {
      content: "\F04E1" !important;
      font-family: "Material Design Icons" !important;
      position: absolute !important;
      left: 0% !important;
      top: 49% !important;
      transform: translateY(-50%) !important;
      font-size: 33px !important;
      font-weight: inherit !important;
      letter-spacing: 4px;
      color: white;
    }

    .checkForSwitchWith {
      background-color: #2c4e74;
      transform: translateY(-5%);
      padding-top: 12px !important;
      height: 65% !important;
      opacity: 1 !important;
      display: inline-block;
      font-size: 33px;
      color: white;
      font-family: sans-serif;
      text-align: center;
      user-select: none;
      position: relative;
      width: 100%;
      font-weight: bold;
      position: relative;
      text-align: left !important;
      padding-left: 11px !important;
    }

    .checkForSwitchThis:hover {
      border-bottom: none !important;
    }

    .checkForSwitchWith:hover {
      border-top: none !important;
    }

    .actionHolder:hover {
      .checkForSwitchThis {
        border-left: 1px solid white !important;
        border-top: 1px solid white !important;
        border-bottom: none !important;
      }
    }

    .checkForSwitchWith::after {
      content: "\F0DD1" !important;
      font-family: "Material Design Icons" !important;
      position: absolute !important;
      right: 1% !important;
      top: 48% !important;
      transform: translateY(-50%) !important;
      font-size: 49px !important;
    }

    .checkForSwitch {
      background-color: #1c60d6 !important;
      transform: translateY(-5%);
    }

    .checkForSwitch::after {
      content: "\f04e1" !important;
      font-family: "Material Design Icons" !important;
      position: absolute !important;
      right: 0% !important;
      top: 15% !important;
      transform: translateY(-50%) !important;
      font-size: 35px !important;
      font-weight: 100 !important;
    }

    .checkForOut {
      background-color: #ff002b !important;
    }

    .EquipmentIfGonnaBeDeleted::after {
      content: "\F0737" !important;
      font-family: "Material Design Icons" !important;
      position: absolute !important;
      left: 0% !important;
      top: 49% !important;
      transform: translateY(-50%) !important;
      font-size: 33px !important;
      font-weight: inherit !important;
      letter-spacing: 4px;
      color: white;
    }

    .EquipmentIfGonnaBeDeleted {
      background-color: #3867be !important;
    }

    .equipmentForAdd {
      text-align: center;

      .thisIcon {
        color: #4f7cacad;
        font-size: 71px !important;
        padding-bottom: 11px;
      }

      .checkForSwitchThis {
        padding-bottom: 11px;
      }

      .checkForSwitchThis::after {
        content: "\F0415" !important;
        font-family: "Material Design Icons" !important;
        position: absolute !important;
        left: 0% !important;
        top: 49% !important;
        transform: translateY(-50%) !important;
        font-size: 33px !important;
        font-weight: inherit !important;
        letter-spacing: 4px;
        color: white;
      }
    }

    .equipmentForAdd:hover {
      .thisIcon {
        color: #a6c6e7ad;
      }
    }
  }

  .equipmentOutRow {
    .toAddOrSwitchEqp {
      max-height: 28vh !important;
      min-height: 17vh !important;
    }

    .switchEquipmentInContainer {
      padding-top: 99px !important;
    }

    .fullname {
      background-color: #271b1bc7 !important;

      color: white;
    }

    .fullname:hover {
      color: white;
    }

    .checkForIn {
      background-color: #ef233c !important;
    }

    .actionHolderSwitch span {}

    span {
      transform: translateY(0%) !important;
      transition: all 0.7s ease !important;
    }

    span:hover {
      transform: translateY(0%) !important;
    }

    div {
      transform: translateY(0%) !important;
    }

    div:hover {
      transform: translateY(0%) !important;
    }

    .switchEquipmentInContainer {
      padding-top: 99px !important;
    }

    span:not(.switchEquipmentIn):not(.checkForSwitchThis):not(.checkForSwitchWith) {
      transition: all 0.8s ease !important;

      padding-top: 16px !important;
    }

    .checkForSwitchThisHide {
      height: 0% !important;
      opacity: 0;
      padding: 0 !important;
    }

    .checkForSwitchThis {
      background-color: #ba1f33 !important;
      transform: translateY(-5%);
      padding-top: 0px !important;
      height: 35% !important;
      opacity: 1 !important;
      position: relative;
      text-align: right !important;
      padding-right: 9px !important;
      color: white !important;
      border-bottom: none !important;
      font-size: 22px !important;
    }

    .checkForSwitchThis::after {
      content: "\f072e" !important;
      font-family: "Material Design Icons" !important;
      position: absolute !important;
      left: 0% !important;
      top: 49% !important;
      transform: translateY(-50%) !important;
      font-size: 33px !important;
      font-weight: inherit !important;
      letter-spacing: 4px;
      color: white;
    }

    .checkForSwitchWith {
      background-color: rgb(121 44 44 / 78%);
      transform: translateY(-5%);
      padding-top: 12px !important;
      height: 65% !important;
      opacity: 1 !important;
      display: inline-block;
      font-size: 33px;
      color: white;
      font-family: sans-serif;
      text-align: center;
      user-select: none;
      position: relative;
      width: 100%;
      font-weight: bold;
      position: relative;
      text-align: left !important;
      padding-left: 11px !important;
      border-top: none !important;
    }

    .checkForSwitchThis:hover {
      border-bottom: none !important;
    }

    .checkForSwitchWith:hover {
      border-top: none !important;
    }

    .actionHolder:hover {
      .checkForSwitchThis {
        border-left: 1px solid white !important;
        border-top: 1px solid white !important;
        border-bottom: none !important;
      }
    }

    .checkForSwitchWith::after {
      content: "\F0DD1" !important;
      font-family: "Material Design Icons" !important;
      position: absolute !important;
      right: 1% !important;
      top: 48% !important;
      transform: translateY(-50%) !important;
      font-size: 49px !important;
    }

    .checkForSwitch {
      background-color: #1c60d6 !important;
      transform: translateY(-5%);
    }

    .checkForSwitch::after {
      content: "\f04e1" !important;
      font-family: "Material Design Icons" !important;
      position: absolute !important;
      right: 0% !important;
      top: 15% !important;
      transform: translateY(-50%) !important;
      font-size: 35px !important;
      font-weight: 100 !important;
    }

    .checkForOut {
      background-color: #ff002b !important;
    }
  }

  .equipmentEditMaster .switchEquipmentIn {}

  .equipmentInRow .switchEquipmentIn {
    background-color: #24242b;
    position: absolute !important;
    bottom: -20px;
    left: -10px;
    height: 24px;
    width: 120px;

    display: inline-block;
    font-size: 16px;
    padding-top: 0;
    text-align: left;

    padding-left: 11px;
    padding-top: 3px;
    font-weight: bolder;
    border-radius: 0 0 15px 0;
  }

  .equipmentOutRow .switchEquipmentIn {
    background-color: #002855;
    position: absolute !important;
    top: -20px;
    right: 13px;
    height: 24px;
    width: 120px;
    background-color: #002855;
    display: inline-block;
    font-size: 16px;
    padding-top: 0;
    text-align: right;

    padding-right: 11px;
    font-weight: bolder;
    border-radius: 15px 0 0 0;
  }

  .equipmentInRow .switchEquipmentIn::after {
    content: "\F0737" !important;
    font-family: "Material Design Icons" !important;
    position: absolute !important;
    right: 10% !important;
    top: 49% !important;
    transform: translateY(-50%) !important;
    font-size: 19px !important;
    font-weight: inherit !important;
    letter-spacing: 4px;
    color: white;
  }

  .equipmentOutRow .switchEquipmentIn::after {
    content: "\F072E" !important;
    font-family: "Material Design Icons" !important;
    position: absolute !important;
    left: 10% !important;
    top: 49% !important;
    transform: translateY(-50%) !important;
    font-size: 19px !important;
    font-weight: inherit !important;
    letter-spacing: 4px;
    color: white;
  }

  .equipmentInRow .switchEquipmentIn {
    background-color: #002855;
  }

  .equipmentOutRow .switchEquipmentIn {
    background-color: #22242b;
  }

  .equipmentInRow .switchEquipmentInCheckTag {
    background-color: #5c95ff !important;
  }

  .equipmentOutRow .switchEquipmentInCheckTag {
    background-color: #ba1f33 !important;
  }

  .EquipmentSwitch {
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 30px;
  }

  .EquipmentSwitch.firstSelect {
    text-shadow: 6px -1px 9px rgb(29 79 202);
  }

  .EquipmentSwitch.secondSelect {
    text-shadow: -6px 0px 5px rgb(88 141 208);
  }

  .EquipmentSwitch.secondSelect.delete {
    text-shadow: -7px 1px 5px rgb(144 58 60 / 77%);
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
      border-bottom: 1px solid #ffffff54;
    }

    .equipmentOutOne:hover {
      border: 1px solid #ffffff54;
    }
  }
}

.selectEquipButtonSelected {
  .equipemntOuts {
    height: fit-content !important;
    background-color: rgb(74 17 13 / 98%);

    .equipmentOutOne {
      height: 44px;
    }

    .equipmentOutOne:hover {
      border-bottom: 1px solid white;
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
.selectedOut{
  background-color: #00aa30 !important;
}
.selectedOut:hover{
  background-color: #00aa30 !important;
}
.selectedOut::after {
  content: "\F072E" !important;
  /* mdi-left-arrow icon */
  font-family: "Material Design Icons" !important;
  /* Ensure this matches your mdi font family */
  position: absolute !important;
  right: 5% !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  font-size: 18px !important;
  /* Adjust size as necessary */
  font-weight: 700 !important;
}
.selectedOut::before {
  content: "\F072E" !important;
  /* mdi-left-arrow icon */
  font-family: "Material Design Icons" !important;
  /* Ensure this matches your mdi font family */
  position: absolute !important;
  left: 5% !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  font-size: 18px !important;
  /* Adjust size as necessary */
  font-weight: 700 !important;
}


.sticky-header {
  position: sticky;
    top: -10px;
    z-index: 9;
    font-family: sans-serif;
    font-size: 13px;
    user-select: none;
    display: inline-block;
    width: 100%;
    font-weight: bold;
    height: 100%;

  header {
    background-color: #283845 !important;
    color: white;
  }
}

.tableOfThePlanningShow {
  transition: all 0.3s ease !important;
}



.planningWorkBoxColum_Not_Checked {
  border: none !important;

  span {
    border: none !important;
  }
}

.planningWorkBoxChecked {
  span {
    background-color: rgb(26, 149, 213) !important;
  }
}

.planningWorkBoxChecked_With {
  span {
    background-color: rgb(204 87 87) !important;
  }
}


.planningWorkDriver_Checked_Not_Checked {
  border: none !important;

  span {
    border: none !important;

  }
}

.planningWorkDriverColumChecked {
  span {
    background-color: #4e536e;
  }
}

.planningWorkDriver_Checked {
  border-color: white !important;

  span {
    background-color: rgb(26, 149, 213) !important;
  }

  span {}

  span {
    border-color: white !important;

  }
}


.planningWorkBoxColumChecked {
  border-color: white !important;

  span:not(.pause):not(.doublePause) {
    background-color: rgb(0 48 73);
  }

  .pause {
    background-color: #4b7597;
  }
  .doublePause {
        background-color: #53636a;
  }

  span {
    border-color: white;

  }
}



.planningWorkDriver_Checked_With {
  span {
    background-color: #ff0000b3 !important;
  }
}







.outLeftToBeInserted {
  background-color: #00aa30 !important;
}

.outLeftToBeInserted_With {
  background-color: #ff0000b3 !important;
}

.switchBlockHighlighted {
  .change1 {
    transform: translateX(5%);
  }
  .change2 {
    transform: translateX(-5%);
  }
  .firstPath{
     fill: rgb(203, 25, 25) ;
    }
    .secondPath{
      fill: rgb(26, 149, 213) ;

    }
}
.isswitchBlockPause {
     fill: #4b7597 !important;
}
.isswitchBlockDoublePause {
     fill: #53636a !important;
}
.isswitchBlockOut {
     fill:#00aa30 !important;
}
.switchBlockHighlighted:active {
  .change1 {
    transform: translateX(9%);
  }
  .change2 {
    transform: translateX(-9%);
  }

}

.switchBlock {
  position: absolute;
  bottom: 0;
  width: 28vw;
  text-align: left;
  padding-left: 12px;
  padding-bottom: 5px;
  font-size: 173%;

  span {
    margin-right: 10px;
  }

  .change1,
  .with,
  .change2 {
    display: inline-block;
    width: 5vw;
    text-align: center;
    height: 48px;
    border: 1px solid #ffffff36;
    border-radius: 19px;
    cursor: pointer;
  }

  .change1,
  .change2 {
    width: 10vw;

    border: 1px solid #ffffff36;
    border-radius: 19px;
    position: relative;
    height: 34px;
  }

  .with {
    border-radius: 0 !important;
    border: none;
    margin: 0 !important;

    .thisIcon {
      font-size: 42px;
    }
    svg{
      height: 50%;
    width: 100%;
    transform: rotateZ(90deg);
    position: absolute;
    left: -3%;
    bottom: 4px;
    }
  }

  .change1 {

    width: 10vw;
    border: 1px solid #00aa307a !important;
    ;
    border-radius:  0  19px 19px 0 ;
    margin-right: 0 !important;
    background-color: rgb(26, 149, 213);




  }

  .change1:hover,
  .change2:hover {
    border: 1px solid rgba(255, 255, 255, 0.329);
    opacity: 0.8;
    transform: translateY(-5%);

  }

  .change1:active,
  .change2:active {
    border: 1px solid white;
    opacity: 1;
    transform: translateY(0%);
  }

  .with:hover {
    i {
      opacity: 0.8;
      transform: translateY(5%);
    }

    .change1 {
      transform: translateX(-5%);
    }
  }


  .with:active {
    i {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  .change1:hover::before {

    content: "\F0156";
    font-family: "Material Design Icons";
    position: absolute;
    left: 1%;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 100 !important;
    font-size: 141%;
  }

  .change1_equip::after {
    content: "\f0dd1";
    font-family: "Material Design Icons";
    position: absolute;
    right: 7%;
    top: 47%;
    transform: translateY(-50%);
    font-weight: 100 !important;
    font-size: 141%;
  }

  .change2 {

    width: 10vw;
    border: 1px solid rgba(121, 31, 31, 0.702);
    border-radius: 19px 0 0 19px;
    margin-left: 0 !important;
    background-color: rgb(204 87 87);


  }

  .change2:hover::before {

    content: "\F0156";
    font-family: "Material Design Icons";
    position: absolute;
    right: 1%;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 100 !important;
    font-size: 141%;
  }

  .change2_equip::after {
    content: "\f0dd1";
    font-family: "Material Design Icons";
    position: absolute;
    left: 7%;
    top: 47%;
    transform: translateY(-50%);
    font-weight: 100 !important;
    font-size: 141%;
  }

  .pauseChange {

    border: 1px solid rgba(78, 67, 67, 0.702);
    background-color: #4b7597;

  }

  .dpChange {

    border: 1px solid rgba(78, 67, 67, 0.702);
    background-color: #53636a;

  }

  .change1.workBoxLeftFromOuts {
    background-color: #00aa30 !important;
  }

}

.redoUndoBlock {
  position: absolute;
  bottom: 0;
  width: 26vw;
  text-align: left;
  padding-right: 12px;
  padding-bottom: 6px;
  font-size: 20px;
  right: 0;
  padding-bottom: 2px;

  span {
    height: 20px !important;
    padding-top: 0 !important;
    font-size: 14px;
    display: inline-block
  }



  .undo,
  .redo {
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 32px;
    padding-top: 1px;
    border: 1px solid rgba(255, 255, 255, 0.2117647059);
    cursor: pointer;
    position: relative;
  }

  .undo {
    border-radius: 50px 0 0 0;
    background-color: #ffffff40;
    color: black;
    padding-left: 11px;
    width: 40%;
  }

  .undo:hover {
    border-radius: 50px 0 0 0;
    border: 1px solid rgba(255, 255, 255, 0.329);
    opacity: 0.8;


  }

  .undo::after {
    content: "\F054C";
    font-family: "Material Design Icons";
    position: absolute;
    left: 1vw;
    top: 50%;
    transform: translateY(-50%);
    font-size: 25px;
    font-weight: 100 !important;
  }

  .actionNumber {
    position: relative;
    width: 30px;
    margin: 0 5px;
    font-size: 14px;
  }



  .actionNumber::after {
    content: "\f140b";
    font-family: "Material Design Icons";
    position: absolute;
    right: 0;
    top: 53%;
    transform: translateY(-50%);
    font-size: 15px;
    font-weight: 100 !important;
    color: #fff55a;
  }

  .redo {

    border-radius: 0 50px 0 0;
    background-color: #18285d;
    color: white;
    padding-right: 11px;
    width: 40%;
  }

  .redo:hover {
    opacity: 0.8;
    background-color: #18285d7e;
  }

  .redo::after {
    content: "\F044E";
    font-family: "Material Design Icons";
    position: absolute;
    right: 1vw;
    top: 50%;
    transform: translateY(-50%);
    font-size: 25px;
    font-weight: 100 !important;
  }




  .undo.on {
    background-color: #cdd1dd !important;
  }

  .redo.on {
    background-color: #4664c7 !important;
  }

  .undo.on:active {
    transform: translateX(-3%);
  }

  .redo.on:active {
    transform: translateX(3%);
  }

}
.pDpButtons{
  padding: 0 !important;
  margin: 0 !important;
  .pButton,.dpButton{
    display: block !important;
    color: white;
    font-family: sans-serif;
    font-size: 17px;
    text-align: center;
    user-select: none;
    position: relative;
    width: 100%;
    font-weight: bold;
    height: 47%;
    cursor:pointer;
  }
  .pButton:hover,.dpButton:hover{
    border: 1px solid rgba(255, 255, 255, 0.329);
    opacity: 0.8;
    transform: translateY(-5%);
  }
  .pButton:active,.dpButton:active{
    border: 1px solid white;
    opacity: 1;
    transform: translateY(0%);
  }
  .pButton {


  background-color: #7d8597;
  margin-top: -3px;
  }

.dpButton {

  background-color: #81a4b1;

  }
  .pauseButtonClickedOn,.doublePauseButtonClickedOn{
    background-color: rgb(204, 87, 87) !important;
    border: 1px solid rgba(255, 255, 255, 0.329);
    opacity: 0.8;
    transform: translateY(-5%);
  }

}
</style>
