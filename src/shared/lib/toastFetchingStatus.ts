import {
  type ToastOptions, toast,
  type ToastContentProps
} from 'react-toastify'

/**
 * Выводит всплывающие уведомления (toast) на основе статуса выполнения промиса.
 * Позволяет пользователю получать обратную связь о состоянии асинхронной операции, такой как запрос к API.
 *
 * @template T Тип данных, возвращаемый промисом.
 * @param {Promise<T>} promise Промис, статус которого необходимо отслеживать.
 * @param {{ error?: string | ((body: ToastContentProps<{ message: string }>) => string), pending?: string, success?: string }} messages Объект с сообщениями или функциями для отображения в зависимости от статуса промиса.
 * - `error` - Сообщение об ошибке или функция для его генерации. По умолчанию "Произошла ошибка!".
 * - `pending` - Сообщение о ожидании. По умолчанию "Загрузка...".
 * - `success` - Сообщение об успешном выполнении. По умолчанию "Успешно!".
 * @param {ToastOptions} [options] Дополнительные настройки для всплывающих уведомлений.
 */
export const toastFetchStatus = <T>(
  promise: Promise<T>,
  {
    error = 'Произошла ошибка!',
    pending = 'Загрузка...',
    success = 'Успешно!'
  }: { error?: string | ((body: ToastContentProps<{ message: string }>) => string), pending?: string, success?: string },
  options?: ToastOptions
): void => {
  void toast.promise(
    promise,
    {
      error: {
        render (body: ToastContentProps<{ message: string }>) {
          // Функция для кастомного отображения ошибки, если передана.
          // Возвращает сообщение об ошибке из данных, если оно доступно.
          return body.data?.message
        }
      },
      pending, // Сообщение о ожидании выполнения промиса.
      success // Сообщение об успешном выполнении промиса.
    },
    options // Передача пользовательских настроек для тостов.
  )
}
