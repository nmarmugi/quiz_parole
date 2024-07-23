import styles from './alphabeth.module.css'

function Alphabeth({letter, onClick}) {
	return (
		<div onClick={onClick} className={styles.alphabethLetter}>{letter}</div>
	)
}

export default Alphabeth