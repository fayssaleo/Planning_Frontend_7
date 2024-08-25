<template>
  <v-row
    class="saveButtonBar"
    style="height: 44px !important; color: black"
    v-if="getJustCreated == false"
  >
    <v-col cols="8" style="position: relative">
      <span
        >Click on <span class="confirmIconText">CONFIRM</span> button to confirm
        this planning!</span
      >
    </v-col>
    <v-col cols="4" style="position: relative">
      <v-btn density="default" class="saveButton3" @click="openCancelMDialog"
        >CANCEL</v-btn
      >
      <v-btn density="default" class="saveButton" @click="openSaveDialog"
        >CONFIRM</v-btn
      >
    </v-col>
  </v-row>
  <v-row style="width: 90%; margin: 0 auto">
    <v-col class="header" cols="12" style="position: relative">
      <div class="buttonsHolder">
        <div
          class="button"
          :class="editMode ? 'buttonOn2' : ''"
          @click="closePlanning"
        >
          <span class="buttonText">{{ editMode ? "SAVE" : "CLOSE" }}</span>
          <span class="buttonIcon buttonIcon1"></span>
        </div>
        <div class="button" :class="editMode ? 'displayNone' : ''">
          <span class="buttonText">AS PDF</span>
          <span class="buttonIcon buttonIcon2"></span>
        </div>
        <div class="button" :class="editMode ? 'displayNone' : ''">
          <span class="buttonText">DELETE</span>
          <span class="buttonIcon buttonIcon3"></span>
        </div>
      </div>
      <div class="buttonsHolder2">
        <div
          class="button"
          :class="editMode ? 'buttonOn' : ''"
          @click="toggleEditMode"
        >
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
      </div>
      <h1>Shift: {{ actualShift.name }}</h1>
      <h2>
        Date:
        {{ selectedDate.toLocaleDateString() + " - " }}
        <span v-if="ShiftIndex == 0">
          Morning
          <v-icon style="margin-top: 0px">mdi-white-balance-sunny</v-icon></span
        >
        <span v-if="ShiftIndex == 1">
          Evening
          <v-icon style="margin-top: 0px">mdi-theme-light-dark</v-icon></span
        >
        <span v-if="ShiftIndex == 2">
          Night <v-icon style="margin-top: 0px">mdi-power-sleep</v-icon></span
        >
      </h2>
    </v-col>
  </v-row>
  <v-row style="width: 100%; margin-bottom: 51px" class="mt-0">
    <v-data-table
      :headers="headers"
      :items="thisPlanningBoxes"
      class="elevation-1 tableOfThePlanning"
      hide-default-footer
      :items-per-page="thisPlanningBoxes.length"
      style="width: 90%; margin: 0 auto"
    >
      <template v-slot:thead>
        <thead>
          <tr v-if="editMode" class="addDriverButtonClickableCase">
            <th class="py-0 px-0">
              <span
                class="addDriverButton fullname x"
                @click="openEditDriversEquipmentsDialog"
                style="
                  position: relative;
                  margin: 0;
                  padding: 0;
                  padding-top: 16px;
                "
              >
                <span style="display: none">EDIT:</span>
                <v-icon class="thisIcon" style="margin-left: 12px"
                  >mdi-account-group</v-icon
                >
                <v-icon class="thisIcon">mdi-slash-forward</v-icon>
                <v-icon class="thisIcon">mdi-gantry-crane</v-icon>
              </span>
            </th>
            <th></th>
            <th
              v-for="header in headers.slice(2)"
              :key="header.key"
              style="position: relative; margin: 0; padding: 0"
            >
              <span class="selectEquipButton fullname"> LEFT (0) </span>
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:item="{ item }">
        <tr class="rowToEdit" :class="editMode ? 'clickableCase' : ''">
          <td>
            <span
              class="fullname"
              :class="item[0].shift_id != actualShift.id ? 'otherShiftBox' : ''"
              style="position: relative"
              >{{
                item[0].matricule +
                ": " +
                item[0].firstname[0].toUpperCase() +
                item[0].firstname.slice(1)
              }}<br />
              {{ item[0].lastname.toUpperCase() }}
              <span
                class="otherShift"
                v-if="item[0].shift_id != actualShift.id"
                >{{ getShiftByIndex(item[0].shift_id) }}</span
              >
            </span>
          </td>
          <td>
            <span class="wh workingHours">{{ item[0].workingHours }}</span>
          </td>
          <td v-for="(itemBox, index) in item.slice(1)" :key="itemBox">
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
          <v-card
            :title="
              'RTG SHIFT PLANNING - ' +
              actualShift.name +
              ' (Date: ' +
              selectedDate.toLocaleDateString() +
              ' - ' +
              getShiftPeriode +
              '):'
            "
            class="dialogHeader"
          >
            <ConfirmPlanning
              :actualShift="actualShift"
              :selectedDate="selectedDate"
              :selectedPlanning="selectedPlanning"
              :ShiftIndex="ShiftIndex"
              :planningBoxes="getPlanningWithTheBoxes.planning_boxes"
            />
            <v-card-actions class="mt-5">
              <v-spacer></v-spacer>
              <v-btn
                class="cancelButton"
                text="CANCEL"
                @click="isActive.value = false"
              ></v-btn>
              <v-btn
                density="default"
                class="saveButton2"
                @click="openSaveCONFIRMDialog"
                >SAVE</v-btn
              >
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </template>
  <template>
    <div class="text-center pa-4">
      <v-dialog v-model="addDialog" max-width="500" persistent>
        <v-card
          class="confirmDialogInterface"
          prepend-icon="mdi-chat"
          text="Are you sure you want to add this driver(s)?"
          title="CONFIRM ADD"
        >
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn
              style="
                background-color: #f5f5f5bf;
                font-size: 13px;
                font-weight: bold;
                color: #00000094;
              "
              @click="addDialog = false"
            >
              No
            </v-btn>

            <v-btn
              style="
                background-color: rgb(67 129 200);
                font-size: 13px;
                font-weight: bold;
              "
              @click="confirmAddDrivers"
            >
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
        <v-card
          class="confirmDialogInterface"
          prepend-icon="mdi-chat"
          text="Are you sure you want to switch this driver(s)?"
          title="CONFIRM SWITCH"
        >
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn
              style="
                background-color: #f5f5f5bf;
                font-size: 13px;
                font-weight: bold;
                color: #00000094;
              "
              @click="switchDialog = false"
            >
              No
            </v-btn>

            <v-btn
              style="
                background-color: rgb(53, 113, 38);
                font-size: 13px;
                font-weight: bold;
              "
              @click="switchConfirm"
            >
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
        <v-card
          class="confirmDialogInterface"
          prepend-icon="mdi-chat"
          text="Are you sure you want to delete this driver(s)?"
          title="CONFIRM DELETE"
        >
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn
              style="
                background-color: #f5f5f5bf;
                font-size: 13px;
                font-weight: bold;
                color: #00000094;
              "
              @click="deleteDialog = false"
            >
              No
            </v-btn>

            <v-btn
              style="
                background-color: #ff0000ab;
                font-size: 13px;
                font-weight: bold;
              "
              @click="deletFromDriversInPlanningWithChecked"
            >
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
        <v-card
          class="confirmDialogInterface"
          prepend-icon="mdi-chat-alert"
          text="Are you sure you want to save this planning?"
          title="CONFIRM SAVE"
        >
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn
              style="
                background-color: #f5f5f5bf;
                font-size: 13px;
                font-weight: bold;
                color: #00000094;
              "
              @click="confirmDialog = false"
            >
              No
            </v-btn>

            <v-btn
              style="
                background-color: rgb(67 129 200);
                font-size: 13px;
                font-weight: bold;
              "
              @click="savePlanning"
            >
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
        <v-card
          class="confirmDialogInterface"
          prepend-icon="mdi-trash-can-outline"
          text="Are you sure you want to cancel this planning?"
          title="Confirm saving"
        >
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
      <v-dialog
        v-model="editDriversEquipmentsDialog"
        max-width="80%"
        persistent
      >
        <v-card class="confirmDialogInterface driversInPlanningWithCheckCard">
          <v-row class="confirmDialogInterfaceHeader">
            <v-col
              cols="6"
              class="children"
              :class="selectedChangeEDSow == 0 ? 'selectedChangeEDSow' : ''"
              @click="selectedChangeEDSow = 0"
              ><v-icon class="thisIcon">mdi-account-group</v-icon>
              DRIVERS</v-col
            >
            <v-col
              cols="6"
              class="children"
              :class="selectedChangeEDSow == 1 ? 'selectedChangeEDSow' : ''"
              @click="selectedChangeEDSow = 1"
              ><v-icon class="thisIcon">mdi-gantry-crane</v-icon>
              EQUIPMENT</v-col
            >
          </v-row>
          <v-row v-if="selectedChangeEDSow == 0">
            <v-col cols="11" style="margin: 0 auto">
              <v-row>
                <v-col
                  v-if="false"
                  cols="5"
                  style="margin-bottom: 12px; padding: 0; min-height: 31px"
                  @click="allBothAddButton_hold = !allBothAddButton_hold"
                >
                  <div
                    class="allBothAddButton holdD"
                    :class="allBothAddButton_hold ? 'holdDChecked cancelX' : ''"
                  >
                    <span> </span>
                    <hr width="100%" />
                  </div>
                </v-col>
                <v-col
                  cols="5"
                  style="
                    margin-bottom: 12px;
                    padding: 0;
                    min-height: 31px;
                    color: #ffffffcf;
                  "
                  @click="allBothAddButton_hold = !allBothAddButton_hold"
                >
                  <span style="font-size: 16px; font-weight: bolder"
                    >SHIFT {{ actualShift.name }} :
                    {{ selectedDate.toLocaleDateString() + " - " }}
                    <span v-if="ShiftIndex == 0"> MORNING</span>
                    <span v-if="ShiftIndex == 1"> EVENING</span>
                    <span v-if="ShiftIndex == 2"> NIGHT</span></span
                  >
                </v-col>

                <v-col cols="2"></v-col>

                <v-col
                  cols="5"
                  v-if="
                    !allBothNextDrivers &&
                    !allBothAddButton_delete &&
                    !allBothAddButton_switch
                  "
                  style="margin-bottom: 12px; padding: 0"
                  class="allBothAddButton addD"
                  @click="openChangeDriverDialog"
                >
                  <div>
                    ADD DRIVERS
                    <span> </span>
                  </div>
                  <hr width="100%" />
                </v-col>

                <v-col
                  cols="5"
                  v-if="allBothAddButton_switch || allBothAddButton_delete"
                  style="margin-bottom: 12px; padding: 0"
                  class="selectAllD"
                  :class="
                    driversInPlanningWithCheck.length ==
                    driversInPlanningWithChecked.length
                      ? 'selectAllDChecked'
                      : ''
                  "
                  @click="setSelectAllDrivers"
                >
                  <div>
                    SELECT ALL ({{ driversInPlanningWithChecked.length }})
                    <span> </span>
                    <hr width="100%" />
                  </div>
                </v-col>

                <v-col cols="12" class="ma-0 pa-0" style="margin: 0 auto">
                  <v-data-table
                    :headers="driverSelectionHeaderWithShift"
                    :items="driversInPlanningWithCheck"
                    class="elevation-1 tableOfAllDrivers tableOfAllDrivers custom-scrollbar"
                    hide-default-footer
                    :items-per-page="driversInPlanningWithCheck.length"
                    style="
                      width: 100%;
                      margin: 0 auto;
                      margin-bottom: 27px !important;
                    "
                  >
                    <template v-slot:item="{ item }">
                      <tr
                        :class="[
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
                        ]"
                        @click="
                          showSelect ? (item.checked = !item.checked) : ''
                        "
                        :disabled="true"
                      >
                        <td>
                          <span
                            class="fullname"
                            :class="item.checked ? 'checkedDriverText' : ''"
                            >{{ item.matricule }}
                          </span>
                        </td>

                        <td>
                          <span
                            class="fullname"
                            :class="item.checked ? 'checkedDriverText' : ''"
                            >{{
                              item.firstname[0].toUpperCase() +
                              item.firstname.slice(1)
                            }}
                          </span>
                        </td>

                        <td>
                          <span
                            class="fullname"
                            :class="item.checked ? 'checkedDriverText' : ''"
                            >{{ item.lastname.toUpperCase() }}</span
                          >
                        </td>

                        <td>
                          <span
                            class="fullname"
                            :class="item.checked ? 'checkedDriverText' : ''"
                            >{{ getShiftByIndex(item.shift_id) }}</span
                          >
                        </td>

                        <td>
                          <span
                            class="fullname"
                            :class="item.checked ? 'checkedDriverText' : ''"
                            >{{ item.workingHours }}</span
                          >
                        </td>

                        <td
                          v-if="
                            !allBothNextDrivers &&
                            (allBothAddButton_delete || allBothAddButton_switch)
                          "
                        >
                          <span
                            class="fullname action"
                            :class="
                              item.checked ? 'checkedAction' : 'uncheckedAction'
                            "
                          ></span>
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-col>

                <v-col
                  cols="5"
                  style="margin-bottom: 12px; padding: 0"
                  @click="allBothAddButton_delete = !allBothAddButton_delete"
                >
                  <div
                    v-if="!allBothNextDrivers && !allBothAddButton_switch"
                    class="allBothAddButton deleteD"
                    :class="
                      allBothAddButton_delete ? 'deleteDChecked cancelX' : ''
                    "
                  >
                    {{ allBothAddButton_delete ? "CANCEL" : "DELETE DRIVERS" }}
                    <span> </span>
                    <hr width="100%" />
                  </div>
                </v-col>

                <v-col cols="2"></v-col>

                <v-col
                  cols="5"
                  style="margin-bottom: 12px; padding: 0; min-height: 31px"
                  @click="allBothAddButton_switch = !allBothAddButton_switch"
                >
                  <div
                    class="allBothAddButton switchD"
                    :class="
                      allBothAddButton_switch ? 'switchDChecked cancelX' : ''
                    "
                    v-if="!allBothNextDrivers && !allBothAddButton_delete"
                  >
                    {{ allBothAddButton_switch ? "CANCEL" : "SWITCH DRIVERS" }}

                    <span @click="setSelectAllDrivers"> </span>
                    <hr width="100%" />
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row v-if="selectedChangeEDSow == 1" class="equipmentEditMaster">
            <v-col cols="11" :class="allBothAddButton_switch?'speadForEdit':''"  style="margin: 0 auto; ">
              <v-row>
                <v-col
                  cols="5"
                  style="
                    margin-bottom: 12px;
                    padding: 0;
                    min-height: 31px;
                    color: #ffffffcf;
                  "
                  @click="allBothAddButton_hold = !allBothAddButton_hold"
                >
                  <span style="font-size: 16px; font-weight: bolder"
                    >SHIFT {{ actualShift.name }} :
                    {{ selectedDate.toLocaleDateString() + " - " }}
                    <span v-if="ShiftIndex == 0"> MORNING</span>
                    <span v-if="ShiftIndex == 1"> EVENING</span>
                    <span v-if="ShiftIndex == 2"> NIGHT</span></span
                  >
                </v-col>

                <v-col v-if="!allBothAddButton_switch" cols="2"></v-col>
                <v-col v-else cols="2"></v-col>

                <v-col
                  cols="5"
                  style="margin-bottom: 12px; padding: 0; min-height: 31px"
                  @click="allBothAddButton_switch = !allBothAddButton_switch"
                  v-if="!allBothAddButton_switch"
                >
                  <div
                    class="allBothAddButton addD"
                    :class="
                      allBothAddButton_switch ? 'addDChecked cancelX' : ''
                    "
                    v-if="!allBothNextDrivers && !allBothAddButton_delete"
                    @click="openAddEquipment"
                  >
                    SWITCH RTG(s)
                    <span> </span>
                    <hr width="100%" />
                  </div>
                </v-col>

                <v-col
                  cols="2"
                  style="margin-bottom: 12px; padding: 0; min-height: 31px"
                  @click="allBothAddButton_switch = !allBothAddButton_switch"
                  v-if="allBothAddButton_switch"
                >
                  <div
                    class="cancelEquipment"
                    :class="allBothAddButton_switch ? ' cancelX' : ''"
                    v-if="!allBothNextDrivers && !allBothAddButton_delete"
                  >
                    CANCEL
                    <span @click="setSelectAllDrivers"> </span>
                    <hr width="100%" />
                  </div>
                </v-col>

                <v-col
                  cols="3"
                  style="margin-bottom: 12px; padding: 0; min-height: 31px"
                  @click="allBothAddButton_switch = !allBothAddButton_switch"
                  v-if="allBothAddButton_switch"
                >
                  <div
                    class="switchEquipment"
                    :class="allBothAddButton_switch ? ' cancelX' : ''"
                    v-if="!allBothNextDrivers && !allBothAddButton_delete"
                  >
                    CONFIRM
                    <span @click="setSelectAllDrivers"> </span>
                    <hr width="100%" />
                  </div>
                </v-col>

                <v-col
                  cols="5"
                  v-if="allBothAddButton_switch || allBothAddButton_delete"
                  style="margin-bottom: 12px; padding: 0"
                  class="selectAllD"
                  :class="
                    driversInPlanningWithCheck.length ==
                    driversInPlanningWithChecked.length
                      ? 'selectAllDChecked'
                      : ''
                  "
                  @click="setSelectAllDrivers"
                >
                </v-col>
                <v-col cols="12" class="ma-0 pa-0" style="margin: 0 auto">
                  <v-row style="padding: 0 !important" class="equipmentInRow">
                    <v-col
                      class="pa-0 switchEquipmentInContainer"
                      v-if="allBothAddButton_switch"
                      cols="1"
                      style="position: relative; max-width: 70px;    user-select: none;"
                    >
                      <span class="switchEquipmentIn" style="transform: scaleY(1.5) skewY(21deg) rotateY(-180deg) translateY(47%) translateX(20%) !important;"> NI </span>
                    </v-col>
                    <v-col
                    @mouseleave="removeEquipmentEditCheckedForSwitchWith"
                      :cols="allBothAddButton_switch ? '11' : '12'"
                      :style="{
                        padding: allBothAddButton_switch ? '0 !important' : '',
                        overflow: hidden,
                      }"
                    >
                      <v-row
                        class="custom-scrollbar equipmentEdit"
                        style="
                          width: 100%;
                          display: flex;
                          flex-wrap: wrap;
                          align-content: flex-start;
                          margin-top: 1px;
                          overflow: overlay;
                          overflow-x: hidden !important;
                        "
                        :class="
                          allBothAddButton_switch ? 'toAddOrSwitchEqp' : ''
                        "
                      >
                        <v-col
                          cols="3"
                          v-for="item in equipmentsInPlanningWithCheck"
                          :class="[
                            showSelect ? 'actionHolder' : '',
                            item.checked && allBothAddButton_delete
                              ? 'actionHolderDelete'
                              : '',
                            item.checked && allBothAddButton_switch
                              ? 'actionHolderSwitch'
                              : '',
                          ]"
                          @click="
                            showSelect
                              ? (item = setEquipmentEditCheckedForSwitch(item))
                              : ''
                          "
                          @mouseleave="removeEquipmentEditCheckedForSwitchWith"
                          @mouseover="setEquipmentEditCheckedForSwitchWith(item)"

                          :disabled="true"
                          style="padding: 0; margin: 0; width: 100%; min-height:100px !important"
                        >
                          <span
                            class="fullname"
                            :class="[
                              item.checked ? 'checkForSwitch' : '',
                              equipmentEditCheckedForSwitch != null &&
                              equipmentEditCheckedForSwitchWith != null &&
                               item.id!=equipmentEditCheckedForSwitch?.id &&
                                equipmentEditCheckedForSwitchWith?.id==item.id ?'checkForSwitchThis':'',
                             ]"
                            >{{ item.matricule }}
                          </span>
                          <span
                          :class="(equipmentEditCheckedForSwitch != null &&
                           item.id!=equipmentEditCheckedForSwitch?.id &&
                            equipmentEditCheckedForSwitchWith?.id==item.id)?'checkForSwitchWith':''"
                          class=" checkForSwitchThisHide"
                            >{{

                            (equipmentEditCheckedForSwitch != null &&
                             item.id!=equipmentEditCheckedForSwitch?.id &&
                              equipmentEditCheckedForSwitchWith?.id==item.id)?
                              (equipmentEditCheckedForSwitch?.matricule)
                              :''
                             }}
                          </span>
                        </v-col>
                      </v-row>
                    </v-col
                    >
                  </v-row>
                  <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="11"
                      ><v-row v-if="allBothAddButton_switch" class="ma-0 pa-0">
                        <v-col cols="12" class="ma-0 pa-0">
                          <span class="downSpan"></span>
                        </v-col> </v-row
                    ></v-col>
                  </v-row>
                  <v-row class="equipmentOutRow">
                    <v-col
                      class="pa-0 switchEquipmentInContainer"
                      v-if="allBothAddButton_switch"
                      cols="1"
                      style="    user-select: none;position: relative; max-width: 70px;padding-top: 3% !important;"
                    >
                      <span
                        class="switchEquipmentIn"
                        style="

