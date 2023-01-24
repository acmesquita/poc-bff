import { useLoaderData } from "react-router-dom";
import type { Account } from '../../@types/account'

export function ShowAccount() {
  const account = useLoaderData() as Account;

  return (
    <>
      <h1>Show Account</h1>
      <h2>{account.name}</h2>

      <h3>Endereço</h3>
      <p>{account.street}, {account.neighborhood}, {account.city}-{account.state}</p>
    </>
  )
}