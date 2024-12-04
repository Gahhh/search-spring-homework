import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PropTypes from 'prop-types';

const ShoppingCartBadge = (props) => {
  const { count } = props;
  return (
    <Badge badgeContent={count} color="primary">
      <ShoppingCartIcon />
    </Badge>
  );
}
ShoppingCartBadge.propTypes = {
  count: PropTypes.number.isRequired,
};

export default ShoppingCartBadge;

