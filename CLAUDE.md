# CLAUDE.md: Game Review Site

## Project overview

A personal, static website where I (Ishaan) publish reviews of games I have played. Each review has a rating, the platform I played it on, and my written thoughts. The site is for my own use and for sharing my opinions with others. It may grow later, but for now it is a simple static site.

## Division of labour (important)

- **You (Claude Code)** handle the plumbing: project structure, content schema, routing, data logic, build configuration, Obsidian integration files, and deployment preparation.
- **I (Ishaan)** handle the visual design: colours, typography, spacing, card styles, animations, overall look and feel.

Because of this:

- Keep all styling minimal, neutral and structural (layout, spacing, readability). Do not invent a visual identity.
- Put design values (colours, fonts, radii, spacing) in CSS custom properties on `:root` in `src/styles/global.css` so I can restyle the whole site from one place.
- Use semantic HTML and clear, descriptive class names (for example `.review-card`, `.review-card__cover`, `.rating`) so I can target elements easily.
- Keep component styles in scoped `<style>` blocks inside each `.astro` file.
- Do not add Tailwind, React, Vue, UI libraries or other frameworks unless I ask.

## Environment

- OS: EndeavourOS (Arch-based), GNOME desktop
- Package manager for system tools: `pacman` (AUR via `yay` if needed)
- Node.js and npm installed from the official Arch repos
- Obsidian installed from the official Arch repos (not Flatpak)
- Git is initialised in this repository

## Tech decisions (already agreed)

- **Framework:** Astro, static output only (no server adapter)
- **Content:** One Markdown file per game, using Astro content collections with the `glob` loader
- **Writing tool:** Obsidian. The folder `src/content/` is opened as its own Obsidian vault
- **Hosting (later):** Cloudflare Pages, connected to a GitHub repository

Check the Astro version in `package.json` before writing collection code. For Astro 5 or later, collections are defined in `src/content.config.ts` using loaders. If the installed version differs from what you expect, check the official Astro documentation rather than guessing.

## Current state

Only Stage 1 is complete:

- Astro project created from the minimal template, dependencies installed, Git initialised
- The dev server runs with `npm run dev`
- `src/pages/index.astro` may contain a small text edit I made while testing

Everything from Stage 2 onwards still needs to be done. Read the existing files before changing anything so you build on them rather than replacing them blindly.

## Folder structure (target)

```
src/
├── components/
├── layouts/
├── pages/
│   ├── index.astro
│   ├── about.astro
│   └── reviews/
│       └── [id].astro
├── styles/
│   └── global.css
├── content.config.ts
└── content/                ← Obsidian vault root
    ├── .obsidian/          ← Obsidian settings (created by Obsidian)
    ├── _templates/
    │   └── Review.md       ← Templater template
    └── reviews/
        ├── entries/
        │   └── <Game Title>.md
        └── covers/
            └── <image files>
```

## Review schema

Each review file has YAML frontmatter with these fields:

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Game title |
| `rating` | string | yes | Overall rating, custom text, not a number (for example "Superb") |
| `enjoyment` | string | no | Enjoyment rating, custom text, shown next to the overall rating |
| `developer` | string | no | Studio that made the game |
| `summary` | string | no | Short spoiler-free summary shown in the review list; falls back to the review's first paragraph |
| `year` | number | no | Release year of the game |
| `platform` | array of strings | yes | One or more of the values in `PLATFORM_OPTIONS` (content.config.ts), for example `[PC, PS4]` |
| `status` | enum | yes | `Completed`, `100%`, `Playing`, `Dropped` |
| `cover` | image | no | Relative path such as `../covers/game-name.jpg` (reviews live in `reviews/entries`), use Astro's `image()` helper |

Rules for the schema:

- Validate `rating` with `z.string().trim().min(1)`. It is free text chosen by me, so it is never sorted or calculated.
- Any field added in the future must be `.optional()` or have a `.default()` so existing reviews never break.
- The glob loader must only read `*.md` directly inside `src/content/reviews/entries`, so `_templates/` and `.obsidian/` are ignored.
- File names may contain spaces and capitals (Obsidian style). Make sure generated URLs are clean slugs.

