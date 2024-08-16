import type { NavigationFailure } from "vue-router";

export const useQuery = () => {
  const router = useRouter();
  const route = useRoute();

  // get query by key
  const getQuery = (key: string): string => {
    return route.query?.[key] ? route.query?.[key]!.toString() : "";
  };

  // add query by key and value
  const addQuery = (
    key: string,
    value: string | null
  ): Promise<void | NavigationFailure> => {
    if (value === null) {
      return removeQuery(key);
    }
    let newQuery = { ...route.query };
    if (route.query[key]) {
      newQuery[key] = value;
    } else {
      newQuery = { ...newQuery, [key]: value };
    }
    return router.replace({ query: newQuery });
  };

  // remove query from url by key or array of keys
  const removeQuery = (key: string | string[]): Promise<void> => {
    const newQuery = { ...route.query };
    if (!Array.isArray(key)) {
      key = [key];
    }
    key.forEach((eKey) => {
      delete newQuery[eKey];
    });
    if (
      Object.keys(newQuery).sort().toString() ===
      Object.keys(route.query).sort().toString()
    ) {
      return new Promise((resolve) => resolve());
    }
    return router.replace({ query: newQuery }).then();
  };

  return {
    getQuery,
    addQuery,
    removeQuery,
  };
};
