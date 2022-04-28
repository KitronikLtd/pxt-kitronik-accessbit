let a = 90
forever(() => {
    modules.servo1.setEnabled(true)
    modules.servo1.setAngle(a + 90)
    console.logValue("angle", a + 90)
    a = -a
    pause(2000)
})