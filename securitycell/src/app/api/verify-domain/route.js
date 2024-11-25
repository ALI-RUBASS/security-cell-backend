import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { domain, key, user_id } = await request.json();

    if (!domain || !key || !user_id) {
      return NextResponse.json(
        { success: false, message: "Domain, key, and user ID are required." },
        { status: 400 }
      );
    }


    const verificationUrl = `http://${domain}/verification.txt`;

    // Fetch the verification file
    const response = await fetch(verificationUrl);
    const fileContent = await response.text();

    if (fileContent.trim() === key) {
      // If the domain is verified, send the data to the PHP script
      const phpResponse = await fetch(
        "https://securitycell.themavennest.shop/securitycell/database/updateVerifiedDomains.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id, domain }),
        }
      );

      const phpResult = await phpResponse.json();

   

      if (phpResponse.ok) {
        return NextResponse.json({
          success: true,
          message: "Domain verified and added successfully!",
          phpMessage: phpResult.message,
        });
      } else {
        return NextResponse.json(
          { success: false, message: phpResult.message || "Failed to update domain in database." },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, message: "Verification failed. The key does not match." },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error verifying domain. Ensure the domain is accessible. "},
      { status: 500 }
    );
  }
}
