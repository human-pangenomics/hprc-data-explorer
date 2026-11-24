import { getEntityConfig } from "@databiosphere/findable-ui/lib/config/utils";
import { getEntityService } from "@databiosphere/findable-ui/lib/hooks/useEntityService";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import { seedDatabase } from "@databiosphere/findable-ui/lib/utils/seedDatabase";
import type { ExploreViewProps } from "@databiosphere/findable-ui/lib/views/ExploreView/types";
import { config } from "app/config/config";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import type { JSX } from "react";
import { ExploreView } from "../../app/views/ExploreView/exploreView";

interface PageUrl extends ParsedUrlQuery {
  entityListType: string;
}

/**
 * Explore view page.
 * @param props - Explore view page props: the entity list type and its statically loaded entities, if any.
 * @returns ExploreView component.
 */
const IndexPage = (props: ExploreViewProps): JSX.Element => {
  if (!props.entityListType) return <></>;
  return <ExploreView {...props} />;
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
export const getStaticProps: GetStaticProps<ExploreViewProps> = async (
  context: GetStaticPropsContext
) => {
  const appConfig = config();
  const { entityListType } = context.params as PageUrl;
  const { entities } = appConfig;
  const entityConfig = getEntityConfig(entities, entityListType);
  const { exploreMode } = entityConfig;
  const { fetchAllEntities } = getEntityService(entityConfig, undefined); // Determine the type of fetch, either from an API endpoint or a TSV.

  const props: ExploreViewProps = { entityListType };

  // Seed database.
  if (exploreMode === EXPLORE_MODE.CS_FETCH_CS_FILTERING) {
    await seedDatabase(entityListType, entityConfig);
  } else {
    // Entities are fetched server-side.
    return { props };
  }

  // Entities are client-side fetched from a local database seeded from a configured TSV.
  // The explore view takes the entities alone, not the rest of the response.
  props.data = (await fetchAllEntities(entityListType, undefined)).hits;

  return {
    props,
  };
};

export default IndexPage;
