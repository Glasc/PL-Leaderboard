import React from "react"
import "./index.css"
import ReactDOM from "react-dom/client"
import Home from "./Home"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createBrowserRouter, createHashRouter, Navigate, RouterProvider } from "react-router-dom"
import "./index.css"
import { WrongSeason } from "./components/WrongSeason"
import { Club } from "./Club"

const lastYear = new Date().getFullYear() - 1

const router = createHashRouter([
  {
    path: "/:year",
    element: <Home />,
    errorElement: <WrongSeason />,
    index: true
  },
  {
    path: "/",
    element: <Navigate to={`/${lastYear}`} />,
    errorElement: <WrongSeason />,
    index: true
  },
  {
    path: "/:year/:club",
    element: <Club />,
    // TODO: Add errorElement
  },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)
