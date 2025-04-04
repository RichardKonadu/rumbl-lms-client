import "./Modal.scss";

export default function Modal({
  setIsModalOpen,
  isModalOpen,
  predictedTeam,
  handlePredictionSubmission,
  previouslyPredicted,
}) {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="modal__wrapper">
      <div className={`modal ${previouslyPredicted ? "modal--active" : ""}`}>
        <div className="modal__header"></div>
        <div className="modal__main">
          <h2 className="modal__title">Prediction</h2>
          {!previouslyPredicted ? (
            <p className="modal__text">
              Please confirm that you’d like to predict {predictedTeam.name} to
              win this week.
            </p>
          ) : (
            <p className="modal__text">
              You've picked {predictedTeam.name} to win before so you can't pick
              them again{" "}
            </p>
          )}

          <div className="modal__footer">
            <div className="modal__btn-container">
              <button
                className="modal__btn modal__btn--cancel"
                onClick={handleCloseModal}
              >
                Pick a different team
              </button>
              {!previouslyPredicted && (
                <button
                  className="modal__btn"
                  onClick={handlePredictionSubmission}
                >
                  {" "}
                  Submit Prediction
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
