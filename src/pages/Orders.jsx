import Card from '../components/Card';
import styles from '../components/Overlay/Overlay.module.scss';
import Info from '../components/Info';
import { useNavigate } from "react-router-dom";
import React from 'react';

function Orders() {
	const [orderSneakers, setOrderSneakers] = React.useState([]); //отображаем купленные кроссовки
	const navigate = useNavigate();

	React.useEffect(() => {
		const ordredItems = JSON.parse(localStorage.getItem('order')) || [];

		setOrderSneakers(ordredItems);
	}, []);

	//очищаем историю покупок
	const clearing = () =>{
		localStorage.removeItem('order');

		const ordredItems = JSON.parse(localStorage.getItem('order')) || [];
		setOrderSneakers(ordredItems);
	}

	return(
		<main>
			<div className="headline">
				<h1>Мои заказы</h1>
				<p onClick={() => (clearing())} >
					<img width={18} src='img/x.svg'/>
					Очистить историю
				</p>
			</div>

			{
				orderSneakers.length > 0 ? 
				<div className='card-list'>
					{orderSneakers
						.map((obj, index) => (
						<Card 
							key={index}
							{...obj}
							favorited={false}
						/>
					))}
				</div> : 
				<div className={styles.favoritesWrapper}>
					<Info 
						title={'У вас нет заказов'} 
						image={'img/smile2.svg'} 
						description={'Вы нищеброд?  Оформите хотя бы один заказ.'}
						setting={() => navigate('/')}
					/>
				</div>
			}
		</main>
	)
}

export default Orders