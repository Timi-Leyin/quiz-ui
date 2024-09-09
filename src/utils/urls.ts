export const getQueryParams = () => {
	const url = window.location.href;
	const [_, q] = url.split("?");
	const results: any = {};

	const queries = q.split("&");
	queries.forEach((query) => {
		const [key, value] = query.split("=");
		results[key] = value;
	});

    return results
};
