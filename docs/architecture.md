# Trendora frontend architecture and implementation guide

Status: proposed architecture with a verified repository audit, 2026-11-18.

This document was requested explicitly. Application code, dependencies, and folders were not repaired or deleted during this documentation task. `AGENT_MODE` remains `SUGGEST`. Examples below are implementation guidance, not running application code.

## 1. Scope and decisions

Build the customer-facing e-commerce experience first: storefront, demo login, account overview, orders, and addresses. Use clearly labeled mock data; no backend currently exists for this project. Seller/admin dashboards, real authentication, payments, and real order creation are later work.

Use feature-based organization with shared UI and centralized application composition. This is a project recommendation, not a mandatory React directory standard. A folder does not provide working functionality by itself.

Proposed default after direct login: `/account`. Visiting `/` should continue to display the public storefront. If login interrupts an allowed account journey, return to that destination after success. The default is a configurable product choice, not an existing behavior.

## 2. Verified repository audit

Inspected files, directory existence, sizes, imports, package manifest, lockfile root, and installed direct packages. All paths below are relative to the repository root.

| Area | Finding | Required next action |
| --- | --- | --- |
| `public/`, `src/assets/` | Present | Keep |
| `src/app/App.tsx` | Present; contains the original starter screen | Repair relative imports before other work |
| `src/main.tsx` | Correctly imports `./app/App.tsx` | Keep this import |
| `src/app/routes.tsx` | Present but empty | Implement during routing phase |
| `src/app/providers/` | Present | Reserve for application provider composition |
| Layout files | Created under `src/app/providers/layouts/` | Move to `src/app/layouts/`; providers and layouts are siblings |
| All proposed auth files | Present but empty | Implement gradually; they currently export no usable components/functions |
| `storefront/`, `products/`, `account/`, `orders/` | Present under `src/features/` | Add feature files when needed |
| Shared UI/form files, `httpClient.ts`, `formatCurrency.ts` | Present but empty | Keep as placeholders or implement when required |
| `src/mocks/` | Missing | Create `data/` and `services/` during the mock feature phase |
| Mock product/order/auth files | Missing | Add the three files shown in the target tree |
| `src/styles/tokens.css`, `global.css` | Present but empty | Populate before replacing existing styles |
| `src/App.css`, `src/index.css` | Existing starter styles remain | Do not delete before migrating their consumers |
| `docs/architecture.md` | Was empty | Populated by this documentation task |
| `package.json`, lockfile, Vite config | Present | Keep; router is not installed |

### Immediate import problem

Moving a file changes the base directory for its relative imports. `src/app/App.tsx` still uses `./assets/...` and `./App.css`. Those resolve to nonexistent paths under `src/app/`.

To retain the starter temporarily, replace its four relative imports with:

```tsx
// In src/app/App.tsx
import heroImg from '../assets/hero.png'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import '../App.css'
```

`..` means the parent directory: from `src/app` back to `src`. Also update the starter's visible `src/App.tsx` instruction to `src/app/App.tsx`, or remove it when replacing the starter UI.

This is a source-inspection finding: all four current target paths were checked and do not exist. No build was run during this audit; do not reuse the README's earlier successful build as proof of the current moved-file state.

### Versions observed

| Package/runtime | Installed version |
| --- | --- |
| React / React DOM | 19.3.1 / 19.3.1 |
| TypeScript | 6.0.3 |
| Vite | 8.3.8 |
| React Vite plugin | 6.3.0 |
| ESLint | 10.15.0 |
| Node.js | 22.20.0 |
| React Router | Not installed |

`npm ls --depth=0` completed successfully. No dependencies were installed or changed. Router examples use the declarative APIs shown in the official documentation, which displayed version 8.5.1 at inspection. That is a documentation version, not a selected or compatibility-approved project dependency. Check exact engines, peer requirements, and release notes before installation.

## 3. Correct target structure

This is the originally proposed baseline. Additional routing/session files are listed in section 6 and should be introduced when implementing that phase.

