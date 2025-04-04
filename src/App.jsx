import { useState, useEffect, useRef } from "react";

import SelectedCategories from "./SelectedCategories";
import Categories from "./Categories";
import "./App.css";

function App() {
  const [weapon, setWeapon] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [totalWidth, setTotalWidth] = useState(0);

  useEffect(() => {
    async function getData() {
      const weapon = "https://eldenring.fanapis.com/api/weapons?limit=500";
      try {
        const weaponRes = await fetch(weapon);
        const weaponData = await weaponRes.json();
        setWeapon(weaponData.data);

        return { weaponData };
      } catch (error) {
        console.error(error.message);
      }
    }
    getData();
  }, []);

  const filterWeapons = weapon.filter((w) => {
    return selectedCategories.has(w.category);
  });

  console.log(selectedCategories);

  return (
    <div>
      <div className="container">
        <main className="main-content">
          <Categories
            setSelectedCategories={setSelectedCategories}
            weapon={weapon}
          />
          <div className="search-comp">
            <input
              type="text"
              className="search-bar"
              style={{ textIndent: `${totalWidth + 20}px` }}
            />
            <SelectedCategories
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              setTotalWidth={setTotalWidth}
            />
          </div>
          <div className="result-box">
            {weapon && filterWeapons.map((w) => <p>{w.name}</p>)}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
