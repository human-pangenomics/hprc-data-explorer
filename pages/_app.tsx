import "@databiosphere/findable-ui";
import { AzulEntitiesStaticResponse } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { Error } from "@databiosphere/findable-ui/lib/components/Error/error";
import { ErrorBoundary } from "@databiosphere/findable-ui/lib/components/ErrorBoundary";
import { Head } from "@databiosphere/findable-ui/lib/components/Head/head";
import { AppLayout } from "@databiosphere/findable-ui/lib/components/Layout/components/AppLayout/appLayout.styles";
import { Floating } from "@databiosphere/findable-ui/lib/components/Layout/components/Floating/floating";
import { Footer } from "@databiosphere/findable-ui/lib/components/Layout/components/Footer/footer";
import { Header as DXHeader } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/header";
import { Main as DXMain } from "@databiosphere/findable-ui/lib/components/Layout/components/Main/main";
import { ConfigProvider as DXConfigProvider } from "@databiosphere/findable-ui/lib/providers/config";
import { GoogleSignInAuthenticationProvider } from "@databiosphere/findable-ui/lib/providers/googleSignInAuthentication/provider";
import { ExploreStateProvider } from "@databiosphere/findable-ui/lib/providers/exploreState";
import { LayoutDimensionsProvider } from "@databiosphere/findable-ui/lib/providers/layoutDimensions/provider";
import { SystemStatusProvider } from "@databiosphere/findable-ui/lib/providers/systemStatus";
import { createAppTheme } from "@databiosphere/findable-ui/lib/theme/theme";
import { DataExplorerError } from "@databiosphere/findable-ui/lib/types/error";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { config } from "../app/config/config";
import { useEffect } from "react";
import TagManager from "react-gtm-module";

export interface PageProps extends AzulEntitiesStaticResponse {
  pageTitle?: string;
}

export type NextPageWithComponent = NextPage & {
  Main?: typeof DXMain;
};

export type AppPropsWithComponent = AppProps & {
  Component: NextPageWithComponent;
};

function MyApp({ Component, pageProps }: AppPropsWithComponent): JSX.Element {
  // Set up the site configuration, layout and theme.
  const appConfig = config();
  const { analytics, layout, redirectRootToPath, themeOptions } = appConfig;
  const { floating, footer, header } = layout || {};
  const { gtmAuth, gtmId, gtmPreview } = analytics || {};
  const appTheme = createAppTheme(themeOptions);
  const { entityListType, pageTitle } = pageProps as PageProps;
  const Main = Component.Main || DXMain;

  // Initialize Google Tag Manager.
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      ad_personalization: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      analytics_storage: "denied",
      event: "default_consent", // ⚠ must be this exact string
    });
    if (gtmId) {
      TagManager.initialize({ auth: gtmAuth, gtmId, preview: gtmPreview });
    }
  }, [gtmAuth, gtmId, gtmPreview]);

  return (
    <EmotionThemeProvider theme={appTheme}>
      <ThemeProvider theme={appTheme}>
        <DXConfigProvider config={appConfig} entityListType={entityListType}>
          <Head pageTitle={pageTitle} />
          <CssBaseline />
          <SystemStatusProvider>
            <GoogleSignInAuthenticationProvider>
              <LayoutDimensionsProvider>
                <AppLayout>
                  <DXHeader {...header} />
                  <ExploreStateProvider entityListType={entityListType}>
                    <Main>
                      <ErrorBoundary
                        fallbackRender={({
                          error,
                          reset,
                        }: {
                          error: DataExplorerError;
                          reset: () => void;
                        }): JSX.Element => (
                          <Error
                            errorMessage={error.message}
                            requestUrlMessage={error.requestUrlMessage}
                            rootPath={redirectRootToPath}
                            onReset={reset}
                          />
                        )}
                      >
                        <Component {...pageProps} />
                        <Floating {...floating} />
                      </ErrorBoundary>
                    </Main>
                  </ExploreStateProvider>
                  <Footer {...footer} />
                </AppLayout>
              </LayoutDimensionsProvider>
            </GoogleSignInAuthenticationProvider>
          </SystemStatusProvider>
        </DXConfigProvider>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
}

export default MyApp;
