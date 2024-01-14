import { v4 as uuidv4 } from 'uuid';
const Header = ({ navLinks, onNavLinkClick } : {navLinks: string[], onNavLinkClick: (link:string) => void}) => {
  return (
    <header className="bg-slate-700 p-10 py-4 flex justify-between items-center text-white">
      <div>
        <h1 className="text-xl font-bold">HANGMAN!</h1>
      </div>
      <nav>
        <ul className="flex gap-10">
          {navLinks.map((link: string) => (
            <li className="nav-button" key={uuidv4()} onClick={() => onNavLinkClick(link)}>
              <button>{link}</button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;