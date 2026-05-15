import "./ConfirmModal.css";

export default function ConfirmModal({
  show,
  title = "Confirmar exclusão",
  message = "Deseja realmente excluir este item?",
  onConfirm,
  onClose,
  confirmText = "Excluir",
  cancelText = "Cancelar"
}) {
  if (!show) return null;

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="confirm-modal"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="confirm-header">
          <h2>{title}</h2>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            x
          </button>
        </div>

        <div className="confirm-body">
          <p>{message}</p>
        </div>

        <div className="confirm-actions">
<button
  type="button"
  className="cancel-button"
  onClick={onClose}
>
  {cancelText}
</button>

<button
  type="button"
  className="confirm-button"
  onClick={onConfirm}
>
  {confirmText}
</button>
        </div>
      </div>
    </div>
  );
}