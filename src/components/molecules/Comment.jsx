import { useParams } from 'react-router-dom';
import { CommentAuthor, CommentMiddle, CommentRight } from './Styled';
import { useEffect, useState } from 'react';

const Comment = () => {
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${id}&maxResults=10&key=AIzaSyBKWhSdAqxErcRUElqw71uQlyMrZmGrV-E`
      );
      if (!response.ok) {
        throw new Error('404 not found');
      }
      const result = await response.json();
      setComments(result.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  return (
    <div>
      {comments.map((item) => (
        <div key={item.id}>
          <CommentAuthor>
            <img
              src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
              alt="photo"
            />
          </CommentAuthor>
          <p>{item.snippet.topLevelComment.snippet.authorDisplayName}</p>
          <CommentMiddle>
            <h4>{item.snippet.topLevelComment.snippet.textOriginal}</h4>
            <p>{item.snippet.topLevelComment.snippet.publishedAt}</p>
            <p>{item.snippet.topLevelComment.snippet.likeCount}</p>
          </CommentMiddle>
          <CommentRight>{}</CommentRight>
        </div>
      ))}
    </div>
  );
};

export default Comment;
