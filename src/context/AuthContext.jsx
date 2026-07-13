"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load employee profile
  const loadEmployee = async (authUser) => {
    if (!authUser) {
      setEmployee(null);
      return;
    }

    const { data, error } = await supabase
      .from("employees")
      .select("*")
      .eq("auth_user_id", authUser.id)
      .single();

    if (error) {
      console.log(error);
      setEmployee(null);
      return;
    }

    setEmployee(data);
  };

  // Login
  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return false;
    }

    return true;
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();

    setUser(null);
    setEmployee(null);
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
        await loadEmployee(session.user);
      }

      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await loadEmployee(session.user);
        } else {
          setUser(null);
          setEmployee(null);
        }

        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        employee,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}