import Head from "next/head";
import { FC } from "react";

interface metaProps {
  title?: string;
  keywords?: string;
  description?: string;
  image?: string;
}

const Meta: FC<metaProps> = ({ title, keywords, description, image }) => {
  const metaTitle = `${title ? `${title}` : ""}`;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords || "Create your account"} />
      <meta name="description" content={description || "Some random description"} />
      <meta property="og:image" content={image || "https://landalearn.com/meta-img.png"} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/images/favicon.ico" />
      <title>{metaTitle}</title>
    </Head>
  );
};

export default Meta;
