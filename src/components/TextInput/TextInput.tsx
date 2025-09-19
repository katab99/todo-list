import styles from "./TextInput.module.css";

const TextInput = ({ ...props }) => {
	return <input className={styles.textInput} type="text" {...props} />;
};

export default TextInput;
