const TopBar = () => {
  return (
    <div className="bg-linear-to-r from-brand-700 to-brand-400 py-2">
      <div className="container max-w-4/5 m-auto px-4 text-sm flex flex-wrap justify-center gap-2 md:justify-between text-white">
        <p className="flex items-center">
          📍 Paris • Lyon • Bordeaux • Marseille
        </p>
        <div className="flex gap-4">
          <a
            href="#"
            style={{
              color: "white",
              textDecoration: "none",
              opacity: 0.9,
              transition: "opacity 0.2s",
            }}
          >
            Estimer mon bien
          </a>
          <span style={{ opacity: 0.4 }}>|</span>
          <a
            href="#"
            style={{
              color: "white",
              textDecoration: "none",
              opacity: 0.9,
            }}
          >
            Nos agences
          </a>
          <span style={{ opacity: 0.4 }}>|</span>
          <a
            href="#"
            style={{
              color: "white",
              textDecoration: "none",
              opacity: 0.9,
            }}
          >
            ☎️ 01 23 45 67 89
          </a>
        </div>
      </div>
    </div>
  );
};

TopBar.displayName = "TopBar";
export default TopBar;
