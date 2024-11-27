import Card from '../components/Card';
import {AppContext} from '../App'
import React from 'react';

function Favorites({onAddToFavorites, onAddToCart}) {
	const {favorites} = React.useContext(AppContext);
	return(
		<main>
			<div className="headline">
				<h1>Мои закладки</h1>
			</div>
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
		</main>
	)
}

export default Favorites