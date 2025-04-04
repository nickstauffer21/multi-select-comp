import React from "react";

export default function Categories({ weapon, setSelectedCategories }) {
  const categories = [...new Set(weapon.map((w) => w.category))];

  const handleCategory = (category) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (!newSet.has(category)) {
        newSet.add(category);
      } else {
        newSet.delete(category);
      }
      return newSet;
    });
  };
  return (
    <>
      <div className="categories">
        {categories.map((category, index) => (
          <div>
            <button
              className="category-btn"
              key={index}
              onClick={() => handleCategory(category)}
            >
              {category}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
