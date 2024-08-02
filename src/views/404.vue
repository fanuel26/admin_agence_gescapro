<template>
	<a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
		<template #extra>
			<router-link class="ant-btn ant-btn-primary" :to="{name: 'Logout'}">Retour au dashboard</router-link>
		</template>
	</a-result>
</template>