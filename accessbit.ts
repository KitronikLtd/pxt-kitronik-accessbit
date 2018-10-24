/**
 * Kitronik Accessbit Package
 */
//% weight=100 color=#00A654 icon="\uf057" block="ACCESS:bit"
namespace Kitronik_ACCESSbit {

	let initalised = false    		//a flag to allow us to initialise without explicitly calling the secret incantation
	
    /**
     * choise of which barrier to control
     */
    export enum BarrierSelection {
        //% block="Left"
        Left = 0,
        //% block="Right"
        Right = 1,
		//% block="Both"
		Both = 2
    }

	/**
     * choise of barrier position
     */
    export enum BarrierPosition {
        //% block="Up"
        Up,
        //% block="Down"
        Down
    }
	
	/**
     * choise of buzzer length
     */
    export enum BuzzerLength {
        //% block="Short Beep"
        Short = 200,
        //% block="Long Beep"
        Long = 800
    }
	
	/*
		This secret incantation sets up the 180 servos to be in the centre of travel.
		With the 180 servo set to 90, it allows the servo to both either direction if its set to left or right barrier
	*/
    function secretIncantation(): void {
		pins.servoWritePin(AnalogPin.P0, 90);
		pins.servoWritePin(AnalogPin.P2, 90);
		basic.pause(1000);
		pins.digitalWritePin(DigitalPin.P0,0);
		pins.digitalWritePin(DigitalPin.P2,0);
		pins.analogSetPitchPin(AnalogPin.P1);
		
        //set the initalised flag so we dont come in here again automatically
        initalised = true
    }
	
    /**
     * Select which barrier to move up or down
	 * @param barrier @param position
     */
    //% blockId="kitronik_accessbit_barrier_control"
    //% block="Move %BarrierSelection| barrier %BarrierPosition|"
    //% weight=100 blockGap=8
    export function barrierControl(barrier: BarrierSelection, position: BarrierPosition): void {
		if (initalised == false){
			secretIncantation();
		}
		
		if (barrier == BarrierSelection.Left)
		{
			if (position == BarrierPosition.Up)
				pins.servoWritePin(AnalogPin.P0, 90);
			else if (position == BarrierPosition.Down)	
				pins.servoWritePin(AnalogPin.P0, 170);
			
			basic.pause(1000);
			pins.digitalWritePin(DigitalPin.P0,0);
		}
		else if (barrier == BarrierSelection.Right)
		{
			if (position == BarrierPosition.Up)
				pins.servoWritePin(AnalogPin.P2, 90);
			else if (position == BarrierPosition.Down)	
				pins.servoWritePin(AnalogPin.P2, 10);
			
			basic.pause(1000);
			pins.digitalWritePin(DigitalPin.P2,0);
		}
		else if (barrier == BarrierSelection.Both)
		{
			if (position == BarrierPosition.Up)
			{
				pins.servoWritePin(AnalogPin.P0, 90);
				pins.servoWritePin(AnalogPin.P2, 90);
			}
			else if (position == BarrierPosition.Down)
			{				
				pins.servoWritePin(AnalogPin.P0, 170);
				pins.servoWritePin(AnalogPin.P2, 10);
			}
			
			basic.pause(1000);
			pins.digitalWritePin(DigitalPin.P0,0);
			pins.digitalWritePin(DigitalPin.P2,0);
		}
    }

    /**
     * Turn the Lamp on or off
     * @param periodOfBuzzer
     */
    //% blockId="kitronik_accessbit_buzzer_control" 
    //% block="Sound %BuzzerLength| %numberBeeps| times"
	//% numberBeeps.min=1 numberBeeps.max=10
    //% weight=90 blockGap=8
    export function buzzerControl(periodOfBuzzer: BuzzerLength, numberBeeps: number): void {
        if (initalised == false){
			secretIncantation();
		}
		let loop = 1
		if (numberBeeps > 10)
			numberBeeps = 10
		
		for (loop=1; loop<=numberBeeps; loop++)
		{
			pins.analogPitch(1025, periodOfBuzzer)
			basic.pause(periodOfBuzzer)
		}
    }
}