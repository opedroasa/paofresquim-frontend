import logoPaoFresquim from "../../assets/logo-pao-fresquim.jpeg";

const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: DashboardIcon },
  { key: "cashier", label: "Caixa (PDV)", icon: CartIcon },
  { key: "products", label: "Produtos", icon: BoxIcon },
  { key: "customers", label: "Clientes", icon: UsersIcon },
  { key: "employees", label: "Funcion\u00e1rio", icon: BadgeIcon },
  { key: "reports", label: "Relat\u00f3rio", icon: ChartIcon }
];

function IconWrapper({ children }) {
  return (
    <span className="sidebar-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="presentation">
        {children}
      </svg>
    </span>
  );
}

function DashboardIcon() {
  return (
    <IconWrapper>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </IconWrapper>
  );
}

function CartIcon() {
  return (
    <IconWrapper>
      <path d="M3 5h2l2.1 9.2a1 1 0 0 0 .98.8H18a1 1 0 0 0 .96-.73L21 7H7" />
      <circle cx="9" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </IconWrapper>
  );
}

function BoxIcon() {
  return (
    <IconWrapper>
      <path d="m4 8 8-4 8 4-8 4-8-4Z" />
      <path d="m4 8 8 4v8l-8-4V8Z" />
      <path d="m20 8-8 4v8l8-4V8Z" />
    </IconWrapper>
  );
}

function UsersIcon() {
  return (
    <IconWrapper>
      <circle cx="8" cy="9" r="3" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M2.5 19c1.2-3 4-4.5 7-4.5s5.8 1.5 7 4.5" />
      <path d="M14.5 18c.65-1.9 2.05-3.02 4.4-3.4 1.1-.17 2.07-.06 2.6.18" />
    </IconWrapper>
  );
}

function BadgeIcon() {
  return (
    <IconWrapper>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <circle cx="9" cy="10" r="2.25" />
      <path d="M6.5 15c.7-1.5 1.8-2.25 3.5-2.25S12.8 13.5 13.5 15" />
      <path d="M15.5 10h2.5M15.5 13.5h2.5" />
      <path d="M8 5V3m8 2V3" />
    </IconWrapper>
  );
}

function ChartIcon() {
  return (
    <IconWrapper>
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M22 20H2" />
    </IconWrapper>
  );
}

function LogoutIcon() {
  return (
    <span className="logout-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="presentation">
        <path d="M10 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" />
        <path d="M21 12H9" />
        <path d="m16 7 5 5-5 5" />
      </svg>
    </span>
  );
}

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand-block">
          <img
            className="brand-logo"
            src={logoPaoFresquim}
            alt="Logo Pão Fresquim"
          />

          <div className="brand-copy">
            <strong>PAOFRESQUIM</strong>
            <span>{"SISTEMA DE GEST\u00c3O"}</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Menu principal">
          {menuItems.map(({ key, label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className={`sidebar-link${activePage === key ? " is-active" : ""}`}
              onClick={() =>
                onNavigate(["dashboard", "cashier", "customers"].includes(key) ? key : "dashboard")
              }
            >
              <Icon />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      <footer className="sidebar-footer">
        <div className="profile-card">
          <div className="profile-avatar">AD</div>

          <div className="profile-copy">
            <strong>Admin</strong>
            <span>admin@padaria.com</span>
          </div>

          <button type="button" className="logout-button" aria-label="Sair">
            <LogoutIcon />
          </button>
        </div>
      </footer>
    </aside>
  );
}
