import { useEffect, useState } from 'react';
import Button from "../../components/atoms/Buttons";
import BottomNavbar from "../../components/organisms/BottomNavbar";
import styles from "./Pages.module.css";
import { useParams } from 'react-router-dom';
import Comment from '../../components/molecules/Comment';

const VideoPage = ({ data }) => {
  const { id } = useParams();
  const [incommingData, setIncommingData] = useState(null);
  const [search, setSearch] = useState('');
  const [sameVideos, setsameVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const videoData = data.find((e) => e.id.videoId === id);
      if (videoData) {
        setIncommingData(videoData);
        await fetchVideos(videoData.snippet.title);
      }
    };
  
    fetchData();
  }, []);
console.log(sameVideos)
  const fetchVideos = async (nameVideo) => {
    try {
      const response = await fetch(`http://localhost:3001/api/videos?q=${nameVideo}`);
      if (!response.ok) {
        throw new Error("404 not found");
      }
      const mergedData = await response.json();
      setsameVideos(mergedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } 
  };
  
  return (
    <>
      {incommingData && (
        <div className={styles.videoPage}>
          <div className={styles.videoPageLeft}>
            <div className={styles.videoContent}>
              <iframe
                src={`https://www.youtube.com/embed/${id}`}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <div className={styles.VideoPagesTitle}>
              <h3>{incommingData.snippet.title}</h3>
            </div>
            <div className={styles.videoSupTitle}>
              <div className={styles.videoSupTitleLeft}>
                <img
                  src={incommingData.channelInfo.snippet.thumbnails.default.url}
                  alt=""
                />
                <div className={styles.channelName}>
                  <a href="">
                    <h4>{incommingData.snippet.channelTitle}</h4>
                  </a>
                  <p>480b Abone</p>
                </div>
                <Button className={styles.Subscribe}>Abone Ol</Button>
              </div>
              <div className={styles.videoSupTitleRight}>
                <div className={styles.likeButton}>
                  <Button className={styles.likeButtonContent}>
                    <span className="material-symbols-outlined">thumb_up</span>{formatLargeNumber(incommingData.snippet.likeCount)}
                  </Button>
                  <Button className={styles.dislikeButtonContent}>
                    <span className="material-symbols-outlined">thumb_down</span>
                  </Button>
                </div>
                <Button className={styles.replyShare}>
                  <span className="material-icons-outlined">reply</span>Paylaş
                </Button>
                <Button className={styles.moreHoriz}>
                  <span className="material-icons">more_horiz</span>
                </Button>
              </div>
            </div>
            <div className={styles.descriptionArea}>
              <h5 >{incommingData.snippet.description}</h5>
            </div>
            <div>
              <Comment ></Comment>
            </div>
          </div>
          <div className={styles.videoPageRight}>
            <div>
              <BottomNavbar setSearch={setSearch}></BottomNavbar>
            </div>
            <div className={styles.sameVideos}>
              {sameVideos.map((video) => (
                <div className={styles.sameVideosContent} key={video.id.videoId}>
                  <div className={styles.sameVideosPhoto}>
                    <img src={video.snippet.thumbnails.default.url} alt="" />
                  </div>
                  <div className={styles.sameVideosSubTitle}>
                    <div className={styles.sameVideosSubTitleLeft}>
                      <h5>{video.snippet.title}</h5>
                      <p>{video.channelInfo.snippet.title}</p>
                      <p className={styles.viewCort}>90 görüntüleme</p>
                    </div>
                    <div className={styles.sameVideosSubTitleRight}>
                      <span className="material-symbols-outlined">more_vert</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPage;
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