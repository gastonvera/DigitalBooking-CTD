import { useState, useEffect } from 'react';

export const useFetchGet = (url) => {
  const [data, setData] = useState(null)  //datos que recibimos
  const [isPending, setIsPending] = useState(true) //variable para controlar estado de peticion
  const [error, setError] = useState(null) // manipulacion de error en caso de haberlo

  useEffect(() => {
    const getData = async (url) => {
      try {
        let res = await fetch(url) //espero la respuesta a la peticion fetch


        if (!res.ok) { //si la respuesta es falsa, arrojamos un error
          throw {
            err: true,
            status: res.status,
            statusText: !res.statusText ? "Ocurrio un error" : res.statusText, //la respuesta de statusText de la api puede venir vacia
          }
        }

        let data = await res.json();

        setIsPending(false);
        setData(data)
        setError({ err: false })
      } catch (err) {
        setIsPending(true);
        setError(err)
      }
    }

    getData(url);
  }, [])//se ejecuta cuando cambie la url de origen

  return { data, isPending, error } //retorno objeto con los atributos y valores del mismo nombre
}