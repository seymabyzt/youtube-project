import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/organisms/Navbar';
import SideBar from './components/organisms/SideBar';
import { useTheme } from './context/ThemeContext';
import Router from './routes/Router';
import styled from 'styled-components';
import LoadingOverlay from './components/organisms/loadingOverlay';
import { useSelector } from 'react-redux';

export const ContainSideBar = styled.div`
  width: ${props => (props.isSideBarVisible ? '4%' : '18%')};
  display: ${props => (props.sidebarDisplay ? 'none' : 'block')};
  padding: 12px;
  background-color: var(--background-color);
  color: var(--primary-text-color);
  overflow: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-color: transparent transparent;
  height: 100vh;
  scrollbar-width: thin; 
 
`;

export const RoutePage = styled.div`
  width: ${props => (props.isSideBarVisible ? '96%' : '82%')};
  height: 100vh;
  scrollbar-width: thin; 
  scrollbar-color: transparent transparent;
`;
export const StickyNavbar = styled.div` 
  position: sticky;
  z-index: 1000;
`;

export const HomeFlex = styled.div`
  display: flex;
`;


function App() {
  const { theme } = useTheme();
  const [data, setData] = useState([]);
  const [isSideBarVisible, setSideBarVisible] = useState(false);
  const [sidebarDisplay] = useState(true);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  let bottomSearch = useSelector((state) => state.search.query);
    
  const handleToggleSideBar = () => {
    setSideBarVisible(!isSideBarVisible);
  };

const fetchVideos = async (searchQuery) => {
  try {
    setIsLoading(true); 
    const response = await fetch(`http://localhost:3001/api/videos?q=${searchQuery}`);
    if (!response.ok) {
      throw new Error("404 not found");
    }
    const mergedData = await response.json();
    setData(mergedData);
    console.log(mergedData)
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    fetchVideos(search);
  }, [search]);
console.log(data)
  return (
    <div className={`app`} data-theme={theme}>
      <LoadingOverlay isLoading={isLoading} />
      <Navbar onToggleSideBar={handleToggleSideBar} setSearch={setSearch} />
      <HomeFlex>
        <ContainSideBar isSideBarVisible={isSideBarVisible} className={`ContainSideBar`}>
          <SideBar />
        </ContainSideBar>
        <RoutePage isSideBarVisible={isSideBarVisible}>
          <Router sidebarDisplay={sidebarDisplay} isSideBarVisible={isSideBarVisible} data={data}  setSearch={setSearch}/>
        </RoutePage>
      </HomeFlex>
    </div>
  );
}

export default App;
