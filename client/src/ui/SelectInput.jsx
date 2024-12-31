function SelectInput({ data, render }) {
  return (
    <select name="quiz-category-filter" className="bg-blue-500 text-white rounded px-3 py-2">
      {data.map(render)}
    </select>
  );
}

export default SelectInput;
