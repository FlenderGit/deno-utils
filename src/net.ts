export function create_url_generator(base_url: string) {
  return {
    generate_url: (endpoint: string, params?: Record<string, string>) => {
      const cleanEndpoint = endpoint.startsWith("/")
        ? endpoint.slice(1)
        : endpoint;
      const url = new URL(base_url + cleanEndpoint);
      if (params) {
        Object.entries(params).forEach(([k, v]) =>
          url.searchParams.append(k, v)
        );
      }
      return url;
    },
  };
}
