import Card from '../components/Card';
import React from 'react';

function Orders() {
	const [orderSneakers, setOrderSneakers] = React.useState([]); //отображаем купленные кроссовки

	React.useEffect(() => {
		const ordredItems = JSON.parse(localStorage.getItem('order')) || [];

		setOrderSneakers(ordredItems);
	}, []);

	

	return(
		<main>
			<div className="headline">
				<h1>Мои заказы</h1>
			</div>
			<div className='card-list'>
				{orderSneakers
					.map((obj, index) => (
					<Card 
						key={index}
						{...obj}
						favorited={false}
					/>
				))}
			</div>
		</main>
	)
}

export default Orders