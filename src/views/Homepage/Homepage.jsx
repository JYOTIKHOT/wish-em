import { useContext } from "react";
import TemplateThumbnail from "../../components/TemplateThumbnail";
import ConfettiBackground from "../../components/ConfettiBackground";
import { LoaderContext } from "../../components/Layout";
import { encryptData } from "../../helpers";
import styles from "./Homepage.module.css";

const Homepage = () => {
  const { setShowLoader } = useContext(LoaderContext);
  const generateLink = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const message = e.target[1].value;

    if (!name || !message) {
      alert("Please fill in all fields.");
      return;
    }
    setShowLoader(true);
    setTimeout(() => {
      const encodedName = encodeURIComponent(encryptData(name));
      const encodedMessage = encodeURIComponent(encryptData(message));
      const link = `https://literate-lamp-7wj6v55wr4phpw9r-5173.app.github.dev/#giftcard?name=${encodedName}&message=${encodedMessage}`;

      navigator.clipboard
        .writeText(link)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          alert("Failed to copy link. Please try again.");
        })
        .finally(() => {
          setShowLoader(false);
        });
    }, 3000);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <TemplateThumbnail />
        <br></br>
        <hr></hr>
        <h1>Surprise Your Loved Ones </h1>
        <form className={styles.form} onSubmit={generateLink}>
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
