"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault(); // to prevent the page to jump to the top because of href="#" in html code!
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// for (let i = 0; i < btnsOpenModal.length; i++) // using forEach to get ride of this old school method!
// NOTE: btnsOpenModal is a NodeList, because is the output of querySelectorAll(). A Node List is not an array(is an array-like structure) and doesn't support most of the methods which has an array, but it supports forEach method!

// WE HAVE TWO BUTTONS TO OPEN AN ACCOUNT, ONE IS ON THE TOP AND ANOTHER ONE AT THE BOTTOM OF THE PAGE! THAT'S WHY NEED A FOREACH TO LOOP OVER BOTH OF THEM(NODE LIST) AND ALWAYS IS READY: WHEN SOMEBODY CLICK ON ONE OF THESE BUTTONS, ADDEVENTLISTENER WILL RUN OPENMODAL FUNCTION AS CALLBACK FUNCTION AND WE WILL SEE THE OPEN ACCOUNT FORM APPEARING ON THE PAGE!
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
// btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

console.log("---------------------Completing the BANKIST Project-------------");

// Button Scrolling:
// adding addEventListener
btnScrollTo.addEventListener("click", (e) => {
  // section1.setAttribute("href", "section--1");

  // Firts of all, we have to get the coordinates of the section1, where we want to go:
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // OR if we want to know about the coordinates of the 'learn more' button, where we click from:
  console.log(e.target.getBoundingClientRect());

  console.log(`Current scroll (X/Y)`, window.pageXOffset, window.pageYOffset); // Current scroll (X/Y) 8.800000190734863 0

  console.log(
    `height/width viewport`,
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  ); // height/width viewport 678 721

  // AND NOW THE QUESTION: WHERE WE WANT TO SCROLL: WE HAVE TO GIVE THESE COORDINATIONS TO THE FOLLOWING METHOD IN window OBJECT:
  // NOTE: we choose only left and top => we want to have only movements in vertical position => top and we don't want to have movement in horizontal position!

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset, // we have to add these two offsets, otherwise, it works relative to the viepwort height and width but we need relative to the coordinations of the page!
  //   s1coords.top + window.pageYOffset // It means curren position + current scroll
  // ); // NOW, IT WORKS WELL!

  // Even much better and smooth creating an object + behaviour:
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,

  //   behavior: "smooth",
  // });

  // BUT THERE IS STILL A MODERN WAY TO DO THAT => WITHOUT ALL ABOVE THE WIERD POSITIONS AND CALCULATIONS: => we give the destination address(section1) and the object with one property!
  section1?.scrollIntoView({ behavior: "smooth" }); // AND IT WORKS WELL JUST THE SAME
});

//////////////////////////////////////////////////
// Page Navigation:

// First of all, Implementing the page Navigation WITHOUT using the Event Delegation:

// 1. GETTING THE ALL THREE LINKS => using querySelectorAll gives us a nodeList and with help of Foreach we can attach the addevenetlistener to each of them:
// NOTE: All the thrre links on the TOP of the page ahve the same class: .nav__link
console.log("---Implementing the page Navigation WITHOUT Event Delegation---");

document.querySelectorAll(".nav__link").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault(); // to prevent from jumping to the sections!

    // WE HAVE TO GET THE href FOR EVERY LINK AND SEND IT TO THE SECTION AS ID. WHEN EVERY SECTION SEES ITS OWN ID AFTER CLICKING ON THE RESPECTED LINK => IT WILL MOVES SMOOTHLY TO THAT SECTION:
    const id = e.target.getAttribute("href"); // e.target is a replacement of this keyword in an arrow function!
    console.log(id); // #section--1, #section--2, #section--3

    // section1.scrollIntoView({ behavior: "smooth" });

    // For example: when i click on the Features link, the id would be #section--1 and the output from document.querySelector(id) would be section--1 which is the id of section 1, therefore it will move smoothly to the section 1!
    // For other ids and links, the process would be the same!
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  });
});

console.log("-----Implementing the page Navigation WITH Event Delegation-----");

// NOTE: But the better Solution is to use Evenet Delegation => Events bubble up => we put the eventListener on a common parent of all the elements that we are interested in!
// In our example, common parent is the container around all the links => class="nav__links"

// WE NEED TWO STEPS IN EVENT DELEGATION:
// 1. We add the eventListener to a common parent element of all elements that wre are interested in => here is class="nav__links"
// 2. Determine what element originated the event:

document.querySelector(".nav__links").addEventListener("click", (e) => {
  e.preventDefault(); // we need always this, whatever we click. It prevents from jumping!
  // where the event actually happened which is stored in e.target:
  console.log(e.target); // when i click on the Features, the evenet occures from there:
  // <a class="nav__link" href="#section--1">Features</a>

  // and when i click in the middle, i get <ul class="nav__links"> </ul> => click happend on the entire elemnet and not on one of the links!

  // <ul class="nav__links"> </ul> is irrevalent for us and this is relevant for us: <a class="nav__link" href="#section--1">Features</a>

  // We need now a matching strategy => we choose only the classes contains "nav__link"
  if (e.target.classList.contains("nav__link")) {
    console.log("LINk"); // => we see only 'LINK' word when i click on the three links on top of the page => Features, Operations, Testimonials

    // and now, we use the same code as we already used above:
    const id = e.target.getAttribute("href");
    console.log(id); // #section--1, #section--2, #section--3
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }
});

console.log("-----------------Building a Tabbed Component-------------------");

// tabs is a nodeList, therefore we can use a forEach for that!
// USING FOREACH is not a good idea, because when we have 200 buttons, we will have 200 copy of the callback function in the memory and it will slow down the page!

// tabs.forEach((t) => t.addEventListener("click", () => console.log("TAB")));

// THE BEST SOLTION IS TO USE THE EVENT DELEGATION:
// We need to attach the eventhandler on the common parent element of all the elements that we are interested in and IN OUR CASE, IT IS: tabContainer!

