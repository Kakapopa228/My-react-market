import React from 'react';
import { Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Overlay from './components/Overlay';
import Slider from './components/Slider';
import axios from 'axios';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';


export const AppContext = React.createContext({});

function App() {
	const [sneakers, setSneakers] = React.useState([]); //добавляем карточки товара на страницу
	const [favorites, setFavorites] = React.useState([]); //добавляем товар в избранное
	const [searchValue, setSearchValue] = React.useState(''); //делаем поиск
	const [overlayOpen, setOverlayOpen] = React.useState(false); //открывавем корзину
	const [cartSneakers, setCartSneakers] = React.useState([]); //добавляем карточки товара в корзину
	const [sneakersLoading, setSneakersLoading] = React.useState(true); //делаем заглушку до отображения товара на странице

	React.useEffect(() => {
		async function fetchData() {
			try {
				const storedCart = JSON.parse(localStorage.getItem('cartSneakers')) || [];
				const favoritesResponse = await axios.get('https://6732754f2a1b1a4ae110023b.mockapi.io/favorites');
				const itemsResponse = await axios.get('https://6732754f2a1b1a4ae110023b.mockapi.io/items');

				setSneakersLoading(false);

				setCartSneakers(storedCart);
				setFavorites(favoritesResponse.data);
				setSneakers(itemsResponse.data);
			} catch (error) {
				alert('Ошибка при запрсе данных')
			}
		}

		fetchData();  
	}, [])
	
	//добавляем товар в "бэкенд", фильтруем дубликаты а затем добавляем в закладки
	const onAddToFavorites = async (obj) => {
		try {	
			if (favorites.find((item) => Number(item.id) === Number(obj.id))) {
				axios.delete(`https://6732754f2a1b1a4ae110023b.mockapi.io/favorites/${obj.id}`);
				setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
			} else {
				const { data } = await axios.post('https://6732754f2a1b1a4ae110023b.mockapi.io/favorites', obj);
				setFavorites((prev) => [...prev, data]);
		}
		} catch (error) {
			alert('Ошибка, исправляй')
		}
	};
	
	//функция для обновления localStorage в корзине
	const updateCartStorage = (updatedCart) => {
		localStorage.setItem('cartSneakers', JSON.stringify(updatedCart));
	};

	//добавляем товар в корзину через localStorage и фильтруем дубликаты
	const onAddToCart = (obj) => {
		if (cartSneakers.find((item) => Number(item.id) === Number(obj.id))) {
			const updatedCart = cartSneakers.filter((item) => Number(item.id) !== Number(obj.id));
    	setCartSneakers(updatedCart);
			updateCartStorage(updatedCart);
		}	else {
			const updatedCart = [...cartSneakers, obj];
    	setCartSneakers(updatedCart);
    	updateCartStorage(updatedCart);
		}
		
	};

	//удаляем карточки товара из корзины через localStorage
	const onCartRemove = (obj) => {
		const updatedCart = cartSneakers.filter((item) => Number(item.id) !== Number(obj.id));
		setCartSneakers(updatedCart);
		updateCartStorage(updatedCart);
	}

	//делаем поиск
	const onSearchImput = (event) => {
		setSearchValue(event.target.value);
	}

	//функция проверяющая наличие товара в корзине, а затем меняющая иконку в Card
	const isItemChecked = (id) => {
		return cartSneakers.some((sneakers) => Number(sneakers.id) === Number(id))
	}

  return (
    <>
      <AppContext.Provider value={{
				sneakers, 
				favorites, 
				cartSneakers, 
				isItemChecked, 
				onAddToFavorites, 
				onAddToCart, 
				setOverlayOpen,
				setCartSneakers
				}}>
				<div className="wrapper">
					{overlayOpen ? <Overlay 
						sneakers={cartSneakers} 
						onClose={() => setOverlayOpen(false)}
						onRemove={onCartRemove}
					/> : null}
					<Header
						onClickCart={() => setOverlayOpen(true)}
					/>

					{/* <Slider/> */}
					
					<Routes>
						<Route path='/' element={
							<Home 
								cartSneakers={cartSneakers}
								onSearchImput={onSearchImput}
								sneakers={sneakers}
								searchValue={searchValue}
								onAddToCart={onAddToCart}
								onAddToFavorites={onAddToFavorites}
								sneakersLoading={sneakersLoading}
						/>} exact/>

						<Route path='/favorites' element={
							<Favorites 
								onAddToFavorites={onAddToFavorites}
								onAddToCart={onAddToCart}
						/>} exact/>
						
						<Route path='/orders' element={<Orders/>}exact/>
					</Routes>
				</div>
			</AppContext.Provider>
    </>
  )
}

export default App
