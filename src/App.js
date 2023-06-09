import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, Fragment } from 'react';
import { cartActions } from './components/store/Cart-slice';
import Notification from './components/UI/Notification';
import { cartItemActions } from './components/store/CatItem-slice';
let isInitial = true;

function App() {
    const showcart = useSelector((state) => state.cart.showCart)
    const cart = useSelector(state => state.cartItem);
    const dispatch = useDispatch();
    const notification = useSelector((state) => state.cart.notification);

    useEffect(() => {
        const getCartData = async() => {
            const get = await fetch('https://redux-practice-c8337-default-rtdb.firebaseio.com/cartItem.json', {
                method: 'GET',
            })
            if (!get.ok) {
                throw new Error("Get data request failed");
            }
            const data = await get.json();
            dispatch(cartItemActions.getdata({
                items: data.items || [],
                totalQuantity: data.totalQuantity,

            }))
        }
        getCartData().catch((error) => {
            dispatch(cartActions.showNotification({
                status: "error",
                title: "Error!",
                message: "fetching cart data failed!",
            }))
        })
    }, [dispatch])


    useEffect(() => {
        const sendCartData = async() => {
            if (cart.changed) {
                dispatch(
                    cartActions.showNotification({
                        status: 'pending',
                        title: 'Sending...',
                        message: 'Sending cart data!',
                    })
                );

            }

            const res = await fetch("https://redux-practice-c8337-default-rtdb.firebaseio.com/cartItem.json", {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity,
                })
            });
            if (!res.ok) {
                throw new Error('Sending cart data failed.');
            }
            if (cart.changed) {
                dispatch(
                    cartActions.showNotification({
                        status: 'success',
                        title: 'Success!',
                        message: 'Sent cart data successfully!',
                    })
                );

            }

        };
        if (isInitial) {
            isInitial = false;
            return;
        }

        sendCartData().catch((error) => {
            dispatch(
                cartActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                })
            );
        });

    }, [cart, dispatch]);


    return ( <
        Fragment > {
            notification && ( <
                Notification status = { notification.status }
                title = { notification.title }
                message = { notification.message }
                />
            )
        } <
        Layout > { showcart && < Cart / > } <
        Products / >
        <
        /Layout> <
        /Fragment>
    );
}

export default App;