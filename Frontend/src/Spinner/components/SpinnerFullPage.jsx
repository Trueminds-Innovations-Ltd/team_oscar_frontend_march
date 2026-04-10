import Spinner from "./Spinner";
import styles from "../SpinnerFullPage.module.css";

function SpinnerFullPage() {
  return (
    <div className={styles.spinnerFullpage}>
      <Spinner />
      {/* <h1 className="text-white">Loading...</h1> */}
    </div>
  );
}

export default SpinnerFullPage;
