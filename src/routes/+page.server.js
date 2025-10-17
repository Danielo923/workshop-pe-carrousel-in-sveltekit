export const load = async () => {
    const endpoint = 'https://fdnd.directus.app/items/fdnd_features'

    const response = await fetch(endpoint);
    const data = await response.json();

    return {
      features: data.data
    }
}