/**
 * SSOT for how Skif reaches a language model, and what it says when it can't.
 *
 * The model chain is ai-kit's `freeChain`: several vendors, tried in order, so
 * a retired model id or an exhausted free tier moves to the next link instead
 * of taking the feature down. No model id is pinned here. A vendor joins the
 * chain only when its key is set (GROQ_API_KEY, GEMINI_API_KEY,
 * OPENROUTER_API_KEY); with none set, AI is simply "unconfigured" and every
 * form works by hand exactly as before.
 *
 * Where AI is allowed at all is decided in src/config/ai-forms.ts.
 */
export const AI_CONFIG = {
  /** Prefix for ai-kit's per-vendor overrides, e.g. SKIF_GROQ_MODELS. */
  envPrefix: "SKIF",
  /** Optional: the link to START the chain at (still falls back past it). */
  modelEnv: "SKIF_AI_MODEL",
  /** Per link, not overall: one silent vendor must not starve the rest. */
  timeoutMs: 20_000,
} as const;

/** Every sentence the assistant says when it cannot help. Each one tells the
 * person the form still works by hand, so there is never a dead end. */
export const AI_MESSAGES = {
  signIn: "Sign in to use the assistant.",
  unconfigured:
    "Filling the form from a description isn't switched on here. Fill it in by hand — everything works the same.",
  failed: "The assistant couldn't reach an AI provider just now. Nothing changed — fill the form in by hand, or try again later.",
  unavailable: "The assistant is unavailable right now. Fill the form in by hand — nothing is lost.",
} as const;
