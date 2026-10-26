import Head from "next/head";

interface PageMetadataProps {
  title: string;
  description: string;
  pathname: string;
  ogImage?: string;
}

export function PageMetadata({
  title,
  description,
  pathname,
  ogImage,
}: PageMetadataProps) {
  const fullTitle = title.includes("Aeros") ? title : `${title} | Aeros`;
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const cleanPath = pathname.split(/[?#]/)[0];
  const canonicalUrl = origin
    ? `${origin}${cleanPath === "/home" ? "/" : cleanPath}`
    : undefined;
  const defaultOgImage = origin
    ? `${origin}/static/landing/drone/aeros-mission-preview.png`
    : "/static/landing/drone/aeros-mission-preview.png";

  return (
    <Head>
      <title key="title">{fullTitle}</title>
      <meta key="description" name="description" content={description} />
      {canonicalUrl && (
        <link key="canonical" rel="canonical" href={canonicalUrl} />
      )}
      <meta key="og:title" property="og:title" content={fullTitle} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      {canonicalUrl && (
        <meta key="og:url" property="og:url" content={canonicalUrl} />
      )}
      <meta key="og:type" property="og:type" content="website" />
      {!ogImage && (
        <meta key="og:image:width" property="og:image:width" content="1200" />
      )}
      {!ogImage && (
        <meta key="og:image:height" property="og:image:height" content="630" />
      )}
      <meta
        key="og:image"
        property="og:image"
        content={ogImage ?? defaultOgImage}
      />
    </Head>
  );
}
