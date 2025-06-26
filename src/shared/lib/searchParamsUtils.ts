export function combineURLSearchParams(searchParams: URLSearchParams, newParams: Record<string, any>) {
	const url = new URLSearchParams(searchParams);

	Object.entries(newParams).forEach(([key, value]) => {
		url.set(key, String(value));
	});

	return url;
}
