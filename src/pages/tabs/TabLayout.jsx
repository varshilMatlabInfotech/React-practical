import { useState } from "react";

const TabLayout = (content) => {
  const [open, setOpen] = useState("users");

  const handleTabOpen = (tabCategory) => {
    setOpen(tabCategory);
  };

  return (
    <>
      <section className="dark:bg-dark">
        <div className="container-lg justify-center">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mb-14 w-full">
                <div className="flex flex-col flex-wrap rounded-lg border border-[#E4E4E4] px-4 py-3 dark:border-dark-3 sm:flex-row">
                  <a
                    onClick={() => handleTabOpen("users")}
                    className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                      open === "users"
                        ? "bg-primary bg-violet-700"
                        : "text-primary"
                    }`}
                  >
                    Users
                  </a>
                  <a
                    onClick={() => handleTabOpen("bookmarkedUsers")}
                    className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                      open === "bookmarkedUsers"
                        ? "bg-primary bg-violet-700"
                        : "text-body-color hover:bg-primary"
                    }`}
                  >
                    Bookmarked Users
                  </a>
                </div>
                <TabContent
                  tabCategory="users"
                  open={open}
                  content={content}
                />
                <TabContent
                  tabCategory="bookmarkedUsers"
                  open={open}
                  content={content}
                />
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TabLayout;

const TabContent = ({ open, tabCategory, content }) => {
  return (
    <div>
      <div
        className={`p-6 text-base leading-relaxed text-body-color dark:text-dark-6 ${
          open === tabCategory ? "block" : "hidden"
        } `}
      >
        {content}
      </div>
    </div>
  );
};
