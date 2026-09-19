/* eslint-disable */
// =============================================
// CEBIO - Centro de Bioterismo
// =============================================

console.log("🚀 CEBIO - Iniciando...");

// ============================================================
// 0. SISTEMA DE LOGIN E USUÁRIOS
// ============================================================

// ===== USUÁRIOS PRÉ-CADASTRADOS =====
const users = {
  sandra: {
    id: "sandra",
    name: "Sandra Klein",
    role: "Gestora",
    email: "sandra@cebio.com",
    password: "123456",
    avatar: "SK",
    permissions: ["all"],
    menuAccess: [
      "dashboard",
      "animals",
      "racks",
      "foundation",
      "breeding",
      "vet",
      "reports",
      "checklist",
      "projects",
      "audit",
    ],
    metrics: ["animals", "mouse", "rat", "pending"],
    isManager: true,
  },
  vinicius: {
    id: "vinicius",
    name: "Dr. Vinícius Vasconcelos",
    role: "M.V R.T",
    email: "vinicius@cebio.com",
    password: "123456",
    avatar: "VV",
    permissions: ["vet", "audit"],
    menuAccess: [
      "dashboard",
      "animals",
      "racks",
      "foundation",
      "breeding",
      "vet",
      "reports",
      "checklist",
      "projects",
      "audit",
    ],
    metrics: ["animals", "mouse", "rat", "pending"],
    isManager: true,
  },
  natally: {
    id: "natally",
    name: "Natally Andréa",
    role: "Técnica",
    email: "natally@cebio.com",
    password: "123456",
    avatar: "NA",
    permissions: ["animals", "racks", "foundation"],
    menuAccess: [
      "dashboard",
      "animals",
      "racks",
      "foundation",
      "breeding",
      "vet",
      "reports",
      "projects",
      "audit",
    ],
    metrics: ["animals", "mouse"],
    isManager: false,
    activities: [
      { id: 1, title: "Desmame · Gaiola 2038", status: "concluida", note: "" },
      {
        id: 2,
        title: "Troca de gaiolas · Rack 01–03",
        status: "pendente",
        note: "",
      },
    ],
    history: [
      {
        when: "Hoje, 09:42",
        event: "Desmame · Gaiola 2038",
        status: "concluida",
      },
      {
        when: "17 Jul, 14:10",
        event: "Troca de gaiolas · Rack 01",
        status: "concluida",
      },
    ],
  },
  rayara: {
    id: "rayara",
    name: "Rayara Luana",
    role: "Técnica",
    email: "rayara@cebio.com",
    password: "123456",
    avatar: "RL",
    permissions: ["animals", "racks", "checklist"],
    menuAccess: [
      "dashboard",
      "animals",
      "racks",
      "foundation",
      "breeding",
      "vet",
      "reports",
      "projects",
      "audit",
    ],
    metrics: ["animals", "mouse"],
    isManager: false,
    activities: [
      {
        id: 3,
        title: "Movimentação · Rack 02 → 05",
        status: "em_andamento",
        note: "",
      },
      {
        id: 4,
        title: "Verificação de temperatura ambiente",
        status: "concluida",
        note: "",
      },
    ],
    history: [
      {
        when: "Hoje, 08:17",
        event: "Movimentação · Rack 02 → 05",
        status: "em_andamento",
      },
      {
        when: "17 Jul, 16:02",
        event: "Verificação de temperatura ambiente",
        status: "concluida",
      },
    ],
  },
  gutemberg: {
    id: "gutemberg",
    name: "Gutemberg Aleixo",
    role: "Técnico",
    email: "gutemberg@cebio.com",
    password: "123456",
    avatar: "GA",
    permissions: ["racks", "foundation", "reports"],
    menuAccess: [
      "dashboard",
      "animals",
      "racks",
      "foundation",
      "breeding",
      "vet",
      "reports",
      "projects",
      "audit",
    ],
    metrics: ["animals", "rat"],
    isManager: false,
    activities: [
      {
        id: 5,
        title: "Triagem sanitária · Sala de Rato",
        status: "pendente",
        note: "",
      },
    ],
    history: [
      {
        when: "Hoje, 07:50",
        event: "Triagem sanitária · Sala de Rato",
        status: "pendente",
      },
    ],
  },
  jigdalias: {
    id: "jigdalias",
    name: "Jigdálias Eulália",
    role: "Técnica",
    email: "jigdalias@cebio.com",
    password: "123456",
    avatar: "JE",
    permissions: ["animals", "checklist", "audit"],
    menuAccess: [
      "dashboard",
      "animals",
      "racks",
      "foundation",
      "breeding",
      "vet",
      "reports",
      "projects",
      "audit",
    ],
    metrics: ["animals", "rat"],
    isManager: false,
    activities: [
      { id: 6, title: "Nascimento · C57BL/6", status: "concluida", note: "" },
      {
        id: 7,
        title: "Revisão de prontuários · Sala de Camundongo",
        status: "nao_concluida",
        note: "Aguardando material",
      },
    ],
    history: [
      {
        when: "17 Jul, 14:20",
        event: "Nascimento · C57BL/6",
        status: "concluida",
      },
      {
        when: "16 Jul, 11:30",
        event: "Revisão de prontuários",
        status: "nao_concluida",
      },
    ],
  },
};

// ===== FUNÇÕES DE AUTENTICAÇÃO =====
function login(username, password) {
  const user = users[username];
  if (user && user.password === password) {
    // Salvar sessão
    const session = {
      user: user,
      loggedIn: true,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem("cebio_session", JSON.stringify(session));
    return true;
  }
  return false;
}

function logout() {
  localStorage.removeItem("cebio_session");
  location.reload();
}

function getCurrentUser() {
  const session = localStorage.getItem("cebio_session");
  if (session) {
    try {
      const data = JSON.parse(session);
      if (data.loggedIn) {
        return data.user;
      }
    } catch (e) {}
  }
  return null;
}

function isLoggedIn() {
  return getCurrentUser() !== null;
}

function hasPermission(permission) {
  const user = getCurrentUser();
  if (!user) return false;
  if (user.permissions.includes("all")) return true;
  return user.permissions.includes(permission);
}

// ===== INICIALIZAR SISTEMA DE LOGIN =====
document.addEventListener("DOMContentLoaded", function () {
  const loginScreen = document.getElementById("loginScreen");
  const mainContent = document.querySelector(".main-content-wrapper");
  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");

  // Verificar se já está logado
  if (isLoggedIn()) {
    if (loginScreen) loginScreen.style.display = "none";
    if (mainContent) mainContent.classList.add("logged-in");
    updateUserInterface();
    return;
  }

  // Mostrar tela de login
  if (loginScreen) loginScreen.style.display = "flex";
  if (mainContent) mainContent.classList.remove("logged-in");

  // Evento de login
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("loginUser").value;
      const password = document.getElementById("loginPassword").value;

      if (!username) {
        showLoginError("Selecione um usuário.");
        return;
      }

      if (login(username, password)) {
        location.reload();
      } else {
        showLoginError("Senha incorreta. Tente novamente.");
      }
    });
  }

  // Enter para logar
  document
    .getElementById("loginPassword")
    ?.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        loginForm.dispatchEvent(new Event("submit"));
      }
    });
});

function showLoginError(message) {
  const error = document.getElementById("loginError");
  if (error) {
    error.querySelector("span").textContent = message;
    error.style.display = "flex";
    setTimeout(() => {
      error.style.display = "none";
    }, 4000);
  }
}

// ===== ATUALIZAR INTERFACE DO USUÁRIO =====
function updateUserInterface() {
  const user = getCurrentUser();
  if (!user) return;

  // Atualizar avatar e nome
  const avatar = document.querySelector(".user-avatar");
  const userName = document.querySelector(".user-name");

  if (avatar)
    avatar.textContent = user.avatar || user.name.substring(0, 2).toUpperCase();
  if (userName) userName.textContent = user.name + " · " + user.role;

  // Mostrar tarefas do usuário (exemplo no dashboard)
  const tasksContainer = document.getElementById("userTasks");
  if (tasksContainer) {
    tasksContainer.innerHTML = user.tasks
      .map((task) => `<li><i class="bi bi-check-circle"></i> ${task}</li>`)
      .join("");
  }

  // Botão de logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
  // Mostra/esconde blocos do dashboard conforme o perfil
  applyRoleVisibility(user);
  applyMenuAccess(user);
  renderNotifications(user);
  applyMetricVisibility(user);
  renderMyActivities(user);
  renderMyHistory(user);
  renderTechnicianCards();
}
// Gestora e Veterinário veem o dashboard de gestão completo;
// Técnicos veem uma versão enxuta, focada no que é deles.
// Baseado no texto do cargo por enquanto — quando os cargos virarem
// uma categoria fixa (gestor/responsavel_tecnico/tecnico) no backend
// de verdade, troca essa checagem por ela, é mais confiável que texto.
function applyRoleVisibility(user) {
  const isAdmin = user.role.indexOf("Técnic") === -1;

  document.querySelectorAll("[data-role-visible]").forEach(function (el) {
    const allowedFor = el.dataset.roleVisible; // 'admin' ou 'tecnico'
    const shouldShow =
      (allowedFor === "admin" && isAdmin) ||
      (allowedFor === "tecnico" && !isAdmin);
    el.style.display = shouldShow ? "" : "none";
  });
}

function applyMenuAccess(user) {
  document.querySelectorAll("#nav .nav-btn[data-menu]").forEach(function (btn) {
    const key = btn.dataset.menu;
    btn.style.display = user.menuAccess.includes(key) ? "" : "none";
  });
}

