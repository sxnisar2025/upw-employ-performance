import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  try {
    const {
      name,
      email,
      phone,
      role,
      status,
      password,
    } = await request.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "Name, Email and Password are required.",
        },
        { status: 400 }
      );
    }

    // Create Auth User
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError) {
      return NextResponse.json(
        {
          error: authError.message,
        },
        { status: 400 }
      );
    }

    // Insert Employee
    const { error: employeeError } = await supabaseAdmin
      .from("employees")
      .insert([
        {
          name,
          email,
          phone,
          role,
          status,
          auth_user_id: authData.user.id,
        },
      ]);

    if (employeeError) {
      // Rollback auth user
      await supabaseAdmin.auth.admin.deleteUser(
        authData.user.id
      );

      return NextResponse.json(
        {
          error: employeeError.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
}