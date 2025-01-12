import React, { useState, useEffect } from "react";
import { fetchData } from "../utils/api";
import { fetchSortedData } from "../utils/sort_api";

const IncomeStatementTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortConfig, setSortConfig] = useState({ key: "", order: "" });

  const [formFilters, setFormFilters] = useState({
    startDate: "",
    endDate: "",
    revenueMin: null,
    revenueMax: null,
    netIncomeMin: null,
    netIncomeMax: null,
  });

  const [filters, setFilters] = useState({ ...formFilters });

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);
      try {
        const noFilters =
          !filters.startDate && !filters.endDate &&
          filters.revenueMin === null && filters.revenueMax === null &&
          filters.netIncomeMin === null && filters.netIncomeMax === null;

        let result;
        if (noFilters && sortConfig.key === "" && sortConfig.order === "") {
          result = await fetchData();
        } else {
          result = await fetchSortedData(
            sortConfig.key,
            sortConfig.order,
            filters
          );
        }

        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredData();
  }, [sortConfig, filters]);

  const handleFilterChange = (filterKey, value) => {
    setFormFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  const applyFilters = () => {
    setFilters({ ...formFilters });
  };

  const handleSort = (key) => {
    let order = "asc";
    if (sortConfig.key === key && sortConfig.order === "asc") {
      order = "desc";
    }
    setSortConfig({ key, order });
  };

  const handleClearFilters = () => {
    setSortConfig({ key: "", order: "" });
    setFormFilters({
      startDate: "",
      endDate: "",
      revenueMin: null,
      revenueMax: null,
      netIncomeMin: null,
      netIncomeMax: null,
    });
    setFilters({
      startDate: "",
      endDate: "",
      revenueMin: null,
      revenueMax: null,
      netIncomeMin: null,
      netIncomeMax: null,
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return (
        <span className="ml-2 cursor-pointer" onClick={() => handleSort(key)}>
          ⇅
        </span>
      );
    }
    return sortConfig.order === "asc" ? (
      <span className="ml-2 cursor-pointer" onClick={() => handleSort(key)}>
        ↑
      </span>
    ) : (
      <span className="ml-2 cursor-pointer" onClick={() => handleSort(key)}>
        ↓
      </span>
    );
  };

  function formatNumber(value) {
    if (value >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(3)}B`;
    } else if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(3)}M`;
    }
    return value.toString();
  }

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const ordinalSuffix = (day) => {
      if (day % 10 === 1 && day !== 11) return `${day}st`;
      if (day % 10 === 2 && day !== 12) return `${day}nd`;
      if (day % 10 === 3 && day !== 13) return `${day}rd`;
      return `${day}th`;
    };

    return `${ordinalSuffix(day)} ${month} ${year}`;
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto p-4 font-roboto">
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Start Date:</label>
            <input
              type="date"
              className="border border-gray-300 rounded px-2 py-1 w-full"
              value={formFilters.startDate}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">End Date:</label>
            <input
              type="date"
              className="border border-gray-300 rounded px-2 py-1 w-full"
              value={formFilters.endDate}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Revenue Min:</label>
            <input
              type="number"
              className="border border-gray-300 rounded px-2 py-1 w-full"
              value={formFilters.revenueMin || ""}
              onChange={(e) =>
                handleFilterChange(
                  "revenueMin",
                  e.target.value ? parseFloat(e.target.value) : null
                )
              }
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Revenue Max:</label>
            <input
              type="number"
              className="border border-gray-300 rounded px-2 py-1 w-full"
              value={formFilters.revenueMax || ""}
              onChange={(e) =>
                handleFilterChange(
                  "revenueMax",
                  e.target.value ? parseFloat(e.target.value) : null
                )
              }
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Net Income Min:</label>
            <input
              type="number"
              className="border border-gray-300 rounded px-2 py-1 w-full"
              value={formFilters.netIncomeMin || ""}
              onChange={(e) =>
                handleFilterChange(
                  "netIncomeMin",
                  e.target.value ? parseFloat(e.target.value) : null
                )
              }
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Net Income Max:</label>
            <input
              type="number"
              className="border border-gray-300 rounded px-2 py-1 w-full"
              value={formFilters.netIncomeMax || ""}
              onChange={(e) =>
                handleFilterChange(
                  "netIncomeMax",
                  e.target.value ? parseFloat(e.target.value) : null
                )
              }
            />
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleClearFilters}
          >
            Clear Filters and Sort
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>
      <table className="table-auto w-full border border-gray-300 mx-1">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2 text-center">
              Date {getSortIcon("date")}
            </th>
            <th className="border border-gray-300 p-2 text-center">
              Revenue {getSortIcon("revenue")}
            </th>
            <th className="border border-gray-300 p-2 text-center">
              Net Income {getSortIcon("net_income")}
            </th>
            <th className="border border-gray-300 p-2 text-center">
              Gross Profit
            </th>
            <th className="border border-gray-300 p-2 text-center">EPS</th>
            <th className="border border-gray-300 p-2 text-center">
              Operating Income
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.date}>
              <td className="border border-gray-300 p-2 text-center">
                {formatDate(row.date)}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {formatNumber(row.revenue)}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {formatNumber(row.net_income)}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {formatNumber(row.gross_profit)}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {row.eps}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {formatNumber(row.operating_income)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeStatementTable;
