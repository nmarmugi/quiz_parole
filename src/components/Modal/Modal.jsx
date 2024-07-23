import styles from './modal.module.css';
import classNames from 'classnames';

function Modal({ isOpen, children }) {
	return (
    <div className={classNames({
		[styles.containerModal]: isOpen,
		[styles.isClose]: !isOpen
    })}>
		<div className={styles.modal}>
			{children}
		</div>
    </div>
	);
}

export default Modal;
