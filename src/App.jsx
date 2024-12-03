import React from 'react'
import './App.css'
import { Button, TextField, Grid2 } from '@mui/material'
import logo from './assets/logo.png'
import Card from './components/Card'
import { fetchData } from './utils/apiRequest'


const App = () => {

  const [searchText, setSearchText] = React.useState('')
  const [currentProductsList, setCurrentProductsList] = React.useState([])
  const [pageInfo, setPageInfo] = React.useState({})

  React.useEffect(() => {
    fetchData('shoes', 1)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setCurrentProductsList(data.results)
        setPageInfo(data.pagination)
      })
      .catch(error => console.error(error))
  }, [])

  const handlePickOneForMe = () => {
    setSearchText('shoes')  
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
          padding: '20px',
          borderBottom: '1px solid #ccc',
          margin: 'auto 0'
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
          <TextField
            type="text"
            size="small"
            placeholder="Search for products"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginRight: '25px' }}
          />
          <Button variant="contained" color="primary">Search</Button>
          <p style={{ margin: '0 10px' }}>or</p>
          <Button variant="contained" color="secondary" onClick={handlePickOneForMe}>Pick one for me</Button>
        </div>
      </div>
      <div 
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
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: '20px',
            margin: 'auto 0'
          }}
        >
          <div>Search Result for {searchText}</div>
          <div>Page {pageInfo.currentPage} of {pageInfo.totalPages}</div>
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
                <Card productInfo={product} />
              </Grid2>
            )
          })}
        </Grid2>
      </div>
    </div>
  )
}

export default App;
