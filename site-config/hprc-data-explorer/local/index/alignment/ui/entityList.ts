import {
  ComponentConfig,
  ComponentsConfig,
} from "@databiosphere/findable-ui/lib/config/entities";
import * as MDX from "../../../../../../app/components/common/MDXContent";
import * as V from "../../../../../../app/viewModelBuilders/catalog/hprc-data-explorer/common/viewModelBuilders";

export const entityListSlot: ComponentsConfig = [
  {
    component: MDX.AlertAnnotationListHero,
    viewBuilder: V.buildAnnotationListHero,
  } as ComponentConfig<typeof MDX.AlertAnnotationListHero>,
];
