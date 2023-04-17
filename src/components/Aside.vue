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
        {
          title: 'Организация',
          href: '/organization',
          icon: 'business-outline',
          accessProp: 'organizationPage'
        },
        {
          title: 'Отчеты',
          href: '/reports',
          icon: 'document-outline',
          accessProp: 'reports'
        }
      ]
    }),
    methods: {
      signOut() {
        console.log('анлогин')
        this.$router.push('/login')
      }
    }
  }
</script>
