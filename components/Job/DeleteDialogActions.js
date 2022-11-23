import styles from "../../styles/Dialog.module.css";
import { request } from "../../Utils/Utils";
import { useGlobalContext } from "../../Utils/Utils";

export default function DeleteDialogActions({ id, showDialog }) {
  const globalContext = useGlobalContext();

  async function deleteJob() {
    let resp = await request(`/api/action/delete?id=${id}`, "POST");
    if (resp.status === 200) {
      //update items
      let _jobs = resp.data;
      globalContext.setGlobalState({
        ...globalContext.globalState,
        posts: _jobs,
      });
      showDialog();
    }
  }

  return (
    <button className={`${styles.btn} ${styles.deleteBtn}`} onClick={deleteJob}>
      Delete
    </button>
  );
}
