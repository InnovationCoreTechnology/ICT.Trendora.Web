# Trendora frontend architecture

Last reviewed: **2026-11-18**. This document describes the current implementation of the application under active development and labels future work separately. It is a project architecture decision, not a required React folder standard.

## 1. Product scope and current status

Trendora is a customer-facing e-commerce application under active development. The storefront foundation is implemented, with mock product data used while backend integration is pending. The **public storefront is the default page**; browsing does not require login. Authentication, account management, cart, and checkout are planned for subsequent phases. Seller/admin dashboards are outside the first milestone.

Implemented in source:

- Shared store header, search form, homepage category navigation, footer, and layout.
- HomePage with promotional sections, eight fictional products, product cards, and local decorative SVG illustrations.
- Search and category filtering through URL query parameters, plus an empty-results state and a clear-filters link.
- Client routing for the homepage, login preview, cart placeholder, and unmatched URLs.
- Login form with required email/password fields, browser email validation, and a demo status message; reusable Button and TextField.
- Active global/design-token CSS and page/layout styles with responsive rules.
- A link from the login preview back to the public storefront.

**Not implemented:** authentication, demo session state, logout, protected routes, successful-login redirects, product detail pages, cart operations, checkout, account dashboard, orders, addresses, backend/API integration, payments, or persistence. The login form only prevents normal form navigation and shows a message. It does not call the empty auth service.

Build and lint passed during the storefront implementation. Browser verification remains incomplete; source-level functionality is not a browser-test result. See section 10.

## 2. Runtime and dependency baseline

| Component | Observed version |
| --- | --- |
| Application | 0.0.0 |
| React / React DOM | 19.3.1 / 19.3.1 |
| React Router | 7.18.5, pinned exactly |
| TypeScript | 6.0.3 |
| Vite | 8.3.8 |
| Vite React plugin | 6.3.0 |
| ESLint | 10.15.0 |
| Node.js / npm | 22.20.0 / 10.9.3 |

