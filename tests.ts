//Button A pressed activates the left barrier to down position and sounds 2 short beeps
input.onButtonPressed(Button.A, function () {
    Kitronik_ACCESSbit.barrierControl(Kitronik_ACCESSbit.BarrierSelection.Left, Kitronik_ACCESSbit.BarrierPosition.Down)
    Kitronik_ACCESSbit.buzzerControl(Kitronik_ACCESSbit.BuzzerLength.Short, 2)
})

//Button B pressed activates the left barrier to up position and sounds 1 long beeps
input.onButtonPressed(Button.B, function () {
    Kitronik_ACCESSbit.barrierControl(Kitronik_ACCESSbit.BarrierSelection.Left, Kitronik_ACCESSbit.BarrierPosition.Up)
    Kitronik_ACCESSbit.buzzerControl(Kitronik_ACCESSbit.BuzzerLength.Long, 1)
})