import { useEffect, useState } from 'react';
import {
  GridArea, TopCard, TopBottom, VideoCard, ChannelPhoto,
  ChannelName, VideoName, ViewDate, TextCard, DetailIcon,
  MaterialIcons, MaterialsIcons, ChannelVideoImg
} from './Styledviews';
import { Link } from 'react-router-dom';
import BottomNavbar from '../components/organisms/BottomNavbar';

const HomeView = ({ data, isSideBarVisible}) => {
  const [sidebarDisplay, setSidebarDisplay] = useState(false);

    if (!data || data.length === 0) return;

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <BottomNavbar >
        </BottomNavbar>
    <GridArea isSideBarVisible={isSideBarVisible}>
      {data.map((video, index) => {
       const { videoStats, channelInfo } = video; 
        const publishTime = video.snippet.publishTime;
        const relativeTime = relativeTimeFromDates(new Date(publishTime));
        return (
          <VideoCard key={index}>
            <TopCard>
              <Link to={`/videoizle/${video.id.videoId}`}>
                <ChannelVideoImg
                  src={video.snippet.thumbnails.high.url}
                  alt="thumbnail"
                />
              </Link>
            </TopCard>
            <TopBottom>
              <div>
                <ChannelPhoto
                  src={channelInfo.snippet.thumbnails.default.url}
                  alt={video.snippet.channelTitle}
                />
              </div>
              <div>
                <VideoName>{video.snippet.title}</VideoName>
                <ChannelName>{video.snippet.channelTitle}</ChannelName>
                <ViewDate>
                  <TextCard>{formatLargeNumber(videoStats.statistics.viewCount)}</TextCard>
                  <MaterialIcons className="material-icons">fiber_manual_record</MaterialIcons>
                  <TextCard>{relativeTime}</TextCard>
                </ViewDate>
              </div>
              <DetailIcon>
                <MaterialsIcons className="material-symbols-outlined">more_vert</MaterialsIcons>
              </DetailIcon>
            </TopBottom>
          </VideoCard>
        );
      })}
    </GridArea>
    </>
  );
};

export default HomeView;

function relativeTimeFromDates(pastDate, currentDate = new Date()) {
  const diffMs = currentDate - pastDate;
  const diffSec = diffMs / 1000;
  const diffMin = diffSec / 60;
  const diffHour = diffMin / 60;
  const diffDay = diffHour / 24;
  const diffMonth = diffDay / 30;
  const diffYear = diffDay / 365;

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  
  if (Math.abs(diffYear) > 1) {
    return rtf.format(-Math.round(diffYear), 'year');
  } else if (Math.abs(diffMonth) > 1) {
    return rtf.format(-Math.round(diffMonth), 'month');
  } else if (Math.abs(diffDay) > 1) {
    return rtf.format(-Math.round(diffDay), 'day');
  } else if (Math.abs(diffHour) > 1) {
    return rtf.format(-Math.round(diffHour), 'hour');
  } else if (Math.abs(diffMin) > 1) {
    return rtf.format(-Math.round(diffMin), 'minute');
  }
  return rtf.format(-Math.round(diffSec), 'second');
}

function formatLargeNumber(numString) {
  const num = parseInt(numString, 10) || 0;  

  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace('.0', '') + ' Mrd';
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace('.0', '') + ' Mn';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace('.0', '') + ' bin';
  } else {
    return num.toString();
  }
}