tabContainer.addEventListener("click", (e) => {
  // We need now a matching strategy =>
  const clicked = e.target;
  console.log(clicked); // <button class="btn operations__tab operations__tab--1 operations__tab--active" data-tab="1"> <span>01</span>Instant Transfers </button>

  // THERE ARE TWO PROBLEM HERE:
  // 1. when i click on the number which are on the buttons => it gives me the number inside the span
  // 2. when i click on the button itself => it gives me the button html info

  // What I need here is button html info and not a number inside the span when i even click only on the number located on the button! IN THIS CASE I HAVE TO DO THE DOM TRAVERSY AND GET THE PARENT ELEMNET WHEN I CLICK ON THE NUMBER 01 or 02 or 03, BECAUSE THE BUTTON IS THE PARENT ELEMNET OF THE SAPN!
  const clicked2 = e.target.parentElement;
  console.log(clicked2); // BUT WE HAVE STILL A PROBLEM: WE GET THE BUTTON INFO WHEN I CLICK ON THE SPAN BUT I GET THE PARENT INFO OF BUTTON WHEN I CLICK ON THE BUTTON ITSELF AND THAT WE DON'T WANT!

  // QUESTION: HOW CAN I GET THE BUTTON INFO WHEN I CLICK ON THE BUTTON ITSELF AND NOT THE INFO OF PARENT OF THE BUTTON:
  // Answer: We use the closest method(going upwards to the parent!): which gives us the closest parent element which would be for the button => button itself and for the span would be the button as the closest parent element!

  // SO, HERE INSTEAD OF SELECTING ALWAYS ABOUT THE parentElement LIKE WHAT WE HAVE ABOVE, WE USE CLOSEST TO SEARCH FOR THE CLOSEST OPERATION TAB:
  const clicked3 = e.target.closest(".operations__tab");
  console.log(clicked3);
  // AND NOW, WHEN WE CLICK THE BUTTON ITSELF, WE GET THE BUTTON because it finds the closest parent with this class name => operations__tab which is button itself! AND WHEN WE CLICK THE NUMBER, WE GET THE BUTTON AGAIN, because it finds the closest parent with this class name => operations__tab which is button itself!

  // Guard clause
  if (!clicked3) return; // when we click between these three buttons, we get null because we don't have the closest parent element. To avoid that, when clicked3 is null which is a falsy value and !falsy is truthy => if(truthy) will be executed and returns and will not go to the next line of the program!

  // When clicked3 is not null and has value and !Truthy would be falsy and if will not be executed and will not return and will continue with the remaining of the code!

  // To remove the active tab => it comes down and don't stay above anymore. Because tabs is a nodeList, we use the foreach to clear the active state from all the tabs => reset all the tabs to the initial state!
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  // IT MEANS FIRST CLEAR THE ACTIVE CLASS FROM ALL OF THEM AND THEN ADD THIS CLASS TO ONE OF THEM!

  clicked3.classList.add("operations__tab--active"); // and now, when we click on other two tab, they will move a little bit to the top and it shows us this button has been selected!

  if (e.target.classList.contains("operations__tab")) {
    // console.log("Tabs"); // => we see only 'LINK' word when i click on the three links on top of the page => Features, Operations, Testimonials
    // // and now, we use the same code as we already used above:
    // const id = e.target.getAttribute("href");
    // console.log(id); // #section--1, #section--2, #section--3
    // document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }

  // When we don't remove the active content, with every time clicking on the tab, it will be listed one after each other in a list but we don't want that. we want to display only one text (one content there!).

  // SOLUTION: FIRST WE CLEAR THE ACTIVE CLASS FROM ALL THE THEM AND THEN ADD THIS CLASS TO ONE OF THEM! IN THIS CASE, WE SEE ONLY THE ACTIVE CONTENT ON THE PAGE AND NOT ALL THE CONTENT AS A LIST!
  tabsContent.forEach((tc) =>
    tc.classList.remove("operations__content--active")
  );

  // ACTIVATE THE CONTENT AREA:
  console.log(clicked3.dataset.tab); // 1 or 2 or 3
  document
    .querySelector(`.operations__content--${clicked3.dataset.tab}`)
    .classList.add("operations__content--active");
  // clicked3.dataset.tab is a number => data-tab="1" or "2" or "3"
  // It muss start with data and followed with other things -- when we want to get the value from this data, we use dataset. ...
});

console.log("-----------------Passing Arguments to Event Handlers-----------");

// REFACTORING: we have some repetitve code below and we have to refactor them => Refactoring means that, we put the repetitive parts inside a new function and send the needed arguments to that!

// const handleHover = (e, opacity) => {
// USING THE bind() METHOD, we don't need the opacity anymore because the this keyword works well here and carries the opacity value which was already given as argument value to the bind() method!

// I HAVE TO CHNAGE THE handleHover FUNCTION FROM AN ARROW FUNCTION TO A REGULAR FUNCTION, OTHERWISE, this KEYWORD WILL NOT WORK!
const handleHover = function (e) {
  // console.log(this);
  // 3. and now, we have to match the element that we are looking for: THE ELEMENT WITH nav__link CLASS ON IT!
  // NOTE: we don't need the closest method here and contains method here is enough, because there is no other child here like the button before that we had button plus a number in a span as the second child and we should use closest there to find a parentelemnet for both of them!
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    console.log(link); // <a class="nav__link" href="#section--1">Features</a>

    // 4. To select all other links: all other sieblings: TO DO THAT, WE GO TO THE PARENT AND FROM THERE WE SELECT ALL THE CHILDREN:
    // nav__link class has other parents too like nav__item and nav__links and nav is not the closest parent for that in compare to these two classes! but there is no problem when we choose a higher up parent! and now from there we can search for nav__link again!
    // WE get the sieblings which are other links in addition to the initial link!
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");

    // 5. and Now, select the logo: we can find it manually with its class name, but using closest is much more robuster => we move up to the closest parent('.nav') and from there we simply search for an image!
    const logo = link.closest(".nav").querySelector("img");

    // and now we have to change the opacity of the sieblings of the selected link:
    siblings.forEach((el) => {
      // we have to check if the current element is not the link itself, because siblings that we have already includes the initial link as well!
      // WE WANT TO HAVE THE OPACITY AS 50% FOR LINK AND FOR logo AS WELL!

      // WITH OPACITY = 1, EVERYTHING BACKS TO 1!, the current element doesn't need that, because it is already has the opacity = 1!

      // if (el !== link) el.style.opacity = 0.5;
      // if (el !== link) el.style.opacity = opacity;
      if (el !== link) el.style.opacity = this;
      // logo.style.opacity = 0.5;
      // logo.style.opacity = opacity;
      logo.style.opacity = this;
    });
  }
};

// when i hover over one of the links, other ones will fade out and this includes even the logo at the left side!

// Menu fade Animation
// We don't use the forEach loop and attach to every of the nav__link an addevenetlistener, and we should use the EVENT DELEGATION instead:

// 1. We have to find the common parent element of all these links and also including the logo:
// if we were only working with the links, the class nav__links would be enough for all of them, but we have logo too here and class nav would be the best and cover all of them!