```text
ICT.Trendora.Web/
|-- public/
|-- src/
|   |-- app/
|   |   |-- App.tsx
|   |   |-- routes.tsx
|   |   |-- providers/
|   |   `-- layouts/
|   |       |-- StoreLayout.tsx
|   |       `-- AccountLayout.tsx
|   |-- features/
|   |   |-- auth/
|   |   |   |-- pages/LoginPage.tsx
|   |   |   |-- components/LoginForm.tsx
|   |   |   |-- hooks/useLogin.ts
|   |   |   |-- services/auth.service.ts
|   |   |   |-- validation/login.validation.ts
|   |   |   |-- auth.types.ts
|   |   |   `-- index.ts
|   |   |-- storefront/
|   |   |-- products/
|   |   |-- account/
|   |   `-- orders/
|   |-- shared/
|   |   |-- components/
|   |   |   |-- ui/
|   |   |   |   |-- Button.tsx
|   |   |   |   |-- Card.tsx
|   |   |   |   `-- Alert.tsx
|   |   |   `-- forms/
|   |   |       |-- TextField.tsx
|   |   |       `-- PasswordField.tsx
|   |   |-- api/httpClient.ts
|   |   `-- lib/formatCurrency.ts
|   |-- mocks/
|   |   |-- data/
|   |   |   |-- products.ts
|   |   |   `-- orders.ts
|   |   `-- services/mockAuth.service.ts
|   |-- styles/
|   |   |-- tokens.css
|   |   `-- global.css
|   |-- assets/
|   `-- main.tsx
|-- docs/architecture.md
|-- package.json
|-- package-lock.json
`-- vite.config.ts
```

Keep root `index.html`, `.gitignore`, ESLint and TypeScript configs, README, and AGENTS.md even though the abbreviated tree does not list them. Git does not track empty directories; implement real files as phases progress, or use an intentional `.gitkeep` placeholder when preserving an empty folder is necessary.

## 4. Ownership and dependency rules

| Location | Responsibility |
| --- | --- |
| `app/` | Connect features, router, layouts, and shared providers; comparable to startup wiring in .NET |
| Feature `pages/` | Compose screens and coordinate page-level navigation |
| Feature `components/` | Business-specific presentation such as login forms or order cards |
| Feature `hooks/` | React state and interaction coordination where separation is useful |
| Feature `services/` | Typed data-access contracts and real implementations when the backend exists |
| Feature `validation/` | Pure client-side field checks; backend validation remains necessary |
| `shared/components/` | Feature-independent buttons, fields, feedback, and containers |
| `shared/api/` | Shared transport behavior; do not put feature URLs or redirect policy here |
| `mocks/` | Demo fixtures and service implementations |
| `styles/` | Global base styles and design values |

Import direction: `app -> features -> shared`; `app` can also use `shared` and select mock implementations. Shared code must not import features or app code. Features must not import `app/routes.tsx`. Avoid circular dependencies. Public feature exports belong in the feature's `index.ts`; feature internals should use direct local imports.

Keep session state in the auth feature, and mount its provider through `app/providers`. A shared button must not know how login or navigation works. No need for a dependency-injection library: passing a typed service into a provider is sufficient for the prototype.

## 5. Safe cleanup checklist

There are no files that must be deleted immediately. Interpret cleanup as migration followed by removal of unused files, not deletion of the working entry point.

| Candidate | Action and prerequisite |
| --- | --- |
| `src/app/providers/layouts/StoreLayout.tsx` | Move to `src/app/layouts/StoreLayout.tsx`; preserve contents |
| `src/app/providers/layouts/AccountLayout.tsx` | Move to `src/app/layouts/AccountLayout.tsx`; preserve contents |
| Old `src/app/providers/layouts/` directory | Remove only after both files are moved and the directory is empty |
| `src/App.css` | Remove only after replacing the starter and removing its import or migrating required rules |
| `src/index.css` | Remove only after migrating desired styles and updating `main.tsx` |
| `src/assets/hero.png`, `react.svg`, `vite.svg` | Remove only after replacing all starter references |
| `public/icons.svg` | Remove only after removing starter SVG references |
| `public/favicon.svg` | Replace or remove only after updating the reference in `index.html` |
| Empty new TS/TSX files | Not harmful merely because empty; do not import them as components until they have exports |

The old `src/App.tsx` is already absent: do not recreate it alongside `src/app/App.tsx`. Preserve `main.tsx`, `index.html`, package/config files, and the lockfile. Do not delete `node_modules` or the lockfile to solve an import-path problem.

## 6. Configuration order

1. Repair the four `App.tsx` imports and move layouts to the intended sibling folder. First restore a working baseline.
2. Populate `styles/tokens.css` with design values and `styles/global.css` with base styles. Then import both from `main.tsx`, in that order. Remove the old global CSS import only after migration. Current starter CSS includes root width/text alignment rules unsuitable for blindly carrying into every new page.
3. Select an exact compatible React Router version using official package metadata and release notes. Verify React 19.3.1, Node 22.20.0, and the installed TypeScript tooling. Install only during an implementation-authorized task; update the manifest and lockfile together. Do not mix tutorials using different router modes or package versions.
4. For this prototype, use declarative routing with one `BrowserRouter`. Add `app/providers/AppProviders.tsx` to compose the router and auth provider. Add `features/auth/context/AuthProvider.tsx` and its context/hook module to own demo session state. Inject the mock service from the app layer.
5. Add `app/navigation.ts` for path constants and redirect policy. Add `app/guards/RequireAuth.tsx` for protected route UI. These are additional proposed files, not missing items from the original baseline tree.
6. Implement exported page/layout components before importing them into `app/routes.tsx`. Replace the starter in `app/App.tsx` with the routes component. Keep root mounting in `main.tsx`.
7. Use relative imports initially. No alias is configured; introducing `@/` requires matching TypeScript and Vite configuration. Folder creation alone needs no Vite configuration change.
8. Before deployment, configure the selected host to serve the SPA entry for client page URLs while preserving assets/API handling. Verify a direct visit and refresh on `/account/orders`. Exact hosting rules depend on the host and have not been selected.

Composition outline (design, not executable code):

```text
main.tsx
  StrictMode
    AppProviders
      BrowserRouter
        AuthProvider (receives mock auth service)
          App
            AppRoutes
