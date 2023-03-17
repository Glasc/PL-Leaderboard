import { useQuery } from "@tanstack/react-query"
import { seasonSchema } from "../schema"

type useYearsProps = {
  club?: string
  filter?: (years: number[]) => number[] | undefined
}

export const useYears = ({ club, filter }: useYearsProps = {}) => {
  const keys = club ? ["year", club] : ["year"]

  return useQuery({
    queryKey: [keys],
    queryFn: () =>
      fetch(
        `https://api-football-standings.azharimm.dev/leagues/eng.1/seasons`
      ).then((res) =>
        res.json().then((data) => {
          const seasons = seasonSchema.parse(data?.data.seasons)
          const years = seasons.map((season) => season.year)
          return years
        })
      ),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  })
}
