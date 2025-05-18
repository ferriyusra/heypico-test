import axios from 'axios';
import { config } from '../../config';

class MapsService {
	constructor() {}

	async generate(
		llmOutput: string
	): Promise<
		{ name: string; location: string; link: string; iframe?: string }[]
	> {
		const mapsApiKey = config.maps.apiKey;
		const lines = llmOutput
			.split('\n')
			.filter((line) => /^\d+\./.test(line.trim()));

		const promises = lines.map(async (line) => {
			const match = line.match(
				/^\d+\.\s+\*\*(.+?)\*\*.*?:.*?di\s+(.+?)(\.|$)/i
			);
			if (match) {
				const name = match[1].trim();
				const location = match[2].trim();
				const fullAddress = `${name} ${location}`;

				try {
					const response = await axios.get(
						`https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}`,
						{
							params: {
								key: mapsApiKey,
							},
						}
					);

					const results = response.data.results;
					if (results && results.length > 0) {
						const { lat, lng } = results[0].geometry.location;
						const formattedAddress = results[0].formatted_address;
						const link = `https://www.google.com/maps?q=${lat},${lng}&hl=id`;
						const iframe = `<iframe width="600" height="450" style="border:0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${lat},${lng}"></iframe>`;

						return { name, location: formattedAddress, link, iframe };
					}
				} catch (error) {
					// fallback kalau gagal geocoding
					const searchQuery = encodeURIComponent(fullAddress);
					const link = `https://www.google.com/maps/search/${searchQuery}`;
					return { name, location, link };
				}

				// fallback kalau geocoding tidak dapat hasil
				const searchQuery = encodeURIComponent(fullAddress);
				const link = `https://www.google.com/maps/search/${searchQuery}`;
				return { name, location, link };
			}

			return null;
		});

		const results = await Promise.all(promises);

		return results.filter(
			(
				r
			): r is {
				name: string;
				location: string;
				link: string;
				iframe?: string;
			} => r !== null
		);
	}
}

export default MapsService;
