import React from "react";
import styles from "./Carrosel.module.css";

function debounce(fn, ms) {
	let timer;
	return (_) => {
		clearTimeout(timer);
		timer = setTimeout((_) => {
			timer = null;
			fn.apply(this, arguments);
		}, ms);
	};
}

function Carrosel({ slides }) {
	const [active, setActive] = React.useState(0);
	const [position, setPosition] = React.useState(0);
	const contentRef = React.useRef();

	React.useEffect(() => {
		const { width } = contentRef.current.getBoundingClientRect();
		setPosition(-(width * active));

		const debouncedHandleResize = debounce(function handleResize() {
			const { width } = contentRef.current.getBoundingClientRect();
			setPosition(-(width * active));
		}, 1000);

		window.addEventListener("resize", debouncedHandleResize);
	}, [active]);

	function slidePrev() {
		if (active > 0) {
			console.log("voltou");
			setActive(active - 1);
		}
	}
	function slideNext() {
		if (active < slides.length - 1) {
			console.log("avançou");
			setActive(active + 1);
		}
	}

	return (
		<section className={styles.container}>
			<div
				ref={contentRef}
				className={styles.content}
				style={{ transform: `translateX(${position}px)` }}
			>
				{slides.map((slide) => (
					<div key={slide.id} className={styles.item}>
						{slide.text}
					</div>
				))}
			</div>
			<nav className={styles.nav}>
				<button onClick={slidePrev}>Prev</button>
				<button onClick={slideNext}>Next</button>
			</nav>
		</section>
	);
}

export default Carrosel;
