<script>
	import hljs from 'highlight.js';
	import { marked } from 'marked';
	import 'highlight.js/styles/github.css';

	let markdown = 'Write something here...';
	let html = '';

	async function updatePreview() {
		let options = {
			gfm: true
		};

		html = await marked.parse(markdown, options);
	}
	$: updatePreview();
</script>

<h1 class="text-slate-50 text-center">Markdown Editor</h1>

<section class="flex justify-around mt-4">
	<section class="w-5/12">
		<button class="bg-fuchsia-800 text-slate-100 p-2 mb-2 mt-1 rounded text-sm"
			>Export to HTML</button
		>
		<textarea
			bind:value={markdown}
			on:input={updatePreview}
			rows="30"
			name="text"
			class="font-sans text-sm w-full h-full p-2 bg-slate-950 text-slate-100 border-none outline outline-1 outline-slate-700 rounded"
		></textarea>
	</section>
	<section class="w-5/12">
		<p class="text-slate-100 font-sans py-3 m-0">Preview:</p>
		<div
			class="w-full h-full rounded outline outline-1 outline-slate-700 bg-slate-950 text-slate-100 p-2 font-sans overflow-auto"
		>
			{@html html}
		</div>
	</section>
</section>

<style lang="postcss">
	:global(html) {
		background-color: rgb(20, 20, 32);
	}
</style>
