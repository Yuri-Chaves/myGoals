/* eslint-disable react-native/no-inline-styles */
import React, {
  RefObject,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { Keyboard } from 'react-native'

import { TGoalModel } from '@databases'
import BottomSheet from '@gorhom/bottom-sheet'

import { useAppTheme } from '@hooks'

import { Box } from '../Box/Box'

import { AddGoalForm } from './components/AddGoalForm'
import { AddTransactionForm } from './components/AddTransactionForm'
import { BottomSheetHeader } from './components/BottomSheetHeader'
import { EditGoalForm } from './components/EditGoalForm'
import { FormProvider } from './context/FormProvider'
import { FormType } from './FormTypes'

interface FormRefProps {
  expand: (type: FormType, goal?: TGoalModel) => void
  collapse: () => void
  close: () => void
  forceClose: () => void
}
export function GlobalForm() {
  const [formType, setFormType] = useState<FormType>()
  const [goal, setGoal] = useState<TGoalModel | undefined>(undefined)

  const formRef = useRef<FormRefProps>(null)
  const ref = useRef<BottomSheet>(null)
  useImperativeHandle(formRef, () => ({
    expand(type, _goal?: TGoalModel) {
      setFormType(type)
      if (_goal) {
        setGoal(_goal)
      } else if (type === 'goal') {
        setGoal(undefined)
      }
      console.log('Form/n', goal)
      ref.current?.expand()
    },
    collapse() {
      Keyboard.dismiss()
      ref.current?.collapse()
    },
    close() {
      Keyboard.dismiss()
      setFormType(undefined)
      setGoal(undefined)
      ref.current?.close()
    },
    forceClose() {
      Keyboard.dismiss()
      setFormType(undefined)
      setGoal(undefined)
      ref.current?.forceClose()
    },
  }))

  useLayoutEffect(() => {
    Form.setFormRef(formRef)
  }, [])

  const { colors, borderRadii } = useAppTheme()
  return (
    <FormProvider fnOnSuccess={() => formRef.current?.close()} goal={goal}>
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={[24, 305]}
        style={{
          elevation: 7,
        }}
        handleStyle={{
          backgroundColor: colors.grey2,
          borderWidth: 1,
          borderColor: colors.grey3,
          borderTopLeftRadius: borderRadii.br12,
          borderTopRightRadius: borderRadii.br12,
          borderBottomWidth: 0,
        }}
        handleIndicatorStyle={{ backgroundColor: colors.grey5, width: '35%' }}>
        <Box bg="grey2" flex={1} paddingTop="s2" paddingHorizontal="s32">
          <BottomSheetHeader
            formType={formType || 'goal'}
            onRequestClose={() => ref.current?.close()}
          />
          {goal && formType === 'goal' ? (
            <EditGoalForm />
          ) : formType === 'goal' ? (
            <AddGoalForm />
          ) : (
            <AddTransactionForm />
          )}
        </Box>
      </BottomSheet>
    </FormProvider>
  )
}

export class Form {
  static formRef: RefObject<FormRefProps>

  static setFormRef(ref: RefObject<FormRefProps>) {
    this.formRef = ref
  }

  static expand(type: FormType, goal?: TGoalModel) {
    this.formRef.current?.expand(type, goal)
  }
  static collapse() {
    this.formRef.current?.collapse()
  }
  static close() {
    this.formRef.current?.close()
  }
  static forceClose() {
    this.formRef.current?.forceClose()
  }
}
