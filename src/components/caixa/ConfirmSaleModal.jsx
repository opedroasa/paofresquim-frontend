import ConfirmModal
from "../ConfirmModal";

export default function ConfirmSaleModal({
  show,
  onClose,
  onConfirm
}) {

  return (

    <ConfirmModal
      show={show}
      title="
Finalizar venda
      "
      message="
Deseja realmente finalizar esta venda?
      "
      onClose={onClose}
      onConfirm={onConfirm}
      confirmText="
ENTER • Confirmar
      "
      cancelText="
ESC • Cancelar
      "
    />
  );
}