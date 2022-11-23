import styles from "../../styles/Dialog.module.css";
import { useGlobalContext } from "../../Utils/Utils";

export default function DialogActions(props) {
  const globalContext = useGlobalContext();
  function submitPost() {
    props.submitPost(globalContext.globalState?.dialogContent);
  }

  return (
    <button className={`${styles.btn} ${styles.addBtn}`} onClick={submitPost}>
      Add New Job
    </button>
  );
}
