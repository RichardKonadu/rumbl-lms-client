import "./Modal.scss";

export default function Modal({
  setIsModalOpen,
  isModalOpen,
  predictedTeam,
  handlePredictionSubmission,
}) {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="modal__wrapper">
      <div className="modal">
        <div className="modal__header"></div>
        <div className="modal__main">
          <h2 className="modal__title">Prediction</h2>
          <p className="modal__text">
            Please confirm that you’d like to predict {predictedTeam.name} to
            win this week.
          </p>

          <div className="modal__footer">
            <div className="modal__btn-container">
              <button
                className="modal__btn modal__btn--cancel"
                onClick={handleCloseModal}
              >
                Pick a different team
              </button>
              <button
                className="modal__btn"
                onClick={handlePredictionSubmission}
              >
                {" "}
                Submit Prediction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
