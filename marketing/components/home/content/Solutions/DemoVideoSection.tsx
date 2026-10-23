import { H2 } from "@marketing/components/home/ContentComponents";
import { MissionControl } from "@marketing/components/home/content/Product/mission-control/MissionControl";
export interface DemoVideoProps {
  sectionTitle?: string;
  videoUrl?: string;
  autoPlay?: boolean;
  showCaptions?: boolean;
}
export function DemoVideoSection({
  demoVideo,
  id,
}: {
  demoVideo: DemoVideoProps;
  id?: string;
}) {
  return (
    <div id={id} className="flex flex-col justify-center gap-8 pb-4">
      {demoVideo.sectionTitle && <H2>{demoVideo.sectionTitle}</H2>}
      <MissionControl />
    </div>
  );
}
