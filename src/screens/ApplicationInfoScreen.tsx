import { Text, Input, Box, Pressable } from 'native-base'
import React, { useState, useEffect } from 'react'

export const ApplicationInfoScreen = (): JSX.Element => {
  const [taskName, setTaskName] = useState<string>('')
  const [startDate, setStartDate] = useState<Date>()
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    if (!startDate) return
    const interval = setInterval(() => setTimer(Date.now() - startDate.getTime()), 1000)

    return () => clearInterval(interval)
  }, [startDate])

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0')
  }

  function convertMsToTime(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000)
    let minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    seconds = seconds % 60
    minutes = minutes % 60

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
  }

  const renderTopBar = () => (
    <Box flexDirection="row" height={40}>
      <Input
        width="80%"
        borderWidth={1}
        borderColor="black"
        padding={5}
        height={40}
        onChangeText={setTaskName}
        placeholder="What are you doing?"
      />
      <Pressable
        onPress={() => {
          if (!startDate) {
            setStartDate(new Date())
          }
          if (startDate) setStartDate(undefined), setTimer(0)
        }}
        backgroundColor="green.500"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Text color="white">Start</Text>
      </Pressable>
    </Box>
  )
  return (
    <Box flex={1} backgroundColor="white" alignItems="center">
      {renderTopBar()}
      <Text>{taskName}</Text>
      {!!startDate && <Text>{convertMsToTime(timer)}</Text>}
    </Box>
  )
}
