import React from 'react'
import './App.css'
import { Button, TextField } from '@mui/material'
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
        <div>
          <TextField
            type="text"
            size="small"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginRight: '25px' }}
          />
          <Button variant="contained" color="primary">Search</Button>
        </div>
      </div>
      <div className='content'>
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
          {currentProductsList.map((product, index) => {
            return <Card key={index} productInfo={product} />
          })}
        </div>
      </div>
    </div>
  )
}

export default App;
