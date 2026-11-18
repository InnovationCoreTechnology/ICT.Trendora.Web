# ICT.Trendora.Web

Trendora is a customer-facing e-commerce application under active development, built with React, TypeScript, and Vite. The storefront foundation is implemented. Product data is currently mocked, while authentication, account management, cart, checkout, and backend integration are planned for subsequent phases.

Package name: `ict.trendora.web`; application version: `0.0.0`; private npm package.

## Purpose and current scope

The default page is a public storefront. Visitors can browse eight fictional products, submit searches, and filter categories without signing in. The UI includes a header, category navigation, promotional sections, local SVG product illustrations, product cards, and a footer.

Entry flow: `index.html` → `src/main.tsx` → `src/app/App.tsx` → `src/app/routes.tsx`. React `StrictMode` wraps the app; `App` owns one React Router `BrowserRouter`.

| URL | Current behavior |
| --- | --- |
| `/` | Public homepage; `q` and `category` query parameters filter mock products |
| `/login` | Email/password form preview with browser validation and a demo status message |
| `/cart` | Informational placeholder; no cart operations or checkout |
| Any unmatched URL | Not-found content within the store layout |

**Login does not authenticate, establish a session, or redirect after submission.** A link lets users return to browsing. Products and prices are explicitly sample data. Product detail pages, account dashboards, orders, addresses, real authentication, API/backend integration, payments, and checkout are not implemented.

For current architecture, file responsibilities, and the remaining phases, read [docs/architecture.md](./docs/architecture.md). Confirm backend contracts, authentication method, supported browsers, deployment, and production storefront rendering requirements before implementing those flows.

## Control whether the agent suggests or implements

The single working-mode setting is in `AGENTS.md`:

```text
AGENT_MODE: SUGGEST
```

| Value | Expected behavior |
| --- | --- |
| `SUGGEST` (default) | Inspect the project and official references, then propose changes in chat. Do not edit files, install packages, or execute commands that generate files. |
| `IMPLEMENT` | Make changes within the requested task and run relevant checks. Analysis-only requests still remain read-only. |

For a permanent change, edit that line in `AGENTS.md` or explicitly ask the agent to change the saved mode. For a one-task exception, say: **"Implement the proposed changes for this task."** The saved mode remains unchanged. An ordinary "fix this" request in suggestion mode produces a proposal first.

In either mode, the agent must inspect current code and package versions, verify relevant official guidance, identify missing requirements, and distinguish checked facts from uncertainty. Suggestion mode must report write-producing checks such as the build as not run, rather than claiming validation passed.

This is an instruction for agents that read and follow `AGENTS.md`, not a runtime application option or an enforced filesystem permission. No application code reads this setting.

## Local setup

Run from the repository root:

```powershell
node --version
npm --version
npm ci
npm run dev
```

