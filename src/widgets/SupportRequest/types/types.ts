export enum SupportRequestField {
  Email = 'email',
  Details = 'details',
}

export type SupportRequestFormValues = {
  [SupportRequestField.Email]: string;
  [SupportRequestField.Details]: string;
};
