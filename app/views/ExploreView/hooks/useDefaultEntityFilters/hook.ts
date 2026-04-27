import { useExploreState } from "@databiosphere/findable-ui/lib/hooks/useExploreState";
import { ExploreActionKind } from "@databiosphere/findable-ui/lib/providers/exploreState";
import { useEffect } from "react";
import {
  getDefaultFilters,
  hasAppliedDefaults,
  hasUrlFilterParam,
  markDefaultsApplied,
} from "./utils";

/**
 * Applies default filters on first visit to an entity tab per browser session.
 * Checks sessionStorage to avoid reapplying after the user has interacted with filters.
 * Respects explicit URL filter params (direct links).
 * @param entityListType - Entity list type.
 */
export function useDefaultEntityFilters(entityListType: string): void {
  const { exploreDispatch } = useExploreState();

  useEffect(() => {
    const defaults = getDefaultFilters(entityListType);
    if (!defaults) return;
    if (hasAppliedDefaults(entityListType)) return;
    if (hasUrlFilterParam()) return;

    for (const { categoryKey, value } of defaults) {
      exploreDispatch({
        payload: {
          categoryKey,
          selected: true,
          selectedValue: value,
        },
        type: ExploreActionKind.UpdateFilter,
      });
    }

    markDefaultsApplied(entityListType);
  }, [entityListType, exploreDispatch]);
}
