import { ChangeEvent, FormEvent, useRef } from "react";
import { api } from "../../lib/axios";
import { CEP } from "../../@types/account";
import { useNavigate } from "react-router-dom";

export function NewAccount() {
  const nameRef = useRef<HTMLInputElement>(null)
  const cepRef = useRef<HTMLInputElement>(null)
  const stateRef = useRef<HTMLInputElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)
  const neighborhoodRef = useRef<HTMLInputElement>(null)
  const streetRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  async function createNewAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const name = nameRef.current?.value
    const cep = cepRef.current?.value
    const state = stateRef.current?.value
    const city = cityRef.current?.value
    const neighborhood = neighborhoodRef.current?.value
    const street = streetRef.current?.value

    const data = {
      name,
      cep,
      state,
      city,
      neighborhood,
      street,
    }

    await api.post('/accounts', data)

    navigate('/accounts')
  }

  async function findCep(event: ChangeEvent<HTMLInputElement>) {
    const cep = event.currentTarget.value

    if (cep.length === 8) {
      const response = await api.get(`cep/${cep}`)
      const { state, city, neighborhood, street } = response.data as CEP

      if (stateRef.current){
        stateRef.current.value = state
      }

      if (cityRef.current) {
        cityRef.current.value = city
      }

      if (neighborhoodRef.current) {
        neighborhoodRef.current.value = neighborhood
      }

      if (streetRef.current) {
        streetRef.current.value = street
      }
    }
  }

  return (
    <div>
      <h1>New Account</h1>

      <form
        onSubmit={createNewAccount}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          <label htmlFor="name">Name</label>
          <input type="text" id="name" ref={nameRef} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          <label htmlFor="cep">CEP</label>
          <input type="text" minLength={8} maxLength={8} id="cep" onChange={findCep} ref={cepRef} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          <label htmlFor="state">state</label>
          <input type="text" id="state" ref={stateRef} />
        </div>


        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          <label htmlFor="city">city</label>
          <input type="text" id="city" ref={cityRef} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          <label htmlFor="neighborhood">neighborhood</label>
          <input type="text" id="neighborhood" ref={neighborhoodRef} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          <label htmlFor="street">street</label>
          <input type="text" id="street" ref={streetRef} />
        </div>

        <button type="submit">
          Create
        </button>
      </form>
    </div>
  )
}
