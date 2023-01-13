import { Text, Input, Box, Pressable, FlatList, useToast } from 'native-base'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import 'react-native-get-random-values'

import TrackedItem from './TrackedItem'

import { RootState, useAppDispatch } from '~store'
import { addTask, stopTask, Task } from '~store/tasksSlice'
import { convertMsToTime } from '~utils'

export const TrackerScreen = (): JSX.Element => {
  const { currentTask, tasksList } = useSelector((state: RootState) => state.tasks)

  const [taskName, setTaskName] = useState<string>('')
  const [timer, setTimer] = useState<number>()
  const dispatch = useAppDispatch()
  const toast = useToast()

  const calcPrevTime = useMemo(() => {
    if (!currentTask) return 0
    return currentTask.counterTime.reduce(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (acc, curr) => (curr.stop ? acc + curr.stop! - curr.start : acc),
      0
    )
  }, [currentTask])

  const handleSetTimer = useCallback(() => {
    if (!currentTask) return
    setTimer(
      Date.now() + calcPrevTime - currentTask.counterTime[currentTask.counterTime.length - 1].start
    )
  }, [calcPrevTime, currentTask])

  useEffect(() => {
    handleSetTimer()
    const interval = setInterval(() => handleSetTimer(), 1000)

    return () => clearInterval(interval)
  }, [calcPrevTime, currentTask, handleSetTimer])

  const handleStart = useCallback(() => {
    if (!currentTask && !taskName) {
      toast.show({
        render: () => {
          return (
            <Box bg="error.400" p="5" py="1" rounded="md" mb={5}>
              <Text fontSize={20}>Please enter the name</Text>
            </Box>
          )
        },
      })
      return
    }
    if (!currentTask) {
      dispatch(
        addTask({
          name: taskName,
        })
      )
    }
    if (currentTask) {
      setTimer(0)
      dispatch(stopTask())
      setTaskName('')
    }
  }, [currentTask, dispatch, taskName, toast])

  const renderTopBar = useMemo(
    () => (
      <Box
        flexDirection="row"
        height="10%"
        bg="black"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        {!currentTask && (
          <Box width="80%" justifyContent="center" alignItems="center">
            <Input
              value={taskName}
              width="90%"
              borderWidth={1}
              borderColor="black"
              padding={5}
              onChangeText={setTaskName}
              placeholder="What are you doing?"
              backgroundColor="white"
            />
          </Box>
        )}
        {!!currentTask && (
          <Box width="80%" justifyContent="space-around" alignItems="center" flexDirection="row">
            <Text color="white">{currentTask?.name}</Text>
            <Box width="50%">
              <Text color="white" fontSize={24}>
                {!!timer && convertMsToTime(timer)}
              </Text>
            </Box>
          </Box>
        )}
        <Pressable
          onPress={handleStart}
          backgroundColor={currentTask ? 'red.500' : 'green.500'}
          height="80%"
          justifyContent="center"
          alignItems="center"
          width="20%"
        >
          <Text color="white">{currentTask ? 'Stop' : 'Start'}</Text>
        </Pressable>
      </Box>
    ),
    [currentTask, handleStart, taskName, timer]
  )

  const renderItem = useMemo(
    () =>
      ({ item: { counterTime, creationTime, id, name } }: { item: Task }) =>
        <TrackedItem counterTime={counterTime} creationTime={creationTime} id={id} name={name} />,
    []
  )

  const renderTrackerList = useMemo(
    () => <FlatList width="100%" data={tasksList} renderItem={renderItem} />,
    [renderItem, tasksList]
  )

  return (
    <Box flex={1} backgroundColor="white" alignItems="center">
      {renderTopBar}
      {renderTrackerList}
    </Box>
  )
}
