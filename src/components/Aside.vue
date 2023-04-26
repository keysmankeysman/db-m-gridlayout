<template>
  <v-navigation-drawer
		:permanent="true"
		app
	>
    <v-list>
        <v-list-item
          v-for="link in getAccessLinks"
          :key="link.title"
          :to="link.href"
          class="text-decoration-none"
          link
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ link.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list-item @click="signOut" class="menu-list__item">
        <v-list-item-title>
          Выход из системы
        </v-list-item-title>
      </v-list-item>

  </v-navigation-drawer>
</template>

<script>

  export default {
    name: 'Aside',

    data: () => ({
      getAccessLinks: [
        {
          title: 'Главный экран',
          href: '/dashboard',
          icon: 'home-outline',
          accessProp: 'homePage'
        },
        {
          title: 'В реальном времени',
          href: '/realtime',
          icon: 'analytics-outline',
          accessProp: 'realTimePage'
        },
        // {
        //   title: 'Организация',
        //   href: '/organization',
        //   icon: 'business-outline',
        //   accessProp: 'organizationPage'
        // },
        {
          title: 'Отчеты',
          href: '/reports',
          icon: 'document-outline',
          accessProp: 'reports'
        }
      ],
      links: [
        {title: "Главный экран", href: "/dashboard", icon: "home-outline", accessProp: "homePage"},
        {title: "В реальном времени", href: "/realtime", icon: "analytics-outline", accessProp: "realTimePage"},
        {title: "Организация", href: "/organization", icon: "business-outline", accessProp: "organizationPage"},
        {title: "IP-адреса", href: "/ipaddress", icon: "book-outline", accessProp: "ipAddresses"},
        {title: "Домены", href: "/domains", icon: "server-outline", accessProp: "domains"},
        {title: "Сервисы", href: "/services", icon: "layers-outline", accessProp: "categorization"},
        {title: "BGP AS", href: "/asn", icon: "grid-outline", accessProp: "bgpAs"},
        {title: "Клиенты", href: "/clients", icon: "people-outline", accessProp: "clients", visibleByDefault: true},
        {title: "Настройки", href: "/settings", icon: "cog-outline", accessProp: "settings", visibleByDefault: true},
        {title: "Отчеты", href: "/reports", icon: "document-outline", accessProp: "reports"},
        {title: "Учёт потребления продуктов", href: "/reports", icon: "document-outline", accessProp: "reports"}

          // {title: "Профиль", href: "/", icon: "mdi-shield-account"},
      ],
    }),
    methods: {
      signOut() {
        console.log('анлогин')
        this.$router.push('/login')
      }
    },
    created() {
      console.log(this.$router.getRoutes())
    },
    computed: {
      // accessRoutes() {

        // return this.$store.getters["auth/authTokenItems"].admin ? this.$store.getters["auth/getAccessRoutes"] : this.$router.getRoutes().filter(route => this.$store.getters["auth/authTokenItems"].page.includes(route.path))
      // },
      // getAccessLinks() {
      //   return this.links.filter(link => {
      //     return this.accessRoutes.find(el => el.path === link.href)
      //   })
      // }
    }
  }
</script>