## Obsidian compatibility

- Reviews must never rely on Obsidian wikilinks (`[[...]]`). Use standard Markdown links and relative image paths.
- Create `src/content/_templates/Review.md` using Templater syntax:
  - `title` filled with `<% tp.file.title %>`
  - Other fields left empty for me to fill in
- Add `src/content/.obsidian/workspace.json` and `src/content/.obsidian/workspace-mobile.json` to `.gitignore`.
- Obsidian settings and plugins (Templater, Obsidian Git, link format, attachment folder) are configured by me manually inside Obsidian. Do not try to write Obsidian's config JSON. Instead, list the settings I need to change at the end of that stage.

## Stage plan

Work through one stage at a time. At the end of each stage: run `npm run build` to confirm there are no errors, summarise what you did in plain language, list anything I need to do manually, then commit with a clear message. Wait for my go-ahead before starting the next stage.

### Stage 2: Layout and base components
- Create the folders `src/layouts`, `src/components` and `src/styles`.
- `src/styles/global.css`: design tokens as CSS custom properties on `:root` (background, surface, text, muted text, accent/link colour, border colour, font family, content max width, spacing scale, border radius), plus minimal base styles: a basic dark theme, body as a full-height flex column so the footer sits at the bottom, a centred `main` with a max width and padding, and simple link styles.
- `src/components/Header.astro`: site name linking to `/` (placeholder text "My Game Reviews") and a `<nav>` with links to Home and About. Scoped styles only for layout (flex, spacing).
- `src/components/Footer.astro`: copyright line "© {current year} Ishaan", with the year calculated in the frontmatter.
- `src/layouts/BaseLayout.astro`: imports the header, footer and `global.css`, accepts `title` (required) and `description` (optional) props, sets `lang="en-GB"`, charset, viewport meta, favicon link and `<title>`, then renders `<Header />`, `<main><slot /></main>` and `<Footer />`.
- Rewrite `src/pages/index.astro` to use `BaseLayout` with a heading and a one-line intro.
- Create `src/pages/about.astro` using `BaseLayout` with placeholder text.
- Explain `Astro.props`, `<slot />`, scoped styles and imports in simple terms in your summary, since I am learning.

### Stage 3: Content collection
- Create `src/content.config.ts` with the `reviews` collection and schema above.
- Add two or three sample reviews (clearly marked as samples in the text) with realistic data. One should have no cover to test the optional field.
- Show a simple list of reviews on the homepage, sorted alphabetically by title, to prove the data flows through.

### Stage 4: Obsidian preparation
- Create the `_templates/Review.md` template and the `reviews/covers/` folder (with a `.gitkeep`).
- Update `.gitignore` as described above.
- Give me a checklist of the Obsidian settings and plugins to configure.

### Stage 5: Pages and components
- `src/components/ReviewCard.astro`: cover (with a neutral placeholder when missing), title, rating, platform, status.
- `src/components/Rating.astro`: displays the custom rating text (for example "Superb"). Keep the styling simple so I can redesign it.
- `src/pages/index.astro`: grid of `ReviewCard`s, newest first.
- `src/pages/reviews/[id].astro`: individual review page using `getStaticPaths`, showing all frontmatter fields plus the rendered Markdown body, inside `BaseLayout`.
- Use Astro's `<Image />` component for covers so they are optimised.

### Stage 6: Deployment preparation
- Make sure the project builds cleanly with `npm run build` and the output goes to `dist/`.
- Write a short `README.md` covering: how to run locally, how to add a review in Obsidian, and the Cloudflare Pages settings (build command `npm run build`, output directory `dist`).
- Do not create GitHub repositories, push, or deploy. I will do those steps myself.

## General rules

- Write all UI text, comments and documentation in **British English** (for example "colour", "favourite", "organise").
- Never use em dashes in UI text, comments, commit messages or documentation. Use commas, colons or separate sentences instead.
- Explain what you are doing in plain, beginner-friendly terms. I am new to Astro.
- Do not edit or delete my real review files. You may only create or modify files marked as samples.
- Do not install new npm packages without telling me what each one is for first.
- If something is ambiguous, ask me rather than guessing.
