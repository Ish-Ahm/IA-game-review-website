import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const reviews = defineCollection({
	// Only read Markdown files directly inside src/content/reviews,
	// so _templates/ and .obsidian/ are ignored.
	loader: glob({ pattern: "*.md", base: "./src/content/reviews" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			// Free text, for example "Superb" or "Great, with a few rough edges".
			rating: z.string().trim().min(1),
			platform: z.enum(["PC", "Steam Deck", "PS5", "Switch", "Xbox"]),
			status: z.enum(["Completed", "100%", "Playing", "Dropped"]),
			// Release year of the game, for example 2019.
			year: z.number().int().nullish(),
			// Second rating, for how much I enjoyed it, as free text.
			enjoyment: z.string().trim().nullish(),
			cover: image().optional(),
		}),
});

export const collections = { reviews };