// 2. Attach the addEventListenet to that and use the mouseover event instead of click event:
// We used already the mouseenter but it doesn't bubble and we need an event here to bubble, that's why we have to use mouseover:

/////////////////////////////////////////////////////
// These two addEventListener will not work because we can not pass the arguments with them:
// nav.addEventListener("mouseover", handleHover);
// nav.addEventListener("mouseout", handleHover);

// These two will not work neither!
// nav.addEventListener("mouseover", handleHover(e, 0.5));
// nav.addEventListener("mouseout", handleHover(e, 1));
/////////////////////////////////////////////////////

// ONLY THE FOLLOWING FUNCTIONS WILL WORK:
nav.addEventListener("mouseover", (e) => {
  handleHover(e, 0.5);
});

// The opposite of mouseover is mouseout
nav.addEventListener("mouseout", (e) => {
  handleHover(e, 1);
});

// We can make it even simple using bind() method => I HAVE TO CHNAGE THE handleHover FUNCTION FROM AN ARROW FUNCTION TO A REGULAR FUNCTION, OTHERWISE, this KEYWORD WILL NOT WORK!
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

console.log("--------Implementing a Sticky Navigation_ The Scroll Event-----");

const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords); // DOMRect gives us a lot of parameters, but we need only TOP (current top value) parameter! top: 695.2000122070312 when the page in completely on the top and we didn't do any scrolling!

// We use Scroll event which is available on window and not document!
window.addEventListener("scroll", (e) => {
  // It fires a lot of events as soon as I scroll down or up, that's why it is not efficient and we have to avoid to use that!
  // console.log(e);

  // Let's start by get the current scroll position:
  // console.log(window.scrollY); // gives us different values when we scroll up and down

  // THE QUESTION IS NOW: WHEN ACTUALLY THE NAVIGATION SHOULD BECOME STICKY?
  // Answer: as soon as we reach the first section => reach to the the line above first section:
  // WHEN WE REACH TO THIS POSITION, WE WANT TO MAKE THE NAVIGATION STICKY!
  // WE can not hard code the value, we have to calculate it dynamically!

  if (window.scrollY > initialCoords.top) {
    // nav.classList.add("sticky"); // we use the sticky class! commeneted out to not interfer with below results in the next implementing!
  } else {
    // nav.classList.remove("sticky");
  }
});

// NOTE: THIS IS WORKING BUT IS NOT EFFICIENT BECAUSE FOR EVERY SCROLL EVEN SMALL SCROLLING, THE EVENT WILL FIRE A LOT OF COORDINATIONS, THAT'S WHY WE HAVE TO SEARCH FOR OTHER METHODS!

console.log(
  "Implementing THE SAME STICKY NAVIGATION but using A BETTER way: THE INTERSECTION OBSERVER API"
);

// QUESTION: WHAT IS INTERSECTION OBSERVER API AND WHY IT IS SO HELPFUL:
// This API allows our code to basically observe changes to the way that a certain target elements intersects another element or the way that it intersects the viewport!

// HOW TO USE THE INTERSECTION OBSERVER API:
const obsCallback = (entries, observer) => {
  // This callback function here will be called each time when observed element(our target element here => section1) is intersecting the root element at the threshold that we defined!
  // NOTE: whenever the target(section1) is intersecting the viewport (because it is our root) at 10% (because it is our threshold), so, whenever that happens, then this function will be called and no matter if we are scrolling up or down!
  // NOTE: We can have several thresholds in an array, AN ARRAY OF THRESHOLDS => entries is this array!
  entries.forEach((entry) => {
    // console.log(entry); // when our target here which is section1 comes into view Port(target => the whole section one is intersecting the viewport => 10% of the section1 has to be viewed in view port because the threshold is 10%), then we will have a new entry and also when the threshold is 10% => intersectionRation: 0.101241... and also isIntersecting property is true! less than 10% will not intersect and therefore, isIntersecting is false!
    // WHEN WE SCROLL UP OR DOWN AND 10% OR MORE THAN 10% OF THE SECTION! WILL APPEAR ON THE VIEW PORT => isIntersecting WOULD BE TRUE AND WHEN WE SEE FROM SECTION1 LESS THAN 10% IN VIEW PORT => isIntersection WOULD BE FALSE!
  });
};

const obsOptions = {
  root: null, // root will intersect the target and when it is null, it means the whole page view port!
  threshold: 0.1, // is 10%
  // the percentage of intersection at which the observer callback will be called!
  threshold: [0, 0.2], // 0% means the callback function will be fired when threshold passed and we go out of the view port OR we come inside the view port => come inside from border and go outside from the border! => 0 IS THE BORDER HERE!

  // When we specify the 1 as threshold inside the array threshold: [0, 1, 0.2],=> it means 100% but it is impossible (it will not happen) because section 1 is bigger than view port and we don't see the 100% of section 1 in our view port!
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1); // we have to enter here the target element!
// Observer observes the target section1

console.log("-----------Using this method for Our sticky navigation---------");

// AND NOW THE QUESTION IS: How we want that the sticky navigation appears when we schroll the page:

// Answer: When we no longer see the header page. Because when we see the header, the nav bar is there and we don't need to be sticky. But when we leave the header, we need the nav bar to be sticky at the top of the page!

// Defining stickyNavCallBack
// HOW TO USE THE INTERSECTION OBSERVER API:

// HOW TO CALCULATE THE '-90px' DYNAMICALLY: => when we have a responsive websites for different devices => It would be best to calculate it dynamically and not hard coded:
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight); // we see the height there and it is 90

const stickyNavCallBack = (entries, headerObserver) => {
  // We have only a threshold here which is zero and not an array of thresholds, that's why we don't need foreach() loop!
  const [entry] = entries; // this is the same when we write entries[0]!
  // console.log(entry);

  // We have to add and remove the classes now:
  // if (entry.isIntersecting === false) { OR the following:
  if (!entry.isIntersecting) {
    // it doesn't intersect anymore as soon as we leave the header and in this moment we need exactly the sticky class!
    nav.classList.add("sticky");
  } else {
    // it intersects when we go back and as soon as we enter the header, where we don't need the sticky class anymore because we see the header there anyway!
    nav.classList.remove("sticky");
  }
};

