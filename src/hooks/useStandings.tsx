import { useQuery } from "@tanstack/react-query"
import { standingsSchema } from "../schema"

export const useStandings = (year: number) => {
  return useQuery({
    queryKey: ["standings", year],
    queryFn: () =>
      fetch(
        `https://api-football-standings.azharimm.dev/leagues/eng.1/standings?season=${year}&sort=asc`
      ).then((res) =>
        res.json().then((data) => standingsSchema.parse(data?.data.standings))
      ),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  })
}