The [README package table](../README.md#versions-and-package-responsibilities) lists all 15 direct dependencies, their manifest ranges, resolved versions, and purposes. `package-lock.json` uses format version 3. All direct installed versions match the lockfile; the same-day audit found no mismatch across 164 installed lockfile entries.

React Router 7.18.5 declares Node >=20.0.0 and React/React DOM >=18. These requirements fit the installed environment. During selection, Router 8.5.1 declared Node >=22.22.0, which did not fit Node 22.20.0. Version 8 was not installed. Check exact package metadata before future changes rather than assuming latest documentation matches this project.

There is no `engines`, `packageManager`, or Node version file enforcing the runtime. `@types/node` 24.19.2 targets a newer major than the observed runtime; verify Node API availability before using it. No routing/form/state library other than React Router has been added. There is no automated test runner.

## 3. Current project map

Paths below are relative to the repository root. `[empty]` means a placeholder file with no implementation. Empty directories are shown for orientation but Git does not track them by themselves.

```text
ICT.Trendora.Web/
|-- public/                              # Retained starter assets
|-- docs/
|   `-- architecture.md
|-- src/
|   |-- app/
|   |   |-- App.tsx                       # Owns one BrowserRouter
|   |   |-- routes.tsx                    # Active centralized routes
|   |   |-- providers/                    # Reserved; no provider implementation
|   |   `-- layouts/
|   |       |-- StoreLayout.tsx
|   |       |-- StoreLayout.css
|   |       `-- AccountLayout.tsx         # [empty]
|   |-- features/
|   |   |-- storefront/
|   |   |   |-- components/
|   |   |   |   |-- StoreHeader.tsx
|   |   |   |   |-- CategoryNav.tsx
|   |   |   |   `-- StoreFooter.tsx
|   |   |   `-- pages/
|   |   |       |-- HomePage.tsx
|   |   |       `-- HomePage.css
|   |   |-- products/
|   |   |   |-- product.types.ts
|   |   |   `-- components/
|   |   |       |-- ProductCard.tsx
|   |   |       `-- ProductArtwork.tsx
|   |   |-- auth/
|   |   |   |-- pages/
|   |   |   |   |-- LoginPage.tsx
|   |   |   |   `-- LoginPage.css
|   |   |   |-- components/LoginForm.tsx
|   |   |   |-- hooks/useLogin.ts          # [empty]
|   |   |   |-- services/auth.service.ts   # [empty]
|   |   |   |-- validation/login.validation.ts # [empty]
|   |   |   |-- auth.types.ts              # [empty]
|   |   |   `-- index.ts                   # [empty]
|   |   |-- account/                      # No implemented pages
|   |   `-- orders/                       # No implemented pages
|   |-- shared/
|   |   |-- components/
|   |   |   |-- ui/
|   |   |   |   |-- Button.tsx
|   |   |   |   |-- Card.tsx               # [empty]
|   |   |   |   `-- Alert.tsx              # [empty]
|   |   |   `-- forms/
|   |   |       |-- TextField.tsx
|   |   |       `-- PasswordField.tsx     # [empty]
|   |   |-- api/httpClient.ts             # [empty]
|   |   `-- lib/formatCurrency.ts         # INR display formatting
|   |-- mocks/
|   |   |-- data/
|   |   |   |-- products.ts               # Eight fictional entries
|   |   |   `-- orders.ts                 # [empty]
|   |   `-- services/mockAuth.service.ts  # [empty]
|   |-- styles/
|   |   |-- tokens.css                    # Active design values
|   |   `-- global.css                    # Active base/control styles
|   |-- assets/                          # Retained starter artwork
|   |-- App.css                          # Unused starter stylesheet
|   |-- index.css                        # Unused starter stylesheet
|   `-- main.tsx                         # Mounting and global CSS imports
|-- .gitignore
|-- AGENTS.md
|-- README.md
|-- index.html
|-- package.json
|-- package-lock.json
|-- eslint.config.js
|-- tsconfig.json
|-- tsconfig.app.json
|-- tsconfig.node.json
|-- vite.config.ts
|-- node_modules/                        # Generated; ignored by Git
`-- dist/                                # Generated build output; ignored by Git
```

Root file responsibilities:

| File | Purpose |
| --- | --- |
| `index.html` | Browser entry, root element, title and description |
| `package.json` | Package identity, scripts, and dependency declarations |
| `package-lock.json` | Exact resolved dependency graph |
| `vite.config.ts` | React plugin and Vite configuration |
| `tsconfig.json` | References the app and tooling TypeScript projects |
| `tsconfig.app.json` | TypeScript settings for `src`; ES2023, bundler resolution |
| `tsconfig.node.json` | Tooling settings for `vite.config.ts` |
| `eslint.config.js` | Flat JavaScript/TypeScript/React lint configuration |
| `.gitignore` | Excludes generated output, dependencies, and specified local files |
| `AGENTS.md` | Evidence, compatibility, execution-mode, and validation instructions |
| `README.md` | Project overview, setup, versions, and validation record |

Keep these files outside `src`. Neither the runtime nor build configuration should be removed just because it is not a feature module. Type-aware ESLint rules and an explicit TypeScript `strict` option are not configured. No import alias or React Compiler is configured.

## 4. Current execution and data flow

```text
index.html
  -> main.tsx (tokens.css, global.css, StrictMode)
     -> app/App.tsx (BrowserRouter)
        -> app/routes.tsx
           |-- StoreLayout (header, conditional categories, Outlet, footer)
           |   |-- /       -> HomePage -> ProductCard -> ProductArtwork
           |   |-- /cart   -> informational placeholder
           |   `-- *       -> not-found content
           `-- /login      -> LoginPage -> LoginForm -> TextField + Button
```

`StoreLayout` uses an `Outlet` for its matched child route. CategoryNav appears only when the pathname is `/`. Login has its own presentation outside the store layout. Cart and not-found content are currently inline in `routes.tsx`; there are no separate CartPage or NotFoundPage modules yet.

Mock product flow:

```text
mocks/data/products.ts
  -> app/routes.tsx supplies products as props
     -> HomePage filters the list
        -> ProductCard renders each product
           -> formatCurrency formats the sample price in INR
```

The app layer chooses the mock dataset. HomePage does not import the mock file directly. There is no HTTP request, product service, loading simulation, cart action, or product detail navigation in this flow. SVG illustrations are local decorative artwork, not product photographs.

## 5. Routes, search, and login behavior today

| URL | Behavior |
| --- | --- |
| `/` | Public HomePage; no login guard |
| `/?q=lamp` | Case-insensitive match against product name, category, and description |
| `/?category=Home` | Exact category filter |
| `/?q=lamp&category=Home` | Both filters applied |
| `/login` | Form preview; successful browser validation shows a message only |
| `/cart` | Explains that cart/checkout are not implemented |
| Any unmatched URL | Not-found content under StoreLayout |

`StoreHeader` submits search via router navigation to `/`, preserving other current query parameters. CategoryNav updates `category` while preserving the current query. HomePage reads the same URL parameters; filtered views hide the promotional sections. The clear-filters link returns to `/`. Unknown categories or unmatched queries produce the empty-results view.

Search values are URL state rather than a separate global store. This implementation is designed to support refresh and history navigation, but those interactions have not been browser-verified.

The login form uses uncontrolled HTML inputs, native required/email validation, and React state for its feedback message. It neither reads credentials for authentication nor persists them. There is no success redirect, session provider, or logout behavior. The return-to-store link is user navigation, not successful authentication.

## 6. Layer ownership and conventions

| Area | Responsibility |
| --- | --- |
| `app/` | Startup composition, route definitions, layouts, and selection of implementations/data |
| Feature `pages/` | Screen composition and feature-level presentation |
| Feature `components/` | Business-specific UI such as product cards and login forms |
| Feature `hooks/` | Future extracted React interaction/state coordination when useful |
| Feature `services/` | Future feature data-access contracts and implementations |
| Feature `validation/` | Future pure field checks; backend validation is still required |
| `shared/components/` | Feature-independent controls |
| `shared/lib/` | Small reusable non-React helpers |
| `shared/api/` | Future shared HTTP transport, not business routing policy |
| `mocks/` | Fictional development fixtures and future mock service implementations |

Recommended import direction: `app -> features -> shared`. The app can select mocks. Shared code must not depend on features/app. Feature code must not import `app/routes.tsx`. Explicit cross-feature imports, such as storefront using product components, are allowed when intentional and acyclic. Import boundaries are conventions, not lint-enforced rules yet.

Types describe expected shapes; they are not runtime validation of server responses. Product types live in the products feature. The currency helper remains shared. New forms should own their own values and business validation while reusing TextField and Button. Avoid adding global state or a generic form generator without a concrete need.

Styles load from `tokens.css` then `global.css`, plus StoreLayout, HomePage, and LoginPage CSS. Ordinary CSS is not automatically component-scoped; use specific class names. Storefront CSS currently contains some literal design values as well as shared styles; a later design-system pass can consolidate repeated values without pretending this is already complete.

## 7. Completed changes and remaining cleanup

| Earlier issue or plan | Current state |
| --- | --- |
| Starter counter was the default | Replaced by public storefront routing |
| App moved into `src/app` with broken starter imports | Starter imports removed; App now imports router and AppRoutes |
| Layouts under `providers/layouts` | StoreLayout and AccountLayout now reside in `app/layouts` |
| Mocks missing | Product fixtures implemented; order/auth mocks remain empty |
| Styles empty | Shared styles, layout styles, homepage styles, and login styles populated |
| Router absent | React Router 7.18.5 installed and used |
| Generic HTML title | Trendora title and demo description added; starter favicon reference removed |
| Documentation described the counter | README and this guide now describe the application under active development, separating implemented features from mocks and planned work |

No immediate deletion is required. `src/App.css`, `src/index.css`, starter artwork in `src/assets`, and starter files under `public` have no current source references found in the review. They are cleanup candidates, not active styles/assets. Re-run a reference search before removing them in a separately scoped cleanup. Keep all root configuration and lockfiles. Do not recreate the old `src/App.tsx` alongside the current entry component.

Empty scaffold files are reserved for later phases; they do not provide working components/services and should not be imported as though they do. AccountLayout is still empty.

## 8. Future session and redirect design — not implemented

Keep browsing public. After a future successful login, the fallback destination should be the **homepage `/`**, reflecting the agreed storefront-first experience. If login interrupts an allowed account journey, return to that destination. This supersedes the earlier proposal to always default to `/account`.

Proposed future files:

| File | Future purpose |
| --- | --- |
| `app/navigation.ts` | Path constants, default-after-login value, and safe return-path resolution |
| `app/guards/RequireAuth.tsx` | Gate account routes, never the entire storefront |
| `app/pages/LoginRoute.tsx` | Coordinate navigation and pass callbacks into the login feature |
| `features/auth/context/AuthProvider.tsx` | Shared session state |
| `app/providers/AppProviders.tsx` | Compose providers and inject the selected auth service |

Implementation order:

1. Agree the demo session and future backend contract; choose the intended login method.
2. Implement a typed mock auth service and session provider with explicit checking, anonymous, and authenticated states. Keep the demo clearly labeled; avoid collecting real credentials.
3. Add account pages and register their routes before using them as redirect destinations.
4. Capture the intended internal destination when a protected account page requires login.
5. After session success, resolve that destination through one allowlist/policy. Fall back to `/`; reject external URLs, login loops, and unknown destinations. Handle query/hash/dynamic routes deliberately when needed.
6. Navigate once authenticated, replacing the intermediate login history entry. Apply the same policy for already-authenticated visits to login.
7. Add logout and clear user-specific state. If using an in-memory demo session, document that refresh resets it.

Do not navigate from reusable inputs, HTTP utilities, or mock services. Keep navigation in the app-owned wrapper so auth feature code does not depend on app internals. A client route guard is UX behavior, not authorization; real backend endpoints must validate sessions and permissions.

Future route examples: `/account`, `/account/orders`, and `/account/addresses`. These paths currently match the not-found route. Cookie/token strategy, session restoration, backend URLs, guest-cart merging, and guest-checkout policy remain undecided.

## 9. How to add a form or flow next

Example: customer addresses, which are not implemented yet.

1. Add `features/account/pages/AddressesPage.tsx` for the screen.
2. Add `features/account/components/AddressForm.tsx`, reusing shared fields/buttons.
3. Keep address types and validation within the account feature. Add fields only after confirming address requirements.
4. Define the service contract and a labeled mock implementation; choose the implementation at the app/provider boundary.
5. Implement AccountLayout and session protection before registering protected account routes.
6. Add the route and navigation link centrally. Add it to the approved login-return destinations if appropriate.
7. Decide save, cancel, error, duplicate-submit, and persistence behavior. Ordinary form-save navigation must not be overridden by the login fallback.
8. Verify keyboard access, mobile presentation, errors, empty data, and the successful flow.

Inline forms or dialogs do not always need their own route. Add a URL when the screen needs to be independently addressable. Keep service files and additional hooks small; do not manufacture layers without a need.

## 10. Phases and validation record

| Phase | Current status | Remaining work |
| --- | --- | --- |
| Foundation | App/layout structure and styles implemented | Consolidate style values if needed |
| Shared UI | Button and TextField implemented | Card, Alert, PasswordField remain empty |
| Public storefront | Homepage, local products, search/categories, layout, routes implemented | Browser QA; product details later |
| Login preview | Form and return-to-store link implemented | Mock service/session, failure/loading flows, redirect policy |
| Account and commerce | Not implemented; cart informational placeholder only | Account, orders, addresses, real cart/checkout decisions |
| Documentation | Current status/version update completed | Maintain alongside future changes |
| Production readiness | Not established | Security remediation, behavior tests, backend, hosting/rendering decisions |

Evidence from the storefront implementation on **2026-11-18**:

- `npm run build` passed TypeScript checking and the Vite production build.
- `npm run lint` passed.
- `npm ls --all` reported no dependency-tree problems.
- Subsequent read-only version review found all direct versions consistent and no mismatch across 164 installed lockfile entries.
- Local preview started, but browser verification did not complete. Preview access encountered isolation issues; Windows Computer Use then stopped because it could not confidently determine the current browser URL. No successful visual/responsive/interaction check is claimed.
- `npm audit` reported **11 high-severity findings** in the Vite/TypeScript-ESLint tooling chain, including transitive picomatch/tinyglobby dependencies. React Router was not in that report's affected-package list. No forced or broad automatic fixes were applied. Review compatible remediation before production; this dated report is not a fresh audit.

This documentation update validates claims, paths, versions, and Markdown only. It does not rerun builds, lint, audit, or browser checks. Fresh-install reproducibility, automated behavior tests, and production hosting have not been verified.

Next validation should cover public initial load, search/category combinations, clearing filters, no results, browser Back/Forward, refresh/direct URLs, login validation and return link, cart/not-found screens, keyboard focus, and narrow widths. Configure compatible test tooling when introducing automated behavior tests. Run build/lint after source changes and inspect the dependency tree after package changes.

## 11. Official references and remaining decisions

Use installed-version documentation. The implementation uses React Router 7.18.5, not the newer release currently shown by unversioned documentation pages.

- [React component design](https://react.dev/learn/thinking-in-react)
- [React input behavior](https://react.dev/reference/react-dom/components/input)
- [React state organization](https://react.dev/learn/scaling-up-with-reducer-and-context)
- [React app setup tradeoffs](https://react.dev/learn/build-a-react-app-from-scratch)
- [React Router 7.18.5 routing guide, official tagged source](https://github.com/remix-run/react-router/blob/react-router%407.18.5/docs/start/declarative/routing.md)
- [Vite configuration](https://vite.dev/config/)
- [Accessible field labels](https://www.w3.org/WAI/tutorials/forms/labels/)

Before production, decide backend/session contracts, supported browsers, SEO/rendering needs, and deployment host. A BrowserRouter deployment will need host-specific handling of direct page URLs; preserve asset/API behavior when configuring it. No hosting configuration or deployment is currently established.

The saved agent mode remains `SUGGEST`; explicit implementation requests authorize only their task scope. This documentation update did not change application code, dependencies, or AGENTS.md.
