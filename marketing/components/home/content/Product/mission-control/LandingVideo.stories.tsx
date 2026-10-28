import { LandingVideo } from "./LandingVideo";
import { HeroOfficeSection } from "../HeroOfficeSection";
import { MissionShowcaseSection } from "./MissionShowcaseSection";
export default {
  title: "Aeros/Landing films",
  component: LandingVideo,
  parameters: { layout: "fullscreen" },
};
export const Film = {
  render: () => (
    <LandingVideo
      src="/static/landing/drone/films/aeros-film-v4.mp4"
      poster="/static/landing/drone/films/aeros-film-v4.jpg"
      title="Aeros film"
      description="01:02 · From mission request to report"
      autoPlay
    />
  ),
};
export const BostonDemo = { render: () => <MissionShowcaseSection /> };
export const LandingHero = { render: () => <HeroOfficeSection /> };
