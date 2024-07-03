import { useState } from 'react';
import { GridArea, TopCard, TopBottom, VideoCard, ChannelPhoto, ChannelName, VideoName, ViewDate, TextCard, DetailIcon, MaterialIcons, MaterialsIcons, ChannelVideoImg } from './Styledviews';
import { Link } from 'react-router-dom';

const HomeView = ({data, isSideBarVisible}) => {
  const [sidebarDisplay, setSidebarDisplay] = useState(false);

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <GridArea isSideBarVisible={isSideBarVisible}>
      {data.map((video) => (
        <VideoCard key={video.id.videoId}>
          <TopCard>
            <Link to={`/videoizle/${video.id.videoId}`}>
              <ChannelVideoImg src={video.snippet.thumbnails.high.url} />
            </Link>
          </TopCard>
          <TopBottom>
            <div>
              <ChannelPhoto src={'https://media.licdn.com/dms/image/D4D03AQF61wCdYdHLYg/profile-displayphoto-shrink_400_400/0/1710253774492?e=1724284800&v=beta&t=GNatOFASMuq5FGIYhJ3tUONtddPt3OikWoea7NkWYr0'} alt='Channel' />
            </div>
            <div>
              <VideoName>{video.snippet.title}</VideoName>
              <ChannelName>{video.snippet.channelTitle}</ChannelName>
              <ViewDate>
                <TextCard>90 görüntüleme</TextCard>
                <MaterialIcons className="material-icons">fiber_manual_record</MaterialIcons>
                <TextCard>1 yıl önce</TextCard>
              </ViewDate>
            </div>
            <DetailIcon>
              <MaterialsIcons className="material-symbols-outlined">more_vert</MaterialsIcons>
            </DetailIcon>
          </TopBottom>
        </VideoCard>
      ))}
    </GridArea>
  );
}

export default HomeView;