function applyMetricVisibility(user) {
  document
    .querySelectorAll(".metric-card[data-metric]")
    .forEach(function (card) {
      const key = card.dataset.metric;
      const wrapper = card.closest(".col-6, .col-md-3") || card;
      wrapper.style.display = user.metrics.includes(key) ? "" : "none";
    });
}

const globalAlerts = [
  {
    title: "6 atividades vencem hoje",
    detail: "Troca de gaiolas e triagem sanitária",
    type: "warning",
  },
  {
    title: "Limite de projeto próximo",
    detail: "Projeto Neuroinflamação: 96/180 animais",
    type: "info",
  },
];

function renderNotifications(user) {
  const badge = document.getElementById("notifBadge");
  const body = document.getElementById("notifPanelBody");
  if (!badge || !body) return;

  let items;
  if (user.isManager) {
    items = globalAlerts;
  } else {
    const pendentes = (user.activities || []).filter(
      (a) => a.status !== "concluida",
    );
    items = pendentes.map((a) => ({
      title: a.title,
      detail: a.status === "em_andamento" ? "Em andamento" : "Pendente",
      type: "warning",
    }));
  }

  badge.textContent = items.length;
  badge.style.display = items.length ? "" : "none";

  body.innerHTML = items.length
    ? items
        .map(
          (i) => `
            <div class="alert alert-${i.type === "warning" ? "warning" : "info"}-custom alert-custom">
              <div><strong>${i.title}</strong><div class="small">${i.detail}</div></div>
            </div>`,
        )
        .join("")
    : '<div class="small text-muted">Nenhuma pendência no momento.</div>';
}
// ============================================================
// MÉTRICAS DOS TÉCNICOS (DASHBOARD)
// ============================================================

function renderTechnicianMetrics() {
  const container = document.getElementById("technicianMetricsGrid");
  if (!container) return;

  // Lista de técnicos
  const technicianIds = ["natally", "rayara", "gutemberg", "jigdalias"];

  // Calcular totais gerais
  let totalAtividades = 0;
  let totalConcluidas = 0;
  let totalPendentes = 0;
  let totalEmAndamento = 0;

  // Processar cada técnico
  const tecnicosData = technicianIds
    .map(function (id) {
      const user = users[id];
      if (!user) return null;

      const activities = user.activities || [];
      const concluidas = activities.filter(function (a) {
        return a.status === "concluida";
      }).length;
      const pendentes = activities.filter(function (a) {
        return a.status === "pendente";
      }).length;
      const emAndamento = activities.filter(function (a) {
        return a.status === "em_andamento";
      }).length;
      const total = activities.length;
      const pct = total > 0 ? Math.round((concluidas / total) * 100) : 0;

      // Acumular totais gerais
      totalAtividades += total;
      totalConcluidas += concluidas;
      totalPendentes += pendentes;
      totalEmAndamento += emAndamento;

      return {
        id: id,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        total: total,
        concluidas: concluidas,
        pendentes: pendentes,
        emAndamento: emAndamento,
        pct: pct,
      };
    })
    .filter(function (t) {
      return t !== null;
    });

  // Calcular % geral
  const pctGeral =
    totalAtividades > 0
      ? Math.round((totalConcluidas / totalAtividades) * 100)
      : 0;

  // Renderizar cards dos técnicos
  container.innerHTML = `
        <!-- Cards de totais gerais -->
        <div class="col-6 col-md-3">
            <div class="metric-card">
                <div class="metric-icon"><i class="bi bi-people-fill"></i></div>
                <div class="metric-content">
                    <div class="label">Técnicos ativos</div>
                    <span class="value">${tecnicosData.length}</span>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="metric-card">
                <div class="metric-icon"><i class="bi bi-list-task"></i></div>
                <div class="metric-content">
                    <div class="label">Total de atividades</div>
                    <span class="value">${totalAtividades}</span>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="metric-card">
                <div class="metric-icon"><i class="bi bi-check-circle"></i></div>
                <div class="metric-content">
                    <div class="label">Concluídas</div>
                    <span class="value text-success">${totalConcluidas}</span>
                    <span class="note">${pctGeral}% do total</span>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="metric-card">
                <div class="metric-icon"><i class="bi bi-clock"></i></div>
                <div class="metric-content">
                    <div class="label">Pendentes</div>
                    <span class="value text-danger">${totalPendentes}</span>
                    ${totalEmAndamento > 0 ? `<span class="note">${totalEmAndamento} em andamento</span>` : ""}
                </div>
            </div>
        </div>

        <!-- Cards individuais dos técnicos -->
        ${tecnicosData
          .map(function (t) {
            const corPct =
              t.pct === 100 && t.total > 0
                ? "#28a745"
                : t.pct >= 50
                  ? "#ffc107"
                  : "#dc3545";
            const corTexto =
              t.pct === 100 && t.total > 0
                ? "text-success"
                : t.pct >= 50
                  ? "text-warning"
                  : "text-danger";
            return `
                <div class="col-6 col-md-3">
                    <div class="technician-metric-card" onclick="openTechnicianDetailFromDashboard('${t.id}')">
                        <div class="d-flex align-items-center gap-2 mb-2">
                            <div class="user-avatar" style="width:36px;height:36px;font-size:12px;">${t.avatar}</div>
                            <div>
                                <div class="fw-semibold small">${t.name}</div>
                                <div class="text-muted" style="font-size:11px;">${t.role}</div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between small mb-1">
                            <span>${t.concluidas}/${t.total} concluídas</span>
                            <span class="${corTexto} fw-semibold">${t.pct}%</span>
                        </div>
                        <div class="progress-custom">
                            <div class="progress-bar-custom" style="width:${t.pct}%; background:${corPct};"></div>
                        </div>
                        <div class="d-flex justify-content-between mt-2" style="font-size:11px;">
                            <span class="text-success">${t.concluidas} ✓</span>
                            <span class="text-warning">${t.emAndamento} ⏳</span>
                            <span class="text-danger">${t.pendentes} ⚠</span>
                        </div>
                    </div>
                </div>
            `;
          })
          .join("")}
    `;
}
// ============================================================
// DASHBOARD DO TÉCNICO (dentro do Checklist)
// ============================================================

