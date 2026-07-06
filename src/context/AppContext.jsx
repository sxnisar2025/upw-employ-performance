"use client";

import { createContext, useContext, useEffect, useState } from "react";

import employeesData from "@/data/employees";
import accountsData from "@/data/accounts";
import performancesData from "@/data/performances";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [performances, setPerformances] = useState([]);

  /* -------------------------
      Load Local Storage
  ------------------------- */

  useEffect(() => {
    const savedEmployees = localStorage.getItem("employees");
    const savedAccounts = localStorage.getItem("accounts");
    const savedPerformances = localStorage.getItem("performances");

    setEmployees(
      savedEmployees
        ? JSON.parse(savedEmployees)
        : employeesData
    );

    setAccounts(
      savedAccounts
        ? JSON.parse(savedAccounts)
        : accountsData
    );

    setPerformances(
      savedPerformances
        ? JSON.parse(savedPerformances)
        : performancesData
    );
  }, []);

  /* -------------------------
      Save Local Storage
  ------------------------- */

  useEffect(() => {
    if (employees.length) {
      localStorage.setItem(
        "employees",
        JSON.stringify(employees)
      );
    }
  }, [employees]);

  useEffect(() => {
    if (accounts.length) {
      localStorage.setItem(
        "accounts",
        JSON.stringify(accounts)
      );
    }
  }, [accounts]);

  useEffect(() => {
    if (performances.length) {
      localStorage.setItem(
        "performances",
        JSON.stringify(performances)
      );
    }
  }, [performances]);

  /* ==========================
        EMPLOYEE CRUD
  ========================== */

  const addEmployee = (employee) => {
    const newEmployee = {
      id: Date.now(),
      ...employee,
    };

    setEmployees((prev) => [...prev, newEmployee]);
  };

  const updateEmployee = (employee) => {
    setEmployees((prev) =>
      prev.map((item) =>
        item.id === employee.id ? employee : item
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) =>
      prev.filter((item) => item.id !== id)
    );

    // Remove employee accounts
    setAccounts((prev) =>
      prev.filter((acc) => acc.employeeId !== id)
    );

    // Remove performance records
    const accountIds = accounts
      .filter((a) => a.employeeId === id)
      .map((a) => a.id);

    setPerformances((prev) =>
      prev.filter(
        (item) => !accountIds.includes(item.accountId)
      )
    );
  };

  /* ==========================
        ACCOUNT CRUD
  ========================== */

  const addAccount = (account) => {
    setAccounts((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...account,
      },
    ]);
  };

  const updateAccount = (account) => {
    setAccounts((prev) =>
      prev.map((item) =>
        item.id === account.id ? account : item
      )
    );
  };

  const deleteAccount = (id) => {
    setAccounts((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setPerformances((prev) =>
      prev.filter((item) => item.accountId !== id)
    );
  };

  /* ==========================
      PERFORMANCE CRUD
  ========================== */

  const addPerformance = (performance) => {
    setPerformances((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...performance,
      },
    ]);
  };

  const updatePerformance = (performance) => {
    setPerformances((prev) =>
      prev.map((item) =>
        item.id === performance.id
          ? performance
          : item
      )
    );
  };

  const deletePerformance = (id) => {
    setPerformances((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <AppContext.Provider
      value={{
        employees,
        accounts,
        performances,

        addEmployee,
        updateEmployee,
        deleteEmployee,

        addAccount,
        updateAccount,
        deleteAccount,

        addPerformance,
        updatePerformance,
        deletePerformance,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}