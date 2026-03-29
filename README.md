# My Dance & Yoga Website

Feel free to get in touch or fly me some feedback.

## Tech Stack

- [Next.js](https://nextjs.org/) 15 (App Router, Turbopack)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) 5.8
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer)
- [react-icons](https://github.com/react-icons/react-icons)
- [react-scroll](https://github.com/fisshy/react-scroll)
- [react-device-detect](https://github.com/duskload/react-device-detect)
- [react-ga](https://github.com/react-ga/react-ga)
- [nodemailer](https://github.com/nodemailer/nodemailer)

## Development

```bash
pnpm install          # Install dependencies
pnpm run dev          # Dev server (Turbopack)
pnpm run build        # Production build
pnpm run validate     # Run typecheck + lint + format check
```

## Quality Tooling

- **Oxlint** + **Oxfmt** for linting and formatting (Rust-based)
- **Husky** + **lint-staged** for pre-commit hooks
- **Commitlint** enforcing `type(scope): description`
- **markdownlint-cli2** for documentation quality
- **GitHub Actions CI** with 8 parallel jobs + gate
- **Gitleaks** for secret scanning
- **Dependabot** for GitHub Actions updates