function renderTechnicianDetailMetrics(techId) {
  const container = document.getElementById("technicianDetailMetrics");
  if (!container) return;

  const user = users[techId];
  if (!user) return;

  const activities = user.activities || [];
  const concluidas = activities.filter(function (a) {
    return a.status === "concluida";
  }).length;
  const pendentes = activities.filter(function (a) {
    return a.status === "pendente";
  }).length;
  const emAndamento = activities.filter(function (a) {
    return a.status === "em_andamento";
  }).length;
  const naoConcluidas = activities.filter(function (a) {
    return a.status === "nao_concluida";
  }).length;
  const total = activities.length;
  const pct = total > 0 ? Math.round((concluidas / total) * 100) : 0;

  const corPct =
    pct === 100 && total > 0 ? "#28a745" : pct >= 50 ? "#ffc107" : "#dc3545";

  container.innerHTML = `
        <div class="col-6 col-md-3">
            <div class="metric-card">
                <div class="metric-icon"><i class="bi bi-list-task"></i></div>
                <div class="metric-content">
                    <div class="label">Total de atividades</div>
                    <span class="value">${total}</span>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="metric-card">
                <div class="metric-icon"><i class="bi bi-check-circle"></i></div>
                <div class="metric-content">
                    <div class="label">Concluídas</div>
                    <span class="value text-success">${concluidas}</span>
                    <span class="note">${pct}% do total</span>
                </div>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="metric-card">
                <div class="metric-icon"><i class="bi bi-clock"></i></div>
                <div class="metric-content">
                    <div class="label">Pendentes</div>
                    <span class="value text-danger">${pendentes + naoConcluidas}</span>
                    ${emAndamento > 0 ? `<span class="note">${emAndamento} em andamento</span>` : ""}
                </div>
            </div>
        </div>
        <div class="col-6 col-md-3">
            <div class="metric-card">
                <div class="metric-icon"><i class="bi bi-graph-up"></i></div>
                <div class="metric-content">
                    <div class="label">Progresso</div>
                    <span class="value">${pct}%</span>
                    <div class="progress-custom mt-1">
                        <div class="progress-bar-custom" style="width:${pct}%; background:${corPct};"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
// ===== NAVEGAR PARA O CHECKLIST AO CLICAR NO CARD DO TÉCNICO =====
function openTechnicianDetailFromDashboard(techId) {
  // Navega para o Checklist
  const checklistBtn = document.querySelector(
    '#nav .nav-btn[data-view="checklist"]',
  );
  if (checklistBtn) {
    checklistBtn.click();
  }
  // Abre o detalhe do técnico
  setTimeout(function () {
    if (typeof openTechnicianDetail === "function") {
      openTechnicianDetail(techId);
    }
  }, 100);
}
document.getElementById("notifBell")?.addEventListener("click", function (e) {
  e.stopPropagation();
  document.getElementById("notifPanel").classList.toggle("open");
});
document.addEventListener("click", function () {
  document.getElementById("notifPanel")?.classList.remove("open");
});
const STATUS_LABELS = {
  pendente: "Pendente",
  em_andamento: "Em andamento",
  concluida: "Realizado",
  nao_concluida: "Não concluída",
};

function renderMyActivities(user) {
  const card = document.getElementById("myActivitiesCard");
  const list = document.getElementById("myActivitiesList");
  if (!card || !list) return;

  if (user.isManager) {
    card.style.display = "none";
    return;
  }
  card.style.display = "";

  list.innerHTML = (user.activities || [])
    .map(
      (a) => `
        <div class="check-item" data-activity-id="${a.id}">
          <div class="check-info" style="flex-direction:column; align-items:flex-start; gap:6px;">
            <b>${a.title}</b>
            <div style="display:flex; gap:8px; align-items:center; width:100%;">
              <select class="form-select form-select-sm activity-status" style="max-width:180px">
                ${Object.entries(STATUS_LABELS)
                  .map(
                    ([val, label]) =>
                      `<option value="${val}" ${a.status === val ? "selected" : ""}>${label}</option>`,
                  )
                  .join("")}
              </select>
              <input type="text" class="form-control form-control-sm activity-note" placeholder="Observação" value="${a.note || ""}">
            </div>
          </div>
        </div>
    `,
    )
    .join("");

  list.querySelectorAll(".activity-status").forEach((sel) => {
    sel.addEventListener("change", function () {
      const id = Number(this.closest("[data-activity-id]").dataset.activityId);
      const act = user.activities.find((x) => x.id === id);
      if (act) act.status = this.value;
      renderNotifications(user); // atualiza contagem do sino
    });
  });
  list.querySelectorAll(".activity-note").forEach((inp) => {
    inp.addEventListener("input", function () {
      const id = Number(this.closest("[data-activity-id]").dataset.activityId);
      const act = user.activities.find((x) => x.id === id);
      if (act) act.note = this.value;
    });
  });
}

const technicianIds = ["natally", "rayara", "gutemberg", "jigdalias"];

function renderTechnicianCards() {
  const container = document.getElementById("technicianCards");
  if (!container) return;

  container.innerHTML = technicianIds
    .map((id) => {
      const t = users[id];
      return `
        <div class="col-6 col-md-3">
          <div class="card-custom text-center" style="cursor:pointer" data-tech-id="${id}">
            <div class="user-avatar mx-auto mb-2" style="width:56px;height:56px;font-size:1.2rem;">${t.avatar}</div>
            <b>${t.name}</b>
            <div class="small text-muted">${t.role}</div>
          </div>
        </div>`;
    })
    .join("");

  container.querySelectorAll("[data-tech-id]").forEach((card) => {
    card.addEventListener("click", () =>
      openTechnicianDetail(card.dataset.techId),
    );
  });
}

function openTechnicianDetail(techId) {
  document.getElementById("checklistTeamView").style.display = "none";
  document.getElementById("checklistDetailView").style.display = "";
  document.getElementById("detailTechName").textContent = users[techId].name;
  document.getElementById("checklistDetailView").dataset.techId = techId;
  renderTechnicianDetailMetrics(techId);
  renderDetailActivities(techId);
}

function renderDetailActivities(techId) {
  const user = users[techId];
  const list = document.getElementById("detailActivitiesList");

  list.innerHTML =
    (user.activities || [])
      .map(
        (a) => `
        <div class="check-item" data-activity-id="${a.id}">
          <div class="check-info">
            <div><b>${a.title}</b>
              <div class="small text-muted">${STATUS_LABELS[a.status]}${a.note ? " · " + a.note : ""}</div>
            </div>
          </div>
          <div>
            <button class="btn btn-sm btn-outline-secondary edit-activity-btn"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-sm btn-outline-danger delete-activity-btn"><i class="bi bi-trash"></i></button>
          </div>
        </div>
    `,
      )
      .join("") ||
    '<div class="small text-muted p-2">Nenhuma atividade cadastrada.</div>';

  list.querySelectorAll(".delete-activity-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = Number(this.closest("[data-activity-id]").dataset.activityId);
      user.activities = user.activities.filter((a) => a.id !== id);
      renderDetailActivities(techId);
    });
  });
  list.querySelectorAll(".edit-activity-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = Number(this.closest("[data-activity-id]").dataset.activityId);
      const act = user.activities.find((a) => a.id === id);
      const novoTitulo = prompt("Editar atividade:", act.title);
      if (novoTitulo) {
        act.title = novoTitulo;
        renderDetailActivities(techId);
      }
    });
  });
}

document
  .getElementById("backToTeamBtn")
  ?.addEventListener("click", function () {
    document.getElementById("checklistDetailView").style.display = "none";
    document.getElementById("checklistTeamView").style.display = "";
  });

document
  .getElementById("addActivityBtn")
  ?.addEventListener("click", function () {
    const techId = document.getElementById("checklistDetailView").dataset
      .techId;
    const titulo = prompt("Título da nova atividade:");
    if (!titulo) return;
    const user = users[techId];
    const nextId = Math.max(0, ...user.activities.map((a) => a.id)) + 1;
    user.activities.push({
      id: nextId,
      title: titulo,
      status: "pendente",
      note: "",
    });
    renderDetailActivities(techId);
  });

const STATUS_TAG = {
  pendente: "tag-warn",
  em_andamento: "tag-blue",
  concluida: "tag-success",
  nao_concluida: "tag-danger",
};

function renderMyHistory(user) {
  const card = document.getElementById("myHistoryCard");
  const body = document.getElementById("myHistoryBody");
  if (!card || !body) return;

  if (user.isManager || !user.history) {
    card.style.display = "none";
    return;
  }
  card.style.display = "";

  body.innerHTML = user.history
    .map(
      (h) => `
        <tr>
          <td>${h.when}</td>
          <td>${h.event}</td>
          <td><span class="tag ${STATUS_TAG[h.status]}">${STATUS_LABELS[h.status]}</span></td>
        </tr>
    `,
    )
    .join("");
}

// ============================================================
// 1. NAVEGAÇÃO E TÍTULOS (CORAÇÃO DA APLICAÇÃO)
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM carregado!");

  // Títulos de cada página
  const titles = {
    dashboard: ["Visão geral", "Acompanhamento da colônia e ações pendentes"],
    animals: ["Animais e gaiolas", "Cadastro, identificação e situação atual"],
    racks: [
      "Espelho de racks",
      "Visualização de capacidade, tipo e situação das gaiolas",
    ],
    foundation: [
      "Casais de fundação",
      "Programação, numeração e destino de desmamados",
    ],
    breeding: ["Reprodução", "Acasalamentos, nascimentos e desmame"],
    vet: [
      "Prontuário veterinário",
      "Registros clínicos rastreáveis e assinados",
    ],
    reports: [
      "Relatório mensal",
      "Indicadores de nascimentos, saídas e ocupação",
    ],
    checklist: [
      "Checklist de atividades",
      "Rotinas do biotério com execução registrada",
    ],
    projects: [
      "Projetos e CEUA",
      "Limites aprovados, responsáveis e vínculo de animais",
    ],
    audit: ["Auditoria", "Histórico imutável de todos os eventos"],
  };

  // ===== PEGAR TODOS OS BOTÕES DO MENU =====
  const botoes = document.querySelectorAll("#nav .nav-btn");
  console.log(`📊 ${botoes.length} botões encontrados`);

  if (botoes.length === 0) {
    console.warn('⚠️ NENHUM botão encontrado! Verifique a classe "nav-btn".');
    return;
  }

  // ===== CONFIGURAR CLICK EM CADA BOTÃO =====
  botoes.forEach(function (botao) {
    botao.addEventListener("click", function (e) {
      e.preventDefault();

      const viewName = this.dataset.view;
      console.log(`🔄 Clicou em: ${viewName}`);

      // 1. Remove active de todos os botões
      botoes.forEach(function (b) {
        b.classList.remove("active");
      });

      // 2. Adiciona active no botão clicado
      this.classList.add("active");

      // 3. Esconde todas as views
      const todasViews = document.querySelectorAll(".view");
      todasViews.forEach(function (v) {
        v.classList.remove("active");
      });

      // 4. Mostra a view correta
      const viewAlvo = document.getElementById(viewName);
      if (viewAlvo) {
        viewAlvo.classList.add("active");
        console.log(`✅ View "${viewName}" ativada com sucesso!`);
      } else {
        console.warn(`⚠️ View "${viewName}" não encontrada no HTML`);
      }

      // 5. Atualiza o título e subtítulo
      const titulo = document.getElementById("pageTitle");
      const sub = document.getElementById("pageSub");
      if (titulo && sub && titles[viewName]) {
        titulo.textContent = titles[viewName][0];
        sub.textContent = titles[viewName][1];
      }
    });
  });

  // ===== BOTÕES COM data-go (ex: "Ver auditoria") =====
  document.querySelectorAll("[data-go]").forEach(function (b) {
    b.addEventListener("click", function () {
      const target = this.dataset.go;
      console.log(`🔄 Redirecionando para: ${target}`);
      const botao = document.querySelector(
        `#nav .nav-btn[data-view="${target}"]`,
      );
      if (botao) {
        botao.click();
      } else {
        console.warn(`⚠️ Botão "${target}" não encontrado`);
      }
    });
  });

  console.log("✅ Navegação configurada com sucesso!");
  console.log("📊 Clique nos menus para testar!");
});

