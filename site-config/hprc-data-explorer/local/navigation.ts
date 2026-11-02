import type { Navigation } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import type { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import * as C from "../../../app/components/index";
import { ROUTE } from "../../../app/routes/constants";
import { DOCUMENTATION_URL } from "../docs";

const PORTAL_URL = "https://humanpangenome.org";

/**
 * Breakpoints at which a header menu is replaced by its own items.
 * The full navigation does not fit in the bar at `sm`, so some links are kept
 * in menus there and shown as separate links at every other breakpoint.
 */
const FLATTEN = {
  EXCEPT_SM: { lg: true, md: true, xs: true },
} as const satisfies Record<string, NavLinkItem["flatten"]>;

/**
 * Breakpoints at which a header navigation link is visible.
 * Used for a link that moves into a different menu at `sm`, where the full
 * navigation does not fit in the bar.
 */
const VISIBLE = {
  HIDDEN_AT_SM: { sm: false },
  SM_ONLY: { lg: false, md: false, sm: true, xs: false },
} as const satisfies Record<string, NavLinkItem["visible"]>;

const HPRC_WEBSITE: NavLinkItem = {
  label: C.LabelIconMenuItem({ label: "HPRC Website" }),
  target: ANCHOR_TARGET.BLANK,
  url: PORTAL_URL,
};

/**
 * Header navigation: left (none), center (data pages) and right (HPRC website
 * and help) links.
 * At `sm`, Assemblies, Annotations and Alignments are in the "More" menu and
 * the HPRC website link is in the "Help & Documentation" menu.
 */
export const HEADER_NAVIGATION: Navigation = [
  undefined,
  [
    { label: "Samples", url: ROUTE.SAMPLES },
    { label: "Sequencing Data", url: ROUTE.RAW_SEQUENCING_DATA },
    {
      flatten: FLATTEN.EXCEPT_SM,
      label: "More",
      menuItems: [
        { label: "Assemblies", url: ROUTE.ASSEMBLIES },
        { label: "Annotations", url: ROUTE.ANNOTATIONS },
        { label: "Alignments", url: ROUTE.ALIGNMENTS },
      ],
      url: "",
    },
  ],
  [
    { ...HPRC_WEBSITE, visible: VISIBLE.HIDDEN_AT_SM },
    {
      label: "Help & Documentation",
      menuItems: [
        { ...HPRC_WEBSITE, label: "HPRC Website", visible: VISIBLE.SM_ONLY },
        {
          label: "Data Use Agreement",
          target: ANCHOR_TARGET.BLANK,
          url: "https://humanpangenome.org/data-use/",
        },
        {
          label: "Samples",
          target: ANCHOR_TARGET.BLANK,
          url: DOCUMENTATION_URL.SAMPLES,
        },
        {
          label: "Assemblies",
          target: ANCHOR_TARGET.BLANK,
          url: DOCUMENTATION_URL.ASSEMBLIES,
        },
        {
          label: "Sequencing Data",
          target: ANCHOR_TARGET.BLANK,
          url: DOCUMENTATION_URL.SEQUENCING_DATA,
        },
        {
          label: "Annotations",
          target: ANCHOR_TARGET.BLANK,
          url: DOCUMENTATION_URL.ANNOTATIONS,
        },
        {
          icon: C.GitHubIcon({ fontSize: "small" }),
          label: "GitHub",
          target: ANCHOR_TARGET.BLANK,
          url: "https://github.com/human-pangenomics/hprc-data-explorer",
        },
      ],
      url: "",
    },
  ],
];
