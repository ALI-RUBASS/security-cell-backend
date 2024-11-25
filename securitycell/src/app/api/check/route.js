import { PythonShell } from "python-shell";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const { key } = body;

    if (!key) {
      return new Response(
        JSON.stringify({ success: false, message: "Key is required" }),
        { status: 400 }
      );
    }

    // Absolute path to the Python script in the public directory
    const scriptPath = path.join(process.cwd(), "public", "check_key.py");

    // Run the Python script
    return new Promise((resolve) => {
      PythonShell.run(
        scriptPath,
        { args: [key] }, // Pass the key as an argument
        (err, results) => {
          if (err) {
            console.error("Error executing Python script:", err);
            resolve(
              new Response(
                JSON.stringify({ success: false, message: "Internal Server Error" }),
                { status: 500 }
              )
            );
            return;
          }

          const output = results && results[0]?.trim();

          console.log("new scheme: "+output);

          if (output === "yes") {
            resolve(
              new Response(
                JSON.stringify({ success: true, available: true }),
                { status: 200 }
              )
            );
          } else {
            resolve(
              new Response(
                JSON.stringify({ success: true, available: false }),
                { status: 200 }
              )
            );
          }
        }
      );
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
