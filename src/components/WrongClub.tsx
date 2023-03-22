import { Layout } from "./Layout"

export const WrongClub = () => {
  return (
    <Layout>
      <h1 className="text-center text-error text-2xl">
        <span className="font-semibold">
          Such club doesnt exist in this season
        </span>
      </h1>
    </Layout>
  )
}
