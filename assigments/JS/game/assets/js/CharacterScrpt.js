$(document).keydown(function (event){
    if (event.key == 'd'|| event.key == 'D' || event.key == 'ArrowRight'){
        console.log(event.key)
        $('#CHARACTER').animate([
            {
                transform: 'height : 100px',
                transform: 'width : 100px'
            }

        ],{
            duration : 100,
            iterations: Infinity
        });
    }
})