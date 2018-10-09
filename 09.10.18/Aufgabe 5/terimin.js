    var context = new AudioContext();
        oscillator = null
        mousedown = false
        gainNode = context.createGain();

    document.body.addEventListener('mousemove', function(e){
         console.log(e.clientX);
         console.log(e.clientY);
      
        console.log(window.innerWidth);
        console.log(window.innerHeight);

        if (mousedown){
            calculateFreqAndGain(e);
        }
        });

    document.body.addEventListener('mousedown', function(e){
        mousedown = true;
        oscillator = context.createOscillator();
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        calculateFreqAndGain(e);
        oscillator.start(context.currentTime);
    });

    document.body.addEventListener('mouseup', function(e){
        mousedown = false;
        if(oscillator) {
            oscillator.stop(context.currentTime + 1);
            oscillator.disconnect();
        }
        
    });

    function calculateFreqAndGain(e) {
        var maxFreq = 2000;
            minFreq = 20;
            maxGain = 1;
            minGain = 0;
        oscillator.frequency.value = (((e.clientX / window.innerWidth) * maxFreq) + minFreq);
        gainNode.gain.value = (((e.clientY / window.innerHeight) * maxGain) + minGain);


        gainNode.gain.setTargetAtTime(((e.clientY / window.innerHeight) * maxGain) + minGain), context.currentTime, 0.01);
        oscillator.frequency.setTargetAtTime((((e.clientX / window.innerWidth) * maxFreq) + minFreq), context.currentTime, 0.01);
    }




    