import React from 'react';
import styles from './Header.module.scss';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../App';

function Header(props) {
	const navigate = useNavigate();
	const { cartSneakers} = React.useContext(AppContext);
	const totalPrice = (cartSneakers.reduce((sum, obj) => Number(obj.price) + sum, 0));

	return(
	<header>
		<div onClick={() => navigate('/')} className={styles.headerLogo}>
			<img src="img/logo.png" alt="logo" width={40} height={40}/>
			<div>
				<h3>REACT SNEAKERS</h3>
				<p>Магазин лучших кроссовок</p>
			</div>
		</div>
		<div className={styles.headerProfile}>
			<ul>
				<li onClick={props.onClickCart}>
					<img src="img/card.svg" alt="Корзина" width={18} height={18}/>
					<span>
						{totalPrice} руб.
					</span>
				</li>
				<li onClick={() => navigate('/favorites')}>
					<div>
						<img src="img/favorite.svg" alt="Избранное" width={18} height={18}/>
						<span>Закладки</span>
					</div>
				</li>
				<li onClick={() => navigate('/orders')}>
					<img src="img/profile.svg" alt="Профиль" width={18} height={18}/>
					<span>Покупки</span>
				</li>
			</ul>
		</div>
	</header>
	)
}

export default Header