```

The diagram represents nesting once, not providers that recursively include themselves. Keep `AuthProvider` independent of route destinations; navigation policy belongs to the application layer.

Official router installation guide: https://reactrouter.com/start/declarative/installation

## 7. Central routing and default pages

Proposed route map:

| URL | Page | Access/layout |
| --- | --- | --- |
| `/` | `features/storefront/pages/HomePage.tsx` | Public / StoreLayout |
| `/login` | Existing auth LoginPage placeholder, once implemented | Public |
| `/account` | `features/account/pages/AccountPage.tsx` | Demo session / AccountLayout |
| `/account/orders` | `features/orders/pages/OrdersPage.tsx` | Demo session / AccountLayout |
| `/account/addresses` | `features/account/pages/AddressesPage.tsx` | Demo session / AccountLayout |
| Unmatched URL | `app/pages/NotFoundPage.tsx` | Show a useful not-found screen |

A layout renders common page structure and an `Outlet`, the location where a matched child page appears. An index route is the default child at the parent URL. Keep this mapping in one `app/routes.tsx`, rather than switching pages with local boolean flags.

Abbreviated route illustration: component imports and implementations are prerequisites and intentionally omitted.

```tsx
<Routes>
  <Route element={<StoreLayout />}>
    <Route index element={<HomePage />} />
  </Route>
  <Route path="login" element={<LoginPage />} />
  <Route element={<RequireAuth />}>
    <Route path="account" element={<AccountLayout />}>
      <Route index element={<AccountPage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="addresses" element={<AddressesPage />} />
    </Route>
  </Route>
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

Use React Router's `Link`/`NavLink` for internal navigation. See official routing guidance: https://reactrouter.com/start/declarative/routing

## 8. Centralize successful-login redirects

Do not put `window.location` changes or destination strings into reusable form fields, the HTTP client, or mock services. Put the destination decision in `app/navigation.ts`, and coordinate it through an app-owned `LoginRoute` wrapper around `LoginPage`.

Suggested additional file: `app/pages/LoginRoute.tsx`. In the route illustration above, replace the direct `LoginPage` element with this wrapper when implementing navigation. It reads router state, passes an `onAuthenticated` callback to `LoginPage`, and uses the shared redirect function. The feature receives a callback rather than importing `app/`.

Example policy for the initial fixed account routes (proposed TypeScript; not installed):

```ts
// src/app/navigation.ts
export const paths = {
  home: '/',
  login: '/login',
  account: '/account',
  orders: '/account/orders',
  addresses: '/account/addresses',
} as const

export const DEFAULT_AFTER_LOGIN = paths.account

const allowedReturnPaths: ReadonlySet<string> = new Set([
  paths.account,
  paths.orders,
  paths.addresses,
])

export function getPostLoginPath(requested: unknown): string {
  if (typeof requested === 'string' && allowedReturnPaths.has(requested)) {
    return requested
  }
  return DEFAULT_AFTER_LOGIN
}
```

To default to the storefront instead, change `DEFAULT_AFTER_LOGIN` to `paths.home`. Do not change every form. This minimal allowlist deliberately rejects external URLs, login itself, unknown routes, and paths with query/hash suffixes. Extend it deliberately for future dynamic routes or preserved search parameters; never accept an arbitrary `returnUrl` unchecked.

Login flow:

1. `RequireAuth` reads session status: `checking`, `anonymous`, or `authenticated`.
2. While checking, show a pending screen; do not redirect prematurely.
3. For an anonymous visit to an account route, navigate to login with replacement and save the desired pathname in router state as `returnTo`.
4. The login feature performs the demo sign-in. It updates shared session state only after success. On failure, remain on login and display the error.
5. The app-owned login wrapper resolves `returnTo` with `getPostLoginPath` and navigates once the session is authenticated. Use the same policy for already-authenticated visitors to login.
6. `navigate(destination, { replace: true })` replaces the login history entry. This avoids leaving the intermediate login screen as the immediate Back destination; it does not erase the browser's full history.
7. Logout clears demo session and user-specific data, then navigates to login with replacement. Protected screens must not remain visible after logout.

Examples:

| Entry | Result after successful demo login |
| --- | --- |
| Open login directly | `/account` |
| Open orders while signed out | `/account/orders` |
| Invalid/external requested destination | `/account` |
| Failed sign-in | Stay on `/login` |

Keep demo session in memory initially; browser refresh resets it. Label the flow as a demo. Frontend route guards organize UX, not real authorization. The eventual backend must validate the session and permissions for every protected operation. Cookie/token and session-restoration contracts remain undecided.

Official navigation references: https://reactrouter.com/api/hooks/useNavigate and https://reactrouter.com/api/components/Navigate

## 9. Add a new form or flow

Example: adding customer addresses.

1. Create `features/account/pages/AddressesPage.tsx` to assemble the screen.
2. Create `features/account/components/AddressForm.tsx` to own field values, field errors, and submission UI. Reuse shared fields and buttons.
3. Add address types and pure validation within `features/account/`; do not put address rules in `shared/components/forms`.
4. Add a feature service contract and a mock implementation. The app/provider selects the implementation so the page is not coupled to demo data.
5. Register the page under `/account` in `app/routes.tsx`. Parent account layout and protection are reused.
6. Add an account navigation link and, if appropriate, add the URL to the post-login return allowlist.
7. Decide the successful-save behavior: stay with a confirmation or return to the address list. Login default policy should not override ordinary form-save navigation.
8. Check required fields, server-style failures, duplicate submission, editing/canceling, empty results, keyboard access, and mobile layout. Clearly state that in-memory changes reset on refresh.

A form does not always need a route: an inline edit form or dialog can belong to an existing page. A route is needed when the screen should have its own addressable URL.

## 10. Implementation phases and checks

| Phase | Deliverable | Verification |
| --- | --- | --- |
| A | Fix moved-file imports and layout placement | Build/lint; starter loads |
| B | Populate shared styles, Button, TextField, Alert | Keyboard/focus/error presentation |
| C | Select router, add exported pages/layouts, central route map | Direct URLs, Back/Forward, nested pages, not found |
| D | Mock auth provider/service, login wrapper, guard, redirect policy | Direct login, interrupted journey, invalid destination, failed login, logout, refresh |
| E | Account, orders, address flows | Mock loading/error/empty/success and isolated feature behavior |
| F | Cleanup unused starter files and update README | Reference search, build/lint, browser checks |

For authorized implementation, run `npm run build` and `npm run lint`; run `npm ls --all` after dependency changes. No test runner is currently configured. Select compatible test tooling when adding meaningful tests, especially redirect policy and login integration tests. Do not claim a successful build proves authentication or navigation correctness.

Documentation-task verification: repository path/size inspection, import-target existence checks, installed dependency listing, and official router documentation review. Build, lint, server startup, browser tests, and example-code compilation were not performed. The README still describes the earlier starter paths and unknown product purpose; update it after the implementation baseline is repaired, distinguishing the agreed e-commerce goal from implemented functionality.

## 11. Reference policy

Re-check package versions before implementing examples. The router dependency is not yet selected; no new compatibility guarantee is implied. Keep the lockfile and verify the final integration.

- React component design: https://react.dev/learn/thinking-in-react
- React state organization: https://react.dev/learn/scaling-up-with-reducer-and-context
- React app setup tradeoffs: https://react.dev/learn/build-a-react-app-from-scratch
- Router declarative setup: https://reactrouter.com/start/declarative/installation
- Nested layouts and routes: https://reactrouter.com/start/declarative/routing
- Programmatic navigation: https://reactrouter.com/api/hooks/useNavigate
- Declarative redirect component: https://reactrouter.com/api/components/Navigate

Before production, decide backend/session contracts, deployment host, supported browsers, and storefront SEO/rendering requirements. The prototype architecture does not establish those decisions.
