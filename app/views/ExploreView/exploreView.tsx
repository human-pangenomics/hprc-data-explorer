import {
  ExploreView as DXExploreView,
  ExploreViewProps,
} from "@databiosphere/findable-ui/lib/views/ExploreView/exploreView";
import type { JSX } from "react";
import { useDefaultEntityFilters } from "./hooks/useDefaultEntityFilters/hook";

/**
 * HPRC-specific wrapper around the findable-ui ExploreView.
 *
 * This component applies per-entity default filters on first visit to a tab
 * within a browser session. For example, the Assemblies and Annotations tabs
 * default to Release = 2, so users see the latest data without manual filtering.
 *
 * The default is applied once per session via sessionStorage and is not reapplied
 * after the user interacts with filters or navigates between tabs.
 *
 * @param props - ExploreView props (entityListType, data, etc.).
 * @returns ExploreView component with default entity filters applied.
 */
export const ExploreView = (props: ExploreViewProps): JSX.Element => {
  const { entityListType } = props;
  useDefaultEntityFilters(entityListType);
  return <DXExploreView {...props} />;
};
