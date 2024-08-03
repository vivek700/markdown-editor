<script>
	let markdown = 'Write something here...';
	let html = '';

	// $: console.log(markdown);
</script>

<section class="flex justify-between text-slate-300 mt-4 mx-2">
	<section class="w-6/12">
		<textarea bind:value={markdown} rows="30" name="text" class="bg-slate-950 w-full"></textarea>
	</section>
	<section class="w-5/12">preview</section>
</section>

<style lang="postcss">
	:global(html) {
		background-color: rgb(20, 20, 32);
	}
</style>
