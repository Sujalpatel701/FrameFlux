import React, { useEffect, useState } from 'react';
import './CommentsSection.css';

function CommentsSection({ wallpaperId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [stars, setStars] = useState(5);
  const [loading, setLoading] = useState(true);
  const userEmail = localStorage.getItem('userEmail');

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comments/${wallpaperId}`);
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || "Failed to fetch comments");
        }
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error('Failed to fetch comments:', err.message);
      } finally {
        setLoading(false);
      }
    };

    if (wallpaperId) {
      fetchComments();
    }
  }, [wallpaperId]);

  // Add new comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      alert("You must be logged in to comment.");
      return;
    }

    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comments/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          commentText: newComment,
          stars,
          wallpaperId
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to post comment");
      }

      const data = await res.json();
      setComments([data.comment, ...comments]);
      setNewComment('');
      setStars(5);
    } catch (err) {
      console.error('Error adding comment:', err.message);
      alert(err.message);
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>

      {userEmail && (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            required
          />

          <div className="comment-controls">
            <div className="star-rating-wrapper">
              <div className="star-rating">
                {[5, 4, 3, 2, 1].map((star) => (
                  <React.Fragment key={star}>
                    <input
                      type="radio"
                      id={`star${star}`}
                      name="stars"
                      value={star}
                      checked={stars === star}
                      onChange={() => setStars(star)}
                    />
                    <label htmlFor={`star${star}`} title={`${star} star${star > 1 ? 's' : ''}`}>
                      ★
                    </label>
                  </React.Fragment>
                ))}
              </div>
              <span className="star-count">
                {stars} star{stars > 1 ? 's' : ''}
              </span>
            </div>
            <button type="submit">Post</button>
          </div>
        </form>
      )}

      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length > 0 ? (
        <ul className="comment-list">
          {comments.map((c) => (
            <li key={c._id} className="comment">
              <div className="comment-meta">
                <strong>{c.email}</strong> — <span>{c.stars}⭐</span>
              </div>
              <p>{c.commentText}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
}

export default CommentsSection;