// ===== CARDS CLICÁVEIS DO DASHBOARD =====
document.querySelectorAll(".metric-card[data-go]").forEach(function (card) {
  card.addEventListener("click", function () {
    const target = this.dataset.go;
    console.log("🔄 Card clicado, indo para:", target);

    // Se for racks, salva qual sala selecionar
    if (target === "racks" && this.dataset.room) {
      console.log("💾 Salvando preferência de sala:", this.dataset.room);
      localStorage.setItem("cebio_room_preference", this.dataset.room);
    }

    const view = document.getElementById(target);
    if (view) {
      // Ativa a view manualmente
      document
        .querySelectorAll(".view")
        .forEach((v) => v.classList.remove("active"));
      view.classList.add("active");
      // Atualiza o botão do menu
      document
        .querySelectorAll("#nav .nav-btn")
        .forEach((b) => b.classList.remove("active"));
      document
        .querySelector(`#nav .nav-btn[data-view="${target}"]`)
        ?.classList.add("active");
    }
  });
});

// ============================================================
// 2. RACKS - CONFIGURAÇÕES E FUNÇÕES
// ============================================================
const configs = {
  mouse: {
    label: "Sala de Camundongo",
    racks: ["01", "02", "03", "04", "05", "06", "07", "08"],
    spaces: function (r) {
      return ["07", "08"].includes(r) ? 88 : 36;
    },
  },
  rat: {
    label: "Sala de Rato",
    racks: ["01", "02", "03", "04", "05", "06", "07"],
    spaces: function (r) {
      return ["01", "02"].includes(r) ? 36 : 16;
    },
  },
};

// ===== VARIÁVEIS GLOBAIS DOS RACKS =====
let room, rack, grid;

// Mapeia o "tipo" da gaiola pra classe visual do grid. Reservado/Doação
// vêm do campo status (texto livre), não do tipo — mantém o mesmo
// comportamento que já existia, só organizado num lugar só.
function cageVisualClass(cage) {
  if (cage.type === "Casal de Fundação") return "couple";
  if (cage.type === "Casal de Expansão") return "expansion";
  if (cage.status && cage.status.toLowerCase().indexOf("reservado") !== -1)
    return "reserved";
  if (cage.status === "Doação") return "donate";
  return ""; // ocupada, sem categoria visual especial (ex: desmamados comuns)
}

// ===== FUNÇÕES DOS RACKS =====
function fillRacks() {
  if (!room || !rack) return;
  rack.innerHTML = configs[room.value].racks
    .map(function (x) {
      return `<option>${x}</option>`;
    })
    .join("");
  renderRack();
}

function renderRack() {
  if (!room || !rack || !grid) return;

  const c = configs[room.value];
  const n = c.spaces(rack.value);
  const rackInfo = document.getElementById("rackInfo");
  if (rackInfo) {
    rackInfo.textContent =
      c.label + " · Rack " + rack.value + " · " + n + " espaços";
  }

  grid.className = "rack-grid " + (n === 36 ? "grid-36" : "grid-88");
  grid.innerHTML = "";

  // Só as gaiolas desta sala+rack específicos — cada gaiola agora tem
  // room/rack/position gravados, então ela só aparece onde de fato está.
  const cageByPosition = {};
  getAll("cages").forEach(function (cg) {
    if (cg.room === room.value && cg.rack === rack.value) {
      cageByPosition[cg.position] = cg;
    }
  });

  for (let i = 0; i < n; i++) {
    const cage = cageByPosition[i];
    const el = document.createElement("button");

    if (cage) {
      el.className = "cage " + cageVisualClass(cage);
      el.innerHTML =
        '<span class="cage-id">G ' +
        escapeHtml(cage.cageNumber) +
        "</span>" +
        '<span class="cage-age">' +
        (cage.maleCount || 0) +
        " M / " +
        (cage.femaleCount || 0) +
        " F</span>" +
        '<span class="cage-kind">' +
        escapeHtml(cage.type || "") +
        "</span>";
      el.addEventListener("click", function () {
        showFullCageProfile(cage.id);
      });
    } else {
      el.className = "cage empty";
      el.innerHTML =
        '<span class="cage-id">' +
        String(i + 1).padStart(2, "0") +
        "</span>" +
        '<span class="cage-age">Disponível</span>';
      el.addEventListener("click", function () {
        openCageModal(null, {
          room: room.value,
          rack: rack.value,
          position: i,
        });
      });
    }

    grid.appendChild(el);
  }
}

function showFullCageProfile(cageId) {
  const cage = getAll("cages").find(function (c) {
    return c.id === cageId;
  });
  const detail = document.getElementById("cageDetail");
  if (!detail || !cage) return;

  detail.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <h5 class="mb-0 fw-semibold">${escapeHtml(cage.species)} · ${escapeHtml(cage.lineage)} · GAIOLA ${escapeHtml(cage.cageNumber)}</h5>
                <small class="text-muted">${escapeHtml(cage.type || "—")} · ${escapeHtml(cage.status || "—")}</small>
            </div>
            <span class="tag">Histórico auditável</span>
        </div>

        <div class="cage-details-grid mt-3">
            <div class="detail-row">
                <span class="detail-label">Grupo</span>
                <span class="detail-value">${escapeHtml(cage.group) || "—"}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Pais</span>
                <span class="detail-value">${escapeHtml(cage.father) || "—"} (M) / ${escapeHtml(cage.mother) || "—"} (F)</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Data nasc.</span>
                <span class="detail-value">${cage.birth || "—"}</span>
                <span class="detail-label ms-3">Caixa</span>
                <span class="detail-value">${escapeHtml(cage.box) || "01"}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Geração</span>
                <span class="detail-value">${escapeHtml(cage.generation) || "F1"}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Data do desmame</span>
                <span class="detail-value">${cage.weaning || "—"}</span>
                <span class="detail-label ms-3">Morte</span>
                <span class="detail-value">${cage.death || "—"}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Nº</span>
                <span class="detail-value">${escapeHtml(cage.number) || "01"}</span>
                <span class="detail-label ms-3">M</span>
                <span class="detail-value">${cage.maleCount || 0}</span>
                <span class="detail-label ms-2">F</span>
                <span class="detail-value">${cage.femaleCount || 0}</span>
            </div>
        </div>

        <!-- Botões de ação (apenas para Gestora) -->
        <div class="mt-3 d-flex gap-2">
            <button class="btn btn-primary btn-sm" onclick="openCageModal(${cage.id})">
                <i class="bi bi-pencil"></i> Editar
            </button>
            <button class="btn btn-outline-danger btn-sm" onclick="handleDeleteCage(${cage.id})">
                <i class="bi bi-trash"></i> Excluir
            </button>
            <button class="btn btn-outline-secondary btn-sm" onclick="openBirthModal(${cage.id})">
                <i class="bi bi-plus-circle"></i> Adicionar nascimento
            </button>
        </div>

        <h6 class="fw-semibold mt-3">Histórico de nascimentos</h6>
        <div class="table-responsive">
            <table class="table table-custom">
                <thead><tr><th>Data</th><th>Total</th><th>Sexagem</th><th>Responsável</th></tr></thead>
                <tbody>
                    ${
                      cage.births && cage.births.length
                        ? cage.births
                            .map(function (b) {
                              return `<tr><td>${b.date}</td><td>${b.total}</td><td>${escapeHtml(b.sexagem)}</td><td>${escapeHtml(b.responsible) || "—"}</td></tr>`;
                            })
                            .join("")
                        : '<tr><td colspan="4" class="text-muted">Nenhum nascimento registrado.</td></tr>'
                    }
                </tbody>
            </table>
        </div>
    `;
}

function resetCageDetail() {
  const detail = document.getElementById("cageDetail");
  if (!detail) return;
  detail.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <h5 class="mb-0 fw-semibold">Detalhes da gaiola</h5>
                <small class="text-muted">Clique em uma gaiola para ver as informações completas</small>
            </div>
            <span class="tag">Histórico auditável</span>
        </div>
        <div class="text-center py-4 text-muted">
            <i class="bi bi-cursor fs-4 d-block"></i>
            <span>Selecione uma gaiola no espelho acima</span>
        </div>
    `;
}

// ============================================================
// GAIOLAS: CRIAR / EDITAR / EXCLUIR (via localStorage, sem prompt())
// ============================================================
let cageModalInstance = null;
let cageModalNewSlot = null; // { room, rack, position } quando criando via slot vazio

const CAGE_FIELD_IDS = [
  "cageNumber",
  "species",
  "lineage",
  "type",
  "status",
  "group",
  "father",
  "mother",
  "birth",
  "generation",
  "weaning",
  "death",
  "box",
  "number",
  "maleCount",
  "femaleCount",
];

function openCageModal(cageId, newSlot) {
  const modalEl = document.getElementById("cageModal");
  if (!cageModalInstance) {
    cageModalInstance = new bootstrap.Modal(modalEl);
  }

  const title = document.getElementById("cageModalTitle");
  const idField = document.getElementById("cageId");
  const errorBox = document.getElementById("cageFormError");
  errorBox.style.display = "none";

  if (cageId) {
    const cage = getAll("cages").find(function (c) {
      return c.id === cageId;
    });
    if (!cage) return;
    cageModalNewSlot = null;
    title.textContent = "Editar gaiola " + cage.cageNumber;
    idField.value = cage.id;
    CAGE_FIELD_IDS.forEach(function (field) {
      document.getElementById("cage_" + field).value = cage[field] || "";
    });
  } else {
    cageModalNewSlot = newSlot;
    title.textContent =
      "Nova gaiola · " +
      configs[newSlot.room].label +
      " · Rack " +
      newSlot.rack +
      " · posição " +
      (newSlot.position + 1);
    idField.value = "";
    CAGE_FIELD_IDS.forEach(function (field) {
      document.getElementById("cage_" + field).value = "";
    });
    document.getElementById("cage_species").value =
      newSlot.room === "mouse" ? "Camundongo" : "Rato";
    document.getElementById("cage_maleCount").value = 0;
    document.getElementById("cage_femaleCount").value = 0;
  }

  cageModalInstance.show();
}

