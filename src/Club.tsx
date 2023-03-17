import { useState } from "react"
import { useParams } from "react-router-dom"
import { Layout } from "./components/Layout"
import { useStandings } from "./hooks/useStandings"
import { Link } from "react-router-dom"
import { useClub } from "./hooks/useClub"
import { Spinner } from "./components/Spinner"

export const Club = () => {
  const { year, club: clubParam } = useParams()
  const club = useClub({
    year: Number(year),
    club: clubParam,
  })
  const [clubSelected, setClubSelected] = useState("")
  const standings = useStandings(Number(year))

  if (club.isLoading || standings.isLoading) {
    return (
      <Layout>
        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      </Layout>
    )
  }

  if (club.isError || standings.isError || !year) {
    return <div>Error</div>
  }

  const clubNames = standings.data?.map((club) => club.team.name)

  const currentClubSelected = clubNames?.find(
    (club) => club.toLowerCase() === clubSelected.toLowerCase()
  )

  const clubSelectedData = standings.data?.find(
    (club) =>
      club.team.name.toLowerCase() === currentClubSelected?.toLowerCase()
  )

  return (
    <Layout>
      <nav className="breadcrumbs bg-base-300 px-4 w-full max-w-2xl mx-auto text-base-content/90 sticky top-0 z-20">
        <ul>
          <li>
            <Link to={`/${year}`}>Home</Link>
          </li>
          <li>
            <Link to={`/${club.data?.team.name}`}>{club.data?.team.name}</Link>
          </li>
        </ul>
      </nav>

      <header className="w-full mt-4 max-w-2xl mx-auto">
        <h1 className="text-5xl text-center font-bold">
          {club.data?.team.name}
        </h1>
        <p className="text-center mt-1 font-medium">
          Season{" "}
          <span className="font-semibold text-accent">
            {Number(year)}-{Number(year) + 1}
          </span>
        </p>
      </header>

      <main className="max-w-2xl px-4 w-full mx-auto">
        <section className="flex flex-col text-center sm:text-left sm:flex-row space-y-5 sm:space-x-8 items-center ">
          <img
            className="h-64 w-64"
            src={club.data?.team.logos[0].href}
            alt={club.data?.team.name + "logo"}
          />
          <section className="bg-base-100 w-full p-5 rounded-lg">
            {club.data?.stats.map((stat, idx) => (
              <div className="space-x-3" key={idx}>
                <span className="text-lg text-neutral-content/75 font-medium">
                  {stat.displayName}:
                </span>
                <span className="text-lg font-bold">{stat.displayValue}</span>
              </div>
            ))}
          </section>
        </section>

        <p className="mt-5 text-base-content/75 text-center text-lg font-medium">
          Compare
        </p>
        <select
          className="select ml-auto select-lg block w-full mt-2"
          onChange={(e) => setClubSelected(e.target.value)}
        >
          <option>Select a team to compare</option>
          {(() => {
            if (standings.isLoading) {
              return <option>Loading...</option>
            } else if (standings.isError) {
              return <option>Oops</option>
            } else {
              return clubNames?.map((club, idx) => {
                return (
                  <option value={club} key={idx}>
                    {club}
                  </option>
                )
              })
            }
          })()}
        </select>

        <div className="overflow-x-auto mt-5">
          {clubSelectedData ? (
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr className="">
                  <th className="w-full"></th>
                  <th className="bg-base-300">
                    <img
                      className="w-10 h-10 md:w-14 md:h-14 mx-auto"
                      src={club.data?.team.logos[0].href}
                      alt="xd"
                    />
                    <span className="block mt-2">{club.data?.team.name}</span>
                  </th>
                  <th className="">
                    <img
                      className="w-10 h-10 md:w-14 md:h-14 mx-auto"
                      src={clubSelectedData.team.logos[0].href}
                      alt="xd"
                    />
                    <span className="block mt-2">{currentClubSelected}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {club.data?.stats.map((stat, idx) => {
                  if (
                    !clubSelectedData?.stats[idx].displayValue ||
                    !stat.displayValue
                  ) {
                    return null
                  }

                  return (
                    <tr key={idx}>
                      <td>{stat.displayName}</td>
                      <td className="font-medium text-center">
                        {stat.displayValue}
                      </td>
                      <td className="font-medium text-center">
                        {clubSelectedData?.stats[idx].displayValue}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : null}
        </div>
      </main>
    </Layout>
  )
}
