import { CopyToClipboard } from "@databiosphere/findable-ui/lib/components/common/CopyToClipboard/copyToClipboard";
import {
  Grid,
  Tooltip as MTooltip,
  Typography as MTypography,
  TypographyProps as MTypographyProps,
} from "@mui/material";
import { LABEL } from "../../../../../../apis/common/entities";
import { GRID_PROPS } from "./constants";

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
    <Grid {...GRID_PROPS}>
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
    </Grid>
  );
};
