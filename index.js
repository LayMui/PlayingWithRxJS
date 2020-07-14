

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


// Rx.Observable.fromEvent(button, 'click').subscribe(observer);
// Create Onservable from scratch
Rx.Observable.create(function(obs) {
  obs.next('A value');
  setTimeout(function() { 
    obs.complete(); 
   }, 2000);
  obs.next('A second value');
}).subscribe(observer);

// You need to unsubscribe to prevent memory leak
var subscription = Rx.Observable.create(function(obs) {
  button.onclick = function(event) {
    obs.next(event);
  }
}).subscribe(observer);

setTimeout(function() {
  subscription.unsubscribe(); 
  console.log('I have unsubscribed, no memory leak no worries...')
}, 5000);

// Operator
var observable = Rx.Observable.interval(1000);
var observer = { 
  next: function(value) {
    console.log(value);
  },
  complete: function() {
    console.log('Does it get completed?')
  }
  
};

observable.map(function(value) {
  return value * 2;
}).throttleTime(2000).
subscribe(observer);

// Subject ~EventEmitter
var subject = new Rx.Subject();
// Multiple subscriptions
// 3 subscriptions -> 3 output 'A new data'
subject.subscribe({
  next: function(value) {
    console.log(value);
  },
  error: function(error)
  { 
    console.log(error);
  },
  complete: function() {
    console.log('Subject Completed')
  }
})

subject.subscribe({
  next: function(value) {
    console.log(value);
  }
});

subject.subscribe({
  next: function(value) {
    console.log(value);
  }
});

// Work like Observable but I can decide
// when something happen
subject.next('A new data')