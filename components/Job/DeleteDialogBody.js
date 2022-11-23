import styles from "../../styles/Job.module.css";

export default function DeleteDialogBody() {
  return (
    <div className={styles.dialogDetContainer}>
      <span>Are you sure you want to delete this item ?</span>
    </div>
  );
}
