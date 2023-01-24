import { Link, Outlet, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { ListAccounts } from "../pages/account/list";
import { NewAccount } from "../pages/account/new";
import { ShowAccount } from "../pages/account/show";
import { api } from "../lib/axios";

export const accountRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
        style={{
          display: 'flex',
          gap: '16px'
        }}
        >
          <Link to="accounts">go to accounts</Link>
          <Link to="accounts/new">go to new account</Link>
        </div>
        <Outlet />
      </div>
    }
    >
      <Route
        path="accounts"
        element={<ListAccounts />}
        loader={async () => {
          const response = await api.get('/accounts')

          return response.data
        }}
      >
        <Route path="new" element={<NewAccount />}/>
        <Route
          path="show/:id"
          element={<ShowAccount />}
          loader={async ({ params }) => {
            const { id } = params

            const response = await api.get(`/accounts/${id}`)

            return response.data
          }}
        />
      </Route>
    </Route>
  )
);