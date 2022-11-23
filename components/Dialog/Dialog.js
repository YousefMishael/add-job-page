import styles from "../../styles/Dialog.module.css";

export default function Dialog(props) {
  return (
    <>
      <span
        className={`${styles.contentWrapper} ${
          props.showDialog ? styles.active : ""
        }`}
      />
      <div
        className={`${styles.container} ${
          props.showDialog ? styles.active : ""
        }`}
      >
        <div className={styles.dialogHeader}>
          <span>{props?.title}</span>
        </div>
        {props?.body}
        <div className={styles.actionContainer}>
          <button
            className={`${styles.btn} ${styles.cancelBtn}`}
            onClick={() => props.toggleDialog("", "", "")}
          >
            Cancel
          </button>
          {props.actions}
        </div>
      </div>
    </>
  );
}
