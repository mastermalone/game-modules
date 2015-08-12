(function () {
   define(function () {
       EventList = {
           debug: true,
           topics: {},//Place where all event listener topics will be stored
           subscribe: function (topic, listener) {
               //Create the topic if it has not yet been created
               if (!this.topics[topic]) {
                   this.topics[topic] = [];
               }
               
               //Add the listener by pushing it into the array that you just created above
               this.topics[topic].push(listener);
               if (this.debug) {
                   console.log('LISTENING FOR TOPIC', this.topics[topic]);  
               }
               
           },
           publish: function (topic, data) {
               //Do nothing if there are no topics or if the topics array is empty
               if (!this.topics[topic] || this.topics[topic].length < 1) {
                   return;
               }
               if (this.debug) {
                   console.log('PUBLISHING EVENT:', this.topics);  
               }          
               //Itterate through the list of topics in the topics object and fire off the functions that are assigned as the event handler.  
               //Pass the data to the callback functions as well
               this.topics[topic].forEach(function (listener) {
                   if (typeof listener === 'function') {
                       listener(data || {});
                   }
               }); 
           },
           remove: function (topic) {
               //Remove the event from the list
               delete this.topics[topic];
               if (this.debug) {
                   console.log('REMOVED THE EVENT.  Now the event is:', this.topics[topic]);  
               }
           }
       };
       
       return EventList;
   }); 
}());
