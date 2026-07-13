"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

const AppContext = createContext();

export function AppProvider({ children }) {
  const { employee } = useAuth();

  const [employees, setEmployees] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [performances, setPerformances] = useState([]);

  /* ==========================
      LOAD EMPLOYEES
  ========================== */

  const loadEmployees = async () => {
    let query = supabase
      .from("employees")
      .select("*")
      .order("id");

    if (employee && employee.role !== "admin") {
      query = query.eq("id", employee.id);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      return;
    }

    setEmployees(data || []);
  };

  /* ==========================
      LOAD ACCOUNTS
  ========================== */

  const loadAccounts = async () => {
    let query = supabase
      .from("accounts")
      .select("*")
      .order("id");

    if (employee && employee.role !== "admin") {
      query = query.eq("employeeId", employee.id);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      return;
    }

    setAccounts(data || []);
  };

  /* ==========================
      LOAD PERFORMANCES
  ========================== */

  const loadPerformances = async () => {
    let query = supabase
      .from("performances")
      .select("*")
      .order("id");

    if (employee && employee.role !== "admin") {
      const { data: myAccounts } = await supabase
        .from("accounts")
        .select("id")
        .eq("employeeId", employee.id);

      const ids = (myAccounts || []).map((a) => a.id);

      if (ids.length === 0) {
        setPerformances([]);
        return;
      }

      query = query.in("accountId", ids);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      return;
    }

    setPerformances(data || []);
  };

  /* ==========================
      LOAD ALL DATA
  ========================== */

  useEffect(() => {
    loadEmployees();
    loadAccounts();
    loadPerformances();
  }, [employee]);

  /* ==========================
      EMPLOYEE CRUD
  ========================== */

  const addEmployee = async (employeeData) => {
    const { error } = await supabase
      .from("employees")
      .insert([employeeData]);

    if (error) {
      alert(error.message);
      return false;
    }

    loadEmployees();
    return true;
  };

  const updateEmployee = async (employeeData) => {
    const { id, ...values } = employeeData;

    const { error } = await supabase
      .from("employees")
      .update(values)
      .eq("id", id);

    if (error) {
      alert(error.message);
      return false;
    }

    loadEmployees();
    return true;
  };

  const deleteEmployee = async (id) => {
    const { error } = await supabase
      .from("employees")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return false;
    }

    loadEmployees();
    return true;
  };

  /* ==========================
      ACCOUNT CRUD
  ========================== */

  const addAccount = async (accountData) => {
    const { error } = await supabase
      .from("accounts")
      .insert([accountData]);

    if (error) {
      alert(error.message);
      return false;
    }

    loadAccounts();
    return true;
  };

  const updateAccount = async (accountData) => {
    const { id, ...values } = accountData;

    const { error } = await supabase
      .from("accounts")
      .update(values)
      .eq("id", id);

    if (error) {
      alert(error.message);
      return false;
    }

    loadAccounts();
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

    loadAccounts();
    return true;
  };

  /* ==========================
      PERFORMANCE CRUD
  ========================== */

  const addPerformance = async (performanceData) => {
    const { error } = await supabase
      .from("performances")
      .insert([performanceData]);

    if (error) {
      alert(error.message);
      return false;
    }

    loadPerformances();
    return true;
  };

  const updatePerformance = async (performanceData) => {
    const { id, ...values } = performanceData;

    const { error } = await supabase
      .from("performances")
      .update(values)
      .eq("id", id);

    if (error) {
      alert(error.message);
      return false;
    }

    loadPerformances();
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

    loadPerformances();
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        employees,
        accounts,
        performances,

        loadEmployees,
        loadAccounts,
        loadPerformances,

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