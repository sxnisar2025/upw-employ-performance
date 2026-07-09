"use client";
import { supabase } from "@/lib/supabase";
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
   
    const savedAccounts = localStorage.getItem("accounts");
    const savedPerformances = localStorage.getItem("performances");

  
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

  useEffect(() => {
  loadEmployees();
}, []);
  /* -------------------------
      Save Local Storage
  ------------------------- */



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

const addEmployee = async (employee) => {
  // Never send id when creating a new employee
  const employeeData = {
    name: employee.name,
    email: employee.email,
    phone: employee.phone,
    status: employee.status,
  };

  const { data, error } = await supabase
    .from("employees")
    .insert([employeeData])
    .select();

  if (error) {
    console.error(error);
    alert(error.message);
    return false;
  }

  loadEmployees();
  return true;
};

const updateEmployee = async (employee) => {
  const { id, ...values } = employee;

  const { error } = await supabase
    .from("employees")
    .update(values)
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  loadEmployees();
};

const deleteEmployee = async (id) => {
  const { error } = await supabase
    .from("employees")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  loadEmployees();
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
const loadEmployees = async () => {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  setEmployees(data || []);
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