import React, { useState, useEffect } from "react"
import { FaSearch } from "react-icons/fa"
import Photo from "./Photo"
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

// const url = `https://api.unsplash.com/photos/?client_id=K7s3Tqe284lc7HTdinEggXlMXzaZ57eu5lqrtownaRw`

function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState("")

  const fetchImage = async () => {
    setLoading(true)
    //URL CONSTRUCTION
    let url
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    } else {
      url = `${mainUrl}${clientID}${urlPage}`
    }

    try {
      const response = await fetch(url)
      const data = await response.json()
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results
        } else if (query) {
          return [...oldPhotos, ...data.results]
        } else {
          return [...oldPhotos, ...data]
        }
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchImage()
    //eslint-disable-next-line
  }, [page])

  // FOR INFINITE SCROLL
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (!loading && window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        setPage((oldPage) => {
          return oldPage + 1
        })
      }
    })
    return () => window.removeEventListener("scroll", event)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setPage(1)
    fetchImage()
  }

  return (
    <main>
      <section className="search">
        <h3 style={{ textAlign: "center", color: "#4d4d4d" }}>Instant Photo Search App</h3>
        <form action="" className="search-form">
          {/* SEARCH INPUT */}

          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
            type="text"
            placeholder="search"
            className="form-input"
          />

          {/* SEARCH BUTTON */}
          <button onClick={handleSubmit} type="submit" className="submit-btn">
            <FaSearch></FaSearch>
          </button>
        </form>
      </section>

      <section className="photos">
        <div className="photos-center">
          {photos.map((image, index) => {
            return <Photo key={index} {...image}></Photo>
          })}
        </div>
        {loading && <h2 className="loading">loading...</h2>}
      </section>
    </main>
  )
}

export default App
