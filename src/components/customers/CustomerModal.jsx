import React from "react";

const CustomerModal = ({ show, onClose, onSave, onChange, formData }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-form">
        <form onSubmit={onSave}>
          <input
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={onChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={onChange}
          />

          <input
            name="phone"
            placeholder="Telefone"
            value={formData.phone}
            onChange={onChange}
          />

          <input
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={onChange}
          />

          <button type="submit">Salvar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;