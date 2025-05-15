console.log("Hello World! This code runs immediately when the file is loaded.");

Hooks.on("init", function() {
  console.log("This code runs once the Foundry VTT software begins its initialization workflow.");
});

//Hooks.on("ready", function() {
//  console.log("This code runs once core initialization is ready and game data is available.");


/*
Hooks.on("controlToken", (token, controlled) => {
//  console.log(`${token.name} was ${controlled ? "selected" : "deselected"}`);
  console.log(`======================================`);
  if (canvas.tokens.controlled.length >0)
  {
    //console.log(canvas.tokens.controlled[0].actor.name);
    //console.log("HP "+ canvas.tokens.controlled[0].actor.system.attributes.hp.value);
    canvas.tokens.controlled.forEach(token => {
      const actor = token.actor;
      const name = actor.name;
      const hp = actor.system?.attributes?.hp;

      console.log(`${name}: ${hp?.value ?? "?"}/${hp?.max ?? "?"} HP`);
    });
  }

});*/

//tokens2 = ;
//tokens2[0].actor.system
/*
// Ensure only one instance of the dialog and hook exists
if (!window._tokenHPDialog) {
  // Function to build the HTML content
  function buildHPTable(tokens) {
    if (!tokens.length) return "<p>No tokens selected.</p>";

    let content = `<table style="width:100%; text-align:left;">
      <tr><th>Name</th><th>HP</th></tr>`;

    for (let token of tokens) {
      const actor = token.actor;
      const hp = actor?.system?.attributes?.hp;
      const name = actor?.name ?? "Unknown";
      const current = hp?.value ?? "?";
      const max = hp?.max ?? "?";
      content += `<tr><td>${name}</td><td>${current} / ${max}</td></tr>`;
    }

    content += `</table>`;
    return content;
  }

  // Function to update the dialog content
  function updateDialog() {
    if (!window._tokenHPDialog?.element) return;

    const tokens = canvas.tokens.controlled;
    const newContent = buildHPTable(tokens);
    const contentContainer = window._tokenHPDialog.element.find("#token-hp-content");

    if (contentContainer.length) {
      contentContainer.html(newContent);
    } else {
      console.warn("Dialog content container not found.");
    }
  }

  // Create the dialog
  const dialog = new Dialog({
    title: "Selected Tokens - HP",
    content: `<div id="token-hp-content">${buildHPTable(canvas.tokens.controlled)}</div>`,
    buttons: {
      close: {
        label: "Close",
        callback: () => {
          window._tokenHPDialog = null;
          Hooks.off("controlToken", updateDialog); // Remove the hook on close
        }
      }
    },
    close: () => {
      window._tokenHPDialog = null;
      Hooks.off("controlToken", updateDialog);
    }
  }, { id: "token-hp-dialog", width: 300, resizable: true });

  window._tokenHPDialog = dialog;
  dialog.render(true);

  // Attach the update function to the controlToken hook
  Hooks.on("controlToken", updateDialog);
}
});*/

 // Hooks.once("ready", function () {
 /*   if (!window._tokenHPDialog) {
      function buildHPTable(tokens) {
        if (!tokens.length) return "<p>No tokens selected.</p>";

        let content = `<table style="width:100%; text-align:left;">
        <tr><th>Name</th><th>HP</th></tr>`;

        for (let token of tokens) {
          const actor = token.actor;
          const hp = actor?.system?.attributes?.hp;
          const name = actor?.name ?? "Unknown";
          const current = hp?.value ?? "?";
          const max = hp?.max ?? "?";

          content += `<tr>
          <td>${name}</td>
          <td>
            <input type="number" min="0" max="${max}" value="${current}"
              data-token-id="${token.id}" style="width: 50px;" />
            / ${max}
          </td>
        </tr>`;
        }

        content += `</table>`;
        return content;
      }

      function updateDialog() {
        if (!window._tokenHPDialog?.element) return;

        const tokens = canvas.tokens.controlled;
        const newContent = buildHPTable(tokens);
        const contentContainer = window._tokenHPDialog.element.find("#token-hp-content");

        if (contentContainer.length) {
          contentContainer.html(newContent);
          attachInputListeners();
        }
      }

      function attachInputListeners() {
        const dialogEl = window._tokenHPDialog.element;
        dialogEl.find("input[type='number']").on("change", async function () {
          const tokenId = this.dataset.tokenId;
          const newValue = parseInt(this.value, 10);

          const token = canvas.tokens.get(tokenId);
          if (!token || !token.actor) return;

          const hpPath = "system.attributes.hp.value"; // D&D 5e default
          await token.actor.update({ [hpPath]: newValue });

          console.log(`Updated ${token.name} HP to ${newValue}`);
        });
      }

      const dialog = new Dialog({
        title: "Selected Tokens - HP",
        content: `<div id="token-hp-content">${buildHPTable(canvas.tokens.controlled)}</div>`,
        buttons: {
          close: {
            label: "Close",
            callback: () => {
              window._tokenHPDialog = null;
              Hooks.off("controlToken", updateDialog);
            }
          }
        },
        close: () => {
          window._tokenHPDialog = null;
          Hooks.off("controlToken", updateDialog);
        }
      }, { id: "token-hp-dialog", width: 350, resizable: true });

      window._tokenHPDialog = dialog;
      dialog.render(true);
      Hooks.on("controlToken", updateDialog);

      // Attach listeners after initial render
      Hooks.once("renderDialog", () => {
        attachInputListeners();
      });
    }
  });*/

