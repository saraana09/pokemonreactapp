import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './css/home.css'

const Home = (props) => {

  const [apiResponse, setApiResponse] = useState({})
  const [paginationStuff, setPaginationStuff] = useState({
    limit: 48,
    offset: 0
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${paginationStuff.limit}&offset=${paginationStuff.offset}`)
      setApiResponse(response.data)
    }
    fetchData()
  }, [paginationStuff])

  return (
    <div className="home">
      <ul className="pokemon-list">
        {
          Object.keys(apiResponse).length > 0 ?
            apiResponse.results.map((pokemon, index) => {
              return (
                <li key={index} className="pokemon-name">
                  {pokemon.name}
                  <img className="pokeball" alt="pokeball" src="./pokemonLogo.png" onClick={() => {
                    props.fetch(pokemon.url)
                  }} />
                </li>
              )
            })
            : null
        }
      </ul>

      <div className="pagination-container">
        <div className="pagination" onClick={() => {
          if (paginationStuff.offset !== 0) {
            setPaginationStuff({
              limit: paginationStuff.limit,
              offset: paginationStuff.offset - paginationStuff.limit
            })
          }

        }}>
          ◄
        </div>
        <div className="pagination" onClick={() => {
          if (paginationStuff.offset < apiResponse.count - paginationStuff.limit) {
            setPaginationStuff({
              limit: paginationStuff.limit,
              offset: paginationStuff.limit + paginationStuff.offset
            })
          }
        }}>
          ►
        </div>
      </div>
    </div>
  )
}

export default Home