import { useTheme } from "../../context/ThemeContext";
import SearchBar from "../molecules/SearchBar";
import { NavbarContainer, DivLogo, ImgLogo, NavbarLeft, NavbarMiddle, NavbarRight, MaterialIcons, HomeIcons } from "./styled";
import Button from "../atoms/Buttons";
 

const Navbar = ({ onToggleSideBar, setSearch}) => {
  const { theme, setTheme } = useTheme();
  const logosrc = (theme === 'dark' ? '/assets/2.png' : '/assets/1.png')

  return (
    <NavbarContainer>
      <NavbarLeft>  
        <Button onClick={onToggleSideBar}>
          <HomeIcons className="material-symbols-outlined">menu</HomeIcons>
        </Button>
        <DivLogo>
          <ImgLogo src={logosrc} alt="Logo"/>
        </DivLogo>
      </NavbarLeft>
      <NavbarMiddle>
        <SearchBar setSearch={setSearch} />
      </NavbarMiddle>
      <NavbarRight>
        <Button onClick={() => setTheme(theme => theme === 'dark' ? 'light' : 'dark')}>Dark Mode</Button>
        <Button><MaterialIcons className="material-icons-outlined">video_call</MaterialIcons></Button>
        <Button><MaterialIcons className="material-symbols-outlined">notifications</MaterialIcons></Button>
        <Button><MaterialIcons className="material-symbols-outlined">circle</MaterialIcons></Button>
      </NavbarRight>
    </NavbarContainer>
  );
}

export default Navbar;
