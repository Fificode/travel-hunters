
export async function GET() {
  try {
    const res = await fetch("https://sandbox.thetravelhunters.com/hotel/hotels/");

    if (!res.ok) {
      return new Response("Failed to fetch hotels", { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.log("Server Error", error)
    return new Response("Server Error", { status: 500 });
  }
}
