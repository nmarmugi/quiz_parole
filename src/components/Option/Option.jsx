import styles from './option.module.css'

function Option({value, textOption}) {
	return (
		<option className={styles.option} value={value}>{textOption}</option>
	)
}

export default Option