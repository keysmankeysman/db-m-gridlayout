<template>
  <v-app class="dashboard-gradient app-background--primary">
    <div data-app>
      <grid-layout
        :col-num="parseInt(colNum)"
        :is-draggable="draggable"
        :is-mirrored="mirrored"
        :is-resizable="resizable"
        :layout.sync="diagrams"
        :prevent-collision="preventCollision"
        :responsive="responsive"
        :row-height="rowHeight"
        :use-css-transforms="true"
        :vertical-compact="true"
      >
        <grid-item
          :h="item.h"
          :i="item.i"
          :is-draggable="isEdit && item.draggable"
          :is-resizable="isEdit && item.resizable"
          :key="item.id"
          :minH="
            item.graphType == 'counter' ||
            item.graphType == 'pulse' ||
            item.graphType == 'grid'
              ? 3
              : item.graphType == 'pie' || item.graphType == 'donut'
              ? 9
              : 6
          "
          :minW="
            item.graphType == 'counter' || item.graphType == 'pulse' ? 1 : 3
          "
          :static="item.static"
          :w="item.w"
          :x="item.x"
          :y="item.y"
          @moved="updateDiagram(item, index)"
          @resized="updateDiagram(item, index)"
          style="overflow: hidden"
          v-for="(item, index) of diagrams"
        >
        <div :key="item.updateKey" style="height: 100%">
            <div
              v-if="
                !$store.state.periodsInt.find((el) => {
                  return item.periodId == el.id;
                })
              "
              class="text-center align-center"
              v-bind:style="{ marginTop: (item.h / 2) * 40 + 'px' }"
            >
              <div
                class="actions"
                style="position: absolute; top: 3px; right: 3px"
                v-show="isEdit"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn @click="editDiagram(item.diagramId)" icon v-on="on">
                      <ion-icon name="settings-outline"></ion-icon>
                    </v-btn>
                  </template>
                  <span>Редактировать</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn @click="showDeleteWarning(item.id)" icon v-on="on">
                      <ion-icon name="trash-outline"></ion-icon>
                    </v-btn>
                  </template>
                  <span>Удалить</span>
                </v-tooltip>
              </div>
              <v-progress-circular
                :size="70"
                :width="7"
                color="#4d85fd"
                indeterminate
              ></v-progress-circular>
            </div>

            <DashTable
              :isEdit="isEdit"
              :itemsPerPage="item.data ? item.data.length : 5"
              :tableHeaders="item.headers"
              :tableItems="item.data"
              :key="item.updateKey"
              :selectDash="selectDash"
              :resourceId="item.resourceId"
              :typeId="item.typeId"
              :tableTitle="{
                show: true,
                text: item.name,
                subtitle: getItemPeriodText(item),
              }"
              @saveFraudDiagram="saveFraudDiagram(item)"
              @onChangeSelect="onChangeSelect($event)"
              @delete-diagram="showDeleteWarning(item.id)"
              @edit-diagram="editDiagram(item.diagramId)"
              @copy-diagram="openDiagramCopyDialog(item.diagramId)"
              v-if="
                item.graphType === 'grid' &&
                $store.state.periodsInt.find((el) => {
                  return item.periodId == el.id;
                })
              "
            />
          </div>
        </grid-item>
      </grid-layout>
    </div>
  </v-app>
</template>

<script>
import GridLayout from "@/components/DraggableGrid/GridLayout.vue"
import GridItem from "@/components/DraggableGrid/GridItem.vue"
import localDiagrams from '@/localData/diagrams.js'
import DashTable from '@/components/tables/DashTable.vue'

  export default {
    name: 'Dashboard',
    data() {
      return {
        colNum: 12,
        draggable: true,
        resizable: true,
        mirrored: false,
        diagrams: localDiagrams,
        preventCollision: false,
        responsive: true,
        rowHeight: 45,
        isEdit: false,
        selectDash: 'Все'
      }
    },
    components: {
      GridLayout,
      GridItem,
      DashTable
    },
    methods: {
      getItemPeriodText(item) {
      if (item.dateFrom) {
        return `С ${this.$moment(item.dateFrom, "DD.MM.YYYY HH:mm:ss").format(
          "DD.MM.YYYY HH:mm"
        )} по ${this.$moment(item.dateTo, "DD.MM.YYYY HH:mm:ss").format(
          "DD.MM.YYYY HH:mm"
        )}`;
      } else {
        return this.$store.state.periodsInt.find((el) => {
          return item.periodId == el.id;
        }).name;
      }
    },
    }

  }
</script>
