import { DEFAULT_ENTITY_FILTERS } from "./constants";
import { DefaultFilter } from "./types";

/**
 * Returns the default filters for the given entity, or undefined if none are configured.
 * @param entityListType - Entity list type.
 * @returns default filters, or undefined.
 */
export function getDefaultFilters(
  entityListType: string
): DefaultFilter[] | undefined {
  return DEFAULT_ENTITY_FILTERS[entityListType];
}

/**
 * Returns true if the default filters have already been applied for the given entity in this session.
 * @param entityListType - Entity list type.
 * @returns true if defaults were already applied.
 */
export function hasAppliedDefaults(entityListType: string): boolean {
  return (
    sessionStorage.getItem(`defaultFiltersApplied_${entityListType}`) !== null
  );
}

/**
 * Returns true if the current URL contains an explicit filter query param.
 * Uses window.location directly — safe because this is only called inside a
 * useEffect (always client-side, never during SSR).
 * @returns true if URL has a filter param.
 */
export function hasUrlFilterParam(): boolean {
  return new URLSearchParams(window.location.search).has("filter");
}

/**
 * Marks the default filters as applied for the given entity in this session.
 * @param entityListType - Entity list type.
 */
export function markDefaultsApplied(entityListType: string): void {
  sessionStorage.setItem(`defaultFiltersApplied_${entityListType}`, "true");
}
