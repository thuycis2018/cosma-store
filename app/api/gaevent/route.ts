import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const secretKey = req.headers.get("x-secret-key");
  if (secretKey !== process.env.GA_API_KEY) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const consent = req.cookies.get("consent");
    if (consent && consent.value === "true") {
      const { userId, eventName, params } = await req.json();
      const url = `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_KEY}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: userId,
          events: [
            {
              name: eventName,
              params: params,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send event to Google Analytics");
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({
      success: false,
      message: "User did not consent",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
};
