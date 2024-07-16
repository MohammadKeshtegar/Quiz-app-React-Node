function SelectInput({ data, render, onChange }) {
  return (
    <select onChange={onChange} name="quiz-category-filter" className="bg-blue-500 rounded px-3 py-2">
      {data.map(render)}
    </select>
  );
}

export default SelectInput;
