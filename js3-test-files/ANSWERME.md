1. In the project there was a house that did not have a lord. Which house was this? And what did you do to deal with this situation?
   A: House Stark of Winterfell
   to deal with it I added a condition that if the currentLord was an empty string, it would fetch an additional request to get the 1st swornMember and display that instead.

2. You could have used XMLHttpRequest, the library axios or the fetch API to get the data from the server. And you could have used callbacks, async/await and/or promises. What did you use and why?
   (_TIP: There is no right way, all have their advantages and disadvantages. Explain your decision making listing the advantages/disadvantages of each technology/approach_)

   A: I used async/await functions with fetch API (fetch()) because I believe the syntax is much more readable than callbacks. I prefer to do that rather than using axios because there isn't much difference in the syntax. I am more comfortable with awaiting for the data rather than chaining promises.

3. Let's say you were a huge fan of Object Oriented Programming and the api offered the option to get all the data you needed at once. What classes would you make and what functions would they have?
   (_TIP: You do not have to write out the implementation of the functions (but you can if it makes it easier to think it through)_)
   (_TIP: If you are unsure between two decisions, then write a comment with the alternative you considered but decided against with arguments. There is again no one correct answer here, but we want to see you think in an OOP way_)
   (_TIP: If you want the code highlighting, it is also fine to create a `.js` file and then write down here what file to look at_)

   A:
   class House {
   constructor (url){
   this.url = url;
   }
   get houseTitle(){
   fetch(this.url).then(res => res.json()).then(data => // append to dom)
   }

   get replacement(){
   // get data from houseName and Lord and fetch new API for swornMembers
   }
   }

   class Lord {
   constructor (currentLord){
   this.currentLord= function(){
   // get lord from House class - houseTitle() fetched API
   }
   }
   }
   class SwornMembers {
   constructor (swornMembers){
   this.swornMembers= function(){
   // make additional fetch API to get each house's swornMembers list accordingly from House class
   }
   }
   }

Example (taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

```
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  get area() {
    // get the area of the rectangle
  }

  calcArea() {
    // calculate the area of the rectangle
  }
}
```
