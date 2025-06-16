import React from "react";

import ConfettiBackground from "../../components/ConfettiBackground";
import styles from "./Homepage.module.css";

const Homepage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Surprise Your Loved Ones</h1>
        <form className={styles.form}>
          <div className="flex flex-col items-center justify-center">
            <input
              className={styles.input}
              type="text"
              placeholder="provide name"
              required
            />
            <input
              className={styles.input}
              type="password"
              placeholder="message"
              required
            />
            <button
              className="m-2 px-11 py-4 text-center uppercase transition-[background-position] duration-500 bg-gradient-to-r from-[#00C9FF] via-[#92FE9D] to-[#00C9FF] bg-[length:200%_auto] bg-left hover:bg-right text-white shadow-[0_0_20px_#eee] rounded-[10px] block cursor-pointer w-65"
              type="submit"
            >
              Get Link
            </button>
          </div>
        </form>
      </div>
      <ConfettiBackground />
      <div className={styles?.["balloon-bouquet"]}>
        {new Array(10).fill().map((el, i) => (
          <div className={`${styles.balloon} ${styles?.["balloon" + (i + 1)]}`}>
            <div className={styles.knot}></div>
            <div className={styles.string}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