// Defining stickyNavOption:
const stickyNavOptions = {
  root: null,

  threshold: 0, // 0% means the callback function will be fired when threshold passed and we go out of the view port OR we come inside the view port => come inside from border and go outside from the border! => 0 IS THE BORDER HERE!

  // rootMargin: "-90px",
  rootMargin: `-${navHeight}px`,
  // a box of 90 pixels(height) which will apply outside of the target element(of our header!) but the header extends itself to the next header as an extra box, but we don't want that! we want this extra box to stay in header before the header comes to the border, that's why we select -90 instead of 90!
  // THE NAVIGATION APPEARS EXACTLY 90 PIXELS BEFORE THE THRESHOLD WAS ACTUALLY REACHED!
};

// 1. Now, we have to get the header element which is a complete section!
const observerHeader = document.querySelector(".header");

// 2. NOW, create our observer:
const headerObserver = new IntersectionObserver(
  stickyNavCallBack,
  stickyNavOptions
);

// 3.
headerObserver.observe(observerHeader); // we have to enter here the target element!

console.log("Revealing Elements on Scroll using THE INTERSECTION OBSERVER API");

// we have added the .section--hidden class to all four sections in HTML file to hide these sections and NOW, WE DON'T SEE THEM AND WHAT WE SEE IS ONLY HEADER AND FOOTER!

// OUR JOB IS: REMOVE THIS CLASS AS WE APPROACH THESE SECTIONS To BE APPEARED ONE AFTER ANOTHER:

// We will follow exactly THE INTERSECTION OBSERVER API Procedure:

// 1.
const allSectionsReveal = document.querySelectorAll(".section");

// entries and observer are two Standard names but we can choose other names too!
const revealSectionCallBack = (entries, observer) => {
  // 5. We write here the logic:
  // We have only one threshold, Therefore we don't need the forEach and we can get that directly from entry using destructuring:

  const [entry] = entries; // it is equal with entries[0]
  // console.log(entry);

  // removing the "section--hidden" from entry in target to see every upcoming section respectively when i am scrolling down!
  // THE FIRST SECTION DOESN'T WORK PROPERLY AND DOESN'T CONSIDER THE 15% THRESHOLD AND IS FIXED(DOESN'T REVEAL), BUT OTHER SECTIONS WORK PROPERLY -- TO REMOVE THE PROBLEM FOR SECTION ONE, IT HAPPENS FOR SECTION ONE WHEN entry.isIntersecting is False, Therefore, we can use IF() to say when entry.isIntersecting is True => it has to be appeard!

  // if (entry.isIntersecting) entry.target.classList.remove("section--hidden");

  // OR WE CAN USE THE GUARD CLASS AND DO THE OPPOSITE:
  if (!entry.isIntersecting) return; // if entry.isIntersecting is false => return and doesn't continue to go to the next line to excute it, otherwise, it continues!
  entry.target.classList.remove("section--hidden");

  // ONE MORE SMALL IMPROVEMENT TO IMPROVE A LITTLE BIT OUR OBSERVER PERFORMANCE => to unobserve the sections => as we keep scrolling, observer keeps observing the sections and more events keep getting added which are no longer necessary because we are already finish with them and we don't need the observation for them!
  // When we clear the terminal and scroll back, we don't see any other observing anymore(no more fired events) in Terminal => line 412!
  observer.unobserve(entry.target);
};

// 4.
const revealSectionOptions = {
  root: null, // like before the root is viewport

  threshold: 0.15, // 15% => we set it to something greater than 0 => because we don't want to show the sections right as it enters the viewport, but a little bit later!
  // THE SECTION IS ONLY REVEALED(OR POP UP) WHEN IT IS 15% VISIBLE!
};

// 2.
const sectionObserver = new IntersectionObserver(
  revealSectionCallBack,
  revealSectionOptions
);

// 3.
// Loop over the above NodeList: we use forEach, whenever we don't want to create a new array!
allSectionsReveal.forEach((section) => {
  sectionObserver.observe(section); // we have to enter here the target element!

  // I removed the class section--hidden which hides the sections from HTML file to add that programmatically to the HTML file => It is better to do this, instead of adding it manually:
  section.classList.add("section--hidden");
  // AND NOW, LIKE BEFORE, THE SECTIONS ARE HIDDEN AND I DON'T SEE THEM ANYMORE!
});

console.log("------Lazy Loading Images Using THE INTERSECTION OBSERVER API--");

// This is very helpful when we have a slow connection or not a good cellphone or System:
// the images with src property are lazy loaded ones and at the end we have to replace the src(the lazy-loaded image) with data-src(original high resolution image) and remove the lazy-img class because it creates a filter in CSS file and does the image bluring!

// START TO USE THE INTERSECTION OBSERVER API:
// 1.
const imgTargets = document.querySelectorAll("img[data-src]"); // we don't select all the images because some of them have not lazy-loaded feature! We just select ones with data-src feature(original high resolution image)!
// img[data-src] => IT MEANS WE SELECT ALL THE IMAGES WITH THE PROPERTY OF data-src

console.log(imgTargets); // NodeList(3) [img.features__img.lazy-img, img.features__img.lazy-img, img.features__img.lazy-img]

// 4. Create the callBack function:
const loadImgCallBack = (entries, observer) => {
  // We have only one Threshold => one Entry
  const [entry] = entries; // using destructuring
  console.log(entry);

  // We get many observe even when isIntersecting is false! => we have to do the Guard Class like before to return if isIntersecting is Flase, otherwise it can continue:
  // GURAD CLASS => EARLY RETURN
  if (!entry.isIntersecting) return;

  // REPLACE src with data-src
  // rsc = data-src => we have to mention the dataset to point to the data- part of data-src
  entry.target.src = entry.target.dataset.src;

  // FOR SLOW CONNECTIONS OR SLOW DEVICE, it would be the best to use an addEventListener and once loading is finished, it will remove the blurry filter from that! IT MAENS AT THE SAME TIME WHEN LOADING IS FINISHED, EXACTLY AT THIS TIME THE FLITER WOULD BE REMOVED AND WE CAN SEE THE IMAGE AND NOT BEFORE THAT!
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });

  // LIKE always, we add the unobserving to stop the observing the images which is no longer necessary and it did already the loading task::
  observer.unobserve(entry.target);

  // We have to load the images before we reach them and also before the user notice the image loading => IN THIS CASE, WE WILL SPECIFY rootMargin as we did for other example too! I HAVE TO WRITE IT AT BELOW IN loadImgOptions SECTION => rootMargin: "-200px",
};

// 5. Create the Options:
const loadImgOptions = {
  root: null, // we want the entire view port
  threshold: 0,
  rootMargin: "-200px", // => 200px before we reach an image the loading should be started and As we approach the images, They are fully loaded and therefore, we don't see any delay as we load the images!
  // WHEN I CHANGE THE rootMargin TO 200px(from negative to positive one), THE LOADING WOULD BE VERY FAST AND I DON'T LIKE IT PERSONALLY. I LIKE THAT IMAGE TO STAY BLUR A BIT SECOND AND THEN LOAD COMPLETELY => IT IS BEAUTIFUL => IT IS JUST THE MATTER OF PERSONAL PREFERENCES!
};

