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
			// Whole numbers from 0 to 10.
			rating: z.number().int().min(0).max(10),
			platform: z.enum(["PC", "Steam Deck", "PS5", "Switch", "Xbox"]),
			played: z.coerce.date(),
			status: z.enum(["Completed", "100%", "Playing", "Dropped"]),
			cover: image().optional(),
		}),
});

export const collections = { reviews };
