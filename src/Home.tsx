import { Layout } from "./components/Layout"
import type { Standings } from "./schema"
import { useStandings } from "./hooks/useStandings"
import { useYears } from "./hooks/useYears"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <Layout>
      <header className="text-center text-5xl font-bold">Footballey PL</header>
      <p className="text-center">(ballicon)</p>
      <main className="mx-auto mt-6 w-full max-w-4xl flow-root">
        <Menu />
        <Standings />
      </main>
    </Layout>
  )
}

export default Home

const Menu = () => {
  const navigate = useNavigate()
  const { year: yearFromParam } = useParams()
  const year = Number(yearFromParam)
  const { isLoading, isError, data: years } = useYears()
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYearSelected = parseInt(e.target.value)
    navigate(`/${newYearSelected}`, { replace: true })
  }

  return (
    <section className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">
        Season {year}-{year + 1}
      </h1>
      <select
        value={year}
        className="select ml-auto block w-full max-w-[9rem]"
        onChange={handleYearChange}
      >
        {(() => {
          if (isLoading) {
            return <option>Loading...</option>
          } else if (isError) {
            return <option>Oops</option>
          } else {
            return years?.map((currentYear, idx) => {
              return <option key={idx}>{currentYear}</option>
            })
          }
        })()}
      </select>
    </section>
  )
}

const Standings = () => {
  const { year: yearFromParam } = useParams()
  const year = Number(yearFromParam)
  const { isFetching, isError, data: standings } = useStandings(year)
  const navigate = useNavigate()

  if (isFetching) {
    return (
      <div className="w-full mt-6 flex flex-col space-y-6 animate-pulse">
        <progress
          className="progress w-full"
          value="10"
          max="100"
        ></progress>
        <progress
          className="progress w-full"
          value="20"
          max="100"
        ></progress>
        <progress
          className="progress w-full"
          value="30"
          max="100"
        ></progress>
        <progress
          className="progress w-full"
          value="40"
          max="100"
        ></progress>
        <progress
          className="progress w-full"
          value="50"
          max="100"
        ></progress>
        <progress
          className="progress w-full"
          value="60"
          max="100"
        ></progress>
        <progress
          className="progress w-full"
          value="70"
          max="100"
        ></progress>
        <progress
          className="progress w-full"
          value="80"
          max="100"
        ></progress>
        <progress
          className="progress w-full"
          value="90"
          max="100"
        ></progress>
        <progress
          className="progress w-full"
          value="100"
          max="100"
        ></progress>
      </div>
    )
  }
  if (isError) {
    return <span>Oops</span>
  }

  const handleRowClick = (teamName: string) => {
    navigate(`/${year}/${teamName}`)
  }

  return (
    <table className="table-compact table relative mt-6 w-full text-sm sm:text-base">
      <thead className="sticky top-0 z-10">
        <tr>
          <th></th>
          <th>Club</th>
          <th title="Games Played">GP</th>
          <th title="Losses">L</th>
          <th title="Points">P</th>
          <th title="Goals Against">A</th>
          <th title="Goals For">F</th>
          <th title="Draws">D</th>
          <th title="Wins">W</th>
        </tr>
      </thead>
      <tbody>
        {standings?.map((standing, index) => {
          const teamName = standing.team.name
          const teamId = standing.team.id
          const logoHref = standing.team.logos[0]?.href || ""
          return (
            <tr
              className="hover cursor-pointer"
              key={teamId}
              onClick={() => handleRowClick(teamName)}
            >
              <td className="font-bold">{index + 1}</td>
              <td className="flex flex-wrap items-center space-x-2">
                {/* TODO: optimize image */}
                <img
                  className="w-6 h-6"
                  src={logoHref}
                  alt={`${teamName}'s logo`}
                />
                <span className="font-medium">{teamName}</span>
              </td>
              {standing.stats.map((stat, idx) => {
                switch (stat.shortDisplayName) {
                  case "GP":
                  case "L":
                  case "P":
                  case "A":
                  case "F":
                  case "D":
                  case "W":
                    return <td key={idx}>{stat.displayValue}</td>
                  default:
                    return
                }
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
