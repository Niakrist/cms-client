import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
// утилита Redux для привязки экшенов к dispatch
import { bindActionCreators } from '@reduxjs/toolkit'
// объект со всеми экшенами приложения
import { rootActions } from '@/store/root-actions'

export const useActions = () => {
  const dispatch = useDispatch()

  return useMemo(() => {
    return bindActionCreators(rootActions, dispatch)
  }, [dispatch])
}

// Без bindActionCreators
// dispatch(actions.addItem(product))

// С bindActionCreators автоматически диспатчится!
// boundActions.addItem(product)

// без useMemo ПЛОХО: создает новый объект при каждом рендере
// с useMemo ХОРОШО: сохраняет объект между рендерами
