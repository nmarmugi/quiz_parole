import styles from './alphabeth.module.css';
import classNames from 'classnames';

function Alphabeth({ letter, onClick, isClick }) {
	return (
		<div onClick={onClick} className={classNames(styles.alphabethLetter, { [styles.bgClick]: isClick })}>
			{letter}
		</div>
	);
}

export default Alphabeth;