import Card from '../components/Card';
import Info from '../components/Info';
import styles from '../components/Overlay/Overlay.module.scss';
import { useNavigate } from "react-router-dom";
import {AppContext} from '../App'
import React from 'react';

function Favorites({onAddToFavorites, onAddToCart}) {
	const {favorites} = React.useContext(AppContext);
	const navigate = useNavigate();
	return(
		<main>
			<div className="headline">
				<h1>Мои закладки</h1>
			</div>
			{
				favorites.length > 0 ? 
				<>
					<div className='card-list'>
						{favorites
							.map((obj, index) => (
							<Card 
								key={index}
								{...obj}
								favorited={true}
								onCart={onAddToCart}
								onFavorites={onAddToFavorites}
						/>
						))}
					</div>
				</> :
					<div className={styles.favoritesWrapper}>
						<Info 
							title={'Закладок нет :('} 
							image={'img/smile1.svg'} 
							description={'Вы ничего не добавляли в закладки'}
							setting={() => navigate('/')}
						/>
					</div>
			}
		</main>
	)
}

export default Favorites