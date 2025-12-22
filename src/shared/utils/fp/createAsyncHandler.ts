import axios from "axios";

type AsyncOp<T extends unknown[], R> = (...args: T) => Promise<R>;

interface AsyncHandlers {
  onStart: () => void;
  onSuccess: () => void;
  onError: (error: string) => void;
  onFinally?: () => void;
}

export const createAsyncHandler = (handlers: AsyncHandlers) => {
  return <T extends unknown[], R>(
    operation: AsyncOp<T, R>,
    errorMessage: string
  ) => {
    return async (...args: T): Promise<R> => {
      handlers.onStart();
      try {
        const result = await operation(...args);
        handlers.onSuccess();
        return result;
      } catch (error) {
        if (axios.isCancel(error)) {
          throw error;
        }
        handlers.onError(errorMessage);
        throw error;
      } finally {
        handlers.onFinally?.();
      }
    };
  };
};
