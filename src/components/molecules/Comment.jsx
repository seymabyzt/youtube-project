import { useParams } from 'react-router-dom';
import { CommentMiddle, CommentFlex, AuthorImg, MaterialIcons, ParseDate, LikeDiv, LikeContent, CommentUp, CommentTitle, CommentUpContent, CommentContent } from './Styled';
import { useEffect, useState } from 'react';

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [pageInfo, setPageInfo] = useState([]);
  const { id } = useParams();

  const defaultImageUrl = 'https://t3.ftcdn.net/jpg/04/74/05/94/360_F_474059464_qldYuzxaUWEwNTtYBJ44VN89ARuFktHW.jpg'; 

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${id}&maxResults=10&key=AIzaSyClZoaxLmWpthTUydYpbpuEBGVMP1KE_yo`
      );
      if (!response.ok) {
        throw new Error('404 not found');
      }
      const result = await response.json();
      setComments(result.items);
      setPageInfo(result.pageInfo);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const timeSince = (dateString) => {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const now = new Date();
    const date = new Date(dateString);
    const secondsPast = (now.getTime() - date.getTime()) / 1000;

    const intervals = [
      { time: 60, unit: 'seconds' },
      { time: 60, unit: 'minutes' },
      { time: 24, unit: 'hours' },
      { time: 30, unit: 'days' },
      { time: 12, unit: 'months' },
      { time: Infinity, unit: 'years' }
    ];

    let timeDifference = secondsPast;
    let unit = 'seconds';

    for (const interval of intervals) {
      if (timeDifference < interval.time) break;
      timeDifference /= interval.time;
      unit = interval.unit;
    }

    return rtf.format(-Math.floor(timeDifference), unit);
  };

  return (
    <div>
      <CommentTitle>{pageInfo.totalResults} Yorum</CommentTitle>
      {comments.map((item) => (
        <CommentFlex key={item.id}>
          <div>
            <AuthorImg
              src={item.snippet.topLevelComment.snippet.authorProfileImageUrl || defaultImageUrl}
              alt="photo"
            />
          </div>

          <CommentMiddle>
            <CommentUp>
              <CommentUpContent>{item.snippet.topLevelComment.snippet.authorDisplayName}</CommentUpContent>
              <ParseDate>{timeSince(item.snippet.topLevelComment.snippet.publishedAt)}</ParseDate>
            </CommentUp>
            <CommentContent>{item.snippet.topLevelComment.snippet.textOriginal}</CommentContent>
            <LikeContent>
            <LikeDiv>
              <MaterialIcons className="material-symbols-outlined">
                thumb_up
              </MaterialIcons>
              <CommentUpContent>{item.snippet.topLevelComment.snippet.likeCount}</CommentUpContent>
            </LikeDiv>
            <LikeDiv>
              <MaterialIcons className="material-symbols-outlined">
              thumb_down
              </MaterialIcons>
             
            </LikeDiv>
            </LikeContent>
            
          </CommentMiddle>
         
        </CommentFlex>
      ))}
    </div>
  );
};

export default Comment;
