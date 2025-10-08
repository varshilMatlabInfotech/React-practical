import { useState, useEffect } from 'react';

const Tabs = (tabs = [], defaultTab) => {
  const [activeTab, setActiveTab] = useState(defaultTab || '');
  const tabsCount = tabs?.length;

  useEffect(() => {
    if (!!tabs?.length && !defaultTab) {
      setActiveTab(tab?.[0]?.value);
    }
  }, [tabs]);
  console.log(tabs, 'tabs');
  return (
    <div className="flex items-center justify-start">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${tabsCount}, 1fr)`,
        }}
        key={tabs?.length}
      >
        dddd
        {tabs?.length > 0 ? (
          tabs?.map((tab, index) => {
            const isActive = activeTab === tab?.value;
            console.log(tab);
            return (
              <button
                key={`${index}_${tab?.value}`}
                className={`${isActive ? 'bg-black' : 'bg-transparent'} border`}
                onClick={() => setActiveTab(tab?.value)}
              >
                {tab?.label}
              </button>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Tabs;
