import { FeatureScene } from "@marketing/components/home/content/Product/mission-control/FeatureScene";
import { ImgBlock } from "@marketing/components/home/ContentBlocks";
import { H2, P } from "@marketing/components/home/ContentComponents";

export interface UseCaseProps {
  sectionTitle?: string;
  sectionDescription?: string;
  items: {
    title: string;
    content: string;
    images: string[];
  }[];
}
export function UseCasesSection({ useCase }: { useCase: UseCaseProps }) {
  return (
    <section className="w-full py-12">
      <div>
        <H2>{useCase.sectionTitle}</H2>
        <P size="lg" className="pb-6 text-muted-foreground">
          {useCase.sectionDescription}
        </P>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {useCase.items.map((item, index) => (
          <ImgBlock key={index} title={item.title} content={item.content}>
            <FeatureScene
              feature={index === 3 ? "Aeros Report" : undefined}
              film={
                index === 1
                  ? "fleet-readiness"
                  : index === 2
                    ? "mission-recovery"
                    : "mission-story"
              }
            />
          </ImgBlock>
        ))}
      </div>
    </section>
  );
}
