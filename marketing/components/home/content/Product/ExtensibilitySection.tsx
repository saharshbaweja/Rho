import { Div3D, Hover3D } from "@dust-tt/sparkle";
import { ImgBlock } from "@marketing/components/home/ContentBlocks";
import { A, H2, P } from "@marketing/components/home/ContentComponents";
import { classNames } from "@marketing/lib/utils";
import Link from "next/link";

export function ExtensibilitySection({ page = "default" }) {
  return (
    <div className="w-full">
      <div className="mb-8">
        <H2> Connect the systems behind the decision </H2>
        <P size="lg" className="max-w-[700px] text-muted-foreground">
          {" "}
          Plan the data connections and review workflows that fit your
          operation, from mission inputs to the approved response. <br />{" "}
          {page == "default" && (
            <Link href="/home/solutions/dust-platform" shallow={true}>
              <A variant="primary"> More about the Aeros platform </A>
            </Link>
          )}
          {page != "default" && (
            <Link
              href="https://docs.dust.tt/reference/developer-platform-overview"
              shallow={true}
              target="_blank"
            >
              <A variant="primary"> View reference documentation </A>
            </Link>
          )}
        </P>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <ImgBlock
          title={<> Connect operational workflows </>}
          content={
            <>
              {" "}
              Scope mission updates, evidence review, and team handovers around
              your established operational procedures.{" "}
            </>
          }
        >
          <Hover3D
            depth={-20}
            perspective={1000}
            className={classNames("relative flex items-center justify-center")}
          >
            <Div3D depth={-40}>
              <img
                src="/static/landing/webhooks/ticketgeneration.png"
                alt="Custom agentic tools"
                className="h-auto max-h-full w-auto max-w-full object-contain"
              />
            </Div3D>
          </Hover3D>
        </ImgBlock>
        <ImgBlock
          title={<> Bring mission inputs together </>}
          content={
            <>
              {" "}
              Map aviation sources, schedules, aircraft, crews, and operator
              knowledge to the missions they describe. Validate freshness and
              coverage before rollout.{" "}
            </>
          }
        >
          <Hover3D
            depth={-20}
            perspective={1000}
            className={classNames("relative flex items-center justify-center")}
          >
            <Div3D depth={-40}>
              <img
                src="/static/landing/api/connections.png"
                alt="Custom connections"
                className="h-auto max-h-full w-auto max-w-full object-contain"
              />
            </Div3D>
          </Hover3D>
        </ImgBlock>
        <ImgBlock
          title={<> Fit the operator environment </>}
          content={
            <>
              {" "}
              Define integration access, ownership, human review, and deployment
              scope with the teams responsible for the operation.{" "}
            </>
          }
        >
          <Hover3D
            depth={-20}
            perspective={1000}
            className={classNames("relative flex items-center justify-center")}
          >
            <Div3D depth={-40}>
              <img
                src="/static/landing/api/integration.png"
                alt="Custom integrations"
                className="h-auto max-h-full w-auto max-w-full object-contain"
              />
            </Div3D>
          </Hover3D>
        </ImgBlock>
      </div>
    </div>
  );
}
