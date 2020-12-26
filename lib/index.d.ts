declare module "nerder-index" {
  export interface Report {
    nerderIndex: number;
    parameterCount: number;
    complexity: number;
    operatorIndex: number;
  }

  export function get(fn: string): number;
  export function analyse(fn: string): Report;
}
