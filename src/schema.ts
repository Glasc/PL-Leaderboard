import { z } from "zod";

export const standingsSchema = z.array(
  z.union([
    z.object({
      team: z.object({
        id: z.string(),
        uid: z.string(),
        location: z.string(),
        name: z.string(),
        abbreviation: z.string(),
        displayName: z.string(),
        shortDisplayName: z.string(),
        isActive: z.boolean(),
        logos: z.array(
          z.object({
            href: z.string(),
            width: z.number(),
            height: z.number(),
            alt: z.string(),
            rel: z.array(z.string()),
            lastUpdated: z.string(),
          })
        ),
        isNational: z.boolean(),
      }),
      note: z.object({
        color: z.string(),
        description: z.string(),
        rank: z.number(),
      }),
      stats: z.array(
        z.union([
          z.object({
            name: z.string(),
            displayName: z.string(),
            shortDisplayName: z.string(),
            description: z.string(),
            abbreviation: z.string(),
            type: z.string(),
            value: z.number(),
            displayValue: z.string(),
          }),
          z.object({
            id: z.string(),
            name: z.string(),
            abbreviation: z.string(),
            displayName: z.string(),
            shortDisplayName: z.string(),
            description: z.string(),
            type: z.string(),
            summary: z.string(),
            displayValue: z.string(),
          }),
        ])
      ),
    }),
    z.object({
      team: z.object({
        id: z.string(),
        uid: z.string(),
        location: z.string(),
        name: z.string(),
        abbreviation: z.string(),
        displayName: z.string(),
        shortDisplayName: z.string(),
        isActive: z.boolean(),
        logos: z.array(
          z.object({
            href: z.string(),
            width: z.number(),
            height: z.number(),
            alt: z.string(),
            rel: z.array(z.string()),
            lastUpdated: z.string(),
          })
        ),
        isNational: z.boolean(),
      }),
      stats: z.array(
        z.union([
          z.object({
            name: z.string(),
            displayName: z.string(),
            shortDisplayName: z.string(),
            description: z.string(),
            abbreviation: z.string(),
            type: z.string(),
            value: z.number(),
            displayValue: z.string(),
          }),
          z.object({
            id: z.string(),
            name: z.string(),
            abbreviation: z.string(),
            displayName: z.string(),
            shortDisplayName: z.string(),
            description: z.string(),
            type: z.string(),
            summary: z.string(),
            displayValue: z.string(),
          }),
        ])
      ),
    }),
  ])
);

export const seasonSchema = z.array(
  z.object({
    year: z.number(),
    startDate: z.string(),
    endDate: z.string(),
    displayName: z.string(),
    types: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        abbreviation: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        hasStandings: z.boolean(),
      })
    ),
  })
)


export type Standings = z.infer<typeof standingsSchema>;
