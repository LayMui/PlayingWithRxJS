

var button = document.querySelector('button');
// button.addEventListener('click', (event) => { 
//   console.log(event);
// });



var observer = {
  next: function(value) {
    console.log(value);
  },
  error: function(error) {
    console.log(error);
  },
  complete: function() {
    console.log('Completed');
  }
}


Rx.Observable.fromEvent(button, 'click').subscribe(observer);