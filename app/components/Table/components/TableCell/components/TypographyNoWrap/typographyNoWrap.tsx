import { CopyToClipboard } from "@databiosphere/findable-ui/lib/components/common/CopyToClipboard/copyToClipboard";
import {
  Tooltip as MTooltip,
  Typography as MTypography,
  TypographyProps as MTypographyProps,
} from "@mui/material";
import { Fragment } from "react";
import { LABEL } from "../../../../../../apis/common/entities";

export interface TypographyNoWrapProps
  extends Omit<MTypographyProps, "children"> {
  copyable?: boolean;
  label?: string;
  value: string | null;
}

export const TypographyNoWrap = ({
  copyable = true,
  label = LABEL.DASH,
  noWrap = true,
  value,
  variant = "inherit",
  ...props
}: TypographyNoWrapProps): JSX.Element => {
  if (!value) return <span>{label}</span>;
  if (value === LABEL.NA) return <span>{value}</span>;
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
