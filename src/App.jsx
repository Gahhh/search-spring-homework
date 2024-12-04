import React from 'react'
import './App.css'
import { Button, TextField, Grid2, IconButton } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logo from './assets/logo.png'
import Card from './components/Card'
import ShoppingCartBadge from './components/ShoppingCartBadge'
import Loading from './components/Loading'
import { fetchData } from './utils/apiRequest'
import _ from 'lodash'

const App = () => {

  const [textInput, setTextInput] = React.useState('')
  const [pageNoInput, setPageNoInput] = React.useState('')
  const [isPageNoValid, setIsPageNoValid] = React.useState(true)
  const [searchedText, setSearchedText] = React.useState('')
  const [currentProductsList, setCurrentProductsList] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(0)
  const [nextPage, setNextPage] = React.useState(2)
  const [prevPage, setPrevPage] = React.useState(0)
  const [totalPages, setTotalPages] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [isEmptyResults, setIsEmptyResults] = React.useState(false)

  const getProducts = (page) => {
    setLoading(true)
    fetchData(textInput, page)
      .then(response => response.json())
      .then(data => {
        if (data.results.length === 0) {
          setIsEmptyResults(true)
          setCurrentProductsList([])
          setCurrentPage(0)
          setNextPage(2)
          setPrevPage(0)
          setTotalPages(0)
          setPageNoInput('')
          setIsPageNoValid(true)
          setLoading(false)
        } else {
          setCurrentProductsList(data.results)
          setSearchedText(textInput)
          setCurrentPage(data.pagination.currentPage)
          setNextPage(data.pagination.nextPage)
          setPrevPage(data.pagination.previousPage)
          setTotalPages(data.pagination.totalPages)
          setIsEmptyResults(false)
          setPageNoInput('')
          setIsPageNoValid(true)
          setLoading(false)
        }
      })
      .catch(error => {
        console.error(error)
        alert('An error occurred. Please try again.')
        setLoading(false)
      }
    )
  }

  React.useEffect(() => {
    getProducts(1)
  }, [])

  const handlePickOneForMe = () => {
    const randomSearchText = _.sample(['shoes', 'bags', 'dress', 'hats', 'gloves', 'jeans'])
    setTextInput(randomSearchText)
  }

  const handleSearchClick = () => {
    getProducts(1)
  }

  const handleAddToCart = () => {
    setCount(count + 1)
  }

  const validatePageNoInput = (pageNo) => {
    if (pageNo >= 1 && pageNo <= totalPages) {
      setIsPageNoValid(true)
    } else {
      setIsPageNoValid(false)
    }
  }

  const handleGoToPageClick = () => {
    if (isPageNoValid) {
      getProducts(pageNoInput)
    }
  }

  return (
    <div>
      <div 
        className='header'
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          borderBottom: '1px solid #ccc',
        }}
      >
        <img src={logo} alt="logo" style={{ width: '200px', height: '100px' }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div 
            style={{ 
              marginRight: '15px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextField
              type="text"
              size="small"
              placeholder="Search for products"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              style={{ marginRight: '15px' }}
            />
            <Button variant="contained" color="primary" onClick={handleSearchClick}>Search</Button>
            <p style={{ margin: '0 10px' }}>or</p>
            <Button variant="contained" color="secondary" onClick={handlePickOneForMe}>Pick one for me</Button>
          </div>
          <ShoppingCartBadge count={count} />
        </div>
      </div>

      {/* If the search result is empty, a message should be displayed to the user */}
      {
        isEmptyResults && 
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto 0',
            height: '80vh',
          }}
        >
          <p style={{ margin: '20px', fontSize: '25px'}}>No results found. Please try again.</p>
        </div>
      }

      {/* When fetching data from the API, a loading spinner will be displayed instead of the content */}
      {loading 
      ? <Loading />
      : <div 
        className='content'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto 0',
        }}
      >
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            margin: 'auto 0',
            maxWidth: '1500px',
          }}
        >
          <div 
            style={{
              fontSize: '1.5rem',
              fontWeight: '500',
              color: '#111827',
              margin: 'auto',
              textAlign: 'center',
              height: '1.5rem',
              width: '100%',
            }}
          >
            {searchedText ? `Search results for "${searchedText}"` : ''}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '15px 0',
              margin: 'auto',
              width: '100%',
              fontSize: '1.25rem',
            }}
          >
            <IconButton
              color="primary"
              disabled={prevPage === 0}
              onClick={() => getProducts(prevPage)}
            >
              <ChevronLeftIcon />
            </IconButton>
            <div>Page {currentPage} of {totalPages}</div>
            <IconButton
              color="primary"
              disabled={currentPage === totalPages}
              onClick={() => getProducts(nextPage)}
            >
              <ChevronRightIcon />
            </IconButton>
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoToPageClick}
            >
              Go to page
            </Button>
            <TextField
              type="number"
              size="small"
              style={{ width: '100px', margin: '0 10px' }}
              value={pageNoInput}
              onChange={(e) => {
                setPageNoInput(e.target.value)
                validatePageNoInput(e.target.value)
              }}
              error={!isPageNoValid}
            />
          </div>
          <div 
            style={{
              height: '20px',
            }}
          >
            {isPageNoValid ? '' : <p style={{ color: 'red', margin: '0' }}>Invalid page number</p>}
          </div>
        </div>
        <Grid2 
          container 
          spacing={2}
          alignItems="center"
          justifyContent="center"
          style={{
            padding: '20px',
            margin: 'auto 0',
            maxWidth: '1500px',
          }}
        >
          {currentProductsList.map((product, index) => {
            return (
              <Grid2 
                item 
                key={index}
                style={{
                  padding: '10px',
                  with: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Card productInfo={product} handleAddToCart={handleAddToCart} />
              </Grid2>
            )
          })}
        </Grid2>
        </div>}
        <div
          className='footer'
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            margin: 'auto 0',
            borderTop: '1px solid #ccc',
            width: '100%',
          }}
        >
          <a href="https://github.com/Gahhh/search-spring-homework" target="_blank" rel="noreferrer">
            <GitHubIcon style={{ fontSize: '30px', color: '#000' }} />
          </a>
          <img src={logo} alt="logo" style={{ width: '100px', height: '50px', margin: '0 100px' }} />
          <a href="https://www.linkedin.com/in/yu-liang-854067ba/" target="_blank" rel="noreferrer">
            <LinkedInIcon style={{ fontSize: '30px', color: '#0077b5', marginLeft: '20px' }} />
          </a>
          
        </div>
    </div>
  )
}

export default App;
