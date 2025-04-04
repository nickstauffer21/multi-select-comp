import React, { useEffect, useState, useRef } from "react";

export default function SelectedCategories({
  selectedCategories,
  setSelectedCategories,
  setTotalWidth,
}) {
  const scrollHorizontalRef = useRef(null);
  const buttonRef = useRef(new Map());

  const setButtonRef = (category) => (el) => {
    if (el) {
      buttonRef.current.set(category, el);
    } else {
      buttonRef.current.delete(category);
    }
  };

  useEffect(() => {
    let totalWidth = 0;
    buttonRef.current.forEach((el, cat) => {
      if (selectedCategories.has(cat) && totalWidth <= 200) {
        totalWidth += el.offsetWidth;
      }
    });
    setTotalWidth(totalWidth);
  }, [selectedCategories]);

  useEffect(() => {
    const container = scrollHorizontalRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
      <div className="selected-categories" ref={scrollHorizontalRef}>
        {selectedCategories &&
          Array.from(selectedCategories).map((category) => (
            <button
              key={category}
              className="selected-category"
              onClick={() =>
                setSelectedCategories((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(category);
                  return newSet;
                })
              }
              ref={setButtonRef(category)}
            >
              {category} x
            </button>
          ))}
      </div>
    </>
  );
}
