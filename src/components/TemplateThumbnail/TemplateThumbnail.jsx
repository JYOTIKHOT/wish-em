import React, { useState } from "react";
import styles from "./TemplateThumbnail.module.scss";

const cats = {
  Tiger: {
    name: "Panthera tigris",
    code: "1501705388883-4ed8a543392c",
    desc: "tiger in the water",
  },
  Lion: {
    name: "Panthera leo",
    code: "1519066629447-267fffa62d4b",
    desc: "lion and lioness resting on a rock in the sun",
  },
  Leopard: {
    name: "Panthera pardus",
    code: "1566489564594-f2163930c034",
    desc: "blue-eyed leopard resting high up with its head on its front paws",
  },
  Jaguar: {
    name: "Panthera onca",
    code: "1601544359642-c76c4f7c3221",
    desc: "jaguar closeup",
  },
  "Snow leopard": {
    name: "Panthera uncia",
    code: "1689847190291-f8e0823f13ab",
    desc: "snow leopard lying low on some rocks, its fur blending in perfecty",
  },
  Cheetah: {
    name: "Acinonyx jubatus",
    code: "1693702366986-cbfbd1cf0450",
    desc: "cheetah in the grass at dusk",
  },
  Cougar: {
    name: "Puma concolor",
    code: "1661004527094-07d861089aed",
    desc: "cougar walking through the snow",
  },
};

const TemplateThumbnail = () => {
  const entries = Object.entries(cats);
  const n = entries.length;
  const [k, setK] = useState(0);

  const rand = (max, min, prc = 2) =>
    +(min + (max - min) * Math.random()).toFixed(prc);

  const handleClick = (inc) => {
    setK((prev) => (prev + inc + n) % n);
  };

  return (
    <section className={styles.section} style={{ "--n": n, "--k": k }}>
      {entries.map(([key, value], i) => (
        <article
          key={key}
          className={styles.article}
          style={{
            "--i": i,
            "--a": `${rand(15, -15)}deg`,
          }}
        >
          <h2 className={styles.title}>{key}</h2>
          <em className={styles.em}>{value.name}</em>
          <img
            className={styles.image}
            src={`https://images.unsplash.com/photo-${value.code}?w=400`}
            alt={value.desc}
          />
        </article>
      ))}
      <div className={styles.controls}>
        <button
          className={styles.button}
          aria-label="previous"
          data-inc="-1"
          onClick={() => handleClick(-1)}
        />
        <button
          className={styles.button}
          aria-label="next"
          data-inc="1"
          onClick={() => handleClick(1)}
        />
      </div>
    </section>
  );
};

export default TemplateThumbnail;