// 2. Observer section which is always the same like other previous examples:
const imgObserver = new IntersectionObserver(loadImgCallBack, loadImgOptions);

// 3. To attach the imgTargets to the imgObserver => we have a NodeList of TargetImages => we have to use the forEach like previous example:
imgTargets.forEach((img) => {
  imgObserver.observe(img); // imgObserver will observe each image!
});

console.log("------------Building a Slider Component_Part_1-----------------");

// Slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
const yearCopyright = document.querySelector(".yearCopyright");

// NOW, The photos are on top of each other and we have to put them side by side:
// SLIDES is a NodeLIst and we have to use forEach loop to get every slide:

const slider = document.querySelector(".slider"); // Slider is the complete photo + arrow buttons and not only image. Slide is only photo, That's why we have to choose the slider!

// TO SEE THE SLIDES SIMPLER, WE MAKE THE SIZE SMALLER AND ALSO SHIFT TO LEFT TO SEE ALL OF THEM ON THE PAGE!
// slider.style.transform = `scale(${0.3}) translateX(${0}%)`; // we see three photos on the page NOW!

// slider.style.overflow = `visible`; // The overflow is hidden, therefore, we don't see all the pictures side by side, To see them side by side, we have to change the overflow to visible!

//////////////////////////////////JONAS SOLUTION///////////////////////////////////
let curSlide = 0; // cuuren Slide
const maxSlide = slides.length;

// let outputArray = [];
// slides.forEach((s, i) => {
//   s.style.transform = `translateX(${100 * i}%)`;
//   // => i = 0 => translateX(0), => i = 1 => translateX(100),=> i = 2 => translateX(200),=> i = 3 => translateX(300)
//   // The width of each photo is 100% and the second one starts right after the first one!
//   // TranslateX() moves them to position 100%
//   // transform = translateX(0%),(100%),(200%),(300%)
//   // outputArray.push(Number(`${100 * i}`));
// });

// Create DOTS:
const createDots = () => {
  // We want to create an element like below element => AT THE END WE WILL HAVE THREE DOTS:
  // <button class="dots__dot" data-slide="0"></button>
  // NOTE: WE WANT TO CREATE ONE DOT ELEMENT FOR EACH SLIDE:

  // WE LOOP OVER SLIDES TO JUST GET THE i FROM THAT AND NOT THE SLIDE INFO ITSELF: _ :means this variable is not important for us and we don't need it!
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      // beforeend => adding it as last child - after beforeend comes the HTML Code in Backtick format!
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

// We need this function to hightlight the active dot with respect to selected current slide:
const activateDot = (slide) => {
  // We have to do the ssame procedure approximately as we did for three buttons above:

  // 1. Before we activate one of them, we have to deactivate all of them:
  // WE had already this: tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  document
    .querySelectorAll(".dots__dot")
    .forEach((d) => d.classList.remove("dots__dot--active"));

  // 2. We have to activate the only dot that we are interested in:
  document
    // <button class="dots__dot dots__dot--active" data-slide="1"></button>
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
  // FOR EXAMPLE: WE SELECT SLIDE NO.2 => WE WANT THAT THE RESPECTED DOT WHICH IS SECOND DOT BE SELECTED => THAT'S WHY IN .querySelector(`.dots__dot[data-slide="${slide}"]`), THE SLIDE WOULD BE TWO, THEREFORE THE SECOND DOT WILL BE SELECTED!
};

const goToSlide = (slide) => {
  slides.forEach((s, i) => {
    // s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
    // => i = 0 => translateX(0), => i = 1 => translateX(100),=> i = 2 => translateX(200),=> i = 3 => translateX(300)
    // The width of each photo is 100% and the second one starts right after the first one!
    // TranslateX() moves them to position 100%
    // transform = translateX(0%),(100%),(200%),(300%)
    // outputArray.push(Number(`${100 * i}`));
  });
  // FOR THE SECOND SLIDE, WE NEED => [-100%, 0%, 100%, 200%]
};

// GO TO THE NEXT SLIDE:
const nextSlide = () => {
  if (curSlide === maxSlide - 1) {
    // when we are on the last slide, and we click the right button again => it will back to the first slide!
    curSlide = 0;
  } else {
    curSlide++; // we we go to the next slide, we will increase that!
  }

  goToSlide(curSlide);
  // WE HAVE TO CALL THE ACTIVATEDOT FUNCTION NOW TO HAVE THE HIGHLIGHTED DOT IN RESPECT TO THE SELECTED SLIDE:
  activateDot(curSlide);
};

// GO TO THE NEXT SLIDE:
const prevSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1; // when the current slide is 0 (we are in first slide) and click the left button again => we go to the last slide to the right!
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  // WE HAVE TO CALL THE ACTIVATEDOT FUNCTION NOW TO HAVE THE HIGHLIGHTED DOT IN RESPECT TO THE SELECTED SLIDE:
  activateDot(curSlide);
};

// Initialization:
const init = () => {
  goToSlide(0); // Go TO slide 0 => I commented the above function out which is as following:
  // IN goToSlide() WHEN I PUT 0 INSTEAD OF slice => {100 * (i - slide)} would be 100*i which is exactly the following function:
  /* 
slides.forEach((s, i) => {
  s.style.transform = `translateX(${100 * i}%)`;
  });
*/
  createDots();
  activateDot(0); // to see the first dot is active for first slide!
};

init();

btnRight.addEventListener("click", nextSlide); // the nextSlide function doesn't get any parameter, that's why we can write its name directly here!

// FOR THE LEFT BUTTON:
btnLeft.addEventListener("click", prevSlide);

// TO ADD the Arrow Keys => RIGHT AND LEFT TO addEvenetListener()
// As soon as the key pressed down => it will fired!
document.addEventListener("keydown", (e) => {
  console.log(e); // we can get the info about which key was pressed from e in Terminal
  if (e.key === "ArrowLeft") {
    prevSlide();
  }

  // OR WE CAN USE SHORT CIRCUIT:
  e.key === "ArrowRight" && nextSlide();
});

// WE ARE GOING TO USE EVENT DELEGATION FOR DOTS INSTEAD OF ATTACHING ONE addEventListener() to each dot, BUT INSTEAD TO THE COMMON PARENT:

