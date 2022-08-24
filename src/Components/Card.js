import styles from "./Card.module.css";
import Form from "./Form";
const Card = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageContainer}></div>
      <div className={styles.formContainer}>
        <Form />
      </div>
    </div>
  );
};

export default Card;
