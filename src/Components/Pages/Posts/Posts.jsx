import { useEffect, useState } from "react";
import "./posts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  deletePost,
  addPost,
  updatePost,
  getPostById,
} from "../../../APIs/postsApis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faAdd } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import UpdatePostModal from "./UpdatePostModal";
import { Link } from "react-router-dom";
import Loading from "../../shared/Loading"; // Import Loading component Ezzat

function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });
  const [currentPost, setCurrentPost] = useState({
    title: "",
    body: "",
  });
  const [isLoading, setIsLoading] = useState(true); // Add loading state Ezzat
  const [isDisabled, setIsDisabled] = useState(true); // Initialize as true Ezzat

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchPosts());
      setIsLoading(false); // Set loading to false after fetching posts Ezzat
    };
    fetchData();
  }, [dispatch]);

  const validatePost = (post) => {
    if (post.title.length < 10 || post.title.length > 150) {
      return false;
    } else if (post.body.length < 50 || post.body.length > 300) {
      return false;
    } else if (!isNaN(post.title)) {
      return false;
    } else if (!post.title || !post.body) {
      return false;
    }
    return true;
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId)).finally(() => {
      toast.success("Your post has been deleted successfully");
    });
  };

  const handleAddPost = () => {
    if (!validatePost(newPost)) {
      toast.error("Please fill in valid title and body");
      return; // Stop if validation fails Ezzat
    }

    dispatch(addPost(newPost)).finally(() => {
      setNewPost({
        title: "",
        body: "",
      });
      toast.success("Your post has been added successfully");
    });
  };

  const handleCloseModal = () => setShowModal(false);

  const handleShowModal = (post) => {
    setCurrentPost(post);
    setShowModal(true);
  };

  const handleUpdatePost = () => {
    const updatedPostData = {
      title: currentPost.title,
      body: currentPost.body,
    };
    dispatch(
      updatePost({ id: currentPost.id, updatedData: updatedPostData })
    ).finally(() => {
      handleCloseModal();
      toast.success("Your post has been updated successfully");
    });
  };

  const getPostById = (id) => {
    dispatch(getPostById(id));
  };

  // Update isDisabled based on newPost's validity Ezzat
  useEffect(() => {
    setIsDisabled(!validatePost(newPost));
  }, [newPost]);

  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {isLoading ? ( // Show loading component while loading Ezzat
                <Loading />
              ) : (
                posts.map((post) => (
                  <div className="card post-item" key={post.id}>
                    <div className="card-body">
                      <Link to={`/posts/${post.id}`}>
                        <h5>
                          {post.id} - {post.title}
                        </h5>
                      </Link>
                      <p className="card-text">{post.body}</p>
                      <div className="postControlButtons">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            handleShowModal(post);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} /> Update
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="col-lg-4">
              <div className="add-post-form">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Title"
                  value={newPost.title}
                  onChange={(e) => {
                    setNewPost({ ...newPost, title: e.target.value });
                  }}
                />
                <textarea
                  className="form-control mb-2"
                  placeholder="Body"
                  rows="4"
                  value={newPost.body}
                  onChange={(e) => {
                    setNewPost({ ...newPost, body: e.target.value });
                  }}
                />
                <button
                  className="btn btn-success"
                  disabled={isDisabled}
                  onClick={handleAddPost}
                >
                  <FontAwesomeIcon icon={faAdd} /> Add Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UpdatePostModal
        handleCloseModal={handleCloseModal}
        showModal={showModal}
        currentPost={currentPost}
        handleChangedData={setCurrentPost}
        handleUpdatePost={handleUpdatePost}
      />

      <ToastContainer />
    </>
  );
}

export default Posts;
