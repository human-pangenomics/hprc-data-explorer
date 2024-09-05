import { LABEL } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { CopyToClipboard } from "@databiosphere/findable-ui/lib/components/common/CopyToClipboard/copyToClipboard";
import {
  Tooltip as MTooltip,
  Typography as MTypography,
  TypographyProps as MTypographyProps,
} from "@mui/material";
import { Fragment } from "react";

export interface TypographyNoWrapProps
  extends Omit<MTypographyProps, "children"> {
  copyable?: boolean;
  value: string | null;
}

export const TypographyNoWrap = ({
  copyable = true,
  noWrap = true,
  value,
  variant = "inherit",
  ...props
}: TypographyNoWrapProps): JSX.Element => {
  if (!value) return <span>{LABEL.UNSPECIFIED}</span>;
  if (value === "N/A") return <span>{value}</span>;
  return (
    <Fragment>
      <MTooltip title={value}>
        <MTypography
          component="span"
          noWrap={noWrap}
          variant={variant}
          {...props}
        >
          {value}
        </MTypography>
      </MTooltip>
      {copyable && <CopyToClipboard copyStr={value} />}
    </Fragment>
  );
};
