type Predicate<T> = (value: T) => boolean;

export const predicatePipe =
  <T>(...predicates: ReadonlyArray<Predicate<T>>) =>
  (value: T): boolean =>
    predicates.every((predicate) => predicate(value));
