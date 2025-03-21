import { OperationResult } from './Common';

export interface ApiToken {
  secret: string;
  expiration: string;
}

export interface CreateApiTokenResponse {
  operationResult: OperationResult;
  token: ApiToken;
}

export interface DeleteApiTokenResponse {
  operationResult: OperationResult;
}

export interface GetApiTokenResponse {
  operationResult: OperationResult;
  token: ApiToken;
}
