const Input = (props) => {
  const { id, type, placeholder, setter } = props;
  return (
    <input
      className="shadow appearance-none border rounded w-full py-2 pl-3 pr-8 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={(event) => {
        setter(event.target.value);
      }}
      required
    ></input>
  );
};

export default Input;
