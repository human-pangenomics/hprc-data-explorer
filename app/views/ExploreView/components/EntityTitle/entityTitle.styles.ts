import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const StyledStack = styled(Stack)`
  align-items: center;
  flex-direction: row;
  gap: 16px;

  .MuiTypography-root {
    letter-spacing: normal;
  }

  .MuiLink-root {
    align-items: center;
    color: ${PALETTE.INK_LIGHT};
    display: flex;
    font: ${FONT.BODY_SMALL_400};
    gap: 2px;
    padding: 4px 0;
  }
`;