function handleDeleteCage(cageId) {
  const cage = getAll("cages").find(function (c) {
    return c.id === cageId;
  });
  if (!cage) return;
  if (
    confirm(
      "Tem certeza que deseja excluir a gaiola " +
        cage.cageNumber +
        "? Essa ação não pode ser desfeita.",
    )
  ) {
    removeRecord("cages", cageId);
    resetCageDetail();
    renderRack();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const saveCageBtn = document.getElementById("saveCageBtn");
  if (!saveCageBtn) return;

  saveCageBtn.addEventListener("click", function () {
    const id = document.getElementById("cageId").value;
    const errorBox = document.getElementById("cageFormError");
    const errorText = document.getElementById("cageFormErrorText");

    const data = {};
    CAGE_FIELD_IDS.forEach(function (field) {
      data[field] = document.getElementById("cage_" + field).value.trim();
    });
    data.maleCount = Number(data.maleCount) || 0;
    data.femaleCount = Number(data.femaleCount) || 0;

    if (!data.cageNumber || !data.species || !data.lineage) {
      errorText.textContent = "Preencha número da gaiola, espécie e linhagem.";
      errorBox.style.display = "flex";
      return;
    }

    if (id) {
      updateRecord("cages", Number(id), data);
      showFullCageProfile(Number(id));
    } else {
      data.room = cageModalNewSlot.room;
      data.rack = cageModalNewSlot.rack;
      data.position = cageModalNewSlot.position;
      data.births = [];
      const created = createRecord("cages", data);
      showFullCageProfile(created.id);
    }

    errorBox.style.display = "none";
    cageModalInstance.hide();
    renderRack();
  });
});

// ============================================================
// NASCIMENTOS: adicionar ao histórico da gaiola
// ============================================================
let birthModalInstance = null;
let birthModalCageId = null;

function openBirthModal(cageId) {
  const modalEl = document.getElementById("birthModal");
  if (!birthModalInstance) {
    birthModalInstance = new bootstrap.Modal(modalEl);
  }
  birthModalCageId = cageId;
  document.getElementById("birth_date").value = "";
  document.getElementById("birth_total").value = "";
  document.getElementById("birth_male").value = "";
  document.getElementById("birth_female").value = "";
  document.getElementById("birth_responsible").value = currentUserSafeName();
  document.getElementById("birthFormError").style.display = "none";
  birthModalInstance.show();
}

// Evita erro se currentUser ainda não existir neste ponto do carregamento.
function currentUserSafeName() {
  try {
    const user = getCurrentUser();
    return user ? user.name : "";
  } catch (e) {
    return "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const saveBirthBtn = document.getElementById("saveBirthBtn");
  if (!saveBirthBtn) return;

  saveBirthBtn.addEventListener("click", function () {
    const errorBox = document.getElementById("birthFormError");
    const errorText = document.getElementById("birthFormErrorText");

    const date = document.getElementById("birth_date").value;
    const male = Number(document.getElementById("birth_male").value) || 0;
    const female = Number(document.getElementById("birth_female").value) || 0;
    const total =
      Number(document.getElementById("birth_total").value) || male + female;
    const responsible = document
      .getElementById("birth_responsible")
      .value.trim();

    if (!date || total <= 0) {
      errorText.textContent = "Informe a data e o total de filhotes.";
      errorBox.style.display = "flex";
      return;
    }

    const cage = getAll("cages").find(function (c) {
      return c.id === birthModalCageId;
    });
    if (!cage) return;

    const births = (cage.births || []).slice();
    births.push({
      date: date.split("-").reverse().join("/"),
      total: total,
      sexagem: male + " M / " + female + " F",
      responsible: responsible,
    });

    updateRecord("cages", cage.id, { births: births });
    errorBox.style.display = "none";
    birthModalInstance.hide();
    showFullCageProfile(cage.id);
  });
});

// ===== SEED INICIAL DAS GAIOLAS =====
document.addEventListener("DOMContentLoaded", function () {
  seedIfEmpty("cages", [
    {
      id: 1,
      cageNumber: "2031",
      room: "mouse",
      rack: "01",
      position: 0,
      species: "Camundongo",
      lineage: "C57BL/6",
      type: "Casal de Fundação",
      status: "Ativo",
      group: "Fundação 2026-A",
      father: "M-2010-01 · C57BL/6",
      mother: "F-2010-02 · C57BL/6",
      birth: "2026-05-01",
      generation: "F1",
      weaning: "",
      death: "",
      box: "01",
      number: "01",
      maleCount: 1,
      femaleCount: 1,
      births: [],
    },
    {
      id: 2,
      cageNumber: "2033",
      room: "mouse",
      rack: "01",
      position: 2,
      species: "Camundongo",
      lineage: "C57BL/6",
      type: "Desmamados",
      status: "Reservado para projeto · CEUA 018/2026",
      group: "",
      father: "M-2031-01 · C57BL/6",
      mother: "F-2031-02 · C57BL/6",
      birth: "2026-06-21",
      generation: "F2",
      weaning: "",
      death: "",
      box: "01",
      number: "02",
      maleCount: 3,
      femaleCount: 3,
      births: [],
    },
    {
      id: 3,
      cageNumber: "2036",
      room: "mouse",
      rack: "01",
      position: 5,
      species: "Camundongo",
      lineage: "C57BL/6",
      type: "Casal de Expansão",
      status: "Ativo",
      group: "Expansão 04",
      father: "M-2008-01 · C57BL/6",
      mother: "F-2008-02 · C57BL/6",
      birth: "2026-05-11",
      generation: "F1",
      weaning: "",
      death: "",
      box: "01",
      number: "03",
      maleCount: 1,
      femaleCount: 1,
      births: [],
    },
    {
      id: 4,
      cageNumber: "1041",
      room: "mouse",
      rack: "01",
      position: 7,
      species: "Camundongo",
      lineage: "BALB/c",
      type: "Desmamados",
      status: "Doação",
      group: "",
      father: "M-1032-01 · BALB/c",
      mother: "F-1032-02 · BALB/c",
      birth: "2026-06-18",
      generation: "F2",
      weaning: "",
      death: "",
      box: "01",
      number: "04",
      maleCount: 2,
      femaleCount: 2,
      births: [],
    },
    {
      id: 5,
      cageNumber: "2041",
      room: "mouse",
      rack: "01",
      position: 10,
      species: "Camundongo",
      lineage: "C57BL/6",
      type: "Casal de Fundação",
      status: "Ativo",
      group: "Fundação 2026-B",
      father: "M-2021-01 · C57BL/6",
      mother: "F-2021-02 · C57BL/6",
      birth: "2026-05-07",
      generation: "F1",
      weaning: "",
      death: "",
      box: "01",
      number: "05",
      maleCount: 1,
      femaleCount: 1,
      births: [],
    },
    {
      id: 6,
      cageNumber: "2043",
      room: "mouse",
      rack: "01",
      position: 12,
      species: "Camundongo",
      lineage: "C57BL/6",
      type: "Desmamados",
      status: "Ativo",
      group: "",
      father: "M-2036-01 · C57BL/6",
      mother: "F-2036-02 · C57BL/6",
      birth: "2026-06-26",
      generation: "F2",
      weaning: "",
      death: "",
      box: "01",
      number: "06",
      maleCount: 4,
      femaleCount: 4,
      births: [],
    },
  ]);
});
// ===== ANIMAIS ======
function getAnimalsFromCages() {
  const cages = getAll("cages");
  const animals = [];

  cages.forEach(function (cage) {
    // Machos
    for (let i = 1; i <= (cage.maleCount || 0); i++) {
      animals.push({
        id: cage.cageNumber + "-M" + String(i).padStart(2, "0"),
        cageNumber: cage.cageNumber,
        species: cage.species,
        lineage: cage.lineage,
        sex: "M",
        age: calculateAge(cage.birth),
        status: cage.status || "Ativo",
        project: cage.project || "—",
        cageId: cage.id,
      });
    }
    // Fêmeas
    for (let i = 1; i <= (cage.femaleCount || 0); i++) {
      animals.push({
        id: cage.cageNumber + "-F" + String(i).padStart(2, "0"),
        cageNumber: cage.cageNumber,
        species: cage.species,
        lineage: cage.lineage,
        sex: "F",
        age: calculateAge(cage.birth),
        status: cage.status || "Ativo",
        project: cage.project || "—",
        cageId: cage.id,
      });
    }
  });
  return animals;
}
function calculateAge(birthDate) {
  if (!birthDate) return "—";
  const birth = new Date(birthDate);
  const now = new Date();
  const diffDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return "—";
  if (diffDays < 30) return diffDays + " dias";
  if (diffDays < 365) return Math.floor(diffDays / 30) + " meses";
  return Math.floor(diffDays / 365) + " anos";
}
// ============================================================
// TELA: ANIMAIS E GAIOLAS
// ============================================================

