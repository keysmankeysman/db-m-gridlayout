<template>
  <v-app>
    <Aside v-if="$route.path !== '/login'">

    </Aside>
    <Header v-if="$route.path !== '/login'">

    </Header>
		<v-main>
			<v-fade-transition>
				<router-view/>
			</v-fade-transition>
		</v-main>
  </v-app>
</template>

<script>
import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  mounted() {

  },
  components: {
			Header,
			Aside,
  }
};
</script>
