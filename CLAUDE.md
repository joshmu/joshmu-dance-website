# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Josh Mu's dance portfolio website built with Next.js (Pages Router), TypeScript, and Tailwind CSS. It's a single-page application with smooth scrolling between sections and features animations, contact forms, and media galleries.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Architecture & Structure

### Routing Pattern
- Uses Next.js Pages Router (not App Router)
- Single-page application with section-based navigation
- API routes in `/pages/api/` for email and Instagram functionality

### Component Organization
```
src/components/
├── shared/          # Reusable components (Layout, Nav, Footer, etc.)
├── Hero/           # Landing section with theme toggle
├── About/          # About section
├── Contact/        # Contact form with email API
├── Gallery/        # Media gallery components
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
2. **SCSS** for global styles (`/styles/`)
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
```
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

## TypeScript Configuration

- TypeScript strict mode is **disabled** (`strict: false`)
- Only `strictNullChecks` is enabled
- JSX files use `.tsx` extension
- Path aliases configured in `tsconfig.json`

## API Routes

- `/api/email` - Handles contact form submissions via nodemailer
- `/api/instagram` - Instagram feed integration (currently commented out)
- `/api/hello` - Example API route

## Known Issues & Notes

- Instagram Gallery component is commented out due to API issues
- No testing framework is configured
- The project uses npm (not yarn or pnpm) based on `package-lock.json`
- Currently on feature branch `feat_infra-update` with recent infrastructure updates

## Development Patterns

- Components are organized by feature with each component in its own folder
- Fixed background images handled by dedicated components
- Responsive design with mobile menu support
- SEO optimization with comprehensive meta tags in Layout component
- Custom hooks for location tracking and media queries