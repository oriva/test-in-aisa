<template>
  <v-container>
    <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        :custom-filter="customFilter"
        hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
            dark
            color="blue darken-3"
            class="mb-1"
        >
          <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
          ></v-text-field>
          <v-col>
            <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="dates"
                transition="scale-transition"
                offset-y
                min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="dates"
                    label="Picker in menu"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="dates"
                  range
                  no-title
                  scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(dates)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
                v-model="sortDesc"
                mandatory
            >
              <v-btn
                  large
                  depressed
                  color="blue"
                  :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                  large
                  depressed
                  color="blue"
                  :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              sm="6"
              md="4"
              lg="3"
          >
            <v-card>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-1">
                    Brand: {{ item.brand }}
                  </div>
                  <v-list-item-subtitle>
                    date: {{ item.date }}
                  </v-list-item-subtitle>
                  <v-list-item-title class="headline mb-1">
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar
                    size="120"
                    tile>
                  <v-img
                      :src="item.picture"
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item>

            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row
            class="mt-2"
            align="center"
            justify="center"
        >
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
              class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
export default {
  name: 'CatalogPage',
  metaInfo: {
    title: 'Каталог',
  },
  data() {
    return {
      items: [],
      itemsPerPageArray: [4, 8, 12],
      search: '',
      dates: [],
      filter: {},
      menu: false,
      modal: false,
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'Title',
      keys: [
        'Title',
        'Brand',
        'Price',
        'Date',
      ]
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter(key => key !== 'Name')
    },
  },
  created() {
    this.$store.dispatch('setJsonCatalog', 'https://next.json-generator.com/api/json/get/4Jq5woxat').then(() => {
      this.items = this.$store.getters.catalog
    })
  },
  methods: {
    customFilter(items, search) {
      if (this.dates.length > 0) {
        this.dates.sort()
      }
      items = items.filter((item) => {
        let status = true;
        if (this.dates.length > 0) {
          let newDate = new Date(item.date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
          let secondDate = true;
          if(this.dates[1]) {
            secondDate = (new Date(this.dates[1]) > newDate)
          }
          status = new Date(this.dates[0]) < newDate && secondDate && item.title.includes(search);
        } else {
          status = item.title.includes(search)
        }
        return status;
      });
      return items
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    },
  }
}
</script>

<style lang="scss">
.v-data-iterator .v-text-field__details {
  display: none;
}
</style>