dotContainer.addEventListener("click", (e) => {
  // TO match the elment in which we are interested in => we check simply the class:
  if (e.target.classList.contains("dots__dot")) {
    console.log("DOT");

    // const slide = e.target.dataset.slide; // we have above this: class="dots__dot" data-slide="${i}" => when we have data- => we have to use dataset. + name of the element which is slide!

    // OR we use destructuring directly => This is an object => we use object destructuring:
    // WE selected our slide:
    const { slide } = e.target.dataset;

    // And now, we have to go to the slide that we selected now and has read from dataset:
    goToSlide(slide);
    // WE HAVE TO CALL THE ACTIVATEDOT FUNCTION NOW TO HAVE THE HIGHLIGHTED DOT IN RESPECT TO THE SELECTED SLIDE:
    activateDot(slide);
  }
});

const year = new Date().getFullYear();
yearCopyright.textContent = year;

//////////////////////////////////JONAS SOLUTION///////////////////////////////////

// console.log(outputArray); // [0, 100, 200, 300]

// let counter = 0;
// TO MAKE THE SLIDE GO TO THE RIGHT USING RIGHT BUTTON:

////////////////////////////////////MY SOLUTION WHICH IS NOT COMPLETE//////////////////
// counter++;
// slides.forEach((s, i) => {
//   console.log("iOutSideIF", i);
//   if (slides.length === i + 1) {
//     console.log("Insdie IF");
//     // RESET: go back to the first photo
//     // s.style.transform = `translateX(${100 * i}%)`;
//     // console.log(s.style.transform);

//     // outputArray = [0, 0, 0, 0];
//     slides.forEach((s, i) => {
//       // o += 100;
//       // console.log(o);
//       // outputArray.push(o);
//       // s.style.transform = `translateX(${(outputArray[i] += 300)}%)`;
//       outputArray[i] = Number(`${100 * i}`);
//       s.style.transform = `translateX(${outputArray[i]}%)`;
//       console.log("s.style.transformIF", s.style.transform);

//       // console.log("counter:", counter);
//       console.log("iIF:" + i);
//     });
//     console.log("outputArrayIF", outputArray);
//     counter = 0;
//   } else {
//     console.log("i2:" + i);
//     console.log("outputArray", outputArray);
//     // s.style.transform = `translateX(${100 * i}%)`;
//     s.style.transform = `translateX(${(outputArray[i] -= 100)}%)`;
//     console.log(s.style.transform);
//     // console.log(counter);

//     // WHEN WE REACH THE LAST PHOTO, WE HAVE TO BACK TO thE FIRST PHOTO => RESET
//     // console.log(outputArray); // [0, 100, 200, 300]
//   }
//   // => i = 0 => translateX(0), => i = 1 => translateX(100),=> i = 2 => translateX(200),=> i = 3 => translateX(300)
//   // The width of each photo is 100% and the second one starts right after the first one!
//   // TranslateX() moves them to position 100%
//   // transform = translateX(0%),(100%),(200%),(300%)
// });

// TO MAKE THE SLIDE GO TO THE RIGHT USING RIGHT BUTTON:
// btnLeft.addEventListener("click", () => {
//   slides.forEach((s, j) => {
//     // s.style.transform = `translateX(${100 * i}%)`;
//     s.style.transform = `translateX(${(outputArray[j] += 100)}%)`;
//     console.log(s.style.transform);
//     // => i = 0 => translateX(0), => i = 1 => translateX(100),=> i = 2 => translateX(200),=> i = 3 => translateX(300)
//     // The width of each photo is 100% and the second one starts right after the first one!
//     // TranslateX() moves them to position 100%
//     // transform = translateX(0%),(100%),(200%),(300%)
//   });
// });
////////////////////////////////////MY SOLUTION WHICH IS NOT COMPLETE//////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
// ADVANCED-DOM-Banklist
////////////////////////////////////////////////////////////////////////////////////////////////

console.log("ADVANCED-DOM-Banklist");

console.log("-------------------------------SELECTING ELEMENTS-------------");

// IF WE WANT TO SELECT THE ENTIRE HTML SECTION, WE USE: document.documentElement
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header"); // send us the first element matches this class
const allSections = document.querySelectorAll(".section"); // send us the all elements match this calss => we have here multiple sections with class section!

console.log(allSections); // NodeList(4)

document.getElementById("section--1");

const allButtons = document.getElementsByTagName("button"); // All the elemnts with the name of the button!

console.log(allButtons); // HTMLCollection(9) => all the buttons on our page!
// This send us a HTMLCollection and is different from NodeList!

// NOTE: getElementsByTagName gives us the HTMLCollection and this is a live collection which means when we delete an elemenet for example a button in our HTML, it will reflect on this live collection and we will have one less element => HTMLCollection(8)

// NOTE: Above situation will not happen for the NodeList. When i delete a section, I will have still NodeList with 4 sections and not with 3 setions. NodeList will not update itself!

console.log(document.getElementsByClassName("btn")); // This is like getElementById and getElementsByTagName
// it doesn't need any dot inside -- This is like getElementById which doesn't need any # inside!
// THIS ALSO GIVES US A HTML COLLECTION => HTMLCollection(5)

console.log("--------------------Creating and Inserting Elements----------");

//.insertAdjacentHTML => we used this already in bank application to create movements!

// We create now a DOM element from div HTML Element but it is not still on the page => therefore, we can not use it yet and we have to manually insert it on the page!
const message = document.createElement("div");
console.log(message); // div
message.classList.add("cookie-message"); // add a class to the div
// message.textContent =
//   "We use cookies for improved functionality and analytics!";

message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'; // This is a text and a nicely formatted button!

// and now, we want to put it in the DOM, somewhere in the header:
// we select the header and then append our message to that element:

// NOTE: prepend actually add the message as first child to the header!
header.prepend(message); // and now it is in DOM and wee see it on the page on top of the header!

// NOTE: if we want to add message as last child to the header, we use append instead of prepend. In this case we see the message as last element(child) at the bottom of the header section in HTML and also at page!

header.append(message);
// A DOM ELEMENT IS UNIQUE AND CAN MOVE FROM TOP TO BOTTOM With prepend AND append. It can only be in ONE PLACE like a PERSON that can be only in one place and not in two places at the same time!

// BUT IF WE WANT TO HAVE THE MESSAGE IN MORE THAN ONE PLACE => we make a copy which is a Node copy(several copies) and true to do a deep copy for all child elements!
// header.append(message.cloneNode(true)); // we see the message in both top and botton the header section => but this is the case that we don't want in most cases!

