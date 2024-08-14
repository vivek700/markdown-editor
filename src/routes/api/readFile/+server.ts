import { read } from '$app/server';
import { json } from '@sveltejs/kit';
import file from '../../../../static/tempMd.txt';

export async function GET() {
	try {
		const fileContent = read(file);
		const text = await fileContent.text();
		return json({ content: text });
	} catch (error) {
		console.error('Error reading file:', error);
		return json({ error: 'Failed to read file' }, { status: 500 });
	}
}
