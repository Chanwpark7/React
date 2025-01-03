import { useDispatch, useSelector } from 'react-redux';
import useCustomLogin from '../../hooks/useCustomLogin';
import { useEffect } from 'react';
import { getCartItemsAsync } from '../../slices/cartSlice';
import useCustomCart from '../../hooks/useCustomCart';
import CartItemComponent from '../cart/CartItemComponent';

const CartComponent = () => {

  //사용자의 로그인 여부에 따른 카트 get 로직 추가
  const {isLogin, loginState} = useCustomLogin();
  
  //장바구니 데이터 get
  const dispatch = useDispatch();

  //로그인한 사용자의 카트인 item 수 get
  //const cartItems = useSelector(state => state.cartSlice);

  const {refreshCart, cartItems, changeCart} = useCustomCart();

  useEffect(() => {
    if(isLogin){
      //dispatch(getCartItemsAsync());
      refreshCart();
    }
  },[isLogin]);

  return (
    <div className="w-full">
      <div className='font-extrabold text-2xl w-4/5'>
      {
        isLogin?(
          <div>
            {loginState.name}의 장바구니
            <div className="bg-orange-600 text-center text-white font-bold w-1/5 rounded-full m-1">
              {cartItems.length}
            </div>
          <div>
            <ul>
            {cartItems.map(item => <CartItemComponent {...item} key={item.cino} changeCart = {changeCart} email = {loginState.email} />)}
            </ul>
          </div>
        </div>):<div></div>
      }

      </div>
    </div>
  );
};

export default CartComponent;