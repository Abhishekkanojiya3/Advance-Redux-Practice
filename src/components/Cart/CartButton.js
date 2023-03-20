import classes from './CartButton.module.css';
import { cartActions } from '../store/Cart-slice';
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {
    const dispatch = useDispatch();
    const cartQuantity = useSelector((state) => state.cartItem.totalQuantity)

    const cartButtonHandler = () => {
        dispatch(cartActions.showCartHandler());
    }
    return ( <
        button className = { classes.button }
        onClick = { cartButtonHandler } >
        <
        span > My Cart < /span> <
        span className = { classes.badge } > { cartQuantity } < /span> <
        /button>
    );
};

export default CartButton;