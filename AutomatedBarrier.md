### @activities true
### @explicitHints true

# ACCESS:bit Traffic Light Sequence

## Introduction
### Introduction @unplugged
Learn how to use the Kitronik ACCESS:bit and code the barrier to operate with a sensor and timing on a BBC micro:bit. 

![Accessbit image](https://KitronikLtd.github.io/pxt-kitronik-accessbit/assets/accessbit-angle.png)

## Assembly
### Step 1 @unplugged
If not already done, attach the BBC micro:bit onto ACCESS:bit.  Click [Here](https://resources.kitronik.co.uk/pdf/5646-access-bit-microbit-pedestrian-crossing-datsheet.pdf) is a link to the datasheet to guide you. 


### Step 2
To make sure the ACCESS:bit and BBC micro:bit are working.  The first part of code creating will turn all the lights on and off on buttons presses.  Add ``||input:onButtonA||`` and a Add ``||input:onButtonB||``

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
	
})

input.onButtonPressed(Button.B, function () {
	
})
```

### Step 3
From the ACCESS:bit blocks, add into the ``||input:onButtonA||`` bracket a ``||Kitronik_ACCESSbit.move barrier||`` block and set it to "on". Add into the ``||input:onButtonB||`` bracket a ``||Kitronik_ACCESSbit.move barrier||`` block and set it to "off".
#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    Kitronik_ACCESSbit.barrierControl(Kitronik_ACCESSbit.BarrierPosition.Up)
})
input.onButtonPressed(Button.B, function () {
    Kitronik_ACCESSbit.barrierControl(Kitronik_ACCESSbit.BarrierPosition.Down)
})
```

### Step 4
Connect your BBC micro:bit and click ``|Download|``.  Once programmed, power the BBC micro:bit and press button A and B to see if the lights turn on and off.


### Barrier is working @unplugged
Our barrier is assembly and working. Great! Lets start the next step to coding the light to respond to light levels using the sensors on the BBC micro:bit.
The BBC micro:bit uses the LED's on its display to detect changes in light level. The LED's will make a change in voltage which the BBC micro:bit can read using an Analogue to Digital Converter (ADC)
The ADC converts analogue voltages to numbers. This number can range from 0 (when dark) to 255 (when light).


### Step 5
To continously read the light level, our code will be using the ``||basic:forever||`` bracket.  The previously used code in the ``||input:onButtonA||`` and ``||input:onButtonB||`` can be removed.
#### ~ tutorialhint
```blocks
basic.forever(function () {

})
```

### Step 6
Insert an ``||logic:if||`` into the ``||basic:forever||`` bracket.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (true) {
    	
    } 
})
```

### Step 7
Withing the if statement brackets we want to the light to raise the barrier. Insert a ``||Kitronik_ACCESSbit.move barrier||`` iand select "up".
#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (true) {
    	Kitronik_ACCESSbit.barrierControl(Kitronik_ACCESSbit.BarrierPosition.Up)
    }
})
```

### Step 8
Most barriers once active, have a time period before lowering the barrier.  We can simulate this with adding a ``||basic.pause||`` and ``||Kitronik_ACCESSbit.move barrier||``.  
Set the pause block to any time length, in our example we will use 2 seconds (2000 milliseconds).  The second ``||Kitronik_ACCESSbit.move barrier||`` is set to the "down" selection. 
#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (true) {
    	Kitronik_ACCESSbit.barrierControl(Kitronik_ACCESSbit.BarrierPosition.Up)
        basic.pause(2000)
        Kitronik_ACCESSbit.barrierControl(Kitronik_ACCESSbit.BarrierPosition.Down)
    }
})
```

### Step 9
Now we need to make the condition statement for our if statement.  This will need a compare block, insert the ``||logic:less than||`` into the ``||logic:if||`` block
#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (0 < 0) {
        Kitronik_ACCESSbit.barrierControl(Kitronik_ACCESSbit.BarrierPosition.Up)
        basic.pause(2000)
        Kitronik_ACCESSbit.barrierControl(Kitronik_ACCESSbit.BarrierPosition.Down)
    }
})
```

### Step 9
Next will need to read the light level and compare it to a set level. Place in the first half of the if condition ``||input.light level||``.  
This read light level block will take an ADC reading and give us a number between 0 and 255.  To begin with we will set our compare value to half of this range at 128. This value may need to be changed depending on the light levels in the room you are in.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (input.lightLevel() < 128) {
        Kitronik_ACCESSbit.barrierControl(Kitronik_ACCESSbit.BarrierPosition.Up)
        basic.pause(2000)
        Kitronik_ACCESSbit.barrierControl(Kitronik_ACCESSbit.BarrierPosition.Down)
    }
})
```

### Step 10
Connect your BBC micro:bit and click ``|Download|`` and try out the code.  Once programmed cover the BBC micro:bit with your hand and see if the ACCESS:bit moves the barrier only when your hand activates it.

### Step 11
If you found the ACCESS:bit activated itself, the number 128 needs to be lowered, try half the amount 64.  If the ACCESS:bit did not activate, try raising the number to 192.  In this example we will lower the number
#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (input.lightLevel() < 64) {
        Kitronik_ACCESSbit.barrierControl(Kitronik_ACCESSbit.BarrierPosition.Up)
        basic.pause(2000)
        Kitronik_ACCESSbit.barrierControl(Kitronik_ACCESSbit.BarrierPosition.Down)
    }
})
```

### Step 12
``|Download|`` and try out the code.  Repeat these two steps till you are happy the barrier activates only when the screen is covered.

### ACCESS:bit Tutorial Complete @unplugged
We have completed the basic operating of the ACCESS:bit and the barrier.   We have completed the tutorial.  If you wish to know more on the Kitronik ACCESS:bit visit
http://www.kitronik.co.uk/5646