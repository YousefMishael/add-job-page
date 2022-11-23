import { useEffect } from "react";
import Filter from "../components/Filter/Filter";
import styles from "../styles/Home.module.css";
import HomeComponent from "../components/Home/HomeComponent";
import { useGlobalContext } from "../Utils/Utils";
import { request } from "../Utils/Utils";

export default function Home() {
  const globalContext = useGlobalContext();

  async function getData() {
    const data = await request("./api/action/get-all", "GET");

    if (data.status === 200)
      globalContext.setGlobalState({
        ...globalContext.globalState,
        posts: data.data,
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <Filter />
      <HomeComponent />
    </div>
  );
}
