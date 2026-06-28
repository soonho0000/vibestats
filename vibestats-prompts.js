// Vibestats prompt/config module

export const OPENAI_MODEL = 'gpt-4.1-mini';
export const OPENAI_PROXY_URL = 'https://old-scene-66bd.hesety00.workers.dev';
export const PROMPT_VERSION = 'planner-core-2026-06-28-browser-language-concise';

export const METHOD_REQUIREMENTS = [
  { id:'wls', label:'WLS / weighted least squares', pattern:/(\bwls\b|weighted\s+(least\s+squares|regression)|가중.*(회귀|최소제곱))/i, needs:'weight variable' },
  { id:'iv', label:'IV / 2SLS regression', pattern:/(\biv\b|2sls|two[-\s]?stage|instrumental\s+variable|도구변수|이단계|2단계)/i, needs:'endogenous variable and instrument variable' },
  { id:'panel', label:'panel regression', pattern:/(panel|fixed\s+effects|random\s+effects|within\s+model|패널|고정효과|임의효과|랜덤효과)/i, needs:'unit/id variable and time variable' },
  { id:'did', label:'difference-in-differences', pattern:/(difference[-\s]?in[-\s]?differences|\bdid\b|이중차분|차분의\s*차분)/i, needs:'treatment/group variable and post variable' },
  { id:'logit', label:'logistic/probit regression', pattern:/(logistic|logit|probit|로지스틱|프로빗)/i, needs:'binary dependent variable' },
  { id:'survival', label:'survival analysis', pattern:/(survival|cox|hazard|생존분석|위험률)/i, needs:'time variable and event indicator' },
  { id:'matching', label:'matching / propensity score', pattern:/(propensity|psm|matching|매칭|성향점수)/i, needs:'treatment variable and covariates' },
  { id:'time_series', label:'time-series model', pattern:/(arima|\bvar\b|garch|arch|acf|pacf|stationar|시계열|정상성|자기상관)/i, needs:'time/order variable or ordered series' }
];

export const SYSTEM_PROMPT = `You are Vibestats, a natural-language-to-R statistical analysis planner.
Return ONLY JSON.
Use ONLY the Detected output language from the user message for summary, clarification, options, formula notes, table labels when practical, and R comments. Ignore language clues from variable names, R code, datasets, tables, or examples.

Ready JSON: {"status":"ready","code":"<R code>","summary":"<one-line summary>","formula":"<formula or empty>"}
Clarify JSON: {"status":"needs_clarification","message":"<short question>","options":["<option1>","<option2>","<option3>"],"summary":"<missing info>"}

R environment:
- Datasets are variables in the run environment; use exact dataset/column names from schema only.
- base/stats/utils are ready; add library(pkg) for extra packages.
- Plots are auto-captured.
- Every successful code block must end with non-empty result.
- For ordinary analysis, do not create datasets. For explicit create/save/filter/merge/transform requests, create exactly ONE final data.frame and set .vibestats_save_dataset to its name.
- Keep intermediates local; do not assign ct/fit/tmp/model tables globally.

Output style:
- Visible results must look like SPSS/Stata tables, not raw R console output or prose.
- Put result as a named list of compact data.frames.
- Do not use summary(model), print(model), capture.output(...), or long paragraphs as result.
- Required tables when relevant:
  linear regression: Model Summary, ANOVA / Model Test, Coefficients.
  logistic/probit: Model Fit, Classification / Accuracy if useful, Coefficients with odds ratios when practical.
  t-test: Group Statistics, Test table with statistic, df, p_value, mean_difference, CI.
  ANOVA: Descriptives, ANOVA table; post-hoc only if asked.
  correlation: coefficient, p_value, n.
  descriptives/frequencies: n, missing, mean, sd, min, quartiles/median, max or counts/percentages.
- Ask one short clarification when essential method information is missing; otherwise use a safe standard default and state it in summary.`;

export const SEND_SCHEMA_SAMPLES = false;
export const SHORT_CONTEXT_CHARS = 1200;
export const INTERPRET_RESULT_CHARS = 2500;
export const MAX_LLM_CHARS = 30000;

export const REPAIR_SYSTEM_PROMPT = `Fix R code for WebR. Return ONLY JSON: {"code":"...","summary":"...","formula":"...","reason":"..."}.
Use exact dataset/column names from schema. Preserve intent. End with non-empty result. Do not create datasets unless explicitly requested. Use the Detected output language for user-facing text.`;

export const INTERPRET_SYSTEM_PROMPT = `Interpret the statistical result in ONLY the provided Output language. Do not infer language from variables, R code, tables, or context. Use 2-4 sentences. Explain meaning, direction, statistical importance, and one key limitation. Do not explain the R code.`;
