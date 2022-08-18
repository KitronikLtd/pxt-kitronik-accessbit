let a = 90
forever(() => {
    modules.kitronikAccessBitServo.setAngle(a + 90)
    console.logValue("angle", a + 90)
    a = -a
    pause(2000)
})