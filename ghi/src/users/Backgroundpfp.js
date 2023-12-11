import { Button, Modal } from 'flowbite-react';
import { useState } from "react";

function BackgroundForm({ userFavorites, onSave, onCancel, showModal }) {
  const [selectedBackgroundGame, setSelectedBackgroundGame] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBackgroundGame) {
      onSave(selectedBackgroundGame);
    }
  };

  return (
    <Modal show={showModal} onClose={onCancel}>
      <Modal.Header>Set Background Theme</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {userFavorites.map((favorite) => (
              <div key={favorite.game_id}>
                <input
                  type="radio"
                  id={`backgroundGame-${favorite.game_id}`}
                  name="backgroundGame"
                  value={favorite.game_id}
                  onChange={() => setSelectedBackgroundGame(favorite)}
                  checked={selectedBackgroundGame === favorite}
                />
                <label htmlFor={`backgroundGame-${favorite.game_id}`} className="ml-2">
                  {favorite.title}
                </label>
              </div>
            ))}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="blue" onClick={() => onSave(selectedBackgroundGame)}>
          Set Background
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default BackgroundForm;
