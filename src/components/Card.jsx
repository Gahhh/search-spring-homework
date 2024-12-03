import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const Card = (props) => {
  const { productInfo } = props;
  return (
    <div 
      style={{
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '1rem',
        boxShadow:'0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '300px',
      }}
    > 
      <div
        style={{
          width: '100%',
          height: '450px',
        }}
      >
        <img 
          src={productInfo.thumbnailImageUrl} 
          alt={productInfo.name}
          style={{
            borderTopLeftRadius: '1rem',
            borderTopRightRadius: '1rem',
            width: '100%',
          }}
        />
      </div>
      <div style={{padding: '0.75rem', display: 'flex', flexDirection: 'column'}}>
        <p
          style={{
            fontSize: '1rem',
            fontWeight: '500',
            color: '#111827',
            margin: 'auto',
            textAlign: 'center',
            height: '1.5rem',
            width: '100%',
          }}
        >
          {productInfo.name}
        </p>
      </div>
      <div
        style={{
          padding: '0.75rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.25rem',
          fontWeight: '500',
          color: '#111827'
        }}
      >
        ${productInfo.price}
      </div>
      <Button 
        variant="contained" 
        color="primary"
        size='small'
        style={{
          width: '100%',
          borderBottomLeftRadius: '1rem',
          borderBottomRightRadius: '1rem',
          fontSize: '1rem',
          fontWeight: '500',
          color: '#fff',
          backgroundColor: '#3b82f6',
        }}
      >
        Add to Cart
      </Button>
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
