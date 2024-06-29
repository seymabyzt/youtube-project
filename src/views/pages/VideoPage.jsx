import BottomNavbar from "../../components/organisms/BottomNavbar";
import styles from "./Pages.module.css";

const VideoPage = ({ data }) => {
  const firstData = data && data[0]; // İlk elemanı al

  return (
    <>
      {firstData && (
        <div className={styles.videoPage}>
          <div className={styles.videoPageLeft}>
            <img className={styles.image} src={firstData.snippet.thumbnails.maxres.url} alt="Thumbnail" />
          </div>
          <div className={styles.videoPageRight}>

            <div><BottomNavbar></BottomNavbar></div>
            <div className={styles.title}>
            <h3> <img className={styles.icon}  src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/youtube-shorts-icon.png"></img> Shorts</h3>
            </div>
           
            
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPage;
