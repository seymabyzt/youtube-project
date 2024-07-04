import { useEffect, useState } from 'react';
import Button from "../../components/atoms/Buttons";
import BottomNavbar from "../../components/organisms/BottomNavbar";
import styles from "./Pages.module.css";
import { useParams } from 'react-router-dom';
import Comment from '../../components/molecules/Comment';

const VideoPage = ({ data }) => {
  const { id } = useParams();
  const [incommingData, setIncommingData] = useState(null);



  useEffect(() => {
    const videoData = data.find((e) => e.id.videoId === id);
    setIncommingData(videoData);
  }, [id, data]);

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
                  src={'https://media.licdn.com/dms/image/D4D03AQF61wCdYdHLYg/profile-displayphoto-shrink_400_400/0/1710253774492?e=1724284800&v=beta&t=GNatOFASMuq5FGIYhJ3tUONtddPt3OikWoea7NkWYr0'}
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
                    <span className="material-symbols-outlined">thumb_up</span>9.4b
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
            <h5>{incommingData.snippet.description}</h5>
            </div>
           <div>
            <Comment ></Comment>
           </div>
          </div>
          <div className={styles.videoPageRight}>
            <div>
              <BottomNavbar></BottomNavbar>
            </div>
            <div className={styles.title}>
              <div className={styles.icon}>
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/youtube-shorts-icon.png" alt="" />
              </div>
              <h3>Shorts</h3>
            </div>
            <div className={styles.shorts}>
              <div className={styles.arrowRight}>
                <span className="arrow_forward"></span>
              </div>
              {data.map((video) => (
                <div className={styles.shortsContent} key={video.id.videoId}>
                  <div className={styles.shortsPhoto}>
                    <img src={video.snippet.thumbnails.medium.url} alt="" />
                  </div>
                  <div className={styles.shortsSubTitle}>
                    <div className={styles.shortsSubTitleLeft}>
                      <h5>{video.snippet.title}</h5>
                    </div>
                    <div className={styles.shortsSubTitleRight}>
                      <span className="material-symbols-outlined">more_vert</span>
                    </div>
                  </div>
                  <p className={styles.viewCort}>90 görüntüleme</p>
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
