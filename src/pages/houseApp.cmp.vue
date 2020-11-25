

<template>
	<section class="house-app main-layout">
		<h1>houses</h1>
		<houseFilter @updateFilter="updateFilter" />
        <!-- <pre>{{houses}}</pre> -->
		<houseList
			v-if="houses"
			:houses="houses"
		/>
	</section>
</template>

<script>
import houseList from "@/cmps/houseList.cmp.vue";
import houseFilter from "@/cmps/houseFilter.cmp.vue";

export default {
	
	computed: {
		houses() {
            return this.$store.getters.getHouses;
        }
	},
	methods: {
		updateFilter(filter) {
			this.$store.dispatch({ type: "updateFilter", filterBy });
		}
	},
	components: {
		houseList,
		houseFilter,
	},
	created() {
		this.$store.dispatch({ type: "loadHouses" });
	},
};
</script>

