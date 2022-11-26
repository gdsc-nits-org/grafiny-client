import styles from "./Button.module.scss";

const Button = ({ type }) => {
  return (
    <button type={type} className={`${styles.btn} ${styles["btn-large"]}`}>
      Button
    </button>
  );
};

export default Button;
