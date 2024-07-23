import styles from './letter.module.css'
import classNames from 'classnames';

function Letter({letter, classLetter, isClicked, bgWhite}) {
	return (
		<div className={classNames(styles.letter, classLetter, {[bgWhite]: isClicked}, { [styles.space]: /\s/.test(letter) })}>{letter}</div>
	)
}

export default Letter