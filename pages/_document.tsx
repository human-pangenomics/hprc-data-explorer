import {
  documentGetInitialProps,
  DocumentHeadTags,
  DocumentHeadTagsProps,
} from "@mui/material-nextjs/v16-pagesRouter";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import type { JSX } from "react";

class MyDocument extends Document<DocumentHeadTagsProps> {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <DocumentHeadTags {...this.props} />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Roboto+Mono&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<DocumentHeadTagsProps & DocumentInitialProps> => {
  return await documentGetInitialProps(ctx);
};

export default MyDocument;
