import type { JSX } from "react";

import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { LINK_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/link";
import { SVG_ICON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/svgIcon";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { ArrowForwardRounded } from "@mui/icons-material";
import { Link, Typography } from "@mui/material";
import { StyledStack } from "./entityTitle.styles";
import { Props } from "./types";

export const EntityTitle = ({ slotProps, title }: Props): JSX.Element => {
  const { link: linkProps } = slotProps || {};
  return (
    <StyledStack>
      <Typography component="h1" variant={TYPOGRAPHY_PROPS.VARIANT.HEADING}>
        {title}
      </Typography>
      {linkProps && (
        <Link
          rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
          target={ANCHOR_TARGET.BLANK}
          underline={LINK_PROPS.UNDERLINE.NONE}
          {...linkProps}
        >
          {`About ${title}`}
          <ArrowForwardRounded fontSize={SVG_ICON_PROPS.FONT_SIZE.XXSMALL} />
        </Link>
      )}
    </StyledStack>
  );
};
