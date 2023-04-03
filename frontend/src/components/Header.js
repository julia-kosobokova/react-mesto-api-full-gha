import logo from "../images/header-logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Mesto Russia" lang="en" className="header__logo" />
      <div>{props.children}</div>
    </header>
  );
}

export default Header;