Open the URL printed by Vite. `npm ci` installs locked dependencies, replaces existing `node_modules`, and fails when the manifest and lockfile disagree. See [npm 10 clean installation](https://docs.npmjs.com/cli/v10/commands/npm-ci/).

The inspected environment uses **Node.js 22.20.0 and npm 10.9.3**. These are observed versions, not enforced project settings: no `engines`, `packageManager`, or Node version file is configured. Use the tested environment as a reproducibility baseline; check package engines and current Node support before choosing another runtime.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run build` | Run TypeScript project checks and build into `dist/` |
| `npm run lint` | Run configured ESLint checks |
| `npm run preview` | Preview the built app locally after building |
| `npm ls --depth=0` | Inspect installed direct dependencies |
| `npm ls --all` | Inspect the full dependency tree |

No test script or test framework is configured. No environment variables or API URLs are required by the inspected application.

## Versions and package responsibilities

Snapshot: **2026-11-18**, checked against `package.json`, `package-lock.json`, and installed package metadata. All 15 direct dependencies matched their locked versions. The same-day dependency review compared 164 installed lockfile entries, including transitive packages, with no version mismatches. Declared ranges allow updates; the lockfile records exact resolutions. Re-check these files instead of treating this table as permanently current.

| Package | Declared range | Locked / installed | Purpose |
| --- | --- | --- | --- |
| `react` | `^19.3.1` | `19.3.1` | Components and state |
| `react-dom` | `^19.3.1` | `19.3.1` | React rendering in the browser |
| `react-router` | `7.18.5` (exact) | `7.18.5` | Client-side routes, navigation, and URL search parameters |
| `@eslint/js` | `^10.0.1` | `10.0.1` | Recommended JavaScript lint rules |
| `@types/node` | `^24.19.2` | `24.19.2` | Node API type declarations |
| `@types/react` | `^19.3.0` | `19.3.0` | React type declarations |
| `@types/react-dom` | `^19.3.0` | `19.3.0` | React DOM type declarations |
| `@vitejs/plugin-react` | `^6.1.2` | `6.3.0` | React integration for Vite |
| `eslint` | `^10.14.0` | `10.15.0` | Static lint checks |
| `eslint-plugin-react-hooks` | `^7.1.1` | `7.1.1` | React Hooks lint rules |
| `eslint-plugin-react-refresh` | `^0.5.7` | `0.5.8` | Refresh-compatible export checks |
| `globals` | `^17.13.0` | `17.14.0` | Global identifiers used by ESLint |
| `typescript` | `~6.0.3` | `6.0.3` | TypeScript compiler |
| `typescript-eslint` | `^8.72.1` | `8.73.0` | TypeScript lint integration |
| `vite` | `^8.3.6` | `8.3.8` | Development server and production bundling |

React, React DOM, and React Router are runtime dependencies; the others are development dependencies. Transitive versions are recorded in `package-lock.json` (lockfile format version 3). There is no separate UI component library. Local components have no independent package version.

## Compatibility findings

Based on locked package metadata and local checks:

- Vite `8.3.8` and React plugin `6.3.0` require Node `^20.19.0 || >=22.12.0`; ESLint `10.15.0` requires `^20.19.0 || ^22.13.0 || >=24`. Observed Node `22.20.0` satisfies these constraints.
- The plugin expects Vite `^8.0.0`; React DOM expects React `^19.3.1`. Installed versions satisfy these peer requirements. Peer dependencies specify versions an integration expects the host application to provide.
- Installed React Router `7.18.5` declares Node `>=20.0.0` and React/React DOM `>=18`; the local versions satisfy those requirements. During selection, npm metadata for Router `8.5.1` declared Node `>=22.22.0`, which excluded the observed Node `22.20.0`. Version 7.18.5 was selected without upgrading Node. Re-check metadata before any future upgrade.
- `typescript-eslint` supports TypeScript `>=4.8.4 <6.1.0` and ESLint `^8.57.0 || ^9.0.0 || ^10.0.0`; installed versions fit. These ranges also appear in the [official compatibility guidance](https://typescript-eslint.io/users/dependency-versions/) checked on the snapshot date.
- `@types/node` targets Node 24 while the observed runtime is Node 22. Types do not upgrade the runtime. Verify actual API availability before using Node APIs; aligning type and runtime majors is a future maintenance decision, not a demonstrated current failure.
- `npm ls --all` succeeded with absent optional dependencies, including platform-specific packages. An optional entry alone does not prove a broken installation; determine whether the requested feature needs it.
- App TypeScript targets ES2023 and uses bundler module resolution. Vite has no explicit production browser target override. Product browser support is undefined; compilation alone does not prove compatibility. Consult [Vite browser support](https://vite.dev/guide/#browser-support) for the applicable release.

These checks demonstrate a working local build, not exhaustive compatibility across browsers, operating systems, or deployments.

## Repository map

| Path | Responsibility |
| --- | --- |
| `src/main.tsx` | React root and global styles |
| `src/app/App.tsx`, `src/app/routes.tsx` | BrowserRouter and centralized route definitions |
| `src/app/layouts/StoreLayout.tsx` | Store header/footer, homepage category navigation, and child route outlet |
| `src/features/storefront/` | Homepage, search header, category navigation, footer, and page styling |
| `src/features/products/` | Product types, reusable product cards, and decorative SVG artwork |
| `src/features/auth/` | Login preview page/form; remaining auth files are placeholders |
| `src/shared/` | Button, TextField, and INR formatting; other scaffold files remain empty |
| `src/mocks/data/products.ts` | Eight fictional catalogue entries; supplied to HomePage by the app layer |
| `src/styles/tokens.css`, `src/styles/global.css` | Active design tokens and global styles |
| `src/App.css`, `src/index.css`, `src/assets/`, `public/` | Retained starter CSS/assets; no current source references found |
| `docs/architecture.md` | Current implementation, full project map, planned work, and validation limits |
| `vite.config.ts` | Vite with React plugin |
| `eslint.config.js` | Flat ESLint configuration for TypeScript/TSX |
| `tsconfig*.json` | App and tooling TypeScript projects |
| `package.json`, `package-lock.json` | Scripts, dependency ranges and resolutions |
| `AGENTS.md` | Evidence, compatibility and validation requirements |

Type-aware ESLint rules are not configured. TypeScript configs do not explicitly set `strict`; inspect effective compiler settings before describing strictness. React Compiler is not enabled in the inspected Vite configuration.

## Validation snapshot

During the storefront implementation on **2026-11-18**, using the existing local installation:

- `npm run build`: passed, including TypeScript checks and Vite output.
- `npm run lint`: passed.
- `npm ls --depth=0` and `npm ls --all`: completed successfully.

A same-day read-only dependency review confirmed matching package versions and no dependency-tree problems. This documentation update checks documentation against source/configuration; it does not rerun the build, lint, or browser tests.

Browser verification was attempted but not completed: local preview access encountered isolation issues, and Windows Computer Use stopped because it could not confidently determine the browser URL. Responsive CSS and interactions are implemented but not browser-verified. A fresh `npm ci`, automated behavior tests, and production deployment validation have not been performed.

The **2026-11-18 npm audit reported 11 high-severity findings** in the Vite/TypeScript-ESLint tooling dependency chain, including transitive `picomatch`/`tinyglobby` dependencies. React Router was not listed among the affected packages in that report. No automatic or forced dependency fixes were applied. This is a dated result, not a current security guarantee; reassess before production and review fixes for compatibility.

## Official implementation references

Use documentation for the installed release. Current pages can describe newer versions; consult maintainer release tags and migration notes when needed.

- [React documentation](https://react.dev/learn)
- [React Router 7.18.5 routing guide (tagged official source)](https://github.com/remix-run/react-router/blob/react-router%407.18.5/docs/start/declarative/routing.md)
- [Vite guide](https://vite.dev/guide/) and [configuration](https://vite.dev/config/)
- [React plugin maintainer repository](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react)
- [TypeScript TSConfig reference](https://www.typescriptlang.org/tsconfig/)
- [ESLint configuration](https://eslint.org/docs/latest/use/configure/)
- [typescript-eslint support matrix](https://typescript-eslint.io/users/dependency-versions/)
- [npm 10 clean installation](https://docs.npmjs.com/cli/v10/commands/npm-ci/)
- [Node.js 22 API documentation](https://nodejs.org/docs/latest-v22.x/api/)

Follow [AGENTS.md](./AGENTS.md) for changes. Instructions cannot guarantee zero hallucinations; evidence, explicit uncertainty, and repeatable checks reduce the risk.
