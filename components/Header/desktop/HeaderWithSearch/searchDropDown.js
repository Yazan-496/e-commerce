import Image from "next/legacy/image";
import {
  RecentSearchSVG,
  TrashSearchSVG,
  TrendingSearchSVG,
  HotSearchSVG,
} from "@/components/svgs";
import Link from "@/helpers/Link";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../../LoadingComponent/desktop";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import store from "../../../../store";

const SearchDropDown = ({ searchResult, handleSearch }) => {
  const searchValue = useSelector((store) => store.ProductReducer.search_value);
  const searchLoading = useSelector(
    (store) => store.ProductReducer.searchLoading
  );
  const [recentSearches, setRecentSearches] = useState([]);
  const dispatch = useDispatch();
  function handleSetSearchValue(name) {
    if (name) {
      console.log(name, "name");
      dispatch({ type: "SET_SEARCH_REDUCER", payload: name });
    }
  }
  function handleSelectRecentSearch(value) {
    console.log(value, "value");
    if (value) {
      handleSearch(value);
      dispatch({ type: "SET_SEARCH_REDUCER", payload: value });
    }
  }
  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem("RECENT_SEARCH"));
    setRecentSearches(recent);

    const unsubscribe = store.subscribe(() => {
      const updatedRecent = JSON.parse(localStorage.getItem("RECENT_SEARCH"));
      if (updatedRecent) {
        setRecentSearches(updatedRecent);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const { t, i18n } = useTranslation("translation");

  function handleRemoveSearch() {
    if (typeof window !== "undefined") {
      localStorage.setItem("RECENT_SEARCH", []);
    }
  }

  return (
    <>
      <div className="absolute max-h-[340px] overflow-y-auto overflow-x-hidden z-[1] top-auto flex flex-col justify-start items-start gap-6 px-[20px] py-[20px] bg-white rounded-[4px] mt-[2px] uudytydtgee">
        {searchLoading ? (
          <div className=" w-full flex h-10 items-center justify-center">
            <LoadingComponent />
          </div>
        ) : (
          searchValue &&
          searchResult.map((searchRes) => {
            return (
              <div
                onMouseEnter={() => handleSetSearchValue(searchRes?.name)}
                onMouseLeave={() => handleSetSearchValue("")}
              >
                <Link
                  className="cursor-pointer"
                  href={`/products/search_text=${searchRes?.name?.replace(
                    /\//g,
                    ""
                  )}`}
                >
                  <div className="cursor-pointer">{searchRes?.name}</div>
                </Link>
              </div>
            );
          })
        )}
        {recentSearches?.length > 0 && (
          <div className="h-auto w-full flex flex-wrap items-center">
            <div className="flex flex-col w-full justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
              <div className=" flex flex-wrap justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-[90px]">
                <div className="flex-grow-0 flex-shrink-0 text-base text-left text-[#000000] flex items-center">
                  <TrendingSearchSVG />
                  {t("main.recent_search")}
                </div>
                <span className="hidden cursor-pointer "></span>
                {/*<span onClick={handleRemoveSearch} className="cursor-pointer ">*/}
                {/*  <TrashSearchSVG />*/}
                {/*</span>*/}
              </div>
              <div className="flex flex-wrap">
                {recentSearches?.map((recent) => {
                  return (
                    <div className="p-4">
                      <Link
                        href={`/products/search_text=${recent?.replace(
                          /\//g,
                          ""
                        )}`}
                      >
                        <a className="flex p-5 justify-center items-center flex-grow-0 flex-shrink-0 h-8 relative gap-1 px-[16px] py-[6px] rounded-[4px] bg-[#F2F2F2] text-black hover:bg-[#E7E7E7]">
                          <HotSearchSVG />
                          <div
                            onClick={(e) => handleSelectRecentSearch(recent)}
                            className="cursor-pointer flex-grow-0 flex-shrink-0 text-sm text-left text-[#31353C]"
                          >
                            {recent}
                          </div>
                        </a>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchDropDown;
