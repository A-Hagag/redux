import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./posts.css";

function UpdatePostModal({
  handleCloseModal,
  showModal,
  currentPost,
  handleChangedData,
  handleUpdatePost
}) {
  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentPost.id} - {currentPost.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-post-form">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Title"
              value={currentPost.title}
              onChange={(e) => {
                handleChangedData({ ...currentPost, title: e.target.value });
              }}
            />
            <textarea
              className="form-control mb-2"
              placeholder="Body"
              rows="4"
              value={currentPost.body}
              onChange={(e) => {
                handleChangedData({ ...currentPost, body: e.target.value });
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>

          <Button variant="primary" onClick={handleUpdatePost}>
            Update Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdatePostModal;
