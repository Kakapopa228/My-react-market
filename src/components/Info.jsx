import React from "react";
import { AppContext } from "../App";
import styles from './Overlay/Overlay.module.scss';

const Info = ({title, image, description}) => {
	const {setOverlayOpen} = React.useContext(AppContext);

	return (
		<div className={styles.emptyCart}>
			<img height={120} src={image} alt="Корзина" />
			<b>{title}</b>
			<span>{description}</span>
			<button onClick={() => setOverlayOpen(false)} className={styles.greenButton}>
				Вернуться назад
				<img src="img/leftarrow.svg" alt="Указатель" />
			</button>
		</div>
	)
}

export default Info