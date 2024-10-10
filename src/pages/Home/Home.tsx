import React from "react";
import todoImage from "../../assets/img/8136206.jpg";

const Home: React.FC = () => {
  return (
    <div className="flex px-4 pt-8">
      <div className="w-2/5 py-9">
        <h1 className="font-bold text-5xl text-teal-500 leading-tight">
          Organize Your Life, One Task at a Time!
        </h1>
        <h2 className="mt-8 text-sm text-slate-500">
          Welcome to{" "}
          <span className="font-bold text-2xl text-blue-500">TaskMaster</span> –
          your ultimate tool to stay on top of your tasks. Keep track,
          prioritize, and get things done effortlessly!
        </h2>
      </div>
      <img src={todoImage} alt="Todos" className="w-3/5" />
    </div>
  );
};

export default Home;
