# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Josh Mu's dance portfolio website built with Next.js (App Router), TypeScript, and Tailwind CSS. It's a single-page application with smooth scrolling between sections, animations and a contact form.

Domain terms (Section, Contact message, Mailer, Banner, Critic review, Company) are defined in `CONTEXT.md`.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (Turbopack)
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm start

# Validation
pnpm run typecheck        # TypeScript type checking
pnpm run lint             # Oxlint linting
pnpm run lint:fix         # Oxlint with auto-fix
pnpm run format           # Oxfmt auto-format
pnpm run format:check     # Oxfmt check (no write)
pnpm run lint:md          # Markdown linting
pnpm run lint:knip        # Dead code detection
pnpm run validate         # Run typecheck + lint + format:check

# Tests (Vitest + React Testing Library, jsdom)
pnpm test                 # Watch mode
pnpm run test:run         # Single run
```

## Architecture & Structure

### Routing Pattern

- Uses Next.js App Router (migrated from Pages Router)
- Single-page application with section-based navigation
- API route in `/app/api/` using a Route Handler for the contact email

### Component Organization

```text
src/components/
├── shared/          # Reusable components (Layout, Nav, Footer, etc.)
├── Hero/           # Landing section with theme toggle
├── About/          # About section
├── Contact/        # Contact form with email API
└── ...            # Other section components
```

### Path Aliases

TypeScript path aliases are configured for clean imports:

- `@/components/*` → `src/components/*`
- `@/shared/*` → `src/components/shared/*`
- `@/context/*` → `src/context/*`
- `@/hooks/*` → `src/hooks/*`
- `@/services/*` → `src/services/*`
- `@/styles/*` → `./styles/*`

### Styling Architecture

1. **Tailwind CSS** for utility classes
2. **SCSS** for global styles (`app/globals.scss`)
3. **CSS Variables** for theming:
   - `--text`, `--background`, `--primary`, `--secondary`, `--accent`
   - Theme toggle functionality in Hero component

### State Management

- React Context API for global state
- `GlobalContext` and `ThemeContext` in `/src/context/`
- No external state management libraries

### Key Dependencies

- **framer-motion**: Page transitions and animations
- **react-scroll**: Smooth section navigation
- **react-intersection-observer**: Viewport detection
- **nodemailer**: Contact form email sending
- **react-ga**: Google Analytics tracking

## Environment Variables

Required in `.env.local`:

```text
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

## TypeScript Configuration

- TypeScript strict mode is **disabled** (`strict: false`)
- Only `strictNullChecks` is enabled
- JSX files use `.tsx` extension
- Path aliases configured in `tsconfig.json`

## API Routes

- `/app/api/email/route.ts` - Handles contact form submissions via nodemailer

## Validation & Quality

### Linting & Formatting

- **Oxlint** (replacing ESLint) — Rust-based linter, 50-100x faster. Plugins: typescript, react, nextjs, react-perf. Config in `.oxlintrc.json`
- **Oxfmt** (replacing Prettier) — Rust-based formatter, 100% Prettier-compatible

### Pre-commit Hooks

Husky + lint-staged enforce quality on every commit:

- **pre-commit**: oxfmt and oxlint --fix, markdownlint (staged files), then full typecheck
- **commit-msg**: commitlint validates conventional commit format

### Commit Convention

All commits must follow `type(scope): description` format. Scope is **required**.

Common types: `feat`, `fix`, `chore`, `docs`, `ci`, `refactor`, `style`, `test`

### CI/CD (GitHub Actions)

9 parallel jobs on push to `main` and PRs:

| Job           | Tool                      | Blocking          |
| ------------- | ------------------------- | ----------------- |
| Lint          | Oxlint                    | Yes               |
| Format        | Oxfmt                     | Yes               |
| Typecheck     | tsc --noEmit              | Yes               |
| Commitlint    | @commitlint/cli (PR only) | Yes               |
| Unit Tests    | Vitest                    | Yes               |
| Markdown Lint | markdownlint-cli2         | Yes               |
| Secret Scan   | Gitleaks (CLI binary)     | Yes               |
| Dead Code     | Knip                      | Yes               |
| Dep Audit     | pnpm audit (critical)     | Yes               |

Stable gate job (`ci-status`) aggregates all results for branch protection. There is no build job: Vercel builds and deploys `main`, so run `pnpm build` locally before pushing.

### Markdown Linting

markdownlint-cli2 with config in `.markdownlint-cli2.jsonc`. Disabled rules: MD013 (line length), MD033 (inline HTML), MD041 (first-line heading).

## Known Issues & Notes

- Tests use Vitest with React Testing Library in jsdom. Shared stubs (IntersectionObserver, scrollIntoView, matchMedia, framer-motion skipAnimations) live in `vitest.setup.ts`
- The project uses pnpm (migrated from npm)
- Next.js 16 with App Router
- Turbopack enabled for faster development builds

## Development Patterns

- Components are organized by feature with each component in its own folder
- Fixed background images handled by dedicated components
- Responsive design with mobile menu support
- SEO optimization with comprehensive meta tags in Layout component
- Custom hooks for location tracking and media queries
