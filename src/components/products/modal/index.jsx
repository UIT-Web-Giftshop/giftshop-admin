
import styles from './modalStyles.module.scss'

export default function Modal(props) {
    const {message} = props
    return <div className = {styles.box}>{message}</div>
}