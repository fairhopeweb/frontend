import "@material/mwc-button/mwc-button";
import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators";
import { fireEvent } from "../../../common/dom/fire_event";
import "../../../components/ha-card";
import { createCloseHeading } from "../../../components/ha-dialog";
import { haStyleDialog } from "../../../resources/styles";
import type { HomeAssistant } from "../../../types";
import "./integrations-startup-time";

@customElement("dialog-integration-startup")
class DialogIntegrationStartup extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _opened = false;

  public showDialog(): void {
    this._opened = true;
  }

  public closeDialog() {
    this._opened = false;
    fireEvent(this, "dialog-closed", { dialog: this.localName });
  }

  protected render(): TemplateResult {
    if (!this._opened) {
      return html``;
    }

    return html`
      <ha-dialog
        open
        @closed=${this.closeDialog}
        scrimClickAction
        escapeKeyAction
        .heading=${createCloseHeading(
          this.hass,
          this.hass.localize("ui.panel.config.repairs.integration_startup_time")
        )}
      >
        <integrations-startup-time
          .hass=${this.hass}
          narrow
        ></integrations-startup-time>
      </ha-dialog>
    `;
  }

  static styles: CSSResultGroup = haStyleDialog;
}

declare global {
  interface HTMLElementTagNameMap {
    "dialog-integration-startup": DialogIntegrationStartup;
  }
}
