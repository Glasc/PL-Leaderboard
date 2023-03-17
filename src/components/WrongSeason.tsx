import { useParams } from "react-router-dom"
import { Layout } from "./Layout"

export const WrongSeason = () => {
  const params = useParams()
  const year = Number(params.year)

  return (
    <Layout>
      <h1 className="text-center text-error text-2xl">
        Season <span className="font-semibold">{year - 1}-{year}</span> you say? Well, that's not right. Try again.
      </h1>
    </Layout>
  )
}
