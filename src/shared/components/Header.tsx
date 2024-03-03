import { Navigation } from "./Navigation";

const navItems = [
  { label: "Домой", href: "/" },
  { label: "Описание", href: "/about" },
];

export const Header = (): JSX.Element => {
  return (
    <header className='container'>
      <Navigation navLinks={navItems} />
    </header>
  );
};
