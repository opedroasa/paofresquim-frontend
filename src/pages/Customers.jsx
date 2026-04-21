import { useState } from "react";
import CustomerModal from "../components/customers/CustomerModal";
import CustomerTable from "../components/customers/CustomerTable";
import Sidebar from "../components/layout/Sidebar";

const initialCustomers = [
  {
    id: 1,
    name: "Pedro",
    phone: "(34)9999-0000",
    email: "pedro@gmail.com",
    cpf: "000.000.000-33"
  },
  {
    id: 2,
    name: "Lucas",
    phone: "(34)8888-2222",
    email: "lucas@gmail.com",
    cpf: "000.000.000-13"
  },
  {
    id: 3,
    name: "Ana",
    phone: "(11)2222-2222",
    email: "ana@gmail.com",
    cpf: "000.000.000-23"
  }
];

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  cpf: "",
  address: "",
  notes: ""
};

function normalize(value) {
  return value.toLowerCase().replace(/\s+/g, "");
}

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const filteredCustomers = customers.filter((customer) => {
    const query = normalize(search);

    if (!query) return true;

    return [customer.name, customer.phone, customer.cpf]
      .map((field) => normalize(field))
      .some((field) => field.includes(query));
  });

  const openNewCustomerModal = () => {
    setEditingCustomer(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (customer) => {
    setEditingCustomer(customer);
    setFormData({ ...emptyForm, ...customer });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
    setFormData(emptyForm);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSaveCustomer = (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      address: formData.address ?? "",
      notes: formData.notes ?? "",
      id: editingCustomer?.id ?? Date.now()
    };

    if (editingCustomer) {
      setCustomers((current) =>
        current.map((customer) =>
          customer.id === editingCustomer.id ? payload : customer
        )
      );
    } else {
      setCustomers((current) => [...current, payload]);
    }

    closeModal();
  };

  const handleDeleteCustomer = (id) => {
    setCustomers((current) => current.filter((customer) => customer.id !== id));
  };

  return (
    <div className="page-shell">
      <div className="bakery-backdrop" aria-hidden="true" />

      <div className="dashboard-frame">
        <Sidebar />

        <main className="content-panel">
          <header className="content-header">
            <div>
              <h1>Clientes</h1>
              <p>{filteredCustomers.length} clientes cadastrados</p>
            </div>

            <button
              type="button"
              className="primary-action"
              onClick={openNewCustomerModal}
            >
              <span aria-hidden="true">+</span>
              Novo Cliente
            </button>
          </header>

          <section className="toolbar">
            <label className="searchbox" aria-label="Buscar cliente">
              <span className="searchbox__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="presentation">
                  <path d="M10.5 4a6.5 6.5 0 1 0 4.03 11.6l4.43 4.43 1.41-1.41-4.43-4.43A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" />
                </svg>
              </span>

              <input
                type="search"
                placeholder="Buscar por nome, telefone ou CPF..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </section>

          <CustomerTable
            customers={filteredCustomers}
            onEdit={openEditModal}
            onDelete={handleDeleteCustomer}
          />
        </main>
      </div>

      <CustomerModal
        show={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveCustomer}
        onChange={handleFormChange}
        formData={formData}
        editing={editingCustomer}
      />
    </div>
  );
}
