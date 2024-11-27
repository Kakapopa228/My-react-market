import styles from './Overlay.module.scss';
import Info from '../Info';
import React from 'react';
import { AppContext } from '../../App';

function Overlay({ onClose, onRemove, sneakers = [] }) {
	const {cartSneakers, setCartSneakers} = React.useContext(AppContext);
	const [isOrderComplete, setIsOrderComplete] = React.useState(false);

	const totalPrice = (cartSneakers.reduce((sum, obj) => Number(obj.price) + sum, 0)); //считаем общую сумму товаров в корзине

	// читаем и обновляем список предыдущих покупок, добавляя новые значения из корзины
	const savedOrder = (cartSneakers) => {
		const ordredItems = JSON.parse(localStorage.getItem('order')) || []; 
		const updatedOrder = [...ordredItems, ...cartSneakers]; 
		localStorage.setItem('order', JSON.stringify(updatedOrder));
	};

	
	const onClickOrder = () => {
		savedOrder(cartSneakers); // сохраняем данные покупке

		setIsOrderComplete(true); // меняем HTML и говорим что заказ оформлен
		localStorage.removeItem('cartSneakers'); // очищаем массив с товарами из корзины
		setCartSneakers([]); //визуально скрываем товар из корзины
	}

	return(
		<div className={styles.overlay}>
			<div className={styles.cartBlock}>
				<div className={styles.cartHead}>
					<h4>Корзина</h4>
					<img onClick={onClose} width={20} height={20} src="img/delite.svg" alt="Закрыть" />
				</div>

				{
					sneakers.length > 0 ? (
						<div className={styles.cartWrapper}>
							<div className={styles.items}>
								{sneakers.map((obj) => (
									<div key={obj.id} className={styles.cartItem}>
									<img width={70} src={obj.imgUrl} alt="Фото товара" />
										<div className={styles.itemInfo}>
											<p>{obj.title}</p>
											<b>{obj.price} ₽</b>
										</div>
									<img onClick={() => onRemove(obj)} width={20} height={20} src="img/delite.svg" alt="Добавить" />
								</div>
								))}
							</div>
							<ul className={styles.cartTotal}>
								<li>
									<span>Кешбэк 5%: </span>
									<div></div>
									<b>{Math.floor(totalPrice/100*5)} ₽</b>
								</li>
								<li>
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice} ₽</b>
								</li>
							</ul>
							<button onClick={onClickOrder} className={styles.greenButton}>Оформить заказ <img src="img/arrow.svg" alt="Указатель" /> </button>
						</div>
					) : (
						<Info 
							title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'} 
							image={isOrderComplete ? 'img/ordered.png' : 'img/box.png'} 
							description={isOrderComplete ? 'Ваш заказ скоро будет передан курьерской доставке' : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
						/>
					)
				}
			</div>
		</div>
	)
}

export default Overlay