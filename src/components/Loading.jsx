import { CircularProgress } from '@mui/material'

const Loading = () => {
  return (
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
      <CircularProgress 
        size={100}
        disableShrink
      />
      <p style={{ margin: '20px', fontSize: '25px'}}>Loading...</p>
      </div>
  )
}

export default Loading;