import styles from './select.module.css'

function Select({children, onChange}) {
	return (
		<select onChange={onChange} className={styles.select}>
			{children}
		</select>
	)
}

export default Select;