import React from "react";
import useEffect from "react";
import bellSound from "../bell_ring.mp3";
import kidsYeahSound from "../kids_yeah.mp3";
import icon_sun from "../images/icon-sun.svg";
import icon_moon from "../images/icon-moon.svg";
import icon_plus_white from "../images/plus_white.svg";
import Data from "../components/Data";
export default function MainContent(p) {
  // check local storage
  let localStorageData = localStorage.getItem("todo-data");
  const [itemsLeft, setItemsLeft] = React.useState();
  function setItemsLeftCount() {
    setTimeout(() => {
      let itemsLeft = document.querySelectorAll(".item.active");
      setItemsLeft(itemsLeft.length);
    }, 20);
    // we may need to do it twice
    setTimeout(() => {
      let itemsLeft = document.querySelectorAll(".item.active");
      setItemsLeft(itemsLeft.length);
      let itemsCompleted = document.querySelectorAll(".item.completed");
      if (itemsCompleted.length > 1 && itemsLeft.length === 0) {
        // run congrats sound effect
        setTimeout(() => {
          document.querySelector(".congrats-sound").play();
        }, 500);
      }
    }, 600);
  }
  setItemsLeftCount();
  // all data
  const [ALL_DATA, setALL_DATA] = React.useState(
    JSON.parse(localStorageData) || [
      { todo: "Complete React.JS course", isDone: true, id: 1 },
      { todo: "Follow @Emad_code on Twitter", isDone: false, id: 2 },
      { todo: "Plan for tomorrow's duties", isDone: false, id: 3 },
    ]
  );
  let ResItems = ALL_DATA.map((item, index) => {
    return (
      <Data
        order={item.id}
        key={index}
        text={item.todo}
        isCompleted={item.isDone}
        removeItemFunc={removeItem}
        markItemFunc={markItemsAsCompleted}
      />
    );
  });
  React.useEffect(() => {
    localStorage.setItem("todo-data", JSON.stringify(ALL_DATA));
  }, [ALL_DATA]);
  // add/remove item
  function addItem(e) {
    // is it ENTER key?
    let text = document.getElementById("inp-create").value;
    if (
      (e.key === "Enter" ||
        e.currentTarget.classList.contains("addItem-btn")) &&
      text !== "" &&
      text !== " "
    ) {
      e.preventDefault();
      setALL_DATA((prev) => [
        ...prev,
        {
          todo: text,
          isDone: document
            .querySelector(".results")
            .classList.contains("show-completed")
            ? true
            : false,
          id:
            ALL_DATA.length > 0 ? Number(ALL_DATA.slice(-1)[0].id) + 1 || 1 : 1, // to get the last item number
        },
      ]);
      setItemsLeftCount(ALL_DATA.length);
      document.getElementById("inp-create").value = "";
    } else {
    }
  }
  // remove item
  function removeItem(e) {
    let itemToRemove = e.currentTarget.parentElement.dataset.order;
    setALL_DATA((prev) => {
      return [
        ...prev.filter(
          (item) => item.id.toString() !== itemToRemove.toString()
        ),
      ];
    });

    setItemsLeftCount();
  }
  // mark items as completed
  function markItemsAsCompleted(e) {
    let itemToMark = e.currentTarget.parentElement;
    // ring bell
    let bell = document.querySelector(".sounds .bell-sound");
    if (itemToMark.classList.contains("active")) {
      bell.currentTime = 0;
      bell.play();
    }
    setALL_DATA((prev) => {
      return prev.map((item) =>
        item.id.toString() === itemToMark.dataset.order.toString()
          ? { ...item, isDone: !item.isDone }
          : item
      );
    });
    setItemsLeftCount();
  }
  // set show state
  let navLinks = document.querySelectorAll(".nav .links li");
  function setNavClassForActiveElement(e) {
    navLinks.forEach((navItem) => navItem.classList.remove("active"));
    e.currentTarget.classList.add("active");
  }
  const [isAllShown, setIsAllShaow] = React.useState("show-all");
  // show completed only
  function showCompletedItems(e) {
    setIsAllShaow("show-active");
    setNavClassForActiveElement(e);
  }
  // show Active only
  function showActiveItems(e) {
    setIsAllShaow("show-completed");
    setNavClassForActiveElement(e);
  }
  // show ALL
  function showAllItems(e) {
    setIsAllShaow("show-all");
    setNavClassForActiveElement(e);
  }
  // remove completed items permanently
  function removeCompletedItemsForever() {
    setALL_DATA((prev) => prev.filter((item) => !item.isDone));
  }
  return (
    <>
      <section className="bg-blue-500 mt-16">
        <div className="my-container w-full max-w-[600px] mx-auto px-8">
          <header className="flex justify-between items-center mb-10">
            <div className="logo uppercase font-bold text-4xl text-white">
              T O D O
            </div>
            <div
              onClick={p.toggleDark}
              className="dark-toggle cursor-pointer p-4 -m-4"
            >
              <img
                className="group-[.dark]:hidden block"
                src={icon_moon}
                alt="moon"
              />
              <img
                className="group-[.dark]:block hidden"
                src={icon_sun}
                alt="moon"
              />
            </div>
          </header>
          <div className="create mb-6 flex items-center bg-white group-[.dark]:bg-clr_blue_2 rounded-lg pl-6">
            <span
              onClick={addItem}
              className="checkbox addItem-btn flex items-center justify-center shrink-0 rounded-full w-6 h-6 border border-clr_graish_blue_3 mr-4 cursor-pointer"
            >
              <img src={icon_plus_white} alt="moon" />
            </span>
            <input
              onKeyDown={addItem}
              id="inp-create"
              className="h-16 w-full inline-block focus:outline-none bg-[transparent] group-[.dark]:caret-clr_gray_1 group-[.dark]:text-clr_graish_blue_1 font-medium"
              type="text"
              placeholder="Create a new todo"
            />
          </div>
          <div className="results_section bg-white group-[.dark]:bg-clr_blue_2 rounded-lg overflow-hidden shadow-2xl shadow-indigo-600">
            <div className={`results ${isAllShown}`}>
              {ResItems.length === 0 ? (
                <div className="mx-auto text-center font-medium p-4 text-clr_blue_3 group-[.dark]:text-white">
                  Sorry, No results
                </div>
              ) : (
                [...ResItems].reverse()
              )}
            </div>
            <div className="details flex justify-between px-6 py-4 text-clr_graish_blue_5">
              <div>
                <span className="results_counter">{itemsLeft}</span> items left
              </div>
              <div
                onClick={removeCompletedItemsForever}
                className="clear-completed hover:opacity-70"
              >
                <button type="button">Clear Completed</button>
              </div>
            </div>
          </div>
          <div className="nav bg-white rounded-lg group-[.dark]:bg-clr_blue_2">
            <ul className="links flex items-center justify-center py-4 mt-4 shadow-2xl shadow-indigo-600 rounded-lg">
              <li onClick={showAllItems} className="font-bold group active">
                <span className="group-[.active]:text-[hsl(220,98%,61%)!important] p-3 group-[.dark]:text-clr_graish_blue_5 text-clr_graish_blue_5 group-[.dark]:hover:text-white hover:text-clr_blue_3 cursor-pointer">
                  All
                </span>
              </li>
              <li onClick={showActiveItems} className="font-bold group">
                <span className="group-[.active]:text-[hsl(220,98%,61%)!important] p-3 group-[.dark]:text-clr_graish_blue_5 text-clr_graish_blue_5 group-[.dark]:hover:text-white hover:text-clr_blue_3 cursor-pointer">
                  Active
                </span>
              </li>
              <li onClick={showCompletedItems} className="font-bold group">
                <span className="group-[.active]:text-[hsl(220,98%,61%)!important] p-3 group-[.dark]:text-clr_graish_blue_5 text-clr_graish_blue_5 group-[.dark]:hover:text-white hover:text-clr_blue_3 cursor-pointer">
                  Completed
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="sounds">
          <audio className="bell-sound" src={bellSound}></audio>
          <audio className="congrats-sound" src={kidsYeahSound}></audio>
        </div>
      </section>
    </>
  );
}