/*
  if (Hooks._tokenHPHook) return;

  function buildHPTable(tokens) {
    if (!tokens.length) return "<p>No tokens selected.</p>";

    let content = `<table style="width:100%; text-align:left;">
      <tr><th>Name</th><th>HP</th></tr>`;

    for (let token of tokens) {
      const actor = token.actor;
      const hp = actor?.system?.attributes?.hp;
      const name = actor?.name ?? "Unknown";
      const current = hp?.value ?? "?";
      const max = hp?.max ?? "?";

      content += `<tr>
        <td>${name}</td>
        <td>
          <input type="number" min="0" max="${max}" value="${current}"
            data-token-id="${token.id}" style="width: 50px;" />
          / ${max}
        </td>
      </tr>`;
    }

    content += `</table>`;
    return content;
  }



  function attachInputListeners() {
    const dialogEl = window._tokenHPDialog.element;
    dialogEl.find("input[type='number']").on("change", async function () {
      const tokenId = this.dataset.tokenId;
      const newValue = parseInt(this.value, 10);

      const token = canvas.tokens.get(tokenId);
      if (!token || !token.actor) return;

      await token.actor.update({ "system.attributes.hp.value": newValue });
      console.log(`Updated ${token.name} HP to ${newValue}`);
    });
  }

  function renderOrUpdateDialog() {
    const tokens = canvas.tokens.controlled;
    if (!tokens.length) return;

    const html = `<div id="token-hp-content">${buildHPTable(tokens)}</div>`;

    if (!window._tokenHPDialog) {
      // Create new dialog
      window._tokenHPDialog = new Dialog({
        title: "Selected Tokens - HP",
        content: html,
        buttons: {
          close: {
            label: "Close",
            callback: () => {
              window._tokenHPDialog = null;
            }
          }
        },
        close: () => {
          window._tokenHPDialog = null;
        }
      }, { id: "token-hp-dialog", width: 350, resizable: true });

      window._tokenHPDialog.render(true);
      Hooks.once("renderDialog", () => attachInputListeners());
    } else {
      // Update existing dialog content
      const container = window._tokenHPDialog.element.find("#token-hp-content");
      if (container.length) {
        container.html(buildHPTable(tokens));
        attachInputListeners();
      }
    }
  }

  // Register the controlToken hook globally
  Hooks._tokenHPHook = Hooks.on("controlToken", renderOrUpdateDialog);

  // Initial run in case tokens are already selected
  if (canvas.tokens.controlled.length > 0) {
    renderOrUpdateDialog();
  }
});*/
 /* if (Hooks._tokenHPHook) return;  // Already registered

  // Build the HTML table for selected tokens
  function buildTokenTable(tokens) {
    if (!tokens.length) return "<p>No tokens selected.</p>";

    let content = `
      <table style="width:100%; text-align:left;">
        <tr>
          <th>Name</th>
          <th>HP</th>
          <th>AC</th>
          <th>Conditions</th>
        </tr>`;

    for (let token of tokens) {
      const actor = token.actor;
      const hp = actor?.system?.attributes?.hp;
      const ac  = actor?.system?.attributes?.ac?.value;
      // Collect effect labels as “conditions”
      //const conds = actor.effects.map(e => e.data.label).join(", ") || "None";

      const conds = actor.effects.map(e => e.name).join(", ") || "None";


      const name    = actor?.name    || "Unknown";
      const current = hp?.value      ?? "?";
      const max     = hp?.max        ?? "?";
      const armor   = ac              ?? "?";

      content += `
        <tr>
          <td>${name}</td>
          <td>
            <input type="number" min="0" max="${max}" value="${current}"
                   data-token-id="${token.id}" style="width:50px;" />
             / ${max}
          </td>
          <td>${armor}</td>
          <td>${conds}</td>
        </tr>`;
    }

    content += `</table>`;
    return content;
  }

  // Attach change‐listeners to HP inputs
  function attachInputListeners() {
    const dialogEl = window._tokenHPDialog.element;
    dialogEl.find("input[type='number']").on("change", async function () {
      const tokenId = this.dataset.tokenId;
      const newValue = parseInt(this.value, 10);
      const token = canvas.tokens.get(tokenId);
      if (!token?.actor) return;
      // Update actor HP
      await token.actor.update({ "system.attributes.hp.value": newValue });
    });
  }

  // Create or update the dialog
  function renderOrUpdateDialog() {
    const tokens = canvas.tokens.controlled;
    if (!tokens.length) return;

    const html = `<div id="token-data-content">${buildTokenTable(tokens)}</div>`;

    if (!window._tokenHPDialog) {
      window._tokenHPDialog = new Dialog({
        title: "Selected Tokens — Stats",
        content: html,
        buttons: {
          close: { label: "Close", callback: () => window._tokenHPDialog = null }
        },
        close: () => window._tokenHPDialog = null
      }, { id: "token-stats-dialog", width: 400, resizable: true });

      window._tokenHPDialog.render(true);
      Hooks.once("renderDialog", attachInputListeners);
    }
    else {
      const container = window._tokenHPDialog.element.find("#token-data-content");
      if (container.length) {
        container.html(html);
        attachInputListeners();
      }
    }
  }

  // Keep the dialog in sync whenever selection changes
  Hooks._tokenHPHook = Hooks.on("controlToken", renderOrUpdateDialog);

  // If tokens are already selected on load, show it immediately
  if (canvas.tokens.controlled.length) renderOrUpdateDialog();
});*/
 /* if (Hooks._tokenHPHook) return;

  let inventoryDialogs = [];

  function buildTokenTable(tokens) {
    if (!tokens.length) return "<p>No tokens selected.</p>";

    let content = `<table style="width:100%; text-align:left;">
      <tr>
        <th>Name</th><th>HP</th><th>AC</th><th>Conditions</th>
      </tr>`;

    for (let token of tokens) {
      const actor = token.actor;
      const hp = actor?.system?.attributes?.hp;
      const ac = actor?.system?.attributes?.ac?.value ?? "?";
      const conditions = actor.effects.map(e => e.name).join(", ") || "None";
      const name = actor?.name ?? "Unknown";
      const current = hp?.value ?? "?";
      const max = hp?.max ?? "?";

      content += `<tr>
        <td>${name}</td>
        <td><input type="number" min="0" max="${max}" value="${current}" 
          data-token-id="${token.id}" style="width:50px;" /> / ${max}</td>
        <td>${ac}</td>
        <td>${conditions}</td>
      </tr>`;
    }

    content += `</table>`;
    return content;
  }

  function buildInventoryHTML(actor) {
    const items = actor.items;/*.filter(i =>
        ["weapon", "equipment", "consumable"].includes(i.type)
    );
    if (!items.size) return "<p>No inventory.</p>";

    let html = `<table style="width:100%;">
      <tr><th>Name</th><th>Qty</th><th>Type</th></tr>`;
    for (let item of items) {
      html += `<tr>
        <td>${item.name}</td>
        <td>${item.system?.quantity ?? 1}</td>
        <td>${item.type}</td>
      </tr>`;
    }
    html += `</table>`;
    return html;
  }

  function attachInputListeners() {
    const dialogEl = window._tokenHPDialog?.element;
    if (!dialogEl) return;
    dialogEl.find("input[type='number']").on("change", async function () {
      const tokenId = this.dataset.tokenId;
      const newValue = parseInt(this.value, 10);
      const token = canvas.tokens.get(tokenId);
      if (!token?.actor) return;
      await token.actor.update({ "system.attributes.hp.value": newValue });
    });
  }

  function destroyInventoryDialogs() {
    for (const dlg of inventoryDialogs) {
      dlg.close({ force: true });
    }
    inventoryDialogs = [];
  }

  async function showInventoryDialogs(tokens) {
    destroyInventoryDialogs();

    const hpDialog = window._tokenHPDialog;
    if (!hpDialog?.position) return;

    const top = hpDialog.position.top + hpDialog.position.height + 10;
    let left = hpDialog.position.left;

    for (let [index, token] of tokens.entries()) {
      const actor = token.actor;
      const content = buildInventoryHTML(actor);

      const dialog = new Dialog({
        title: `${actor.name}'s Inventory`,
        content,
        buttons: {},
        close: () => {}
      }, {
        id: `inv-dialog-${token.id}-${Date.now()}`, // ensure unique
        width: 250,
        top,
        left: left + (index * 260), // space them apart
        resizable: true
      });

      await dialog.render(true);
      inventoryDialogs.push(dialog);
    }
  }

  async function renderOrUpdateMainDialog() {
    const tokens = canvas.tokens.controlled;
    if (!tokens.length) {
      if (window._tokenHPDialog) {
        window._tokenHPDialog.close({ force: true });
        window._tokenHPDialog = null;
      }
      destroyInventoryDialogs();
      return;
    }

    const html = `<div id="token-data-content">${buildTokenTable(tokens)}</div>`;

    if (!window._tokenHPDialog) {
      window._tokenHPDialog = new Dialog({
        title: "Selected Tokens — Stats",
        content: html,
        buttons: {
          close: {
            label: "Close",
            callback: () => {
              window._tokenHPDialog = null;
              destroyInventoryDialogs();
            }
          }
        },
        close: () => {
          window._tokenHPDialog = null;
          destroyInventoryDialogs();
        }
      }, {
        id: "token-hp-dialog",
        width: 500,
        resizable: true
      });

      await window._tokenHPDialog.render(true);
      attachInputListeners();
    } else {
      const container = window._tokenHPDialog.element.find("#token-data-content");
      if (container.length) {
        container.html(buildTokenTable(tokens));
        attachInputListeners();
      }
    }

    await showInventoryDialogs(tokens);
  }

  Hooks._tokenHPHook = Hooks.on("controlToken", () => {
    // Slight debounce to handle fast changes
    setTimeout(renderOrUpdateMainDialog, 50);
  });

  if (canvas.tokens.controlled.length > 0) {
    renderOrUpdateMainDialog();
  }
});*/
/*
Hooks.on("ready", function() {
  if (Hooks._tokenStatsHook) return;

  function buildStatsTable(tokens) {
    if (!tokens.length) return "<p>No tokens selected.</p>";

    let html = `<table style="width:100%; text-align:left; margin-bottom:1em;">
      <tr>
        <th>Name</th><th>HP</th><th>AC</th><th>Conditions</th>
      </tr>`;

    for (let token of tokens) {
      const actor = token.actor;
      const hp = actor?.system?.attributes?.hp;
      const ac = actor?.system?.attributes?.ac?.value ?? "?";
      const conditions = actor.effects.map(e => e.name).join(", ") || "None";
      const name = actor.name;
      const current = hp?.value ?? "?";
      const max = hp?.max ?? "?";

      html += `<tr>
        <td>${name}</td>
        <td>
          <input type="number" min="0" max="${max}" value="${current}" 
                 data-token-id="${token.id}" style="width:50px;" /> / ${max}
        </td>
        <td>${ac}</td>
        <td>${conditions}</td>
      </tr>`;
    }

    html += `</table>`;
    return html;
  }

  function buildInventorySection(tokens) {
    if (!tokens.length) return "";

    let html = `<div style="display: flex; gap: 1em;">`;

    for (let token of tokens) {
      const actor = token.actor;
     // const items = actor.items;
      const items = actor.items.filter(i =>
        ["weapon", "equipment", "consumable","tool","loot","container"].includes(i.type)
    );

      html += `<div style="flex: 1; min-width: 200px;">
        <h3 style="margin-top:0;">${actor.name}</h3>`;

      if (items.size === 0) {
        html += `<p>No inventory.</p>`;
      } else {
        html += `<table style="width:100%; text-align:left;">
          <tr><th>Name</th><th>Qty</th><th>Type</th></tr>`;

        for (let item of items) {
          html += `<tr>
            <td>${item.name}</td>
            <td>${item.system?.quantity ?? 1}</td>
            <td>${item.type}</td>
          </tr>`;
        }

        html += `</table>`;
      }

      html += `</div>`;
    }

    html += `</div>`;
    return html;
  }

  function attachInputListeners() {
    const el = window._tokenStatsDialog?.element;
    if (!el) return;

    el.find("input[type='number']").on("change", async function () {
      const tokenId = this.dataset.tokenId;
      const newValue = parseInt(this.value, 10);
      const token = canvas.tokens.get(tokenId);
      if (!token?.actor) return;
      await token.actor.update({ "system.attributes.hp.value": newValue });
    });
  }

  async function renderCombinedDialog() {
    const tokens = canvas.tokens.controlled;
    if (!tokens.length) {
      if (window._tokenStatsDialog) {
        window._tokenStatsDialog.close({ force: true });
        window._tokenStatsDialog = null;
      }
      return;
    }

    const statsHTML = buildStatsTable(tokens);
    const inventoryHTML = buildInventorySection(tokens);

    const fullHTML = `
      <div id="token-stats-combined">
        ${statsHTML}
        ${inventoryHTML}
      </div>
    `;

    if (!window._tokenStatsDialog) {
      window._tokenStatsDialog = new Dialog({
        title: "Selected Tokens — Stats & Inventory",
        content: fullHTML,
        buttons: {
          close: {
            label: "Close",
            callback: () => window._tokenStatsDialog = null
          }
        },
        close: () => window._tokenStatsDialog = null
      }, {
        id: "token-stats-dialog",
        width: "auto",
        resizable: true
      });

      await window._tokenStatsDialog.render(true);
      attachInputListeners();
    } else {
      const container = window._tokenStatsDialog.element.find("#token-stats-combined");
      if (container.length) {
        container.html(statsHTML + inventoryHTML);
        attachInputListeners();
      }
    }
  }

  // Hook selection changes
  Hooks._tokenStatsHook = Hooks.on("controlToken", () => {
    setTimeout(renderCombinedDialog, 50);
  });

  // Initial call if tokens are already selected
  if (canvas.tokens.controlled.length > 0) {
    renderCombinedDialog();
  }
});*/

