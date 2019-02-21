/**
 * Kitronik Accessbit Package
 */
//% weight=100 color=#00A654 icon="\uf056" block="ACCESS:bit"
namespace Kitronik_ACCESSbit {

	/**
     * choice of barrier position
     */
    export enum BarrierPosition {
        //% block="Up"
        Up,
        //% block="Down"
        Down
    }

	/**
     * choice of buzzer tone length
     */
    export enum BuzzerLength {
        //% block="Short Beep"
        Short = 200,				//200 is in milliseconds
        //% block="Long Beep"
        Long = 800					//800 is in milliseconds
    }

	let initalised = false    		//a flag to allow us to initialise without explicitly calling the secret incantation
	
	/*
		This secret incantation sets up the 180 servos to be in the centre of travel.
		With the 180 servo set to 90, it allows the servo to move either direction
	*/
    function secretIncantation(): void {
        pins.servoWritePin(AnalogPin.P0, 90);
        basic.pause(1000);
        pins.digitalWritePin(DigitalPin.P0, 0);		//digital write 0 so the servo is not driven and does not interfere with the analog pitch pin
        pins.analogSetPitchPin(AnalogPin.P1);

        //set the initalised flag so we dont come in here again automatically
        initalised = true
    }

    /**
     * Select which barrier to move up or down
	 * @param position selected position of barrier to move to
     */
    //% blockId="kitronik_accessbit_barrier_control"
    //% block="Move barrier %BarrierPosition|"
    //% weight=100 blockGap=8
    export function barrierControl(position: BarrierPosition): void {
        if (initalised == false) {
            secretIncantation();
        }

        if (position == BarrierPosition.Up)
            pins.servoWritePin(AnalogPin.P0, 0);
        else if (position == BarrierPosition.Down)
            pins.servoWritePin(AnalogPin.P0, 90);

        basic.pause(1000);
        pins.digitalWritePin(DigitalPin.P0, 0);			//written to digital 0 so the servo does not get interfered from driving the buzzer
    }

    /**
     * Sound the buzzer a selected number of times for either long or short beeps
     * @param periodOfBuzzer selected time period of buzzer tone either short (200ms) or long (800ms)
	 * @param numberBeeps set the number of times the beeps occured eg: 1
     */
    //% blockId="kitronik_accessbit_buzzer_control" 
    //% block="Sound %BuzzerLength| %numberBeeps|times"
    //% numberBeeps.min=1 numberBeeps.max=10
    //% weight=90 blockGap=8
    export function buzzerControl(periodOfBuzzer: BuzzerLength, numberBeeps: number): void {
        if (initalised == false) {
            secretIncantation();
        }
        let loop = 1
        if (numberBeeps > 10)
            numberBeeps = 10

        for (loop = 1; loop <= numberBeeps; loop++) {
            pins.analogPitch(1025, periodOfBuzzer)
            basic.pause(periodOfBuzzer)
        }
    }
}