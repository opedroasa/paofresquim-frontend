import ConfirmModal
from "../ConfirmModal";

export default function CancelSaleModal({
  show,
  onClose,
  onConfirm
}) {

  return (

    <ConfirmModal
      show={show}
      title="
Cancelar venda
      "
      message="
Deseja realmente cancelar esta venda?
Todos os itens serão removidos.
      "
      onClose={onClose}
      onConfirm={onConfirm}
      confirmText="
ENTER • Cancelar venda
      "
      cancelText="
ESC • Voltar
      "
    />
  );
}