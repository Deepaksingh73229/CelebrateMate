import { NextResponse } from 'next/server';

// GET handler
export async function GET(request) {
  try {
    // Log to server console
    console.log("GET request received to /api/example");
    
    // Sample data
    const data = {
      success: true,
      message: "API is working correctly!",
      timestamp: new Date().toISOString(),
      requestInfo: {
        method: "GET",
        url: request.url,
      }
    };
    
    // Return successful response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/example:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// POST handler
export async function POST(request) {
  try {
    console.log("POST request received to /api/example");
    
    // Parse the request body
    const body = await request.json();
    console.log("Request body:", body);
    
    // Return the data with some additional info
    return NextResponse.json({
      success: true,
      message: "Data received successfully",
      receivedData: body,
      timestamp: new Date().toISOString()
    }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/example:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process request", error: error.message },
      { status: 400 }
    );
  }
}