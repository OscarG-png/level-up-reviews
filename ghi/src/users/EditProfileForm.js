import { useRef, useState } from "react";
import { Modal, Button } from "flowbite-react";

const EditForm = ({ user, onSave, onCancel, showModal }) => {
  const [editedUser, setEditedUser] = useState({
    username: user.username,
    email: user.email,
    profile_picture: user.profile_picture,
  });
  const usernameInputRef = useRef(null);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedUser);
  };

  return (
    <Modal show={showModal} onClose={onCancel} initialFocus={usernameInputRef}>
      <Modal.Header>Edit Profile</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={editedUser.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Username"
              ref={usernameInputRef}
            />
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Email"
            />
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Profile picture URL
            </label>
            <input
              type="text"
              name="profile_picture"
              value={editedUser.profile_picture}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Profile Picture URL"
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="blue" onClick={() => onSave(editedUser)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditForm;
