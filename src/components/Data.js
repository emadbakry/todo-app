import icon_x from "../images/icon-cross.svg";
import check from "../images/icon-check.svg";
import icon_x_white from "../images/cross_white.svg";
export default function Results(p) {
  return (
    <>
      <div
        data-order={p.order}
        className={`item group ${
          p.isCompleted ? "completed" : "active"
        } flex px-6 py-4 border-b border-gray-200`}
      >
        <span
          onClick={p.markItemFunc}
          className="checkbox shrink-0 rounded-full w-6 h-6 border border-clr_graish_blue_3 group-[.completed]:border-none mr-4 cursor-pointer flex items-center justify-center group-[.dark]:hover:border-clr_blue_1 hover:border-clr_blue_2"
        >
          <img
            className="group-[.completed]:block w-3 h-3 hidden"
            src={check}
            alt="check"
          />
        </span>
        <div className="item--text inline-block text-clr_graish_blue_4 font-medium group-[.dark]:text-clr_graish_blue_1">
          {p.text}
        </div>
        <button
          onClick={p.removeItemFunc}
          className="inline-block ml-auto p-4 -m-4"
        >
          <img
            className="group-[.dark]:hidden block"
            src={icon_x}
            alt="cross"
          />
          <img
            className="group-[.dark]:block hidden"
            src={icon_x_white}
            alt="cross"
          />
        </button>
      </div>
    </>
  );
}
