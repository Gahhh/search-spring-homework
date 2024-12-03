import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const Card = (props) => {
  const { productInfo } = props;
  return (
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
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            margin: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px'
          }}
        >
          <img src={productInfo.thumbnailImageUrl} alt={productInfo.name} style={{ width: '200px', height: '200px' }} />
          <div>{productInfo.name}</div>
          <div>{productInfo.price}</div>
          <Button variant="contained" color="primary">Buy</Button>
        </div>
    </div>
  )
}

Card.propTypes = {
  productInfo: PropTypes.shape({
    thumbnailImageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
