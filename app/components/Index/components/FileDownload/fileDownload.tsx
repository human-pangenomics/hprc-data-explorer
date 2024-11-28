import { DownloadIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/DownloadIcon/downloadIcon";
import { IconButton } from "@databiosphere/findable-ui/lib/components/common/IconButton/iconButton";
import { useRef } from "react";

export interface FileDownloadProps {
  fileName: string;
  fileUrl?: string;
}

export const FileDownload = ({
  fileName,
  fileUrl,
}: FileDownloadProps): JSX.Element => {
  const downloadRef = useRef<HTMLAnchorElement>(null);

  return (
    <a download={fileName} href={fileUrl}>
      <IconButton
        color="primary"
        disabled={!fileUrl}
        Icon={DownloadIcon}
        onClick={(): void => {
          downloadRef.current?.click();
        }}
        size="medium"
      />
    </a>
  );
};
