export interface QueuedRequest {
  resolve: (token: string | null) => void;
  reject: (error: Error) => void;
}
