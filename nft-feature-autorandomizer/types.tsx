export type NullaryVoidFunction = () => void

export interface StepProps {
  incrementFunc: NullaryVoidFunction,
  decrementFunc?: NullaryVoidFunction
}
