const TopicLabel = ({topic} ) => {
  return <div className="bg-slate-100 border border-slate-400 p-5 py-2 rounded-md border-dashed text-center text-slate-900">
    <p className="text-sm">Topic</p>
    <p className="text-lg font-bold">{topic}</p>
  </div>;
};

export default TopicLabel;