console.log("---------------------INSERTING ELEMENT WITH BEFORE AND AFTER---");
// THERE ARE TWO MORE METHODS:

// header.before(message); // put the message before header element!
// header.after(message); // put the message after header element!

console.log("-----------------------------DELETING ELEMENTS----------------");
// DELETE ELEMENTS:
// DELTE THE MESSAGE WHEN WE CLICK ON THE Got it! BUTTON!

document.querySelector(".btn--close-cookie").addEventListener("click", () => {
  // we don't need to add this here again because the message is already in DOM memory: message.classList.add("cookie-message"); // add a class
  message.remove();

  // THE OLD SCHOOL WAY TO REMOVE - BUT IT STILL IS WORKING:
  // message.parentElement.removeChild(message);
});

console.log("------------------------------Styles------------------------");

// Styles => These are inline styles.
message.style.backgroundColor = "#37383d"; // give the color to the message
message.style.width = "100vw"; // set the width of the message element to 100% of the viewport width! => in this case the message would be from left to the right of the page!

// Is it possible to read the style properties?
console.log(message.style.height); // no answer, because we didn't set it already manually!
console.log(message.style.backgroundColor); // rgb(55, 56, 61)

console.log(message.style.color); // no answer, because this feature in in the class (cookie-message) in style.css file and we didn't set it manually as an inline style!

// we can get all feature in our CSS whether the features which are in style.css or the one that we entered manually as inline-styles!
console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
console.log(getComputedStyle(message).height); // 43.4px

// adding 40px to the height of message:
console.log(getComputedStyle(message).height); // 43.4px

const extraHeight = 30;
message.style.height =
  parseFloat(getComputedStyle(message).height) + extraHeight + "px";
console.log(message.style.height);

// WORKING WITH CSS CUSTOM PROPERTIES => CSS VARIABLES!
// when we want to select the root elements(CSS variables) in Style.css, we can use the document.documentElement which is root!

console.log("-----------------------setProperty for CSS VARIABLES----------");

// document.documentElement.style.setProperty("--color-primary", "orangered"); // in this case, the color of all elements with --color-primary variable will change to the orangered!

// NOTE: for CSS Variables, we should always use the setProperty as we used it above! The regular style method like this: message.style.backgroundColor will not work!
// BUT OTHER WAY AROUND IT WORKS: WE CAN ALWAYS USE setProperty FOR BOTH CSS VARIABLES AND REGULAR STYLE METHOD! BUT FOR REGULAR STYLE METHOD, IT WOULD BE MUCH EASIER TO USE THIS METHOD AND NOT setProperty!

console.log("--------------------------Attributes----------------------------");

// Attributes are like src, alt, class and id for img Element!

// Reading the Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt); // Bankist logo

// to get the absolute URL path:
console.log(logo.src); // http://127.0.0.1:8080/img/logo.png which is different from what we have in HTML and this is the absolute URL.
// What we have in HTML file is a relative URL => src="img/logo.png" to the folder where the index.html is located!

// to get the relative URL path:
console.log(logo.getAttribute("src")); // with this we can get the relative address: img/logo.png

// to get the href for a link:
const link = document.querySelector(".nav__link--btn");
console.log(link.href); // http://127.0.0.1:8080/?# => gives us the absolute URL path
console.log(link.getAttribute("href")); // # gives us the relative URL path

// Data Attributes:
console.log(logo.dataset.versionNumber); // 3.0 => data-version-number="3.0" must always beginns with data word, otherwise it will not work!

// Classes
logo.classList.add("c", "j");
logo.classList.remove("c", "j");
logo.classList.toggle("c");
logo.classList.contains("c"); // it is contains but not includes like what we had already in arrays!

// OR WE CAN SET THE NAME OF THE CALSS: => Don't use that because it overwrite all the existing classes with this name and we can only have one class on any element!
// NOTE: THE BEST WAY IS TO USE THE ABOVE CLASSLIST, BECAUSE IT WILL NOT INTERFER THE EXISTINGS CLASSES AND WE CAN HAVE DIFFERENT CLASSEAS FOR EVERY ELEMENT!
// logo.className = "Jonas"; // WE DON'T USE THAT!!!

console.log(logo.className); // nav__logo

// Setting the Attributes
logo.alt = "Beautiful minimalist logo";

// Non-standard
console.log(logo.designer); // undefined
console.log(logo.getAttribute("designer")); // Maximilian
// OR creating a new Attribute without touching the HTML file:
logo.setAttribute("company", "Bankist"); // company="Bankist"

console.log("-------------Types of Events and Event Handlers---------------");

// Mouse Enter Event => is like the hover in CSS:
const h1 = document.querySelector("h1");

const alerth1 = () => {
  alert("addEventListener: Great! You are reading the heading :D");
  h1.style.color = "dodgerblue";

  // h1.removeEventListener("mouseenter", alerth1);
  // It will remove the event and listen to the event only once! => when i again enter the mouse => the alert will not appear until i refresh the page again!
  // IT MEANS WITH THIS REMOVEEVENTLISTENER, THE FUNCTION RUNS ONLY ONE TIME(THE FUNCTION LISTENS ONLY ONCE).
};

// h1.addEventListener("mouseenter", alerth1);

// We can also say after how many seconds the addeventlistener has to be removed?
setTimeout(() => h1.removeEventListener("mouseenter", alerth1), 3000);

// THE SECOND WAY TO SHOW THE MESSAGE WHEN MOUSE ENTERS => But this is a bit OLD SCHOOL WAY and now, we use addEventListener() like what we used above!
// h1.onmouseenter = () => {
//   alert("mouseenter: Great! You are reading the heading :D");
// };

// WHY addEventListener is better? => it has two advantages:
// 1. we can add multiple eventListener to the same Event:
// But with mouseenter => the second one will overwrite the first one!

// 2. We can remove an eventHandler in the case that we don't need it anymore!
// FIRST, WE HAVE TO A FUNCTION WITH NTHE SAME CONTENTS AND CALL IT AS CALLBACK FUNCTION IN ADDEVENTLISTENER:

// Another way of handling an event is using an HTML attribute: => BUT RECOMMENDED TO NOT BE USED, THIS IS AN OLD SCHOOL WAY:
// <!-- <h1 onclick="alert('HTML alert')"> OLD SCHOOL; NOT RECOMMENDED TO USE THIS!-->

console.log("-------------------------Event Propagation in Practice-------");

// Random color => rgb(255,255,255)

// GET A RANDOM NUMBER:
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
console.log(randomInt(1, 6));

