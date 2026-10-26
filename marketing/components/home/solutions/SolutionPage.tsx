import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { PageMetadata } from "@marketing/components/home/PageMetadata";
import {
  HomeReveal,
  HomeRevealStyles,
} from "@marketing/components/home/content/Product/HomeReveal";
import { OperationsTheater } from "@marketing/components/home/content/Product/mission-control/OperationsTheater";
import { SolutionVisual } from "./SolutionVisual";
import { SOLUTIONS, type SolutionContent } from "./solutionContent";
import styles from "./SolutionPage.module.css";

/**
 * @cc [owner:saharshbaweja,label:product] solution-preview-boundary
 * Each solution must show its own task, workflow, dependencies, and outputs. Embedded
 * examples must remain labeled simulations and must not send operational requests.
 */
export function SolutionPage({ solution }: { solution: SolutionContent }) {
  return (
    <>
      <PageMetadata
        title={`${solution.label} drone operations | Aeros`}
        description={solution.description}
        pathname={`/home/solutions/${solution.slug}`}
      />
      <HomeRevealStyles />
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
              <Link href="/home">Aeros</Link>
              <ChevronRight size={12} />
              <span>{solution.label}</span>
            </nav>
            <p className={styles.eyebrow}>{solution.audience}</p>
            <h1>{solution.title}</h1>
            <p className={styles.lead}>{solution.description}</p>
            <div className={styles.actions}>
              <Link className={styles.primary} href="/home/contact">
                Discuss your operation <ArrowRight size={16} />
              </Link>
              <a className={styles.secondary} href="#solution-demo">
                See the workflow <ArrowRight size={16} />
              </a>
            </div>
            <p className={styles.note}>
              Your fleet. Your flight systems. Your team in control.
            </p>
          </div>
          <HomeReveal className={styles.visual}>
            <SolutionVisual kind={solution.heroVisual} />
          </HomeReveal>
        </section>
        <section
          className={styles.summary}
          aria-label="What Aeros helps you do"
        >
          {solution.summary.map((item, index) => (
            <article key={item.title}>
              <span className={styles.number}>0{index + 1}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </article>
          ))}
        </section>
        <section id="solution-demo" className={styles.demo}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>Inside the mission</p>
            <h2>{solution.example.title}</h2>
            <p>{solution.example.description}</p>
          </div>
          <OperationsTheater
            key={solution.slug}
            initialScenario={solution.example.scenario}
            autoPlay={false}
          />
        </section>
        <section className={styles.workflow}>
          <HomeReveal className={styles.visual}>
            <SolutionVisual kind={solution.detailVisual} />
          </HomeReveal>
          <div className={styles.workflowCopy}>
            <p className={styles.eyebrow}>From request to result</p>
            <h2>{solution.workflow.title}</h2>
            <p>{solution.workflow.description}</p>
            <ol>
              {solution.workflow.steps.map((step, index) => (
                <li key={step.title}>
                  <span className={styles.stepNumber}>0{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className={styles.setup}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>Connect your operation</p>
            <h2>
              A clear starting point.
              <br />A defined result.
            </h2>
            <p>
              Aeros is a software layer for existing drone operations. Start
              with one workflow, confirm the supported connections, and validate
              it with your operating team.
            </p>
          </div>
          <div className={styles.setupGrid}>
            {[
              { title: "What you connect", text: solution.setup.input },
              { title: "What you review", text: solution.setup.checks },
              { title: "What comes back", text: solution.setup.output },
            ].map((item) => (
              <article key={item.title}>
                <Check size={18} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <p className={styles.integrationNote}>
            Supported data and actions vary by aircraft, dock, and provider API.
            Flight execution, connectivity, operator qualifications, and
            required authorizations remain part of your operation. We agree
            those dependencies before deployment.
          </p>
        </section>
        <section className={styles.faq}>
          <div>
            <p className={styles.eyebrow}>Practical questions</p>
            <h2>
              Before you connect
              <br />
              the first aircraft.
            </h2>
          </div>
          <div>
            {solution.faqs.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className={styles.cta}>
          <p className={styles.eyebrow}>Built around the way you operate</p>
          <h2>
            Bring a real mission.
            <br />
            Let’s work through it.
          </h2>
          <p>
            Show us your fleet, the systems you use, and one job you want to
            coordinate. We’ll define the connections, review points, and outputs
            together.
          </p>
          <Link className={styles.primary} href="/home/contact">
            Talk to the Aeros team <ArrowRight size={16} />
          </Link>
        </section>
        <nav className={styles.related} aria-label="Other Aeros solutions">
          <p className={styles.eyebrow}>Explore other operations</p>
          <div>
            {SOLUTIONS.filter((item) => item.slug !== solution.slug).map(
              (item) => (
                <Link key={item.slug} href={`/home/solutions/${item.slug}`}>
                  {item.label}
                  <ArrowRight size={15} />
                </Link>
              )
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
