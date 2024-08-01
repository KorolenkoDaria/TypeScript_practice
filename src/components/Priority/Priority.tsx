import React, { useEffect, useState } from "react";

interface PriorityProps {
  onPriorityChange: (newPriority: number) => void;
  selectedPriority?: number;
}

const Priority: React.FC<PriorityProps> = ({
  onPriorityChange,
  selectedPriority = 1,
}) => {
  const [priority, setPriority] = useState<number>(Number(selectedPriority));

  useEffect(() => {
    if (selectedPriority !== undefined) {
      setPriority(selectedPriority);
    }
  }, [selectedPriority]);

  const handlePriorityChange: React.ChangeEventHandler<HTMLInputElement> = (
    evt
  ) => {
    const newPriority = Number(evt.target.value);
    setPriority(newPriority);
    onPriorityChange(newPriority);
  };

  return (
    <div>
      <h4>Priority:</h4>
      <div>
        <label>High!!!</label>
        <input
          name="priority"
          value="0"
          type="radio"
          checked={priority === 0}
          onChange={handlePriorityChange}
        />
      </div>
      <div>
        <label>Medium!!</label>
        <input
          name="priority"
          value="1"
          type="radio"
          checked={priority === 1}
          onChange={handlePriorityChange}
        />
      </div>
      <div>
        <label>Low!</label>
        <input
          name="priority"
          value="2"
          type="radio"
          checked={priority === 2}
          onChange={handlePriorityChange}
        />
      </div>
      <div>
        <label>None</label>
        <input
          name="priority"
          value="3"
          type="radio"
          checked={priority === 3}
          onChange={handlePriorityChange}
        />
      </div>
    </div>
  );
};

export default Priority;
