import { useState } from "react";
import "./App.css";

type Options = {
  value: string;
  label: string;
};

type Countries = {
  id: number;
  name: string;
};

const COUNTRIES: Countries[] = [
  { id: 1, name: "USA" },
  { id: 2, name: "India" },
  { id: 3, name: "Spain" },
  { id: 4, name: "France" },
  { id: 5, name: "Germany" },
];

const getOptions = (): Options[] => {
  if (!COUNTRIES) return [];

  const options = [
    { value: "all", label: "Select All" },
    ...(COUNTRIES?.map((country) => ({
      value: country.name,
      label: country.name,
    })) ?? []),
  ];

  return options;
};

function App() {
  const options = getOptions();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    if (id === "all") {
      if (checked) {
        setSelectedOptions([
          "all",
          ...COUNTRIES.map((country) => country.name),
        ]);
      } else {
        setSelectedOptions([]);
      }
      return;
    }

    if (checked) {
      setSelectedOptions((prev) => [...prev, id]);
      return;
    }

    const isCheckedAll = selectedOptions.includes("all");
    if (isCheckedAll) {
      setSelectedOptions((prev) => prev.filter((option) => option !== "all"));
    }

    setSelectedOptions((prev) => prev.filter((option) => option !== id));
  };

  return (
    <>
      {options?.map((option) => {
        return (
          <div key={option.label} className="flex flex-row gap-1 text-sm">
            <input
              id={option.value}
              checked={selectedOptions.includes(option.value)}
              type="checkbox"
              onChange={handleCheck}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        );
      })}
    </>
  );
}

export default App;
