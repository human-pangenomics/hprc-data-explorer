import { AzulEntitiesStaticResponse } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import {
  CategoryValueKey,
  SelectedFilter,
} from "@databiosphere/findable-ui/lib/common/entities";
import { Main as DXMain } from "@databiosphere/findable-ui/lib/components/Layout/components/Main/main.styles";
import { EntityConfig } from "@databiosphere/findable-ui/lib/config/entities";
import { getEntityConfig } from "@databiosphere/findable-ui/lib/config/utils";
import { getEntityService } from "@databiosphere/findable-ui/lib/hooks/useEntityService";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import { useExploreState } from "@databiosphere/findable-ui/lib/hooks/useExploreState";
import { ExploreActionKind } from "@databiosphere/findable-ui/lib/providers/exploreState";
import { database } from "@databiosphere/findable-ui/lib/utils/database";
import { ExploreView } from "@databiosphere/findable-ui/lib/views/ExploreView/exploreView";
import { config } from "app/config/config";
import fsp from "fs/promises";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useRef, type JSX } from "react";
import { HPRC_DATA_EXPLORER_CATEGORY_KEY } from "../../site-config/hprc-data-explorer/category";

interface PageUrl extends ParsedUrlQuery {
  entityListType: string;
}

interface ListPageProps extends AzulEntitiesStaticResponse {
  entityListType: string;
}

const DEFAULT_FILTERS_BY_ENTITY_LIST_TYPE: Record<string, SelectedFilter[]> = {
  annotations: [
    {
      categoryKey: HPRC_DATA_EXPLORER_CATEGORY_KEY.RELEASE,
      value: ["2"],
    },
  ],
  assemblies: [
    {
      categoryKey: HPRC_DATA_EXPLORER_CATEGORY_KEY.RELEASE,
      value: ["2"],
    },
  ],
};

const SESSION_STORAGE_DEFAULT_FILTER_INITIALIZED_PREFIX =
  "hprc-data-explorer:default-filter-initialized:";

function getDefaultFilterInitializedStorageKey(entityListType: string): string {
  return `${SESSION_STORAGE_DEFAULT_FILTER_INITIALIZED_PREFIX}${entityListType}`;
}

/**
 * Seed database.
 * @param entityListType - Entity list type.
 * @param entityConfig - Entity config.
 * @returns Promise<void>.
 */
const seedDatabase = async function seedDatabase( // TODO get rid of this duplicated code
  entityListType: string,
  entityConfig: EntityConfig
): Promise<void> {
  const { label, staticLoadFile } = entityConfig;

  if (!staticLoadFile) {
    throw new Error(`staticLoadFile not found for entity entity ${label}`);
  }

  // Build database from configured JSON, if any.
  let jsonText;
  try {
    jsonText = await fsp.readFile(staticLoadFile, "utf8");
  } catch {
    throw new Error(`File ${staticLoadFile} not found for entity ${label}`);
  }

  const object = JSON.parse(jsonText);
  const entities = Object.values(object); // Client-side fetched entities are mapped prior to dispatch to explore state.

  // Seed entities.
  database.get().seed(entityListType, entities);
};

/**
 * Explore view page.
 * @param props - Explore view page props.
 * @param props.entityListType - Entity list type.
 * @returns ExploreView component.
 */
const IndexPage = ({
  entityListType,
  ...props
}: ListPageProps): JSX.Element => {
  const router = useRouter();
  const { exploreDispatch, exploreState } = useExploreState();
  const defaultFilters = DEFAULT_FILTERS_BY_ENTITY_LIST_TYPE[entityListType];
  const injectedEntityListTypeRef = useRef<string | null>(null);

  useEffect(() => {
    if (!router.isReady || !defaultFilters) return;
    if (exploreState.tabValue !== entityListType) return;

    const initializedStorageKey =
      getDefaultFilterInitializedStorageKey(entityListType);

    if (typeof router.query.filter !== "undefined") {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(initializedStorageKey, "true");
      }
      return;
    }
    if (
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(initializedStorageKey)
    ) {
      return;
    }
    if (injectedEntityListTypeRef.current === entityListType) return;

    injectedEntityListTypeRef.current = entityListType;
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(initializedStorageKey, "true");
    }

    defaultFilters.forEach(({ categoryKey, value }) => {
      value.forEach((selectedValue) => {
        exploreDispatch({
          payload: {
            categoryKey,
            selected: true,
            selectedValue: selectedValue as CategoryValueKey,
          },
          type: ExploreActionKind.UpdateFilter,
        });
      });
    });
  }, [
    defaultFilters,
    entityListType,
    exploreDispatch,
    exploreState.tabValue,
    router,
  ]);

  if (!entityListType) return <></>;

  return <ExploreView entityListType={entityListType} {...props} />;
};

/**
 * Build the list of paths to be built statically.
 * @returns static paths.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const appConfig = config();
  const entities = appConfig.entities;
  const paths = entities.map((entity) => ({
    params: {
      entityListType: entity.route,
    },
  }));
  return {
    fallback: false,
    paths,
  };
};

/**
 * Build the set of props for pre-rendering of page.
 * @param context - Object containing values related to the current context.
 * @returns static props.
 */
export const getStaticProps: GetStaticProps<
  AzulEntitiesStaticResponse
> = async (context: GetStaticPropsContext) => {
  const appConfig = config();
  const { entityListType } = context.params as PageUrl;
  const { entities } = appConfig;
  const entityConfig = getEntityConfig(entities, entityListType);
  const { exploreMode } = entityConfig;
  const { fetchAllEntities } = getEntityService(entityConfig, undefined); // Determine the type of fetch, either from an API endpoint or a TSV.

  const props: AzulEntitiesStaticResponse = { entityListType };

  // Seed database.
  if (exploreMode === EXPLORE_MODE.CS_FETCH_CS_FILTERING) {
    await seedDatabase(entityListType, entityConfig);
  } else {
    // Entities are fetched server-side.
    return { props };
  }

  // Entities are client-side fetched from a local database seeded from a configured TSV.
  props.data = await fetchAllEntities(entityListType, undefined);

  return {
    props,
  };
};

IndexPage.Main = DXMain;

export default IndexPage;
