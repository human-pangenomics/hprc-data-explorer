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
 * Treats sessionStorage failures (e.g. disabled storage, Safari private mode) as "not applied".
 * @param entityListType - Entity list type.
 * @returns true if defaults were already applied.
 */
export function hasAppliedDefaults(entityListType: string): boolean {
  try {
    return (
      sessionStorage.getItem(`defaultFiltersApplied_${entityListType}`) !== null
    );
  } catch {
    return false;
  }
}

/**
 * Returns true if the current URL contains an explicit filter query param.
 * Safely returns false in non-browser environments (e.g. SSR/tests).
 * @returns true if URL has a filter param.
 */
export function hasUrlFilterParam(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return new URLSearchParams(window.location.search).has("filter");
}

/**
 * Marks the default filters as applied for the given entity in this session.
 * Silently no-ops if sessionStorage is unavailable.
 * @param entityListType - Entity list type.
 */
export function markDefaultsApplied(entityListType: string): void {
  try {
    sessionStorage.setItem(`defaultFiltersApplied_${entityListType}`, "true");
  } catch {
    // No-op if sessionStorage is unavailable.
  }
}
