import React from "react";
import { AppContext } from "../App";
import styles from './Overlay/Overlay.module.scss';

const Info = ({title, image, description, setting}) => {

	return (
		<div className={styles.emptyCart}>
			<img src={image} alt="Корзина" />
			<b>{title}</b>
			<span>{description}</span>
			<button onClick={setting} className={styles.greenButton}>
				Вернуться назад
				<img src="img/leftarrow.svg" alt="Указатель" />
			</button>
		</div>
	)
}

export default Info