export default ({ icon, label, amount }) => {
  return (
    <button className="flex flex-row gap-2 items-center hover:bg-slate-200 text-left py-2 px-3 w-full">
      {icon}
      <p>{label}</p>
      <div className="font-light mx-auto mr-0">{amount}</div>
    </button>
  );
};
