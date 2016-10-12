<template>
	<div class="nav">
		<router-link :to="{name: 'settings'}">设置<router-link>
	</div>
</template>
<style>
</style>
<script>
	export default{
		data(){
			return{
				msg:'hello vue'
			}
		},
		mounted() {
			console.log('head');
		}
	}
</script>