transform: scaleY(1.5) skewY(21deg) rotateY(-180deg) translateY(14%) translateX(10%) !important;
    padding-top: 0 !important;    font-size: 47px;

                        "
                      >
                        TUO
                      </span>
                    </v-col>
                    <v-col
                      cols="11"
                      style="padding: 0 !important; overflow: hidden"
                    >
                      <v-row
                        v-if="allBothAddButton_switch"
                        class="custom-scrollbar equipmentEdit toAddOrSwitchEqp"
                        style="
                          width: 100%;
                          display: flex;
                          flex-wrap: wrap;
                          align-content: flex-start;
                          margin-top: 1px;
                          overflow: overlay;
                          overflow-x: hidden !important;
                        "
                      >
                        <v-col
                          cols="3"
                          v-for="item in equipmentsNotInPlanningWithCheck"
                          :class="[
                            showSelect ? 'actionHolder' : '',
                            item.checked && allBothAddButton_delete
                              ? 'actionHolderDelete'
                              : '',
                            item.checked && allBothAddButton_switch
                              ? 'actionHolderSwitch'
                              : '',
                          ]"
                          @click="
                            showSelect ? (item.checked = !item.checked) : ''
                          "
                          :disabled="true"
                          style="padding: 0; margin: 0; width: 100%;min-height:100px !important;max-height: 100px !important;"
                        >
                          <span
                            class="fullname"
                            :class="item.checked ? 'checkForIn' : ''"
                            >{{ item.matricule }}
                          </span>
                        </v-col>
                      </v-row></v-col
                    >
                  </v-row>
                </v-col>

                <v-col
                  cols="5"
                  style="margin-bottom: 12px; padding: 0"
                  @click="allBothAddButton_delete = !allBothAddButton_delete"
                >
                  <div
                    v-if="!allBothNextDrivers && !allBothAddButton_switch"
                    class="allBothAddButton deleteD"
                    :class="
                      allBothAddButton_delete ? 'deleteDChecked cancelX' : ''
                    "
                  >
                    {{ allBothAddButton_delete ? "CANCEL" : "DELETE RTG(s)" }}
                    <span> </span>
                    <hr width="100%" />
                  </div>
                </v-col>

                <v-col cols="2"></v-col>
              </v-row>
            </v-col>
          </v-row>
          <template
            v-slot:actions
            style="width: 100%; /* padding: 0; */ margin-top: 34px"
          >
            <v-spacer></v-spacer>
            <v-btn
              density="default"
              class="backButton_all"
              :disabled="showSelect"
              @click="cancelDriversInPlanningWithCheck"
              >CANCEL</v-btn
            >
            <v-btn
              density="default"
              class="nextButton_all"
              @click="true"
              v-if="
                !allBothNextDrivers &&
                !allBothAddButton_delete &&
                !allBothAddButton_switch
              "
              >CONFIRM</v-btn
            >
            <v-btn
              density="default"
              class="nextButton_all"
              style="background-color: rgb(220 47 2 / 74%)"
              @click="openDeleteDialog"
              v-if="allBothAddButton_delete"
              >DELETE</v-btn
            >
            <v-btn
              density="default"
              class="nextButton_all"
              style="background-color: rgb(71 149 52)"
              @click="openAddDriversForSwitch"
              v-if="allBothAddButton_switch"
              >NEXT</v-btn
            >
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
            <v-col
              cols="12"
              class="children"
              :class="selectedChangeEDSow == 0 ? 'selectedChangeEDSow' : ''"
              v-if="selectedChangeEDSow == 0"
              ><v-icon class="thisIcon">mdi-account-group</v-icon> ADD
              DRIVERS</v-col
            >
            <v-col
              cols="12"
              class="children"
              :class="selectedChangeEDSow == 1 ? 'selectedChangeEDSow' : ''"
              v-else
              ><v-icon class="thisIcon">mdi-gantry-crane</v-icon> ADD
              EQUIPMENT</v-col
            >
          </v-row>
          <v-row v-if="selectedChangeEDSow == 0">
            <v-col cols="11" style="margin: 0 auto">
              <v-row>
                <v-col cols="12" v-if="!allDriverNext">
                  <div v-if="!addDriversForSwitch">
                    Here you can add drivers from this shift and from the other
                    shifts.
                    <span
                      class="selectAll"
                      @click="setSelectAll"
                      :class="
                        allDriverFiltered.length > 0 &&
                        allDriverFilteredChecked.length ==
                          allDriverFiltered.length
                          ? 'selectAllChecked'
                          : ''
                      "
                    >
                      SELECT ALL({{ allDriverFilteredChecked.length }})
                    </span>
                  </div>
                  <hr width="100%" />
                  <v-radio-group v-model="selectedAlldriversShift" inline>
                    <div class="radioButtonText">
                      <span class="thisSpan">Drivers from shift: </span>
                      <span
                        v-for="(shift, index) in ['A', 'B', 'C', 'D']"
                        :key="shift"
                      >
                        <v-radio
                          v-if="shift != actualShift.name"
                          :label="shift"
                          :value="index + 1"
                          :class="existedIn(index + 1) ? 'isExisted' : ''"
                        ></v-radio>
                        <v-radio
                          v-else
                          :label="actualShift.name + ' (This Shift)'"
                          :value="index + 1"
                          :class="existedIn(index + 1) ? 'isExisted' : ''"
                        ></v-radio>
                      </span>
                    </div>
                    <v-col cols="12" class="ma-0 pa-0" style="margin: 0 auto">
                      <v-data-table
                        :headers="driverSelectionHeader"
                        :items="allDriverFiltered"
                        class="elevation-1 tableOfAllDrivers custom-scrollbar"
                        hide-default-footer
                        :items-per-page="thisPlanningBoxes.length"
                        style="width: 100%; margin: 0 auto"
                      >
                        <template v-slot:item="{ item }">
                          <tr
                            class="actionHolder"
                            :class="
                              item.checked && addDriversForSwitch
                                ? 'actionHolderSwitch'
                                : ''
                            "
                            @click="
                              item.checked = setCheckedIfSwitchOrAdd(item)
                            "
                          >
                            <td>
                              <span
                                class="fullname"
                                :class="item.checked ? 'checkedDriverText' : ''"
                                >{{ item.matricule }}
                              </span>
                            </td>

                            <td>
                              <span
                                class="fullname"
                                :class="item.checked ? 'checkedDriverText' : ''"
                                >{{
                                  item.firstname[0].toUpperCase() +
                                  item.firstname.slice(1)
                                }}
                              </span>
                            </td>

                            <td>
                              <span
                                class="fullname"
                                :class="item.checked ? 'checkedDriverText' : ''"
                                >{{ item.lastname.toUpperCase() }}</span
                              >
                            </td>

                            <td>
                              <span
                                class="fullname"
                                :class="item.checked ? 'checkedDriverText' : ''"
                                >{{ item.workingHours }}</span
                              >
                            </td>
                            <td>
                              <span
                                class="fullname action"
                                :class="
                                  item.checked
                                    ? 'checkedAction'
                                    : 'uncheckedAction'
                                "
                              ></span>
                            </td>
                          </tr>
                        </template>
                      </v-data-table>
                    </v-col>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" v-else class="mb-0 pb-0">
                  <div class="selectedDriversNext_all">Selected drivers:</div>
                  <span
                    v-if="!addDriversForSwitch"
                    v-for="shiftDrivers in selectedDriversRxistedAll"
                    :key="shiftDrivers.shift"
                  >
                    <div
                      class="fromSHiftNext_all"
                      v-if="shiftDrivers.drivers.length > 0"
                    >
                      From shift {{ shiftDrivers.shift }}: ({{
                        shiftDrivers.drivers.length
                      }})
                    </div>
                    <v-data-table
                      :headers="[...driverSelectionHeader]"
                      :items="shiftDrivers.drivers"
                      class="elevation-1 tableOfAllDrivers custom-scrollbar tableOfAllDrivers2 forSwitchTableHeights"
                      hide-default-footer
                      :items-per-page="thisPlanningBoxes.length"
                      style="width: 100%; margin: 0 auto"
                      v-if="shiftDrivers.drivers.length > 0"
                    >
                      <template v-slot:item="{ item }">
                        <tr
                          class="actionHolder actionHolder2"
                          :class="
                            item.checked && addDriversForSwitch
                              ? 'actionHolderSwitch'
                              : ''
                          "
                          @click="
                            allDriverFilteredCheckedAllShifts.length == 1
                              ? (allDriverNext = false)
                              : '';
                            item.checked = !item.checked;
                          "
                        >
                          <td>
                            <span
                              class="fullname"
                              :class="item.checked ? 'checkedDriverText' : ''"
                              >{{ item.matricule }}x
                            </span>
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.checked ? 'checkedDriverText' : ''"
                              >{{
                                item.firstname[0].toUpperCase() +
                                item.firstname.slice(1)
                              }}
                            </span>
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.checked ? 'checkedDriverText' : ''"
                              >{{ item.lastname.toUpperCase() }}</span
                            >
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.checked ? 'checkedDriverText' : ''"
                              >{{ item.workingHours }}</span
                            >
                          </td>
                          <td>
                            <span
                              class="fullname action"
                              :class="
                                item.checked
                                  ? 'checkedAction'
                                  : 'uncheckedAction'
                              "
                            ></span>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </span>

                  <span
                    v-for="shiftDrivers in [3]"
                    :key="shiftDrivers"
                    v-if="addDriversForSwitch"
                  >
                    <div class="selectedDriversNext_all" style="color: green">
                      DRIVERS IN:
                    </div>
                    <v-data-table
                      :headers="[...driverSelectionHeaderWithShift]"
                      :items="addDriversForSwitchDriversIn"
                      class="elevation-1 tableOfAllDrivers custom-scrollbar tableOfAllDrivers2 forSwitchTableHeights"
                      hide-default-footer
                      :items-per-page="thisPlanningBoxes.length"
                      style="width: 100%; margin: 0 auto"
                      ref="tableInRef"
                    >
                      <template v-slot:item="{ item }">
                        <tr
                          :ref="'drivers_' + item.index"
                          @mouseover="showPair(item.index)"
                          @mouseleave="hidePair(item.index)"
                          class="actionHolder actionHolder2SwitchNextInTable"
                          :class="
                            item.toSwitch && addDriversForSwitch
                              ? 'actionHolderSwitch'
                              : ''
                          "
                          @click="switchPairIn(item.index)"
                        >
                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{ item.matricule }}
                            </span>
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{
                                item.firstname[0].toUpperCase() +
                                item.firstname.slice(1)
                              }}
                            </span>
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{ item.lastname.toUpperCase() }}</span
                            >
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{ getShiftByIndex(item.shift_id) }}</span
                            >
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{ item.workingHours }}</span
                            >
                          </td>
                          <td>
                            <span
                              class="fullname action"
                              :class="
                                item.toSwitch
                                  ? 'switchPairSelected'
                                  : 'uncheckedAction'
                              "
                            ></span>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </span>

                  <span
                    v-for="shiftDrivers in [3]"
                    :key="shiftDrivers"
                    v-if="addDriversForSwitch"
                  >
                    <div
                      class="selectedDriversNext_all"
                      style="color: rgb(205 48 48 / 93%)"
                    >
                      DRIVERS OUT:
                    </div>
                    <v-data-table
                      :headers="[...driverSelectionHeaderWithShift]"
                      :items="addDriversForSwitchDriversOut"
                      class="elevation-1 tableOfAllDrivers custom-scrollbar tableOfAllDrivers2 forSwitchTableHeights"
                      hide-default-footer
                      :items-per-page="thisPlanningBoxes.length"
                      style="width: 100%; margin: 0 auto"
                    >
                      <template v-slot:item="{ item }">
                        <tr
                          :ref="'drivers_' + item.index"
                          @mouseover="showPair(item.index)"
                          @mouseleave="hidePair(item.index)"
                          class="actionHolder actionHolder2SwitchNextOutTable"
                          :class="
                            item.toSwitch && addDriversForSwitch
                              ? 'actionHolderSwitch'
                              : ''
                          "
                          @click="switchPairOut(item.index)"
                        >
                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{ item.matricule }}
                            </span>
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{
                                item.firstname[0].toUpperCase() +
                                item.firstname.slice(1)
                              }}
                            </span>
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{ item.lastname.toUpperCase() }}</span
                            >
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{ getShiftByIndex(item.shift_id) }}</span
                            >
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{ item.workingHours }}</span
                            >
                          </td>
                          <td>
                            <span
                              class="fullname action"
                              :class="
                                item.toSwitch
                                  ? 'switchPairSelected'
                                  : 'uncheckedAction'
                              "
                            ></span>
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
                    <span
                      class="selectAll"
                      @click="setSelectAll"
                      :class="
                        allDriverFiltered.length > 0 &&
                        allDriverFilteredChecked.length ==
                          allDriverFiltered.length
                          ? 'selectAllChecked'
                          : ''
                      "
                    >
                      SELECT ALL({{ allDriverFilteredChecked.length }})
                    </span>
                  </div>
                  <hr width="100%" />
                  <v-radio-group v-model="selectedAlldriversShift" inline>
                    <div class="radioButtonText">
                      <span class="thisSpan">Drivers from shift: </span>
                      <span
                        v-for="(shift, index) in ['A', 'B', 'C', 'D']"
                        :key="shift"
                      >
                        <v-radio
                          v-if="shift != actualShift.name"
                          :label="shift"
                          :value="index + 1"
                          :class="existedIn(index + 1) ? 'isExisted' : ''"
                        ></v-radio>
                        <v-radio
                          v-else
                          :label="actualShift.name + ' (This Shift)'"
                          :value="index + 1"
                          :class="existedIn(index + 1) ? 'isExisted' : ''"
                        ></v-radio>
                      </span>
                    </div>
                    <v-col cols="12" class="ma-0 pa-0" style="margin: 0 auto">
                      <v-data-table
                        :headers="driverSelectionHeader"
                        :items="allDriverFiltered"
                        class="elevation-1 tableOfAllDrivers custom-scrollbar"
                        hide-default-footer
                        :items-per-page="thisPlanningBoxes.length"
                        style="width: 100%; margin: 0 auto"
                      >
                        <template v-slot:item="{ item }">
                          <tr
                            class="actionHolder"
                            :class="
                              item.checked && addDriversForSwitch
                                ? 'actionHolderSwitch'
                                : ''
                            "
                            @click="
                              item.checked = setCheckedIfSwitchOrAdd(item)
                            "
                          >
                            <td>
                              <span
                                class="fullname"
                                :class="item.checked ? 'checkedDriverText' : ''"
                                >{{ item.matricule }}
                              </span>
                            </td>

                            <td>
                              <span
                                class="fullname"
                                :class="item.checked ? 'checkedDriverText' : ''"
                                >{{
                                  item.firstname[0].toUpperCase() +
                                  item.firstname.slice(1)
                                }}
                              </span>
                            </td>

                            <td>
                              <span
                                class="fullname"
                                :class="item.checked ? 'checkedDriverText' : ''"
                                >{{ item.lastname.toUpperCase() }}</span
                              >
                            </td>

                            <td>
                              <span
                                class="fullname"
                                :class="item.checked ? 'checkedDriverText' : ''"
                                >{{ item.workingHours }}</span
                              >
                            </td>
                            <td>
                              <span
                                class="fullname action"
                                :class="
                                  item.checked
                                    ? 'checkedAction'
                                    : 'uncheckedAction'
                                "
                              ></span>
                            </td>
                          </tr>
                        </template>
                      </v-data-table>
                    </v-col>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" v-else class="mb-0 pb-0">
                  <div class="selectedDriversNext_all">Selected drivers:</div>
                  <span
                    v-if="!addDriversForSwitch"
                    v-for="shiftDrivers in selectedDriversRxistedAll"
                    :key="shiftDrivers.shift"
                  >
                    <div
                      class="fromSHiftNext_all"
                      v-if="shiftDrivers.drivers.length > 0"
                    >
                      From shift {{ shiftDrivers.shift }}: ({{
                        shiftDrivers.drivers.length
                      }})
                    </div>
                    <v-data-table
                      :headers="[...driverSelectionHeader]"
                      :items="shiftDrivers.drivers"
                      class="elevation-1 tableOfAllDrivers custom-scrollbar tableOfAllDrivers2 forSwitchTableHeights"
                      hide-default-footer
                      :items-per-page="thisPlanningBoxes.length"
                      style="width: 100%; margin: 0 auto"
                      v-if="shiftDrivers.drivers.length > 0"
                    >
                      <template v-slot:item="{ item }">
                        <tr
                          class="actionHolder actionHolder2"
                          :class="
                            item.checked && addDriversForSwitch
                              ? 'actionHolderSwitch'
                              : ''
                          "
                          @click="
                            allDriverFilteredCheckedAllShifts.length == 1
                              ? (allDriverNext = false)
                              : '';
                            item.checked = !item.checked;
                          "
                        >
                          <td>
                            <span
                              class="fullname"
                              :class="item.checked ? 'checkedDriverText' : ''"
                              >{{ item.matricule }}x
                            </span>
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.checked ? 'checkedDriverText' : ''"
                              >{{
                                item.firstname[0].toUpperCase() +
                                item.firstname.slice(1)
                              }}
                            </span>
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.checked ? 'checkedDriverText' : ''"
                              >{{ item.lastname.toUpperCase() }}</span
                            >
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.checked ? 'checkedDriverText' : ''"
                              >{{ item.workingHours }}</span
                            >
                          </td>
                          <td>
                            <span
                              class="fullname action"
                              :class="
                                item.checked
                                  ? 'checkedAction'
                                  : 'uncheckedAction'
                              "
                            ></span>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </span>

                  <span
                    v-for="shiftDrivers in [3]"
                    :key="shiftDrivers"
                    v-if="addDriversForSwitch"
                  >
                    <div class="selectedDriversNext_all" style="color: green">
                      DRIVERS IN:
                    </div>
                    <v-data-table
                      :headers="[...driverSelectionHeaderWithShift]"
                      :items="addDriversForSwitchDriversIn"
                      class="elevation-1 tableOfAllDrivers custom-scrollbar tableOfAllDrivers2 forSwitchTableHeights"
                      hide-default-footer
                      :items-per-page="thisPlanningBoxes.length"
                      style="width: 100%; margin: 0 auto"
                      ref="tableInRef"
                    >
                      <template v-slot:item="{ item }">
                        <tr
                          :ref="'drivers_' + item.index"
                          @mouseover="showPair(item.index)"
                          @mouseleave="hidePair(item.index)"
                          class="actionHolder actionHolder2SwitchNextInTable"
                          :class="
                            item.toSwitch && addDriversForSwitch
                              ? 'actionHolderSwitch'
                              : ''
                          "
                          @click="switchPairIn(item.index)"
                        >
                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{ item.matricule }}
                            </span>
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{
                                item.firstname[0].toUpperCase() +
                                item.firstname.slice(1)
                              }}
                            </span>
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{ item.lastname.toUpperCase() }}</span
                            >
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{ getShiftByIndex(item.shift_id) }}</span
                            >
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{ item.workingHours }}</span
                            >
                          </td>
                          <td>
                            <span
                              class="fullname action"
                              :class="
                                item.toSwitch
                                  ? 'switchPairSelected'
                                  : 'uncheckedAction'
                              "
                            ></span>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </span>

                  <span
                    v-for="shiftDrivers in [3]"
                    :key="shiftDrivers"
                    v-if="addDriversForSwitch"
                  >
                    <div
                      class="selectedDriversNext_all"
                      style="color: rgb(205 48 48 / 93%)"
                    >
                      DRIVERS OUT:
                    </div>
                    <v-data-table
                      :headers="[...driverSelectionHeaderWithShift]"
                      :items="addDriversForSwitchDriversOut"
                      class="elevation-1 tableOfAllDrivers custom-scrollbar tableOfAllDrivers2 forSwitchTableHeights"
                      hide-default-footer
                      :items-per-page="thisPlanningBoxes.length"
                      style="width: 100%; margin: 0 auto"
                    >
                      <template v-slot:item="{ item }">
                        <tr
                          :ref="'drivers_' + item.index"
                          @mouseover="showPair(item.index)"
                          @mouseleave="hidePair(item.index)"
                          class="actionHolder actionHolder2SwitchNextOutTable"
                          :class="
                            item.toSwitch && addDriversForSwitch
                              ? 'actionHolderSwitch'
                              : ''
                          "
                          @click="switchPairOut(item.index)"
                        >
                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{ item.matricule }}
                            </span>
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{
                                item.firstname[0].toUpperCase() +
                                item.firstname.slice(1)
                              }}
                            </span>
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{ item.lastname.toUpperCase() }}</span
                            >
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{ getShiftByIndex(item.shift_id) }}</span
                            >
                          </td>

                          <td>
                            <span
                              class="fullname"
                              :class="item.toSwitch ? 'switchPairSelected' : ''"
                              >{{ item.workingHours }}</span
                            >
                          </td>
                          <td>
                            <span
                              class="fullname action"
                              :class="
                                item.toSwitch
                                  ? 'switchPairSelected'
                                  : 'uncheckedAction'
                              "
                            ></span>
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
            <span
              v-if="!allDriverNext"
              class="total"
              :class="
                allDrivers.filter((e) => e.checked).length > 0
                  ? 'itsTheTotal'
                  : ''
              "
              :style="{
                color:
                  addDriversForSwitch &&
                  (allDrivers.filter((e) => e.checked).length <
                  addDriversForSwitch_number
                    ? 'red'
                    : 'green'),
              }"
            >
              TOTAL: ({{ allDrivers.filter((e) => e.checked).length
              }}{{
                addDriversForSwitch ? "/" + addDriversForSwitch_number : ""
              }})
            </span>
            <v-spacer></v-spacer>
            <v-btn
              density="default"
              class="backButton_all"
              @click="
                allDriverNext
                  ? addDriversForSwitch
                    ? backWhenSwitch()
                    : (allDriverNext = false)
                  : (changeDriver = false)
              "
              >{{ allDriverNext ? "BACK" : "CANCEL" }}</v-btn
            >
            <v-btn
              :style="{
                backgroundColor: addDriversForSwitch ? 'green' : '',
              }"
              density="default"
              class="nextButton_all"
              :disabled="
                allBothAddButton_switch
                  ? allDriverFilteredCheckedAllShifts.filter((e) => e.checked)
                      .length == 0
                  : allDriverFilteredChecked.filter((e) => e.checked).length ==
                    0
              "
              @click="
                allDriverNext
                  ? addDriversForSwitch
                    ? openSwitchMDialog()
                    : openAddDialog()
                  : addDriversForSwitch
                  ? switchNextInterface()
                  : (allDriverNext = true)
              "
              >{{
                allDriverNext
                  ? addDriversForSwitch
                    ? "SWITCH"
                    : "ADD"
                  : "NEXT"
              }}</v-btn
            >
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import draggable from "vuedraggable";
export default {
  name: "RTG Show Planning",
  emits: ["showNotificationClassSuccess", "showNotificationClassFailed"],
  props: ["actualShift", "selectedDate", "selectedPlanning", "ShiftIndex"],
  data() {
    return {
      equipmentEditCheckedForSwitchWith: null,
      equipmentEditCheckedForSwitch: null,
      selectedAlldriversShift: 0,
      thisPlanningBoxes: [],
      headers: [],
      saveDialogShow: false,
      confirmDialog: false,
      deleteDialog: false,
      switchDialog: false,
      addDialog: false,
      cancelDialog: false,
      editDriversEquipmentsDialog: false,
      changeDriver: false,
      editMode: true,
      leftToBeInserted: [],
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
      selectedChangeEDSow: 1,
      driversInPlanningWithCheck: [],
      equipmentsInPlanningWithCheck: [],
      equipmentsNotInPlanningWithCheck: [],
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
    ]),
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
    ]),
    setEquipmentEditCheckedForSwitchWith(item) {
      this.equipmentEditCheckedForSwitchWith = item;
      return item;
    },
    removeEquipmentEditCheckedForSwitchWith() {
      this.equipmentEditCheckedForSwitchWith = null;
    },
    setEquipmentEditCheckedForSwitch(item) {
      if(this.equipmentEditCheckedForSwitch){
        this.equipmentEditCheckedForSwitch = null;
      }
      else{
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
      console.log("ss :", this.equipmentsNotInPlanningWithCheck);
      this.equipmentsNotInPlanningWithCheck = this.getEquipements.filter(
        (e) => {
          return (
            this.equipmentsInPlanningWithCheck.filter((c) => {
              console.log("ccc :", c.matricule);
              console.log("eee :", e.matricule);
              console.log(
                "c.matricule == e.matricule",
                c.matricule == e.matricule
              );
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
      this.editMode = !this.editMode;
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
      this.editDriversEquipmentsDialog = true;
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
            console.log("in the planing ", c);
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
        e.workingHours = e[0].workingHours;
        return e;
      }),
    ];
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
        text: this.getPlanningWithTheBoxes.planning_boxes[0][index].title,
        sortable: false,
        key:
          index + this.getPlanningWithTheBoxes.planning_boxes[0][index].title,
        align: "start",
        title: this.getPlanningWithTheBoxes.planning_boxes[0][index].title,
      });
    }
    this.leftToBeInserted = [
      Array(this.headers.length).fill({
        leftToIn: true,
        payload: null,
      }),
    ];
    this.selectedAlldriversShift = this.actualShift.id;
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
  components: {
    // Add your child components here
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
      content: "\F0157"; /* mdi-left-arrow icon */
      font-family: "Material Design Icons"; /* Ensure this matches your mdi font family */
      position: absolute;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px; /* Adjust size as necessary */
      font-weight: 100 !important;
    }
    .buttonIcon2::after {
      content: "\F0226"; /* mdi-left-arrow icon */
      font-family: "Material Design Icons"; /* Ensure this matches your mdi font family */
      position: absolute;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px; /* Adjust size as necessary */
      font-weight: 100 !important;
    }
    .buttonIcon3::after {
      content: "\F01B4"; /* mdi-left-arrow icon */
      font-family: "Material Design Icons"; /* Ensure this matches your mdi font family */
      position: absolute;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px; /* Adjust size as necessary */
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
        content: "\F0C5D"; /* mdi-left-arrow icon */
        font-family: "Material Design Icons"; /* Ensure this matches your mdi font family */
        position: absolute;
        right: 18px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px; /* Adjust size as necessary */
        font-weight: 100 !important;
      }
      .buttonIcon3::after {
        content: "\F06CC"; /* mdi-left-arrow icon */
        font-family: "Material Design Icons"; /* Ensure this matches your mdi font family */
        position: absolute;
        right: 18px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px; /* Adjust size as necessary */
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
      content: "\F090C"; /* mdi-left-arrow icon */
      font-family: "Material Design Icons"; /* Ensure this matches your mdi font family */
      position: absolute;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px; /* Adjust size as necessary */
      font-weight: 100 !important;
    }
    .buttonIcon2::after {
      content: "\F10E6"; /* mdi-left-arrow icon */
      font-family: "Material Design Icons"; /* Ensure this matches your mdi font family */
      position: absolute;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px; /* Adjust size as necessary */
      font-weight: 100 !important;
    }
    .buttonIcon3::after {
      content: "\F1862"; /* mdi-left-arrow icon */
      font-family: "Material Design Icons"; /* Ensure this matches your mdi font family */
      position: absolute;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px; /* Adjust size as necessary */
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
        content: "\F03EB"; /* mdi-left-arrow icon */
        font-family: "Material Design Icons"; /* Ensure this matches your mdi font family */
        position: absolute;
        left: 18px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px; /* Adjust size as necessary */
        font-weight: 100 !important;
      }
      .buttonIcon2::after {
        content: "\F1A3F"; /* mdi-left-arrow icon */
        font-family: "Material Design Icons"; /* Ensure this matches your mdi font family */
        position: absolute;
        left: 18px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px; /* Adjust size as necessary */
        font-weight: 100 !important;
      }
      .buttonIcon3::after {
        content: "\F1861"; /* mdi-left-arrow icon */
        font-family: "Material Design Icons"; /* Ensure this matches your mdi font family */
        position: absolute;
        left: 18px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px; /* Adjust size as necessary */
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
    content: "\F0193" !important; /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important; /* Ensure this matches your mdi font family */
    position: absolute !important;
    right: 18px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 20px !important; /* Adjust size as necessary */
    font-weight: 100 !important;
  }
  .buttonIcon3::after {
    content: "\F06CC" !important; /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important; /* Ensure this matches your mdi font family */
    position: absolute !important;
    right: 18px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 20px !important; /* Adjust size as necessary */
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
  * {
  }
  .buttonIcon1::after {
    content: "\F0156" !important; /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important; /* Ensure this matches your mdi font family */
    position: absolute !important;
    left: 18px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 20px !important; /* Adjust size as necessary */
    font-weight: 100 !important;
  }
  .buttonIcon2::after {
    content: "\F1A3F" !important; /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important; /* Ensure this matches your mdi font family */
    position: absolute !important;
    left: 18px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 20px !important; /* Adjust size as necessary */
    font-weight: 100 !important;
  }
  .buttonIcon3::after {
    content: "\F1861" !important; /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important; /* Ensure this matches your mdi font family */
    position: absolute !important;
    left: 18px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 20px !important; /* Adjust size as necessary */
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
  span:not(.workingHours):not(.otherShift)::after {
    content: "\F0CB6" !important; /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important; /* Ensure this matches your mdi font family */
    position: absolute !important;
    right: 4px !important;
    top: 14px !important;
    transform: translateY(-50%) !important;
    font-size: 20px !important; /* Adjust size as necessary */
    font-weight: 100 !important;
  }
  span:not(.workingHours):not(.otherShift):hover {
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

  .addDriverButton:not(.workingHours):hover {
    opacity: 0.8;
    transform: translateY(-5%);
  }
  .addDriverButton:not(.workingHours):active {
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

  .selectEquipButton:not(.workingHours):hover {
    opacity: 0.8;
    transform: translateY(-5%);
  }
  .selectEquipButton:not(.workingHours):active {
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
  content: "\F17A4" !important; /* mdi-left-arrow icon */
  font-family: "Material Design Icons" !important; /* Ensure this matches your mdi font family */
  position: absolute !important;
  right: 10% !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  font-size: 15px !important; /* Adjust size as necessary */
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
    content: "\F05E1" !important; /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important; /* Ensure this matches your mdi font family */
    position: absolute !important;
    right: 39% !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 42px !important;
    font-weight: 100 !important;
    color: #ffffff;
  }
  .uncheckedAction::after {
    content: "\F043D" !important; /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important; /* Ensure this matches your mdi font family */
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
    content: "\F05E1" !important; /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important; /* Ensure this matches your mdi font family */
    position: absolute !important;
    right: 39% !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    font-size: 42px !important;
    font-weight: 100 !important;
    color: #ffffff;
  }
  .uncheckedAction::after {
    content: "\F043D" !important; /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important; /* Ensure this matches your mdi font family */
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
.confirmIconText {
  color: #4f7cac;
}
.actionHolder2:hover {
  span {
    background-color: rgba(255, 0, 0, 0.384) !important;
  }
  .action::after {
    content: "\F0156" !important; /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important; /* Ensure this matches your mdi font family */
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
    content: "\F0156" !important; /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important; /* Ensure this matches your mdi font family */
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
    content: "\F04E1" !important; /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important; /* Ensure this matches your mdi font family */
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

.cancelX {
}
.cancelX:hover {
}

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
    content: "\F04E1" !important; /* mdi-left-arrow icon */
    font-family: "Material Design Icons" !important; /* Ensure this matches your mdi font family */
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
  max-height: 60vh !important;
  min-height: 60vh !important;
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
.UpSpan {
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
.equipmentEditMaster {
  .speadForEdit{
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
    cursor: pointer;
    user-select: none;
  }
  .cancelEquipment {
    color: #ffffff4f !important;
    hr {
      border-color: #ffffff4f !important;
    }
  }
  .switchEquipment {
    color: white;
    hr {
      border-color: white;
    }
  }
  .switchEquipment::after {
    content: "\F0A50" !important;
    font-family: "Material Design Icons" !important;
    position: absolute !important;
    right: 1% !important;
    top: 41% !important;
    transform: translateY(-50%) !important;
    font-size: 38px !important;
    font-weight: 100 !important;
  }
  .switchEquipment:hover {
    color: #00a6fb;
    text-shadow: 0px 0px 1px #f5f5f5;
    transform: translateY(-5%);
    hr {
      border-color: #00a6fb;
    }
  }
  .switchEquipment:active {
    transform: translateY(10%);
    opacity: 0.4;
  }
  .cancelEquipment:hover {
    color: white;
    text-shadow: 0px 0px 1px #f5f5f5;
    transform: translateY(-5%);
    hr {
      border-color: white;
    }
  }
  .cancelEquipment:active {
    transform: translateY(10%);
    opacity: 0.4;
  }
  .switchEquipmentIn {
    display: inline-block;
    /* height: 100%; */
    width: 100%;
    writing-mode: vertical-rl;
    font-size: 56px;
    transform: scaley(2.5) skewY(21deg);
    /* text-align: center; */
    padding-top: 37px;
    letter-spacing: 8px;
    text-orientation: mixed;
  }
  .switchEquipmentInContainer {
    background-color: #0c243f;
    padding: 0 !important;
  }
  .equipmentOutRow {
    .switchEquipmentInContainer {
      background-color: #800016;
      padding-top: 99px !important;
    }
    .fullname {
      background-color: #271b1bc7 !important;
    opacity: 0.7;
    color: rgb(196 113 113);
    }
    .fullname:hover {
      color: white;
    }
    .checkForIn {
      background-color: #002855 !important;
    }

    .checkedDriverText {
      background-color: #0c243f !important;
    }
  }
  .equipmentInRow {
    span{
      transform: translateY(0%) !important;
    }
    span:hover{
      transform: translateY(0%) !important;
    }
    div{
      transform: translateY(0%) !important;
    }
    div:hover{
      transform: translateY(0%) !important;
    }
    .switchEquipmentInContainer {
      padding-top: 99px !important;
    }
    span:not(.switchEquipmentIn):not(.checkForSwitchThis):not(.checkForSwitchWith){
      transition: all 0.3s ease;

      padding-top: 16px !important;
    }
    .checkForSwitchThisHide{
      height: 0% !important;
      opacity: 0 ;
      padding: 0 !important;
    }
    .checkForSwitchThis {
      background-color: #002855;
    transform: translateY(-5%);
    padding-top: 0px !important;
    height: 35% !important;
    opacity: 1 !important;
    position: relative;
    text-align: left !important;
    padding-left: 9px !important;
    color: #f10019;
    border-bottom: 1px solid #fd0000 !important;
      font-size: 22px !important;
    }
    .checkForSwitchThis::after {
      content: "\f005e" !important;
    font-family: "Material Design Icons" !important;
    position: absolute !important;
    right: 2% !important;
    bottom: -109% !important;
    transform: translateY(-50%) !important;
    font-size: 34px !important;
    font-weight: 100 !important;
    }
    .checkForSwitchWith {
      background-color: #002855;
    transform: translateY(-5%);
    padding-top: 12px !important;
    height: 65% !important;
    opacity: 1 !important;
    display: inline-block;
    font-size: 35px;
    color: white;
    font-family: sans-serif;
    text-align: center;
    user-select: none;
    position: relative;
    width: 100%;
    font-weight: bold;
    position: relative;
    text-align: right  !important;
    padding-right: 11px  !important;
    border-top:none !important ;
    }
    .checkForSwitchThis:hover {

    border-bottom:none !important ;
    }
    .checkForSwitchWith:hover {

    border-top:none !important ;
    }
    .actionHolder:hover{
      border: 1px solid white !important;
      .checkForSwitchThis {
        border-left: 1px solid white !important;
        border-top: 1px solid white !important;
        border-bottom: 1px solid rgba(225, 14, 14, 0.545) !important;

      }
    }
    .checkForSwitchWith::after {
      content: "\F072E" !important;
    font-family: "Material Design Icons" !important;
    position: absolute !important;
    left: 3% !important;
    bottom: -87% !important;
    transform: translateY(-50%) !important;
    font-size: 57px !important;
    font-weight: 100 !important;
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
  .equipmentEditMaster .switchEquipmentIn{
    transform: scaleY(1.5) skewY(21deg) rotateY(-180deg) translateY(-30px) translateX(11px) !important;
    padding-top: 0px !important;
}
}
</style>
