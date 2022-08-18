namespace modules {
    /**
     * Kitronik ACCESS:bit servo
     */
    //% fixedInstance whenUsed block="kitronik accessbit servo"
    export const kitronikAccessBitServo = new ServoClient("kitronik accessbit servo?dev=self")
}

namespace servers {
    function start() {
        jacdac.productIdentifier = 0x3ecd735e
        jacdac.deviceDescription = "Kitronik ACCESS:bit"
        jacdac.startSelfServers(() => {
            const servoPin = AnalogPin.P0
            pins.analogSetPitchPin(AnalogPin.P1);
            const servo = new jacdac.ServoServer(servoPin,
                {
                    statusCode: jacdac.SystemStatusCodes.Initializing
                })
            const servers = [
                servo
            ]
            control.runInParallel(() => {
                pins.servoWritePin(servoPin, 90);
                basic.pause(1000);
                pins.digitalWritePin(<number>servoPin, 0);
                // digital write 0 so the servo is not driven 
                // and does not interfere with the analog pitch pin
                servo.setStatusCode(jacdac.SystemStatusCodes.Ready)
            })
            return servers
        })
    }
    start()
}