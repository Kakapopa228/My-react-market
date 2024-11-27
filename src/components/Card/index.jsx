import styles from './Card.module.scss';
import React from 'react';
import ContentLoader from "react-content-loader";
import {AppContext} from '../../App'


function Card ({id, imgUrl, title, price, onCart, onFavorites, loading = false, favorited = false}) {
	// const [isChecked, setIsChecked] = React.useState(checked);
	const [isFavorite, setIsFavorite] = React.useState(favorited);
	const {isItemChecked} = React.useContext(AppContext);


	//добавляем товар в корзину
	const onClickPlus = () => {
		onCart({id, imgUrl, title, price});
		// setIsChecked(!isChecked);
	}

	//меняем иконку "Избранное" и добавляем в закладки
	const onClickFavorite = () => {
		onFavorites({id, imgUrl, title, price});
		setIsFavorite(!isFavorite);
	}

	return (
		<>
			<div className={styles.card}>
				{
					loading ? 
						<ContentLoader 
							speed={2}
							width={212}
							height={225}
							viewBox="0 0 212 240"
							backgroundColor="#f3f3f3"
							foregroundColor="#ecebeb"
						>
							<rect x="257" y="66" rx="3" ry="3" width="88" height="6" /> 
							<rect x="263" y="105" rx="3" ry="3" width="52" height="6" /> 
							<rect x="0" y="0" rx="10" ry="10" width="170" height="142" /> 
							<rect x="0" y="160" rx="5" ry="5" width="170" height="15" /> 
							<rect x="0" y="183" rx="5" ry="5" width="125" height="15" /> 
							<rect x="0" y="212" rx="5" ry="5" width="90" height="25" /> 
							<rect x="144" y="210" rx="15" ry="15" width="28" height="28" />
						</ContentLoader> : 
						<>
							<div className={styles.favorite}>
								{onFavorites && <img 
									onClick={onClickFavorite} 
									width={25} 
									height={25} 
									src={isFavorite ? "img/liked.svg" : "img/unliked.svg"} 
									alt="Закладки" 
								/>}
							</div>
							<img width={168} src={imgUrl} alt="Фото товара" />
							<p>{title}</p>
							<div className={styles.cardBottom}>
								<div className={styles.cardPrice}>
								<span>Цена:</span>
								<b>{price} ₽</b>
								</div>
								{onCart && <img 
									className={styles.checked} 
									onClick={onClickPlus} 
									width={28} 
									height={28} 
									src={isItemChecked(id) ?  'img/cheked1.png' : 'img/plus2.png'} alt="Добавить" 
								/>}
							</div>
						</>
				}	
			</div>
		</>
	);
}

export default Card