function renderAnimalsTable(filter) {
  const tbody = document.getElementById("animalsTableBody");
  if (!tbody) return;

  let animals = getAnimalsFromCages();

  // Aplicar filtros
  if (filter) {
    if (filter.species && filter.species !== "Todas") {
      animals = animals.filter(function (a) {
        return a.species === filter.species;
      });
    }
    if (filter.lineage && filter.lineage !== "Todas") {
      animals = animals.filter(function (a) {
        return a.lineage === filter.lineage;
      });
    }
    if (filter.status && filter.status !== "Todos") {
      animals = animals.filter(function (a) {
        return a.status === filter.status;
      });
    }
    if (filter.search) {
      const search = filter.search.toLowerCase();
      animals = animals.filter(function (a) {
        return (
          a.id.toLowerCase().includes(search) || a.cageNumber.includes(search)
        );
      });
    }
  }

  if (!animals.length) {
    tbody.innerHTML =
      '<tr><td colspan="6" class="text-muted text-center py-3">Nenhum animal encontrado.</td></tr>';
    return;
  }

  tbody.innerHTML = animals
    .map(function (a) {
      const statusTag = getStatusTag(a.status);
      return `
            <tr>
                <td><b>${escapeHtml(a.id)}</b></td>
                <td>${escapeHtml(a.species)} · ${escapeHtml(a.lineage)}</td>
                <td>${a.sex} · ${a.age}</td>
                <td>G ${escapeHtml(a.cageNumber)}</td>
                <td>${escapeHtml(a.project)}</td>
                <td><span class="tag ${statusTag}">${escapeHtml(a.status)}</span></td>
            </tr>
        `;
    })
    .join("");
}

function getStatusTag(status) {
  const map = {
    Ativo: "tag-success",
    Observação: "tag-warn",
    Reservado: "tag-blue",
    Doação: "tag-danger",
    Disponível: "tag-success",
    Morto: "tag-danger",
    Doado: "tag-warn",
  };
  return map[status] || "tag";
}
// ===== INICIALIZAR TELA DE ANIMAIS =====
document.addEventListener("DOMContentLoaded", function () {
  const speciesFilter = document.getElementById("animalSpecies");
  const lineageFilter = document.getElementById("animalLineage");
  const statusFilter = document.getElementById("animalStatus");
  const searchFilter = document.getElementById("animalSearch");
  const filterBtn = document.getElementById("animalFilterBtn");
  const clearBtn = document.getElementById("animalClearBtn");

  function applyFilters() {
    const filter = {
      species: speciesFilter ? speciesFilter.value : "Todas",
      lineage: lineageFilter ? lineageFilter.value : "Todas",
      status: statusFilter ? statusFilter.value : "Todos",
      search: searchFilter ? searchFilter.value.trim() : "",
    };
    renderAnimalsTable(filter);
  }

  if (filterBtn) {
    filterBtn.addEventListener("click", applyFilters);
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      if (speciesFilter) speciesFilter.value = "Todas";
      if (lineageFilter) lineageFilter.value = "Todas";
      if (statusFilter) statusFilter.value = "Todos";
      if (searchFilter) searchFilter.value = "";
      renderAnimalsTable();
    });
  }

  // Renderização inicial
  renderAnimalsTable();
});
// ===== INICIALIZAR RACKS =====
document.addEventListener("DOMContentLoaded", function () {
  room = document.getElementById("roomSelect");
  rack = document.getElementById("rackSelect");
  grid = document.getElementById("rackGrid");

  if (room && rack && grid) {
    console.log("✅ Elementos dos racks encontrados");

    // ===== LÊ A PREFERÊNCIA DE SALA SALVA =====
    const preferredRoom = localStorage.getItem("cebio_room_preference");
    if (preferredRoom && ["mouse", "rat"].includes(preferredRoom)) {
      console.log("🔄 Aplicando preferência de sala:", preferredRoom);
      room.value = preferredRoom;
      // Remove a preferência depois de usar (para não ficar preso)
      //localStorage.removeItem('cebio_room_preference');
    }

    room.addEventListener("change", fillRacks);
    rack.addEventListener("change", renderRack);
    fillRacks();
  } else {
    console.warn("⚠️ Elementos dos racks não encontrados");
  }
});

// ============================================================
// 3. FOUNDATION - CASAL DE FUNDAÇÃO
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  const foundationLineage = document.getElementById("foundationLineage");
  const foundationCage = document.getElementById("foundationCage");
  const nextCage = document.getElementById("nextCage");
  const saveFoundation = document.getElementById("saveFoundation");
  const foundationAudit = document.getElementById("foundationAudit");
  const vetSave = document.getElementById("vetSave");

  if (foundationLineage) {
    foundationLineage.addEventListener("change", function (e) {
      if (foundationCage) {
        foundationCage.value = Number(e.target.value) + 1;
      }
    });
  }

  if (nextCage) {
    nextCage.addEventListener("click", function () {
      if (foundationCage) {
        foundationCage.value = Number(foundationCage.value) + 1;
      }
    });
  }

  if (saveFoundation) {
    saveFoundation.addEventListener("click", function () {
      if (foundationAudit) {
        const date = new Date().toLocaleDateString("pt-BR");
        foundationAudit.textContent =
          "✅ Casal programado por Sandra Klein em " + date;
        foundationAudit.style.borderLeftColor = "#28a745";
      }
    });
  }

  if (vetSave) {
    vetSave.addEventListener("click", function () {
      alert(
        "✅ Registro veterinário assinado e incluído no histórico auditável.",
      );
    });
  }

  // Checklist - mudança de status
  document
    .querySelectorAll('#checks input[type="checkbox"]')
    .forEach(function (i) {
      i.addEventListener("change", function () {
        const item = this.closest(".check-item");
        if (item) {
          const tag = item.querySelector(".tag");
          if (tag) {
            tag.textContent = this.checked ? "Concluído" : "Pendente";
            tag.className =
              "tag " + (this.checked ? "tag-success" : "tag-warn");
          }
        }
      });
    });
});

// ============================================================
// 4. CAMADA DE DADOS (localStorage) — genérica pra qualquer entidade
// ============================================================
// Fase de mockup: substitui o backend. Cada entidade (projects,
// animals, cages...) vira uma chave própria: cebio_<entidade>.
// Só estas funções tocam em localStorage diretamente — todo o
// resto do app (telas) usa só getAll/create/update/remove.
// Quando a API de verdade entrar, essas 5 funções são as únicas
// que precisam trocar de implementação (viram fetch); o resto
// (renderização das telas) não muda.

function storageKey(entity) {
  return "cebio_" + entity;
}

function seedIfEmpty(entity, seedData) {
  if (localStorage.getItem(storageKey(entity)) === null) {
    localStorage.setItem(storageKey(entity), JSON.stringify(seedData));
  }
}

function getAll(entity) {
  const raw = localStorage.getItem(storageKey(entity));
  return raw ? JSON.parse(raw) : [];
}

function saveAll(entity, records) {
  localStorage.setItem(storageKey(entity), JSON.stringify(records));
}

function nextId(records) {
  return records.length
    ? Math.max.apply(
        null,
        records.map(function (r) {
          return r.id;
        }),
      ) + 1
    : 1;
}

function createRecord(entity, data) {
  const records = getAll(entity);
  const record = Object.assign({}, data, { id: nextId(records) });
  records.push(record);
  saveAll(entity, records);
  return record;
}

function updateRecord(entity, id, data) {
  const records = getAll(entity);
  const index = records.findIndex(function (r) {
    return r.id === id;
  });
  if (index === -1) return null;
  records[index] = Object.assign({}, records[index], data);
  saveAll(entity, records);
  return records[index];
}

function removeRecord(entity, id) {
  const records = getAll(entity);
  const filtered = records.filter(function (r) {
    return r.id !== id;
  });
  saveAll(entity, filtered);
  return filtered.length !== records.length;
}

// ===== SEED INICIAL: roda uma vez só, na primeira visita =====
document.addEventListener("DOMContentLoaded", function () {
  // Projetos
  seedIfEmpty("projects", [
    {
      id: 1,
      name: "Neuroinflamação",
      responsible: "Prof. R. Almeida",
      ceua: "018/2026",
      limit: 180,
      linked: 96,
      status: "Ativo",
    },
    {
      id: 2,
      name: "Hipertensão SHR",
      responsible: "Profa. C. Nunes",
      ceua: "022/2026",
      limit: 120,
      linked: 74,
      status: "Ativo",
    },
    {
      id: 3,
      name: "Imunodeficiência",
      responsible: "Profa. M. Santos",
      ceua: "025/2026",
      limit: 60,
      linked: 45,
      status: "Em andamento",
    },
    {
      id: 4,
      name: "Comportamento",
      responsible: "Prof. L. Oliveira",
      ceua: "030/2026",
      limit: 40,
      linked: 12,
      status: "Iniciando",
    },
  ]);

  seedIfEmpty("audit", [
    {
      id: 1,
      date: "2026-07-18 09:42",
      action: "Desmame",
      object: "Gaiola 2038",
      details: "8 filhotes · Projeto Neuroinflamação",
      signature: "J. Silva",
      type: "Desmame",
    },
    {
      id: 2,
      date: "2026-07-18 08:17",
      action: "Movimentação",
      object: "Gaiola 4012",
      details: "Rack 02 → Rack 05",
      signature: "M. Lima",
      type: "Movimentação",
    },
    {
      id: 3,
      date: "2026-07-17 16:31",
      action: "Prontuário",
      object: "R-5012",
      details: "Dermatite leve · Observação",
      signature: "Dra. A. Costa",
      type: "Veterinário",
    },
    {
      id: 4,
      date: "2026-07-17 14:20",
      action: "Nascimento",
      object: "G 2031",
      details: "9 filhotes · C57BL/6",
      signature: "Jigdálias E.",
      type: "Nascimento",
    },
    {
      id: 5,
      date: "2026-07-16 10:05",
      action: "Procedimento",
      object: "Projeto SHR",
      details: "Coleta de sangue · 12 animais",
      signature: "Dr. Vinícius",
      type: "Procedimento",
    },
  ]);
});

