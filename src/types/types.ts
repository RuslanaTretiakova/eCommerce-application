import type { IJsonErrorResponse, IJsonSuccessResponse } from './interfaces';

export type InputType = 'text' | 'email' | 'password' | 'date' | 'select' | 'checkbox';

export type ButtonType = 'button' | 'submit';

export type NotificationType = 'success' | 'error' | 'info';

export type RegistrationErrorType = 'EMAIL_EXISTS' | 'VALIDATION_FAILED' | 'INTERNAL_ERROR';

export type JsonResponseBody = IJsonSuccessResponse | IJsonErrorResponse;
