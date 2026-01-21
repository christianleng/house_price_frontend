import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="bg-linear-to-r from-brand-700 to-brand-400 py-2">
      <div className="container max-w-4/5 m-auto px-4 text-sm flex flex-wrap justify-center gap-2 md:justify-between text-white">
        <p className="flex items-center">
          📍 Paris • Lyon • Bordeaux • Marseille
        </p>
        <div className="flex gap-4">
          <Link
            to="/"
            className="text-white no-underline opacity-90 transition-opacity duration-200 hover:opacity-100"
          >
            Estimer mon bien
          </Link>
          <span className="opacity-40">|</span>
          <Link to="/" className="text-white no-underline opacity-90">
            Nos agences
          </Link>
          <span className="opacity-40">|</span>
          <Link to="/" className="text-white no-underline opacity-90">
            ☎️ 01 23 45 67 89
          </Link>
        </div>
      </div>
    </div>
  );
};

TopBar.displayName = "TopBar";
export default TopBar;
