import React, { useEffect, useRef, useState } from 'react';
import styles from './Slider.module.scss';

function Slider() {

	const baners = [
		'img/baner228.png',
		'img/Frame3.png',
		'img/Frame2.png'
	];

	const [index, setIndex] = useState(0);
	const intervalRef = useRef(null);

	//делаем автопрокрутку
	const startAutoPlay = () => {
		intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % baners.length);
    }, 5000);
	};

	//приостанавливаем и перезапускаем таймер прокрутки
	const resetAutoPlay = () => {
    clearInterval(intervalRef.current);
    startAutoPlay();
  };

	//выбор картинки через индикатор
	const goToIndex = (i) => {
    setIndex(i);
    resetAutoPlay();
  };

	//функция "назад"
	const prev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + baners.length) % baners.length);
    resetAutoPlay();
  };

	//функция "дальше"
  const next = () => {
    setIndex((prevIndex) => (prevIndex + 1) % baners.length);
    resetAutoPlay();
  };

	//автопрокрутка
	useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, []);

	return (
		<div className={styles.slider}>
			<div 
				className={styles.sliderTrack} 
				style={{
					transform: `translateX(-${index * 100}%)`,
          width: `${baners.length * 100}%`,
				}} >
				{baners.map((src, i) => (
					<div className={styles.slide} key={i}>
						<img src={src} alt={`Slide ${i}`} className={styles.slideBaner} />
					</div>
				))}
			</div>
			<img onClick={prev} src="img/BanerLeft.svg" alt="Назад" className={`${styles.navButton} ${styles.left}`} />
			<img onClick={next} src="img/SliderRight.svg" alt="Дальше" className={`${styles.navButton} ${styles.right}`} />

			{/* Индикаторы */}
			<div className={styles.indicators}>
				{baners.map((_, i) => (
					<span
						key={i}
						className={`${styles.dot} ${i === index ? styles.active : ''}`}
						onClick={() => goToIndex(i)}
					/>
				))}
			</div>
		</div>
	)
};

export default Slider