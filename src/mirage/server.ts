import { createServer } from "miragejs"
import standingsMock from "../mocks/standings.json" assert { type: "json" }

export default createServer({
  routes() {
    this.get("/api/standings", () => standingsMock, )
  },
})
