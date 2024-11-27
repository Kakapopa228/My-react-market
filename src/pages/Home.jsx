import Card from '../components/Card';
import React from 'react';


function Home({
	onSearchImput, 
	sneakers, 
	searchValue, 
	onAddToCart, 
	onAddToFavorites, 
	sneakersLoading
}) {

	const renderSneakers = () => {
		const filteredSneakers = sneakers.filter((item) => 
			item.title.toLowerCase().includes(searchValue.toLowerCase()));

		return (sneakersLoading ? [...Array(12)] : filteredSneakers).map((obj, index) => (
			<Card 
				key={index}
				{...obj}
				loading={sneakersLoading}
				onCart={onAddToCart}
				onFavorites={onAddToFavorites}
			/>
		));
	}

	return(
		<main>
			<div className="headline">
				<h1>Все кроссовки</h1>
				<div className="search-block">
					<img src="img/search.svg" alt="Поиск" />
					<input onChange={onSearchImput} type="search" placeholder="Поиск..."/>
				</div>
			</div>
			<div className='card-list'>
				{renderSneakers()}
			</div>
		</main>
	)
}

export default Home