Hooks.on("ready", function () {
  if (Hooks._tokenStatsHook) return;

  let inventoryDialog = null;

  function buildStatsTable(tokens) {
    if (!tokens.length) return "<p>No tokens selected.</p>";

    let html = `<table style="width:100%; text-align:left; margin-bottom:1em;">
      <tr>
        <th>Name</th><th>HP</th><th>AC</th><th>Conditions</th>
      </tr>`;

    for (let token of tokens) {
      const actor = token.actor;
      const hp = actor?.system?.attributes?.hp;
      const ac = actor?.system?.attributes?.ac?.value ?? "?";
      const conditions = actor.effects.map(e => e.name).join(", ") || "None";
      const name = actor.name;
      const current = hp?.value ?? "?";
      const max = hp?.max ?? "?";

      html += `<tr>
        <td>${name}</td>
        <td>
          <input type="number" min="0" max="${max}" value="${current}" 
                 data-token-id="${token.id}" style="width:50px;" /> / ${max}
        </td>
        <td>${ac}</td>
        <td>${conditions}</td>
      </tr>`;
    }

    html += `</table>`;
    return html;
  }
/*
  function buildInventoryGrid(tokens) {
    if (!tokens.length) return "<p>No tokens selected.</p>";

    let html = `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1em;">`;

    for (let token of tokens) {
      const actor = token.actor;
      const items = actor.items.filter(i =>
          ["weapon", "equipment", "consumable", "tool", "loot", "container"].includes(i.type)
      );

      html += `<div style="min-width: 200px;">
        <h3 style="margin-top:0;">${actor.name}</h3>`;

      if (items.size === 0) {
        html += `<p>No inventory.</p>`;
      } else {
        html += `<table style="width:100%; text-align:left;">
          <tr><th>Name</th><th>Qty</th><th>Type</th></tr>`;
        for (let item of items) {
          html += `<tr>
            <td>${item.name}</td>
            <td>${item.system?.quantity ?? 1}</td>
            <td>${item.type}</td>
          </tr>`;
        }
        html += `</table>`;
      }

      html += `</div>`;
    }

    html += `</div>`;
    return html;
  }
*/
  function buildInventoryGrid(tokens) {
    if (!tokens.length) return "<p>No tokens selected.</p>";

    let html = `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1em;">`;

    for (let token of tokens) {
      const actor = token.actor;
      const items = actor.items.filter(i =>
          ["weapon", "equipment", "consumable", "tool", "loot", "container"].includes(i.type)
      );

      html += `<div style="min-width: 200px;">
      <h3 style="margin-top:0;">${actor.name}</h3>`;

      if (items.size === 0) {
        html += `<p>No inventory.</p>`;
      } else {
        html += `
        <div style="max-height: 120px; overflow-y: auto; border: 1px solid #ccc; padding-right: 4px;">
          <table style="width:100%; text-align:left;">
            <tr><th>Name</th><th>Qty</th><th>Type</th></tr>`;

        for (let item of items) {
          html += `<tr>
          <td>${item.name}</td>
          <td>${item.system?.quantity ?? 1}</td>
          <td>${item.type}</td>
        </tr>`;
        }

        html += `</table></div>`;
      }

      html += `</div>`;
    }

    html += `</div>`;
    return html;
  }

  function attachInputListeners() {
    const el = window._tokenStatsDialog?.element;
    if (!el) return;

    el.find("input[type='number']").on("change", async function () {
      const tokenId = this.dataset.tokenId;
      const newValue = parseInt(this.value, 10);
      const token = canvas.tokens.get(tokenId);
      if (!token?.actor) return;
      await token.actor.update({ "system.attributes.hp.value": newValue });
    });
  }

  async function renderStatsDialog()
  {
    const tokens = canvas.tokens.controlled;
    if (!tokens.length)
    {
      if (window._tokenStatsDialog)
      {
        window._tokenStatsDialog.close({ force: true });
        window._tokenStatsDialog = null;
      }
      if (inventoryDialog)
      {
        inventoryDialog.close({ force: true });
        inventoryDialog = null;
      }
      return;
    }

    const statsHTML = buildStatsTable(tokens);

    /*const fullHTML = `
      <div id="token-stats-combined">
        ${statsHTML}
      </div>
    `;*/
   // const showInventory = window._showInventory ?? false;

    const fullHTML = `
        <div id="token-stats-combined">
            ${statsHTML}
            <div style="margin-top: 1em;">
                <label>
                    <input type="checkbox" id="toggle-inventory" ${window._showInventory ? "checked" : ""}>
                    Show InventoryFUCK
                </label>
            </div>
    </div>
    `;

    if (!window._tokenStatsDialog)
    {
      console.log("in if (!window._tokenStatsDialog)")
      window._tokenStatsDialog = new Dialog({
        title: "Selected Tokens — Stats",
        content: fullHTML,
        buttons: {
          close: {
            label: "Close",
            callback: () =>
            {
              window._tokenStatsDialog = null;
              if (inventoryDialog)
              {
                inventoryDialog.close({ force: true });
                inventoryDialog = null;
              }
            }
          }
        },
        close: () => {
          window._tokenStatsDialog = null;
          if (inventoryDialog)
          {
            inventoryDialog.close({ force: true });
            inventoryDialog = null;
          }
        }
      }, {
        id: "token-stats-dialog",
        width: 500,
        resizable: true
      });
      console.log("finsih making new diablog")

      await window._tokenStatsDialog.render(true);

      /*const checkbox = window._tokenStatsDialog.element.find("#toggle-inventory");
      checkbox.on("change", function () {
        window._showInventory = this.checked;
        if (this.checked) {
          renderInventoryDialog();
        } else {
          if (inventoryDialog) {
            inventoryDialog.close({ force: true });
            inventoryDialog = null;
          }
        }
      });*/
      Hooks.once("renderDialog", (app, html, data) => {
        if (app.id !== "token-stats-dialog") return;

        const checkbox = html.find("#toggle-inventory");
        checkbox.off("change").on("change", function () {
          window._showInventory = this.checked;
          if (this.checked) {
            renderInventoryDialog();
          } else {
            if (inventoryDialog) {
              inventoryDialog.close({ force: true });
              inventoryDialog = null;
            }
          }
        });
      });


      attachInputListeners();
    }
    else
    {
      const container = window._tokenStatsDialog.element.find("#token-stats-combined");
      if (container.length) {
        container.html(`
            ${statsHTML}
            <div style="margin-top: 1em;">
                <label>
                    <input type="checkbox" id="toggle-inventory" ${window._showInventory ? "checked" : ""}>
                    Show Inventory1
                </label>
            </div>
        `);

        const checkbox = window._tokenStatsDialog.element.find("#toggle-inventory");
        checkbox.on("change", function () {
          window._showInventory = this.checked;
          if (this.checked) {
            renderInventoryDialog();
          } else {
            if (inventoryDialog) {
              inventoryDialog.close({ force: true });
              inventoryDialog = null;
            }
          }
        });
        attachInputListeners();

      }
    }
  }

  async function renderInventoryDialog() {
    const tokens = canvas.tokens.controlled;
    console.log("Rendering inventory for tokens:", tokens.map(t => t.name));

    if (!tokens.length) {
      console.warn("No tokens selected, skipping inventory dialog.");
      return;
    }

    const inventoryHTML = buildInventoryGrid(tokens);

    // Delay to ensure stats dialog is rendered and positioned
    setTimeout(async () => {
      const statsDialog = window._tokenStatsDialog;
      const statsPos = statsDialog?.position;

      const top = statsPos ? statsPos.top + statsPos.height + 10 : 200;
      const left = statsPos ? statsPos.left : 100;

      if (!inventoryDialog) {
        console.log("Creating inventory dialog");
        inventoryDialog = new Dialog({
          title: "Selected Tokens — Inventory",
          content: `<div id="token-inventory-grid">${inventoryHTML}</div>`,
          buttons: {
            close: {
              label: "Close",
              callback: () => {
                inventoryDialog = null;
              }
            }
          },
          close: () => {
            inventoryDialog = null;
          }
        }, {
          id: "token-inventory-dialog",
          width: "auto",
          top,
          left,
          resizable: true
        });

        await inventoryDialog.render(true);
      } else {
        console.log("Updating existing inventory dialog");
        const container = inventoryDialog.element.find("#token-inventory-grid");
        if (container.length) {
          container.html(inventoryHTML);
        }
        inventoryDialog.setPosition({ top, left });
      }
    }, 50); // Give the DOM 50ms to stabilize
  }

  // Handle both dialogs
  /*async function updateDialogs() {
    await renderStatsDialog();
    await renderInventoryDialog();
  }*/

  async function updateDialogs() {
    await renderStatsDialog();
    if (window._showInventory) {
      await renderInventoryDialog();
    }
  }

  Hooks._tokenStatsHook = Hooks.on("controlToken", () => {
    setTimeout(updateDialogs, 50);
  });

  if (canvas.tokens.controlled.length > 0) {
    updateDialogs();
  }
});
