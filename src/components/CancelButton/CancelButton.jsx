export default function CancelButton({ handleCreateLeagueVisbility }) {
  return (
    <button
      className="button button--cancel"
      onClick={() => handleCreateLeagueVisbility("closed")}
      type="button"
    >
      Cancel
    </button>
  );
}
