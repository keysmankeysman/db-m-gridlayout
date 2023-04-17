<template>

    <v-card
            :height="componentHeight ? componentHeight : 'auto'"
            class="border-0 custom-scroll"
            color="secondary"
            outlined
            rounded
            style="padding: 0px 20px 20px 20px; overflow: auto;"
    >
        <div class="actions"
             style="
        position: absolute;
        top: 3px;
        right: 3px;
      "
             v-show="isEdit"
        >
            <v-tooltip bottom v-if="$route.name === 'ReportCategories'">
                <template v-slot:activator="{ on }">
                    <v-btn
                            @click="$emit('edit-diagram-categories')"
                            icon
                            link
                            v-on="on"
                    >
                        <ion-icon
                                class="item-icon"
                                name="settings-outline"
                        />
                    </v-btn>
                </template>
                <span>Редактировать</span>
            </v-tooltip>

            <v-tooltip bottom v-if="$route.name !== 'ReportCategories'">
                <template v-slot:activator="{ on }">
                    <v-btn
                            @click="$emit('edit-diagram')"
                            icon
                            link
                            v-on="on"
                    >
                        <ion-icon
                                class="item-icon"
                                name="settings-outline"
                        />
                    </v-btn>
                </template>
                <span>Редактировать</span>
            </v-tooltip>


            <v-tooltip bottom v-if="$route.name !== 'ReportCategories'">
                <template v-slot:activator="{ on }">
                    <v-btn
                            @click="$emit('copy-diagram')"
                            icon
                            link
                            v-on="on"
                    >
                        <ion-icon name="copy-outline"></ion-icon>
                    </v-btn>
                </template>
                <span>Копировать</span>
            </v-tooltip>

            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn
                            @click="$emit('delete-diagram')"
                            icon
                            link
                            v-on="on"
                    >
                        <ion-icon
                                class="item-icon"
                                name="trash-outline"
                        />
                    </v-btn>
                </template>
                <span>Удалить</span>
            </v-tooltip>
        </div>

        <!-- {{tableTitle}} -->
        <v-card-title
                class="pb-0 pt-3 px-0 dashtable-title"
                v-if="tableTitle.show"
        >
            <div>
                {{tableTitle.text}}
            </div>
        </v-card-title>

        <v-data-table
                :headers="getHeaderNames"
                :height="height"
                :hide-default-footer="disableFooter"
                :hide-default-header="disableHeader"
                :items="tableItems"
                :items-per-page="itemsPerPage"
                :no-data-text="'Нет данных для отображения'"
                class="elevation-0 border-0 tab-v-data-table app-background--secondary no-border-tr"
                fixed-header
        >
          <template v-slot:header.bytesTotal="props">
              <span v-if="props.header.unit">
                {{`${props.header.text}, ${props.header.unit}`}}
              </span>
            <span v-if="!props.header.unit">
                {{`${props.header.text}`}}
              </span>
          </template>

          <template v-slot:header.bytesIn="props">
              <span>
                {{`${props.header.text}, ${props.header.unit}`}}
              </span>
          </template>

          <template v-slot:header.bytesOut="props">
                <span>
                  {{`${props.header.text}, ${props.header.unit}`}}
                </span>
          </template>


          <template v-slot:header.asn="props">
        <span
                class="mx-5 header-item"
        >{{props.header.text}}</span>
            </template>

            <template v-slot:header.clientAsn="props">
        <span
                class="mx-5 header-item"
        >{{props.header.text}}</span>
            </template>

            <template v-slot:header.bwTotal="props">
        <span
                class="header-item"
        >{{props.header.text}}</span>
            </template>

            <template
                    v-if="tableTitle.show"
                    v-slot:top
            >
              <div style="display: flex; justify-content: space-between">
                <div class="table-row__unit" style="width: 33%; margin-bottom: 10px;">
                  <v-select
                      v-if="typeId === 13 && resourceId === 32"
                      background-color="input_bg"
                      class="unit-traffic table-item"
                      color="secondary"
                      dense
                      flat
                      hide-details
                      item-color="primary_text"
                      v-model="select"
                      :items="selectFraud"
                      menu-props="bottom,offsetY"
                      @change="onChangeSelect"
                      solo
                  />
                </div>

                <v-subheader
                        style="width: 33%"
                        class="px-0 dashtable-subheader"
                        v-if="tableTitle.subtitle"
                >{{tableTitle.subtitle}}
                </v-subheader>
                <div style="width: 33%"></div>
              </div>


            </template>

            <template
                    v-slot:item.bytesIn="props"
            >
        <span
                class="body-item justify-end"
        >
          {{$Util.parseTableBytesNumber(props.item.bytesIn)}}
            <!-- {{$Util.parseTableBytesNumber(props.item.bytesIn / props.header.unit)}}
            {{props.header.unit == 1 ? ' Мбайт' : ' Гбайт'}} -->
        </span>
            </template>

            <template
                    v-slot:item.bytesOut="props"
            >
        <span
                class="body-item justify-end"
        >
          {{$Util.parseTableBytesNumber(props.item.bytesOut)}}
            <!-- {{$Util.parseTableBytesNumber(props.item.bytesOut / props.header.unit)}}
            {{props.header.unit == 1 ? ' Мбайт' : ' Гбайт'}} -->
        </span>
            </template>
            <template
                    v-slot:item.bytesTotal="props"
            >
        <span
                class="body-item justify-end"
        >
          {{$Util.parseTableBytesNumber(props.item.bytesTotal)}}
            <!-- {{$Util.parseTableBytesNumber(props.item.bytesTotal / props.header.unit)}}
            {{props.header.unit == 1 ? ' Мбайт' : ' Гбайт'}} -->
        </span>
            </template>

            <template
                    v-slot:item.bwTotal="props"
            >
        <span
                class="body-item"
        >
          {{$Util.parseTableBytesNumber(props.item.bwTotal)}}
        </span>
            </template>

            <template
                    v-slot:item.asn="props"
            >
                <v-tooltip
                        :disabled="!$Util.isOverflown($refs[`asn${props.item.id}`])"
                        bottom
                >
                    <template v-slot:activator="{ on }">
                        <router-link
                                :to="`/asn/${encodeURIComponent(props.item.asn)}`"
                                class="body-item"
                                style="cursor: pointer; color: #07a; text-decoration: underline;"
                        >
                            <country-flag
                                    :country="props.item.countryCode"
                                    rounded
                                    size='small'
                            />

                            <span
                                    class="tab-table-text-truncate"
                            >
                <div
                        :ref="`asn${props.item.id}`"
                        style="height: 20px;"
                        v-on="on"
                >{{props.item.asn}}</div>
              </span>
                        </router-link>
                    </template>
                    <span>{{ props.item.asn }}</span>
                </v-tooltip>
            </template>

            <template v-slot:item.clientAsn="props">
                <v-tooltip
                        :disabled="!$Util.isOverflown($refs[`clientAsn${props.item.id}`])"
                        bottom
                >
                    <template v-slot:activator="{ on }">
                        <router-link
                                :to="`/asn/${encodeURIComponent(props.item.clientAsn)}`"
                                class="body-item"
                                style="cursor: pointer; color: #07a; text-decoration: underline;"
                        >
                            <country-flag
                                    :country="props.item.countryCodeIn"
                                    rounded
                                    size='small'
                            />
                            <span
                                    class="tab-table-text-truncate"
                            >
                <div
                        :ref="`clientAsn${props.item.id}`"
                        style="height: 20px;"
                        v-on="on"
                >{{props.item.clientAsn}}</div>
              </span>
                        </router-link>
                    </template>
                    <span>{{ props.item.clientAsn }}</span>
                </v-tooltip>
            </template>

        </v-data-table>
        <downloadExcel :data="tableItems" :fields="getExcelHeaders">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                link
                v-on="on"
              >
                <ion-icon
                  name="download-outline"
                ></ion-icon>
              </v-btn>
            </template>
            <span>Скачать XLS</span>
          </v-tooltip>
        </downloadExcel>
    </v-card>
