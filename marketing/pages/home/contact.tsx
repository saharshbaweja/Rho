import type { ReactElement } from "react";
import LandingLayout, {
  type LandingLayoutProps,
} from "@marketing/components/home/LandingLayout";
import { PageMetadata } from "@marketing/components/home/PageMetadata";
import { DemoRequestForm } from "@marketing/components/home/DemoRequestForm";
import { useRouter } from "next/router";
export function getStaticProps() {
  return { props: { shape: 0 } };
}
export default function Contact() {
  const router = useRouter();
  return (
    <>
      <PageMetadata
        title="Book an Aeros demo"
        description="Discuss natural-language dispatch and mission orchestration for your existing drone fleets and providers."
        pathname={router.asPath}
      />
      <section className="mx-auto w-full max-w-[960px] pb-24 pt-14 lg:pt-24">
        <h1 className="m-0 text-balance text-4xl font-semibold tracking-[-0.04em] text-foreground md:text-6xl">
          Let’s put your fleet to work.
        </h1>
        <p className="mb-10 mt-6 max-w-[680px] text-lg leading-relaxed text-muted-foreground">
          Tell us what you operate and what you want to automate. We’ll discuss
          mission workflows, provider interfaces, readiness checks, and a
          focused integration plan.
        </p>
        <DemoRequestForm />
      </section>
    </>
  );
}
Contact.getLayout = (page: ReactElement, pageProps: LandingLayoutProps) => (
  <LandingLayout pageProps={pageProps}>{page}</LandingLayout>
);
