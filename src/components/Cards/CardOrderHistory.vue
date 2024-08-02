<template>

	<!-- Orders History Timeline Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: '12px',}">
		<template #title>
			<h6>Carnets les plus vendus</h6>			
			<p>par jour</p>	
		</template>
		<a-timeline pending="Recording..." :reverse="timelineReverse">
			<a-timeline-item color="green">
				Carnet X - 00000000125
				<p>650 ventes</p>
			</a-timeline-item>
			<a-timeline-item color="green">
				Carnet A - 00000000145
				<p>630 ventes</p>
			</a-timeline-item>
			<a-timeline-item color="blue">
				Carnet Z - 00000000265
				<p>630 ventes</p>
			</a-timeline-item>
			<a-timeline-item color="blue">
				Carnet V - 00000000500
				<p>630 ventes</p>
			</a-timeline-item>
			<a-timeline-item color="blue">
				Carnet E - 00000000165
				<p>630 ventes</p>
			</a-timeline-item>
			<a-timeline-item color="gray">
				Carnet I - 00000000185
				<p>630 ventes</p>
			</a-timeline-item>
		</a-timeline>
	</a-card>
	<!-- / Orders History Timeline Card -->

</template>

<script>

	export default ({
		data() {
			return {

				// Whether or not the timeline in "Orders History" card is reversed.
				timelineReverse: false,
			}
		},
	})

</script>