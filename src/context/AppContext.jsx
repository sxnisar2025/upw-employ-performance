"use client";
import { supabase } from "@/lib/supabase";
import { createContext, useContext, useEffect, useState } from "react";





const AppContext = createContext();

export function AppProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [performances, setPerformances] = useState([]);

  const loadAccounts = async () => {
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  setAccounts(data || []);
};

const loadPerformances = async () => {
  const { data, error } = await supabase
    .from("performances")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  setPerformances(data || []);
};
  /* -------------------------
      Load Local Storage
  ------------------------- */


useEffect(() => {
  loadEmployees();
  loadAccounts();
  loadPerformances();
}, []);
  /* -------------------------
      Save Local Storage
  ------------------------- */

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

const addAccount = async (account) => {
  const accountData = {
    employeeId: account.employeeId,
    name: account.name,
    category: account.category,
    status: account.status,
  };

  const { error } = await supabase
    .from("accounts")
    .insert([accountData]);

  if (error) {
    alert(error.message);
    return false;
  }

  await loadAccounts();
  return true;
};

const updateAccount = async (account) => {
  const { id, ...values } = account;

  const { error } = await supabase
    .from("accounts")
    .update(values)
    .eq("id", id);

  if (error) {
    alert(error.message);
    return false;
  }

  await loadAccounts();
  return true;
};

 const deleteAccount = async (id) => {
  const { error } = await supabase
    .from("accounts")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return false;
  }

  await loadAccounts();
  return true;
};

  /* ==========================
      PERFORMANCE CRUD
  ========================== */

const addPerformance = async (performance) => {
  const performanceData = {
    accountId: performance.accountId,
    month: performance.month,
    buy: performance.buy,
    earn: performance.earn,
    received: performance.received,
    pending: performance.pending,
  };

  const { data, error } = await supabase
    .from("performances")
    .insert([performanceData])
    .select();

  console.log("Inserted:", data);
  console.log("Error:", error);

  if (error) {
    console.error(error);
    alert(error.message);
    return false;
  }

  await loadPerformances();
  return true;
};

const updatePerformance = async (performance) => {
  const { id, ...values } = performance;

  const { error } = await supabase
    .from("performances")
    .update(values)
    .eq("id", id);

  if (error) {
    alert(error.message);
    return false;
  }

  await loadPerformances();
  return true;
};

const deletePerformance = async (id) => {
  const { error } = await supabase
    .from("performances")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return false;
  }

  await loadPerformances();
  return true;
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