// ============================================================
// 5. TELA: PROJETOS E CEUA (primeira tela com CRUD completo)
// ============================================================
const PROJECT_STATUS_TAG = {
  Ativo: "tag-success",
  "Em andamento": "tag-blue",
  Iniciando: "tag-warn",
  Encerrado: "tag-danger",
};

function renderProjectsTable() {
  const tbody = document.getElementById("projectsTableBody");
  if (!tbody) return;

  const projects = getAll("projects");

  if (!projects.length) {
    tbody.innerHTML =
      '<tr><td colspan="8" class="text-muted text-center py-3">Nenhum projeto cadastrado ainda.</td></tr>';
    return;
  }

  tbody.innerHTML = projects
    .map(function (p) {
      const pct = p.limit > 0 ? Math.round((p.linked / p.limit) * 100) : 0;
      const tagClass = PROJECT_STATUS_TAG[p.status] || "tag";
      return `
            <tr>
                <td><b>${escapeHtml(p.name)}</b></td>
                <td>${escapeHtml(p.responsible)}</td>
                <td>${escapeHtml(p.ceua)}</td>
                <td>${p.limit}</td>
                <td>${p.linked}</td>
                <td>
                    <div class="progress-custom" style="width:80px;">
                        <div class="progress-bar-custom" style="width:${pct}%"></div>
                    </div>
                </td>
                <td><span class="tag ${tagClass}">${escapeHtml(p.status)}</span></td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-sm btn-outline-secondary" onclick="openProjectModal(${p.id})" title="Editar">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="handleDeleteProject(${p.id})" title="Excluir">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    })
    .join("");
}

// Escapa texto vindo de input do usuário antes de jogar no innerHTML —
// evita que um nome de projeto com "<" ou ">" quebre o layout da tabela.
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text == null ? "" : text;
  return div.innerHTML;
}

let projectModalInstance = null;

function openProjectModal(projectId) {
  const modalEl = document.getElementById("projectModal");
  if (!projectModalInstance) {
    projectModalInstance = new bootstrap.Modal(modalEl);
  }

  const title = document.getElementById("projectModalTitle");
  const idField = document.getElementById("projectId");
  const nameField = document.getElementById("projectName");
  const responsibleField = document.getElementById("projectResponsible");
  const ceuaField = document.getElementById("projectCeua");
  const limitField = document.getElementById("projectLimit");
  const linkedField = document.getElementById("projectLinked");
  const statusField = document.getElementById("projectStatus");
  const errorBox = document.getElementById("projectFormError");

  errorBox.style.display = "none";

  if (projectId) {
    const project = getAll("projects").find(function (p) {
      return p.id === projectId;
    });
    if (!project) return;
    title.textContent = "Editar projeto";
    idField.value = project.id;
    nameField.value = project.name;
    responsibleField.value = project.responsible;
    ceuaField.value = project.ceua;
    limitField.value = project.limit;
    linkedField.value = project.linked;
    statusField.value = project.status;
  } else {
    title.textContent = "Novo projeto";
    idField.value = "";
    nameField.value = "";
    responsibleField.value = "";
    ceuaField.value = "";
    limitField.value = "";
    linkedField.value = 0;
    statusField.value = "Iniciando";
  }

  projectModalInstance.show();
}

function handleDeleteProject(projectId) {
  const project = getAll("projects").find(function (p) {
    return p.id === projectId;
  });
  if (!project) return;
  if (
    confirm(
      'Tem certeza que deseja excluir o projeto "' +
        project.name +
        '"? Essa ação não pode ser desfeita.',
    )
  ) {
    removeRecord("projects", projectId);
    renderProjectsTable();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const newProjectBtn = document.getElementById("newProjectBtn");
  const saveProjectBtn = document.getElementById("saveProjectBtn");
  const errorBox = document.getElementById("projectFormError");
  const errorText = document.getElementById("projectFormErrorText");

  if (newProjectBtn) {
    newProjectBtn.addEventListener("click", function () {
      openProjectModal(null);
    });
  }

  if (saveProjectBtn) {
    saveProjectBtn.addEventListener("click", function () {
      const id = document.getElementById("projectId").value;
      const name = document.getElementById("projectName").value.trim();
      const responsible = document
        .getElementById("projectResponsible")
        .value.trim();
      const ceua = document.getElementById("projectCeua").value.trim();
      const limit = Number(document.getElementById("projectLimit").value);
      const linked = Number(document.getElementById("projectLinked").value);
      const status = document.getElementById("projectStatus").value;

      if (!name || !responsible || !ceua) {
        errorText.textContent = "Preencha nome, responsável e número CEUA.";
        errorBox.style.display = "flex";
        return;
      }
      if (!limit || limit <= 0) {
        errorText.textContent = "Informe um limite de animais maior que zero.";
        errorBox.style.display = "flex";
        return;
      }
      if (linked > limit) {
        errorText.textContent =
          "Animais vinculados não pode ser maior que o limite aprovado.";
        errorBox.style.display = "flex";
        return;
      }

      const data = {
        name: name,
        responsible: responsible,
        ceua: ceua,
        limit: limit,
        linked: linked,
        status: status,
      };

      if (id) {
        updateRecord("projects", Number(id), data);
      } else {
        createRecord("projects", data);
      }

      errorBox.style.display = "none";
      projectModalInstance.hide();
      renderProjectsTable();
    });
  }

  // Primeira renderização da tabela
  renderProjectsTable();
});
// ============================================================
// TELA: AUDITORIA
// ============================================================

const AUDIT_TYPE_TAG = {
  Desmame: "tag-success",
  Movimentação: "tag-blue",
  Veterinário: "tag-warn",
  Nascimento: "tag-success",
  Procedimento: "tag-info",
};

function renderAuditTable(filter) {
  const tbody = document.getElementById("auditTableBody");
  if (!tbody) return;

  let events = getAll("audit");

  // Aplicar filtros (se existirem)
  if (filter) {
    if (filter.type && filter.type !== "Todos") {
      events = events.filter(function (e) {
        return e.type === filter.type;
      });
    }
    if (filter.responsible) {
      const search = filter.responsible.toLowerCase();
      events = events.filter(function (e) {
        return e.signature.toLowerCase().includes(search);
      });
    }
    if (filter.dateStart) {
      events = events.filter(function (e) {
        return e.date.split(" ")[0] >= filter.dateStart;
      });
    }
    if (filter.dateEnd) {
      events = events.filter(function (e) {
        return e.date.split(" ")[0] <= filter.dateEnd;
      });
    }
  }

  // Ordenar por data (mais recente primeiro)
  events.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  if (!events.length) {
    tbody.innerHTML =
      '<tr><td colspan="5" class="text-muted text-center py-3">Nenhum evento registrado.</td></tr>';
    return;
  }

  tbody.innerHTML = events
    .map(function (e) {
      const tagClass = AUDIT_TYPE_TAG[e.type] || "tag";
      const dateFormatted = e.date.replace(" ", " · ");
      return `
            <tr>
                <td>${dateFormatted}</td>
                <td><span class="tag ${tagClass}">${escapeHtml(e.action)}</span></td>
                <td>${escapeHtml(e.object)}</td>
                <td>${escapeHtml(e.details)}</td>
                <td><i class="bi bi-person-circle"></i> ${escapeHtml(e.signature)}</td>
            </tr>
        `;
    })
    .join("");

  // Atualizar contador
  const countEl = document.getElementById("auditCount");
  if (countEl) {
    countEl.textContent =
      "Mostrando " +
      events.length +
      " de " +
      getAll("audit").length +
      " eventos";
  }
}
// ===== INICIALIZAR TELA DE AUDITORIA =====
document.addEventListener("DOMContentLoaded", function () {
  const typeFilter = document.getElementById("auditType");
  const responsibleFilter = document.getElementById("auditResponsible");
  const dateStartFilter = document.getElementById("auditDateStart");
  const dateEndFilter = document.getElementById("auditDateEnd");
  const filterBtn = document.getElementById("auditFilterBtn");
  const clearBtn = document.getElementById("auditClearBtn");

  function applyAuditFilters() {
    const filter = {
      type: typeFilter ? typeFilter.value : "Todos",
      responsible: responsibleFilter ? responsibleFilter.value.trim() : "",
      dateStart: dateStartFilter ? dateStartFilter.value : "",
      dateEnd: dateEndFilter ? dateEndFilter.value : "",
    };
    renderAuditTable(filter);
  }

  if (filterBtn) {
    filterBtn.addEventListener("click", applyAuditFilters);
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      if (typeFilter) typeFilter.value = "Todos";
      if (responsibleFilter) responsibleFilter.value = "";
      if (dateStartFilter) dateStartFilter.value = "";
      if (dateEndFilter) dateEndFilter.value = "";
      renderAuditTable();
    });
  }

  // Renderização inicial
  renderAuditTable();
});

// ===== INICIALIZAR CHECKLIST =====
document.addEventListener("DOMContentLoaded", function () {
  // Verifica se estamos na tela de checklist
  const container = document.getElementById("technicianCards");
  if (container) {
    renderTechnicianCards();
  }
});

console.log("✅ CEBIO - Todos os scripts carregados com sucesso!");

// ============================================================
// MURAL DE EVENTOS (Escala / Feriados / Treinamentos / Procedimentos)
// ============================================================
const MURAL_CATEGORY_LABEL = {
  escala: "Escala / Plantão",
  feriado: "Feriado",
  treinamento: "Treinamento",
  procedimento: "Procedimento / Manutenção",
};
const MURAL_WEEKDAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

let muralCurrentMonth = "2026-07"; // mesmo "hoje" fictício usado no resto do mockup
let muralModalInstance = null;
let muralSelectedDate = null;

function isAdminUser() {
  const user = getCurrentUser();
  return !!user && user.role.indexOf("Técnic") === -1;
}

function populateMuralMonthSelect() {
  const select = document.getElementById("muralMonthSelect");
  if (!select) return;
  const months = ["2026-06", "2026-07", "2026-08", "2026-09"];
  const labels = {
    "2026-06": "Junho 2026",
    "2026-07": "Julho 2026",
    "2026-08": "Agosto 2026",
    "2026-09": "Setembro 2026",
  };
  select.innerHTML = months
    .map(function (m) {
      return `<option value="${m}" ${m === muralCurrentMonth ? "selected" : ""}>${labels[m]}</option>`;
    })
    .join("");
  select.addEventListener("change", function () {
    muralCurrentMonth = this.value;
    renderMuralGrid();
    resetMuralDayDetail();
  });
}

function renderMuralGrid() {
  const grid = document.getElementById("muralGrid");
  if (!grid) return;

  const [year, month] = muralCurrentMonth.split("-").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const startWeekday = firstDay.getDay(); // 0 = domingo

  const events = getAll("mural_events").filter(function (e) {
    return e.date && e.date.indexOf(muralCurrentMonth) === 0;
  });
  const eventsByDay = {};
  events.forEach(function (e) {
    const day = Number(e.date.split("-")[2]);
    (eventsByDay[day] = eventsByDay[day] || []).push(e);
  });

  let html = MURAL_WEEKDAYS.map(function (w) {
    return `<div class="mural-weekday">${w}</div>`;
  }).join("");

  for (let i = 0; i < startWeekday; i++) {
    html += '<div class="mural-day empty"></div>';
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = eventsByDay[day] || [];
    const visible = dayEvents.slice(0, 2);
    const extra = dayEvents.length - visible.length;

    const postits =
      visible
        .map(function (e) {
          return `<div class="mural-postit cat-${e.category}">${escapeHtml(e.title)}</div>`;
        })
        .join("") +
      (extra > 0 ? `<div class="mural-postit more">+${extra}</div>` : "");

    const dateStr = muralCurrentMonth + "-" + String(day).padStart(2, "0");
    html += `<div class="mural-day" data-date="${dateStr}"><span class="day-number">${day}</span>${postits}</div>`;
  }

  grid.innerHTML = html;

  grid.querySelectorAll(".mural-day[data-date]").forEach(function (el) {
    el.addEventListener("click", function () {
      showMuralDayDetail(this.dataset.date);
    });
  });
}

function showMuralDayDetail(dateStr) {
  muralSelectedDate = dateStr;
  const detail = document.getElementById("muralDayDetail");
  if (!detail) return;

  const events = getAll("mural_events").filter(function (e) {
    return e.date === dateStr;
  });
  const admin = isAdminUser();
  const [y, m, d] = dateStr.split("-");

  detail.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="mb-0 fw-semibold">Eventos de ${d}/${m}/${y}</h5>
            <button class="btn btn-primary btn-sm" onclick="openMuralEventModal(null, '${dateStr}')">
                <i class="bi bi-plus-lg"></i> Novo evento
            </button>
        </div>
        ${
          events.length
            ? events
                .map(function (e) {
                  return `
                <div class="d-flex justify-content-between align-items-center border-bottom py-2">
                    <div>
                        <span class="mural-postit cat-${e.category}" style="display:inline-block;">${escapeHtml(MURAL_CATEGORY_LABEL[e.category] || e.category)}</span>
                        <b class="ms-2">${escapeHtml(e.title)}</b>
                        ${e.notes ? '<div class="small text-muted mt-1">' + escapeHtml(e.notes) + "</div>" : ""}
                    </div>
                    ${
                      admin
                        ? `
                        <div class="table-actions">
                            <button class="btn btn-sm btn-outline-secondary" onclick="openMuralEventModal(${e.id})" title="Editar"><i class="bi bi-pencil"></i></button>
                            <button class="btn btn-sm btn-outline-danger" onclick="handleDeleteMuralEvent(${e.id})" title="Excluir"><i class="bi bi-trash"></i></button>
                        </div>
                    `
                        : ""
                    }
                </div>
            `;
                })
                .join("")
            : '<p class="text-muted small mb-0">Nenhum evento neste dia.</p>'
        }
    `;
}

function resetMuralDayDetail() {
  const detail = document.getElementById("muralDayDetail");
  if (!detail) return;
  detail.innerHTML = `
        <div>
            <h5 class="mb-0 fw-semibold">Detalhes do dia</h5>
            <small class="text-muted">Clique em um dia no mural para ver os eventos</small>
        </div>
    `;
}

function openMuralEventModal(eventId, prefilledDate) {
  const modalEl = document.getElementById("muralEventModal");
  if (!muralModalInstance) {
    muralModalInstance = new bootstrap.Modal(modalEl);
  }

  const title = document.getElementById("muralEventModalTitle");
  const errorBox = document.getElementById("muralEventFormError");
  errorBox.style.display = "none";

  if (eventId) {
    const ev = getAll("mural_events").find(function (e) {
      return e.id === eventId;
    });
    if (!ev) return;
    title.textContent = "Editar evento";
    document.getElementById("muralEventId").value = ev.id;
    document.getElementById("muralEventTitle").value = ev.title;
    document.getElementById("muralEventDate").value = ev.date;
    document.getElementById("muralEventCategory").value = ev.category;
    document.getElementById("muralEventNotes").value = ev.notes || "";
  } else {
    title.textContent = "Novo evento";
    document.getElementById("muralEventId").value = "";
    document.getElementById("muralEventTitle").value = "";
    document.getElementById("muralEventDate").value =
      prefilledDate || muralSelectedDate || "";
    document.getElementById("muralEventCategory").value = "escala";
    document.getElementById("muralEventNotes").value = "";
  }

  muralModalInstance.show();
}

function handleDeleteMuralEvent(eventId) {
  const ev = getAll("mural_events").find(function (e) {
    return e.id === eventId;
  });
  if (!ev) return;
  if (confirm('Excluir o evento "' + ev.title + '"?')) {
    removeRecord("mural_events", eventId);
    renderMuralGrid();
    showMuralDayDetail(ev.date);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const saveBtn = document.getElementById("saveMuralEventBtn");
  const newBtn = document.getElementById("newMuralEventBtn");
  if (newBtn)
    newBtn.addEventListener("click", function () {
      openMuralEventModal(null, null);
    });
  if (!saveBtn) return;

  saveBtn.addEventListener("click", function () {
    const errorBox = document.getElementById("muralEventFormError");
    const errorText = document.getElementById("muralEventFormErrorText");

    const id = document.getElementById("muralEventId").value;
    const title = document.getElementById("muralEventTitle").value.trim();
    const date = document.getElementById("muralEventDate").value;
    const category = document.getElementById("muralEventCategory").value;
    const notes = document.getElementById("muralEventNotes").value.trim();

    if (!title || !date) {
      errorText.textContent = "Preencha título e data.";
      errorBox.style.display = "flex";
      return;
    }

    const data = { title: title, date: date, category: category, notes: notes };

    if (id) {
      updateRecord("mural_events", Number(id), data);
    } else {
      const user = getCurrentUser();
      data.createdBy = user ? user.id : null;
      createRecord("mural_events", data);
      muralCurrentMonth = date.slice(0, 7);
      const select = document.getElementById("muralMonthSelect");
      if (select) select.value = muralCurrentMonth;
    }

    errorBox.style.display = "none";
    muralModalInstance.hide();
    renderMuralGrid();
    showMuralDayDetail(date);
  });
});

// ===== SEED INICIAL: eventos de exemplo baseados no mural físico =====
document.addEventListener("DOMContentLoaded", function () {
  seedIfEmpty("mural_events", [
    {
      id: 1,
      date: "2026-07-01",
      title: "Plantão · Sandra",
      category: "escala",
      notes: "",
      createdBy: "sandra",
    },
    {
      id: 2,
      date: "2026-07-02",
      title: "Treinamento médico",
      category: "treinamento",
      notes: "",
      createdBy: "vinicius",
    },
    {
      id: 3,
      date: "2026-07-03",
      title: "Treinamento veterinário",
      category: "treinamento",
      notes: "",
      createdBy: "vinicius",
    },
    {
      id: 4,
      date: "2026-07-08",
      title: "Troca de gaiola · 1x RA",
      category: "procedimento",
      notes: "",
      createdBy: "rayara",
    },
    {
      id: 5,
      date: "2026-07-14",
      title: "Feriado",
      category: "feriado",
      notes: "",
      createdBy: "sandra",
    },
    {
      id: 6,
      date: "2026-07-18",
      title: "Troca de gaiola · 1x RA",
      category: "procedimento",
      notes: "",
      createdBy: "natally",
    },
    {
      id: 7,
      date: "2026-07-21",
      title: "Troca de gaiola",
      category: "procedimento",
      notes: "",
      createdBy: "gutemberg",
    },
  ]);

  populateMuralMonthSelect();
  renderMuralGrid();
});
