<script>
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	let markdown = 'Write something here...';
	let html = '';
	let selectedOption = 'Preview';

	onMount(() => {
		const savedMarkdown = localStorage.getItem('markdown');
		if (savedMarkdown) {
			markdown = savedMarkdown;
			updatePreview();
		}
	});

	function saveToLocalStorage() {
		localStorage.setItem('markdown', markdown);
	}

	async function updatePreview() {
		let options = {
			gfm: true
		};

		html = await marked.parse(markdown, options);
	}

	function exportToHTML() {
		const blob = new Blob([html], { type: 'type/html' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'markdown.html';
		link.click();
		URL.revokeObjectURL(url);
	}

	$: updatePreview();
</script>

<h1 class="text-slate-50 text-center">Markdown Editor</h1>

<section class="flex flex-col md:flex-row justify-around mt-4">
	<section class="md:w-5/12 w-10/12 self-center md:self-auto">
		<button
			on:click={exportToHTML}
			class="bg-fuchsia-800 text-slate-100 p-2 mb-2 mt-1 rounded text-sm">Export to HTML</button
		>
		<textarea
			bind:value={markdown}
			on:input={saveToLocalStorage}
			on:input={updatePreview}
			rows="30"
			name="text"
			class="font-sans text-sm w-full h-full p-2 bg-slate-950 text-slate-100 border-none outline outline-1 outline-slate-700 rounded"
		></textarea>
	</section>
	<section class="md:w-5/12 w-10/12 self-center md:self-auto">
		<select
			bind:value={selectedOption}
			name="choice"
			class="text-slate-100 bg-slate-950 font-sans py-1 mb-2 mt-3 cursor-pointer"
		>
			<option value="Preview">Preview</option>
			<option value="HTML Source">HTML Source</option>
		</select>
		<div
			class="w-full h-full rounded outline outline-1 outline-slate-700 bg-slate-950 text-slate-100 p-2 font-sans overflow-auto"
		>
			{#if selectedOption === 'Preview'}
				{@html html}
			{:else}
				{html}
			{/if}
		</div>
	</section>
</section>

<style lang="postcss">
	:global(html) {
		background-color: rgb(20, 20, 32);
	}
</style>
