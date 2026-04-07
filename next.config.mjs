import nextMDX from "@next/mdx";
import withPlugins from "next-compose-plugins";

const withMDX = nextMDX({ extension: /\.mdx?$/ });

export default withPlugins(
  [[withMDX, { pageExtensions: ["md", "mdx", "ts", "tsx"] }]],
  {
    basePath: "",
    images: { unoptimized: true },
    output: "export",
    reactStrictMode: true,
    transpilePackages: ["@databiosphere/findable-ui"],
  }
);
