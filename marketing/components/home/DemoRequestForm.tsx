import { useState } from "react";

export function DemoRequestForm() {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const usesWebhook =
    process.env.NEXT_PUBLIC_DEMO_REQUEST_DELIVERY === "webhook";
  return (
    <form
      className="flex flex-col gap-5 rounded-3xl border border-border bg-background p-6 md:p-10"
      onSubmit={async (event) => {
        event.preventDefault();
        if (pending) {
          return;
        }
        const form = event.currentTarget;
        const data = new FormData(form);
        if (!usesWebhook) {
          const body = `Name: ${String(data.get("name"))}\nWork email: ${String(data.get("email"))}\nOrganization: ${String(data.get("organization"))}\nFleet: ${String(data.get("fleet"))}\n\nMission workflow:\n${String(data.get("mission"))}\n\nI agree that Aeros may use these details to respond to this demo request.`;
          window.location.href = `mailto:contact@aeros.com?subject=${encodeURIComponent("Aeros demo request")}&body=${encodeURIComponent(body)}`;
          setStatus(
            "Your email app will open a draft to contact@aeros.com. Review and send it there to complete your request. If it did not open, email us directly using the link below."
          );
          return;
        }
        setPending(true);
        setStatus("");
        try {
          const response = await fetch("/api/demo-request", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(data)),
          });
          if (response.ok) {
            setSent(true);
            setStatus(
              "Your request has been received. The Aeros team will follow up about your fleet and workflow."
            );
            form.reset();
          } else if (response.status === 503) {
            setStatus(
              "Demo-request delivery is not configured for this deployment yet. Please try again once the site operator has enabled it. Your request has not been submitted."
            );
          } else if (response.status === 400) {
            setStatus(
              "Please check your name, work email, organization, and mission details, then try again."
            );
          } else {
            setStatus(
              "We could not deliver your request. Please try again shortly."
            );
          }
        } catch {
          setStatus(
            "We could not connect. Check your connection and try again."
          );
        } finally {
          setPending(false);
        }
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        {[
          {
            name: "name",
            label: "Your name",
            type: "text",
            autoComplete: "name",
          },
          {
            name: "email",
            label: "Work email",
            type: "email",
            autoComplete: "email",
          },
          {
            name: "organization",
            label: "Organization",
            type: "text",
            autoComplete: "organization",
          },
          {
            name: "fleet",
            label: "Fleet size and providers",
            type: "text",
            autoComplete: "off",
          },
        ].map((field) => (
          <label
            key={field.name}
            className="flex flex-col gap-2 text-sm font-medium text-foreground"
          >
            {field.label}
            <input
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required
              maxLength={200}
              className="rounded-xl border border-border bg-background px-4 py-3 font-normal focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </label>
        ))}
      </div>
      <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
        What mission would you like to automate?
        <textarea
          name="mission"
          required
          minLength={10}
          maxLength={4000}
          rows={4}
          className="rounded-xl border border-border bg-background px-4 py-3 font-normal focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Tell us about your assets, locations, current flight stack, and dispatch workflow."
        />
      </label>
      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          value="yes"
          required
          className="mt-1"
        />
        I agree that Aeros may use these details to respond to this demo
        request.
      </label>
      <p className="m-0 text-xs leading-relaxed text-muted-foreground">
        Share business contact and workflow details only. Please leave out
        credentials, flight-control access, and sensitive operational data.
      </p>
      <button
        type="submit"
        disabled={pending || sent}
        className="w-fit rounded-full bg-blue-500 px-6 py-3 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
      >
        {pending
          ? "Sending…"
          : sent
            ? "Request received"
            : usesWebhook
              ? "Request a demo →"
              : "Prepare demo email →"}
      </button>
      <a
        href="mailto:contact@aeros.com"
        className="w-fit text-sm text-blue-700 underline underline-offset-4"
      >
        Email contact@aeros.com directly
      </a>
      {status && (
        <p
          role="status"
          className="m-0 text-sm leading-relaxed text-foreground"
        >
          {status}
        </p>
      )}
    </form>
  );
}
