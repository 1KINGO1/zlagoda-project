export const setURLSearchParams = (url: URL, params: object) => {
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && typeof value !== 'function') {
      url.searchParams.set(key, value.toString())
    }
  }
}
