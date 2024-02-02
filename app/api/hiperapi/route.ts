import { NextRequest, NextResponse } from "next/server"
// import apiResponse from "@/data/apiResponse.json"

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username")
  if (!username) return NextResponse.json({ error: "Username not provided" }, { status: 400 })
  try {
    // fetch user data
    const userResult = await fetch(`https://api.hikerapi.com/v2/user/by/username?username=${username}`, {
      headers: {
        "x-access-key": "E2McLlJ1ywYXdJgcQNztOecrYhrQOR0x",
        accept: "application/json",
      },
    })
    const user = (await userResult.json()).user
    // console.log(user.pk)
    // Get user following
    let next_page = 0
    let followingUsers: any[] = []
    while (next_page !== null) {
      const followingResult = await fetch(
        `https://api.hikerapi.com/v2/user/following?user_id=${user.pk}&page_id=${next_page}`,
        {
          headers: {
            "x-access-key": "E2McLlJ1ywYXdJgcQNztOecrYhrQOR0x",
            accept: "application/json",
          },
        }
      )
      const following = await followingResult.json()
      // console.log(following)
      if (following.response?.users && Array.isArray(following.response?.users))
        followingUsers = followingUsers.concat(following.response.users)
      next_page = following.next_page_id
      console.log("next_page", next_page)
    }
    console.log("Following:", followingUsers.length)
    return NextResponse.json(JSON.stringify(followingUsers), { status: 200 })
  } catch (error) {
    console.log(error)
  }

  // return new NextResponse(null, { status: 200 })

  // return new NextResponse(null, { status: 403 })
}
