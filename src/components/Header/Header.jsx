import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className="z-40 glass-container flex flex-row items-center justify-between p-4 fixed top-0 left-0 w-full text-white shadow-xl transition-all duration-500 gradiant-theme hover:bg-[position:right_center]">
      <div className="flex items-center">
        <h5 className="text-2xl font-extrabold font-serif">I</h5>
        <svg width="70" height="50" viewBox="0 0 150 150">
          <defs>
            <linearGradient
              id="linearGradientStroke"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "hsl(0, 100%, 50%)", stopOpacity: 1 }}
              />
              <stop
                offset="15%"
                style={{ stopColor: "hsl(30, 100%, 50%)", stopOpacity: 1 }}
              />
              <stop
                offset="30%"
                style={{ stopColor: "hsl(60, 100%, 50%)", stopOpacity: 1 }}
              />
              <stop
                offset="45%"
                style={{ stopColor: "hsl(140, 100%, 50%)", stopOpacity: 1 }}
              />
              <stop
                offset="60%"
                style={{ stopColor: "hsl(190, 100%, 50%)", stopOpacity: 1 }}
              />
              <stop
                offset="75%"
                style={{ stopColor: "hsl(260, 100%, 50%)", stopOpacity: 1 }}
              />
              <stop
                offset="90%"
                style={{ stopColor: "hsl(330, 100%, 50%)", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "hsl(0, 100%, 50%)", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <g transform="translate(100 100)">
            <path
              transform="translate(-75 -75)"
              stroke="url(#linearGradientStroke)"
              strokeWidth="10"
              fill="none"
              d="M92.71,7.27L92.71,7.27c-9.71-9.69-25.46-9.69-35.18,0L50,14.79l-7.54-7.52C32.75-2.42,17-2.42,7.29,7.27v0
           c-9.71,9.69-9.71,25.41,0,35.1L50,85l42.71-42.63C102.43,32.68,102.43,16.96,92.71,7.27z"
            />
          </g>
        </svg>{" "}
        <h5 className="text-2xl font-extrabold"> Surprise </h5>
      </div>
    </header>
  );
};

export default Header;
