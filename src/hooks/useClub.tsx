import { useQuery } from "@tanstack/react-query"
import { standingsSchema } from "../schema"

export const useClub = ({
  club,
  year,
}: {
  year: number
  club: string | undefined
}) => {
  const getClub = async () => {
    const response = await fetch(
      `https://api-football-standings.azharimm.dev/leagues/eng.1/standings?season=${year}&sort=asc`
    )
    const data = await response.json()
    const standings = standingsSchema.parse(data?.data.standings)
    const clubData = standings.find(
      (clubData) => clubData.team.name.toLowerCase() === club?.toLowerCase()
    )
    return clubData
  }

  return useQuery({
    queryKey: [club, year],
    queryFn: getClub,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  })
}