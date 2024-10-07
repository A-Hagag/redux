import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById, getCommentsByPostId } from "../../../APIs/postsApis";
import { useParams } from "react-router-dom";
import Loading from "../../shared/Loading"; // Import the Loading component

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postsData.selectedPost);
  const comments = useSelector((state) => state.postsData.comments);

  useEffect(() => {
    dispatch(getPostById(id));
    dispatch(getCommentsByPostId(id));
  }, [dispatch, id]);

  return (
    <div>
      {post ? (
        <div>
          <h2>
            {post.id} - {post.title}
          </h2>
          <p>{post.body}</p>

          <h3>Comments:</h3>
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <strong>{comment.name}</strong>: {comment.body}
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments available.</p>
          )}
        </div>
      ) : (
        <Loading />  //Ezzat
      )}
    </div>
  );
};

export default PostDetail;