// HOW TO CREATE A RANDOM CLOR FOLLOWING THE RANDOM NUMBER PROCEDURE:
const randomColor = (min, max) =>
  `rgb(${randomInt(min, max)},${randomInt(min, max)},${randomInt(min, max)})`;

console.log(randomColor(0, 255));

// connect the addEvenetListener to all the nav-links on top of the page:
// FIRST ONE FOR Features:
document.querySelector(".nav__link").addEventListener("click", (e) => {
  // console.log("LINK");
  // In addEventListener(),  this points to the elemnet which is connected to that and that element is a link here => nav__link

  // NOTE: the this keyword will not work with ARROW FUNCTION AS EXPECTED:
  // SOLUTIONS:
  // 1. USING REGULAR FUNCTION OR 2. USING event.target instead of this keyword => I use the second
  // this.style.backgroundColor = randomColor(0, 255);
  // e.target.style.backgroundColor = randomColor(0, 255); // The features get the random colors!
  // console.log("LINK", e.target, e.currentTarget);
  console.log(e.currentTarget === e.target); // ONLY HERE FOR .nav__link IS TRUE!

  // WE CAN EVEN STOP THE PROPAGATION:
  // e.stopPropagation(); // The other two parent elements didn't change its color and also we don't see the info from other links in the terminal => the event never arrived at those two elements, that's why handling didn't happend and all because of we stopped the event propagation!

  // WHEN WE HAVE TO STOP THE PROPAGATION:
  // Stopping the event propagation like this can sometimes be very helpful and fix the problems in very complex applications with many handlers for the same events!
  // BUT IN GENERAL IS NOT A GOOD IDEA TO STOP THE PROPAGATION OF EVENTS!
});

// SECOND ONE FOR nav__links which is the parent of nav__link and includes the complete block of the nav:
document.querySelector(".nav__links").addEventListener("click", (e) => {
  // console.log("LINK");
  // e.target.style.backgroundColor = randomColor(0, 255); // The whole block of nav get the random colors when i click on the nav block!
  // console.log("CONTAINER", e.target, e.currentTarget); // e.currentTarget: current link attached to the handler --- e.target: event BUBBLING
  console.log(e.currentTarget === e.target); // false
});

document.querySelector(".nav").addEventListener(
  "click",
  (e) => {
    // console.log("LINK");
    // e.target.style.backgroundColor = randomColor(0, 255);
    // console.log("NAV", e.target, e.currentTarget);
    console.log(e.currentTarget === e.target); // false
  }
  // true //the eventhandler no longer listen to the bubbling events, but instead listen to the capturing phase! and now NAV is at TOP because of capturing Phase and two others are still waiting for the Bubbling Event and happens after NAV because these feature for them is false as default!=> but nowadays it uses rarely and we can set it as false which is default!
);

// NOTE: When i click on the Features nav link, all the three get the same class => nav__link which comes from e.target because all three handlers are handling the same event and that is because event BUBBLING!
// WHAT DOES IT MEANS event BUBBLING: the event originates here in this link and then it bubbles up to its parent element which is nav__links and from there to its next parent element which is nav and go further up in the DOM TREE!

console.log("-------------------------DOM Traversing------------------------");

// DOM Traversing is basically walking Through the DOM which means we can select an element based-on another element! => we can select an element relative to a certain other elements for example a direct child or a direct parent element!

const h1_1 = document.querySelector("h1");

// Going downwards: selecting child elements:
// First Solution: using querySelector => querySelector works also on elements and not only on documents

console.log(h1_1.querySelectorAll(".highlight")); // NodeList(2) [span.highlight, span.highlight]
// We have now all elements with highlight class which are children of h1 element! and it doesn't matter how deep would be the child elements inside the h1 element as parent element!

// BUT WE HAVE TO KNOW THAT IT WILL NOT SELECT ALL THE ELEMENTS WITH highlight CLASS. It selects only all the elements with highlight calss which are children of h1 element!

// Getting the direct children:
console.log(h1_1.childNodes); // NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]

console.log(h1_1.children); // HTMLCollection(3) [span.highlight, br, span.highlight]

// changing the property of the first child:
h1_1.firstElementChild.style.color = "orangered"; // the banking word color changes to the red, because it is the first child with span.highlight class and the index is zero => 0:span.highlight

// changing the color of the last element child:
h1_1.lastElementChild.style.color = "dodgerblue";

// Going upwards: selecting parents
console.log(h1_1.parentNode); // for direct parents hwich is similat to the childNodes
// div.header__title which is direct parent of h1 element

console.log(h1_1.parentElement); // div.header__title

// It selects the closest header to our h1 element, so the closest parent element that has 'header' class and simply apply this style to that!
// h1_1.closest(".header").style.background = "var(--gradient-secondary)";
// We will use it all the time specially with evenet delegation

// It can also return h1 element itself:
// h1_1.closest("h1").style.background = "var(--gradient-primary)";

// NOTE: closest is opposite of querySelector => both receives a query string as input BUT querySelector finds children no matter how deep in DOM Tree WHILE closest method finds Parent and no matter how far up is in DOM Tree!

// Going sideways: siblings
// WE CAN ONLY ACCESS IN JS TO DIRECT SIEBLINGS => ONLY THE PREVIOUS AND THE NEXT ONE!
console.log(h1_1.previousElementSibling); // null
console.log(h1_1.nextElementSibling); // <h4>A simpler banking experience for a simpler life.</h4>

console.log(h1_1.previousSibling); // #text
console.log(h1_1.nextSibling); // #text

// HOW CAN WE GET THE ALL SIEBLINGS and not just the previous and next ones:
// It consists of combining these two commands: h1_1.parentElement + h1_1.children
// We move up to the direct parent element and than select all the children from there:
console.log(h1.parentElement.children); // HTMLCollection(4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img] => the h1 itself is included too!

// NOTE: This is a HTML collection and not an array but still is iterable and we can convert it to an array using spread operator and two brackerts: [...] like always!

console.log([...h1.parentElement.children]); // (4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img]

// AND NOW WE CAN LOOP OVER THIS ARRAY UISNG forEach AND DO SOME FUNS:
[...h1.parentElement.children].forEach((el) => {
  // we want to change the style to ALL THE SIEBLINGS but except the elemnet itself!
  // We scale all other three sieblings except element itself which is h1 by 50%:
  /////////////////////////////////////////////////////////
  // if (el !== h1) el.style.transform = "scale(0.5)";
  /////////////////////////////////////////////////////////
  // el.style.transform = "scale(0.5)"; with this h1 element would be scaled down by 50% too!
});
