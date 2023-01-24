import { Link, Outlet, useLoaderData } from "react-router-dom";
import { Account } from "../../@types/account";

export function ListAccounts() {

  const accounts = useLoaderData() as Partial<Account>[];

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100%',
      justifyContent: 'center'
    }}>
      <div
        style={{
          flex: 1 / 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '32px',
        }}
      >
        <h1>List Accounts</h1>

        {accounts.length === 0 && <p>No accounts</p>}

        <ul>
          {accounts.map(account => (
            <li key={account.id}>
              <Link to={`show/${account.id}`}>{account.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          flex: 1 / 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '32px',
        }}
      >
        <Outlet />
      </div>
    </div>
  )
}