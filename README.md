# Game Reviews

A personal static website of game reviews, built with [Astro](https://astro.build). Reviews are Markdown files written in Obsidian.

## Run locally

You need Node.js 22.12 or newer.

```sh
npm install      # first time only
npm run dev      # start the dev server, usually at http://localhost:4321
npm run build    # build the site into dist/
npm run preview  # preview the built site
```

## Add a review in Obsidian

1. Open `src/content` as an Obsidian vault.
2. Create a new note inside the `reviews` folder. The file name becomes the page address, so "Elden Ring.md" becomes `/reviews/elden-ring`.
3. Insert the Templater template `_templates/Review.md`, then fill in the frontmatter:

   | Field | Notes |
   |---|---|
   | `title` | Game title |
   | `rating` | Any text you like, for example `Superb`. Wrap it in quotes if it contains a colon |
   | `platform` | `PC`, `Steam Deck`, `PS5`, `Switch` or `Xbox` |
   | `played` | Date in `YYYY-MM-DD` format |
   | `status` | `Completed`, `100%`, `Playing` or `Dropped` |
   | `cover` | Optional. Path such as `covers/elden-ring.jpg`. Delete the line if there is no cover |

4. Write your review below the frontmatter, using standard Markdown (no `[[wikilinks]]`).
5. Put cover images in `src/content/reviews/covers/`.
6. Commit and push. Cloudflare Pages rebuilds the site automatically.

The three "Sample" reviews are placeholders. Delete them, and their images in `covers/`, when you have real ones.

If a review is missing a required field or uses an invalid value, `npm run build` fails and names the file and field at fault.

## Restyle the site

All colours, fonts, spacing and widths are CSS variables at the top of `src/styles/global.css`. Component styles live in `<style>` blocks inside each `.astro` file.

## Deploy to Cloudflare Pages

Connect the GitHub repository to Cloudflare Pages with these settings:

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variable | `NODE_VERSION` = `22` |

The environment variable makes Cloudflare use a Node.js version that meets Astro's requirement.

## Project structure

```text
src/
├── components/     Header, Footer, ReviewRow, Rating
├── layouts/        BaseLayout
├── pages/          index, about, reviews/[id]
├── styles/         global.css (design tokens)
├── content.config.ts   review schema
└── content/        Obsidian vault
    ├── _templates/Review.md
    └── reviews/    one Markdown file per game, plus covers/
```
