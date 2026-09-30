import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// The platforms a review can be tagged with. A review can list more than one
// (for example a game played on both PC and PS4). Add to this list, in one
// place, to make a new platform available everywhere on the site.
export const PLATFORM_OPTIONS = ["PC", "PS4", "PS5", "Switch", "Steam Deck", "Xbox"] as const;

const reviews = defineCollection({
	// Only read Markdown files directly inside src/content/reviews/entries,
	// so _templates/ and .obsidian/ are ignored.
	loader: glob({ pattern: "*.md", base: "./src/content/reviews/entries" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			// Free text, for example "Superb" or "Great, with a few rough edges".
			rating: z.string().trim().min(1),
			// One or more of PLATFORM_OPTIONS above, for example ["PC", "PS4"].
			platform: z.array(z.enum(PLATFORM_OPTIONS)).min(1),
			status: z.enum(["Completed", "100%", "Playing", "Dropped"]),
			// Studio that made the game, for example "Remedy Entertainment".
			developer: z.string().trim().nullish(),
			// A short, spoiler-free summary shown in the review list, for people who
			// do not want the full review. Falls back to the review's first paragraph.
			summary: z.string().trim().nullish(),
			// Release year of the game, for example 2019.
			year: z.number().int().nullish(),
			// Second rating, for how much I enjoyed it, as free text.
			enjoyment: z.string().trim().nullish(),
			// A blank or missing cover shows an empty box instead.
			cover: image().nullish(),
		}),
});

export const collections = { reviews };
