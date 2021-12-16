export type AlertType = 'success' | 'warning' | 'danger'

export interface IAlert {
  type: AlertType
  text: string
}