</template>

<script>
    export default {
      props: {
          selectDash: {
            type: String,
            default: null,
          },
          resourceId: {
            type: Number,
            default: null
          },
          typeId: {
            type: Number,
            default: null
          },
          componentHeight: {
              type: [String, Number],
              default: null
          },
          itemsPerPage: {
              type: [String, Number],
              default: 5
          },
          height: {
              type: [String, Number],
              default: ''
          },
          isEdit: {
              type: Boolean,
              default: false
          },

          tableHeaders: {
              type: Array,
              default: () => []
          },

          tableItems: {
              type: Array,
              default: () => []
          },

          disableHeader: {
              type: Boolean,
              default: false
          },

          disableFooter: {
              type: Boolean,
              default: true
          },
          /**`
           *  @param {Boolean} tableTitle.show
           *  @param {String} tableTitle.text
           *  @param {String} tableTitle.subtitle
           */
          tableTitle: {
              type: Object,
              default: () => {
              }
          }
      },
      data() {
        return {
          selectFraud: ['Все', 'Video streaming'],
          select: 'Все',
        }
      },
      computed: {
            /**
             *  Скрыть названия, если нет tableItems
             *  для красоты
             */
            getHeaderNames() {
                return this.tableItems.length ? this.tableHeaders : [];
            },
            getExcelHeaders () {
              let excelHeaders = {};

              this.getHeaderNames.forEach(row => {
                excelHeaders[row.text] = row.value;
              });

              return excelHeaders;
            }
        },
      methods: {
        onChangeSelect() {
          this.$emit('onChangeSelect', this.select)
          this.$emit('saveFraudDiagram')
        }
      },

      mounted() {
          this.tableItems.forEach((element, index) => {
              element.id = index;
          });
          this.select = this.selectDash
      }
    }
</script>

<style lang="scss" scoped>
    ion-icon {
        font-size: 20px;
    }

    .dashtable-title {
        font-size: 14px;
        font-weight: bold;
        display: flex;
        justify-content: center;
    }

    .dashtable-subheader {
        height: auto;
        margin-bottom: 10px;
        font-size: 12px;
        display: flex;
        justify-content: center;
    }

</style>
