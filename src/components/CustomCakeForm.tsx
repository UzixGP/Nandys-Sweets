"use client";

import { useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import { site } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { mailtoLink, whatsappLink } from "@/lib/contact";
import { MailIcon, WhatsAppIcon } from "./icons";

type Labels = Dictionary["form"];

type Fields = {
  name: string;
  phone: string;
  date: string;
  servings: string;
  flavor: string;
  size: string;
  budget: string;
  details: string;
};

type FieldName = keyof Fields;

const empty: Fields = {
  name: "",
  phone: "",
  date: "",
  servings: "",
  flavor: "",
  size: "",
  budget: "",
  details: "",
};

/** Local date as YYYY-MM-DD, used to block past pickup dates. */
const today = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

// The date picker's min is only known in the browser, so it's skipped during prerendering.
const noSubscribe = () => () => {};
const useToday = () => useSyncExternalStore(noSubscribe, today, () => undefined);

function validate(values: Fields, t: Labels) {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!values.name.trim()) errors.name = t.errors.required;
  if (!values.date) errors.date = t.errors.required;
  else if (values.date < today()) errors.date = t.errors.dateFuture;
  const servings = Number(values.servings);
  if (!values.servings) errors.servings = t.errors.required;
  else if (!Number.isInteger(servings) || servings < 1) errors.servings = t.errors.servings;
  if (!values.flavor.trim()) errors.flavor = t.errors.required;
  return errors;
}

function buildMessage(values: Fields, t: Labels) {
  const rows: [string, string][] = [
    [t.name, values.name],
    [t.phone, values.phone],
    [t.date, values.date],
    [t.servings, values.servings],
    [t.flavor, values.flavor],
    [t.size, values.size],
    [t.budget, values.budget],
    [t.details, values.details],
  ];
  const lines = rows
    .filter(([, value]) => value.trim())
    .map(([label, value]) => `• ${label}: ${value.trim()}`);
  return [t.message.intro, "", ...lines].join("\n");
}

export function CustomCakeForm({ labels: t }: { labels: Labels }) {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [sent, setSent] = useState(false);
  const minDate = useToday();

  const update = (name: FieldName, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const submit = (channel: "whatsapp" | "email") => {
    const found = validate(values, t);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`cake-${firstInvalid}`)?.focus();
      return;
    }
    const message = buildMessage(values, t);
    if (channel === "whatsapp") {
      window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = mailtoLink(t.message.emailSubject, message);
    }
    setSent(true);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit("whatsapp");
  };

  if (sent) {
    return (
      <div role="status" className="rounded-[2rem] bg-cream p-8 text-center shadow-soft sm:p-12">
        <p className="mx-auto grid size-16 place-items-center rounded-full bg-whatsapp text-white">
          <WhatsAppIcon className="size-8" />
        </p>
        <h3 className="mt-5 font-display text-3xl font-bold">{t.success.title}</h3>
        <p className="mx-auto mt-3 max-w-md text-cocoa-soft">{t.success.body}</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-cocoa-soft">{t.photoNote}</p>
        <p className="mx-auto mt-5 max-w-md rounded-2xl bg-yellow px-4 py-3 text-sm font-semibold">
          {t.success.note}
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(empty);
            setSent(false);
          }}
          className="mt-8 rounded-full border-2 border-cocoa px-6 py-3 font-display font-semibold transition hover:bg-cocoa hover:text-cream"
        >
          {t.success.again}
        </button>
      </div>
    );
  }

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="grid gap-5 rounded-[2rem] bg-cream p-6 shadow-soft sm:grid-cols-2 sm:p-10"
    >
      {hasErrors && (
        <p role="alert" className="rounded-2xl bg-pink px-4 py-3 font-semibold sm:col-span-2">
          {t.errors.summary}
        </p>
      )}

      <Field id="name" label={t.name} error={errors.name}>
        <input
          {...inputProps("name", errors.name)}
          autoComplete="name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
        />
      </Field>

      <Field id="phone" label={t.phone} optional={t.optional}>
        <input
          {...inputProps("phone")}
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
      </Field>

      <Field id="date" label={t.date} error={errors.date}>
        <input
          {...inputProps("date", errors.date)}
          type="date"
          min={minDate}
          value={values.date}
          onChange={(e) => update("date", e.target.value)}
        />
      </Field>

      <Field id="servings" label={t.servings} error={errors.servings}>
        <input
          {...inputProps("servings", errors.servings)}
          type="number"
          inputMode="numeric"
          min={1}
          value={values.servings}
          onChange={(e) => update("servings", e.target.value)}
        />
      </Field>

      <Field id="flavor" label={t.flavor} error={errors.flavor}>
        <input
          {...inputProps("flavor", errors.flavor)}
          placeholder={t.flavorPlaceholder}
          value={values.flavor}
          onChange={(e) => update("flavor", e.target.value)}
        />
      </Field>

      <Field id="size" label={t.size} optional={t.optional}>
        <input
          {...inputProps("size")}
          placeholder={t.sizePlaceholder}
          value={values.size}
          onChange={(e) => update("size", e.target.value)}
        />
      </Field>

      <Field id="budget" label={t.budget} optional={t.optional}>
        <input
          {...inputProps("budget")}
          placeholder={t.budgetPlaceholder}
          value={values.budget}
          onChange={(e) => update("budget", e.target.value)}
        />
      </Field>

      <Field id="details" label={t.details} optional={t.optional} wide>
        <textarea
          {...inputProps("details")}
          rows={4}
          placeholder={t.detailsPlaceholder}
          value={values.details}
          onChange={(e) => update("details", e.target.value)}
        />
      </Field>

      <p className="rounded-2xl bg-blue px-4 py-3 text-sm sm:col-span-2">📸 {t.photoNote}</p>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
        <button
          type="submit"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-cocoa px-6 py-3.5 font-display text-lg font-semibold text-cream shadow-soft transition hover:-translate-y-0.5 hover:bg-cocoa-dark"
        >
          <WhatsAppIcon className="size-5" />
          {t.submitWhatsapp}
        </button>
        {site.email && (
          <button
            type="button"
            onClick={() => submit("email")}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-cocoa px-6 py-3.5 font-display text-lg font-semibold transition hover:bg-cocoa hover:text-cream"
          >
            <MailIcon className="size-5" />
            {t.submitEmail}
          </button>
        )}
      </div>
    </form>
  );
}

const inputProps = (name: FieldName, error?: string) => ({
  id: `cake-${name}`,
  name,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `cake-${name}-error` : undefined,
  className: `w-full rounded-2xl border-2 bg-white/70 px-4 py-3 text-base text-cocoa placeholder:text-cocoa-soft/60 transition focus:border-cocoa focus:outline-none ${
    error ? "border-pink-deep bg-blush" : "border-cocoa/15"
  }`,
});

function Field({
  id,
  label,
  error,
  optional,
  wide,
  children,
}: {
  id: FieldName;
  label: string;
  error?: string;
  optional?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <label htmlFor={`cake-${id}`} className="mb-1.5 block font-display font-semibold">
        {label} {optional && <span className="font-sans text-sm font-normal text-cocoa-soft">{optional}</span>}
      </label>
      {children}
      {error && (
        <p id={`cake-${id}-error`} className="mt-1.5 text-sm font-semibold text-cocoa">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}
