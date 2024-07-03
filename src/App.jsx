import { useEffect, useState } from 'react';
import './App.css';
import BottomNavbar from './components/organisms/BottomNavbar';
import Navbar from './components/organisms/Navbar';
import SideBar from './components/organisms/SideBar';
import { useTheme } from './context/ThemeContext';
import Router from './routes/Router';
import styled from 'styled-components';

export const ContainSideBar = styled.div`
  width: ${props => (props.isSideBarVisible ? '4%' : '18%')};
  display: ${props => (props.sidebarDisplay ? 'none' : 'block')};
  padding: 12px;
  background-color: var(--background-color);
  color: var(--primary-text-color);
  overflow: hidden;
  overflow-y: auto;
  scrollbar-color: transparent transparent;
  min-height: 100vh;
  scrollbar-width: thin; 
  @media (max-width: 480px) {
    display: none; 
  }
`;

export const RoutePage = styled.div`
  width: ${props => (props.isSideBarVisible ? '96%' : '82%')};
  height: 100vh;
`;
export const StickyNavbar = styled.div`
  position: sticky;
  z-index: 1000;
`;
export const HomeFlex = styled.div`
  display: flex;
`;
const RouterDiv = styled.div`
  overflow-y: scroll;
`;

function App() {
  const { theme } = useTheme();
  const [data, setData] = useState([]);
  const [isSideBarVisible, setSideBarVisible] = useState(false);
  const [sidebarDisplay] = useState(true);
  const [search, setSearch] = useState('');


  const handleToggleSideBar = () => {
    setSideBarVisible(!isSideBarVisible);
  };

  const fetchVideos = async (searchQuery) => {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=10&key=AIzaSyBKWhSdAqxErcRUElqw71uQlyMrZmGrV-E`);
      if (!response.ok) {
        throw new Error("404 not found");
      }
      const result = await response.json();
      setData(result.items); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
   
  };
  

  useEffect(() => {
    fetchVideos(search);
  }, [search]);

  return (
    <div className={`app`} data-theme={theme}>
      <Navbar onToggleSideBar={handleToggleSideBar}  setSearch={setSearch}/>
      <HomeFlex>
        <ContainSideBar isSideBarVisible={isSideBarVisible} className={`ContainSideBar`}>
          <SideBar />
        </ContainSideBar>
        <RoutePage isSideBarVisible={isSideBarVisible}> 
          <StickyNavbar>
            <BottomNavbar />
          </StickyNavbar>
          <RouterDiv>
            <Router sidebarDisplay={sidebarDisplay} isSideBarVisible={isSideBarVisible} data={data} />
          </RouterDiv>
        </RoutePage>
      </HomeFlex>
    </div>
  );
}

export default App;
