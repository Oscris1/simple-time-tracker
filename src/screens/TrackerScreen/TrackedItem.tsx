import { Box, Pressable, Text } from 'native-base'
import React, { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { Icon } from '~components'
import { RootState, useAppDispatch } from '~store'
import { Task, continueTask } from '~store/tasksSlice'
import { convertMsToTime } from '~utils'

const TrackedItem = ({ id, name, counterTime }: Task): JSX.Element => {
  const dispatch = useAppDispatch()
  const currentTask = useSelector((state: RootState) => state.tasks.currentTask)

  const handleContinueTask = useCallback(() => {
    dispatch(continueTask({ id }))
  }, [dispatch, id])

  return (
    <Box width="100%" justifyContent="center" alignItems="center">
      <Pressable
        width="90%"
        bg="primary.50"
        p={6}
        my={5}
        key={id}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Text>{name}</Text>
        <Box flexDir="row" alignItems="center">
          <Text>
            {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
            {convertMsToTime(counterTime.reduce((acc, curr) => acc + curr.stop! - curr.start, 0))}
          </Text>
          <Pressable disabled={!!currentTask} onPress={handleContinueTask}>
            <Icon size={32} color={currentTask ? 'gray.400' : 'black'} name="play-fill" />
          </Pressable>
        </Box>
      </Pressable>
    </Box>
  )
}

export default memo(TrackedItem)
